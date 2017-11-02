// depenedencies
var express = require('express');
var bodyParser  = require('body-parser');
var path  = require('path');
var expressValidator  = require('express-validator')
var http  = require('http');
var querystring = require('querystring');
//var request=  require('request');


var app = express();

// Middle ware section
app.use(express.static(path.join(__dirname,'public')));
  // configure app to use bodyParser()
  // this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var port = process.env.PORT || 8000;        // set our port


// Code part
app.get('/',function(req, res){
  res.send("Rendering NOT from Public folder");
});

app.post('/validateInputsCHMS',function(req, res){
  //console.log(req.body);
  if(req.body.accesstoken == "mytoken"){
    console.log("correct token");
    addCamera(http,req);
  }
  res.redirect('/');
});


// Run server
app.listen(3000,function(){
  console.log("Listening on Port 3000");
  myFun();
})


function myFun(){
  console.log("this works");
}



// CHMS back end APIs

function addCamera(){
  var request = require('request');
  console.log('Making Camera Post Call');
  var mbody = {
    "name"  : "dummyCam",
    "hub"   : "59f85177fc94241ed5316536",
    "url"   : "rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov"
  };

  //console.log(mbody);
  request.post({
      url: 'http://52.203.62.74/v1/cameras',
      body: mbody,
      json: true
  }, function (error, response, body) {
        if (error){
          console.log('Error Occuered:');
          console.log(error);
        }
        else{
          console.log(response.statusCode);
          //var mdata = querystring.parse(body);
          console.log(body['_id']);
          addCameraBehaviors(body['_id']);
        }
      }
  )
}

function addCameraBehaviors(camId){
  var request = require('request');
  console.log('Adding Camera Behaviors');
  var mbody = {
    "camera"  : camId,
    "hub"   : "59f85177fc94241ed5316536",
    "priority"   : "HIGH",
    "behaviourType"  : "nofeed",
  };

  console.log(mbody);
  request.post({
      url: 'http://52.203.62.74/v1/behaviours',
      body: mbody,
      json: true
  }, function (error, response, body) {
        if (error){
          console.log('Error Occuered:');
          console.log(error);
        }
        else{
          console.log(response.statusCode);
          //var mdata = querystring.parse(body);
          console.log(body['_id']);
        }
      }
  )
}
