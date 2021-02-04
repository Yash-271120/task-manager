import React from 'react';
import Task from './Task';


const Tasks = ({tasks,onDelete,toggleRem}) => {
    
    return (
        <>
            {tasks.map((task)=>{
                return (
                    <Task key={task.id} task = {task} onDelete = {onDelete} toggleRem = {toggleRem}/>
                )
            })}
        </>
    )
}

export default Tasks
