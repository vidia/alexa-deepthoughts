/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 **/

'use strict';

const Alexa = require('alexa-sdk');
var fs = require('fs'); 

var APP_ID = require("./secret.js").appId; 

function getRandThought(callback) {
    //callback(null, "This is a deep thought, I guess.");
    fs.readFile("thoughts.txt", function(err, data){
        if(err) return callback(err);
        data = "Well unfortunately I seem to have broken. Oops.\n" + data
        var lines = data.split('\n');
        var thought = lines[Math.floor(Math.random()*lines.length)];
        
        callback(null, thought); 
    })
}


const handlers = {
    'NewThought': function () {
        var handler = this; 
        getRandThought(function (err, fact) {
            if(err) return handler.emit(':tell', "Sorry, ask me again in a bit.");
            handler.emit(':tell', fact);
        });
    },
    'SameThought': function () {
        handler.emit(':tell', "I don't remember the last thing I said. Ask me for a new one instead, I have many more.");
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', "I have a lot of things to tell you, ask me to tell you a thought", "Ask me again, say tell me a thought");
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('I guess that\'s all I can teach you.'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('That\'s all I have for you today, bye.'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
    alexa.execute();
};
