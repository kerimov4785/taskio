import { differenceInDays } from "date-fns";
import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
    const STORAGE_KEY = 'taskio_tasks';
    const [streakCount, setStreakCount] = useState(1)
    // const [tasks, setTasks] = useState(() => {
    //     const saved = localStorage.getItem(STORAGE_KEY);
    //     return saved ? JSON.parse(saved) : [];
    // })

    const [tasks, setTasks] = useState([
        {
            id: "task-1",
            title: "Сверстать шапку сайта по макету",
            group: "Work",
            priority: "High",
            isCompleted: false,
            completedAt: null,
            dueDate: "2026-04-19",
            createdAt: "2026-04-18T10:00:00.000Z"
        },
        {
            id: "task-2",
            title: "Повторить хуки useEffect и useContext",
            group: "Study",
            priority: "Medium",
            isCompleted: false,
            completedAt: null,
            dueDate: "2026-04-20",
            createdAt: "2026-04-18T11:30:00.000Z"
        },
        {
            id: "task-3",
            title: "Тренировка в зале (ноги/спина)",
            group: "Personal",
            priority: "High",
            isCompleted: true,
            completedAt: "2026-04-15T10:00:00.000Z",
            dueDate: "2026-04-18",
            createdAt: "2026-04-17T18:00:00.000Z"
        },
        {
            id: "task-4",
            title: "Подготовить план урока для 11-летних студентов",
            group: "Work",
            priority: "Medium",
            isCompleted: false,
            completedAt: null,
            dueDate: "2026-04-21",
            createdAt: "2026-04-18T09:15:00.000Z"
        },
        {
            id: "task-5",
            title: "Купить протеин и творог",
            group: "Personal",
            priority: "Low",
            isCompleted: true,
            completedAt: "2026-04-16T10:00:00.000Z",
            dueDate: "2026-04-19",
            createdAt: "2026-04-18T12:00:00.000Z"
        },
        {
            id: "task-6",
            title: "Выбрать университет в Европе для магистратуры",
            group: "Study",
            priority: "High",
            isCompleted: false,
            completedAt: null,
            dueDate: "2026-05-01",
            createdAt: "2026-04-15T14:00:00.000Z"
        },
        {
            id: "task-7",
            title: "Купить учебники для универа",
            group: "Study",
            priority: "High",
            isCompleted: true,
            completedAt: "2026-04-17T10:00:00.000Z",
            dueDate: "2026-04-20",
            createdAt: "2026-04-10T14:00:00.000Z"
        },
        {
            id: "task-8",
            title: "Купить учебники для универа",
            group: "Study",
            priority: "Medium",
            isCompleted: true,
            completedAt: "2026-04-18T10:00:00.000Z",
            dueDate: "2026-04-11",
            createdAt: "2026-04-10T14:00:00.000Z"
        },
        {
            id: "task-9",
            title: "Выбрать университет в Европе для магистратуры",
            group: "Study",
            priority: "High",
            isCompleted: false,
            completedAt: null,
            dueDate: "2026-04-12",
            createdAt: "2026-04-15T14:00:00.000Z"
        },
        {
            id: "task-10",
            title: "Купить учебники для универа",
            group: "Study",
            priority: "High",
            isCompleted: false,
            completedAt: null,
            dueDate: "2026-04-16",
            createdAt: "2026-04-10T14:00:00.000Z"
        },
        {
            id: "task-11",
            title: "Купить учебники для универа",
            group: "Study",
            priority: "Medium",
            isCompleted: false,
            completedAt: null,
            dueDate: "2026-04-12",
            createdAt: "2026-04-10T14:00:00.000Z"
        }
    ])

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
            dueDate: dueDate || new Date().toISOString(),
            createdAt: new Date().toISOString()
        };
        setTasks(prev => [...prev, newTask])
    }

    const updateTask = (id, updates) => {
        setTasks(prev => prev.map(item => item.id === id ? { ...item, updates } : item))
    }

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(item => item.id !== id))
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



    return (
        <DataContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask, toggleTaskStatus, streakCount, setStreakCount, getStreak }}>
            {children}
        </DataContext.Provider>
    )
}

export { DataProvider, DataContext };
