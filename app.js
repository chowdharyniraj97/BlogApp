var bodyParser=require("body-parser");
var express= require('express');
var app= express();
var mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser: true});
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var blogSchema=new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}



});
var Blog=mongoose.model("Blog",blogSchema);

app.get("/blogs",function(req,res){
    res.render("index");
});

app.get("/",function(req,res){
    res.send("welcome");
});

app.listen(3000,()=>{
    console.log("server is running");
  });