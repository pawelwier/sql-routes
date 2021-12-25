async function getFieldsFromModel(modelName, attributes) {
  const model = require(`../db/models/${modelName}`)
  return await await model.findAll({
    attributes
  })
}

module.exports = {
  getFieldsFromModel,
}
