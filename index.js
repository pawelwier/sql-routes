const express = require('express')
const fs = require('fs')

const {getFieldsFromModel} = require('./utils/sequelizeUtils')

const app = express()

app.use(express.json())

app.use(crudMiddleware)

async function crudMiddleware(req, res, next) {
  const routes = fs.readdirSync('routes')
  for (const route of routes) {
    const modelRoutes = fs.readdirSync(`routes/${route}`)
    for (const modelRoute of modelRoutes) {
      const modelRoutePath = modelRoute.replace('.js', '').replaceAll('$', ':').replaceAll('.', '/')
      app.get(`/${route}/${modelRoutePath}`, async (req, res) => {
        const response = require(`./routes/${route}/${modelRoute}`)
        const params = req.params
        const data = await response(params)
        res.send(data)
      })
      if (modelRoutePath === 'get') {
        const {fields} = require(`./routes/${route}/get`)
        if (!fields) return
        for (const fieldSet of fields) {
          const {name, set} = fieldSet
          app.get(`/${route}/get/${name}`, async (req, res) => {
            const data = await getFieldsFromModel(route, set)
            res.send(data)
          })
        }
      }
    }
  }
  next()
}

app.listen(2000)
