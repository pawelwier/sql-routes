const {Sequelize, DataTypes, Model} = require('sequelize')
const sequelize = require('../../config/sequelize')

class Action extends Model {}
Action.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complete: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
}, {
  sequelize,
  modelName: 'Action',
  timestamps: true,
})
module.exports = Action
