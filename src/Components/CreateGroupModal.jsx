import React, { useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import { DataContext } from '../Context/DataContext';
import '../styles/creategroupmodal.css';

function CreateGroupModal({ onClose }) {
    const { addGroup, groups } = useContext(DataContext);
    const [name, setName] = useState('');
    const [color, setColor] = useState('blue');

    const availableColors = ['blue', 'purple', 'green', 'orange', 'pink', 'indigo'];

    const handleSubmit = () => {
        if (name.trim() && !groups.find(g => g.name.toLowerCase() === name.trim().toLowerCase())) {
            addGroup(name.trim(), color);
            onClose();
        }
    };

    const isSubmitDisabled = name.trim().length === 0;

    return createPortal(
        <div className="group-modal-overlay">
            <div className="group-modal-content">
                <button className="group-modal-close" onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div className="group-modal-header">
                    <h2>Create New Group</h2>
                    <p>Organize your tasks into groups or categories.</p>
                </div>
                
                <div className="group-modal-body">
                    <div className="gm-field">
                        <label>Group Name</label>
                        <input type="text" placeholder="e.g., Work, Study, Personal" value={name} onChange={e => setName(e.target.value)} />
                    </div>

                    <div className="gm-field">
                        <label>Color</label>
                        <div className="color-picker">
                            {availableColors.map(c => (
                                <button
                                    key={c}
                                    className={`color-btn ${color === c ? 'selected' : ''}`}
                                    onClick={() => setColor(c)}
                                >
                                    <span className="color-circle" style={{ backgroundColor: `var(--color-${c}-500)` }}></span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="group-modal-footer">
                    <button className="gm-cancel-btn" onClick={onClose}>Cancel</button>
                    <button 
                        className="gm-submit-btn" 
                        onClick={handleSubmit} 
                        disabled={isSubmitDisabled}
                        style={{
                            backgroundColor: isSubmitDisabled ? "var(--color-gray-300)" : "var(--color-blue-600)",
                            cursor: isSubmitDisabled ? "not-allowed" : "pointer"
                        }}
                    >
                        Create Group
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default CreateGroupModal;
