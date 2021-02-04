import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import { useState,useEffect } from 'react';
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

useEffect(() => {
  const getTask = async()=>{
    let tasksFromServer = await fetchTasks();
    if(tasksFromServer===null){
      tasksFromServer = []
    }
    setTasks(tasksFromServer);
  }

  getTask()
 
}, [])

// fetch Tasks
const fetchTasks = async()=>{
  const res = await fetch('https://task-manage-3536b-default-rtdb.firebaseio.com/tasks.json')
  const data = await res.json();
  if(data==null){
    return null
  }
  const newd = Object.values(data);
  return newd
}

//fetch a single task
const fetchTask = async (id)=>{
  const res = await fetch(`https://task-manage-3536b-default-rtdb.firebaseio.com/tasks.json`)
  const data = await res.json();
  const newd = Object.values(data);
  let realData = {};
  newd.map((task)=>{
    if(task.id===id){
      realData = {...task}
      return task
    }else{
      return task
    }
  })
  return realData;
}




//Delete task
   const deleteTask = async (id)=>{
    const res = await fetch(`https://task-manage-3536b-default-rtdb.firebaseio.com/tasks.json`)
    const data = await res.json();
    const arr = Object.keys(data);
    let key  = null;
     arr.map((item)=>{
      if(data[item].id===id){
          key = item;
          return item
      }
      return item
    })
    await fetch(`https://task-manage-3536b-default-rtdb.firebaseio.com/tasks/${key}.json`,{
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

       const res = await fetch(`https://task-manage-3536b-default-rtdb.firebaseio.com/tasks/${id}.json`,{
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
    const id = Math.floor(Math.random()*100000)+1;
    const newTask = {id, ...task};
    
    const res = await fetch('https://task-manage-3536b-default-rtdb.firebaseio.com/tasks.json',{
      method:'POST',
      headers:{
        'Content-type' :'application/json'
      },
      body: JSON.stringify(newTask)
    })
    const data = await res.json();
    const res1 = await fetch(`https://task-manage-3536b-default-rtdb.firebaseio.com/tasks.json`)
    const data1 = await res1.json();
    
    const arr = Object.values(data);
    setTasks([...tasks,data1[arr[0]]]);



    
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
