// src/App.js
import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [filter, setFilter] = useState('All');
    const [sortBy, setSortBy] = useState('Due Date');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (name, description, dueDate, priority) => {
        const newTask = {
            id: Date.now(),
            name,
            description,
            dueDate,
            priority,
            completed: false,
        };
        setTasks([...tasks, newTask]);
    };

    const editTask = (id, name, description, dueDate, priority) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, name, description, dueDate, priority } : task));
        setTaskToEdit(null);
    };

    const deleteTask = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setTasks(tasks.filter(task => task.id !== id));
        }
    };

    const markCompleted = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        if (filter === 'Completed') return task.completed;
        if (filter === 'Active') return !task.completed;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortBy === 'Due Date') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortBy === 'Priority') {
            const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return 0;
    });

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <TaskForm addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} clearEdit={() => setTaskToEdit(null)} />
            <div>
                <label>Filter: </label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div>
                <label>Sort By: </label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="Due Date">Due Date</option>
                    <option value="Priority">Priority</option>
                </select>
            </div>
            <TaskList tasks={sortedTasks} markCompleted={markCompleted} deleteTask={deleteTask} setTaskToEdit={setTaskToEdit} />
        </div>
    );
};

export default App;
