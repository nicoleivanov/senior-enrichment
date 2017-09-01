'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')
const Campus = require('./campus.js')

const Student = db.define('student', {
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  email: Sequelize.STRING
}, {
  defaultScope: {
    include: [
    { model: Campus }
    ]
  }
})

module.exports = Student;