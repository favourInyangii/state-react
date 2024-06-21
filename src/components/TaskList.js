// src/components/TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, markCompleted, deleteTask, setTaskToEdit }) => {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    markCompleted={markCompleted}
                    deleteTask={deleteTask}
                    setTaskToEdit={setTaskToEdit}
                />
            ))}
        </div>
    );
};

export default TaskList;
