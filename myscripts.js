//          SETTING dog1's destination...          
let dog1 = new Image();
dog1.src = "./ddoggo.png"
            
let fence1 = new Image();
fence1.src = "fence.png"
            
let biscuit1 = new Image();
biscuit1.src = "Dog_biscuit.png"
            
//          <canvas...            
let c = document.querySelector("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
let ctx = c.getContext("2d");

/////////////////////////////////////////////////////////////////////////////////////////
//             When page loads, dog1's loads...                 
            dog1.addEventListener("load", (event) => {
                spriteH = dog1.height;
                spriteW = spriteH + 4;
                draw();
                
            });
            
            fence1.addEventListener("load", (event) => {
                spriteH1 = fence1.height;
                spriteW1 = fence1.width;
                draw();
                
            });
            
            biscuit1.addEventListener("load", (event) => {
                spriteH2 = biscuit1.height;
                spriteW2 = biscuit1.width;
                draw();
                
            });
            
            ctx.font = "30px Arial";
            ctx.fillText("Game loading...", 10, 50);
            
//            Image Variables
//////////////////////////////////////////////////////////////////////
            //Main drawing (dog)
            let y1 = 100
            let x1 = 200
            
            //Side spanner
            // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            let itemSide = [-10, 100, 210, 320, 430];
            let xval = [80, 120, 190, 200, 240]
            
            function random_item(items){
                return items[Math.floor(Math.random()*items.length)];
            };
            
            // Variables for (harm/benefit) Objects 
            
            //position where object apears.
            let x2 = 480; // right side of canvas
            let y2 = random_item(itemSide);
            
            let x3 = 480; // right side of canvas
            let y3 = random_item(itemSide);
             
            // let Score = 0;
            // let Lives = 0;
            // let Level = 1;
            
            
//             DRAWING
                 
            
            // let numImages = 3;
            let currentImageIndex = 0;
            let frames = 0;
            let loop = 0;
            // let fences = [];
            
            
           
            
            // let collides = (a, b) => {
            //     if (a.x < b.x + b.width &&
            //      a.x + a.width > b.x &&
            //      a.y < b.y + b.height &&
            //      a.y + a.height > b.y) return true;
            // };

                
                
            
            
            let draw = () => {
                
                frames += 1;
                x2 -= 1;
                x3 -= 1;
                
                if(frames % 17 == 0){
                    
                    ctx.clearRect(x1-200,y1-200,dog1.width*6,dog1.height*6);
                    
                    ctx.clearRect(x2,y2,fence1.width,fence1.height);
                    
                    ctx.clearRect(x3,y3,biscuit1.width,biscuit1.height);
                    
                    currentImageIndex = (currentImageIndex == 2)  ? 0 : currentImageIndex += 1;

                    //Dog object
                    
                    ctx.drawImage(dog1, spriteW * currentImageIndex, 0, spriteW, spriteH, x1, y1, spriteW, spriteH);
                    
                    if(x1 < 0){    
                        x1 = 20;
                    };
                    if(x1 > 400){
                        x1 = 400;
                    };
                    if(y1 < -20){
                        y1 = -20;
                    };
                    if(y1 > 420){
                        y1 = 420;
                    };
                    
                   //Harm object (Fence)  
            
                    if (x2 < -45){
                        loop += 1; 
                        x2 = 480;
                        y2 = random_item(itemSide);    
                        
                    }; 
                    
                    ctx.drawImage(fence1, 0, 0, spriteW1, spriteH1, x2, y2, spriteW1+30, spriteH1+30);
  
                    
                    if (x3 < -45){
                        x3 = 480;
                        y3 = random_item(itemSide);
                    };
                    
                   ctx.drawImage(biscuit1, 0, 0, spriteW2, spriteH2, x3, (y3) + 30, 50, 50);
                    
                    
                };

                window.requestAnimationFrame(draw); 
                };
            
//////////////////////////////////////////////////////////////////////////////////////////
//                          BUTTONS!
            
            window.addEventListener("keydown", function (event) {
                if (event.defaultPrevented) {
                    return; // Do nothing if the event was already processed
                }

                switch (event.key) {
                    case "Down": // IE/Edge specific value
                    case "ArrowDown": y1 += 110
                        
                        break;
                    case "Up": // IE/Edge specific value
                    case "ArrowUp": y1 -= 110
                        
                        break;
                    case "Left": // IE/Edge specific value
                    case "ArrowLeft": x1 -= 70
                        
                        // Do something for "left arrow" key press.
                        break;
                    case "Right": // IE/Edge specific value
                    case "ArrowRight": x1 += 70
                       
      // Do something for "right arrow" key press.
                        break;
                    case "Enter":
      // Do something for "enter" or "return" key press.
                        break;
                    case "Esc": // IE/Edge specific value
                    case "Escape":
      // Do something for "esc" key press.
                        break;
                    default:
                        return; // Quit when this doesn't handle the key event.
  }
//////////////////////////////////////////////////////////////////////////////////////////
  // Cancel the default action to avoid it being handled twice
     event.preventDefault();
     }, true);
            