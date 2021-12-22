const User = require('../../db/models/user')

async function getUserById(params) {
  const {id} = params
  const res = await User.findAll({
    where: {
      id,
    }
  })
  if (!res.length) return {
    message: 'invalid user id'
  }
  return res
}

module.exports = getUserById
