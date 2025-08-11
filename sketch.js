let classifier; 
let video; 
let label = "waiting..."; 
let confidence = 0;
let results; 

function preload() { 
    classifier = ml5.imageClassifier("MobileNet");
}

function gotResults(results) {
    label = results[0].label; 
    confidence = results[0].confidence;
    classifier.classify(video, gotResults, 1);
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    classifier.classify(video, gotResults, 1);
}

function draw() {
    background(220);
    image(video, 0, 0, width, height);
    
    rectMode(CENTER);
    fill(120, 120, 120, 120);
    rect(width/2, height - 5, width, 50);
    textSize(25);
    fill(255);
    textAlign(CENTER, CENTER);
    noStroke();
    text("Label:" + label, width / 2, height - 50);
    
    if (confidence > 0.5) 
    {
	fill (0, 255, 0, 120);
    }
    else 
    {
	fill (255, 0, 0, 120);
    }
    
    rect(width / 2, height - 20, width, 50);
    fill(0);
    text("Confidence: " + nf(confidence * 100, 2, 1) + "%", width / 2, height - 25);
}
