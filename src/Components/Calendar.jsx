import React, { useState, useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import "../styles/calendar.css"

function Calendar({ selectedDate, setSelectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);
  const { tasks } = useContext(DataContext);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const getDotsForDate = (date) => {
    const dayStr = format(date, 'yyyy-MM-dd');
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    let hasOverdue = false;
    let hasActive = false;
    let hasCompleted = false;

    tasks.forEach(task => {
      if (task.dueDate && task.dueDate.split('T')[0] === dayStr) {
        if (task.isCompleted) {
          hasCompleted = true;
        } else {
          if (dayStr < todayStr) {
            hasOverdue = true;
          } else {
            hasActive = true;
          }
        }
      }
    });

    return { hasOverdue, hasActive, hasCompleted };
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(new Date(2023, 0, 1), { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="calendar-day-name" key={i}>
                {format(addDays(startDate, i), 'EEE')}
            </div>
        );
    }
    return days;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const dots = getDotsForDate(day);
        
        days.push(
          <div
            className={`calendar-cell ${!isSameMonth(day, monthStart) ? 'other-month' : ''} ${isSameDay(day, selectedDate) ? 'selected' : ''} ${isToday(day) ? 'today' : ''}`}
            key={day.toISOString()}
            onClick={() => onDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
            <div className="calendar-cell-dots">
              {dots.hasOverdue && <div className="dot overdue"></div>}
              {dots.hasActive && <div className="dot active"></div>}
              {dots.hasCompleted && <div className="dot completed"></div>}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <React.Fragment key={day.toISOString()}>
          {days}
        </React.Fragment>
      );
      days = [];
    }
    return rows;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="calendar-nav-btns">
          <button className="calendar-nav-btn" onClick={prevMonth}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="calendar-nav-btn" onClick={nextMonth}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
      <div className="calendar-grid">
        {renderDays()}
        {renderCells()}
      </div>
      <div className="calendar-legend">
        <div className="legend-item"><div className="dot overdue"></div> Overdue</div>
        <div className="legend-item"><div className="dot active"></div> Active</div>
        <div className="legend-item"><div className="dot completed"></div> Completed</div>
      </div>
    </div>
  );
}

export default Calendar;