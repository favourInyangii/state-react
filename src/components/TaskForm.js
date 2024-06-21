// src/components/TaskForm.js
import React, { useEffect, useState } from 'react';

const TaskForm = ({ addTask, editTask, taskToEdit, clearEdit }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Low');

    useEffect(() => {
        if (taskToEdit) {
            setTaskName(taskToEdit.name);
            setTaskDescription(taskToEdit.description);
            setDueDate(taskToEdit.dueDate);
            setPriority(taskToEdit.priority);
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName && taskDescription && dueDate) {
            if (taskToEdit) {
                editTask(taskToEdit.id, taskName, taskDescription, dueDate, priority);
            } else {
                addTask(taskName, taskDescription, dueDate, priority);
            }
            setTaskName('');
            setTaskDescription('');
            setDueDate('');
            setPriority('Low');
        }
    };

    const handleCancel = () => {
        clearEdit();
        setTaskName('');
        setTaskDescription('');
        setDueDate('');
        setPriority('Low');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task Name"
                required
            />
            <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Task Description"
                required
            ></textarea>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button type="submit">{taskToEdit ? 'Update' : 'Add'} Task</button>
            {taskToEdit && <button type="button" onClick={handleCancel}>Cancel</button>}
        </form>
    );
};

export default TaskForm;
