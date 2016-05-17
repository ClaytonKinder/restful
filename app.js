var express    = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.bodyParser());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://claytonkinder.github.io');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var cart = [];

app.get('/', function(req, res) {
  res.json(cart);
});

app.post('/', function(req, res){
  cart.push(req.body);
  res.json(true);
});

app.delete('/:id', function(req, res) {
  cart.forEach(function(ele, idx){
    var eleId = parseInt(ele.id);
    var reqId = parseInt(req.params.id);
    if (eleId == reqId) {
      cart.splice(idx, 1);
    }
  });
  res.json(true);
})

app.listen(process.env.PORT || 3000);