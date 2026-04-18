import React from 'react'
import "../styles/header.css"
import { useLocation } from 'react-router-dom'
function Header() {
  const location = useLocation()
  
  function getTitle() {
    if(location.pathname === "/") {
      return "Dashboard"
    } else if(location.pathname === "/tasks") {
      return "Tasks"
    } else if(location.pathname === "/calendar") {
      return "Calendar"
    } else if(location.pathname === "/profile") {
      return "Profile"
    } else if(location.pathname === "/settings") {
      return "Settings"
    }
  }
  function getDescription() {
    if(location.pathname === "/") {
      return "Overview of your productivity"
    } else if(location.pathname === "/tasks") {
      return "Manage your tasks efficiently"
    } else if(location.pathname === "/calendar") {
      return "Plan your schedule and visualize tasks by date"
    } else if(location.pathname === "/profile") {
      return "View and edit your profile information"
    } else if(location.pathname === "/settings") {
      return "Manage your account and preferences"
    }
  }
  return (
    <header>
      <div>
        <h4>{getTitle()}</h4>
        <p>{getDescription()}</p>
      </div>
      <div>
                  
      </div>
    </header>
  )
}

export default Header