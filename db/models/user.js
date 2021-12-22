const {Sequelize, DataTypes, Model} = require('sequelize')
const sequelize = require('../../config/sequelize')

class User extends Model {}
User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
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
  modelName: 'User',
  timestamps: true,
})

module.exports = User
