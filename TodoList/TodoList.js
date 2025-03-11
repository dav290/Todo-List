const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  Task: {
    type: String,
    required: true,  // 'require' should be 'required'
  },
  Date: {
    type: String,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Priority: {
    type: String,
    required: true,
  },
  Action: {
    type: String,
    required: true,
  },
});

// Create the model using the schema
const Todo = mongoose.model('Todo', TodoSchema);

// Export the model to use it in other parts of the application
module.exports = Todo;
