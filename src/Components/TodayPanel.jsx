import React, { useContext } from 'react'
import { DataContext } from '../Context/DataContext'
import { useNavigate } from 'react-router-dom';

function TodayPanel({setActiveFilter, setIndex }) {
    const { tasks, toggleTaskStatus } = useContext(DataContext);
    const navigate = useNavigate();

    const todayStr = new Date().toISOString().split("T")[0];
    const todayTasks = tasks.filter(t => t.dueDate && t.dueDate.split("T")[0] === todayStr);
    const leftTasksCount = todayTasks.filter(t => !t.isCompleted).length;

    return (
        <div className='today-panel'>
            <div className='today-header'>
                <div className='icon'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66666 1.66667V5.00001" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.3333 1.66667V5.00001" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07952 2.5 4.99999V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V4.99999C17.5 4.07952 16.7538 3.33333 15.8333 3.33333Z" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.5 8.33333H17.5" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div>
                    <h4>Today's Tasks</h4>
                    <p>{leftTasksCount} of {todayTasks.length} left</p>
                </div>
            </div>

            <div className='today-list'>
                {todayTasks.slice(0, 3).map(task => (
                    <div className='today-task' key={task.id} onClick={() => toggleTaskStatus(task.id)}>
                        <div className={`checkbox ${task.isCompleted ? 'checked' : ''}`}>
                            {task.isCompleted && (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                        <div className='task-info'>
                            <h5 className={task.isCompleted ? 'completed' : ''}>{task.title}</h5>
                            <div className='task-tags'>
                                <span className={`tag-${task.priority.toLowerCase()}`}>{task.priority}</span>
                                <span className='due-text'>Due today</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className='view-all' onClick={() => { navigate('/tasks'), setIndex(1) , setActiveFilter('Due Today')}}>
                View All Tasks
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33333 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 3.33333L12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    )
}

export default TodayPanel