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

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

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

app.get('/get', (req, res) => {
  Form.find()
    .then(forms => res.json(forms))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.use('/api/subscriber', subscriberRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
