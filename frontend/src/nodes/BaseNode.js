// BaseNode.js
// Reusable abstraction for all pipeline nodes.
// Handles: card wrapper, header, auto-positioned handles w/ labels, body slot.
//
// Usage:
//   <BaseNode id={id} title="LLM" icon="🤖" accentColor="#8B5CF6"
//     inputs={[{ id: 'prompt', label: 'Prompt' }]}
//     outputs={[{ id: 'response', label: 'Response' }]}
//   >
//     {/* custom body content */}
//   </BaseNode>

import { Handle, Position } from 'reactflow';
import './BaseNode.css';

/**
 * @param {Object}   props
 * @param {string}   props.id           — ReactFlow node id
 * @param {string}   props.title        — Display title
 * @param {string}   [props.icon]       — Emoji / icon character
 * @param {string}   [props.accentColor] — CSS color for header gradient & handles
 * @param {Array}    [props.inputs]     — [{ id, label }] target handles on the left
 * @param {Array}    [props.outputs]    — [{ id, label }] source handles on the right
 * @param {string}   [props.variant]    — Optional CSS modifier class (e.g. "note")
 * @param {React.ReactNode} props.children — Node body content
 */
export const BaseNode = ({
  id,
  title,
  icon,
  accentColor = '#6366f1',
  inputs = [],
  outputs = [],
  variant,
  style,
  children,
}) => {
  // Calculate evenly-spaced vertical positions for handles
  const getHandleTop = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

  const rootClasses = [
    'base-node',
    variant ? `base-node--${variant}` : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={rootClasses}
      style={{ '--node-accent': accentColor, ...style }}
    >
      {/* ── Header ─────────────────────────────────── */}
      <div
        className="base-node__header"
        style={{
          background: `linear-gradient(135deg, ${accentColor}, ${adjustBrightness(accentColor, -25)})`,
        }}
      >
        {icon && <span className="base-node__icon">{icon}</span>}
        <span className="base-node__title">{title}</span>
      </div>

      {/* ── Body (children slot) ───────────────────── */}
      <div className="base-node__body">
        {children}
      </div>

      {/* ── Input Handles (left / target) ──────────── */}
      {inputs.map((handle, i) => (
        <div key={handle.id}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${handle.id}`}
            style={{ top: getHandleTop(i, inputs.length) }}
          />
          {handle.label && (
            <div
              className="base-node__handle-wrapper base-node__handle-wrapper--left"
              style={{ top: getHandleTop(i, inputs.length) }}
            >
              <span className="base-node__handle-label">{handle.label}</span>
            </div>
          )}
        </div>
      ))}

      {/* ── Output Handles (right / source) ────────── */}
      {outputs.map((handle, i) => (
        <div key={handle.id}>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${handle.id}`}
            style={{ top: getHandleTop(i, outputs.length) }}
          />
          {handle.label && (
            <div
              className="base-node__handle-wrapper base-node__handle-wrapper--right"
              style={{ top: getHandleTop(i, outputs.length) }}
            >
              <span className="base-node__handle-label">{handle.label}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Helper: darken / lighten a hex colour ─────────────── */
function adjustBrightness(hex, amount) {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  // Parse r, g, b
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  // Adjust
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));
  // Return hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
