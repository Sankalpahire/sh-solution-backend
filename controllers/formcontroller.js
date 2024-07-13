const Form = require('../models/form');

module.exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.send(forms);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err, msg: 'Something went wrong' });
  }
};

module.exports.saveForm = async (req, res) => {
  const { name, email, contactNo, requirements, role, message, consent } = req.body;
  try {
    const form = new Form({ name, email, contactNo, requirements, role, message, consent });
    const savedForm = await form.save();
    res.status(201).send(savedForm);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err, msg: 'Something went wrong' });
  }
};
