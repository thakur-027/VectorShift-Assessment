// textNode.js
// Text node with:
//  1. Auto-resizing textarea (grows with content)
//  2. Dynamic variable handles — {{ varName }} creates input handles

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { BaseNode } from './BaseNode';

// Regex to find {{ variableName }} patterns.
// Matches valid JS identifiers: starts with letter/underscore/$, followed by word chars/$.
const VAR_PATTERN = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

/**
 * Extract unique variable names from text.
 * e.g. "Hello {{ name }}, your {{ role }} is {{name}}" → ["name", "role"]
 */
function extractVariables(text) {
  const vars = [];
  const seen = new Set();
  let match;
  // Reset lastIndex since we reuse the regex
  VAR_PATTERN.lastIndex = 0;
  while ((match = VAR_PATTERN.exec(text)) !== null) {
    const varName = match[1];
    if (!seen.has(varName)) {
      seen.add(varName);
      vars.push(varName);
    }
  }
  return vars;
}

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  // Extract variables from the current text
  const variables = useMemo(() => extractVariables(currText), [currText]);

  // Convert variables to input handle definitions for BaseNode
  const dynamicInputs = useMemo(
    () => variables.map((v) => ({ id: v, label: v })),
    [variables]
  );

  // Auto-resize the textarea to fit content
  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    // Reset height to get accurate scrollHeight
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  // Resize on text change and on mount
  useEffect(() => {
    autoResize();
  }, [currText, autoResize]);

  const handleChange = (e) => {
    setCurrText(e.target.value);
  };

  // Calculate a dynamic width based on the longest line
  const dynamicWidth = useMemo(() => {
    const lines = currText.split('\n');
    const maxLineLen = Math.max(...lines.map((l) => l.length));
    // ~7.5px per character at 12.5px font, plus padding
    const calculated = Math.max(230, Math.min(500, maxLineLen * 7.5 + 50));
    return calculated;
  }, [currText]);

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="📝"
      accentColor="#f59e0b"
      inputs={dynamicInputs}
      outputs={[{ id: 'output' }]}
      style={{ width: dynamicWidth }}
    >
      <div className="base-node__field">
        <span className="base-node__label">Text</span>
        <textarea
          ref={textareaRef}
          className="base-node__textarea base-node__textarea--autosize"
          value={currText}
          onChange={handleChange}
          placeholder="Enter text… use {{ varName }} for variables"
          rows={1}
        />
      </div>
      {variables.length > 0 && (
        <div className="base-node__var-tags">
          {variables.map((v) => (
            <span key={v} className="base-node__var-tag">
              {v}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
