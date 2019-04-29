const authorize = require('../_helpers/authorize')
const Role = require('../_helpers/role');
const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
//const authorize = require('_helpers/authorize')
// routes

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

module.exports = {authenticate}