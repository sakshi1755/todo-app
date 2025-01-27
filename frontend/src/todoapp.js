import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 
const Todoapp = () => {
    const [todos,settodos]=useState([]);
    const[newtodo,setnewtodo]=useState("");
    useEffect(()=>{
        fetchtodos();
    },[]);
  const  fetchtodos=async ()=>{
    try{
       const response=await axios.get('http://localhost:5000/api/todos');
       settodos(response.data);
    }
    catch{
        console.log("error in fetching");
    }
    };



    const addtodo = async () => {
      if (!newtodo) return;  // Don't add empty todos
      try {
        const response = await axios.post('http://localhost:5000/api/todos', {
          text: newtodo,
        });
        settodos([...todos, response.data]);  // Add the new todo to the list
        setnewtodo("");  // Clear the input field after adding
      } catch (error) {
        console.error("Error adding todo", error);
      }
    };
  
    // Function to handle toggling the completion status of a todo
    const toggletodo = async (id) => {
      try {
        const todoToUpdate = todos.find(todo => todo._id === id);
        if (!todoToUpdate) {
          console.error("Todo not found");
          return;
        }
    
        console.log("Updating Todo:", id, { completed: !todoToUpdate.completed });
    
        const response = await axios.put(`http://localhost:5000/api/todos/${id}`, {
          completed: !todoToUpdate.completed,
        });
    
        const updatedTodo = response.data;
        settodos(
          todos.map(todo => (todo._id === id ? updatedTodo : todo))
        );
      } catch (error) {
        console.error("Error updating todo", error); // Log the error
      }
    };
    
    // Function to handle deleting a todo
    const deletetodo = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        settodos(todos.filter(todo => todo._id !== id));  // Remove deleted todo from state
      } catch (error) {
        console.error("Error deleting todo", error);
      }
    };
  
   


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-red-500">TODO LIST</h1>
      <input onChange={(e) => setnewtodo(e.target.value)} type="text" value={newtodo} placeholder="enter the task here" >
      </input>
      <button onClick={addtodo}>Add</button> 
      <span><ul>
        {todos.map(todo=>(
            <li key={todo._id} style={{ textDecoration :todo.completed ? 'line-through' :'none'}}>
            <span>{todo.text}</span>
            <button onClick={()=>toggletodo(todo._id)}>toggle complete</button>
            <button onClick={()=>deletetodo(todo._id)}>delete</button>
            </li>
        )
            
        )}
        </ul>
      </span>

    </div>
  )
}

export default Todoapp
