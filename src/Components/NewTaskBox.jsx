import React, { useState, useRef, useEffect, useContext } from 'react';
import '../styles/newtaskbox.css';
import { DataContext } from '../Context/DataContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function NewTaskBox({ activeGroup }) {
    const { addTask } = useContext(DataContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [group, setGroup] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
    const boxRef = useRef(null);

    useEffect(() => {
        setGroup(activeGroup || 'Personal')
    }, [activeGroup])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                if (event.target.closest('.react-datepicker-popper')) return;
                setIsExpanded(false);
                setIsGroupDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleFocus = () => {
        setIsExpanded(true);
    };

    const handleAddTask = () => {
        if (title.trim()) {
            const dateStr = dueDate ? new Date(dueDate.getTime() - (dueDate.getTimezoneOffset() * 60000)).toISOString() : "";
            addTask(title.trim(), group, priority, dateStr);
            setTitle('');
            setDueDate(null);
            setIsExpanded(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsExpanded(false);
            setIsGroupDropdownOpen(false);
            e.target.blur();
        } else if (e.key === 'Enter') {
            handleAddTask();
            e.target.blur();
        }
    };

    const groups = ['Work', 'Study', 'Personal'];

    return (
        <div className={`new-task-box ${isExpanded ? 'expanded' : ''}`} ref={boxRef}>
            <div className="new-task-input-row" onClick={handleFocus}>
                <div className="plus-btn" onClick={(e) => {
                    e.stopPropagation();
                    handleAddTask();
                }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={handleFocus}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {isExpanded && (
                <>
                    <div className="new-task-options-row">
                        <div className="option-group">
                            <span className="option-label">Group:</span>
                            <div className="group-dropdown-container">
                                <button className="dropdown-style-btn" onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}>
                                    <span className={`group-dot dot-${group.toLowerCase()}`}></span>
                                    {group}
                                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: isGroupDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                                {isGroupDropdownOpen && (
                                    <div className="dropdown-menu">
                                        {groups.map(g => (
                                            <button
                                                key={g}
                                                className={`dropdown-item ${group === g ? 'active' : ''}`}
                                                onClick={() => { setGroup(g); setIsGroupDropdownOpen(false); }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span className={`group-dot dot-${g.toLowerCase()}`}></span>
                                                    {g}
                                                </div>
                                                {group === g && (
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="option-group">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="option-icon">
                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="option-label">Priority:</span>
                            <div className="priority-toggles">
                                {['Low', 'Medium', 'High'].map(p => (
                                    <button
                                        key={p}
                                        className={`priority-toggle ${priority === p ? `active-${p.toLowerCase()}` : ''}`}
                                        onClick={() => setPriority(p)}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="option-group">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="option-icon">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="option-label">Due:</span>
                            <DatePicker
                                selected={dueDate}
                                onChange={(date) => setDueDate(date)}
                                customInput={
                                    <button className="set-date-btn">
                                        {dueDate ? dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Set date'}
                                    </button>
                                }
                                dateFormat="MMM d"
                            />
                        </div>
                        
                        {title.trim().length > 0 && (
                            <button className="add-task-submit-btn" onClick={handleAddTask}>
                                Add Task
                            </button>
                        )}
                    </div>

                    <div className="new-task-footer">
                        <span className="footer-hint">
                            Press <kbd>Enter</kbd> to add or <kbd>Esc</kbd> to cancel
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}

export default NewTaskBox;