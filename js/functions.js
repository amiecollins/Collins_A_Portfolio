(() => {

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

    
    light_box_photo = document.querySelector(".light-box-image");
    light_box_title = document.querySelector(".light-box-title");
    light_box_description = document.querySelector(".light-box-description");


    function toggleBurgerMenu() {
        burger_menu.classList.toggle(".hidden");
    }

    function scrollLink() {
        if (this.dataset.link == "home") {
            home.scrollIntoView();
        } else if (this.dataset.link == "projects") {
            projects.scrollIntoView();
        } else if (this.dataset.link == "about") {
            about.scrollIntoView();
        } else if (this.dataset.link == "contact") {
            contact.scrollIntoView();
        }
    }
    
    function generateLightBox() {
        const photoURL = this.src;
        if (photoURL != null) {
            light_box_photo.src = photoURL;
            light_box_photo.alt = this.alt;
            light_box_title.textContent = this.dataset-stuff.title;
            light_box_description.textContent = this.alt;
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