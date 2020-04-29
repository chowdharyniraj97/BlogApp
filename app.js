var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/restful_blog_app", {
  useNewUrlParser: true,
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});
var Blog = mongoose.model("Blog", blogSchema);

app.get("/blogs", function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) console.log("error");
    else res.render("index", { blogs: blogs });
  });
});

app.post("/blogs", function (req, res) {
  //console.log(req);
  // var a=req.body.title;
  // var b=req.body.image;
  // var c=req.body.body;
  // var newBlog={title: a,image: b, body: c};
  Blog.create(req.body.blog, function (err, _clexyz) {
    if (err) res.render("new");
    else {
      res.redirect("/blogs");
    }
  });
});

app.get("/", function (_req, res) {
  res.redirect("/blogs");
});

app.get("/blogs/new", function (_req, res) {
  res.render("new");
});

app.get("/blogs/show/:id", function (req, res) {
  Blog.findById(req.params.id, function (err, specificblog) {
    if (err) res.redirect("/blogs");
    else {
      res.render("show", { blog: specificblog });
    }
  });
});

//Edit route
app.get("/blogs/:id/edit", function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) res.redirect("/blogs");
    else {
      res.render("edit", { blog: foundBlog });
    }
  });
});
// update route

app.put("/blogs/:id", (req, res) => {
  res.send("Update Route!");
});
app.listen(3000, () => {
  console.log("server is running");
});
