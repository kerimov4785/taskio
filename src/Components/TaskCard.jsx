import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import '../styles/tasks.css';

function TaskCard({ task }) {
    const { toggleTaskStatus , deleteTask, groups } = useContext(DataContext);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        if (!dateStr) return '';
        const today = new Date().toISOString().split("T")[0];
        if (dateStr.split("T")[0] === today) {
            return "Today";
        }
        if (dateStr.split("T")[0] < today) {
            return `Overdue: ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        }
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const isToday = task.dueDate && task.dueDate.split("T")[0] === new Date().toISOString().split("T")[0];
    const isOverdue = task.dueDate && task.dueDate.split("T")[0] < new Date().toISOString().split("T")[0];
    return (                                    
        <div className="task-card">
            <div className="task-card-left" onClick={() => toggleTaskStatus(task.id)}>
                <div className={`task-checkbox-circle ${task.isCompleted ? 'checked' : ''}`}>
                    {task.isCompleted && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                </div>
                <h4 className={`task-title ${task.isCompleted ? 'completed' : ''}`}>
                    {task.title}
                </h4>
            </div>
            <div className="task-card-right">
                {task.group && (() => {
                    const groupColor = (groups.find(g => g.name === task.group) || {color: 'blue'}).color;
                    return (
                        <span className="task-group" style={{ color: `var(--color-${groupColor}-700)`, backgroundColor: `var(--color-${groupColor}-50)`, border: `1px solid var(--color-${groupColor}-200)` }}>
                            {task.group}
                        </span>
                    );
                })()}
                <span className={`task-priority tag-${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>
                <div className={`task-date ${isToday ? 'today' : isOverdue ? 'overduee' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.33333 1.33334V4.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.6667 1.33334V4.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.6667 2.66666H3.33333C2.59695 2.66666 2 3.26362 2 4.00001V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4.00001C14 3.26362 13.403 2.66666 12.6667 2.66666Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 6.66666H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{formatDate(task.dueDate)}</span>
                </div>
                <span className={`task-status ${task.isCompleted ? 'status-completed' : 'status-active'}`}>
                    {task.isCompleted ? 'Completed' : 'Active'}
                </span>
                <button className="task-delete-btn" onClick={() => deleteTask(task.id)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default TaskCard;