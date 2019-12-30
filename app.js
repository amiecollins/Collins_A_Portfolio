// Handlebars and Data Collection

// requirements
const express = require("express");
const hbs = require('handlebars/runtime')['default'];
const helpers = require('helpers-hbs');
hbs.registerHelper("each", require("handlebars-helper-each"));
const path = require("path");
const sql = require("./utils/sql");


const port = process.env.PORT || 3000;
const app = express();


var iconsData;
var photosData;
var sectionsData;
var qualitiesData;
var social_mediaData;
var projectsData;

app.use(express.static(__dirname));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname + "/views/"));

app.get("/", (req, res, next) => {
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
        
        query = "SELECT * FROM tbl_projects_data LEFT JOIN tbl_project_photos ON tbl_projects_data.photosetID = tbl_project_photos.ID";
        sql.query(query, (err, projects) => {
            if (err) { console.log(err.message); return next(); }
            projectsData = projects;
        })

    })

    res.render("index", { icons: iconsData, photos: photosData, projects: projectsData, section: sectionsData, qualities: qualitiesData, social_media: social_mediaData });
    
})

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});