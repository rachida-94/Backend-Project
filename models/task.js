const { Schema, model } = require('mongoose');
 
// This is the model you will be modifying
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
 

  status:{
    type:String ,
    enum :['To Do','In Progress','Done'],
    default:'To Do',
  },

  project: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: true,
}
});


 
const task = model('task',taskSchema);
 
module.exports = task;