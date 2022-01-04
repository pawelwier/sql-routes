const fs = require('fs')
const {ValidationErrorItem} = require("sequelize");

const {
  getFieldsFromModel,
  createModelInstance,
} = require('../utils/sequelizeUtils')

async function crudMiddleware(req, res, next) {
  const routes = fs.readdirSync('routes')
  for (const route of routes) {
    const modelRoutes = fs.readdirSync(`routes/${route}`)
    for (const modelRoute of modelRoutes) {
      const modelRoutePath = modelRoute.replace('.js', '').replaceAll('$', ':').replaceAll('.', '/')
      req.app.get(`/${route}/${modelRoutePath}`, async (req, res) => {
        const response = require(`./routes/${route}/${modelRoute}`)
        const params = req.params
        const data = await response(params)
        res.send(data)
      })
      if (modelRoutePath === 'get') {
        const fieldSet = require(`../routes/${route}/get`)
        if (!fieldSet) return
        for (const set of fieldSet) {
          const {name, fields} = set
          req.app.get(`/${route}/get/${name}`, async (req, res) => {
            let data = await getFieldsFromModel(route, fields)
            if (set.modify) {
              data = set.modify(data)
            }
            res.send(data)
          })
        }
      }
      if (modelRoutePath === 'post') {
        const fieldSet = require(`../routes/${route}/post`)
        if (!fieldSet) return
        for (const set of fieldSet) {
          const {name, fields} = set
          const path = name === 'basic' ? `/${route}/post` : `/${route}/post/${name}`
          req.app.post(path, async (req, res) => {
            const body = {}
            for (const field of fields) {
              body[field] = req.body[field]
            }
            try {
              let data = await createModelInstance(route, body)
              res.send(data)
            } catch (e) {
              const validationErrorFields = []
              for (const err of e.errors) {
                if (err instanceof ValidationErrorItem) validationErrorFields.push(err.path)
              }
              let errorMessage = 'Some error occurred'
              if (validationErrorFields.length) errorMessage = `Validation failed for field(s): ${validationErrorFields.join(', ')}`
              res.send(errorMessage)
            }
          })
        }
      }
    }
  }
  next()
}

module.exports = {
  crudMiddleware
}
