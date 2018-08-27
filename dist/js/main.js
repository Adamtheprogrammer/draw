var draw = (function(){

    var main = document.querySelector('main');
    var mWidth = document.querySelector('main').offsetWidth;
    var mHeight = document.querySelector('main').offsetHeight;
    
    var canvas = document.createElement('canvas');
  
    var ctx = canvas.getContext('2d');

    var color =  Math.floor((Math.random() * 400) + 50);

    var rect = canvas.getBoundingClientRect();

    var x = 0;
    var y = 0;

    var x1 = 0;
    var y1 = 0;
    var fill = ''
    var stroke = '';


    var x2 = 0;
    var y2 = 0;

    var lx = false;
    var ly = false;




    var shape = '';
    var isDrawing = false;

    var input = '';
    document.getElementById('input').addEventListener('click', function(){

        input = document.getElementById('input').value;
        console.log(input);
    })

   
    var stack = [];

    return{

       
       getStrokeColor: function(){

           if(stroke.length > 6){
               return stroke;
           }

           return this.randColor();
       },

       //A getter for fill
       getFillColor: function(){

           if(fill.length > 6){
               return fill;
           }

           return this.randColor();
       },
        


        setIsDrawing: function(bool){
            isDrawing=bool;
        },

        getIsDrawing: function(){
            return isDrawing;
        },

        getShape : function(){
            return shape;

        },

        setShape: function(shp){
            shape = shp;
        },

        randColor: function(){
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
        },

        setStart: function(){
            x1=x;
            y1=y;
        },

        setEnd: function(){
            x2=x;
            y2=y;
        },

        setXY: function(evt){

            lx = x; 
            ly = y;

            x = (evt.clientX - rect.left) - canvas.offsetLeft;
            y = (evt.clientY - rect.left) - canvas.offsetTop;
            
        },

        writeXY: function(){
            document.getElementById('trackX').innerHTML = 'x: ' + x;
            document.getElementById('trackY').innerHTML = 'y: ' + y;
        },

        draw: function(){
           
            ctx.restore();
            switch (shape){
                case 'rectangle':
                this.drawRect();
                break;
                case 'line':
                this.drawLine();
                break;  
                case 'circle':
                this.drawCircle();
                break;
                case 'path':
                this.drawPath();
                break;
                case 'triangle':
                this.drawTriangle();
                break;
                default:
                
               
            }
            ctx.save();

            //console.log(stack);
        },




        //Draw a triangle
//Draw a triangle
drawTriangle: function(){

    //x1,y1 to x2,y2 is the first line
    //we will use the first point +/-
    //(depending on the direction of
    //the mouse movement) the result of
    //PT to add a third point.
    var a = (x1-x2);
    var b = (y1-y2);
    var c = Math.sqrt(a*a + b*b);

    var d = x1+c;
    var e = y1+c;

    //Drag left to right
    if(x1>x2){
        d=x1-c;
    }

    //Drag up
    if(y1>y2){
        e=y1-c;
    }

    ctx.fillStyle = this.getFillColor();
    ctx.strokeStyle = this.getStrokeColor();
    ctx.beginPath();
    ctx.moveTo(x1, y1);

    ctx.lineTo(d,e);
    ctx.lineTo(x2, y2);

    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.fill();

    stack.push({
        shape: 'triangle',
        cords: {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        },
        styles: {
            stroke: ctx.strokeStyle,
            fill: ctx.fillStyle
        }
    });

},

        drawPath: function(){
           
            ctx.strokeStyle = this.randColor();
            ctx.beginPath();
            ctx.moveTo(lx,ly);
            ctx.lineTo(x,y);
            ctx.stroke();

            stack.push({
                shape: 'path',
                cords: {
                    lx: lx,
                    ly: ly,
                    x: x,
                    y: y
                },
                styles: {
                    stroke:ctx.strokeStyle
                }
            });

        },


        drawCircle: function(){
           
            ctx.strokeStyle = this.randColor();
            ctx.fillStyle = this.randColor();
            var a = (x1-x2);
            var b = (y1 - y2);
            var radius = Math.sqrt(a*a + b*b);

            ctx.beginPath();

            ctx.arc(x1, y1, radius, 0, 2*Math.PI);
            ctx.stroke();
            ctx.fill();

            stack.push({
                shape:'circle',
                cords:{
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2
                },
                styles:{
                    stroke:ctx.strokeStyle,
                    fill: ctx.fillstyle
                }
            })
        },


        drawLine: function(){
            ctx.strokeStyle = this.randColor();
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
            stack.push({
                        shape:'line',
                        cords:{
                            x1: x1,
                            y1: y1,
                            x2: x2,
                            y2: y2
                        },
                        styles:{
                            stroke:ctx.strokeStyle,
                            fill: ctx.fillstyle
                        }
                    });

        },


       

        drawRect: function(){
          ctx.fillStyle = this.randColor();
          ctx.fillRect(x1, y1, (x2 - x1), (y2-y1));
          ctx.strokeStyle = this.randColor();
          
          stack.push({
            shape:'rect',
            cords:{
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            },
            styles:{
                stroke:ctx.strokeStyle,
                fill: ctx.fillstyle
            }
        })
        },



        clear: function(){
            ctx.clearRect(0, 0, mHeight, mWidth);

        },
        reDraw: function(){
            for(item in stack){

                switch(stack[item].shape){
 
                    case 'path':
                        shape=stack[item].shape;
                        lx = stack[item].cords.lx;
                        ly = stack[item].cords.ly;
                        x = stack[item].cords.x;
                        y = stack[item].cords.y;
                        ctx.strokeStyle = stack[item].styles.stroke;
                        break;
 
                    case 'circle':
                    case 'line':
                    case 'rectangle':
                    case 'triangle':
                        shape=stack[item].shape;
                        x1 = stack[item].cords.x1;
                        y1 = stack[item].cords.y1;
                        x2 = stack[item].cords.x2;
                        y2 = stack[item].cords.y2;
                        ctx.fillStyle = stack[item].styles.fill;
                        ctx.strokeStyle = stack[item].styles.stroke;
                        break;
 
                  
                }
 
                this.draw();
 
            }
        },       




        getCanvas: function(){
            return canvas;
        },


        init: function(){
            canvas.width = mWidth;
            canvas.height = mHeight;
            main.appendChild(canvas);
          
        },
    }
})();


draw.init();

document.getElementById('btnClear').addEventListener('click', function(){

   if(confirm('Are you sure that you want to quit the canvas!')){
    draw.clear();
   }
});



document.getElementById('reDraw').addEventListener('click', function(){

   if(confirm('Are you sure you want to redraw the canvas!')){
    draw.reDraw();
   }
});





document.getElementById('btnTriangle').addEventListener('click', function(){
  
    draw.setShape('triangle');
});


document.getElementById('btnPath').addEventListener('click', function(){
  
    draw.setShape('path');
});

document.getElementById('btnCircle').addEventListener('click', function(){
  
    draw.setShape('circle');
});


document.getElementById('btnRect').addEventListener('click', function(){

    draw.setShape('rectangle');
});


document.getElementById('btnLine').addEventListener('click', function(){

    draw.setShape('line');



});


draw.getCanvas().addEventListener('mousedown', function(){
    draw.setIsDrawing(true);
    draw.setStart();
    })

draw.getCanvas().addEventListener('mouseup', function(){
    draw.setEnd();
    draw.draw();
    draw.setIsDrawing(false);
    });

draw.getCanvas().addEventListener('mousemove', function(evt){
    
    draw.setXY(evt);
    draw.writeXY();

    if(draw.getShape()=== 'path' && draw.getIsDrawing()=== true){
    draw.draw();
    }

   
});

/*This is where the strobe light is created*/



var strobeButton = document.getElementById('btnStrobe').addEventListener('click', function(){

var bodyElement = document.querySelector("body");
 
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
 
var delay = 0;



 
function changeColor() {
    delay++;
     
    if (delay > 3) {
        bodyElement.style.backgroundColor = getRandomColor();
        delay = 0;
    }
 
    requestAnimationFrame(changeColor);
}
changeColor();           
 
function getRandomColor() {
    // creating a random number between 0 and 255
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
     
    // going from decimal to hex
    var hexR = r.toString(16);
    var hexG = g.toString(16);
    var hexB = b.toString(16);
     
    // making sure single character values are prepended with a "0"
    if (hexR.length == 1) {
        hexR = "0" + hexR;
    }
     
    if (hexG.length == 1) {
        hexG = "0" + hexG;
    }
 
    if (hexB.length == 1) {
        hexB = "0" + hexB;
    }
 
    // creating the hex value by concatenatening the string values
    var hexColor = "#" + hexR + hexG + hexB;
    return hexColor.toUpperCase();
}

});


