const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  requirements: { type: String, required: true },
  role: { type: String, required: true },
  message: { type: String, required: true },
  consent: { type: Boolean, required: true },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
