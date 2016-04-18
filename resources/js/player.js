Crafty.c("player",{ 

	moving:false,
	facing:"down",
	walkframes:9,
	speed:2,
	menuopen: false,
	gold:0,
	name:'NATE',
	level:1,
	

	init:function(){ 
	
		this.requires("2D, Canvas, spr_player, Collision, SpriteAnimation, Keyboard");
		this.animate("walk_left", 0, 5, 2)
  		.animate("walk_right", 0, 6, 2)
 		.animate("walk_up", 0, 7, 2)
  		.animate("walk_down", 0, 4, 2)

		this.addef();
	
	},
	
	addef:function(){ 	
		this.bind("EnterFrame",function(){ 
		
			if(this.facing=="up")    this.animate("walk_up",this.walkframes,1);
			if(this.facing=="down")  this.animate("walk_down",this.walkframes,1);
			if(this.facing=="left")  this.animate("walk_left",this.walkframes,1);
			if(this.facing=="right") this.animate("walk_right",this.walkframes,1);	

			if(this.isDown(Crafty.keys.SPACE) && this.moving == false && this.menuopen == false){
				this.moving = true; // prevent us from moving with open menu
				this.addComponent("interface");
			}
		
			if(this.isDown(Crafty.keys.UP_ARROW) && this.moving == false){ 				
					var tcheck = checktile(this.gamelevel,this.x,this.y-32);
					this.facing = "up";
					if(tcheck==true){
						this.moving=true;
						this.movechar(this.facing);
					}else{
						console.log(tcheck);
					}
				}
				if(this.isDown(Crafty.keys.DOWN_ARROW) && this.moving == false){ 
					var tcheck = checktile(this.gamelevel,this.x,this.y+32);
						this.facing = "down";
						if(tcheck==true){
							this.moving=true;
							this.movechar(this.facing);
						}else {
							console.log(tcheck);
						}	
				}
				if(this.isDown(Crafty.keys.LEFT_ARROW) && this.moving == false){ 
					var tcheck = checktile(this.gamelevel,this.x-32,this.y);
					this.facing = "left";
					if(tcheck==true){
						this.moving=true;
						this.movechar(this.facing);
					}else {
						console.log(tcheck);
					}	
				}
				if(this.isDown(Crafty.keys.RIGHT_ARROW) && this.moving == false){
					var tcheck = checktile(this.gamelevel,this.x+32,this.y);
					this.facing = "right";
					if(tcheck==true){
						this.moving=true;
						this.movechar(this.facing);
					}else{
						console.log(tcheck);
					}		
				}
		});
	},
	tilesearch:function(x,y){
		
		console.log("Search Called for tiles: "+x+" "+y);
		var t = jQuery.inArray(x+","+y,this.gamelevel.alltiles);
	//	console.log(this.gamelevel.tiledesc);
	},
	movechar:function(dir,x,y){
		var counter = 0;
		var mapwidth = 1632;
		var mapheight = 672;
		this.bind("EnterFrame",function(){
			this.moving = true;
			if(dir=="down" && this.y<mapheight-64) { this.y+=this.speed; Crafty.viewport.y-=this.speed; }
			if(dir=="up" && this.y>0)   { this.y-=this.speed; Crafty.viewport.y+=this.speed; }
			if(dir=="left" && this.x>0) { this.x-=this.speed; Crafty.viewport.x+=this.speed; }
			if(dir=="right" && this.x<mapwidth-64){ this.x+=this.speed;  Crafty.viewport.x-=this.speed; }
			counter++;
			if(counter==32/this.speed){ //moved 32 pixels - one tile 
				this.unbind("EnterFrame"); 
				this.moving = false; 
				this.addef();
			}		
		})
	},

})
