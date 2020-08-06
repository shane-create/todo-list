//My node modules
const express = require("express");
const bodyParser = require("body-parser");

//My Owm module
const date = require(__dirname + "/date.js");

//App contains express
const app = express();

//My two list arrays
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

//Setting the view engine and ejs
app.set('view engine', 'ejs');

//Makeing my static files public
app.use(express.static("public"));

//Getting body parser
app.use(bodyParser.urlencoded({
  extended: true
}));

//Creating a function to display on my home route
app.get("/", function(req, res) {

//My own modue required
  let day = date.getDate();

//Rendering the html with ejs templating
  res.render('list', {listTitle: day, newListItems:items});
});

//Posting my js to the home route
app.post("/", function(req, res){

//Letting the item equal the newItem input
  let item  = req.body.newItem;

//Seeing if the route is work or just the default
  if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work")
  } else{
    items.push(item);
    res.redirect("/");
  }
});

//Creating a function to display on my /work route
app.get("/work", function(req, res){
  res.render('list', {listTitle: "Work", newListItems: workItems});
});

//Again posting to my work route
app.post("/work", function(req, res){
  let item  = req.body.newItem;

//pushing my items
  items.push(item);

//Redirecting everything to my /work page
  res.redirect("/work");
});

//The port its being listend on
app.listen(3000, function() {
  console.log("The server has started on port 3000")
});
