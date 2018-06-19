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

let tour={
  commented: false,
  comment  : '投給L組><'
} 
let USER_TABLE = []
// database with fake data 
let FORUM_TABLE = [
  {name: '南一中',
    content: [
      {
        userName   : '羅一中',
        comment: '考不上QQ'
      },{
        userName   : '羅一中',
        comment: '阿怎麼兩個一中?各自表述?'
      },{
        userName   : '羅一中',
        comment: '阿怎麼兩個一中asdasdasduiloghodcvuojhldsjkalkjfasdlfjlaskjdfhlasuidhflasjdfhauisdfjkalsdfasdfajksdlfkaujshdfalkjsdfakmnsdlkfbnasu8ejkla,kjsdnvcauiweblfkjsabndlavewuibakjsdluiebnjknewuibliublcbkjbkjbslkjdnmnflu3hjwleb.j cm,nsdmlkjhlieubnmnc,kmnb,zxmnb,cidkj.,kjas,dbmnb,caiksbmdnbjhb,izbxjbvmn,zb,xkjdbvxnbcmnzxdujkibvzxkdmn,vnbds?各自表述?'
      }

    ]
  },{name: '臺南廳長官邸',
    content: []
  },{name: '吳園',
    content: []
  },{name: '台南公會堂',
    content: []
  },{name: '禾寮港',
    content: []
  },{name: '民族戲院',
    content: []
  },{name: '大觀音亭',
    content: []
  },{name: '開基天后祖廟',
    content: []
  },{name: '鴨母寮市場',
    content: []
  },{name: '拱乾門',
    content: []
  },{name: '台南三山國王廟',
    content: []
  }
]

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

<<<<<<< Updated upstream
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
}


app.post('/user_login', (req, res) => {
  foundUser(req.body.user_id,req.body.user_name)
})  

app.post('/visited', (req, res) => {
  console.log("visited?");
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
})

app.post('/get_comment', (req, res) => {
  FORUM_TABLE.forEach((attraction)=>{
    if (attraction.name === req.body.attraction_name){
      res.send(attraction.content)
    }
  }) 
})  

app.post("/comment", (req, res) =>  {
  let commentObject = {
    userName: req.body.userName,
    comment : req.body.comment 
  }
  FORUM_TABLE.forEach((comment)=>{
    if(comment.name == req.body.attraction){
      comment.content.push(commentObject)
    }
  })

})

app.post('/tutor-send', (req, res) => {
  tour.commented = true
  tour.comment = req.body.comment
})
app.post('/get_tour', (req, res) => {
  if (tour.commented){
    res.send(
      '<tbody class="commenter_table" >'+
      '<tr><td id="commenter002"></td>'+
      '<td class="commenter_name" id="comment002_name">羅&nbsp;&nbsp;ㄧ&nbsp;&nbsp;中<br/>'+
      '<div id="commenter_star001">'+
      '<i class="star icon"></i>'+
      '<i class="star icon"></i>'+
      '<i class="star icon"></i>'+
      '<i class="star icon"></i>'+
      '<i class="star outline icon"></i>'+
      '<h id="commenter002_comment_time">15小時前</h>'+
      '<p id="commenter001_comment">'+tour.comment+'</p>'+
      '</div></td></tbody>'
    )
  }
})  


https.createServer(options, app)
.listen(config.port, () => console.log(`listen on port:${config.port}`))
