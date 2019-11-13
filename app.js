let bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose"),
    express         = require("express"),

    app             = express();

mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // to be able to serve up assets
app.use(methodOverride("_method"));



// SCHEMA
let blogSchema = new mongoose.Schema({
    title: String, 
    image: String, 
    body: String, 
    created: {
        type: Date, 
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
// CREATE ROUTE - process form
app.post("/blogs", (req, res) => {
    // create blog
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});
// SHOW ROUTE - show more details on blog
app.get("/blogs/:id", (req, res) => {
    // show post
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", { blog: foundBlog });
        }
    });
});
// EDIT ROUTE - edit blog details
app.get("/blogs/:id/edit", (req, res) => {
    // edit post
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", { blog: foundBlog });
        }
    });
});
// EDIT ROUTE PUT - edit blog details
app.put("/blogs/:id", (req, res) => {
    // edit post
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});
// DELETE ROUTE - delete blog post
app.delete("/blogs/:id", (req, res) => {
    // edit post
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});


// Tell express to listen for requests -start server 
// start your app with this command: PORT=3001 nodemon app.js
app.listen(process.env.PORT, process.env.IP, () =>{
    console.log("Blog App Server has started")
});