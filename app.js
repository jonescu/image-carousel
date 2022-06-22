// Main container
const imageContainer = document.querySelector('.image-container')
const circleContainer = document.querySelector('.circles')
const numOfImages = 10;
let currentImage = 0;

// Images array of image object
const images = []

// Image constructor
class Image {
    constructor(id, src) {
        this.id = id
    this.src = src
    }
}

// Generate images on load
function createImages() {
    for(let i = 0; i<numOfImages; i++) {
        // Create image objects
        const newImage = new Image(i, `https://picsum.photos/400/400?random=${i}`)
        images.push(newImage)
        // Create circles at bottom 
        const circles = document.createElement('div')
        circles.classList.add('circle-btn')
        circles.id = i
        circleContainer.appendChild(circles)
    }
}

createImages();


// Set first image
function setInitialImage(){
 imageContainer.innerHTML = `<img src=${images[currentImage].src} id=${images[currentImage].id}>`
 circleContainer.firstChild.nextElementSibling.classList.add('active')
}

setInitialImage();

// Next image
function next(){
    const circleArray = Array.from(circleContainer.children)

    if(currentImage === 9) {
        currentImage = 0
        circleArray[currentImage].classList.add('active')
        circleArray[currentImage + 9].classList.remove('active')
        imageContainer.innerHTML = `<img src=${images[currentImage].src} id=${images[currentImage].id}>`
    } else {
        currentImage++
        circleArray[currentImage].classList.add('active')
        circleArray[currentImage - 1].classList.remove('active')
        imageContainer.innerHTML = `<img src=${images[currentImage].src} id=${images[currentImage].id}>`
    }
}
const nextBtn = document.querySelector('.nextBtn')
nextBtn.addEventListener('click', next)

// Prev image
function prev(){
    const circleArray = Array.from(circleContainer.children)

    if(currentImage === 0) {
        currentImage = 9
        circleArray[currentImage].classList.add('active')
        circleArray[currentImage - 9].classList.remove('active')
        imageContainer.innerHTML = `<img src=${images[currentImage].src} id=${images[currentImage].id}>`
    } else {
        currentImage--
        circleArray[currentImage].classList.add('active')
        circleArray[currentImage + 1].classList.remove('active')
        imageContainer.innerHTML = `<img src=${images[currentImage].src} id=${images[currentImage].id}>`
    }
}
const prevBtn = document.querySelector('.prevBtn')
prevBtn.addEventListener('click', prev)

// Select image with circles
function circles(e) {
    // Add black background if clicked
    if(e.target.classList.contains('circle-btn')) {
        e.target.classList.add('active')
        currentImage = parseInt(e.target.id)
        imageContainer.innerHTML = `<img src=${images[parseInt(e.target.id)].src} id=${images[parseInt(e.target.id)].id}>`
    }
    e.preventDefault()

    // Convert nodelist to array
    const children = e.target.parentElement.childNodes
    childrenArr = Array.from(children)
    childrenArr.shift();
    // Remove background from other circles if clicked
    childrenArr.forEach(child => {
        if (child.classList.contains('active')) {
            child.classList.remove('active')
            e.target.classList.add('active')
        }
    })
}
circleContainer.addEventListener('click', circles)


