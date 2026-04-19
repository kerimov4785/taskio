import React, { useState } from 'react'
import Calendar from '../Components/Calendar'
import DateTasksPanel from '../Components/DateTasksPanel'
import '../styles/calendar.css'

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="calendar-page">
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <DateTasksPanel selectedDate={selectedDate} />
    </div>
  )
}

export default CalendarPage