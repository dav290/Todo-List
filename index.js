const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const path = require('path');
const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const Todo=require('./TodoList/TodoList')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'index.html'));
});

// Handle form submission with POST
app.post('/submit', async (req, res) => {
    try {
        const { Task, Date, Time,Category,Priority,Action } = req.body;

        // Check if any required field is missing
        if (!Task || !Date || !Time || !Category || !Priority || !Action) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Save the data to MongoDB
        const savedTodo = await Todo.create({ Task, Date, Time,Category,Priority,Action });

        // Send JSON response with the saved data
        res.status(201).json(savedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// **GET all submitted todos from MongoDB**
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find(); // Retrieve all todos from DB
        res.status(200).json(todos); // Send todos as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the todo by ID
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

mongoose.connect(process.env.Mongoose).then(()=>{
    app.listen(process.env.PORT,()=> console.log('Man is running on Port 3000'))
    console.log('Server is connected')
}).catch((e)=>console.log('Error',e))