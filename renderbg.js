let myCanvas;
let bgdiv = document.getElementById("myVideo")
function setup() {
    myCanvas = createCanvas(window.innerWidth, window.innerHeight,WEBGL);

    myCanvas.parent("myVideo");
    noStroke();
}

function draw() {
    resizeCanvas(window.innerWidth, window.innerHeight)
    background("#8b4049");
    var time = Date.now();
    var offset = ((time/5000)%1)*80;
   

/*
    fill("#543344");
    drawEllipseGrid(19,offset+60);

    fill("#8b4049");



    drawEllipseGrid(15,offset+40);

    fill("#ae6a47");


    drawEllipseGrid(14.5,offset+20);

    */ 
    fill("#caa05a");
    
    drawEllipseGrid(14,offset);
}

function drawEllipseGrid(range,offset) {
    let halfwidth = window.width/2;
    let halfheight = window.height/2;

    

    for (var x = -halfwidth-160; x <= halfwidth+160; x += 80) {
        for (var y = -halfheight-160; y <= halfheight+160; y += 80) {
            var sizeX = 1-max(min(abs((x+offset)-(mouseX-halfwidth))/(80*range),1),0);
            var sizeY = 1-max(min(abs((y+offset)-(mouseY-halfheight))/(80*range),1),0);
            var size = sizeX*sizeY;
            ellipse(x+offset, y+offset, size*140, size*140);
            
        }
    }
}
