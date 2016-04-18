function checktile(level,x,y){

	/* temporary object imaginary positions */
	var blocked = level.blockedtiles; //this is derived from any layer in tiled named "objects"
	var desc = level.tiledesc;

	var t = jQuery.inArray(x+","+y,blocked);
	if(t == -1) return true 
	else return desc[t];	
}

function logtext(t){

	$("#gameinterface").html(t);

}

Crafty.c("Flicker",{
    flicker:true,
   init:function(){
       this.flicker = true;
      
       this.bind("EnterFrame",function(frame){
           if(frame.frame % 15 == 0 && this.flicker){
               if(this.alpha == 0.0){
                   this.alpha = 1.0;
               }else{
                   this.alpha = 0.0;
               }
           }
           if(!this.flicker){
                this.alpha = 1.0;
           }
       });
   }
   
});