const express = require('express')
const app = express()
const https = require('https')
const bodyParser = require('body-parser')
const fs = require('fs')

const config = require('./config.json')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const options = {
  ca  : fs.readFileSync(config.ssl.ca),
  key : fs.readFileSync(config.ssl.key),
  cert: fs.readFileSync(config.ssl.cert)
}

// USER_TABLE= [{
//  id    : user_id,
//  name  : 'aaa'
//}]

// USER_TABLE= [{
//  id     : user_id,
//  visited: bool
//}]

let USER_TABLE = []

let initUser = (user_id ,user_name) => {
  let user = {
    id     : user_id,
    name   : user_name,
    visited: false  
  }
  USER_TABLE.push(user)  
}

let foundUser = (id) => {
  // It's bad performance using `forEach`, but it should be replaced by database api soon,
  USER_TABLE.forEach((user)=>{
    if (user.id == id){
      return true
    }
  })
  //it should use promise and return false
}

let setUserVisited = (id, bool) => {
  USER_TABLE.forEach((user)=>{
    if (user.id == id){
      user.visited = bool
    }
  }) 
}


app.post('/user_login', (req, res) => {
  if(foundUser(req.body.user_id) != true){
    initUser(req.body.user_id ,req.body.user_name) 
  }
})  

app.post('/visited', (req, res) => {
  USER_TABLE.forEach((user)=>{
    if (user.id === req.body.user_id){
      res.send(user.visited)
    }
  }) 
  // it should use promise
  setUserVisited(req.body.user_id, true)
})


app.get("/experience", (req, res) =>  {
  res.send(req.query.experience)
})

https.createServer(options, app)
.listen(config.port, () => console.log(`listen on port:${config.port}`))
