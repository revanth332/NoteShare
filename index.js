const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const router = express.Router();
var mongoose = require("mongoose");
const fs = require('fs');
const port = process.env.PORT || 3000;
var bodyParser=require("body-parser");

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.DATABASE);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

// mongoose.connect(process.env.DATABASE).then(()=>{
//     console.log("DB connected!");
// });
// mongoose.connect('mongodb://localhost:27017/notes').then(()=>{
//     console.log("DB connected!");
// });


var NotesSchema = new mongoose.Schema({
    title : String,
    context : String
});

var note = mongoose.model("note",NotesSchema);
// var note = mongoose.collection("notes",(err,collection)=>{
//     if(err){
//         console.log(e);
//     }
// })

app.use(bodyParser.urlencoded({extended: true}))

// Process application/json
app.use(bodyParser.json());

//setting static files
app.use("./static",express.static("static"));

//setting pug engine
app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"));

//applying middleware for post data
// app.use(express.urlencoded({extended:false}));

router.get('/',(req,res) => {
    res.render("index.pug");
});

router.get('/hel',(req,res)=>{
    res.send("helo");
});

router.post('/home',(req,res) => {
    var data = new note(req.body);
    // console.log(data);
    data.save().then(()=>{
        note.find((err,documents)=>{
            for(let i=0;i<documents.length;i++){
                documents[i].context = documents[i].context.toString().replace(/</g,"&lt;");
                documents[i].context = documents[i].context.toString().replace(/>/g,"&gt;");
                documents[i].context = documents[i].context.toString().replace(/\r\n/g,"<br>");
                documents[i].context = documents[i].context.toString().replace(/ /g,"&nbsp;");
            }
            res.render("home.pug",{data:documents});
        })
    }).catch((e)=>{
        res.status(400).send("Item not saved"+e);
    })
});

router.get('/home',(req,res)=>{
    note.find((err,documents)=>{
        for(let i=0;i<documents.length;i++){
            documents[i].context = documents[i].context.toString().replace(/</g,"&lt;");
            documents[i].context = documents[i].context.toString().replace(/>/g,"&gt;");
            documents[i].context = documents[i].context.toString().replace(/\r\n/g,"<br>");
            documents[i].context = documents[i].context.toString().replace(/ /g,"&nbsp;");
            
        }
        // console.log(typeof(documents));
        res.render("home.pug",{data:documents});
    })
})

router.get('/home-del321',(req,res)=>{
    note.find((err,documents)=>{
        for(let i=0;i<documents.length;i++){
            documents[i].context = documents[i].context.toString().replace(/</g,"&lt;");
            documents[i].context = documents[i].context.toString().replace(/>/g,"&gt;");
            documents[i].context = documents[i].context.toString().replace(/\r\n/g,"<br>");
            documents[i].context = documents[i].context.toString().replace(/ /g,"&nbsp;");
        }
        res.render("home-del.pug",{data:documents});
    })
})

router.get("/delete/:_id",(req,res)=>{
    note.findByIdAndRemove(req.params._id,{useFindAndModify : false},(err,document)=>{
        if(err) console.log(req.params._id);
        console.log("deleted");
    });
    res.redirect("/home-del321");
});

router.get("/clear",(req,res)=>{
    note.remove({},(err,document)=>{
        if(err) console.log("something went wrong!");
    })
    res.redirect("/home");
})
router.post("/find",(req,res)=>{
    let key = req.body.key;
    // console.log(key);
    let docs = [];
    note.find((err,documents)=>{
        docs = documents.filter(function(item){
            return item.title.toString().indexOf(key.toString().toLowerCase()) != -1;
            // return 1;
        })
        for(let i=0;i<docs.length;i++){
            docs[i].context = docs[i].context.toString().replace(/</g,"&lt;");
            docs[i].context = docs[i].context.toString().replace(/>/g,"&gt;");
            docs[i].context = docs[i].context.toString().replace(/\r\n/g,"<br>");
            docs[i].context = docs[i].context.toString().replace(/ /g,"&nbsp;");
        }
        res.render("find.pug",{data:docs});
    })
})
app.use('/',router);

connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests");
    })
})
// app.listen(port,()=>{
//     console.log('web server is listening at port '+port);
// });
