const app = require('express')()
const http = require('https')

const config = require('connfig.json')

const options = {
  ca: fs.readFileSync(config.ssl.ca),
  key: fs.readFileSync(config.ssl.key),
  cert: fs.readFileSync(config.ssl.cert)
  }

app.use(express.static(__dirname + '/template')


app.get('/data', (req, res) {
  res.send()
})

https.createServer(options, app)
.listen(config.port, () => console.log(`listen on port:${config.port}`))
