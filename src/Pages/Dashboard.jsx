import React, { useContext, useEffect } from 'react'
import { DataContext } from '../Context/DataContext'
import '../styles/dashboard.css'
import '../styles/overdue.css'
import CardDashboard from '../Components/CardDashboard'
import Chart from '../Components/Chart'
import TodayPanel from '../Components/TodayPanel'
import OverduePanel from '../Components/OverduePanel'
import TodayFocus from '../Components/TodayFocus'

function Dashboard({setActiveFilter, index, setIndex, completedTasks, activeTasks, totalTasks, completedTasksToday }) {
  const { tasks, streakCount, getStreak, setStreakCount } = useContext(DataContext)

  useEffect(() => {
    setStreakCount(getStreak())
  }, [tasks])
  const cards = [
    {
      title: "Total tasks",
      number: totalTasks,
      color: "var(--color-blue-50)",
      hoverColor: "var(--color-blue-400)",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5H4C3.44772 5 3 5.44772 3 6V10C3 10.5523 3.44772 11 4 11H8C8.55228 11 9 10.5523 9 10V6C9 5.44772 8.55228 5 8 5Z" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 17L5 19L9 15" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 6H21" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 12H21" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 18H21" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    },
    {
      title: "Active tasks",
      number: activeTasks,
      color: "var(--color-orange-50)",
      hoverColor: "var(--color-orange-400)",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#F54900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 6V12L16 14" stroke="#F54900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    },
    {
      title: "Completed today",
      number: completedTasksToday,
      color: "var(--color-green-50)",
      hoverColor: "var(--color-green-400)",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    }
  ]
  return (
    <>
      <section className='dashboard' >
        <h3>Overview</h3>
        <p >Great progress! Keep it up 💪</p>
        <div className="dashboard-cards">
          {cards.map((card, index) => (
            <CardDashboard card={card} key={index} />
          ))}
          <div className="card streak-card">
            <div>
              <div>
                <p>Productivity Streak</p>
                <h3>{streakCount == 0 ? 'No streak yet' : streakCount} days</h3>
              </div>
              <div className='card-icon' style={{ backgroundColor: "var(--color-orange-100)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1_65)">
                    <path d="M8.5 14.5C9.16304 14.5 9.79893 14.2366 10.2678 13.7678C10.7366 13.2989 11 12.663 11 12C11 10.62 10.5 10 10 9C8.928 6.857 9.776 4.946 12 3C12.5 5.5 14 7.9 16 9.5C18 11.1 19 13 19 15C19 15.9193 18.8189 16.8295 18.4672 17.6788C18.1154 18.5281 17.5998 19.2997 16.9497 19.9497C16.2997 20.5998 15.5281 21.1154 14.6788 21.4672C13.8295 21.8189 12.9193 22 12 22C11.0807 22 10.1705 21.8189 9.32122 21.4672C8.47194 21.1154 7.70026 20.5998 7.05025 19.9497C6.40024 19.2997 5.88463 18.5281 5.53284 17.6788C5.18106 16.8295 5 15.9193 5 15C5 13.847 5.433 12.706 6 12C6 12.663 6.26339 13.2989 6.73223 13.7678C7.20107 14.2366 7.83696 14.5 8.5 14.5Z" stroke="#F54900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_65">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

              </div>
            </div>
            <h6>{streakCount == 0 ? 'Complete a task today to start your streak' : `You completed tasks ${streakCount} days in a row`}</h6>
            {streakCount != 0 ? <h6 style={{ color: "#F54900" }} >Keep it going💪</h6> : ''}
            <div className='card-circle' style={{ backgroundColor: "var(--color-orange-100)" }}></div>
          </div>
        </div>
        <div className='analytics'>
          <Chart />
          <TodayPanel  setActiveFilter={setActiveFilter} index={index} setIndex={setIndex} />
        </div>
        <div className="overdue">
          <OverduePanel setActiveFilter={setActiveFilter} setIndex={setIndex} />
          <TodayFocus setActiveFilter={setActiveFilter} setIndex={setIndex} />
        </div>
      </section>
    </>
  )
}

export default Dashboard