const express = require("express")
const path = require("path")
const handlebars = require("handlebars")
const exphbs = require("express-handlebars")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser')
const bodyParser = require("body-parser")

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", (req,res)=>{

    res.send(`
        <h2>welcome to school database</h2>
        <h3>click here to  get access to the <b><a href="/student/list">Database</a></b3></h3>`
    )
})

app.set("views" , path.join(__dirname, '/views'))

app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: "hbs",
    defaultLayout: "MainLayout",
    layoutsDir: __dirname + "/views/layouts/",

}))

app.set("view engine", "hbs");

app.listen(3000, ()=>{

    console.log("server running port 3000");
})