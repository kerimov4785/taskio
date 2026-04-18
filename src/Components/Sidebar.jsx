import React, { use, useContext, useState } from 'react'
import "../styles/sidebar.css"
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

function Sidebar({ index, setIndex, withDateTasks, totalTasks, activeTasks, activeGroup, setActiveGroup }) {
    const navigate = useNavigate()
    const location = useLocation()
    

    return (
        <div className='sidebar'>
            <div className='logo'>
                <img src={logo} alt="Taskio" />
                <div>
                    <h6>Taskio</h6>
                    <p>Productive Hub</p>
                </div>
            </div>
            <nav>
                <NavLink onClick={() => setIndex(0)} to="/">
                    <div style={{ top: `${index * 48 + index * 10 }px` }} className="status-bar"></div>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V9.16667C2.5 9.6269 2.8731 10 3.33333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16.6667 2.5H12.5C12.0398 2.5 11.6667 2.8731 11.6667 3.33333V5.83333C11.6667 6.29357 12.0398 6.66667 12.5 6.66667H16.6667C17.1269 6.66667 17.5 6.29357 17.5 5.83333V3.33333C17.5 2.8731 17.1269 2.5 16.6667 2.5Z" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16.6667 10H12.5C12.0398 10 11.6667 10.3731 11.6667 10.8333V16.6667C11.6667 17.1269 12.0398 17.5 12.5 17.5H16.6667C17.1269 17.5 17.5 17.1269 17.5 16.6667V10.8333C17.5 10.3731 17.1269 10 16.6667 10Z" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.5 13.3333H3.33333C2.8731 13.3333 2.5 13.7064 2.5 14.1667V16.6667C2.5 17.1269 2.8731 17.5 3.33333 17.5H7.5C7.96024 17.5 8.33333 17.1269 8.33333 16.6667V14.1667C8.33333 13.7064 7.96024 13.3333 7.5 13.3333Z" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Dashboard
                    <div>{totalTasks}</div>
                </NavLink>
                <NavLink onClick={() => { setActiveGroup(''), setIndex(1) }} to="/tasks">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66667 4.16667H3.33333C2.8731 4.16667 2.5 4.53977 2.5 5.00001V8.33334C2.5 8.79358 2.8731 9.16667 3.33333 9.16667H6.66667C7.1269 9.16667 7.5 8.79358 7.5 8.33334V5.00001C7.5 4.53977 7.1269 4.16667 6.66667 4.16667Z" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.5 14.1667L4.16667 15.8333L7.5 12.5" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.8333 5H17.5" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.8333 10H17.5" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.8333 15H17.5" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Tasks
                    <div>{activeTasks}</div>
                </NavLink>
                <NavLink onClick={() => setIndex(2)} to="/calendar">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66666 1.66667V5.00001" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.3333 1.66667V5.00001" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07952 2.5 4.99999V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V4.99999C17.5 4.07952 16.7538 3.33333 15.8333 3.33333Z" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.5 8.33333H17.5" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Calendar
                    <div>{withDateTasks}</div>
                </NavLink>
            </nav>
            <div className='sidebar-groups'>
                <h5>GROUPS</h5>
                <ul>
                    <li onClick={() => { navigate("/tasks"); setActiveGroup("work"); setIndex(1) }}
                        style={{ "--accent-color": "var(--color-blue-100)", backgroundColor: activeGroup === "work" ? "var(--color-blue-50) !important" : "transparent", color: activeGroup === "work" ? "var(--color-blue-700)" : "var(--color-gray-700)" }}>
                        <span className='dot' style={{ backgroundColor: "var(--color-blue-500)" }}></span>
                        Work
                    </li>
                    <li onClick={() => { navigate("/tasks"); setActiveGroup("study"); setIndex(1) }}
                        style={{ "--accent-color": "var(--color-purple-100)", backgroundColor: activeGroup === "study" ? "var(--color-purple-50) !important" : "transparent", color: activeGroup === "study" ? "var(--color-purple-700)" : "var(--color-gray-700)" }}>
                        <span className='dot' style={{ backgroundColor: "var(--color-purple-500)" }}></span>
                        Study
                    </li>
                    <li onClick={() => { navigate("/tasks"); setActiveGroup("personal"); setIndex(1) }}
                        style={{ "--accent-color": "var(--color-green-100)", backgroundColor: activeGroup === "personal" ? "var(--color-green-50) !important" : "transparent", color: activeGroup === "personal" ? "var(--color-green-700)" : "var(--color-gray-700)" }}>
                        <span className='dot' style={{ backgroundColor: "var(--color-green-500)" }}></span>
                        Personal
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar