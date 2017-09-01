'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')
const Student = require('./student.js')


const Campus = db.define('campus', {
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  image: Sequelize.STRING
}, {
  hooks: {
    beforeDestroy: function(campus) {
      db.model('student').destroy({
        where: {
        campusId: campus.id
      }})
    }
  }
}
)

module.exports = Campus;