import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import { format, isToday } from 'date-fns';
import '../styles/tasks.css';

function DateTasksPanel({ selectedDate }) {
  const { tasks, toggleTaskStatus, deleteTask } = useContext(DataContext);

  const dayStr = format(selectedDate, 'yyyy-MM-dd');
  const dayTasks = tasks.filter(t => t.dueDate.split('T')[0] === dayStr);

  const activeTasks = dayTasks.filter(t => !t.isCompleted);
  const completedTasks = dayTasks.filter(t => t.isCompleted);

  const isSelectedToday = isToday(selectedDate);
  let title = format(selectedDate, 'MMM d, yyyy');
  let subtitle = format(selectedDate, 'EEEE');

  if (dayTasks.length > 0 && isSelectedToday) {
    title = "Today's Tasks";
    subtitle = format(selectedDate, 'EEEE, MMMM d');
  }

  return (
    <div className="calendar-panel">
      {dayTasks.length > 0 ? (
        <>
          <div className="panel-header">
            <div className="panel-header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div className="panel-header-text">
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>
          </div>

          <div className="panel-stats">
            <div className="panel-stat-card active-stat">
              <div className="stat-title">Active</div>
              <div className="stat-value">{activeTasks.length}</div>
            </div>
            <div className="panel-stat-card completed-stat">
              <div className="stat-title">Completed</div>
              <div className="stat-value">{completedTasks.length}</div>
            </div>
          </div>

          <div className="panel-separator"></div>

          <div className="panel-tasks-list">
            {dayTasks.map(task => {
              const isOverdue = !task.isCompleted && task.dueDate && task.dueDate.split('T')[0] < format(new Date(), 'yyyy-MM-dd');
              return (
              <div key={task.id} className={`panel-task-card ${task.isCompleted ? 'completed' : isOverdue ? 'overdue-card' : ''}`}>
                <div
                  className={`ptc-checkbox ${task.isCompleted ? 'checked' : isOverdue ? 'overdue-check' : ''}`}
                  onClick={() => toggleTaskStatus(task.id)}
                >
                  {task.isCompleted && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  )}
                </div>
                <div className="ptc-content">
                  <span className={`ptc-title ${task.isCompleted ? 'completed' : ''}`}>
                    {task.title}
                  </span>
                  <div className="ptc-badges">
                    <span className={`task-priority tag-${task.priority.toLowerCase()}`}>
                      {task.priority === 'High' ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                        ) : task.priority === 'Medium' ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        ) : (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 13l4 4L19 7"/>
                            </svg>
                        )}
                      {task.priority}
                    </span>
                    {task.group && (
                      <span className={`task-group tag-${task.group.toLowerCase()}`}>
                        {task.group}
                      </span>
                    )}
                    {task.isCompleted && (
                      <span className="task-status status-completed" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', color: 'var(--color-green-600)' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        Completed
                      </span>
                    )}
                    {isOverdue && (
                      <span className="task-status status-overdue" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', color: 'var(--color-red-600)', background: 'var(--color-red-100)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '500' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 15 15"></polyline></svg>
                        Overdue
                      </span>
                    )}
                  </div>
                </div>
                <button className="panel-task-delete" onClick={() => deleteTask(task.id)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            )})}
          </div>
        </>
      ) : (
        <>
          <div className="panel-header" style={{ borderBottom: 'none' }}>
            <div className="panel-header-icon" style={{ background: 'var(--color-blue-50)', color: 'var(--color-blue-500)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div className="panel-header-text">
              <h3>{format(selectedDate, 'MMM d, yyyy')}</h3>
              <p>{format(selectedDate, 'EEEE')}</p>
            </div>
          </div>
          <div className="panel-separator"></div>
          <div className="empty-state-panel">
            <div className="empty-state-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3>All clear!</h3>
            <p>No tasks scheduled for this day</p>
          </div>
        </>
      )}
    </div>
  );
}

export default DateTasksPanel;