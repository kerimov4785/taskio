import { Route, Router, Routes, useLocation } from "react-router-dom"
import Tasks from "./Pages/Tasks"
import Dashboard from "./Pages/Dashboard"
import Calendar from "./Pages/Calendar"
import Sidebar from "./Components/Sidebar"
import Header from "./Components/Header"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "./Context/DataContext"

function App() {
  const [activeGroup, setActiveGroup] = useState("")
  const [activeFilter, setActiveFilter] = useState('All');
  const location = useLocation()
  const [index, setIndex] = useState(
    location.pathname === "/" ? 0 : location.pathname === "/tasks" ? 1 : location.pathname === "/calendar" ? 2 : 0
  )
  const { tasks } = useContext(DataContext)
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(item => item.isCompleted == false).length;
  const completedTasks = tasks.filter(item => item.isCompleted == true).length;
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
      <Sidebar index={index} setIndex={setIndex} withDateTasks={withDateTasks} totalTasks={totalTasks} activeTasks={activeTasks} activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
      <Header setIndex={setIndex} />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard setActiveFilter={setActiveFilter} index={index} setIndex={setIndex} completedTasks={completedTasks} activeTasks={activeTasks} totalTasks={totalTasks} completedTasksToday={completedTasksToday} />} />
          <Route path="/tasks" element={<Tasks activeGroup={activeGroup} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </main>
    </>
  )
}

export default App
