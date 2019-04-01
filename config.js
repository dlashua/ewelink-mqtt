const config = require('yargs')
  .usage('Usage: $0 [options')
  .describe('m', 'mqtt broker url. See https://github.com/mqttjs/MQTT.js#connect-using-a-url')
  .describe('e', 'ewelink email')
  .describe('P', 'ewelink password')
  .describe('i', 'ewelink IMEI')
  .describe('t', 'mqtt topic')
  .describe('c', 'config file')
  .alias({
    m: 'mqtt',
    e: 'email',
    P: 'password',
    i: 'imei',
    c: 'config',
    t: 'topic',
  })
  .default({
    mqtt: 'mqtt://127.0.0.1',
    name: 'eWeLink',
    platform: 'eWeLink',
    topic: 'ewelink',
  })




  .config('config')
  .version()
  .help('help')
  .argv;

module.exports = config
