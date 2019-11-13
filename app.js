let bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),

    app         = expresss();

mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // to be able to serve up assets



// SCHEMA
let blogSchema = new.mongoose.Schema({
    title: String, 
    image: String, 
    body: String, 
    created: {
        type: String, 
        default: Date.now
    }
});
let Blog = mongoose.model("Blog", blogSchema);



// RESTFUL ROUTES




// Tell express to listen for requests -start server 
// start your app with this command: PORT=3001 nodemon app.js
app.listen(process.env.PORT, process.env.IP, () =>{
    console.log("Blog App Server has started")
});