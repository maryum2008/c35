var ball;
 var ball1,database,position
function setup(){
    database=firebase.database()
    console.log(database)
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //refering to the location of the database
    ball1=database.ref('ball/position')
    //.on function is used to set up a listerner to read the changes 
    ball1.on("value",readPosition,showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    //.set function is used to update the values in the database 
    database.ref("ball/position").set({
      "x":position.x+x,
      "y":position.y+y
    })
}
function readPosition(data){
    //data.val function is used to read the data from the data base 
    position=data.val()
    ball.x=position.x
    ball.y=position.y
}
function showError(){
    console.log("error in writing the values")
}
