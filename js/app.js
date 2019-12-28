// Handlebars and Data Collection

// requirements
const express = require("express");
const hbs = require('handlebars/runtime')['default'];
const helpers = require('helpers-hbs');
hbs.registerHelper('each', require('handlebars-helper-each'));
const path = require("path");
const sql = require("./utils/sql");


const port = process.env.PORT || 2177;
const app = express();

var Data = [
    iconsData,
    photosData,
    sectionsData,
    qualitiesData,
    quotesData,
    projectsData,
    project_photosData,
    call_to_actionData,
    social_mediaData
];

var TableNames = [
    "tbl_icons",
    "tbl_photos",
    "tbl_sections",
    "tbl_qualities",
    "tbl_quotes",
    "tbl_projects_data",
    "tbl_project_photos",
    "tbl_call_to_action",
    "tbl_social_media"
];
    
app.use(express.static(__dirname));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname + "/views"));

app.get("/", (req, res, next) => {
    // connect to database
    sql.getConnection((err, connection) => {
        if (err) {
            console.log(err.message);
            return next();
        }
        // collect data
        for (var i = 0; i < TableNames.length(); i++) {
            query = "SELECT * FROM " + TableNames[i];
            sql.query(query, (err, data) => {
                if (err) { console.log(err.message); return next(); }
                Data[i] = data;
            })
        }
        
    })
    // check that all data is there
    var nullCheck = false;
    for (var i = 0; i < Data.length(); i++) {
        if (Data[i] == null) {
            nullCheck = true;
        }
    }
    res.render("home", { icons: Data.iconsData, photos: Data.photosData, sections: Data.sectionsData, qualities: Data.qualitiesData, social_media: Data.social_mediaData});
})

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

// Applying Dynamic Content

(() => {

// select page locations (just for scrolling)

const home = document.querySelector(".home");
const projects = document.querySelector(".projects");
const about = document.querySelector(".about");
const contact = document.querySelector(".contact");

// select buttons to add event modifiers

const burger_icon = document.querySelector(".burger-icon");
const links = document.querySelectorAll(".link");
const exit_button = document.querySelector(".exit-button");
const project_buttons = document.querySelectorAll(".project-icon");
const clear_button = document.querySelector(".clear-button");
const send_button = document.querySelector(".send-button");

// select elements on page to be modified

const burger_menu = document.querySelector(".burger-menu");
const light_box = document.querySelector(".light-box");
const quote_container = document.querySelector(".quote");
const project_display = document.querySelector(".projects-display");
const contact_form = document.querySelectorAll(".contact-input");
const call_to_action_container = document.querySelector(".call");

// select elements to apply background images

const tree_bar = document.querySelector(".tree-bar");
tree_bar.style.backgroundImage = url(Data.iconsData[4].svgURL);

const home_hero = document.querySelector(".main-hero");
const intro_hero = document.querySelector(".intro-hero");
const projects_hero = document.querySelector(".projects-hero");
const about_hero = document.querySelector(".about-hero");
const contact_hero = document.querySelector(".contact-hero");

home_hero.style.backgroundImage = url(Data.sectionsData[0].imgURL);
intro_hero.style.backgroundImage = url(Data.sectionsData[1].imgURL);
projects_hero.style.backgroundImage = url(Data.sectionsData[2].imgURL);
about_hero.style.backgroundImage = url(Data.sectionsData[3].imgURL);
contact_hero.style.backgroundImage = url(Data.sectionsData[4].imgURL);


// create new elements to be added

var project_title = document.createElement("div").classList(".project-title");
var project_main = document.createElement("div").classList(".project-main");
var project_description = document.createElement("div").classList(".project-desc");
const project_link_container = document.createElement("div").classList(".project-link-container");
var project_link = document.createElement("a");
var slideshow = document.createElement("div").classList(".slideshow");
const left_arrow = document.createElement("button").classList(".left-arrow");
const right_arrow = document.createElement("button").classList(".right-arrow");
var project_photos_viewer = document.createElement("div").classList(".project-photos-viewer", ".center");
var project_photos_container = document.createElement("div").classList(".project-photos-container")
var project_photos = {
    project_main_image = document.createElement("img").classList(".main-image"),
    one = document.createElement("img").classList(".image"),
    two = document.createElement("img").classList(".image"),
    three = document.createElement("img").classList(".image"),
    four = document.createElement("img").classList(".image"),
    five = document.createElement("img").classList(".image")
}
for (var i = 0; i < project_photos.length(); i++) {
    project_photos[i].classList(".project-photo");
}
const cta_top = document.createElement("div");
const star = document.createElement("img").classList(".bigstar");
const cta_bot = document.createElement("div");

var quote_content = document.createElement("div").classList(".quote-content");
var quote_attribution = document.createElement("div").classList(".quote-attribution");

// generate call to action content
const rdmCTA = Math.round(Math.random() * Data.call_to_actionData.length());

// set call to action data on new elements

cta_top.textContent = Data.call_to_actionData.appriciation + "</br>" + Data.call_to_actionData.congrats + "<br> Have a " + Data.call_to_actionData.color_name + " star!";
star.src = Data.iconsData[2].svgURL;
star.alt = Data.call_to_actionData.color_name[rdmCTA] + Data.iconsData[2].alt;
star.setAttribute("fill", Data.call_to_actionData[rdmCTA].color_hex);
star.classList.add(".saturate");
cta_bot.textContent = Data.call_to_actionData[rdmCTA].call_to_action;

// publish random content

refreshQuote();
var quoteRefresher = setInterval(refreshQuote, 10000)
call_to_action_container.appendChild(cta_top);
call_to_action_container.appendChild(star);
call_to_action_container.appendChild(cta_bottom);

// publish projects

refreshProjects(0);

// functions

function refreshQuote() {
    const rdmQuote = Math.round(Math.random() * Data.quotesData.length());
    quote_container.textContent = Data.quotesData.quote[rdmQuote];
    quote_container.textContent = Data.quotesData.quote[rdmQuote];
}

function toggleBurgerMenu() {
    burger_menu.classList.toggle(".hidden");
}

function scrollLink() {
    if (this.dataset.link == ".home") {
        home.scrollIntoView();
    } else if (this.dataset.link == ".projects") {
        projects.scrollIntoView();
    } else if (this.dataset.link == ".about") {
        about.scrollIntoView();
    } else if (this.dataset.link == ".contact") {
        contact.scrollIntoView();
    }
}

function refreshProjects() {
    // collect viewed project
    const viewedProject = Data.projectsData[this.dataset.projectid];

    // start adding data
    project_title.textContent = viewedProject.title;
    project_display.appendChild(project_title);
    project_display.appendChild(project_main);
    project_description.textContent = viewedProject.description;
    project_main.appendChild(project_desc);
    project_description.appendChild(project_link_container);

    project_link.textContent = "link to view";
    project_link.href = viewedProject.link;
    project_link_container.appendChild(project_link);
    project_photos.project_main_photo.src = viewedProject.main_photoURL;
    project_photos.project_main_photo.alt = viewedProject.main_photoALT;
    project_main.appendChild(project_photos.main_photo);

    project_display.appendChild(slideshow);
    left_arrow.style.backgroundImage = url(Data.iconsData[8].svgURL);
    slideshow.appendChild(left_arrow);
    slideshow.appendChild(project_photos_viewer);
    project_photos_viewer.appendChild(project_photos_container);
    project_photos.one.src = viewedProject.photo1URL;
    project_photos.one.alt = viewedProject.photo1ALT;
    project_photos_container.appendChild(project_photos.one);
    project_photos.two.src = viewedProject.photo2URL;
    project_photos.two.alt = viewedProject.photo2ALT;
    project_photos_container.appendChild(project_photos.two);
    project_photos.three.src = viewedProject.photo3URL;
    project_photos.three.alt = viewedProject.photo3ALT;
    project_photos_container.appendChild(project_photos.three);
    if (viewedProject.photo4URL != null) {  
        project_photos.four.src = viewedProject.photo4URL;
        project_photos.four.alt = viewedProject.photo4ALT;
        project_photos_container.appendChild(project_photos.four);
    }
    if (viewedProject.photo5URL != null) {  
        project_photos.five.src = viewedProject.photo5URL;
        project_photos.five.alt = viewedProject.photo5ALT;
        project_photos_container.appendChild(project_photos.five);
    }
    right_arrow.style.backgroundImage = url(Data.iconsData[9].svgURL);
    slideshow.appendChild(right_arrow);
}

function generateLightBox() {
    const photoURL = this.src;
    if (photoURL != null) {
        light_box_photo = document.createElement("img").classList(".light-box-image");
        light_box_photo.src = photoURL;
        light_box_photo.alt = this.alt;
        light_box.textContent = this.title;
        light_box.appendChild(light_box_photo);
        light_box.textContent += this.alt;
        light_box.classList.remove(".hidden");
    }

}

function removeLightBox() {
    light_box.classList.add(".hidden");
}

function slideshowLeft() {
    if (project_photos_viewer.classList().contains(".right")) {
        project_photos_viewer.classList.remove(".right");
        project_photos_viewer.classList.add(".center");
    } else if (project_photos_viewer.classList().contains(".center")) {
        project_photos_viewer.classList.remove(".center");
        project_photos_viewer.classList.add(".left");
    } else if (project_photos_viewer.classList().contains(".left")) {
        project_photos_viewer.classList.remove(".left");
        project_photos_viewer.classList.add(".right");
    }
}

function slideshowRight() {
    if (project_photos_viewer.classList().contains(".right")) {
        project_photos_viewer.classList.remove(".right");
        project_photos_viewer.classList.add(".left");
    } else if (project_photos_viewer.classList().contains(".center")) {
        project_photos_viewer.classList.remove(".center");
        project_photos_viewer.classList.add(".right");
    } else if (project_photos_viewer.classList().contains(".left")) {
        project_photos_viewer.classList.remove(".left");
        project_photos_viewer.classList.add(".center");
    }
}

function clearForm() {
    for (var i = 0; i < contact_form.length(); i++) {
        contact_form[i].value = "";
    }
}

// add event listeners

burger_icon.addEventListener("click", toggleBurgerMenu);

for (var i = 0; i < links.length(); i++) {
    links[i].addEventListener("click", scrollLink); 
}

right_arrow.addEventListener("click", slideshowRight);
left_arrow.addEventListener("click", slideshowLeft);

clear_button.addEventListener("click", clearForm);

for (var i = 0; i < project_buttons.length(); i++) {
    project_buttons[i].addEventListener("click", refreshProjects);
}

for (var i = 0; i < project_photos.length(); i++) {
    project_photos[i].addEventListener("click", generateLightBox); 
}

exit_button.addEventListener("click", removeLightBox);

})();