

let myCanvas;
let bgdiv


function getWidth() {
    return bgdiv.clientWidth;
}

function getHeight() {
    return bgdiv.clientHeight;
}

let gl;

let gd;

let folder;

let zipfolder;

let supero;

let maxicon;
let demaxicon;
let minicon;
let closeicon;
let notebook;
let externallink;
let twitterlogo;
let darkmode;
let lightmode;
let file;

let darkMode = false;
let yellow;

let white;

let demoVideo;
let demoVideoPlaying = false;

let play;
let pause;
let movieplayer;


function preload() {
    supero = loadFont('/resources/SUPERO.otf')
    
    gl = loadImage('/resources/verticalgradientlight.png');
    gd = loadImage('/resources/verticalgradientdark.png');
    folder = loadImage('/resources/folder.png');
    zipfolder = loadImage('/resources/zipfolder.png');
    maxicon = loadImage('/resources/maximise.png');
    demaxicon = loadImage('/resources/demaximise.png');
    minicon = loadImage('/resources/minimise.png');
    closeicon = loadImage('/resources/close.png');
    notebook = loadImage('/resources/notepad.png');
    externallink = loadImage('/resources/externallink.png');
    twitterlogo = loadImage('/resources/twitter.png');
    darkmode = loadImage('/resources/darkmode.png');
    lightmode = loadImage('/resources/lightmode.png');
    play = loadImage('/resources/play.png');
    pause = loadImage('/resources/pause.png');
    movieplayer = loadImage('/resources/movieplayer.png');
    file = loadImage('/resources/file.png')





    let storeddm = localStorage.getItem('darkmode') == 'true';
    darkMode = storeddm;

    white = color(darkMode ? 0 : 255)

    demoVideo = createVideo(['/resources/samplevideo.webm','/resources/samplevideo.mp4']);
    demoVideo.volume(0);
    demoVideo.hide();
    demoVideo.loop();


}
let windowCount = 0;


let explorer;
let twitter;
let notepad;
let movie;

let notepadTextBox;
let freelineTextBox;



function setup() {

    frameRate(144)

    bgdiv = document.getElementById("canvas")
    myCanvas = createCanvas(getWidth(), getHeight());


    demoVideo.pause();

   //demoVideo.hide();

    myCanvas.parent("canvas");



    //demoVideo.hide();

    explorer = new windowdata(300,150,450,250,folder,"Explorer",(win) => {
        if (!win.open || !win.visible) return;
        let offset = (1-win.opacity)*15;

        drawGradient(win.x,win.y+offset+30,win.w,30,0.2,0.2,false,3)
        //piers.zip
        if (drawButton(win,win.x+15,win.y + 75 + offset,win.w*0.25,win.w*0.25,0.2,0.4,0.5,3,zipfolder,true)) { 
            if (!explorerzip.open) {
            explorerzip.x = win.x+40;
            explorerzip.y = win.y+40;
            }
            openWindow(explorerzip)
        };
        noStroke();
        fill(white);
        textSize(17*(win.w/450))
        textAlign(CENTER,TOP)
        text('piers.zip',win.x+15+win.w*0.125,win.y+offset+80+win.w*0.25);

        

        textSize(17)
        textAlign(LEFT,TOP)
        text('C: > Users > admin > Downloads',win.x+10,win.y+offset+37.5);

    },1);

    explorerzip = new windowdata(350,200,450,250,zipfolder,"archive explorer",(win) => {
        if (!win.open || !win.visible) return;
        let offset = (1-win.opacity)*15;

        drawGradient(win.x,win.y+offset+30,win.w,30,0.2,0.2,false,3)
        //piers.zip
        if (drawButton(win,win.x+15,win.y + 75 + offset,win.w*0.25,win.w*0.25,0.2,0.4,0.5,3,movieplayer,true)) { 
            openWindow(movie)
        };
        
        noStroke();
        fill(white);
        textSize(17*(win.w/450))
        textAlign(CENTER,TOP)
        text('freeline.mp4',win.x+15+win.w*0.125,win.y+offset+80+win.w*0.25);

        if (drawButton(win,win.x+30+0.25*win.w,win.y + 75 + offset,win.w*0.25,win.w*0.25,0.2,0.4,0.5,3,file,true)) { 
            if (!freeline.open) {
                freeline.x = mousePosX+10;
                freeline.y = mousePosY+10;
            }
            openWindow(freeline)
        };
        
        noStroke();
        fill(white);
        textSize(17*(win.w/450))
        textAlign(CENTER,TOP)
        text('freeline.txt',win.x+30+win.w*0.375,win.y+offset+80+win.w*0.25);

        if (drawButton(win,win.x+45+0.5*win.w,win.y + 75 + offset,win.w*0.25,win.w*0.25,0.2,0.4,0.5,3,twitterlogo,true)) { 
            if (!twitter.open){
                twitter.x = mousePosX + 10;
                twitter.y = mousePosY + 10;
            }
            openWindow(twitter)
        };
        noStroke();
        fill(white);
        textSize(17*(win.w/450))
        textAlign(CENTER,TOP)
        text('twitter.lnk',win.x+45+win.w*0.625,win.y+offset+80+win.w*0.25);

        textSize(17)
        textAlign(LEFT,TOP)
        text('C: > ... > Downloads > piers.zip',win.x+10,win.y+offset+37.5);
    },1)

    explorerzip.open = false;
    
// notepad
    notepadTextBox = createElement('textarea');
    notepadTextBox.elt.value = "Hey There, I'm Piers.\nWelcome to my website!\n\n\nI am a tech artist and solo game developer.\n\nThis site should link to a bunch of my work.\n\nFeel free to look around :)"
    notepadTextBox.style('font-family:SUPERO')
    notepadTextBox.style('background:none')
    notepadTextBox.style('border:none')
    notepadTextBox.style('font-size:20px')
    notepadTextBox.style('vertical-align:top')
    notepadTextBox.style('resize:none')
    notepadTextBox.style('line-height:19px')
    notepadTextBox.style('overflow:auto')


    notepadTextBox.style('word-wrap:none')

    notepad = new windowdata(200,500,350,300,notebook,"notepad",(win)=> {
        notepadTextBox.style(`color:${white}`);

        let offset = (1-win.opacity)*15;
        notepadTextBox.position(win.x+8,win.y+35+offset);
        notepadTextBox.size(win.w-20,win.h-48)
        notepadTextBox.style('visibility',(win.visible && win.open && win.order == 0) ? 'visible' : 'hidden')
        
        if (win.visible && win.open && win.order != 0) {
            let t = notepadTextBox.elt.value;

            let i = 0;
            let charsSinceSpace = 0;
            while(i < t.length) {
                
                if (t.charAt(i) == " ") charsSinceSpace = 0;
                else charsSinceSpace++;

                if (charsSinceSpace > (26/350)*win.w) {
                    t = t.slice(0, i) + " " + t.slice(i);
                    i++
                    charsSinceSpace = 0;
                }
                
                i++
            }
            
            textSize(20)

            textWrap(WORD);
            textFont('SUPERO')
            noStroke()
            fill(white)
            textLeading(19)
            text(t,win.x+10,win.y+37+offset,win.w-20,win.h-48)
        }
    });

    freelineTextBox = createElement('textarea');
    freelineTextBox.elt.value = "FREELINE!\n\nFreeline is a frenetic, kinetic, y2k parkour platformer.\n\nSet in a vibrant, stylised world, you'll fight for your right to traverse the rooftops freely.\n\n--- more to come ---"
    freelineTextBox.style('font-family:SUPERO')
    freelineTextBox.style('background:none')
    freelineTextBox.style('border:none')
    freelineTextBox.style('font-size:20px')
    freelineTextBox.style('vertical-align:top')
    freelineTextBox.style('resize:none')
    freelineTextBox.style('line-height:19px')
    freelineTextBox.style('overflow:auto')


    freelineTextBox.style('word-wrap:none')

    freeline = new windowdata(200,500,350,300,notebook,"notepad",(win)=> {
        freelineTextBox.style(`color:${white}`);

        let offset = (1-win.opacity)*15;
        freelineTextBox.position(win.x+8,win.y+35+offset);
        freelineTextBox.size(win.w-20,win.h-48)
        freelineTextBox.style('visibility',(win.visible && win.open && win.order == 0) ? 'visible' : 'hidden')
        
        if (win.visible && win.open && win.order != 0) {
            let t = freelineTextBox.elt.value;

            let i = 0;
            let charsSinceSpace = 0;
            while(i < t.length) {
                
                if (t.charAt(i) == " ") charsSinceSpace = 0;
                else charsSinceSpace++;

                if (charsSinceSpace > (26/350)*win.w) {
                    t = t.slice(0, i) + " " + t.slice(i);
                    i++
                    charsSinceSpace = 0;
                }
                
                i++
            }
            
            textSize(20)

            textWrap(WORD);
            textFont('SUPERO')
            noStroke()
            fill(white)
            textLeading(19)
            text(t,win.x+10,win.y+37+offset,win.w-20,win.h-48)
        }
    });
    freeline.open = false;


    twitter = new windowdata(100,80,250,100,twitterlogo,"Twitter",(win)=> {
        if (!win.open || !win.visible) return;
        let offset = (1-win.opacity)*15;

        if (drawButton(win,win.x+win.w-(win.h-50)-10,win.y+40+offset,win.h-50,win.h-50,0.2,0.4,0,3,externallink)) {
            open("https://x.com/piers_dev",'_blank')
        }

        noStroke()
        fill(white)
        textAlign(RIGHT,CENTER)
        text('Open In Twitter',win.x+win.w-(win.h-50)-20,win.y+40+0.5*(win.h-50)+offset)
    });

    twitter.open = false;



    movie = new windowdata(500,50,400,400*0.75+30,movieplayer,"Movie Player",(win)=>{

        if (!win.visible || !win.open) return;
        tint(255,255)
        let offset = (1-win.opacity)*15;

        push()

        beginClip()
        rect(win.x+10,win.y+40+offset,win.w-20,win.h-50,10)
        endClip()
        image(demoVideo,win.x+10,win.y+40+offset,win.w-20,win.h-50)
        pop()

        if (hoveredWindow == win || !demoVideoPlaying) {
            if (drawButton(win,win.x+10,win.y+(win.h-45)+offset,35,35,0.2,0.4,0,3,demoVideoPlaying ? pause : play)) {
                if (demoVideoPlaying) demoVideo.pause(); else demoVideo.loop();
                demoVideoPlaying = !demoVideoPlaying
            }
        }

    },1,1.8);

    movie.open = false;
}





let time;


let hwidth,hheight,smin;



let lastMouseX;

let lastMouseY;

let mouseDeltaX

let mouseDeltaY

let lastMouseDown;

let mouseDown;

let mouseDownThisFrame;

let mouseUpThisFrame;

let mouseConsumed;

let taskBarSlots;


let hoveredWindow;


let mousePosX, mousePosY;

function draw() {

    if (touches[0]) {
        mousePosX = touches[0].x;
        mousePosY = touches[0].y;
    }
    else {
        mousePosX = mouseX;
        mousePosY = mouseY;
    }


    taskBarSlots = 0;
    mouseConsumed = false;
    mouseDown = mouseIsPressed || touches.length > 0;
    mouseDownThisFrame = mouseDown && !lastMouseDown;
    mouseUpThisFrame = !mouseDown && lastMouseDown;

    

    mouseDeltaX = mousePosX-lastMouseX;
    mouseDeltaY = mousePosY-lastMouseY;

    
    yellow = color("#FFB300");
    white = lerpColor(white,darkMode ? color (0) : color("#FFFFFF"),0.3)

    time = Date.now()/1000;
    

    if (width != getWidth() || height != getHeight) {
    resizeCanvas(getWidth(), getHeight());
    }

    background(getColor(1))
    stroke(getColor(1))
    drawGradient(2.5,2.5,width-5,height-72.5,0.2,0.3,false,5);

    
    if (!mouseDown || mouseDownThisFrame) calculateHovered();


    hwidth = width/2;
    hheight = height/2;
	smin = Math.min(width,height);



    

    if (drawButton(null,100,100,100,100,0.2,0.4,0.5,3,folder,true)) openWindow(explorer);
    noStroke();
    fill(white);
    textSize(17)
    textAlign(CENTER,TOP)
    text('Explorer',150,205);


    if (drawButton(null,100,300,100,100,0.2,0.4,0.5,3,notebook,true)) openWindow(notepad);
    noStroke();
    fill(white);
    textSize(17)
    textAlign(CENTER,TOP)
    text('Notepad',150,405);

/*
    if (drawButton(null,75,380,100,100,0.2,0.4,0.5,3,twitterlogo,true)) openWindow(twitter);
    noStroke();
    fill(white);
    textSize(17)
    textAlign(CENTER,TOP)
    text('Twitter',125,485);
*/



    drawTaskbar()
    if (drawButton(null,width-67,height-67,60,60,0.2,0.4,0,3,darkMode ? darkmode : lightmode)) {
        darkMode = !darkMode
        localStorage.setItem('darkmode',darkMode)
    }

    
    if (mouseDownThisFrame && mousePosY < height-70) calculateSelected();
    drawAllWindows();






    
    lastMouseX = mousePosX;
    lastMouseY = mousePosY;

    lastMouseDown = mouseDown;
}


function getColor(value) {
    return lerpColor(yellow, white, value)
}

function drawTaskbar() {

    stroke(getColor(0))

    strokeWeight(5)

    stroke(getColor(0.8))
    drawGradient(0, height-70, width, 70,0.9,0,false,5)
    
}

let windows = []



class windowdata {
    
    constructor (x,y,w,h,icon,title,contents = (win)=>{},ratio=1.4,expand = 1.2){
        this.x = x;
        this.y = y;
        this.w = w;
        this.baseW = w;
        this.idealW = w;
        this.h = h;
        this.baseH = h;
        this.idealH = h;

        this.maximised = false;

        this.dragging = false;

        this.order = windowCount;

        windowCount ++;

        this.visible = true;
        this.open = true;

        windows.push(this)

        this.index = windowCount;

        this.opacity = 0;

        this.icon = icon;

        this.title = title;
        this.contents = contents;

        this.ratio = ratio;
        this.expand = expand;
    }
}

function mouseRectCheck(x,y,w,h) {
    return mousePosX > x && mousePosX < x+w && mousePosY > y && mousePosY < y+h;
}




function drawWindow(win) {

    let ratio = win.baseH / win.baseW;

    win.baseW = Math.min(0.9*width,win.idealW);

    win.baseH = win.baseW*ratio;


    

    win.opacity = lerp(win.opacity,win.visible && win.open ? 1 : 0,0.5)

    let targetWidth = win.maximised ? win.baseW*win.expand : win.baseW;

    let targetRatio = ratio * (win.maximised ? win.ratio : 1);

    targetWidth = Math.min(targetWidth,width);

    targetHeight = targetWidth*targetRatio;
    win.w = lerp(win.w,targetWidth,0.3);
    win.h = lerp(win.h,targetHeight,0.3);

    if (!mouseDown && win.dragging) {
        mouseUpThisFrame = false;
        win.dragging = false;
    }

    //dragging

    if (win.dragging ) {
        win.x += mouseDeltaX;
        win.y += mouseDeltaY;
    }

    let topBarHovered = mouseRectCheck(win.x,win.y,win.w-90,30) && win.visible && win.open && hoveredWindow == win;

    let windowHovered = mouseRectCheck(win.x,win.y,win.w,win.h) && win.visible && win.open && hoveredWindow == win;

    if (mouseDownThisFrame && topBarHovered) {
        win.dragging = true;
        mouseDownThisFrame = false;
    }

    win.x = Math.max(Math.min(win.x,width-win.w),0);
    win.y = Math.max(Math.min(win.y,height-70-win.h),0);

    
    let offset = (1-win.opacity)*15;

    //body

    noStroke()
    fill(getColor(0))
    if (win.order == 0 && win.visible && win.open) rect(win.x-5,win.y-5+offset,win.w+10,win.h+13,10)

    stroke(getColor(1));


    drawGradient(win.x,win.y+offset,win.w,win.h,0.2,0,false,win.order == 0 ? 4 : 3,win.opacity,win.opacity);

    //top bar

    drawGradient(win.x,win.y+offset,win.w,30,win.order== 0 ? 1 : 0,topBarHovered ? (win.dragging ? 0.5 : 0.65) : 0.8,false,win.order == 0 ? 4 : 3,win.opacity,win.opacity);

    //buttons

    //close
    if (win.visible && win.open) {

        textFont('SUPERO')

        textSize(20);
        stroke(white);
        fill(yellow);
        strokeWeight(5);
        textAlign(LEFT,BASELINE)
        text(win.title,win.x+5,win.y+22+offset)

        if (drawButton(win,win.x+(win.w-28.5),win.y+1.5+offset,28,28,0.2,0.4,0,3,closeicon)) {
            win.open = false;
        }

        //maximise
        if (drawButton(win,win.x+(win.w-28.5*2.05),win.y+1.5+offset,28,28,0.2,0.4,0,3,win.maximised ? demaxicon : maxicon)) {
            win.maximised = !win.maximised;
        }

        //minimise
        if(drawButton(win,win.x+(win.w-28.5*3.1),win.y+1.5+offset,28,28,0.2,0.4,0,3,minicon)) {
            win.visible = false;
        }

    }
    win.contents(win);

}

function drawAllWindows () {

    windows.sort((a,b)=>b.order-a.order)

    windows.forEach((win)=> {
        drawWindow(win);

    })

    windows.sort((a,b)=>a.index-b.index)

    windows.forEach((win)=> {
        drawTaskBarIcon(win);

    })

}

function openWindow(win) {
    if (!win.open) win.opacity = 0;
    win.open = true;
    
    win.visible = true;
    windows.forEach(w => {
        w.order++
    });
    win.order = 0;
}

function calculateSelected() {

    windows.forEach((win)=> {
        win.order ++;
        
    });
    if (hoveredWindow != null) hoveredWindow.order = 0;
    
}


function calculateHovered() {
    hoveredWindow = null;
    windows.sort((a,b)=>b.order-a.order)
    windows.forEach((win)=> { 
        if (mouseRectCheck(win.x,win.y,win.w,win.h) && win.visible && win.open) {
            hoveredWindow = win;
            return;
        }
    });
}

function drawTaskBarIcon(win) {

    if (!win.open) return;
    let shrinkFac = 1-win.opacity;

    let x = taskBarSlots*64+7+3.5*shrinkFac;
    let y = height-62+shrinkFac*3.5;
    let w = 54-7.5*shrinkFac;

    if (drawButton(null,x,y,w,w,win.order == 0 && win.visible ? 0.4 : 0,0.2,0,4,win.icon)) {
        if (win.order == 0 && win.visible) win.visible = false;
        else {
            windows.forEach(w => {
                w.order++
            });
            win.order = 0;
            win.visible = true;
        }
    }

    tint(255,255);

    taskBarSlots ++;
}

function drawButton(win,x,y,w,h,base = 0,hover = 0.3, press = 0.5, radius = 3, icon = null,hideBase = false) {
    let hovered = mouseRectCheck(x,y,w,h) && hoveredWindow == win;
    let pressed = hovered && mouseDown && hoveredWindow == win;

    if (!(hideBase && !hovered && !pressed))
        drawGradient(x,y,w,h,pressed ? press : (hovered ? hover : base),0,false,radius);

    tint(darkMode ? 0 : 255,255)
    if (icon != null) image(icon,x,y,w,h);

    return (hovered && mouseUpThisFrame);
}


function drawGradient(x,y,w,h,base = 0, blend = 1,reverse = false,strokeW = 3,opacity = 1,strokeOpacity = 1) {
    
    strokeWeight(strokeW)


    let col = getColor(base);
    col.setAlpha( opacity*255);

    let st = white;

    st.setAlpha(strokeOpacity*255)

    stroke(st)


    fill(col)
    rect(x,y,w,h,strokeW*2)

    if (blend == 0) return; 
    tint(255 ,(blend*255)*opacity);


    if (reverse) {
        push()

        scale(1,-1)
        image(darkMode ? gd : gl,x+0.5*strokeW,-(y+0.5*strokeW)-h,w-strokeW,h-strokeW);
        pop();
    }
    else image(darkMode ? gd : gl, x+0.5*strokeW,y+0.5*strokeW,w-strokeW,h-strokeW)
    noFill()




    rect(x,y,w,h,strokeW);
}