var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server); // socket.io to the server
var kafka = require('kafka-node');


server.listen(3000);

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Kafka Consumer Config
var zkserver = '10.0.1.205:2181,10.0.1.16:2181,10.0.1.56:2181'; // Kafka Server Address
var kafkaClient = new kafka.Client(zkserver);
var consumer = new kafka.Consumer(kafkaClient,[{ topic: 'hasilavg'}, { topic: 'hasilmin'},{ topic: 'hasilmax'}],{autoCommit: true});

// Kafka consumer action
consumer.on('message', function (message) {
      console.log(message.topic + " ->> " + message.value);
      io.emit(message.topic, message.value); // Baca Kafka topic value and Kafka message
});