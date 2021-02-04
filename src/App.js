import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import { useState,useEffect } from 'react';
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    
])

useEffect(() => {
  const getTask = async()=>{
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  }

  getTask()
 
}, [])

// fetch Tasks
const fetchTasks = async()=>{
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json();
  return data
}

//fetch a single task
const fetchTask = async (id)=>{
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json();
  return data
}




//Delete task
   const deleteTask = async (id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'DELETE',
    })

     setTasks(tasks.filter((task)=>{
       return task.id!==id;
     }))
    }

   // toggle reminder

   const toggleReminder = async (id)=>{
       const taskToToggle = await fetchTask(id);
       const updTask = {...taskToToggle,reminder:!taskToToggle.reminder};

       const res = await fetch(`http://localhost:5000/tasks/${id}`,{
         method:'PUT',
         headers:{
           'Content-Type' : 'application/json'
         },
         body: JSON.stringify(updTask)
       })
       const data = await res.json();
               
     setTasks(tasks.map((task)=>{
       if(task.id===id){
         return {...task,reminder:!task.reminder }
       }else{
         return task
       }
     }))
   }

   //Add Task

   const addTask = async (task)=>{
    const res = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers:{
        'Content-type' :'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks,data]);



    //  const id = Math.floor(Math.random()*100000)+1;
    //  const newTask = {id, ...task};
    //  setTasks([...tasks,newTask])
   }

  return (
    <Router>
    <div className="container">
    <Header title = "Task Tracker" onAdd = {()=>setShowAddTask(!showAddTask)} show = {showAddTask} />
      <Route path='/' exact render = {(props)=>{
        return (
          
          <>
          
      {showAddTask ?(<AddTask addTask = {addTask}/>) :''}
      {tasks.length>0 ?(<Tasks tasks = {tasks} onDelete = {deleteTask} toggleRem = {toggleReminder} />):('No Tasks to Show')}
          </>
        )
      }}/>
      <Route path = '/about' component = {About}/>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
