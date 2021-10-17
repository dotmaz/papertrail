const express = require('express');
const fs = require('fs')
const cors = require('cors');
var bodyParser = require('body-parser')
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
const port = 3000;

function read_file(url){
  let res;
  try{
      res = fs.readFileSync(url).toString();
  }catch(e){
      return false;
  }
  return res;
}
function read_db(url){
  let res;
  try{
      res = JSON.parse(fs.readFileSync(url));
  }catch(e){
      return false;
  }
  return res;
}
function write_db(url, new_db){
  try{
      fs.writeFileSync(url, JSON.stringify(new_db));
  }catch(e){
      return false;
  }
  return true;
}

app.get('/', (req, res) => {
  res.render('pages/events', {})
});

app.get('/users', (req, res) => {
  res.render('pages/users')
})

app.get('/eventdata', (req, res) => {
  res.json(read_db('data/events.json'))
})

app.get('/userdata', (req, res) => {
  res.json(read_db('data/users.json'))
})

app.post('/recordevent', (req, res)=>{
  console.log(req.body)
  let cur_data = read_db('data/events.json')
  cur_data.data.push(req.body)
  write_db('data/events.json', cur_data)
})

app.post('/recorduser', (req, res)=>{
  console.log(req.body)
  let cur_data = read_db('data/users.json')
  cur_data[req.body.username] = {attributes: req.body.attributes}
  write_db('data/users.json', cur_data)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
