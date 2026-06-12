// mergeNode.js
// Combines multiple inputs into a single output.
// 3 inputs → 1 output. Demonstrates many-to-one handle layout.

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concatenate');
  const [delimiter, setDelimiter] = useState(data?.delimiter || ', ');

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="🔗"
      accentColor="#06b6d4"
      inputs={[
        { id: 'input-a', label: 'A' },
        { id: 'input-b', label: 'B' },
        { id: 'input-c', label: 'C' },
      ]}
      outputs={[{ id: 'output', label: 'Merged' }]}
    >
      <div className="base-node__field">
        <span className="base-node__label">Strategy</span>
        <select
          className="base-node__select"
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
        >
          <option value="concatenate">Concatenate</option>
          <option value="join">Join with delimiter</option>
          <option value="first">First non-empty</option>
        </select>
      </div>
      {strategy === 'join' && (
        <div className="base-node__field">
          <span className="base-node__label">Delimiter</span>
          <input
            className="base-node__input"
            type="text"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
          />
        </div>
      )}
    </BaseNode>
  );
};
