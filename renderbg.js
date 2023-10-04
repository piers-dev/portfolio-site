let myCanvas;
let bgdiv
function preload() {
    // load each shader file (don't worry, we will come back to these!)
    myShader = loadShader('shader.vert', 'shader.frag');
}



function getWidth() {
    return visualViewport.width;
}

function getHeight() {
    return visualViewport.height;
}

function setup() {
    bgdiv = document.getElementById("myVideo")
    myCanvas = createCanvas(getWidth(),getHeight(),WEBGL);

    myCanvas.parent("myVideo");
    pixelDensity(1);
    noStroke();
}

let firstDraw = true;

function draw() {
    //if (firstDraw) resizeCanvas(screen.width, screen.height / window.devicePixelRatio - window.screenTop + 100);
    //firstDraw = false;
    if (getHeight() != height || getWidth() != width) resizeCanvas(getWidth(),getHeight())
    background("#543344");
    var time = Date.now();
    var offset = ((time/5000)%100000)*0.05;

    
    var distOffOff = -window.scrollY/(height-100.);
   
    // shader() sets the active shader, which will be applied to what is drawn next
    shader(myShader);

    myShader.setUniform('screenSize', [1,height/width]);
    myShader.setUniform('mousePos', [1.-mouseX/width,(mouseY/height)*height/width]);
    myShader.setUniform('angle',[-0.3]);



    myShader.setUniform('offset',[-offset+0.5,offset*0.5]);
    myShader.setUniform('distOffset',[0.1+distOffOff]);

    fill("#8b4049")
    rect(0,0,width,height);

    offset -= 0.03;
    myShader.setUniform('offset',[-offset+0.5,offset*0.5]);
    myShader.setUniform('distOffset',[0.25+distOffOff]);

    fill("#ae6a47")
    rect(0,0,width,height);


    offset -= 0.03;
    myShader.setUniform('offset',[-offset,offset*0.5]);
    myShader.setUniform('distOffset',[0.45+distOffOff]);

    fill("#caa05a");
    rect(0,0,width,height);



    

/*
    fill("#543344");
    drawEllipseGrid(19,offset+60);

    fill("#8b4049");



    drawEllipseGrid(15,offset+40);

    fill("#ae6a47");


    drawEllipseGrid(14.5,offset+20);

    
    fill("#caa05a");
    
    drawEllipseGrid(14,offset);*/ 
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
