// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar">
            <div className="toolbar__logo">
                <div className="toolbar__logo-icon">⚡</div>
                <span className="toolbar__logo-text">Pipeline Builder</span>
            </div>
            <div className="toolbar__nodes">
                <DraggableNode type='customInput' label='Input' icon='📥' />
                <DraggableNode type='customOutput' label='Output' icon='📤' />
                <DraggableNode type='text' label='Text' icon='📝' />
                <DraggableNode type='note' label='Note' icon='🗒️' />
            </div>
            <div className="toolbar__divider" />
            <div className="toolbar__nodes">
                <DraggableNode type='llm' label='LLM' icon='🤖' />
                <DraggableNode type='filter' label='Filter' icon='🔍' />
                <DraggableNode type='merge' label='Merge' icon='🔗' />
                <DraggableNode type='api' label='API' icon='🌐' />
                <DraggableNode type='conditional' label='Conditional' icon='🔀' />
            </div>
        </div>
    );
};
