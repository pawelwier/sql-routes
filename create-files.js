const fs = require('fs')

const getMethodContent = (model) => {
  const config = require(`./api-configs/${model}-config`)
  const methodTypes = ['get', 'post', 'put', 'delete']
  const methods = []

  for (const type of methodTypes) {
    const methodConfig = config[type]
    if (methodConfig) {
      methods.push({
        method: type,
        values: methodConfig
      })
    }
  }

  for (const m of methods) {
    const {method, values} = m
    let text = ''
    text += `// ==== ${method.toUpperCase()} ====
    
    module.exports = [`
    for (const value of values) {
      text += `
      {
        name: '${value.name}',
        fields: ['${value.fields.join('\',\'')}'],
       },
      `
    }
    text += ']'
    fs.appendFile(`./routes/${model}/${method}.js`, text, () => console.log(`${method} file created`))
    text = ''
  }
}

const createRouteFiles = () => {
  const hasApiFolder = fs.existsSync('routes')
  if (hasApiFolder) {
    fs.rmdirSync('routes', {recursive: true})
  }
  fs.mkdirSync('routes')
  fs.readdir('./db/models', (err, files) => {
    const modelFiles = files.filter(file => file !== 'index.js')
    for (const file of modelFiles) {
      const model = file.replace('.js', '')
      fs.mkdirSync(`./routes/${model}`)
      getMethodContent(model)
    }
  });
}

createRouteFiles()
