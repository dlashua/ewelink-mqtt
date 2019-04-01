var eWeLink = require('node-ewelink-cloud');
var mqtt = require('mqtt')
var config = require('./config.js')

var topic = config.topic;

var connection = new eWeLink({
    "platform" : config.platform,
    "name" : config.name,
    "email" : config.email,
    "password" : config.password,
    "imei" : config.imei
})

var client  = mqtt.connect(config.mqtt)

client.on('close', () => {
    console.log('MQTT DEAD');
    process.exit();
})

client.on('error', (error) => {
    console.log(error);
})

client.on('connect', () => {
  client.subscribe(topic + '/set/+');
})

client.on('message', (topic, message) => {
  // console.log("MQTT MESSAGE:", topic, message.toString())

  let pieces = topic.split('/');
  a.setData(pieces[2],JSON.parse(message.toString()));
})

// connection.on(/.*/,(event) => console.log("EMITTED EVENT:", event.type,event.data));

connection.on(/state:.*/, (event) => {
    if(event.data != 0) {
        let pieces = event.type.split(':');
        let deviceId = pieces[1];
        client.publish(topic + '/' + deviceId, JSON.stringify(event.data), {retain: true});        
    }
});