const express = require('express')
const fs = require('fs')
const https = require('https')

const config = require('./config.json')
const app = express()

const options = {
  ca: fs.readFileSync(config.ssl.ca),
  key: fs.readFileSync(config.ssl.key),
  cert: fs.readFileSync(config.ssl.cert)
}

app.use(express.static(__dirname + '/template'))


app.get('/data', (req, res) => {
  res.send("hi this is a response")
})

https.createServer(options, app)
.listen(config.port, () => console.log(`listen on port:${config.port}`))
