import { Route, Router, Routes, useLocation } from "react-router-dom"
import Tasks from "./Pages/Tasks"
import Dashboard from "./Pages/Dashboard"
import Calendar from "./Pages/Calendar"
import Settings from "./Pages/Settings"
import Profile from "./Pages/Profile"
import Sidebar from "./Components/Sidebar"
import Header from "./Components/Header"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "./Context/DataContext"

function App() {
  const [activeGroup, setActiveGroup] = useState("")
  const location = useLocation()
  const [index, setIndex] = useState(
    location.pathname === "/" ? 0 : location.pathname === "/tasks" ? 1 : location.pathname === "/calendar" ? 2 : 0
  )
  const { tasks } = useContext(DataContext)
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(item => item.isCompleted == false).length;
  const completedTasks = tasks.filter(item => item.isCompleted == true).length;
  const workTasks = tasks.filter(item => item.group.toLowerCase() == "work").length;
  const studyTasks = tasks.filter(item => item.group.toLowerCase() == "study").length;
  const personalTasks = tasks.filter(item => item.group.toLowerCase() == "personal").length;
  const completedTasksToday = tasks.filter(item => item.isCompleted == true && item.completedAt.split("T")[0] == new Date().toISOString().split("T")[0]).length;
  const withDateTasks = tasks.filter(item => item.dueDate !== "" && item.isCompleted == false).length;

  useEffect(() => {
    window.scrollTo(0, 0)
    if (location.pathname !== "/tasks") {
      setActiveGroup("")
    }
  }, [location])
  return (
    <>
      <Sidebar workTasks={workTasks} studyTasks={studyTasks} personalTasks={personalTasks} index={index} setIndex={setIndex} withDateTasks={withDateTasks} totalTasks={totalTasks} activeTasks={activeTasks} activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard index={index} setIndex={setIndex} completedTasks={completedTasks} activeTasks={activeTasks} totalTasks={totalTasks} completedTasksToday={completedTasksToday} />} />
          <Route path="/tasks" element={<Tasks activeGroup={activeGroup} />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </>
  )
}

export default App
