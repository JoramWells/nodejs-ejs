const express = require("express");
const bodyParser = require('body-parser')
const axios = require("axios");

const app = express();

//setting the templating engine
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views', __dirname);

app.get("/", async (req, res) => {
  await axios
    .get("http://127.0.0.1:8000/posts")
    .then((response) => res.send(response.data))
    .catch((err) => console.log(err));
});

const data={
    keyword:"ibraH",
    min_videos:2
}

app.get('/post',(req,res)=>{
  res.render('./views/index')
    // await axios.post("http://127.0.0.1:8000/posts",data)
    // .then(response=>res.send(response.data)).catch(err=>console.log(err))

})
app.post('/post2',async(req,res)=>{
    const {keyword, min_videos} = req.body
    
  
    await axios.post("https://andeyo.herokuapp.com/posts",req.body)
    .then(response=>{
      // res.send(response.data)
      console.log(req.body)
      if(response.data)
        {
          res.render('./views/index',{posts:response.data})
          console.log(response.data)
      }
      else
        res.render('./views/index')

    }).catch(err=>console.log(err))

})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
