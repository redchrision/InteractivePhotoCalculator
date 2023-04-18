var imgs = [];
var avgImg;
var numOfImages = 30;

var imageToDraw = 0; // Step 7: variable to be used for changes the code so that the image drawn on the left is a random face from the array of faces rather than just the first one

//////////////////////////////////////////////////////////
function preload() { // preload() runs once

    for(i=0; i<numOfImages; i++){ // Step 1: uses a for loop within the preload() function to load all 30 images
        const filename = 'assets/' + i + '.jpg'; // Step 1: concatenates the the path to the images, the for-loop index and the file extension
        //console.log(filename); // Step 1: uses console.log for making sure filename is built correctly 

        imgs.push(loadImage(filename));
    }


}
//////////////////////////////////////////////////////////
function setup() {
    
    createCanvas(imgs[0].width * 2, imgs[0].height); // Step 2: updates the createCanvas() line to create a canvas twice the width of the first image in the array, and equal to the first image’s height
    pixelDensity(1);

    avgImg = createGraphics(imgs[0].width, imgs[0].height); // Step 3: initialises the avgImg with its size equal to the size of the first image in the array
}


//////////////////////////////////////////////////////////
function draw() {
    background(125);

    image(imgs[imageToDraw], 0, 0); // Step 2: draws the first image on the left of the canvas
    for(i=0; i<numOfImages; i++){ // Step 4: for loop to call the loadPixels() command on all images within imgs
        imgs[i].loadPixels();
    }

    avgImg.loadPixels(); // Step 4: calls loadPixels() on the avgImg variable

    // Step 5: nested for-loop looping over all pixels on the image in the array
    for(let x=0; x<avgImg.width; x++){
        for(let y=0; y<avgImg.height; y++){
            var index = ((avgImg.width * y) + x)*4;
            avgImg.pixels[index] = 255; // Step 5: Converts the x and y coordinates from the for-loop to a pixel index value and use that value to set the corresponding pixel in the avgImg to red.
            avgImg.pixels[index+3] = 255;

            // Step 6: creates three variables sumR, sumG, sumB and initialises them to 0
            var sumR = 0; 
            var sumG = 0; 
            var sumB = 0;

            // Step 6: loops through all the images in the imgs array; for each channel adds its value to the corresponding sum variable
            for(let k=0; k<imgs.length; k++){
                sumR += imgs[k].pixels[index];
                sumG += imgs[k].pixels[index+1];
                sumB += imgs[k].pixels[index+2];
            }

            // Step 7: lerp() function used such that on mouse moved we have the pixel values of the second image transition between the randomly selected image and the average image based on the mouseX value
            const avgR = sumR / imgs.length;
            const randR = imgs[imageToDraw].pixels[index];
            const resultR = lerp(avgR, randR, mouseX/width);

            const avgG = sumG / imgs.length;
            const randG = imgs[imageToDraw].pixels[index+1];
            const resultG = lerp(avgG, randG, mouseX/width);

            const avgB = sumB / imgs.length;
            const randB = imgs[imageToDraw].pixels[index+2];
            const resultB = lerp(avgB, randB, mouseX/width);

            avgImg.pixels[index] = resultR;
            avgImg.pixels[index+1] = resultG;
            avgImg.pixels[index+2] = resultB;
        }
    }

    avgImg.updatePixels(); // Step 5: updates the pixels of the avgImg
 
    image(avgImg, width/2, 0); // Step 5: draws the avgImg to the right of the existing image

    noLoop(); // Step 5: adds a noLoop() at the end of the draw() function
}

// Step 7: Function keyPressed() that makes the image drawn on the left to be a random face from the array of faces rather than just the first one
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        imageToDraw = Math.floor(random(0, 29)); // random image 
        loop();
    }
}

// Step 7 : Function mouseMoved() used for Step 7 
function mouseMoved() {
    loop();
}