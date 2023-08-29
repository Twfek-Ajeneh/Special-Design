//start check local storage
let mainColor = localStorage.getItem('main-color');
if(mainColor !== null){
    document.documentElement.style.setProperty('--main--color' , mainColor);
}
let allLi = document.querySelectorAll(".colors-list li");
allLi.forEach(li => {
    let temp = li.classList;
    temp.remove('active');
    let color = document.documentElement.style.getPropertyValue('--main--color');
    if(li.dataset.color == color) temp.add('active');
});

//end check local storage

// start change background image
let landingPage = document.querySelector(".landing-page");
let images = ['01.jpg' , '02.jpg' , '03.jpg' , '04.jpg' , '05.jpg'];
let backgroundOption = true;
//check local storage
let backgroundLocal = localStorage.getItem('background-option');
if(backgroundLocal !== null){
    backgroundOption = backgroundLocal === "true" ? true : false;
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove('active');
        if(element.dataset.background === 'yes' && backgroundOption){
            element.classList.add('active');
        }
        else if(element.dataset.background === 'no' && !backgroundOption){
            element.classList.add('active');
        }
    });
}
let interval;
function randomizeImgs() {
    if(backgroundOption){
        interval = setInterval(() => {
            let randomNum = Math.floor(Math.random() * images.length);
            let temp = 'url("images/' + images[randomNum] + '")';
            landingPage.style.backgroundImage = temp;
        }, 20000);
    }
    else {
        clearInterval(interval);
    }
}
randomizeImgs(); 

// end change background image

//start random background option
const randomBackEl = document.querySelectorAll(".random-background span");
randomBackEl.forEach(span => {
    span.addEventListener("click" , (event) => {
        event.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        event.target.classList.add("active");
        if(event.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem('background-option' , true);
        }
        else if(event.target.dataset.background === 'no'){
            backgroundOption = false;
            randomizeImgs();
            localStorage.setItem('background-option' , false);
        }
    });
});
//end random background option


// start settings box button
let settingsBox = document.querySelector(".settings-box");
let settingButton = settingsBox.firstElementChild;
let gear = settingButton.firstElementChild;
settingButton.onclick = () => {
    settingsBox.classList.toggle('open');
    gear.classList.toggle('fa-spin');
};
// end settings box button

//start switch main color
const colorLi = document.querySelectorAll(".colors-list li");
colorLi.forEach(li => {
    li.addEventListener('click' , event => {
        let temp = event.target.dataset.color;
        document.documentElement.style.setProperty('--main--color' , temp);
        window.localStorage.setItem('main-color' , temp);
        colorLi.forEach(item => {item.classList.remove('active');});
        li.classList.add('active');
    });
});
//end switch main color

// start skills progress handle
let ourSkills = document.querySelector(".skills");

window.onscroll = () => {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.scrollY;

    if(windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
}
// end skills progress handle

//start popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(image => {
    image.addEventListener('click' , (event) => {
        // create overlay element
        let overlay = document.createElement('div');
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        //create popup element
        let popupBox = document.createElement('div');
        popupBox.className = "popup-box";

        // create the image
        let popupImage = document.createElement('img');
        popupImage.setAttribute('src' , image.src)

        //add image to popup
        popupBox.appendChild(popupImage);

        //add popup to body
        document.body.appendChild(popupBox);

        //add alt text
        if(image.alt !== null){
            let imageHeading = document.createElement('h3');
            let imageText = document.createTextNode(image.alt);
            imageHeading.appendChild(imageText);
            popupBox.firstElementChild.before(imageHeading);
            // popupBox.appendChild(imageHeading);
        }
    });
});


document.addEventListener('click' , event => {
    if(event.target.className == 'popup-overlay'){
        document.body.removeChild(document.body.lastElementChild);
        document.body.removeChild(document.body.lastElementChild);
    }
});
//end popup with the image

// start bullets
const allBullets =document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach(bullet => {
    bullet.addEventListener("click" , event => {
        document.querySelector(event.target.dataset.section).scrollIntoView({
            behavior: "smooth",
        });
    });
});
// end bullets

// start toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (event) {
    event.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
};

document.addEventListener("click" , (event)  => {
    if(event.target !== toggleBtn && event.target !== tLinks){
        toggleBtn.classList.remove("menu-active");
        tLinks.classList.remove("open");
    } 
});

tLinks.onclick = function (event) {
    event.stopPropagation();
}
// end toggle menu