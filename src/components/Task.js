import React from 'react'
import {FaTimes} from 'react-icons/fa'

const Task = ({task,onDelete,toggleRem}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={()=>toggleRem(task.id)} >
            <h3>{task.text} <FaTimes onClick={()=> onDelete(task.id)} style={{color:'red', cursor:'pointer'}} /></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
