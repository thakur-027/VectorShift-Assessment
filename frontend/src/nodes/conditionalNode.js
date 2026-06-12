// conditionalNode.js
// If/Else branching node.
// 1 input → 2 outputs (True / False).
// Demonstrates routing / branching logic with multiple output handles.

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || 'value');
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [compareValue, setCompareValue] = useState(data?.compareValue || '');

  return (
    <BaseNode
      id={id}
      title="Conditional"
      icon="🔀"
      accentColor="#ef4444"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[
        { id: 'true', label: 'True' },
        { id: 'false', label: 'False' },
      ]}
    >
      <div className="base-node__field">
        <span className="base-node__label">Field</span>
        <input
          className="base-node__input"
          type="text"
          value={field}
          onChange={(e) => setField(e.target.value)}
          placeholder="Field name…"
        />
      </div>
      <div className="base-node__field">
        <span className="base-node__label">Operator</span>
        <select
          className="base-node__select"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="equals">Equals</option>
          <option value="notEquals">Not Equals</option>
          <option value="greaterThan">Greater Than</option>
          <option value="lessThan">Less Than</option>
          <option value="contains">Contains</option>
          <option value="isEmpty">Is Empty</option>
        </select>
      </div>
      <div className="base-node__field">
        <span className="base-node__label">Value</span>
        <input
          className="base-node__input"
          type="text"
          value={compareValue}
          onChange={(e) => setCompareValue(e.target.value)}
          placeholder="Compare value…"
        />
      </div>
    </BaseNode>
  );
};
