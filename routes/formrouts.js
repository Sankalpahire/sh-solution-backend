const express = require('express');
const router = express.Router();
const { Form } = require('../controllers/formcontroller');

router.post('/form', Form);

module.exports = router;
