# ewelink-mqtt

This project will connect to the eWeLink (iTead/Sonoff) cloud and report device state to MQTT. Additionally, it allows updates received via MQTT to be sent back to the device.


## Installation
```
git clone https://github.com/dlashua/ewelink-mqtt.git

cd ewelink-mqtt

npm install
```

## Configuration

While configuration can happen entirely on the command line, doing so via config file is likely a bit easier.

Create a config file that looks like this:

```
const config = {
    "email": "my_email_address@me.com",
    "password": "my_password",
    "imei": "some-made-ip-imei",
    "mqtt": "mqtt://username:password@host_name_of_mqtt_server", 
}

module.exports = config
```

Then run it like this:

```
node ./index.js -c ./myconfig.js
```

Or, use pm2:

```
pm2 start --name 'ewelink-mqtt' ./index.js -- -c ./myconfig.js
```

## Usage

Devices, by default, will publish state as a JSON object to ```ewelink/deviceId```.

Additionally, JSON received at ```ewelink/set/deviceId``` will be sent to the device.

For simple devices like the Sonoff Basic, the JSON is as easy as:

```
{
"switch": "on"
}
```

A breakdown for more complicated devices is not present in this package, however, may be in the future.

## Why?

Many of the more simple Sonoff/iTead devices (like the Sonoff Basic) can be flashed with better firmware and this package serves no purpose. However, for more complex devices, sometimes keeping the original device firmware is advantageous. This allows you do to so.

## Concurrency

The eWeLink Cloud only allows an account to be logged in on one device at a time. Using the same credentials in the eWeLink App and in ewelink-mqtt will result in your being logged out of your session.

The best way to operate is to create a second account and share (via the App) all devices you wish to have exposed to MQTT with this new account.

## Notes

This package makes no attempt to convert the device data into anything useful. All device properties are reported. All device properties can be attempted to be set.

In the future, attemps may be made to translate the device data into more useful patterns. 


