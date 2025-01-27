import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todoapp = () => {
    const [todos,settodos]=useState([]);
    const[newtodo,setnewtodo]=useState([""]);
    useEffect(()=>{
        fetchtodos();
    },[]);



const  fetchtodos=async ()=>{
    try{
       const response=await axios.get("http://localhost:5000/api/todos");
       settodos(response.data);
    }
    catch{
        console.log("error in fetching");
    }
    };


const addtodo= async () => {
   if(!newtodo) return;
     try{
        const res=axios.post("http://localhost:5000/api/todos",{text:newtodo, });
        settodos(...todos, res);
        setnewtodo("");
     }
      catch{
      console.log("error ");
     }
 };


const deletetodo=async(id)=>{
  try{await axios.delete("fafss");
 
        settodos(todos.filter(todo=>todo._id!==id) );
  }
  catch{
    console.log("error deleting");
  }
  

}

const toggletodo = async (id) => {
  try {
    // Find the Todo to toggle
    const todoToUpdate = todos.find(todo => todo._id === id);
    if (!todoToUpdate) {
      console.error("Todo not found with ID:", id);
      return;
    }

    // Log the details of the toggle request
    console.log("Updating Todo:", id, { completed: !todoToUpdate.completed });

    // Make the PUT request
    const response = await axios.put(`http://localhost:5000/api/todos/${id}`, {
      completed: !todoToUpdate.completed,
    });

    // Update the frontend state with the new Todo data
    const updatedTodo = response.data;
    settodos(
      todos.map(todo => (todo._id === id ? updatedTodo : todo))
    );
  } catch (error) {
    console.error("Error updating todo", error); // Log the error
  }
};

  return (
    <div>
      <h1>TODO LIST</h1>
      <input type="text" value={newtodo} placeholder="enter the task here">
      </input>
      <button>Add</button> 
      <span><ul>
        {todos.map(todo=>(
            <li key={todo._id} style={{textDecoration :todo.completed ? 'line-through' :'none'}}>
            <span>{todo.text}</span>
            <button>toggle complete</button>
            <button>delete</button>
            </li>
        )
            
        )
        }

        </ul>
      </span>

    </div>
  )
}

export default Todoapp
