# Ros-Robot-Visualizer
Visualize your robot from a birdseye view on the snowplow course

The webpage is served using a server made with node.js.
You must have node and rosbridge installed.

To Run:

First load rosbridge:

'roslaunch rosbridge_server rosbridge_websocket.launch'

Then, in the root directory of this repo:

'node index.js'

to start up the server. Then, navigate to the servers IP address on port 5000 to view the visualizer.

By default the visualizer is listening to the /poses topic. To change this open the main.js file and change the variable at the top.

Note: If the visualizer isn't recieving Pose2D messages over the rosbridge service, then the simulated robot will not move
