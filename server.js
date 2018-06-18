const express = require('express')
const app = express()
const https = require('https')
const bodyParser = require('body-parser')
const fs = require('fs')

const config = require('./config.json')
var admin = require('firebase-admin');
var serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tkkhe-39445.firebaseio.com'
});
// [END initialize]
 
// Get a database reference to the TODO list database
var db = admin.database();
var ref = db.ref("/");



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
  var itemsRef = ref.child("User");
  var newItemRef = itemsRef.push();
  newItemRef.set({
    "id": user_id,
    "name": user_name,
    "visited": false,
    "Created Time": new Date().toString(),
    "Last Login": new Date().toString()
  });
  var itemId = newItemRef.key;
  console.log("A new User with ID " + itemId + " is created.");  
}

let foundUser = (id, name) => {
  var existed=false;
  console.log("Start to find user id: "+id);
  var itemRef = ref.child("User");
  itemRef.orderByChild("id").equalTo(id).on("value", function(snapshot) {
    if(snapshot.exists()){
      console.log("This id already exists in database!");
    }
    else{
      console.log("This id is not found in database...");
      initUser(id ,name)
    }
  });
  
}

let setUserVisited = (id, name, bool) => {
  /*USER_TABLE.forEach((user)=>{
    if (user.id == id){
      user.visited = bool
    }
  })*/
  //var messagesRef = new Firebase("https://tkkhe-39445.firebaseio.com/tkkhe-39445/User");
  var itemRef = ref.child("User");
  itemRef.once("value", function(allMessagesSnapshot) {
    allMessagesSnapshot.forEach(function(messageSnapshot) {
      // Will be called with a messageSnapshot for each child under the /User/ node
	  console.log(messageSnapshot.key);
      var key = messageSnapshot.key;
      var usid = messageSnapshot.child("id").val();
      var usname = messageSnapshot.child("name").val();
      var usvisited = messageSnapshot.child("visited").val();
      var uscreated = messageSnapshot.child("Created Time").val();
      
      if(usid==id){
        itemRef.child(key).set({
          "id": usid,
          "name": usname,
          "visited": bool,
          "Created Time": uscreated,
          "Last Login": new Date().toString()
        });
      }
    });
  });
  console.log("Set user id: "+id);
  /*var itemRef = ref.child("User");
  itemRef.orderByChild("id").equalTo(id).on("value", function(snapshot) {
    if(snapshot.exists()){
      /*itemRef.child(snapshot.key).remove();
      var itemsRef = ref.child("User");
      var newItemRef = snapshot.push();
      newItemRef.set({
        "id": id,
        "name": name,
        "visited": bool,
        "Created Time": new Date().toString()
      });
      var itemId = newItemRef.key;
      console.log("A new User with ID " + itemId + " is created.");
      console.log("Set this user to be "+bool);
      return true;*/
      //itemRef.child(snapshot.key).child("visited").setValue(bool);
	  //console.log(snapshot.key);
	  //snapshot.ref.child(snapshot.key).update({"visited": bool});
      /*snapshot.update({
        "visited": bool
      });*/
  /*  }
    
  });*/
}


app.post('/user_login', (req, res) => {
  foundUser(req.body.user_id,req.body.user_name)
})  

app.post('/visited', (req, res) => {
  
  console.log("visited?");
  /*var itemRef = ref.child("User");
  itemRef.orderByChild("id").equalTo(req.body.user_id).on("value", function(snapshot) {
    if(snapshot.exists()){
      res.send(snapshot.key)
    }
  });
  */
  
  var itemRef = ref.child("User");
  itemRef.once("value", function(allMessagesSnapshot) {
    allMessagesSnapshot.forEach(function(messageSnapshot) {
      // Will be called with a messageSnapshot for each child under the /User/ node
	  console.log(messageSnapshot.key);
      var key = messageSnapshot.key;
      var usid = messageSnapshot.child("id").val();
      if(usid==req.body.user_id){
        res.send(key)
      }
    });
  });
  setUserVisited(req.body.user_id,req.body.user_name, true)
  
  /*
  USER_TABLE.forEach((user)=>{
    if (user.id === req.body.user_id){
      res.send(user.visited)
    }
  }) 
  // it should use promise
  setUserVisited(req.body.user_id, true)
  */
  
})


app.get("/experience", (req, res) =>  {
  res.send(req.query.experience)
})

https.createServer(options, app)
.listen(config.port, () => console.log(`listen on port:${config.port}`))
