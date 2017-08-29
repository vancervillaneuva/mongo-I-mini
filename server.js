const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Bear = require('./models');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

server.post('/bears', (req,res) => {
	
	const {species, latinName} = req.body; 

     if (!species || !latinName) {
        res.status(422);
        res.json('missing text or complieted field');
     return;
     }

     //const bear = new Bear({species, latinName});
     const bear = new Bear(req.body);

    //  bearTypes.save((err) => {
    //      if (err) throw err;
    //      res.json(todo);
    //  });
   bear.save((err, savedBear)=>{
     if (err) {
       res.status(500).json({ success: false, message: 'could not save the bear'});
     } else {
       res.status(201).json(savedBear);
     }
   });

});

server.get('/bears', (req, res) => {
	Bear.find({}, (err, data) => {
        if(err) throw err;
        res.json(data);
  });
      
// ext Bear.find({/bears})

});


server.get('/bears/:id', (req, res) => {
	const { id } = req.params; //? query string

	Bear.findById(id, (err, bear) => {
        if (err) throw err;
          res.json(bear);
	});
});


// TODO: write your server code here






mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/bears',
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});
