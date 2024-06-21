// src/components/TaskItem.js
import React from 'react';

const TaskItem = ({ task, markCompleted, deleteTask, setTaskToEdit }) => {
    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => markCompleted(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => setTaskToEdit(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
    );
};

export default TaskItem;
