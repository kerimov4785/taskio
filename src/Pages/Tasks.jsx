import TasksHeader from "../Components/TasksHeader"
import { useContext, useState } from "react"
import { DataContext } from "../Context/DataContext"
import TaskCard from "../Components/TaskCard"
import NewTaskBox from "../Components/NewTaskBox";

function Tasks({activeGroup}) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [sortBy, setSortBy] = useState('DueDate');
    const { tasks } = useContext(DataContext);
    
    const getFilteredTasks = () => {
        const todayStr = new Date().toISOString().split("T")[0];
        let filteredTasks = tasks;
        let result = [];
        if(activeGroup !== ""){
            filteredTasks = tasks.filter(task => task.group.toLowerCase() === activeGroup.toLowerCase());
        }
        switch (activeFilter) {
            case 'Active': result = filteredTasks.filter(task => !task.isCompleted); break;
            case 'Completed': result = filteredTasks.filter(task => task.isCompleted); break;
            case 'Due Today': result = filteredTasks.filter(task => !task.isCompleted && task.dueDate && task.dueDate.split("T")[0] === todayStr); break;
            case 'Overdue': result = filteredTasks.filter(task => !task.isCompleted && task.dueDate && task.dueDate.split("T")[0] < todayStr); break;
            default: result = [...filteredTasks]; break;
        }

        if (sortBy === 'DueDate') {
            result.sort((a, b) => {
                const dateA =  new Date(a.dueDate).getTime();
                const dateB =  new Date(b.dueDate).getTime();
                return dateA - dateB;
            });
        } else if (sortBy === 'Priority') {
            const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
            result.sort((a, b) => {
                const pA = priorityOrder[a.priority];
                const pB = priorityOrder[b.priority];
                return pA - pB;
            });
        }

        return result;
    };

    const filteredTasks = getFilteredTasks();

    const getEmptyStateText = () => {
        switch (activeFilter) {
            case 'Active': return { title: 'No active tasks', subtitle: 'You have no active tasks currently' };
            case 'Completed': return { title: 'No completed tasks', subtitle: 'Tasks you complete will appear here' };
            case 'Due Today': return { title: 'No tasks due today', subtitle: 'Tasks with today\'s due date will appear here' };
            case 'Overdue': return { title: 'No overdue tasks 🎉', subtitle: 'You\'re all caught up!' };
            default: return { title: 'No tasks found', subtitle: 'Add a new task to get started' };
        }
    };

    return (
        <section className="tasks-page" >
            <TasksHeader activeGroup={activeGroup} activeFilter={activeFilter} setActiveFilter={setActiveFilter} sortBy={sortBy} setSortBy={setSortBy} />
            <NewTaskBox activeGroup={activeGroup} />
            <div className="all-tasks">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => <TaskCard key={task.id} task={task} />)
                ) : (
                    <div className="tasks-empty-state">
                        <div className="empty-icon-wrapper">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="#155DFC" strokeWidth="2.5" />
                                <path d="M7 12.5L10.5 16L17 8" stroke="#155DFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h3>{getEmptyStateText().title}</h3>
                        <p>{getEmptyStateText().subtitle}</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Tasks;