const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const subscriberRoutes = require('./routes/subscriberRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

console.log('MONGODB_URI:', process.env.MONGODB_URI); // Add this line to debug the URI

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  contactNo: String,
  requirements: String,
  role: String,
  message: String,
  consent: Boolean,
});

const Form = mongoose.model('Form', formSchema);

app.post('/save', (req, res) => {
  const newForm = new Form(req.body);
  newForm.save()
    .then(() => res.json({ message: 'Form saved successfully' }))
    .catch(err => res.status(400).json({ error: err.message }));
});



app.use('/api/subscriber', subscriberRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
