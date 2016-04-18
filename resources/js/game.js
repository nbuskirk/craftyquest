
$(function(){ 

	var gamelevel = null;

	Crafty.init(600,300);
	Crafty.canvas.init();
	
	Crafty.scene("loading", function() { 
		Crafty.load(["resources/sprites/icons.png",
					 "resources/music/beep.wav",
					 "resources/music/close.wav",
					 "resources/sprites/playersprites.png",
					 "resources/sprites/interface.png",
					 "resources/sprites/welcome.png"], function(){ 
		Crafty.scene("intro");	//assets loaded show intro
		});	
	});
	
	Crafty.sprite(64,"resources/sprites/playersprites.png",{ 
		spr_player:[1,4]
	})
	Crafty.sprite(64,"resources/sprites/animals.png",{ 
		spr_cat:[4,0]
	})
	Crafty.sprite(50,"resources/sprites/icons.png",{ 
		icon_search:[0,0],
		icon_equip:[0,0],
		icon_items:[0,0],
		icon_talk:[0,0]
	})
	
	Crafty.scene("intro",function(){ 
		Crafty.background("url(resources/sprites/welcome.png)"); 
		var start = Crafty.e("2D, DOM, Text, Flicker").text("press (z) to start").attr({x:200,y:200, w:325,h:40}).css("font-size","18px");
		start.bind("KeyDown",function(e){
			if(e.keyCode==Crafty.keys.Z){
				Crafty.scene("main");//destroys all
			}
		})
	})
	
	Crafty.scene("main",function(){ 
		Crafty.background("#000"); 
		Crafty.e("2D, DOM, Text").text("Loading..").attr({x:120,y:125, w:200,h:40}).css("font-size","40px");

		var level = Crafty.e("TiledLevel").tiledLevel("resources/levels/grassland3.json", "Canvas");
		
		level.bind("EnterFrame",function(){ 
			if(this.loaded == true){ 
				this.unbind("EnterFrame");
			//	console.log(this.alltiles);
			//	console.log(this.desc);
				Crafty("Text").destroy();
				var player = Crafty.e("player").attr({x:576, y:320, z:3});
				player.gamelevel = this;
				Crafty.viewport.scroll('_x', -(player.x + (player.w / 2) - (Crafty.viewport.width / 2) ));
				Crafty.viewport.scroll('_y', -(player.y + (player.h / 2) - (Crafty.viewport.height / 2) ));
			}
		})
	})
	
	Crafty.scene("loading");

})