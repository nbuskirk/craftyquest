Crafty.c("interface",{ 
	
	playeraction:"search",
	
	init:function(){
		
		this.menuopen = true;
		Crafty.audio.play("accept");
		
		this.search = Crafty.e("2D, DOM, icon_search, SpriteAnimation, interfaceobj").attr({x:this.x+5,y:this.y+110,z:10});
		this.items = Crafty.e("2D, DOM, icon_items, SpriteAnimation, interfaceobj").attr({x:this.x+65,y:this.y+110,z:10});
		this.talk = Crafty.e("2D, DOM, icon_talk, SpriteAnimation, interfaceobj").attr({x:this.x-55,y:this.y+110,z:10});
		this.equip = Crafty.e("2D, DOM, icon_equip, SpriteAnimation, interfaceobj").attr({x:this.x+5,y:this.y+55,z:10});
	
		this.search.select();
		
		$("#gameinterface p.gold").html(this.gold);
		$("#gameinterface p.name").html(this.name.toUpperCase()+"  "+"L"+this.level);
		$("#gameinterface").css("display","block");
		
		this.bind("KeyDown",function(e){ 
			if(this.menuopen==true){
				if(e.keyCode==Crafty.keys.UP_ARROW) { 
					if(this.playeraction!="equip"){
						this.playeraction = "equip"; 
						this.deselectall();
						this.equip.select(); 
					}
				}
			if(e.keyCode==Crafty.keys.DOWN_ARROW) { 
				if(this.playeraction!="search"){
					this.playeraction = "search"; 
					this.deselectall();
					this.search.select(); 
				}
			}
			if(e.keyCode==Crafty.keys.LEFT_ARROW) { 
				if(this.playeraction!="talk"){
					this.playeraction = "talk";
					this.deselectall(); 
					this.talk.select();
				}
			}
			if(e.keyCode==Crafty.keys.RIGHT_ARROW) { 
				if(this.playeraction!="items"){
					this.playeraction = "items"; 
					this.deselectall();
					this.items.select();
				}
			}
			if(this.isDown(Crafty.keys.Z) && this.menuopen == true){
				this.closemenu();
				this.menuopen = false;
				this.moving = false;
			}
			if(this.isDown(Crafty.keys.X) && this.menuopen == true){
				this.closemenu();
				this.menuopen = false;
				this.moving = false;
				if(this.playeraction=="search") this.tilesearch(this.x,this.y);
				if(this.playeraction=="items")  this.itemsmenu();
				if(this.playeraction=="equip")  this.equipmenu();
				if(this.playeraction=="talk")   this.tiletalk();
			}
			}
		})
	},
	itemsmenu:function(){},
	tiletalk:function(){},
	
	equipmenu:function(){},

	closemenu:function(){
		this.menuopen = false;
		Crafty.audio.play("close");
		this.removeComponent("interface");
		Crafty("interfaceobj").destroy();
		$("#gameinterface").css("display","none");
	},
	deselectall:function(){ 
		this.items.deselect();
		this.talk.deselect();
		this.search.deselect();
		this.equip.deselect();
	}

})

Crafty.c("interfaceobj",{
	
	init:function(){
		this.alpha = .5;
	},
	select:function(){
		Crafty.audio.play("accept");
		this.alpha = 1;
	},
	deselect:function(){
		this.alpha=.5;
	}

})