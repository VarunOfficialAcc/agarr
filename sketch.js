var blob;
var blobs = [];
var num_blobs = 100;
var zoom = 1;
function setup() {
  createCanvas(400, 400);
  blob = new Blob(0,0, 32);
  for (var i = 0; i<100; i++){
    blobs[i] = new Blob(random(-width, 2*width), random(-height, 2*height), 16);
  }

}

function draw() {
  background(220);
  // translate (width/2-blob.pos.x, height/2-blob.pos.y)
  translate (width/2, height/2);
  var newzoom = 32/blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale (zoom);
  translate (- blob.pos.x, - blob.pos.y);
  // console.log(blob.pos.x, blob.pos.y)
    
  for (var i=0; i<num_blobs; i++){
    blobs[i].show();
  }
  blob.show();
  if ( keyIsDown(ENTER) ) 
    blob.eject();
  blob.eat();
  blob.update();
}