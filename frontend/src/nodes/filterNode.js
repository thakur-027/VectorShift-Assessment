// filterNode.js
// Filters input data based on a user-defined condition.
// 1 input → 1 output with a multi-field form body.

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      accentColor="#ec4899"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[{ id: 'output', label: 'Matched' }]}
    >
      <div className="base-node__field">
        <span className="base-node__label">Condition</span>
        <select
          className="base-node__select"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="contains">Contains</option>
          <option value="startsWith">Starts with</option>
          <option value="endsWith">Ends with</option>
          <option value="regex">Matches regex</option>
        </select>
      </div>
      <div className="base-node__field">
        <span className="base-node__label">Value</span>
        <input
          className="base-node__input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Filter pattern…"
        />
      </div>
    </BaseNode>
  );
};
