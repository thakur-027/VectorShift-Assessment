// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message || 'Failed to connect to backend');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setResult(null);
        setError(null);
    };

    return (
        <>
            <div className="submit-bar">
                <button
                    type="button"
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="submit-btn__spinner" />
                            Analyzing…
                        </>
                    ) : (
                        <>
                            <span className="submit-btn__icon">▶</span>
                            Run Pipeline
                        </>
                    )}
                </button>
            </div>

            {/* ── Result / Error Modal Overlay ──────────── */}
            {(result || error) && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        {error ? (
                            <>
                                <div className="modal__header modal__header--error">
                                    <span className="modal__header-icon">⚠️</span>
                                    <span>Error</span>
                                </div>
                                <div className="modal__body">
                                    <p className="modal__error-text">{error}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="modal__header modal__header--success">
                                    <span className="modal__header-icon">✅</span>
                                    <span>Pipeline Analysis</span>
                                </div>
                                <div className="modal__body">
                                    <div className="modal__stats">
                                        <div className="modal__stat">
                                            <span className="modal__stat-value">{result.num_nodes}</span>
                                            <span className="modal__stat-label">Nodes</span>
                                        </div>
                                        <div className="modal__stat">
                                            <span className="modal__stat-value">{result.num_edges}</span>
                                            <span className="modal__stat-label">Edges</span>
                                        </div>
                                        <div className="modal__stat">
                                            <span className={`modal__stat-value ${result.is_dag ? 'modal__stat-value--success' : 'modal__stat-value--warn'}`}>
                                                {result.is_dag ? '✓ Yes' : '✗ No'}
                                            </span>
                                            <span className="modal__stat-label">Is DAG</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="modal__footer">
                            <button className="modal__close-btn" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
