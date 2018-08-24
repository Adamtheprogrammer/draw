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

   

    return{

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
        },




        drawTriangle: function(){
            console.log(input);
            ctx.strokeStyle = input;
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x2 + color, y2)
            ctx.fill();
            console.log(input);
        },

        drawPath: function(){
           
            ctx.strokeStyle = this.randColor();
            ctx.beginPath();
            ctx.moveTo(lx,ly);
            ctx.lineTo(x,y);
            ctx.stroke();
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
        },


        drawLine: function(){
            ctx.strokeStyle = this.randColor();
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
        },

        drawRect: function(){
          ctx.fillStyle = this.randColor();
          ctx.fillRect(x1, y1, (x2 - x1), (y2-y1));
          ctx.strokeStyle = this.randColor();

            
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




~
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

