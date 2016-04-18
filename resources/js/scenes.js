// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function() {


// Player character, placed at 5, 5 on our grid
//this.level = Crafty.e("TiledLevel").tiledLevel("maps/room1.json", "Canvas");
map = Crafty.e("TiledLevel").tiledLevel("maps/room1.json");
map.bind("EnterFrame",function(){ 
	if(this.loaded == true){ 
		console.log("adding player");
		this.player = Crafty.e('PlayerCharacter').at(4, 3);
		this.occupied[this.player.at().x][this.player.at().y] = true; 
	}
});

});


// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene('Victory', function() {
  // Display some text in celebration of the victory
  Crafty.e('2D, DOM, Text')
    .attr({ x: 0, y: 0 })
    .text('Victory!');

  // Watch for the player to press a key, then restart the game
  //  when a key is pressed
  this.restart_game = this.bind('KeyDown', function() {
    Crafty.scene('Game');
  });
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('KeyDown', this.restart_game);
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css($text_css);

  // Load our sprite map image
  Crafty.load(['assets/16x16_forest_1.gif'], function(){
    // Once the image is loaded...

    // Define the individual sprites in the image
    // Each one (spr_tree, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
 Crafty.sprite(16, 'assets/u5_tileset_64.png', {
      spr_tree:    [0, 0],
      spr_bush:    [1, 0],
      spr_village: [0, 1],
      spr_player:  [1, 1]
    });

    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  })
});