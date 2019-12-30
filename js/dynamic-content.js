const sql = require("../utils/sql.js");

(() => {
    
    var quotesData;
    var projectsData;
    var call_to_actionData;

    sql.getConnection((err, connection) => {
        if (err) {
            console.log(err.message);
            return next();
        }
        // collect data
        query = "SELECT * FROM tbl_projects_data LEFT JOIN tbl_project_photos ON tbl_projects_data.photosetID = tbl_project_photos.ID";
        sql.query(query, (err, projects) => {
            if (err) { console.log(err.message); return next(); }
            projectsData = projects;
        })
        
        query = "SELECT * FROM tbl_calltoaction";
        sql.query(query, (err, quotes) => {
            if (err) { console.log(err.message); return next(); }
            call_to_actionData = quotes;
        })
        
        query = "SELECT * FROM tbl_quotes";
        sql.query(query, (err, icons) => {
            if (err) { console.log(err.message); return next(); }
            iconsData = icons;
        })
    })

    
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
    tree_bar.style.backgroundImage = url(iconsData[4].svgURL);

    const home_hero = document.querySelector(".main-hero");
    const intro_hero = document.querySelector(".intro-hero");
    const projects_hero = document.querySelector(".projects-hero");
    const about_hero = document.querySelector(".about-hero");
    const contact_hero = document.querySelector(".contact-hero");

    home_hero.style.backgroundImage = url(sectionsData[0].imgURL);
    intro_hero.style.backgroundImage = url(sectionsData[1].imgURL);
    projects_hero.style.backgroundImage = url(sectionsData[2].imgURL);
    about_hero.style.backgroundImage = url(sectionsData[3].imgURL);
    contact_hero.style.backgroundImage = url(sectionsData[4].imgURL);


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
    var project_main_image = document.createElement("img").classList(".image");
    var project_photos = {
        one: document.createElement("img").classList(".image"),
        two: document.createElement("img").classList(".image"),
        three: document.createElement("img").classList(".image"),
        four: document.createElement("img").classList(".image"),
        five: document.createElement("img").classList(".image")
    }
    project_main_image.classList.add(".main-image");
    const cta_top = document.createElement("div");
    const star = document.createElement("img").classList(".bigstar");
    const cta_bot = document.createElement("div");

    var quote_content = document.createElement("div").classList(".quote-content");
    var quote_attribution = document.createElement("div").classList(".quote-attribution");

    // functions

    function refreshQuote() {
        const rdmQuote = Math.round(Math.random() * quotesData.length());
        quote_content.textContent = quotesData.quote[rdmQuote];
        quote_attribution.textContent = quotesData.quote[rdmQuote];
        quote_container.innerHTML = "";
        quote_container.appendChild(quote_content);
        quote_container.appendChild(quote_attribution);
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
        const viewedProject = projectsData[this.dataset.projectid];

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
        project_main_image.src = viewedProject.main_photoURL;
        project_main_image.alt = viewedProject.main_photoALT;
        project_main.appendChild(project_main_image);

        project_display.appendChild(slideshow);
        left_arrow.style.backgroundImage = url(iconsData[8].svgURL);
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
        if (viewedProject.photo4URL != "null") {  
            project_photos.four.src = viewedProject.photo4URL;
            project_photos.four.alt = viewedProject.photo4ALT;
            project_photos_container.appendChild(project_photos.four);
        }
        if (viewedProject.photo5URL != "null") {  
            project_photos.five.src = viewedProject.photo5URL;
            project_photos.five.alt = viewedProject.photo5ALT;
            project_photos_container.appendChild(project_photos.five);
        }
        right_arrow.style.backgroundImage = url(iconsData[9].svgURL);
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

    // generate call to action content
    const rdmCTA = Math.round(Math.random() * call_to_actionData.length());

    // set call to action data on new elements

    cta_top.textContent = call_to_actionData.appriciation + "</br>" + call_to_actionData.congrats + "<br> Have a " + call_to_actionData.color_name + " star!";
    star.src = iconsData[2].svgURL;
    star.alt = call_to_actionData.color_name[rdmCTA] + iconsData[2].alt;
    star.fill(call_to_actionData[rdmCTA].color_hex);
    star.classList.add(".saturate");
    cta_bot.textContent = call_to_actionData[rdmCTA].call_to_action;

    // publish random content

    refreshQuote();
    setInterval(refreshQuote, 10000);
    call_to_action_container.appendChild(cta_top);
    call_to_action_container.appendChild(star);
    call_to_action_container.appendChild(cta_bottom);

    // publish projects

    refreshProjects(0);

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