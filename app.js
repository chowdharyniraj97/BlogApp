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

Blog.create({
    title: "test blog",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    body: "dog"
});

app.listen(3000,()=>{
    console.log("server is running");
  });