// apiNode.js
// Configures an HTTP API request.
// 2 inputs (URL override, body) → 2 outputs (response, status).
// Demonstrates a complex multi-handle, multi-field node.

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || 'https://');

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon="🌐"
      accentColor="#f97316"
      inputs={[
        { id: 'url', label: 'URL' },
        { id: 'body', label: 'Body' },
      ]}
      outputs={[
        { id: 'response', label: 'Response' },
        { id: 'status', label: 'Status' },
      ]}
    >
      <div className="base-node__field">
        <span className="base-node__label">Method</span>
        <select
          className="base-node__select"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="base-node__field">
        <span className="base-node__label">URL</span>
        <input
          className="base-node__input"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/…"
        />
      </div>
    </BaseNode>
  );
};
