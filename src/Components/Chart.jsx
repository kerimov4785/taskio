import React, { useContext, useState, useMemo } from 'react'
import '../styles/chart.css'
import { DataContext } from '../Context/DataContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Chart() {
    const [filter, setFilter] = useState('Month');
    const { tasks } = useContext(DataContext);

    const data = useMemo(() => {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        let initialData = [];
        const completedTasks = tasks.filter(t => t.isCompleted && t.completedAt);

        if (filter === 'Day') {
            initialData = [
                { name: '00:00', value: 0 },
                { name: '04:00', value: 0 },
                { name: '08:00', value: 0 },
                { name: '12:00', value: 0 },
                { name: '16:00', value: 0 },
                { name: '20:00', value: 0 },
                { name: '23:59', value: 0 },
            ];
            
            completedTasks.forEach(task => {
                const completedDate = new Date(task.completedAt);
                if (completedDate >= startOfDay) {
                    const hour = completedDate.getHours();
                    if (hour < 4) initialData[0].value++;
                    else if (hour < 8) initialData[1].value++;
                    else if (hour < 12) initialData[2].value++;
                    else if (hour < 16) initialData[3].value++;
                    else if (hour < 20) initialData[4].value++;
                    else if (hour < 24) initialData[5].value++;
                }
            });
        } else if (filter === 'Week') {
            const dayOfWeek = now.getDay() || 7;
            
            const startOfWeek = new Date(startOfDay);
            startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + 1);

            initialData = [
                { name: 'Mon', value: 0 },
                { name: 'Tue', value: 0 },
                { name: 'Wed', value: 0 },
                { name: 'Thu', value: 0 },
                { name: 'Fri', value: 0 },
                { name: 'Sat', value: 0 },
                { name: 'Sun', value: 0 },
            ];

            completedTasks.forEach(task => {
                const completedDate = new Date(task.completedAt);
                if (completedDate >= startOfWeek) {
                    const day = completedDate.getDay() || 7;
                    initialData[day - 1].value++;
                }
            });
        } else if (filter === 'Month') {
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            
            initialData = [
                { name: 'Week 1', value: 0 },
                { name: 'Week 2', value: 0 },
                { name: 'Week 3', value: 0 },
                { name: 'Week 4', value: 0 }
            ];

            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const totalDays = endOfMonth.getDate();
            if (totalDays > 28) {
                initialData.push({ name: 'Week 5', value: 0 });
            }

            completedTasks.forEach(task => {
                const completedDate = new Date(task.completedAt);
                if (completedDate >= startOfMonth && completedDate.getMonth() === now.getMonth()) {
                    const date = completedDate.getDate();
                    const week = Math.ceil(date / 7);
                    if (week <= initialData.length) {
                         initialData[week - 1].value++;
                    }
                }
            });
        }
        
        return initialData;
    }, [tasks, filter]);

    const completedCount = useMemo(() => {
        return data.reduce((sum, item) => sum + item.value, 0);
    }, [data]);

    return (
        <div className='chart' >
            <div className="chart-header">
                <div className='chart-header-left'>
                    <div className="icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 2.5V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H17.5" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 14.1667V7.5" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.8333 14.1667V4.16666" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.66666 14.1667V11.6667" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <h4>Analytics</h4>
                        <p>{completedCount} tasks completed</p>
                    </div>
                </div>
                <div className='chart-header-right'>
                    <button className={filter === 'Day' ? 'active' : ''} onClick={() => setFilter('Day')}>Day</button>
                    <button className={filter === 'Week' ? 'active' : ''} onClick={() => setFilter('Week')}>Week</button>
                    <button className={filter === 'Month' ? 'active' : ''} onClick={() => setFilter('Month')}>Month</button>
                </div>
            </div>
            <div className='chart-body'>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={{ stroke: '#9CA3AF' }} 
                            tickLine={false} 
                            tick={{ fill: '#6B7280', fontSize: 12 }} 
                            dy={10}
                        />
                        <YAxis 
                            axisLine={{ stroke: '#9CA3AF' }} 
                            tickLine={false} 
                            tick={{ fill: '#6B7280', fontSize: 12 }} 
                            dx={-10}
                            domain={[0, 'auto']}
                            allowDecimals={false}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#155DFC" 
                            strokeWidth={3} 
                            dot={{ fill: '#155DFC', strokeWidth: 2, r: 4 }} 
                            activeDot={{ r: 6 }} 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Chart