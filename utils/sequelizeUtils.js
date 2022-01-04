async function getFieldsFromModel(modelName, attributes) {
  const model = require(`../db/models/${modelName}`)
  return model.findAll({
    attributes
  });
}

async function createModelInstance(modelName, values) {
  const model = require(`../db/models/${modelName}`)
  return model.create(values);
}

module.exports = {
  getFieldsFromModel,
  createModelInstance
}
