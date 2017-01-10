var poseTopic = '/zenith/pose2D'

function main() {
    var ros = initRos();
    initBot();
    var pose = new ROSLIB.Topic({
        ros: ros,
        name: poseTopic,
        messageType: 'geometry_msgs/Pose2D'
    });

    pose.subscribe(function (message) {
        console.log('Received message on ' + pose.name + ': ' + message.data);
        showPose(message);
        movebot(message.x, message.y, message.theta);
        //pose.unsubscribe();
    });

}

function showPose(pose) {
    var str = '{<br>';
    str += 'x: ';
    str += Math.round(pose.x * 1000) / 1000;
    str += ' meters, <br>';
    str += 'y: ';
    str += Math.round(pose.y * 1000) / 1000;
    str += ' meters, <br>';
    str += 'theta: ';
    str += Math.round(pose.theta * 1000) / 1000;
    str += ' radians <br> }';
    $('#pose')[0].innerHTML = str;

}

function initRos() {
    var ros = new ROSLIB.Ros({
        url: 'ws://localhost:9090'
    });
    ros.on('connection', function () {
        console.log('Connected to websocket server.');
    });

    ros.on('error', function (error) {
        console.log('Error connecting to websocket server: ', error);
    });

    ros.on('close', function () {
        console.log('Connection to websocket server closed.');
    });

    return ros;
}

$(document).ready(main);
