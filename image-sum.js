const Mustache = require('mustache');
const Jimp = require('jimp');

const input = (node, msg, config) => {
  const source = config.source ? Mustache.render(config.source, msg) : msg.payload;

  let t = process.hrtime();

  Jimp.read(source)
  .then(function (img) {
    let values = [0, 0, 0];
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
      values = [
        values[0] + this.bitmap.data[ idx + 0 ],
        values[1] + this.bitmap.data[ idx + 1 ],
        values[2] + this.bitmap.data[ idx + 2 ]
      ];
    });

    const pixels = img.bitmap.width * img.bitmap.height;

    msg.payload =  values.map(v => v / 255);
    msg.average = values.map(v => v / pixels);

    t = process.hrtime(t);
    msg.stats = { pixels, secs: t[0] + t[1] / 1000000000 }

    node.send(msg);
  }).catch(function (err) {
    node.warn(err);
  });
}

module.exports = function(RED) {
  function ImageSumNode(config) {
    RED.nodes.createNode(this, config);
    let node = this;
    node.on('input', (msg) => { input(node, msg, config); });
  }

  RED.nodes.registerType('image-sum', ImageSumNode);
}