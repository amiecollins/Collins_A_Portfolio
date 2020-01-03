// Handlebars and Data Collection

// requirements
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require("express");
const hbs = require('handlebars/runtime')['default'];
const helpers = require('helpers-hbs');
hbs.registerHelper("each", require("handlebars-helper-each"));
const path = require("path");
const ajax = require("ajax");
const sql = require("./utils/sql");
const deploy = require("./deploy");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const json = require("json");


const port = process.env.PORT || 3000;
const app = express();


var quotesData;
var selected_quote_data;
var projectsData;
var call_to_actionData;
var iconsData;
var photosData;
var sectionsData;
var qualitiesData;
var social_mediaData;
var projectsData;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(require("body-parser").json());
app.use(express.static(__dirname));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname + "/views/"));

app.get("/index", (req, res, next) => {
    // connect to database
    sql.getConnection((err, connection) => {
        if (err) {
            console.log(err.message);
            return next();
        }

        // collect data from relational tables
        var query = "SELECT * FROM tbl_sections LEFT JOIN tbl_photos ON tbl_sections.heroID = tbl_photos.ID";
        sql.query(query, (err, sections) => {
            if (err) { console.log(err.message); return next(); }
            sectionsData = sections;
        })

        query = "SELECT * FROM tbl_qualities LEFT JOIN tbl_photos ON tbl_qualities.imgID = tbl_photos.ID";
        sql.query(query, (err, qualities) => {
            if (err) { console.log(err.message); return next(); }
            qualitiesData = qualities;
        })

        query = "SELECT * FROM tbl_socialmedia JOIN tbl_icons ON tbl_socialmedia.iconID = tbl_icons.ID";
        sql.query(query, (err, media) => {
            if (err) { console.log(err.message); return next(); }
            social_mediaData = media;
        })

        query = "SELECT * FROM tbl_projects_data LEFT JOIN tbl_project_photos ON tbl_projects_data.photosetID = tbl_project_photos.ID";
        sql.query(query, (err, projects) => {
            if (err) { console.log(err.message); return next(); }
            projectsData = projects;
        })
        
        query = "SELECT * FROM tbl_calltoaction";
        sql.query(query, (err, calltoaction) => {
            if (err) { console.log(err.message); return next(); }
            call_to_actionData = calltoaction;
        })
        
        query = "SELECT * FROM tbl_quotes";
        sql.query(query, (err, quotes) => {
            if (err) { console.log(err.message); return next(); }
            quotesData = quotes;
            selected_quote_data = quotesData[Math.round(Math.random() * quotesData.length)];
        })

        query = "SELECT * FROM tbl_icons";
        sql.query(query, (err, icons) => {
            if (err) { console.log(err.message); return next(); }
            iconsData = icons;
        })

        query = "SELECT * FROM tbl_photos";
        sql.query(query, (err, photos) => {
            if (err) { console.log(err.message); return next(); }
            photosData = photos;
        })
        
    })

    // var Data = {
    //     //quotes: quotesData,
    //     projects: projectsData,
    //     //call_to_action: call_to_actionData
    // };
    
    //JSON.stringify(Data);

    // console.log(Data);
    
    // async function sendData() {
    //     console.log("sendData initiated" + JSON.stringify(Data));
    //     console.log(JSON.parse(JSON.stringify(Data)));
    //     console.log("fetch started");
    //     var response = await fetch("http://localhost:3000/includes/dynamic-content.json", {  
    //         method: 'POST', 
    //         headers: {'Content-Type': 'application/json'}, json: JSON.stringify(Data) 
    //     }).then(function(data) { console.log(data); return data; }).then(async function(datacontent) { if (datacontent == null) { console.log("data fail"); } else { console.log(datacontent.json()); } }).catch(err => console.error(err));
    //     console.log("fetch complete");
    //     return response;
    // }
    
    // var Request = sendData();
    
    // console.log("Request complete" + Request);

    res.render("index", { icons: iconsData, photos: photosData, projects: projectsData, section: sectionsData, qualities: qualitiesData, social_media: social_mediaData, selected_quote: selected_quote_data });


})

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});