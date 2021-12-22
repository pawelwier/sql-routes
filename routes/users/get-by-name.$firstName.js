const User = require('../../db/models/user')

async function getUserByName(params) {
  const {firstName} = params
  return await User.findAll({
    where: {
      firstName,
    }
  })
}

module.exports = getUserByName
