"use strict";
var amqp = require('amqplib/callback_api');


var URLPublisher = function(){

  //Establish connection with rabbitmq
var amqpConn = null;
var pubChannel = null;
amqp.connect("amqp://localhost" + "?heartbeat=60", function(err, conn) {
    if (err) {
      console.error("[AMQP]", err.message);
    }
    conn.on("error", function(err) {
      if (err.message !== "Connection closing") {
        console.error("[AMQP] conn error", err.message);
      }
    });
    conn.on("close", function() {
      console.error("[AMQP] reconnecting");
    });

    console.log("[AMQP] connected");
    amqpConn = conn;
    startPublisher();

  });

//Stablish Channel
  function startPublisher() {
  amqpConn.createConfirmChannel(function(err, ch) {
    if (closeOnErr(err)) return;
    ch.on("error", function(err) {
      console.error("[AMQP] channel error", err.message);
    });
    ch.on("close", function() {
      console.log("[AMQP] channel closed");
    });
    console.log("Channel Stablished");

    pubChannel = ch;
    pubChannel.assertExchange("exchng-url", "fanout",{},function(err, _ok) {
      if (closeOnErr(err)) return;
      console.log("excahnge created");
    });


    });
  }

  function closeOnErr(err) {
  if (!err) return false;
  console.error("[AMQP] error", err);
  amqpConn.close();
  return true;
}
	
	var URLPubObj = {};

	URLPubObj.PublishNewURL = function (content){
		try {
    	pubChannel.publish("exchng-url", "url", new Buffer(JSON.stringify(content)),{ persistent: true },
           function(err, ok) {
             if (err) {
               console.error("[AMQP] publish", err);
               Channel.connection.close();
             }
           });
  		} catch (e) {
    		console.error("[AMQP] publish", e.message);
  		}
	}

	return URLPubObj;	
}

module.exports = URLPublisher;