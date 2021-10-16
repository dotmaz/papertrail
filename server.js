const express = require('express');
const fs = require('fs')
const cors = require('cors');
const app = express();
app.use(cors());
app.set('view engine', 'ejs');
const port = 3000;

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
  res.render('pages/events', {});
});

app.get('/users', (req, res) => {
  res.render('pages/users');
})

app.get('/eventdata', (req, res) => {
  res.json(read_db('data/events.json'))
})

app.get('/userdata', (req, res) => {
  res.json(read_db('data/users.json'))
})


app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
