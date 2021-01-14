# node-red-contrib-image-sum

Implements a Node-RED function node that receives a valid [JIMP](https://github.com/oliver-moran/jimp) input and outputs an array with [R, G, B] sum values for the image.

### Inputs

- **source** _(string | buffer)_ : String to local file (not recommended), remote image URL or image buffer.

### Outputs

- **payload** _(array)_ : RGB values of the image sum.

- **stats** _(object)_ : Basic stats with pixels used and time (in secs) employed from fetch to result.


### Details

The node uses, by default, the msg.payload as the source for the image sum, or the source field.

The input can be a string with a path to a local file (not recommended), a remote URL address, or be an image buffer (for example fetched by the http request node).

The source field allows [mustache-style](http://mustache.github.io/mustache.5.html) tags to be constructed using values of the incoming message. For example, if the source is set to example.com/{{{topic}}}, it will have the value of msg.topic automatically inserted. Using {{{...}}} prevents mustache from escaping characters like / & etc.

**Note:** The node outputs the RGB values as a 3 item array in msg.payload. It also outputs a convenient msg.stats object so you evaluate the performance impact. The time (in secs) reported, consists of the combined time to fetch the image till the output is processed. Use as small an image as possible, as even small 64 x 64 pixel image can take up to a second to compute, depending on your hardware.
