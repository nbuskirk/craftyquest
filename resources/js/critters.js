Crafty.c("cat",{ 

	speed:1,
	walkframes:9,
	facing:"down",
	
	init:function(){

		this.requires("2D, Canvas, spr_cat, SpriteAnimation");
		this.animate("walk_left", 3, 1, 5)
  		.animate("walk_right", 3, 2, 5)
 		.animate("walk_up", 3, 3, 5)
  		.animate("walk_down", 3, 0, 5)
		
		.animate("walk_down",15,-1);
		
	}

})