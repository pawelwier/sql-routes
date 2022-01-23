const fs = require('fs')
const {addModelMethodRoutesToRequest} = require('../utils/middlewareUtlis')

async function crudMiddleware(req, res, next) {
  const models = fs.readdirSync('routes')
  for (const model of models) {
    const modelRoutes = fs.readdirSync(`routes/${model}`)
    for (const modelRoute of modelRoutes) {
      const method = modelRoute.replace('.js', '')
      addModelMethodRoutesToRequest(model, method, req)
      /*
      todo: params
      const modelRoutePath = modelRoute.replace('.js', '').replaceAll('$', ':').replaceAll('.', '/')
      req.app.get(`/${model}/${modelRoutePath}`, async (req, res) => {
        const response = require(`./routes/${model}/${modelRoute}`)
        const params = req.params
        const data = await response(params)
        res.send(data)
      })
       */
    }
  }
  next()
}

module.exports = {
  crudMiddleware
}
