
const handleSignIn = (req,res,db,bcrypt)=>{
  const {email,password}=req.body;
  if(!email || !password){
    return res.json("Unable to submit the form")
  }
  db.select('email', 'hash').from('login')
  .where('email', '=',email)
  .then((data)=>{
    const value =bcrypt.compareSync(password,data[0].hash)
    if(value){
      db.select('*').from('users')
      .where('email','=',email)
      .then((user)=>{
        res.json(user[0]);
      })
      .catch((error)=>{
        res.status(400).json("Oops, unable to get user");
      })
    }
    else{
      res.status(400).json("Oops, wrong credentials");
    }
  })
  .catch((error)=>{
    res.status(400).json("Oops, wrong credentials");
  })
}

module.exports={
  handleSignIn:handleSignIn
}