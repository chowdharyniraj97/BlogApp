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
    Blog.find({},function(err,blogs){
        if(err)
        console.log("error");
        else
        res.render("index",{blogs:blogs});
    });
});

app.get("/",function(req,res){
    res.redirect("/blogs");
});



app.listen(3000,()=>{
    console.log("server is running");
  });