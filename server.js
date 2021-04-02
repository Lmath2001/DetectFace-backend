const express= require('express');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db=knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false
    }
  }});


//Testing for connecting knex to database
// console.log(knex.select('*').from('users'));
// db.select('*').from('users').then((data)=>{
//   console.log(data);
// });

// const bodyParser=require('body-parser');
const app=express();

//Body-parser
app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
  res.json("Success")
})

app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageUrl',(req,res)=>{image.handleImageURL(req,res)})

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`We are running on localhost ${process.env.PORT}`);
})