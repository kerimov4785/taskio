import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import { useNavigate } from 'react-router-dom';

function TodayFocus({ setIndex }) {
    const { tasks } = useContext(DataContext);
    const navigate = useNavigate();

    const todayStr = new Date().toISOString().split("T")[0];
    const todayTasks = tasks.filter(t => t.dueDate && t.dueDate.split("T")[0] === todayStr);
    
    const completedToday = todayTasks.filter(t => t.isCompleted).length;
    const totalToday = todayTasks.length;
    const progressPercent = totalToday === 0 ? 0 : Math.round((completedToday / totalToday) * 100);

    return (
        <div className="today-focus">
            <div className="focus-header">
                <div className="icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8333 1.66667L2.5 11.6667H9.16667L8.33333 18.3333L16.6667 8.33333H10L10.8333 1.66667Z" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div>
                    <h4>Today's Focus</h4>
                    <p>{completedToday} of {totalToday} tasks completed</p>
                </div>
            </div>
            
            <div className="progress-container">
                <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <div className="progress-text">{progressPercent}%</div>
            </div>
            
            <p className="focus-subtitle">Let's keep the momentum going!</p>
            
            <button className="view-all go-to-tasks" onClick={() => { navigate('/tasks'); if(setIndex) setIndex(1); }}>
                Go to Tasks &rarr;
            </button>
        </div>
    );
}

export default TodayFocus;