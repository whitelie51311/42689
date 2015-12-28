var assets = {
    "audio": {
        "die": "die.mp3",
        "boom": "boom.mp3"
    }
};
Crafty.load(assets, function(){});

//**********其曄*****************
Crafty.init(600, 300);
Crafty.background('rgb(184,184,255)');

bomb_free = true;

var speed = 7;
var bombn =10;
var difficult = Crafty.e("2D, DOM, Color, Mouse,Text")
		.text("difficult")
		.textColor("green")
		.textFont({size: '25px', weight: 'bold'})
        .attr({w:100, h:30, x:300-100/2,y:20-15/2})
        .color("pink")
		.bind("MouseDown", function (){bombn=15;speed = 11; this.color("white");normal.color("pink");easy.color("pink");})
var normal = Crafty.e("2D, DOM, Color, Mouse,Text")
		.text("normal")
		.textColor("green")
		.textFont({size: '25px', weight: 'bold'})
        .attr({w:100, h:30, x:300-100/2,y:80-15/2})
        .color("pink")
		.bind("MouseDown", function (){bombn=10;speed = 7; this.color("white");difficult.color("pink");easy.color("pink");})
var easy = Crafty.e("2D, DOM, Color, Mouse,Text")
		.text("easy")
		.textColor("green")
		.textFont({size: '25px', weight: 'bold'})
        .attr({w:60, h:30, x:300-60/2,y:140-15/2})
        .color("pink")
		.bind("MouseDown", function (){bombn=5;speed = 3; this.color("white");normal.color("pink");difficult.color("pink");})
		
		
//////// start /////////

var start = Crafty.e("2D, DOM, Color, Mouse,Text")
		.text("start")
		.textColor("green")
		.textFont({size: '25px', weight: 'bold'})
        .attr({w:60, h:30, x:300-60/2,y:220-30/2})
        .color("red")
			
.bind("MouseDown", function () {
var d = new Date();
start_time = d.getTime(); 
Crafty.enterScene("game");
	});

/////Scene sitting//////
/////loding Scene//////

Crafty.defineScene("loading", function() {
var difficult = Crafty.e("2D, DOM, Color, Mouse,Text")
		.text("difficult")
		.textColor("green")
		.textFont({size: '25px', weight: 'bold'})
        .attr({w:100, h:30, x:300-100/2,y:20-15/2})
        .color("pink")
		.bind("MouseDown", function (){bombn=15;speed = 11; this.color("white");normal.color("pink");easy.color("pink");})
var normal = Crafty.e("2D, DOM, Color, Mouse,Text")
		.text("normal")
		.textColor("green")
		.textFont({size: '25px', weight: 'bold'})
        .attr({w:100, h:30, x:300-100/2,y:80-15/2})
        .color("pink")
		.bind("MouseDown", function (){bombn=10;speed = 7; this.color("white");difficult.color("pink");easy.color("pink");})
var easy = Crafty.e("2D, DOM, Color, Mouse,Text")
		.text("easy")
		.textColor("green")
		.textFont({size: '25px', weight: 'bold'})
        .attr({w:60, h:30, x:300-60/2,y:140-15/2})
        .color("pink")
		.bind("MouseDown", function (){bombn=5;speed = 3; this.color("white");normal.color("pink");difficult.color("pink");})
		
		
//////// start /////////

var start = Crafty.e("2D, DOM, Color, Mouse,Text")
		.text("start")
		.textColor("green")
		.textFont({size: '25px', weight: 'bold'})
        .attr({w:60, h:30, x:300-60/2,y:220-30/2})
        .color("red")
			
.bind("MouseDown", function () {
var d = new Date();
start_time = d.getTime(); 
Crafty.enterScene("game");
	});
		});
////////game Scene///////
Crafty.defineScene("game", function() {

//Music
//Crafty.load(assets, function(){ Crafty.audio.play("gameback", 1, 0.3) });

//Paddles
var X_initial=250;
Crafty.e("Paddle, 2D, DOM, Color, Multiway, Keyboard")
    .color("black")
    .attr({ x: X_initial, y: 250, w: 100, h: 10 })
    .multiway(8, { LEFT_ARROW: -180, RIGHT_ARROW: 0 })
    .bind('KeyDown', function(e) {
    if (e.key == Crafty.keys.SPACE || e.key == Crafty.keys.UP_ARROW) {
        var padd = Crafty("Paddle").get(0);
        
        // bullet
Crafty.e("2D, DOM, Color, Collision")
	.color('rgb(0,0,0)')			
	.attr({ x: padd.x + padd.w/2, y: padd.y, w: 5, h: 10,
            dY: 1 })
    .bind('EnterFrame', function () {
        this.y -= this.dY;
    })
    .onHit('bomb', function () {Crafty("bomb").each(function(){this.destroy();});
            Crafty.audio.play("boom");Crafty("LeftPoints").each(function () {
    this.text(++this.points + " Points")}); })
    }
  });
	if(X_initial<0)
		X_initial=0;
	else if(X_initial>600)
		X_initial=600;
	
//Ball
Crafty.e("2D, DOM, Color, Collision, ball")
	.color('rgb(0,0,255)')			
	.attr({ x: Crafty.math.randomInt(10, 590), y: 10, w: 10, h: 10,
            dX: Crafty.math.randomInt(-3, 3),
            dY: speed })
    .bind('EnterFrame', function () {
        //hit floor or roof
        if (this.x <= 0 || this.x + this.w - 1 >= 600)
            this.dX *= -1;
        if (this.y <= 0)
            this.dY *= -1;

        if (this.y > 300) {
            Crafty.audio.play("die");
        //Gameover
    Crafty("ball").each(function (){this.destroy();})
		Crafty.e("gameover, DOM, 2D, Text, Color")
		.attr({x: 150, y:100})
		.text("GAMEOVER")
		.textFont({size: '50px', weight: 'bold'})
		.textColor("red")
		.color('rgb(184,184,255)')
		var resume = Crafty.e("2D, DOM, Color, Mouse,Text")
		.text("restart")
		.textColor("white")
		.textFont({size: '25px', weight: 'bold'})
        .attr({ x:250,y:160,w:90,h:30})
        .color("black")
		.bind("MouseDown", function () {

		Crafty.enterScene("loading");
			});
		
        }

		
		if (bomb_free && bombn>0) {
            bomb_free = false;
            bombn--;
            setTimeout(bomb,5000);
		}
	Crafty("TimeBoard").each(function () {
var d = new Date();
var elapse = d.getTime() - start_time; 
    this.text(elapse + " ms")}); 
        this.x += this.dX;
        this.y += this.dY;
    })
    .onHit('Paddle', function () {
	Crafty("LeftPoints").each(function () {
    this.text(++this.points + " Points")}); 
	if(this.y<251){
    this.dY *= -1;
	}
	else{
	this.dX*=-1;
	}
	
	
	}
	  )

//Score board
Crafty.e("LeftPoints, DOM, 2D, Text, Color")
    .attr({ x: 20, y: 20, w: 100, h: 20, points: 0 })
    .text("0 Points")
	.textFont({size: '15px', weight: 'bold'})
	.textColor("#7E3D76")
	.color('rgb(184,184,255)')

//time board
Crafty.e("TimeBoard, DOM, 2D, Text, Color")
    .attr({ x: 200, y: 20, w: 100, h: 20, points: 0 })
    .text("0 ms")
	.textFont({size: '15px', weight: 'bold'})
	.textColor("#7E3D76")
	.color('rgb(184,184,255)')

 //Bomb	
Crafty.sprite("bomb100.png", {bomb: [0,0,100,100]});
function bomb()
{
    bomb_free = true;
    var b = Crafty.e("2D, DOM, Collision, bomb")
    /*.attr({ x: Crafty.math.randomInt(0, 600), y: 0, w: 10, h: 10,
			dX:0, dY: Crafty.math.randomInt(2, 3) })*/
	.attr({x: Crafty.math.randomInt(0, 600), y: 0,
	w: 20, h: 20,
	dX:0, dY: speed/3 })
			
			
	.bind('EnterFrame', function () {

        this.x += this.dX;
        this.y += this.dY;})
    .onHit('Paddle', function (){		
    Crafty("ball").each(function (){this.destroy();});
    var bomb = Crafty("bomb").get(0);
    var effect = Crafty.e("DOM, 2D, Image").image("ex.png");
    setTimeout(function(){effect.destroy();},1000);
            Crafty.audio.play("boom");
		Crafty.e("gameover, DOM, 2D, Text, Color")
		.attr({x: 150, y:100})
		.text("GAMEOVER")
		.textFont({size: '50px', weight: 'bold'})
		.textColor("red")
		.color('rgb(184,184,255)')
        })}
});