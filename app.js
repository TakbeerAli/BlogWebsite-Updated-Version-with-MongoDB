//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require('lodash'); //lodash  _.lowercase for converting any type of string to lower case


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

// var posts = [];  // array of large poll of posts store all posts

const BlogShema ={  // shema for blog website
  Title : String,
  Content : String

};

const BlogPost = mongoose.model("Post", BlogShema);  // shema for blog website

app.get("/", function(req,res){

  BlogPost.find({},function(err, posts){
    res.render("home", { 
      Pagecontent:homeStartingContent,
      posts:posts
    });

  });
  
});

app.get("/about", function(req,res){
res.render("about", {AboutPage:contactContent });
});

app.get("/contact", function(req,res){
  res.render("contact", {contactPage:aboutContent });
  
  });

  app.get("/compose", function(req,res){
    res.render("compose");
    
    });

    app.post("/compose", function(req, res){
     
      // const post ={  // taking value form compose page form
      //    title : req.body.postTitle,
      //   content : req.body.postBody
      // };

      const newPost = new BlogPost({
         Title : req.body.postTitle,
         Content : req.body.postBody
      });
       
       newPost.save();

      // posts.push(post);  // inserting values to post array at top which is globels
      res.redirect("/");  // redirect to home page after submiting form

    });

    app.get("/posts/:postId", function(req, res){

      const requestedPostId = req.params.postId;
      
      BlogPost.findOne({_id: requestedPostId}, function(err, post){
          res.render("post", {
            PostTitle: post.Title,
            PostBody: post.Content
          });
        });
      
      });
        // posts.forEach(function(post){
         

        // });
       
  
  


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
