var ejs = require('ejs');
app.set('view engine', 'ejs');

var myschema = new mongoose.Schema({account:String,pwd:String,name:String});


app.listen(80)