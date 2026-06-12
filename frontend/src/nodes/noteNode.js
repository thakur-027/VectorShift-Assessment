// noteNode.js
// A sticky-note style comment node with no handles.
// Demonstrates the abstraction works with zero connections.

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || 'Add a note…');

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="🗒️"
      accentColor="#facc15"
      variant="note"
    >
      <textarea
        className="base-node__textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Write a comment or annotation…"
      />
    </BaseNode>
  );
};
