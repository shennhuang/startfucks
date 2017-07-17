var ejs = require('ejs');
app.set('view engine', 'ejs');

var mongoose = require("mongoose");
var myschema = new mongoose.Schema({ username:String,psd:String});
var users = mongoose.model("users",myschema);
var url = "localhost:8000/users";
mongoose.connect(url);


app.listen(80)