// Example usage in subscriberController.js
const Subscriber = require('../models/Subscriber');

// Now you can use Subscriber in your controller functions
module.exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const subscriber = new Subscriber({ email });
    const savedSubscriber = await subscriber.save();
    res.status(201).send(savedSubscriber);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};
