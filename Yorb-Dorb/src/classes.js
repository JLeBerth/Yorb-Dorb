// #1 CLASS CODE
	//Sprite and ImageSprite class taken from previous assignment
	class Sprite{
		constructor(x=0,y=0,span=10,fwd={x:1,y:0},speed=0,color="black"){
			this.x = x;
			this.y = y;
			this.span = span;
			this.fwd = fwd;
			this.speed = speed;
			this.color = color;
		}

		draw(ctx){
			ctx.save();
			ctx.translate(this.x,this.y);
			ctx.beginPath();
			ctx.rect(-this.span/2,-this.span/2,this.span, this.span);
			ctx.closePath();
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.restore();
		}

		move(){
			this.x += this.fwd.x * this.speed;
			this.y += this.fwd.y * this.speed;
		}

		reflectX(){
			this.fwd.x *= -1;
		}

		reflectY(){
			this.fwd.y *= -1;
		}
        
	}
	
        class ImageSprite extends Sprite
        {
            constructor(x=0,y=0,span=10,fwd={x:1,y:0},speed=0,image)
            {
                super(x,y,span,fwd,speed);
                this.image = image;
            }
            
            draw(ctx)
            {
                ctx.save();
                ctx.translate(this.x,this.y);
                ctx.drawImage(this.image, -this.span/2,-this.span/2, this.span, this.span);
			    ctx.restore();
            }
            setposition(x,y)
            {
                this.x = x;
                this.y = y;
            }
        }

        class TrainingGraphic extends ImageSprite
        {
            constructor(x=0,y=0,span=10,fwd={x:1,y:0},speed=0,image)
            {
                super(x,y,span,fwd,speed);
                this.image = image;
                this.timer = span/20;
            }
            draw(ctx)
            {
                ctx.save();
                ctx.translate(this.x,this.y);
                ctx.drawImage(this.image, -this.span/2,-this.span/2, this.span, this.span);
			    ctx.restore();
                this.update();
            }
            update()
            {
                if(this.timer == 0.0) { /* delete itself */ }
                else { this.timer -= 0.1; this.span -= (span/20); }
            }
            
        }
        
export {TrainingGraphic, ImageSprite, Sprite};