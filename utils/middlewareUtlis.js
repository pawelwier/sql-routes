const {ValidationErrorItem} = require("sequelize");
const {
  getFieldsFromModel,
  createModelInstance,
} = require('./sequelizeUtils')


function addModelMethodRoutesToRequest(model, method, request) {
  const fieldSet = require(`../routes/${model}/${method}`)
  if (!fieldSet) return
  for (const set of fieldSet) {
    const {name, fields} = set
    const path = `/${model}/${method}/${name}`
    request.app[method](path, async (req, res) => {
      let data
      if (method === 'get' ) {
        data = await getFieldsFromModel(model, fields)
        if (set.modify) {
          data = set.modify(data)
        }
      }
      if (method === 'post') {
        const body = {}
        for (const field of fields) {
          body[field] = req.body[field]
        }
        try {
          data = await createModelInstance(model, body)
        } catch (e) {
          const validationErrorFields = []
          for (const err of e.errors) {
            if (err instanceof ValidationErrorItem) validationErrorFields.push(err.path)
          }
          let errorMessage = 'Some error occurred'
          if (validationErrorFields.length) errorMessage = `Validation failed for field(s): ${validationErrorFields.join(', ')}`
          res.send(errorMessage)
        }
      }
      res.send(data)
    })
  }
}

module.exports = {
  addModelMethodRoutesToRequest
}
