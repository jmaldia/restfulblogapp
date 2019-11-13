let bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),

    app         = express();

mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // to be able to serve up assets



// SCHEMA
let blogSchema = new mongoose.Schema({
    title: String, 
    image: String, 
    body: String, 
    created: {
        type: String, 
        default: Date.now
    }
});
let Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test blog", 
//     image: "https://www.cancapital.com/wp-content/uploads/2016/11/blog-blitz.jpg", 
//     body: "This is the first blog", 
// });

// RESTFUL ROUTES
app.get("/", (req, res) => {
    res.redirect("/blogs");
});
// INDEX ROUTE - show all blogs
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log("ERROR:", err);
        } else {
            res.render("index", { blogs: blogs });
        }
    })
});
// NEW ROUTE - render the form
app.get("/blogs/new", (req, res) => {
    res.render("new");
});
// CREATE ROUTE - render the form
app.post("/blogs", (req, res) => {
    res.render("new");
});



// Tell express to listen for requests -start server 
// start your app with this command: PORT=3001 nodemon app.js
app.listen(process.env.PORT, process.env.IP, () =>{
    console.log("Blog App Server has started")
});