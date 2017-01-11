var canvas = document.getElementById('canvas');
var context;
var translate = { //this objects offsets the bot position to where we consider the point (0,0) in the world coordinate frame
    'x': 140,
    'y': 195
}
var bot = { //robot object, contains position (in pixels) and angle
    'x': 0,
    'y': 0,
    'ang': 0,
    'img': {
        'src': '../img/bots/4wheel.png',
        'width': 80,
        'height': 105
    }
}

function initBot() { //initializes the bot, loading and drawing it to the screen. Also starting the animation loop

    if (canvas.getContext) {
        context = canvas.getContext('2d');
    }

    bot.img.obj = new Image();

    bot.img.obj.onload = function () {
        context.drawImage(bot.img.obj, bot.x + translate.x, bot.y + translate.y, bot.img.width, bot.img.height);
        animate();
    };
    bot.img.obj.src = bot.img.src;

}


function map(x, in_min, in_max, out_min, out_max) { //function used from arduino. Maps two ranges of values together
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function movebot(x, y, ang) { //meters,meters,degrees
    bot.x = map(x, -3, 15, -125, 620); //maps meters to pixels
    bot.y = map(y, -1.5, 1.5, 125, -125); //+x is right +y is down
    bot.ang = ang;
}

function drawRotated(robot) { //rotates and translates the robot image according to its updated position
    image = robot.img.obj;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(bot.x + translate.x, bot.y + translate.y);
    context.rotate(robot.ang )// * Math.PI / 180);
    context.drawImage(image, -robot.img.width / 2, -robot.img.height / 2, robot.img.width, robot.img.height);
    //context.drawImage(robot.img.obj, robot.x, robot.y, robot.img.width, robot.img.height);
    context.restore();
}

var animate = function () { //function that loops itself every milisecond. It erases the area around the bot and redraws an updated position
    context.clearRect((bot.x + translate.x) - bot.img.width / 2, (bot.y + translate.y) - bot.img.height / 2, bot.img.width, bot.img.height);
    drawRotated(bot);
    setTimeout(animate, 1);
}
