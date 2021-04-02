const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: process.env.API_KEY
});

const handleImageURL = (req,res)=>{ 
  app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then((data)=>{
    res.json(data);
  })
  .catch((error)=>{
    res.status(400).json("Oops unable to connect with API")
  })
}

const handleImage = (req,res,db)=>{
   const { id }=req.body;
   db('users').where('id', '=', id)
   .increment('entries',1)
   .returning('entries')
   .then((data)=>{
    if(data.length){
      res.json(data[0])
    }
    else{
      res.status(400).json("Oops, error")
    } 
   })
}

module.exports={
  handleImage:handleImage,
  handleImageURL:handleImageURL
}