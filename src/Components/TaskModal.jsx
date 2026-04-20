import React, { useState, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { DataContext } from '../Context/DataContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/taskmodal.css';

function TaskModal({ onClose }) {
    const { addTask, groups: globalGroups } = useContext(DataContext);
    const [title, setTitle] = useState('');
    const [group, setGroup] = useState('Personal');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState(null);
    const [isGroupOpen, setIsGroupOpen] = useState(false);
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);

    const groupRef = useRef(null);
    const priorityRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (groupRef.current && !groupRef.current.contains(event.target)) {
                setIsGroupOpen(false);
            }
            if (priorityRef.current && !priorityRef.current.contains(event.target)) {
                setIsPriorityOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = () => {
        if (title.trim()) {
            const dateStr = dueDate ? new Date(dueDate.getTime() - (dueDate.getTimezoneOffset() * 60000)).toISOString() : "";
            addTask(title.trim(), group, priority, dateStr);
            onClose();
        }
    };

    const priorities = ['Low', 'Medium', 'High'];

    return createPortal(
        <div className="task-modal-overlay">
            <div className="task-modal-content">
                <button className="task-modal-close" onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div className="task-modal-header">
                    <h2>Add New Task</h2>
                    <p>Create a new task with an optional due date to stay organized.</p>
                </div>
                
                <div className="task-modal-body">
                    <div className="tm-field">
                        <label>Task Title</label>
                        <input type="text" placeholder="What needs to be done?" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>

                    <div className="tm-field" ref={groupRef}>
                        <label>Group</label>
                        <div className="tm-dropdown">
                            <button className="tm-dropdown-trigger" onClick={() => setIsGroupOpen(!isGroupOpen)}>
                                {group ? (
                                    <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                        <span className="group-dot" style={{ backgroundColor: `var(--color-${(globalGroups.find(g => g.name === group) || {color: 'blue'}).color}-500)` }}></span>
                                        {group}
                                    </span>
                                ) : "Select a group (optional)"}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            {isGroupOpen && (
                                <div className="tm-dropdown-menu">
                                    {globalGroups.map(g => (
                                        <button key={g.name} className="tm-dropdown-item" onClick={() => {setGroup(g.name); setIsGroupOpen(false);}}>
                                            <span className="group-dot" style={{ backgroundColor: `var(--color-${g.color}-500)` }}></span>
                                            {g.name}
                                            {group === g.name && <svg width="16" height="16" style={{marginLeft: 'auto'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="tm-field" ref={priorityRef}>
                        <label>Priority</label>
                        <div className="tm-dropdown">
                            <button className="tm-dropdown-trigger" onClick={() => setIsPriorityOpen(!isPriorityOpen)}>
                                {priority} Priority
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            {isPriorityOpen && (
                                <div className="tm-dropdown-menu">
                                    {priorities.map(p => (
                                        <button key={p} className="tm-dropdown-item" onClick={() => {setPriority(p); setIsPriorityOpen(false);}}>
                                            {p} Priority
                                            {priority === p && <svg width="16" height="16" style={{marginLeft: 'auto'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="tm-field">
                        <label>Due Date (Optional)</label>
                        <div className="tm-date-wrapper">
                            <svg className="tm-date-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            <DatePicker
                                selected={dueDate}
                                onChange={(date) => setDueDate(date)}
                                placeholderText="Pick a date"
                                dateFormat="MMM d, yyyy"
                                className="tm-date-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="task-modal-footer">
                    <button className="tm-cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="tm-add-btn" style={{backgroundColor: title.trim().length > 0 ? "var(--color-blue-600)" : "var(--color-gray-300)" , cursor: title.trim().length > 0 ? "pointer" : "not-allowed" }} onClick={handleSubmit}>Add Task</button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default TaskModal;
