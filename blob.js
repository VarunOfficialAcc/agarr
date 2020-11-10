function Blob(x, y, r){
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0,0);
  
  this.update = function(){
    var mouse = createVector(mouseX, mouseY);
    //console.log(mouse.x, mouse.y);
    mouse.sub(createVector(width/2, height/2));
    if (mag(mouse.x, mouse.y)>50) mouse.setMag(3);
    else mouse.div(100);
    this.vel.lerp(mouse, 0.08);
    this.pos.add(this.vel);
  }
  
  this.eject = function(){
    if (this.r<=32) return;
    var ej_mouse = createVector(mouseX - width/2, mouseY - height/2);
    ej_mouse.setMag(this.r*6);
    var ej_pos = createVector(ej_mouse.x + this.pos.x, ej_mouse.y + this.pos.y);
    blobs[num_blobs] = new Blob(ej_pos.x, ej_pos.y, 8);
    num_blobs += 1;
    
    this.r = pow(this.r, 3) - pow(8, 3);
    this.r = pow(this.r, 1/3);
    
  }
  
  this.eat = function(){
      for (var i=0; i<num_blobs; i++){
        if (dist(this.pos.x, this.pos.y, blobs[i].pos.x, blobs[i].pos.y)<=this.r){
          this.r+=pow(this.r, 3) + pow(blobs[i].r, 3);
          this.r = pow(this.r, 1/3);
          blobs.splice(i, 1);
          i-=1;
          num_blobs -= 1;
          // erase(blobs[i]);
        }
      }
            
  }
  
  this.show = function(){
    fill(255);
    circle(this.pos.x, this.pos.y, 2*this.r);
  }
}