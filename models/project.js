const { Schema, model } = require('mongoose');
 
// This is the model you will be modifying
const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  
    
  user: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: true,
}
});


 
const project = model('project',projectSchema);
 
module.exports =project;