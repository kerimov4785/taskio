import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import { useNavigate } from 'react-router-dom';

function OverduePanel({ setIndex }) {
    const { tasks, toggleTaskStatus } = useContext(DataContext);
    const navigate = useNavigate();

    const todayStr = new Date().toISOString().split("T")[0];
    const overdueTasks = tasks.filter(t => t.dueDate && !t.isCompleted && t.dueDate < todayStr);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="overdue-panel">
            <div className="overdue-header">
                <div>
                    <h4>Overdue Tasks</h4>
                    <p>Tasks that need your attention</p>
                </div>
                <button className="view-all-link" onClick={() => {navigate('/tasks'); if(setIndex) setIndex(1);}}>
                    View All Tasks &rarr;
                </button>
            </div>

            {overdueTasks.length === 0 ? (
                <div className="overdue-empty">
                    <div className="success-icon-container">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="11" stroke="#00A63E" strokeWidth="2" />
                            <path d="M7 12.5L10.5 16L17 8" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h5>No overdue tasks 🎉</h5>
                    <p>You're all caught up!</p>
                </div>
            ) : (
                <div className="overdue-list">
                    {overdueTasks.map(task => (
                        <div className="overdue-task" key={task.id} onClick={() => toggleTaskStatus(task.id)}>
                            <div className="checkbox-red"></div>
                            <div className="task-info-red">
                                <h5>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="7" stroke="var(--color-red-600)" strokeWidth="1.5"/>
                                        <path d="M8 4V8M8 11.5H8.01" stroke="var(--color-red-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {task.title}
                                </h5>
                                <span className="overdue-badge">Overdue: {formatDate(task.dueDate)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OverduePanel;