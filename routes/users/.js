const User = require('../../db/models/user')

async function getAllUsers() {
  return await User.findAll()
}

module.exports = getAllUsers
