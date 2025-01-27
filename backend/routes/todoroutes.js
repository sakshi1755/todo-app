const express = require('express');
const todo = require('../models/todo'); // Correct relative path
const router = express.Router();
router.get('/', async (req,res)=>{
   try{ const todos=await todo.find();
    res.json(todos);
   }catch(err){
    res.status(500).send("server error");
   }

});

const mongoose = require('mongoose');
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID
    const { completed } = req.body; // Extract the completed field

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    // Validate the presence of completed field
    if (completed === undefined) {
      return res.status(400).send('Missing "completed" field in request body');
    }

    // Find and update the Todo
    const updatedTodo = await todo.findByIdAndUpdate(id, { completed }, { new: true });

    // If no todo is found, return a 404 error
    if (!updatedTodo) {
      return res.status(404).send("Todo not found");
    }

    res.json(updatedTodo); // Return the updated Todo
  } catch (err) {
    console.error("Error in PUT /api/todos/:id:", err); // Log the error for debugging
    res.status(500).send("Server Error");
  }
});


router.post('/', async(req,res)=>{
   try{
      const {text}= req.body;
     // const {id}=req.params;
      const newtodo= new todo({text});
      await newtodo.save();
      res.json(newtodo);}
      catch (err) {
         res.status(500).send('Server Error');
       }
     


   }

)

router.delete('/:id', async(req,res)=>{
  try{ const {id}= req.params;
   await todo.findByIdAndDelete(id);
   res.json({msg:'todo deleted'});}
   catch (err) {
      res.status(500).send('Server Error');
    }
  
});
module.exports = router;















module.exports = router;