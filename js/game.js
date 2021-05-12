class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      cyclist1 = createSprite(500,300);
      cyclist1.addImage("cyclist1", cyclist1_Img);
      cyclist1.scale = 0.11;
      cyclist2 = createSprite(700,300);
      cyclist2.addImage("cyclist2", cyclist2_Img);
      cyclist2.scale = 0.11;
      cyclist3 = createSprite(1000,300);
      cyclist3.addImage("cyclist3", cyclist3_Img);
      cyclist3.scale = 0.11;
      cyclists = [cyclist1, cyclist2, cyclist3];
    }
  
    play(){
        form.hide();
    
        Player.getPlayerInfo();
        
        if(allPlayers !== undefined){
          background(groundImg);
          image(track_Img, 0, -displayHeight*4, displayWidth, displayHeight*5);
          //var display_position = 100;
          
          //index of the array
          var index = 0;
    
          //x and y position of the cars
          var x = 100;
          var y;
    
          for(var plr in allPlayers){
            //add 1 to the index for every loop
            index = index + 1 ;
    
            //position the cars a little away from each other in x direction
            x = x + 200;
            //use data form the database to display the cars in y direction
            y = displayHeight - allPlayers[plr].distance;
            cyclists[index-1].x = x;
            cyclists[index-1].y = y;
    
            if (index === player.index){
              stroke(10);
              fill("red");
              ellipse(x, y, 60, 60);
              cyclists[index - 1].shapeColor = "red";
              camera.position.x = displayWidth/2;
              camera.position.y = cyclists[index-1].y
            }
           
            //textSize(15);
            //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
          }
    
        }
    
        if(keyIsDown(UP_ARROW) && player.index !== null){
          player.distance +=10
          player.update();
        }
        if(player.distance>3500) {
          gameState = 2;
        }
    
        drawSprites();
      }
      end() {
        console.log("gameended");
      }
    }
    