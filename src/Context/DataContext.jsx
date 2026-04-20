import { differenceInDays } from "date-fns";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const DataContext = createContext();

function DataProvider({ children }) {
    const STORAGE_KEY = 'taskio_tasks';
    const [streakCount, setStreakCount] = useState(1)
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title, group, priority, dueDate) => {
        const newTask = {
            id: crypto.randomUUID(),
            title: title,
            group: group || "",
            priority,
            isCompleted: false,
            dueDate: dueDate || new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString()
        };
        setTasks(prev => [...prev, newTask])
        toast.success("Task added successfully")
    }

    const updateTask = (id, updates) => {
        setTasks(prev => prev.map(item => item.id === id ? { ...item, updates } : item))
        toast.success("Task updated successfully")
    }

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(item => item.id !== id))
        toast.success("Task deleted successfully")
    }

    const toggleTaskStatus = (id) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === id) {
                const isNowCompleted = !task.isCompleted;
                return {
                    ...task,
                    isCompleted: isNowCompleted,
                    completedAt: isNowCompleted ? new Date().toISOString() : null
                };
            }
            return task;
        }));
        toast.success("Task status updated successfully")
    };

    const getStreak = () => {
        const dates = [...new Set(tasks
            .filter(t => t.isCompleted)
            .map(t => new Date(t.completedAt).toISOString().split('T')[0])
        )].sort().reverse();

        if (dates.length === 0) return 0;

        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (dates[0] !== today && dates[0] !== yesterdayStr) {
            return 0;
        }

        let streak = 1;
        for (let i = 0; i < dates.length - 1; i++) {
            const current = new Date(dates[i]);
            const next = new Date(dates[i + 1]);

            if (current - next === 86400000) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    };



    const [searchQuery, setSearchQuery] = useState('');

    const [groups, setGroups] = useState(() => {
        const saved = localStorage.getItem('taskio_groups');
        return saved ? JSON.parse(saved) : [
            { name: 'Work', color: 'blue' },
            { name: 'Study', color: 'purple' },
            { name: 'Personal', color: 'green' }
        ];
    });

    useEffect(() => {
        localStorage.setItem('taskio_groups', JSON.stringify(groups));
    }, [groups]);

    const addGroup = (name, color) => {
        setGroups(prev => [...prev, { name, color }]);
    };

    return (
        <DataContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask, toggleTaskStatus, streakCount, setStreakCount, getStreak, searchQuery, setSearchQuery, groups, addGroup }}>
            {children}
        </DataContext.Provider>
    )
}

export { DataProvider, DataContext };
