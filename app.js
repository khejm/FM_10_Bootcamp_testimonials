import data from "./data.js";

const getElement = (element) => document.querySelector(element);

const allTestimonials = getElement(".card-testimonials");
const nextBtn = getElement(".next-btn");
const prevBtn = getElement(".prev-btn");

let userArray = data.length <= 2 ?  [...data, ...data] : [...data];


const slidersRender = userArray.map((user, index) => {
    const {name, job, info, img} = user;
    let slidePosition ="";

    index === 0 ? slidePosition = "active":
    index === userArray.length-1 ? slidePosition = "prev" :
    slidePosition = "next";

    return `
            <div class="testimonial ${slidePosition} child">
                <div class="images">
                    <img class="profile-img" src=${img} alt="${name} profile photo">
                </div>
                
                <div class="user-description">
                    <p class="info">${info}</p>
                    <p class="user-name bold">${name}</p>
                    <p class="user-job">${job}</p>            
                </div>
            </div>
    
    `
}).join("");

allTestimonials.innerHTML = slidersRender;


let arrayTestimonial = [...allTestimonials.children];
const arrayLength = arrayTestimonial.length - 1;


const slide = (slideType) => {
    const active = allTestimonials.querySelector(".active");
    const prev = allTestimonials.querySelector(".prev");

    active.classList.remove("active");
    prev.classList.remove("prev");

    slideType === "next" ? slideNext(active, prev) : slidePrev(active, prev);
}
    
const slideNext = (active, prev) => {
    active.classList.add("prev");
    prev.classList.add("next");

    if(active.nextElementSibling) {
        active.nextElementSibling.classList.remove("next");
        active.nextElementSibling.classList.add("active");
    } else {
        allTestimonials.children[0].classList.remove("next");
        allTestimonials.children[0].classList.add("active");
    }
}

const slidePrev = (active, prev) => {
    prev.classList.add("active");
    active.classList.add("next");

    if(prev.previousElementSibling) {
        prev.previousElementSibling.classList.remove("next");
        prev.previousElementSibling.classList.add("prev");
    } else {
        allTestimonials.children[arrayLength].classList.remove("next");
        allTestimonials.children[arrayLength].classList.add("prev");
    }
}


/*************** Events ********************/

document.addEventListener("keydown", (e)=> {
    e.key === "ArrowRight" && slide("next");
    e.key === "ArrowLeft" && slide();
});

nextBtn.addEventListener("click", () => {
    slide("next");
});

prevBtn.addEventListener("click", () => {
    slide();
});











