import React, { useState, useContext, useEffect } from 'react'
import "../styles/header.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { DataContext } from '../Context/DataContext'
import TaskModal from './TaskModal'

function Header({ sidebarIsOpen, setIndex, setSidebarIsOpen, windowWidth }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { searchQuery, setSearchQuery } = useContext(DataContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function getTitle() {
    if (location.pathname === "/") {
      return "Dashboard"
    } else if (location.pathname === "/tasks") {
      return "Tasks"
    } else if (location.pathname === "/calendar") {
      return "Calendar"
    }
  }
  function getDescription() {
    if (location.pathname === "/") {
      return "Overview of your productivity"
    } else if (location.pathname === "/tasks") {
      return "Manage your tasks efficiently"
    } else if (location.pathname === "/calendar") {
      return "Plan your schedule"
    }
  }

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value)
      if (location.pathname !== '/tasks' && e.target.value.trim() !== '') {
        navigate('/tasks')
        setIndex(1)
      }
    }

    return (
      <header style={{ filter: sidebarIsOpen ? "brightness(0.5)" : "brightness(1)" }}>
        <div onClick={() => setSidebarIsOpen(prev => !prev)} className="burger-menu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33301 9.99933H16.6654" stroke="#4A5565" strokeWidth="1.66655" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.33301 4.99963H16.6654" stroke="#4A5565" strokeWidth="1.66655" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.33301 14.999H16.6654" stroke="#4A5565" strokeWidth="1.66655" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h4>{getTitle()}</h4>
          <p>{getDescription()}</p>
        </div>
        <div className="header-right-actions">
          <div className="header-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search tasks..." value={searchQuery} onChange={handleSearchChange} />
          </div>
          <button className="header-add-task-btn" onClick={() => setIsModalOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            {windowWidth > 1024 ? "Add Task" : ""}
          </button>
          <div className="header-profile-avatar">
            MA
          </div>
        </div>
        {isModalOpen && <TaskModal onClose={() => setIsModalOpen(false)} />}
      </header>
    )
  }

  export default Header