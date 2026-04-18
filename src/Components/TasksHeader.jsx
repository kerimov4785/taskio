import React, { useContext, useState, useRef, useEffect } from 'react';
import '../styles/tasksheader.css';
import { DataContext } from '../Context/DataContext';

function TasksHeader({activeGroup, activeFilter, setActiveFilter, sortBy, setSortBy}) {
    const {tasks} = useContext(DataContext)
    const filteredTasks = tasks.filter(item => item.group.toLowerCase() == activeGroup.toLowerCase() || activeGroup == "" );
    const activeTasks = tasks.filter(item => item.isCompleted == false && (item.group.toLowerCase() == activeGroup.toLowerCase() || activeGroup == "" ) );
    const completedTasks = tasks.filter(item => item.isCompleted == true && (item.group.toLowerCase() == activeGroup.toLowerCase() || activeGroup == "" ) );
    const todayStr = new Date().toISOString().split("T")[0];
    const overdueTasks = tasks.filter(t => t.dueDate && !t.isCompleted && t.dueDate < todayStr && (t.group.toLowerCase() == activeGroup.toLowerCase() || activeGroup == "" ) );
    const dueTodayTasks = tasks.filter(t => t.dueDate && !t.isCompleted && t.dueDate == todayStr && (t.group.toLowerCase() == activeGroup.toLowerCase() || activeGroup == "" ) );

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filters = [
        { name: 'All', count: filteredTasks.length },
        { name: 'Active', count: activeTasks.length },
        { name: 'Completed', count: completedTasks.length },
        { name: 'Due Today', count: dueTodayTasks.length },
        { name: 'Overdue', count: overdueTasks.length },
    ];

    return (
        <div className="tasks-header">
            <div className="tasks-filters">
                {filters.map((filter) => (
                    <button
                        key={filter.name}
                        className={`filter-btn ${activeFilter === filter.name ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter.name)}
                    >
                        <span>{filter.name}</span>
                        <span className="filter-badge">{filter.count}</span>
                    </button>
                ))}
            </div>

            <div className="tasks-sort-container">
                <button className="icon-btn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83333 14.1667V4.16667M5.83333 4.16667L2.5 7.5M5.83333 4.16667L9.16667 7.5" stroke="var(--color-gray-500)" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14.1667 5.83333V15.8333M14.1667 15.8333L10.8333 12.5M14.1667 15.8333L17.5 12.5" stroke="var(--color-gray-500)" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className="sort-dropdown" ref={dropdownRef}>
                    <button className="sort-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        Sort by {sortBy === 'DueDate' ? 'Due Date' : 'Priority'}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                            <path d="M4 6L8 10L12 6" stroke="var(--color-gray-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <button className={`dropdown-item ${sortBy === 'DueDate' ? 'active' : ''}`} onClick={() => { setSortBy('DueDate'); setIsDropdownOpen(false); }}>
                                Sort by Due Date
                                {sortBy === 'DueDate' && (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </button>
                            <button className={`dropdown-item ${sortBy === 'Priority' ? 'active' : ''}`} onClick={() => { setSortBy('Priority'); setIsDropdownOpen(false); }}>
                                Sort by Priority
                                {sortBy === 'Priority' && (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TasksHeader;