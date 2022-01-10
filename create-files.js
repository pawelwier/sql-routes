const fs = require('fs')
const config = require('./api-configs/user-config')

const createRoutesFolder = () => {
  const hasApiFolder = fs.existsSync('routes')
  if (hasApiFolder) {
    fs.rmdirSync('routes', {recursive: true})
  }
  fs.mkdirSync('routes')
  // make dynamic
  fs.mkdirSync('./routes/user')

}



const getMethodContent = () => {
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
    fs.appendFile(`./routes/user/${method}.js`, text, () => console.log(`${method} file created`))
    text = ''
  }
}

createRoutesFolder()
getMethodContent()
