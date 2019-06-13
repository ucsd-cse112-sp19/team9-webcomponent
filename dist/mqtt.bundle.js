/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/paho-mqtt/paho-mqtt.js":
/*!*********************************************!*\
  !*** ./node_modules/paho-mqtt/paho-mqtt.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*******************************************************************************
 * Copyright (c) 2013 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *    Andrew Banks - initial API and implementation and initial documentation
 *******************************************************************************/


// Only expose a single object name in the global namespace.
// Everything must go through this module. Global Paho module
// only has a single public function, client, which returns
// a Paho client object given connection details.

/**
 * Send and receive messages using web browsers.
 * <p>
 * This programming interface lets a JavaScript client application use the MQTT V3.1 or
 * V3.1.1 protocol to connect to an MQTT-supporting messaging server.
 *
 * The function supported includes:
 * <ol>
 * <li>Connecting to and disconnecting from a server. The server is identified by its host name and port number.
 * <li>Specifying options that relate to the communications link with the server,
 * for example the frequency of keep-alive heartbeats, and whether SSL/TLS is required.
 * <li>Subscribing to and receiving messages from MQTT Topics.
 * <li>Publishing messages to MQTT Topics.
 * </ol>
 * <p>
 * The API consists of two main objects:
 * <dl>
 * <dt><b>{@link Paho.Client}</b></dt>
 * <dd>This contains methods that provide the functionality of the API,
 * including provision of callbacks that notify the application when a message
 * arrives from or is delivered to the messaging server,
 * or when the status of its connection to the messaging server changes.</dd>
 * <dt><b>{@link Paho.Message}</b></dt>
 * <dd>This encapsulates the payload of the message along with various attributes
 * associated with its delivery, in particular the destination to which it has
 * been (or is about to be) sent.</dd>
 * </dl>
 * <p>
 * The programming interface validates parameters passed to it, and will throw
 * an Error containing an error message intended for developer use, if it detects
 * an error with any parameter.
 * <p>
 * Example:
 *
 * <code><pre>
var client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("/World");
  var message = new Paho.MQTT.Message("Hello");
  message.destinationName = "/World";
  client.send(message);
};
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0)
	console.log("onConnectionLost:"+responseObject.errorMessage);
};
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  client.disconnect();
};
 * </pre></code>
 * @namespace Paho
 */

/* jshint shadow:true */
(function ExportLibrary(root, factory) {
	if(true){
		module.exports = factory();
	} else {}
})(this, function LibraryFactory(){


	var PahoMQTT = (function (global) {

	// Private variables below, these are only visible inside the function closure
	// which is used to define the module.
	var version = "@VERSION@-@BUILDLEVEL@";

	/**
	 * @private
	 */
	var localStorage = global.localStorage || (function () {
		var data = {};

		return {
			setItem: function (key, item) { data[key] = item; },
			getItem: function (key) { return data[key]; },
			removeItem: function (key) { delete data[key]; },
		};
	})();

		/**
	 * Unique message type identifiers, with associated
	 * associated integer values.
	 * @private
	 */
		var MESSAGE_TYPE = {
			CONNECT: 1,
			CONNACK: 2,
			PUBLISH: 3,
			PUBACK: 4,
			PUBREC: 5,
			PUBREL: 6,
			PUBCOMP: 7,
			SUBSCRIBE: 8,
			SUBACK: 9,
			UNSUBSCRIBE: 10,
			UNSUBACK: 11,
			PINGREQ: 12,
			PINGRESP: 13,
			DISCONNECT: 14
		};

		// Collection of utility methods used to simplify module code
		// and promote the DRY pattern.

		/**
	 * Validate an object's parameter names to ensure they
	 * match a list of expected variables name for this option
	 * type. Used to ensure option object passed into the API don't
	 * contain erroneous parameters.
	 * @param {Object} obj - User options object
	 * @param {Object} keys - valid keys and types that may exist in obj.
	 * @throws {Error} Invalid option parameter found.
	 * @private
	 */
		var validate = function(obj, keys) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (keys.hasOwnProperty(key)) {
						if (typeof obj[key] !== keys[key])
							throw new Error(format(ERROR.INVALID_TYPE, [typeof obj[key], key]));
					} else {
						var errorStr = "Unknown property, " + key + ". Valid properties are:";
						for (var validKey in keys)
							if (keys.hasOwnProperty(validKey))
								errorStr = errorStr+" "+validKey;
						throw new Error(errorStr);
					}
				}
			}
		};

		/**
	 * Return a new function which runs the user function bound
	 * to a fixed scope.
	 * @param {function} User function
	 * @param {object} Function scope
	 * @return {function} User function bound to another scope
	 * @private
	 */
		var scope = function (f, scope) {
			return function () {
				return f.apply(scope, arguments);
			};
		};

		/**
	 * Unique message type identifiers, with associated
	 * associated integer values.
	 * @private
	 */
		var ERROR = {
			OK: {code:0, text:"AMQJSC0000I OK."},
			CONNECT_TIMEOUT: {code:1, text:"AMQJSC0001E Connect timed out."},
			SUBSCRIBE_TIMEOUT: {code:2, text:"AMQJS0002E Subscribe timed out."},
			UNSUBSCRIBE_TIMEOUT: {code:3, text:"AMQJS0003E Unsubscribe timed out."},
			PING_TIMEOUT: {code:4, text:"AMQJS0004E Ping timed out."},
			INTERNAL_ERROR: {code:5, text:"AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"},
			CONNACK_RETURNCODE: {code:6, text:"AMQJS0006E Bad Connack return code:{0} {1}."},
			SOCKET_ERROR: {code:7, text:"AMQJS0007E Socket error:{0}."},
			SOCKET_CLOSE: {code:8, text:"AMQJS0008I Socket closed."},
			MALFORMED_UTF: {code:9, text:"AMQJS0009E Malformed UTF data:{0} {1} {2}."},
			UNSUPPORTED: {code:10, text:"AMQJS0010E {0} is not supported by this browser."},
			INVALID_STATE: {code:11, text:"AMQJS0011E Invalid state {0}."},
			INVALID_TYPE: {code:12, text:"AMQJS0012E Invalid type {0} for {1}."},
			INVALID_ARGUMENT: {code:13, text:"AMQJS0013E Invalid argument {0} for {1}."},
			UNSUPPORTED_OPERATION: {code:14, text:"AMQJS0014E Unsupported operation."},
			INVALID_STORED_DATA: {code:15, text:"AMQJS0015E Invalid data in local storage key={0} value={1}."},
			INVALID_MQTT_MESSAGE_TYPE: {code:16, text:"AMQJS0016E Invalid MQTT message type {0}."},
			MALFORMED_UNICODE: {code:17, text:"AMQJS0017E Malformed Unicode string:{0} {1}."},
			BUFFER_FULL: {code:18, text:"AMQJS0018E Message buffer is full, maximum buffer size: {0}."},
		};

		/** CONNACK RC Meaning. */
		var CONNACK_RC = {
			0:"Connection Accepted",
			1:"Connection Refused: unacceptable protocol version",
			2:"Connection Refused: identifier rejected",
			3:"Connection Refused: server unavailable",
			4:"Connection Refused: bad user name or password",
			5:"Connection Refused: not authorized"
		};

	/**
	 * Format an error message text.
	 * @private
	 * @param {error} ERROR value above.
	 * @param {substitutions} [array] substituted into the text.
	 * @return the text with the substitutions made.
	 */
		var format = function(error, substitutions) {
			var text = error.text;
			if (substitutions) {
				var field,start;
				for (var i=0; i<substitutions.length; i++) {
					field = "{"+i+"}";
					start = text.indexOf(field);
					if(start > 0) {
						var part1 = text.substring(0,start);
						var part2 = text.substring(start+field.length);
						text = part1+substitutions[i]+part2;
					}
				}
			}
			return text;
		};

		//MQTT protocol and version          6    M    Q    I    s    d    p    3
		var MqttProtoIdentifierv3 = [0x00,0x06,0x4d,0x51,0x49,0x73,0x64,0x70,0x03];
		//MQTT proto/version for 311         4    M    Q    T    T    4
		var MqttProtoIdentifierv4 = [0x00,0x04,0x4d,0x51,0x54,0x54,0x04];

		/**
	 * Construct an MQTT wire protocol message.
	 * @param type MQTT packet type.
	 * @param options optional wire message attributes.
	 *
	 * Optional properties
	 *
	 * messageIdentifier: message ID in the range [0..65535]
	 * payloadMessage:	Application Message - PUBLISH only
	 * connectStrings:	array of 0 or more Strings to be put into the CONNECT payload
	 * topics:			array of strings (SUBSCRIBE, UNSUBSCRIBE)
	 * requestQoS:		array of QoS values [0..2]
	 *
	 * "Flag" properties
	 * cleanSession:	true if present / false if absent (CONNECT)
	 * willMessage:  	true if present / false if absent (CONNECT)
	 * isRetained:		true if present / false if absent (CONNECT)
	 * userName:		true if present / false if absent (CONNECT)
	 * password:		true if present / false if absent (CONNECT)
	 * keepAliveInterval:	integer [0..65535]  (CONNECT)
	 *
	 * @private
	 * @ignore
	 */
		var WireMessage = function (type, options) {
			this.type = type;
			for (var name in options) {
				if (options.hasOwnProperty(name)) {
					this[name] = options[name];
				}
			}
		};

		WireMessage.prototype.encode = function() {
		// Compute the first byte of the fixed header
			var first = ((this.type & 0x0f) << 4);

			/*
		 * Now calculate the length of the variable header + payload by adding up the lengths
		 * of all the component parts
		 */

			var remLength = 0;
			var topicStrLength = [];
			var destinationNameLength = 0;
			var willMessagePayloadBytes;

			// if the message contains a messageIdentifier then we need two bytes for that
			if (this.messageIdentifier !== undefined)
				remLength += 2;

			switch(this.type) {
			// If this a Connect then we need to include 12 bytes for its header
			case MESSAGE_TYPE.CONNECT:
				switch(this.mqttVersion) {
				case 3:
					remLength += MqttProtoIdentifierv3.length + 3;
					break;
				case 4:
					remLength += MqttProtoIdentifierv4.length + 3;
					break;
				}

				remLength += UTF8Length(this.clientId) + 2;
				if (this.willMessage !== undefined) {
					remLength += UTF8Length(this.willMessage.destinationName) + 2;
					// Will message is always a string, sent as UTF-8 characters with a preceding length.
					willMessagePayloadBytes = this.willMessage.payloadBytes;
					if (!(willMessagePayloadBytes instanceof Uint8Array))
						willMessagePayloadBytes = new Uint8Array(payloadBytes);
					remLength += willMessagePayloadBytes.byteLength +2;
				}
				if (this.userName !== undefined)
					remLength += UTF8Length(this.userName) + 2;
				if (this.password !== undefined)
					remLength += UTF8Length(this.password) + 2;
				break;

			// Subscribe, Unsubscribe can both contain topic strings
			case MESSAGE_TYPE.SUBSCRIBE:
				first |= 0x02; // Qos = 1;
				for ( var i = 0; i < this.topics.length; i++) {
					topicStrLength[i] = UTF8Length(this.topics[i]);
					remLength += topicStrLength[i] + 2;
				}
				remLength += this.requestedQos.length; // 1 byte for each topic's Qos
				// QoS on Subscribe only
				break;

			case MESSAGE_TYPE.UNSUBSCRIBE:
				first |= 0x02; // Qos = 1;
				for ( var i = 0; i < this.topics.length; i++) {
					topicStrLength[i] = UTF8Length(this.topics[i]);
					remLength += topicStrLength[i] + 2;
				}
				break;

			case MESSAGE_TYPE.PUBREL:
				first |= 0x02; // Qos = 1;
				break;

			case MESSAGE_TYPE.PUBLISH:
				if (this.payloadMessage.duplicate) first |= 0x08;
				first  = first |= (this.payloadMessage.qos << 1);
				if (this.payloadMessage.retained) first |= 0x01;
				destinationNameLength = UTF8Length(this.payloadMessage.destinationName);
				remLength += destinationNameLength + 2;
				var payloadBytes = this.payloadMessage.payloadBytes;
				remLength += payloadBytes.byteLength;
				if (payloadBytes instanceof ArrayBuffer)
					payloadBytes = new Uint8Array(payloadBytes);
				else if (!(payloadBytes instanceof Uint8Array))
					payloadBytes = new Uint8Array(payloadBytes.buffer);
				break;

			case MESSAGE_TYPE.DISCONNECT:
				break;

			default:
				break;
			}

			// Now we can allocate a buffer for the message

			var mbi = encodeMBI(remLength);  // Convert the length to MQTT MBI format
			var pos = mbi.length + 1;        // Offset of start of variable header
			var buffer = new ArrayBuffer(remLength + pos);
			var byteStream = new Uint8Array(buffer);    // view it as a sequence of bytes

			//Write the fixed header into the buffer
			byteStream[0] = first;
			byteStream.set(mbi,1);

			// If this is a PUBLISH then the variable header starts with a topic
			if (this.type == MESSAGE_TYPE.PUBLISH)
				pos = writeString(this.payloadMessage.destinationName, destinationNameLength, byteStream, pos);
			// If this is a CONNECT then the variable header contains the protocol name/version, flags and keepalive time

			else if (this.type == MESSAGE_TYPE.CONNECT) {
				switch (this.mqttVersion) {
				case 3:
					byteStream.set(MqttProtoIdentifierv3, pos);
					pos += MqttProtoIdentifierv3.length;
					break;
				case 4:
					byteStream.set(MqttProtoIdentifierv4, pos);
					pos += MqttProtoIdentifierv4.length;
					break;
				}
				var connectFlags = 0;
				if (this.cleanSession)
					connectFlags = 0x02;
				if (this.willMessage !== undefined ) {
					connectFlags |= 0x04;
					connectFlags |= (this.willMessage.qos<<3);
					if (this.willMessage.retained) {
						connectFlags |= 0x20;
					}
				}
				if (this.userName !== undefined)
					connectFlags |= 0x80;
				if (this.password !== undefined)
					connectFlags |= 0x40;
				byteStream[pos++] = connectFlags;
				pos = writeUint16 (this.keepAliveInterval, byteStream, pos);
			}

			// Output the messageIdentifier - if there is one
			if (this.messageIdentifier !== undefined)
				pos = writeUint16 (this.messageIdentifier, byteStream, pos);

			switch(this.type) {
			case MESSAGE_TYPE.CONNECT:
				pos = writeString(this.clientId, UTF8Length(this.clientId), byteStream, pos);
				if (this.willMessage !== undefined) {
					pos = writeString(this.willMessage.destinationName, UTF8Length(this.willMessage.destinationName), byteStream, pos);
					pos = writeUint16(willMessagePayloadBytes.byteLength, byteStream, pos);
					byteStream.set(willMessagePayloadBytes, pos);
					pos += willMessagePayloadBytes.byteLength;

				}
				if (this.userName !== undefined)
					pos = writeString(this.userName, UTF8Length(this.userName), byteStream, pos);
				if (this.password !== undefined)
					pos = writeString(this.password, UTF8Length(this.password), byteStream, pos);
				break;

			case MESSAGE_TYPE.PUBLISH:
				// PUBLISH has a text or binary payload, if text do not add a 2 byte length field, just the UTF characters.
				byteStream.set(payloadBytes, pos);

				break;

				//    	    case MESSAGE_TYPE.PUBREC:
				//    	    case MESSAGE_TYPE.PUBREL:
				//    	    case MESSAGE_TYPE.PUBCOMP:
				//    	    	break;

			case MESSAGE_TYPE.SUBSCRIBE:
				// SUBSCRIBE has a list of topic strings and request QoS
				for (var i=0; i<this.topics.length; i++) {
					pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
					byteStream[pos++] = this.requestedQos[i];
				}
				break;

			case MESSAGE_TYPE.UNSUBSCRIBE:
				// UNSUBSCRIBE has a list of topic strings
				for (var i=0; i<this.topics.length; i++)
					pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
				break;

			default:
				// Do nothing.
			}

			return buffer;
		};

		function decodeMessage(input,pos) {
			var startingPos = pos;
			var first = input[pos];
			var type = first >> 4;
			var messageInfo = first &= 0x0f;
			pos += 1;


			// Decode the remaining length (MBI format)

			var digit;
			var remLength = 0;
			var multiplier = 1;
			do {
				if (pos == input.length) {
					return [null,startingPos];
				}
				digit = input[pos++];
				remLength += ((digit & 0x7F) * multiplier);
				multiplier *= 128;
			} while ((digit & 0x80) !== 0);

			var endPos = pos+remLength;
			if (endPos > input.length) {
				return [null,startingPos];
			}

			var wireMessage = new WireMessage(type);
			switch(type) {
			case MESSAGE_TYPE.CONNACK:
				var connectAcknowledgeFlags = input[pos++];
				if (connectAcknowledgeFlags & 0x01)
					wireMessage.sessionPresent = true;
				wireMessage.returnCode = input[pos++];
				break;

			case MESSAGE_TYPE.PUBLISH:
				var qos = (messageInfo >> 1) & 0x03;

				var len = readUint16(input, pos);
				pos += 2;
				var topicName = parseUTF8(input, pos, len);
				pos += len;
				// If QoS 1 or 2 there will be a messageIdentifier
				if (qos > 0) {
					wireMessage.messageIdentifier = readUint16(input, pos);
					pos += 2;
				}

				var message = new Message(input.subarray(pos, endPos));
				if ((messageInfo & 0x01) == 0x01)
					message.retained = true;
				if ((messageInfo & 0x08) == 0x08)
					message.duplicate =  true;
				message.qos = qos;
				message.destinationName = topicName;
				wireMessage.payloadMessage = message;
				break;

			case  MESSAGE_TYPE.PUBACK:
			case  MESSAGE_TYPE.PUBREC:
			case  MESSAGE_TYPE.PUBREL:
			case  MESSAGE_TYPE.PUBCOMP:
			case  MESSAGE_TYPE.UNSUBACK:
				wireMessage.messageIdentifier = readUint16(input, pos);
				break;

			case  MESSAGE_TYPE.SUBACK:
				wireMessage.messageIdentifier = readUint16(input, pos);
				pos += 2;
				wireMessage.returnCode = input.subarray(pos, endPos);
				break;

			default:
				break;
			}

			return [wireMessage,endPos];
		}

		function writeUint16(input, buffer, offset) {
			buffer[offset++] = input >> 8;      //MSB
			buffer[offset++] = input % 256;     //LSB
			return offset;
		}

		function writeString(input, utf8Length, buffer, offset) {
			offset = writeUint16(utf8Length, buffer, offset);
			stringToUTF8(input, buffer, offset);
			return offset + utf8Length;
		}

		function readUint16(buffer, offset) {
			return 256*buffer[offset] + buffer[offset+1];
		}

		/**
	 * Encodes an MQTT Multi-Byte Integer
	 * @private
	 */
		function encodeMBI(number) {
			var output = new Array(1);
			var numBytes = 0;

			do {
				var digit = number % 128;
				number = number >> 7;
				if (number > 0) {
					digit |= 0x80;
				}
				output[numBytes++] = digit;
			} while ( (number > 0) && (numBytes<4) );

			return output;
		}

		/**
	 * Takes a String and calculates its length in bytes when encoded in UTF8.
	 * @private
	 */
		function UTF8Length(input) {
			var output = 0;
			for (var i = 0; i<input.length; i++)
			{
				var charCode = input.charCodeAt(i);
				if (charCode > 0x7FF)
				{
					// Surrogate pair means its a 4 byte character
					if (0xD800 <= charCode && charCode <= 0xDBFF)
					{
						i++;
						output++;
					}
					output +=3;
				}
				else if (charCode > 0x7F)
					output +=2;
				else
					output++;
			}
			return output;
		}

		/**
	 * Takes a String and writes it into an array as UTF8 encoded bytes.
	 * @private
	 */
		function stringToUTF8(input, output, start) {
			var pos = start;
			for (var i = 0; i<input.length; i++) {
				var charCode = input.charCodeAt(i);

				// Check for a surrogate pair.
				if (0xD800 <= charCode && charCode <= 0xDBFF) {
					var lowCharCode = input.charCodeAt(++i);
					if (isNaN(lowCharCode)) {
						throw new Error(format(ERROR.MALFORMED_UNICODE, [charCode, lowCharCode]));
					}
					charCode = ((charCode - 0xD800)<<10) + (lowCharCode - 0xDC00) + 0x10000;

				}

				if (charCode <= 0x7F) {
					output[pos++] = charCode;
				} else if (charCode <= 0x7FF) {
					output[pos++] = charCode>>6  & 0x1F | 0xC0;
					output[pos++] = charCode     & 0x3F | 0x80;
				} else if (charCode <= 0xFFFF) {
					output[pos++] = charCode>>12 & 0x0F | 0xE0;
					output[pos++] = charCode>>6  & 0x3F | 0x80;
					output[pos++] = charCode     & 0x3F | 0x80;
				} else {
					output[pos++] = charCode>>18 & 0x07 | 0xF0;
					output[pos++] = charCode>>12 & 0x3F | 0x80;
					output[pos++] = charCode>>6  & 0x3F | 0x80;
					output[pos++] = charCode     & 0x3F | 0x80;
				}
			}
			return output;
		}

		function parseUTF8(input, offset, length) {
			var output = "";
			var utf16;
			var pos = offset;

			while (pos < offset+length)
			{
				var byte1 = input[pos++];
				if (byte1 < 128)
					utf16 = byte1;
				else
				{
					var byte2 = input[pos++]-128;
					if (byte2 < 0)
						throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16),""]));
					if (byte1 < 0xE0)             // 2 byte character
						utf16 = 64*(byte1-0xC0) + byte2;
					else
					{
						var byte3 = input[pos++]-128;
						if (byte3 < 0)
							throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16)]));
						if (byte1 < 0xF0)        // 3 byte character
							utf16 = 4096*(byte1-0xE0) + 64*byte2 + byte3;
						else
						{
							var byte4 = input[pos++]-128;
							if (byte4 < 0)
								throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
							if (byte1 < 0xF8)        // 4 byte character
								utf16 = 262144*(byte1-0xF0) + 4096*byte2 + 64*byte3 + byte4;
							else                     // longer encodings are not supported
								throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
						}
					}
				}

				if (utf16 > 0xFFFF)   // 4 byte character - express as a surrogate pair
				{
					utf16 -= 0x10000;
					output += String.fromCharCode(0xD800 + (utf16 >> 10)); // lead character
					utf16 = 0xDC00 + (utf16 & 0x3FF);  // trail character
				}
				output += String.fromCharCode(utf16);
			}
			return output;
		}

		/**
	 * Repeat keepalive requests, monitor responses.
	 * @ignore
	 */
		var Pinger = function(client, keepAliveInterval) {
			this._client = client;
			this._keepAliveInterval = keepAliveInterval*1000;
			this.isReset = false;

			var pingReq = new WireMessage(MESSAGE_TYPE.PINGREQ).encode();

			var doTimeout = function (pinger) {
				return function () {
					return doPing.apply(pinger);
				};
			};

			/** @ignore */
			var doPing = function() {
				if (!this.isReset) {
					this._client._trace("Pinger.doPing", "Timed out");
					this._client._disconnected( ERROR.PING_TIMEOUT.code , format(ERROR.PING_TIMEOUT));
				} else {
					this.isReset = false;
					this._client._trace("Pinger.doPing", "send PINGREQ");
					this._client.socket.send(pingReq);
					this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
				}
			};

			this.reset = function() {
				this.isReset = true;
				clearTimeout(this.timeout);
				if (this._keepAliveInterval > 0)
					this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
			};

			this.cancel = function() {
				clearTimeout(this.timeout);
			};
		};

		/**
	 * Monitor request completion.
	 * @ignore
	 */
		var Timeout = function(client, timeoutSeconds, action, args) {
			if (!timeoutSeconds)
				timeoutSeconds = 30;

			var doTimeout = function (action, client, args) {
				return function () {
					return action.apply(client, args);
				};
			};
			this.timeout = setTimeout(doTimeout(action, client, args), timeoutSeconds * 1000);

			this.cancel = function() {
				clearTimeout(this.timeout);
			};
		};

	/**
	 * Internal implementation of the Websockets MQTT V3.1 client.
	 *
	 * @name Paho.ClientImpl @constructor
	 * @param {String} host the DNS nameof the webSocket host.
	 * @param {Number} port the port number for that host.
	 * @param {String} clientId the MQ client identifier.
	 */
		var ClientImpl = function (uri, host, port, path, clientId) {
		// Check dependencies are satisfied in this browser.
			if (!("WebSocket" in global && global.WebSocket !== null)) {
				throw new Error(format(ERROR.UNSUPPORTED, ["WebSocket"]));
			}
			if (!("ArrayBuffer" in global && global.ArrayBuffer !== null)) {
				throw new Error(format(ERROR.UNSUPPORTED, ["ArrayBuffer"]));
			}
			this._trace("Paho.Client", uri, host, port, path, clientId);

			this.host = host;
			this.port = port;
			this.path = path;
			this.uri = uri;
			this.clientId = clientId;
			this._wsuri = null;

			// Local storagekeys are qualified with the following string.
			// The conditional inclusion of path in the key is for backward
			// compatibility to when the path was not configurable and assumed to
			// be /mqtt
			this._localKey=host+":"+port+(path!="/mqtt"?":"+path:"")+":"+clientId+":";

			// Create private instance-only message queue
			// Internal queue of messages to be sent, in sending order.
			this._msg_queue = [];
			this._buffered_msg_queue = [];

			// Messages we have sent and are expecting a response for, indexed by their respective message ids.
			this._sentMessages = {};

			// Messages we have received and acknowleged and are expecting a confirm message for
			// indexed by their respective message ids.
			this._receivedMessages = {};

			// Internal list of callbacks to be executed when messages
			// have been successfully sent over web socket, e.g. disconnect
			// when it doesn't have to wait for ACK, just message is dispatched.
			this._notify_msg_sent = {};

			// Unique identifier for SEND messages, incrementing
			// counter as messages are sent.
			this._message_identifier = 1;

			// Used to determine the transmission sequence of stored sent messages.
			this._sequence = 0;


			// Load the local state, if any, from the saved version, only restore state relevant to this client.
			for (var key in localStorage)
				if (   key.indexOf("Sent:"+this._localKey) === 0 || key.indexOf("Received:"+this._localKey) === 0)
					this.restore(key);
		};

		// Messaging Client public instance members.
		ClientImpl.prototype.host = null;
		ClientImpl.prototype.port = null;
		ClientImpl.prototype.path = null;
		ClientImpl.prototype.uri = null;
		ClientImpl.prototype.clientId = null;

		// Messaging Client private instance members.
		ClientImpl.prototype.socket = null;
		/* true once we have received an acknowledgement to a CONNECT packet. */
		ClientImpl.prototype.connected = false;
		/* The largest message identifier allowed, may not be larger than 2**16 but
		 * if set smaller reduces the maximum number of outbound messages allowed.
		 */
		ClientImpl.prototype.maxMessageIdentifier = 65536;
		ClientImpl.prototype.connectOptions = null;
		ClientImpl.prototype.hostIndex = null;
		ClientImpl.prototype.onConnected = null;
		ClientImpl.prototype.onConnectionLost = null;
		ClientImpl.prototype.onMessageDelivered = null;
		ClientImpl.prototype.onMessageArrived = null;
		ClientImpl.prototype.traceFunction = null;
		ClientImpl.prototype._msg_queue = null;
		ClientImpl.prototype._buffered_msg_queue = null;
		ClientImpl.prototype._connectTimeout = null;
		/* The sendPinger monitors how long we allow before we send data to prove to the server that we are alive. */
		ClientImpl.prototype.sendPinger = null;
		/* The receivePinger monitors how long we allow before we require evidence that the server is alive. */
		ClientImpl.prototype.receivePinger = null;
		ClientImpl.prototype._reconnectInterval = 1; // Reconnect Delay, starts at 1 second
		ClientImpl.prototype._reconnecting = false;
		ClientImpl.prototype._reconnectTimeout = null;
		ClientImpl.prototype.disconnectedPublishing = false;
		ClientImpl.prototype.disconnectedBufferSize = 5000;

		ClientImpl.prototype.receiveBuffer = null;

		ClientImpl.prototype._traceBuffer = null;
		ClientImpl.prototype._MAX_TRACE_ENTRIES = 100;

		ClientImpl.prototype.connect = function (connectOptions) {
			var connectOptionsMasked = this._traceMask(connectOptions, "password");
			this._trace("Client.connect", connectOptionsMasked, this.socket, this.connected);

			if (this.connected)
				throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));
			if (this.socket)
				throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));

			if (this._reconnecting) {
			// connect() function is called while reconnect is in progress.
			// Terminate the auto reconnect process to use new connect options.
				this._reconnectTimeout.cancel();
				this._reconnectTimeout = null;
				this._reconnecting = false;
			}

			this.connectOptions = connectOptions;
			this._reconnectInterval = 1;
			this._reconnecting = false;
			if (connectOptions.uris) {
				this.hostIndex = 0;
				this._doConnect(connectOptions.uris[0]);
			} else {
				this._doConnect(this.uri);
			}

		};

		ClientImpl.prototype.subscribe = function (filter, subscribeOptions) {
			this._trace("Client.subscribe", filter, subscribeOptions);

			if (!this.connected)
				throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

            var wireMessage = new WireMessage(MESSAGE_TYPE.SUBSCRIBE);
            wireMessage.topics = filter.constructor === Array ? filter : [filter];
            if (subscribeOptions.qos === undefined)
                subscribeOptions.qos = 0;
            wireMessage.requestedQos = [];
            for (var i = 0; i < wireMessage.topics.length; i++)
                wireMessage.requestedQos[i] = subscribeOptions.qos;

			if (subscribeOptions.onSuccess) {
				wireMessage.onSuccess = function(grantedQos) {subscribeOptions.onSuccess({invocationContext:subscribeOptions.invocationContext,grantedQos:grantedQos});};
			}

			if (subscribeOptions.onFailure) {
				wireMessage.onFailure = function(errorCode) {subscribeOptions.onFailure({invocationContext:subscribeOptions.invocationContext,errorCode:errorCode, errorMessage:format(errorCode)});};
			}

			if (subscribeOptions.timeout) {
				wireMessage.timeOut = new Timeout(this, subscribeOptions.timeout, subscribeOptions.onFailure,
					[{invocationContext:subscribeOptions.invocationContext,
						errorCode:ERROR.SUBSCRIBE_TIMEOUT.code,
						errorMessage:format(ERROR.SUBSCRIBE_TIMEOUT)}]);
			}

			// All subscriptions return a SUBACK.
			this._requires_ack(wireMessage);
			this._schedule_message(wireMessage);
		};

		/** @ignore */
		ClientImpl.prototype.unsubscribe = function(filter, unsubscribeOptions) {
			this._trace("Client.unsubscribe", filter, unsubscribeOptions);

			if (!this.connected)
				throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

            var wireMessage = new WireMessage(MESSAGE_TYPE.UNSUBSCRIBE);
            wireMessage.topics = filter.constructor === Array ? filter : [filter];

			if (unsubscribeOptions.onSuccess) {
				wireMessage.callback = function() {unsubscribeOptions.onSuccess({invocationContext:unsubscribeOptions.invocationContext});};
			}
			if (unsubscribeOptions.timeout) {
				wireMessage.timeOut = new Timeout(this, unsubscribeOptions.timeout, unsubscribeOptions.onFailure,
					[{invocationContext:unsubscribeOptions.invocationContext,
						errorCode:ERROR.UNSUBSCRIBE_TIMEOUT.code,
						errorMessage:format(ERROR.UNSUBSCRIBE_TIMEOUT)}]);
			}

			// All unsubscribes return a SUBACK.
			this._requires_ack(wireMessage);
			this._schedule_message(wireMessage);
		};

		ClientImpl.prototype.send = function (message) {
			this._trace("Client.send", message);

			var wireMessage = new WireMessage(MESSAGE_TYPE.PUBLISH);
			wireMessage.payloadMessage = message;

			if (this.connected) {
			// Mark qos 1 & 2 message as "ACK required"
			// For qos 0 message, invoke onMessageDelivered callback if there is one.
			// Then schedule the message.
				if (message.qos > 0) {
					this._requires_ack(wireMessage);
				} else if (this.onMessageDelivered) {
					this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage);
				}
				this._schedule_message(wireMessage);
			} else {
			// Currently disconnected, will not schedule this message
			// Check if reconnecting is in progress and disconnected publish is enabled.
				if (this._reconnecting && this.disconnectedPublishing) {
				// Check the limit which include the "required ACK" messages
					var messageCount = Object.keys(this._sentMessages).length + this._buffered_msg_queue.length;
					if (messageCount > this.disconnectedBufferSize) {
						throw new Error(format(ERROR.BUFFER_FULL, [this.disconnectedBufferSize]));
					} else {
						if (message.qos > 0) {
						// Mark this message as "ACK required"
							this._requires_ack(wireMessage);
						} else {
							wireMessage.sequence = ++this._sequence;
							// Add messages in fifo order to array, by adding to start
							this._buffered_msg_queue.unshift(wireMessage);
						}
					}
				} else {
					throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));
				}
			}
		};

		ClientImpl.prototype.disconnect = function () {
			this._trace("Client.disconnect");

			if (this._reconnecting) {
			// disconnect() function is called while reconnect is in progress.
			// Terminate the auto reconnect process.
				this._reconnectTimeout.cancel();
				this._reconnectTimeout = null;
				this._reconnecting = false;
			}

			if (!this.socket)
				throw new Error(format(ERROR.INVALID_STATE, ["not connecting or connected"]));

			var wireMessage = new WireMessage(MESSAGE_TYPE.DISCONNECT);

			// Run the disconnected call back as soon as the message has been sent,
			// in case of a failure later on in the disconnect processing.
			// as a consequence, the _disconected call back may be run several times.
			this._notify_msg_sent[wireMessage] = scope(this._disconnected, this);

			this._schedule_message(wireMessage);
		};

		ClientImpl.prototype.getTraceLog = function () {
			if ( this._traceBuffer !== null ) {
				this._trace("Client.getTraceLog", new Date());
				this._trace("Client.getTraceLog in flight messages", this._sentMessages.length);
				for (var key in this._sentMessages)
					this._trace("_sentMessages ",key, this._sentMessages[key]);
				for (var key in this._receivedMessages)
					this._trace("_receivedMessages ",key, this._receivedMessages[key]);

				return this._traceBuffer;
			}
		};

		ClientImpl.prototype.startTrace = function () {
			if ( this._traceBuffer === null ) {
				this._traceBuffer = [];
			}
			this._trace("Client.startTrace", new Date(), version);
		};

		ClientImpl.prototype.stopTrace = function () {
			delete this._traceBuffer;
		};

		ClientImpl.prototype._doConnect = function (wsurl) {
		// When the socket is open, this client will send the CONNECT WireMessage using the saved parameters.
			if (this.connectOptions.useSSL) {
				var uriParts = wsurl.split(":");
				uriParts[0] = "wss";
				wsurl = uriParts.join(":");
			}
			this._wsuri = wsurl;
			this.connected = false;



			if (this.connectOptions.mqttVersion < 4) {
				this.socket = new WebSocket(wsurl, ["mqttv3.1"]);
			} else {
				this.socket = new WebSocket(wsurl, ["mqtt"]);
			}
			this.socket.binaryType = "arraybuffer";
			this.socket.onopen = scope(this._on_socket_open, this);
			this.socket.onmessage = scope(this._on_socket_message, this);
			this.socket.onerror = scope(this._on_socket_error, this);
			this.socket.onclose = scope(this._on_socket_close, this);

			this.sendPinger = new Pinger(this, this.connectOptions.keepAliveInterval);
			this.receivePinger = new Pinger(this, this.connectOptions.keepAliveInterval);
			if (this._connectTimeout) {
				this._connectTimeout.cancel();
				this._connectTimeout = null;
			}
			this._connectTimeout = new Timeout(this, this.connectOptions.timeout, this._disconnected,  [ERROR.CONNECT_TIMEOUT.code, format(ERROR.CONNECT_TIMEOUT)]);
		};


		// Schedule a new message to be sent over the WebSockets
		// connection. CONNECT messages cause WebSocket connection
		// to be started. All other messages are queued internally
		// until this has happened. When WS connection starts, process
		// all outstanding messages.
		ClientImpl.prototype._schedule_message = function (message) {
			// Add messages in fifo order to array, by adding to start
			this._msg_queue.unshift(message);
			// Process outstanding messages in the queue if we have an  open socket, and have received CONNACK.
			if (this.connected) {
				this._process_queue();
			}
		};

		ClientImpl.prototype.store = function(prefix, wireMessage) {
			var storedMessage = {type:wireMessage.type, messageIdentifier:wireMessage.messageIdentifier, version:1};

			switch(wireMessage.type) {
			case MESSAGE_TYPE.PUBLISH:
				if(wireMessage.pubRecReceived)
					storedMessage.pubRecReceived = true;

				// Convert the payload to a hex string.
				storedMessage.payloadMessage = {};
				var hex = "";
				var messageBytes = wireMessage.payloadMessage.payloadBytes;
				for (var i=0; i<messageBytes.length; i++) {
					if (messageBytes[i] <= 0xF)
						hex = hex+"0"+messageBytes[i].toString(16);
					else
						hex = hex+messageBytes[i].toString(16);
				}
				storedMessage.payloadMessage.payloadHex = hex;

				storedMessage.payloadMessage.qos = wireMessage.payloadMessage.qos;
				storedMessage.payloadMessage.destinationName = wireMessage.payloadMessage.destinationName;
				if (wireMessage.payloadMessage.duplicate)
					storedMessage.payloadMessage.duplicate = true;
				if (wireMessage.payloadMessage.retained)
					storedMessage.payloadMessage.retained = true;

				// Add a sequence number to sent messages.
				if ( prefix.indexOf("Sent:") === 0 ) {
					if ( wireMessage.sequence === undefined )
						wireMessage.sequence = ++this._sequence;
					storedMessage.sequence = wireMessage.sequence;
				}
				break;

			default:
				throw Error(format(ERROR.INVALID_STORED_DATA, [prefix+this._localKey+wireMessage.messageIdentifier, storedMessage]));
			}
			localStorage.setItem(prefix+this._localKey+wireMessage.messageIdentifier, JSON.stringify(storedMessage));
		};

		ClientImpl.prototype.restore = function(key) {
			var value = localStorage.getItem(key);
			var storedMessage = JSON.parse(value);

			var wireMessage = new WireMessage(storedMessage.type, storedMessage);

			switch(storedMessage.type) {
			case MESSAGE_TYPE.PUBLISH:
				// Replace the payload message with a Message object.
				var hex = storedMessage.payloadMessage.payloadHex;
				var buffer = new ArrayBuffer((hex.length)/2);
				var byteStream = new Uint8Array(buffer);
				var i = 0;
				while (hex.length >= 2) {
					var x = parseInt(hex.substring(0, 2), 16);
					hex = hex.substring(2, hex.length);
					byteStream[i++] = x;
				}
				var payloadMessage = new Message(byteStream);

				payloadMessage.qos = storedMessage.payloadMessage.qos;
				payloadMessage.destinationName = storedMessage.payloadMessage.destinationName;
				if (storedMessage.payloadMessage.duplicate)
					payloadMessage.duplicate = true;
				if (storedMessage.payloadMessage.retained)
					payloadMessage.retained = true;
				wireMessage.payloadMessage = payloadMessage;

				break;

			default:
				throw Error(format(ERROR.INVALID_STORED_DATA, [key, value]));
			}

			if (key.indexOf("Sent:"+this._localKey) === 0) {
				wireMessage.payloadMessage.duplicate = true;
				this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
			} else if (key.indexOf("Received:"+this._localKey) === 0) {
				this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
			}
		};

		ClientImpl.prototype._process_queue = function () {
			var message = null;

			// Send all queued messages down socket connection
			while ((message = this._msg_queue.pop())) {
				this._socket_send(message);
				// Notify listeners that message was successfully sent
				if (this._notify_msg_sent[message]) {
					this._notify_msg_sent[message]();
					delete this._notify_msg_sent[message];
				}
			}
		};

		/**
	 * Expect an ACK response for this message. Add message to the set of in progress
	 * messages and set an unused identifier in this message.
	 * @ignore
	 */
		ClientImpl.prototype._requires_ack = function (wireMessage) {
			var messageCount = Object.keys(this._sentMessages).length;
			if (messageCount > this.maxMessageIdentifier)
				throw Error ("Too many messages:"+messageCount);

			while(this._sentMessages[this._message_identifier] !== undefined) {
				this._message_identifier++;
			}
			wireMessage.messageIdentifier = this._message_identifier;
			this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
			if (wireMessage.type === MESSAGE_TYPE.PUBLISH) {
				this.store("Sent:", wireMessage);
			}
			if (this._message_identifier === this.maxMessageIdentifier) {
				this._message_identifier = 1;
			}
		};

		/**
	 * Called when the underlying websocket has been opened.
	 * @ignore
	 */
		ClientImpl.prototype._on_socket_open = function () {
		// Create the CONNECT message object.
			var wireMessage = new WireMessage(MESSAGE_TYPE.CONNECT, this.connectOptions);
			wireMessage.clientId = this.clientId;
			this._socket_send(wireMessage);
		};

		/**
	 * Called when the underlying websocket has received a complete packet.
	 * @ignore
	 */
		ClientImpl.prototype._on_socket_message = function (event) {
			this._trace("Client._on_socket_message", event.data);
			var messages = this._deframeMessages(event.data);
			for (var i = 0; i < messages.length; i+=1) {
				this._handleMessage(messages[i]);
			}
		};

		ClientImpl.prototype._deframeMessages = function(data) {
			var byteArray = new Uint8Array(data);
			var messages = [];
			if (this.receiveBuffer) {
				var newData = new Uint8Array(this.receiveBuffer.length+byteArray.length);
				newData.set(this.receiveBuffer);
				newData.set(byteArray,this.receiveBuffer.length);
				byteArray = newData;
				delete this.receiveBuffer;
			}
			try {
				var offset = 0;
				while(offset < byteArray.length) {
					var result = decodeMessage(byteArray,offset);
					var wireMessage = result[0];
					offset = result[1];
					if (wireMessage !== null) {
						messages.push(wireMessage);
					} else {
						break;
					}
				}
				if (offset < byteArray.length) {
					this.receiveBuffer = byteArray.subarray(offset);
				}
			} catch (error) {
				var errorStack = ((error.hasOwnProperty("stack") == "undefined") ? error.stack.toString() : "No Error Stack Available");
				this._disconnected(ERROR.INTERNAL_ERROR.code , format(ERROR.INTERNAL_ERROR, [error.message,errorStack]));
				return;
			}
			return messages;
		};

		ClientImpl.prototype._handleMessage = function(wireMessage) {

			this._trace("Client._handleMessage", wireMessage);

			try {
				switch(wireMessage.type) {
				case MESSAGE_TYPE.CONNACK:
					this._connectTimeout.cancel();
					if (this._reconnectTimeout)
						this._reconnectTimeout.cancel();

					// If we have started using clean session then clear up the local state.
					if (this.connectOptions.cleanSession) {
						for (var key in this._sentMessages) {
							var sentMessage = this._sentMessages[key];
							localStorage.removeItem("Sent:"+this._localKey+sentMessage.messageIdentifier);
						}
						this._sentMessages = {};

						for (var key in this._receivedMessages) {
							var receivedMessage = this._receivedMessages[key];
							localStorage.removeItem("Received:"+this._localKey+receivedMessage.messageIdentifier);
						}
						this._receivedMessages = {};
					}
					// Client connected and ready for business.
					if (wireMessage.returnCode === 0) {

						this.connected = true;
						// Jump to the end of the list of uris and stop looking for a good host.

						if (this.connectOptions.uris)
							this.hostIndex = this.connectOptions.uris.length;

					} else {
						this._disconnected(ERROR.CONNACK_RETURNCODE.code , format(ERROR.CONNACK_RETURNCODE, [wireMessage.returnCode, CONNACK_RC[wireMessage.returnCode]]));
						break;
					}

					// Resend messages.
					var sequencedMessages = [];
					for (var msgId in this._sentMessages) {
						if (this._sentMessages.hasOwnProperty(msgId))
							sequencedMessages.push(this._sentMessages[msgId]);
					}

					// Also schedule qos 0 buffered messages if any
					if (this._buffered_msg_queue.length > 0) {
						var msg = null;
						while ((msg = this._buffered_msg_queue.pop())) {
							sequencedMessages.push(msg);
							if (this.onMessageDelivered)
								this._notify_msg_sent[msg] = this.onMessageDelivered(msg.payloadMessage);
						}
					}

					// Sort sentMessages into the original sent order.
					var sequencedMessages = sequencedMessages.sort(function(a,b) {return a.sequence - b.sequence;} );
					for (var i=0, len=sequencedMessages.length; i<len; i++) {
						var sentMessage = sequencedMessages[i];
						if (sentMessage.type == MESSAGE_TYPE.PUBLISH && sentMessage.pubRecReceived) {
							var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier:sentMessage.messageIdentifier});
							this._schedule_message(pubRelMessage);
						} else {
							this._schedule_message(sentMessage);
						}
					}

					// Execute the connectOptions.onSuccess callback if there is one.
					// Will also now return if this connection was the result of an automatic
					// reconnect and which URI was successfully connected to.
					if (this.connectOptions.onSuccess) {
						this.connectOptions.onSuccess({invocationContext:this.connectOptions.invocationContext});
					}

					var reconnected = false;
					if (this._reconnecting) {
						reconnected = true;
						this._reconnectInterval = 1;
						this._reconnecting = false;
					}

					// Execute the onConnected callback if there is one.
					this._connected(reconnected, this._wsuri);

					// Process all queued messages now that the connection is established.
					this._process_queue();
					break;

				case MESSAGE_TYPE.PUBLISH:
					this._receivePublish(wireMessage);
					break;

				case MESSAGE_TYPE.PUBACK:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					// If this is a re flow of a PUBACK after we have restarted receivedMessage will not exist.
					if (sentMessage) {
						delete this._sentMessages[wireMessage.messageIdentifier];
						localStorage.removeItem("Sent:"+this._localKey+wireMessage.messageIdentifier);
						if (this.onMessageDelivered)
							this.onMessageDelivered(sentMessage.payloadMessage);
					}
					break;

				case MESSAGE_TYPE.PUBREC:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					// If this is a re flow of a PUBREC after we have restarted receivedMessage will not exist.
					if (sentMessage) {
						sentMessage.pubRecReceived = true;
						var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier:wireMessage.messageIdentifier});
						this.store("Sent:", sentMessage);
						this._schedule_message(pubRelMessage);
					}
					break;

				case MESSAGE_TYPE.PUBREL:
					var receivedMessage = this._receivedMessages[wireMessage.messageIdentifier];
					localStorage.removeItem("Received:"+this._localKey+wireMessage.messageIdentifier);
					// If this is a re flow of a PUBREL after we have restarted receivedMessage will not exist.
					if (receivedMessage) {
						this._receiveMessage(receivedMessage);
						delete this._receivedMessages[wireMessage.messageIdentifier];
					}
					// Always flow PubComp, we may have previously flowed PubComp but the server lost it and restarted.
					var pubCompMessage = new WireMessage(MESSAGE_TYPE.PUBCOMP, {messageIdentifier:wireMessage.messageIdentifier});
					this._schedule_message(pubCompMessage);


					break;

				case MESSAGE_TYPE.PUBCOMP:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					delete this._sentMessages[wireMessage.messageIdentifier];
					localStorage.removeItem("Sent:"+this._localKey+wireMessage.messageIdentifier);
					if (this.onMessageDelivered)
						this.onMessageDelivered(sentMessage.payloadMessage);
					break;

				case MESSAGE_TYPE.SUBACK:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					if (sentMessage) {
						if(sentMessage.timeOut)
							sentMessage.timeOut.cancel();
						// This will need to be fixed when we add multiple topic support
						if (wireMessage.returnCode[0] === 0x80) {
							if (sentMessage.onFailure) {
								sentMessage.onFailure(wireMessage.returnCode);
							}
						} else if (sentMessage.onSuccess) {
							sentMessage.onSuccess(wireMessage.returnCode);
						}
						delete this._sentMessages[wireMessage.messageIdentifier];
					}
					break;

				case MESSAGE_TYPE.UNSUBACK:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					if (sentMessage) {
						if (sentMessage.timeOut)
							sentMessage.timeOut.cancel();
						if (sentMessage.callback) {
							sentMessage.callback();
						}
						delete this._sentMessages[wireMessage.messageIdentifier];
					}

					break;

				case MESSAGE_TYPE.PINGRESP:
				/* The sendPinger or receivePinger may have sent a ping, the receivePinger has already been reset. */
					this.sendPinger.reset();
					break;

				case MESSAGE_TYPE.DISCONNECT:
				// Clients do not expect to receive disconnect packets.
					this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code , format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
					break;

				default:
					this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code , format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
				}
			} catch (error) {
				var errorStack = ((error.hasOwnProperty("stack") == "undefined") ? error.stack.toString() : "No Error Stack Available");
				this._disconnected(ERROR.INTERNAL_ERROR.code , format(ERROR.INTERNAL_ERROR, [error.message,errorStack]));
				return;
			}
		};

		/** @ignore */
		ClientImpl.prototype._on_socket_error = function (error) {
			if (!this._reconnecting) {
				this._disconnected(ERROR.SOCKET_ERROR.code , format(ERROR.SOCKET_ERROR, [error.data]));
			}
		};

		/** @ignore */
		ClientImpl.prototype._on_socket_close = function () {
			if (!this._reconnecting) {
				this._disconnected(ERROR.SOCKET_CLOSE.code , format(ERROR.SOCKET_CLOSE));
			}
		};

		/** @ignore */
		ClientImpl.prototype._socket_send = function (wireMessage) {

			if (wireMessage.type == 1) {
				var wireMessageMasked = this._traceMask(wireMessage, "password");
				this._trace("Client._socket_send", wireMessageMasked);
			}
			else this._trace("Client._socket_send", wireMessage);

			this.socket.send(wireMessage.encode());
			/* We have proved to the server we are alive. */
			this.sendPinger.reset();
		};

		/** @ignore */
		ClientImpl.prototype._receivePublish = function (wireMessage) {
			switch(wireMessage.payloadMessage.qos) {
			case "undefined":
			case 0:
				this._receiveMessage(wireMessage);
				break;

			case 1:
				var pubAckMessage = new WireMessage(MESSAGE_TYPE.PUBACK, {messageIdentifier:wireMessage.messageIdentifier});
				this._schedule_message(pubAckMessage);
				this._receiveMessage(wireMessage);
				break;

			case 2:
				this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
				this.store("Received:", wireMessage);
				var pubRecMessage = new WireMessage(MESSAGE_TYPE.PUBREC, {messageIdentifier:wireMessage.messageIdentifier});
				this._schedule_message(pubRecMessage);

				break;

			default:
				throw Error("Invaild qos=" + wireMessage.payloadMessage.qos);
			}
		};

		/** @ignore */
		ClientImpl.prototype._receiveMessage = function (wireMessage) {
			if (this.onMessageArrived) {
				this.onMessageArrived(wireMessage.payloadMessage);
			}
		};

		/**
	 * Client has connected.
	 * @param {reconnect} [boolean] indicate if this was a result of reconnect operation.
	 * @param {uri} [string] fully qualified WebSocket URI of the server.
	 */
		ClientImpl.prototype._connected = function (reconnect, uri) {
		// Execute the onConnected callback if there is one.
			if (this.onConnected)
				this.onConnected(reconnect, uri);
		};

		/**
	 * Attempts to reconnect the client to the server.
   * For each reconnect attempt, will double the reconnect interval
   * up to 128 seconds.
	 */
		ClientImpl.prototype._reconnect = function () {
			this._trace("Client._reconnect");
			if (!this.connected) {
				this._reconnecting = true;
				this.sendPinger.cancel();
				this.receivePinger.cancel();
				if (this._reconnectInterval < 128)
					this._reconnectInterval = this._reconnectInterval * 2;
				if (this.connectOptions.uris) {
					this.hostIndex = 0;
					this._doConnect(this.connectOptions.uris[0]);
				} else {
					this._doConnect(this.uri);
				}
			}
		};

		/**
	 * Client has disconnected either at its own request or because the server
	 * or network disconnected it. Remove all non-durable state.
	 * @param {errorCode} [number] the error number.
	 * @param {errorText} [string] the error text.
	 * @ignore
	 */
		ClientImpl.prototype._disconnected = function (errorCode, errorText) {
			this._trace("Client._disconnected", errorCode, errorText);

			if (errorCode !== undefined && this._reconnecting) {
				//Continue automatic reconnect process
				this._reconnectTimeout = new Timeout(this, this._reconnectInterval, this._reconnect);
				return;
			}

			this.sendPinger.cancel();
			this.receivePinger.cancel();
			if (this._connectTimeout) {
				this._connectTimeout.cancel();
				this._connectTimeout = null;
			}

			// Clear message buffers.
			this._msg_queue = [];
			this._buffered_msg_queue = [];
			this._notify_msg_sent = {};

			if (this.socket) {
			// Cancel all socket callbacks so that they cannot be driven again by this socket.
				this.socket.onopen = null;
				this.socket.onmessage = null;
				this.socket.onerror = null;
				this.socket.onclose = null;
				if (this.socket.readyState === 1)
					this.socket.close();
				delete this.socket;
			}

			if (this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length-1) {
			// Try the next host.
				this.hostIndex++;
				this._doConnect(this.connectOptions.uris[this.hostIndex]);
			} else {

				if (errorCode === undefined) {
					errorCode = ERROR.OK.code;
					errorText = format(ERROR.OK);
				}

				// Run any application callbacks last as they may attempt to reconnect and hence create a new socket.
				if (this.connected) {
					this.connected = false;
					// Execute the connectionLostCallback if there is one, and we were connected.
					if (this.onConnectionLost) {
						this.onConnectionLost({errorCode:errorCode, errorMessage:errorText, reconnect:this.connectOptions.reconnect, uri:this._wsuri});
					}
					if (errorCode !== ERROR.OK.code && this.connectOptions.reconnect) {
					// Start automatic reconnect process for the very first time since last successful connect.
						this._reconnectInterval = 1;
						this._reconnect();
						return;
					}
				} else {
				// Otherwise we never had a connection, so indicate that the connect has failed.
					if (this.connectOptions.mqttVersion === 4 && this.connectOptions.mqttVersionExplicit === false) {
						this._trace("Failed to connect V4, dropping back to V3");
						this.connectOptions.mqttVersion = 3;
						if (this.connectOptions.uris) {
							this.hostIndex = 0;
							this._doConnect(this.connectOptions.uris[0]);
						} else {
							this._doConnect(this.uri);
						}
					} else if(this.connectOptions.onFailure) {
						this.connectOptions.onFailure({invocationContext:this.connectOptions.invocationContext, errorCode:errorCode, errorMessage:errorText});
					}
				}
			}
		};

		/** @ignore */
		ClientImpl.prototype._trace = function () {
		// Pass trace message back to client's callback function
			if (this.traceFunction) {
				var args = Array.prototype.slice.call(arguments);
				for (var i in args)
				{
					if (typeof args[i] !== "undefined")
						args.splice(i, 1, JSON.stringify(args[i]));
				}
				var record = args.join("");
				this.traceFunction ({severity: "Debug", message: record	});
			}

			//buffer style trace
			if ( this._traceBuffer !== null ) {
				for (var i = 0, max = arguments.length; i < max; i++) {
					if ( this._traceBuffer.length == this._MAX_TRACE_ENTRIES ) {
						this._traceBuffer.shift();
					}
					if (i === 0) this._traceBuffer.push(arguments[i]);
					else if (typeof arguments[i] === "undefined" ) this._traceBuffer.push(arguments[i]);
					else this._traceBuffer.push("  "+JSON.stringify(arguments[i]));
				}
			}
		};

		/** @ignore */
		ClientImpl.prototype._traceMask = function (traceObject, masked) {
			var traceObjectMasked = {};
			for (var attr in traceObject) {
				if (traceObject.hasOwnProperty(attr)) {
					if (attr == masked)
						traceObjectMasked[attr] = "******";
					else
						traceObjectMasked[attr] = traceObject[attr];
				}
			}
			return traceObjectMasked;
		};

		// ------------------------------------------------------------------------
		// Public Programming interface.
		// ------------------------------------------------------------------------

		/**
	 * The JavaScript application communicates to the server using a {@link Paho.Client} object.
	 * <p>
	 * Most applications will create just one Client object and then call its connect() method,
	 * however applications can create more than one Client object if they wish.
	 * In this case the combination of host, port and clientId attributes must be different for each Client object.
	 * <p>
	 * The send, subscribe and unsubscribe methods are implemented as asynchronous JavaScript methods
	 * (even though the underlying protocol exchange might be synchronous in nature).
	 * This means they signal their completion by calling back to the application,
	 * via Success or Failure callback functions provided by the application on the method in question.
	 * Such callbacks are called at most once per method invocation and do not persist beyond the lifetime
	 * of the script that made the invocation.
	 * <p>
	 * In contrast there are some callback functions, most notably <i>onMessageArrived</i>,
	 * that are defined on the {@link Paho.Client} object.
	 * These may get called multiple times, and aren't directly related to specific method invocations made by the client.
	 *
	 * @name Paho.Client
	 *
	 * @constructor
	 *
	 * @param {string} host - the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.
	 * @param {number} port - the port number to connect to - only required if host is not a URI
	 * @param {string} path - the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.
	 * @param {string} clientId - the Messaging client identifier, between 1 and 23 characters in length.
	 *
	 * @property {string} host - <i>read only</i> the server's DNS hostname or dotted decimal IP address.
	 * @property {number} port - <i>read only</i> the server's port.
	 * @property {string} path - <i>read only</i> the server's path.
	 * @property {string} clientId - <i>read only</i> used when connecting to the server.
	 * @property {function} onConnectionLost - called when a connection has been lost.
	 *                            after a connect() method has succeeded.
	 *                            Establish the call back used when a connection has been lost. The connection may be
	 *                            lost because the client initiates a disconnect or because the server or network
	 *                            cause the client to be disconnected. The disconnect call back may be called without
	 *                            the connectionComplete call back being invoked if, for example the client fails to
	 *                            connect.
	 *                            A single response object parameter is passed to the onConnectionLost callback containing the following fields:
	 *                            <ol>
	 *                            <li>errorCode
	 *                            <li>errorMessage
	 *                            </ol>
	 * @property {function} onMessageDelivered - called when a message has been delivered.
	 *                            All processing that this Client will ever do has been completed. So, for example,
	 *                            in the case of a Qos=2 message sent by this client, the PubComp flow has been received from the server
	 *                            and the message has been removed from persistent storage before this callback is invoked.
	 *                            Parameters passed to the onMessageDelivered callback are:
	 *                            <ol>
	 *                            <li>{@link Paho.Message} that was delivered.
	 *                            </ol>
	 * @property {function} onMessageArrived - called when a message has arrived in this Paho.client.
	 *                            Parameters passed to the onMessageArrived callback are:
	 *                            <ol>
	 *                            <li>{@link Paho.Message} that has arrived.
	 *                            </ol>
	 * @property {function} onConnected - called when a connection is successfully made to the server.
	 *                                  after a connect() method.
	 *                                  Parameters passed to the onConnected callback are:
	 *                                  <ol>
	 *                                  <li>reconnect (boolean) - If true, the connection was the result of a reconnect.</li>
	 *                                  <li>URI (string) - The URI used to connect to the server.</li>
	 *                                  </ol>
	 * @property {boolean} disconnectedPublishing - if set, will enable disconnected publishing in
	 *                                            in the event that the connection to the server is lost.
	 * @property {number} disconnectedBufferSize - Used to set the maximum number of messages that the disconnected
	 *                                             buffer will hold before rejecting new messages. Default size: 5000 messages
	 * @property {function} trace - called whenever trace is called. TODO
	 */
		var Client = function (host, port, path, clientId) {

			var uri;

			if (typeof host !== "string")
				throw new Error(format(ERROR.INVALID_TYPE, [typeof host, "host"]));

			if (arguments.length == 2) {
			// host: must be full ws:// uri
			// port: clientId
				clientId = port;
				uri = host;
				var match = uri.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
				if (match) {
					host = match[4]||match[2];
					port = parseInt(match[7]);
					path = match[8];
				} else {
					throw new Error(format(ERROR.INVALID_ARGUMENT,[host,"host"]));
				}
			} else {
				if (arguments.length == 3) {
					clientId = path;
					path = "/mqtt";
				}
				if (typeof port !== "number" || port < 0)
					throw new Error(format(ERROR.INVALID_TYPE, [typeof port, "port"]));
				if (typeof path !== "string")
					throw new Error(format(ERROR.INVALID_TYPE, [typeof path, "path"]));

				var ipv6AddSBracket = (host.indexOf(":") !== -1 && host.slice(0,1) !== "[" && host.slice(-1) !== "]");
				uri = "ws://"+(ipv6AddSBracket?"["+host+"]":host)+":"+port+path;
			}

			var clientIdLength = 0;
			for (var i = 0; i<clientId.length; i++) {
				var charCode = clientId.charCodeAt(i);
				if (0xD800 <= charCode && charCode <= 0xDBFF)  {
					i++; // Surrogate pair.
				}
				clientIdLength++;
			}
			if (typeof clientId !== "string" || clientIdLength > 65535)
				throw new Error(format(ERROR.INVALID_ARGUMENT, [clientId, "clientId"]));

			var client = new ClientImpl(uri, host, port, path, clientId);

			//Public Properties
			Object.defineProperties(this,{
				"host":{
					get: function() { return host; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"port":{
					get: function() { return port; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"path":{
					get: function() { return path; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"uri":{
					get: function() { return uri; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"clientId":{
					get: function() { return client.clientId; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"onConnected":{
					get: function() { return client.onConnected; },
					set: function(newOnConnected) {
						if (typeof newOnConnected === "function")
							client.onConnected = newOnConnected;
						else
							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnected, "onConnected"]));
					}
				},
				"disconnectedPublishing":{
					get: function() { return client.disconnectedPublishing; },
					set: function(newDisconnectedPublishing) {
						client.disconnectedPublishing = newDisconnectedPublishing;
					}
				},
				"disconnectedBufferSize":{
					get: function() { return client.disconnectedBufferSize; },
					set: function(newDisconnectedBufferSize) {
						client.disconnectedBufferSize = newDisconnectedBufferSize;
					}
				},
				"onConnectionLost":{
					get: function() { return client.onConnectionLost; },
					set: function(newOnConnectionLost) {
						if (typeof newOnConnectionLost === "function")
							client.onConnectionLost = newOnConnectionLost;
						else
							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnectionLost, "onConnectionLost"]));
					}
				},
				"onMessageDelivered":{
					get: function() { return client.onMessageDelivered; },
					set: function(newOnMessageDelivered) {
						if (typeof newOnMessageDelivered === "function")
							client.onMessageDelivered = newOnMessageDelivered;
						else
							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageDelivered, "onMessageDelivered"]));
					}
				},
				"onMessageArrived":{
					get: function() { return client.onMessageArrived; },
					set: function(newOnMessageArrived) {
						if (typeof newOnMessageArrived === "function")
							client.onMessageArrived = newOnMessageArrived;
						else
							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageArrived, "onMessageArrived"]));
					}
				},
				"trace":{
					get: function() { return client.traceFunction; },
					set: function(trace) {
						if(typeof trace === "function"){
							client.traceFunction = trace;
						}else{
							throw new Error(format(ERROR.INVALID_TYPE, [typeof trace, "onTrace"]));
						}
					}
				},
			});

			/**
		 * Connect this Messaging client to its server.
		 *
		 * @name Paho.Client#connect
		 * @function
		 * @param {object} connectOptions - Attributes used with the connection.
		 * @param {number} connectOptions.timeout - If the connect has not succeeded within this
		 *                    number of seconds, it is deemed to have failed.
		 *                    The default is 30 seconds.
		 * @param {string} connectOptions.userName - Authentication username for this connection.
		 * @param {string} connectOptions.password - Authentication password for this connection.
		 * @param {Paho.Message} connectOptions.willMessage - sent by the server when the client
		 *                    disconnects abnormally.
		 * @param {number} connectOptions.keepAliveInterval - the server disconnects this client if
		 *                    there is no activity for this number of seconds.
		 *                    The default value of 60 seconds is assumed if not set.
		 * @param {boolean} connectOptions.cleanSession - if true(default) the client and server
		 *                    persistent state is deleted on successful connect.
		 * @param {boolean} connectOptions.useSSL - if present and true, use an SSL Websocket connection.
		 * @param {object} connectOptions.invocationContext - passed to the onSuccess callback or onFailure callback.
		 * @param {function} connectOptions.onSuccess - called when the connect acknowledgement
		 *                    has been received from the server.
		 * A single response object parameter is passed to the onSuccess callback containing the following fields:
		 * <ol>
		 * <li>invocationContext as passed in to the onSuccess method in the connectOptions.
		 * </ol>
	 * @param {function} connectOptions.onFailure - called when the connect request has failed or timed out.
		 * A single response object parameter is passed to the onFailure callback containing the following fields:
		 * <ol>
		 * <li>invocationContext as passed in to the onFailure method in the connectOptions.
		 * <li>errorCode a number indicating the nature of the error.
		 * <li>errorMessage text describing the error.
		 * </ol>
	 * @param {array} connectOptions.hosts - If present this contains either a set of hostnames or fully qualified
		 * WebSocket URIs (ws://iot.eclipse.org:80/ws), that are tried in order in place
		 * of the host and port paramater on the construtor. The hosts are tried one at at time in order until
		 * one of then succeeds.
	 * @param {array} connectOptions.ports - If present the set of ports matching the hosts. If hosts contains URIs, this property
		 * is not used.
	 * @param {boolean} connectOptions.reconnect - Sets whether the client will automatically attempt to reconnect
	 * to the server if the connection is lost.
	 *<ul>
	 *<li>If set to false, the client will not attempt to automatically reconnect to the server in the event that the
	 * connection is lost.</li>
	 *<li>If set to true, in the event that the connection is lost, the client will attempt to reconnect to the server.
	 * It will initially wait 1 second before it attempts to reconnect, for every failed reconnect attempt, the delay
	 * will double until it is at 2 minutes at which point the delay will stay at 2 minutes.</li>
	 *</ul>
	 * @param {number} connectOptions.mqttVersion - The version of MQTT to use to connect to the MQTT Broker.
	 *<ul>
	 *<li>3 - MQTT V3.1</li>
	 *<li>4 - MQTT V3.1.1</li>
	 *</ul>
	 * @param {boolean} connectOptions.mqttVersionExplicit - If set to true, will force the connection to use the
	 * selected MQTT Version or will fail to connect.
	 * @param {array} connectOptions.uris - If present, should contain a list of fully qualified WebSocket uris
	 * (e.g. ws://iot.eclipse.org:80/ws), that are tried in order in place of the host and port parameter of the construtor.
	 * The uris are tried one at a time in order until one of them succeeds. Do not use this in conjunction with hosts as
	 * the hosts array will be converted to uris and will overwrite this property.
		 * @throws {InvalidState} If the client is not in disconnected state. The client must have received connectionLost
		 * or disconnected before calling connect for a second or subsequent time.
		 */
			this.connect = function (connectOptions) {
				connectOptions = connectOptions || {} ;
				validate(connectOptions,  {timeout:"number",
					userName:"string",
					password:"string",
					willMessage:"object",
					keepAliveInterval:"number",
					cleanSession:"boolean",
					useSSL:"boolean",
					invocationContext:"object",
					onSuccess:"function",
					onFailure:"function",
					hosts:"object",
					ports:"object",
					reconnect:"boolean",
					mqttVersion:"number",
					mqttVersionExplicit:"boolean",
					uris: "object"});

				// If no keep alive interval is set, assume 60 seconds.
				if (connectOptions.keepAliveInterval === undefined)
					connectOptions.keepAliveInterval = 60;

				if (connectOptions.mqttVersion > 4 || connectOptions.mqttVersion < 3) {
					throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.mqttVersion, "connectOptions.mqttVersion"]));
				}

				if (connectOptions.mqttVersion === undefined) {
					connectOptions.mqttVersionExplicit = false;
					connectOptions.mqttVersion = 4;
				} else {
					connectOptions.mqttVersionExplicit = true;
				}

				//Check that if password is set, so is username
				if (connectOptions.password !== undefined && connectOptions.userName === undefined)
					throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.password, "connectOptions.password"]));

				if (connectOptions.willMessage) {
					if (!(connectOptions.willMessage instanceof Message))
						throw new Error(format(ERROR.INVALID_TYPE, [connectOptions.willMessage, "connectOptions.willMessage"]));
					// The will message must have a payload that can be represented as a string.
					// Cause the willMessage to throw an exception if this is not the case.
					connectOptions.willMessage.stringPayload = null;

					if (typeof connectOptions.willMessage.destinationName === "undefined")
						throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.willMessage.destinationName, "connectOptions.willMessage.destinationName"]));
				}
				if (typeof connectOptions.cleanSession === "undefined")
					connectOptions.cleanSession = true;
				if (connectOptions.hosts) {

					if (!(connectOptions.hosts instanceof Array) )
						throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
					if (connectOptions.hosts.length <1 )
						throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));

					var usingURIs = false;
					for (var i = 0; i<connectOptions.hosts.length; i++) {
						if (typeof connectOptions.hosts[i] !== "string")
							throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
						if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(connectOptions.hosts[i])) {
							if (i === 0) {
								usingURIs = true;
							} else if (!usingURIs) {
								throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
							}
						} else if (usingURIs) {
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
						}
					}

					if (!usingURIs) {
						if (!connectOptions.ports)
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
						if (!(connectOptions.ports instanceof Array) )
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
						if (connectOptions.hosts.length !== connectOptions.ports.length)
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));

						connectOptions.uris = [];

						for (var i = 0; i<connectOptions.hosts.length; i++) {
							if (typeof connectOptions.ports[i] !== "number" || connectOptions.ports[i] < 0)
								throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.ports[i], "connectOptions.ports["+i+"]"]));
							var host = connectOptions.hosts[i];
							var port = connectOptions.ports[i];

							var ipv6 = (host.indexOf(":") !== -1);
							uri = "ws://"+(ipv6?"["+host+"]":host)+":"+port+path;
							connectOptions.uris.push(uri);
						}
					} else {
						connectOptions.uris = connectOptions.hosts;
					}
				}

				client.connect(connectOptions);
			};

			/**
		 * Subscribe for messages, request receipt of a copy of messages sent to the destinations described by the filter.
		 *
		 * @name Paho.Client#subscribe
		 * @function
		 * @param {string} filter describing the destinations to receive messages from.
		 * <br>
		 * @param {object} subscribeOptions - used to control the subscription
		 *
		 * @param {number} subscribeOptions.qos - the maximum qos of any publications sent
		 *                                  as a result of making this subscription.
		 * @param {object} subscribeOptions.invocationContext - passed to the onSuccess callback
		 *                                  or onFailure callback.
		 * @param {function} subscribeOptions.onSuccess - called when the subscribe acknowledgement
		 *                                  has been received from the server.
		 *                                  A single response object parameter is passed to the onSuccess callback containing the following fields:
		 *                                  <ol>
		 *                                  <li>invocationContext if set in the subscribeOptions.
		 *                                  </ol>
		 * @param {function} subscribeOptions.onFailure - called when the subscribe request has failed or timed out.
		 *                                  A single response object parameter is passed to the onFailure callback containing the following fields:
		 *                                  <ol>
		 *                                  <li>invocationContext - if set in the subscribeOptions.
		 *                                  <li>errorCode - a number indicating the nature of the error.
		 *                                  <li>errorMessage - text describing the error.
		 *                                  </ol>
		 * @param {number} subscribeOptions.timeout - which, if present, determines the number of
		 *                                  seconds after which the onFailure calback is called.
		 *                                  The presence of a timeout does not prevent the onSuccess
		 *                                  callback from being called when the subscribe completes.
		 * @throws {InvalidState} if the client is not in connected state.
		 */
			this.subscribe = function (filter, subscribeOptions) {
				if (typeof filter !== "string" && filter.constructor !== Array)
					throw new Error("Invalid argument:"+filter);
				subscribeOptions = subscribeOptions || {} ;
				validate(subscribeOptions,  {qos:"number",
					invocationContext:"object",
					onSuccess:"function",
					onFailure:"function",
					timeout:"number"
				});
				if (subscribeOptions.timeout && !subscribeOptions.onFailure)
					throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
				if (typeof subscribeOptions.qos !== "undefined" && !(subscribeOptions.qos === 0 || subscribeOptions.qos === 1 || subscribeOptions.qos === 2 ))
					throw new Error(format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, "subscribeOptions.qos"]));
				client.subscribe(filter, subscribeOptions);
			};

		/**
		 * Unsubscribe for messages, stop receiving messages sent to destinations described by the filter.
		 *
		 * @name Paho.Client#unsubscribe
		 * @function
		 * @param {string} filter - describing the destinations to receive messages from.
		 * @param {object} unsubscribeOptions - used to control the subscription
		 * @param {object} unsubscribeOptions.invocationContext - passed to the onSuccess callback
											  or onFailure callback.
		 * @param {function} unsubscribeOptions.onSuccess - called when the unsubscribe acknowledgement has been received from the server.
		 *                                    A single response object parameter is passed to the
		 *                                    onSuccess callback containing the following fields:
		 *                                    <ol>
		 *                                    <li>invocationContext - if set in the unsubscribeOptions.
		 *                                    </ol>
		 * @param {function} unsubscribeOptions.onFailure called when the unsubscribe request has failed or timed out.
		 *                                    A single response object parameter is passed to the onFailure callback containing the following fields:
		 *                                    <ol>
		 *                                    <li>invocationContext - if set in the unsubscribeOptions.
		 *                                    <li>errorCode - a number indicating the nature of the error.
		 *                                    <li>errorMessage - text describing the error.
		 *                                    </ol>
		 * @param {number} unsubscribeOptions.timeout - which, if present, determines the number of seconds
		 *                                    after which the onFailure callback is called. The presence of
		 *                                    a timeout does not prevent the onSuccess callback from being
		 *                                    called when the unsubscribe completes
		 * @throws {InvalidState} if the client is not in connected state.
		 */
			this.unsubscribe = function (filter, unsubscribeOptions) {
				if (typeof filter !== "string" && filter.constructor !== Array)
					throw new Error("Invalid argument:"+filter);
				unsubscribeOptions = unsubscribeOptions || {} ;
				validate(unsubscribeOptions,  {invocationContext:"object",
					onSuccess:"function",
					onFailure:"function",
					timeout:"number"
				});
				if (unsubscribeOptions.timeout && !unsubscribeOptions.onFailure)
					throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
				client.unsubscribe(filter, unsubscribeOptions);
			};

			/**
		 * Send a message to the consumers of the destination in the Message.
		 *
		 * @name Paho.Client#send
		 * @function
		 * @param {string|Paho.Message} topic - <b>mandatory</b> The name of the destination to which the message is to be sent.
		 * 					   - If it is the only parameter, used as Paho.Message object.
		 * @param {String|ArrayBuffer} payload - The message data to be sent.
		 * @param {number} qos The Quality of Service used to deliver the message.
		 * 		<dl>
		 * 			<dt>0 Best effort (default).
		 *     			<dt>1 At least once.
		 *     			<dt>2 Exactly once.
		 * 		</dl>
		 * @param {Boolean} retained If true, the message is to be retained by the server and delivered
		 *                     to both current and future subscriptions.
		 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
		 *                     A received message has the retained boolean set to true if the message was published
		 *                     with the retained boolean set to true
		 *                     and the subscrption was made after the message has been published.
		 * @throws {InvalidState} if the client is not connected.
		 */
			this.send = function (topic,payload,qos,retained) {
				var message ;

				if(arguments.length === 0){
					throw new Error("Invalid argument."+"length");

				}else if(arguments.length == 1) {

					if (!(topic instanceof Message) && (typeof topic !== "string"))
						throw new Error("Invalid argument:"+ typeof topic);

					message = topic;
					if (typeof message.destinationName === "undefined")
						throw new Error(format(ERROR.INVALID_ARGUMENT,[message.destinationName,"Message.destinationName"]));
					client.send(message);

				}else {
				//parameter checking in Message object
					message = new Message(payload);
					message.destinationName = topic;
					if(arguments.length >= 3)
						message.qos = qos;
					if(arguments.length >= 4)
						message.retained = retained;
					client.send(message);
				}
			};

			/**
		 * Publish a message to the consumers of the destination in the Message.
		 * Synonym for Paho.Mqtt.Client#send
		 *
		 * @name Paho.Client#publish
		 * @function
		 * @param {string|Paho.Message} topic - <b>mandatory</b> The name of the topic to which the message is to be published.
		 * 					   - If it is the only parameter, used as Paho.Message object.
		 * @param {String|ArrayBuffer} payload - The message data to be published.
		 * @param {number} qos The Quality of Service used to deliver the message.
		 * 		<dl>
		 * 			<dt>0 Best effort (default).
		 *     			<dt>1 At least once.
		 *     			<dt>2 Exactly once.
		 * 		</dl>
		 * @param {Boolean} retained If true, the message is to be retained by the server and delivered
		 *                     to both current and future subscriptions.
		 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
		 *                     A received message has the retained boolean set to true if the message was published
		 *                     with the retained boolean set to true
		 *                     and the subscrption was made after the message has been published.
		 * @throws {InvalidState} if the client is not connected.
		 */
			this.publish = function(topic,payload,qos,retained) {
				var message ;

				if(arguments.length === 0){
					throw new Error("Invalid argument."+"length");

				}else if(arguments.length == 1) {

					if (!(topic instanceof Message) && (typeof topic !== "string"))
						throw new Error("Invalid argument:"+ typeof topic);

					message = topic;
					if (typeof message.destinationName === "undefined")
						throw new Error(format(ERROR.INVALID_ARGUMENT,[message.destinationName,"Message.destinationName"]));
					client.send(message);

				}else {
					//parameter checking in Message object
					message = new Message(payload);
					message.destinationName = topic;
					if(arguments.length >= 3)
						message.qos = qos;
					if(arguments.length >= 4)
						message.retained = retained;
					client.send(message);
				}
			};

			/**
		 * Normal disconnect of this Messaging client from its server.
		 *
		 * @name Paho.Client#disconnect
		 * @function
		 * @throws {InvalidState} if the client is already disconnected.
		 */
			this.disconnect = function () {
				client.disconnect();
			};

			/**
		 * Get the contents of the trace log.
		 *
		 * @name Paho.Client#getTraceLog
		 * @function
		 * @return {Object[]} tracebuffer containing the time ordered trace records.
		 */
			this.getTraceLog = function () {
				return client.getTraceLog();
			};

			/**
		 * Start tracing.
		 *
		 * @name Paho.Client#startTrace
		 * @function
		 */
			this.startTrace = function () {
				client.startTrace();
			};

			/**
		 * Stop tracing.
		 *
		 * @name Paho.Client#stopTrace
		 * @function
		 */
			this.stopTrace = function () {
				client.stopTrace();
			};

			this.isConnected = function() {
				return client.connected;
			};
		};

		/**
	 * An application message, sent or received.
	 * <p>
	 * All attributes may be null, which implies the default values.
	 *
	 * @name Paho.Message
	 * @constructor
	 * @param {String|ArrayBuffer} payload The message data to be sent.
	 * <p>
	 * @property {string} payloadString <i>read only</i> The payload as a string if the payload consists of valid UTF-8 characters.
	 * @property {ArrayBuffer} payloadBytes <i>read only</i> The payload as an ArrayBuffer.
	 * <p>
	 * @property {string} destinationName <b>mandatory</b> The name of the destination to which the message is to be sent
	 *                    (for messages about to be sent) or the name of the destination from which the message has been received.
	 *                    (for messages received by the onMessage function).
	 * <p>
	 * @property {number} qos The Quality of Service used to deliver the message.
	 * <dl>
	 *     <dt>0 Best effort (default).
	 *     <dt>1 At least once.
	 *     <dt>2 Exactly once.
	 * </dl>
	 * <p>
	 * @property {Boolean} retained If true, the message is to be retained by the server and delivered
	 *                     to both current and future subscriptions.
	 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
	 *                     A received message has the retained boolean set to true if the message was published
	 *                     with the retained boolean set to true
	 *                     and the subscrption was made after the message has been published.
	 * <p>
	 * @property {Boolean} duplicate <i>read only</i> If true, this message might be a duplicate of one which has already been received.
	 *                     This is only set on messages received from the server.
	 *
	 */
		var Message = function (newPayload) {
			var payload;
			if (   typeof newPayload === "string" ||
		newPayload instanceof ArrayBuffer ||
		(ArrayBuffer.isView(newPayload) && !(newPayload instanceof DataView))
			) {
				payload = newPayload;
			} else {
				throw (format(ERROR.INVALID_ARGUMENT, [newPayload, "newPayload"]));
			}

			var destinationName;
			var qos = 0;
			var retained = false;
			var duplicate = false;

			Object.defineProperties(this,{
				"payloadString":{
					enumerable : true,
					get : function () {
						if (typeof payload === "string")
							return payload;
						else
							return parseUTF8(payload, 0, payload.length);
					}
				},
				"payloadBytes":{
					enumerable: true,
					get: function() {
						if (typeof payload === "string") {
							var buffer = new ArrayBuffer(UTF8Length(payload));
							var byteStream = new Uint8Array(buffer);
							stringToUTF8(payload, byteStream, 0);

							return byteStream;
						} else {
							return payload;
						}
					}
				},
				"destinationName":{
					enumerable: true,
					get: function() { return destinationName; },
					set: function(newDestinationName) {
						if (typeof newDestinationName === "string")
							destinationName = newDestinationName;
						else
							throw new Error(format(ERROR.INVALID_ARGUMENT, [newDestinationName, "newDestinationName"]));
					}
				},
				"qos":{
					enumerable: true,
					get: function() { return qos; },
					set: function(newQos) {
						if (newQos === 0 || newQos === 1 || newQos === 2 )
							qos = newQos;
						else
							throw new Error("Invalid argument:"+newQos);
					}
				},
				"retained":{
					enumerable: true,
					get: function() { return retained; },
					set: function(newRetained) {
						if (typeof newRetained === "boolean")
							retained = newRetained;
						else
							throw new Error(format(ERROR.INVALID_ARGUMENT, [newRetained, "newRetained"]));
					}
				},
				"topic":{
					enumerable: true,
					get: function() { return destinationName; },
					set: function(newTopic) {destinationName=newTopic;}
				},
				"duplicate":{
					enumerable: true,
					get: function() { return duplicate; },
					set: function(newDuplicate) {duplicate=newDuplicate;}
				}
			});
		};

		// Module contents.
		return {
			Client: Client,
			Message: Message
		};
	// eslint-disable-next-line no-nested-ternary
	})(typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	return PahoMQTT;
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./web-component/mqttClient.js":
/*!*************************************!*\
  !*** ./web-component/mqttClient.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var paho_mqtt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! paho-mqtt */ "./node_modules/paho-mqtt/paho-mqtt.js");
/* harmony import */ var paho_mqtt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(paho_mqtt__WEBPACK_IMPORTED_MODULE_0__);


(function(){
    /**
     * @typedef {String} MQTT_TYPE
     * Dictionary for comparing mqtt types
     */
    const MQTT_TYPE = {
        sender: "sender",
        receiver: "receiver",
    };

    class MqttClient extends HTMLElement {
        get id() {
            return this.getAttribute('id');
        }

        get topic() {
            return this.getAttribute('topic');
        }

        get userId() {
            return this.getAttribute('userId');
        }

        set userId(val) {
            if (val !== '') {
                this.setAttribute('userId', val);
            } else {
                this.removeAttribute('userId');
            }
        }

        /**
         *
         * Constructor for setting up shadow dom and class definitions
         * for web component. The attributes are id, slot, and topic
         * @example <input-rt mode="textarea">
                        <mqtt-client id="receiver" slot="messenger" topic="chattest/1">
                        </mqtt-client>
                    </input-rt>
         * @class MQTT Client Web Component, This class provides functionality to send and fetch messages to and from a port, given a topic,
         * It can be attached to inputRT
         */
        constructor () {
            super();
            //eventually may want to try this approach: https://ayushgp.github.io/html-web-components-using-vanilla-js-part-3/

            // Initialize shadow root
            this.attachShadow({mode: 'open'});

            // Create a client instance
            /* eslint-disable no-undef */
            this.client = new paho_mqtt__WEBPACK_IMPORTED_MODULE_0___default.a.MQTT.Client("broker.mqttdashboard.com", Number(8000), "");

            this.client.onConnectionLost = function(responseObject){
                // TODO: Perhaps we should reflect connected as an attribute rather
                // than a console statement 
                /* eslint-disable no-console */
                console.log("Connection Lost" + responseObject.errorMessage);
            };

            // Connect the client
            const onConnect = function(){
                // TODO: Perhaps we should reflect connected as an attribute rather
                // than a console statement 
                /* eslint-disable no-console */
                console.log("Connected");
                this.client.subscribe(this.topic);
            }.bind(this);

            this.client.connect({onSuccess:onConnect});

            // TODO: this should be refactored so that it is stylable in a slot
            // and is more dev friendly
            if(this.userId == null){
                this.userId = "anonymous";
                const i = document.createElement('input');
                i.setAttribute("id","userId");
                i.setAttribute("name","userId");
                i.setAttribute("value","anonymous");
                this.shadowRoot.append(i);
            }
        }

        connectedCallback(){
            // Listen for userId Change
            const input = this.shadowRoot.querySelector('input');
            if(input !== null){
                input.addEventListener('change', ()=>{
                    this.userId = input.value;
                });
            }
            if(this.id == MQTT_TYPE.receiver){
                this.observe(this.parentElement.append);
            }
        }

        observe(callback){
            if(this.id == MQTT_TYPE.receiver){
                this.client.onMessageArrived = function(message){
                    callback(message.payloadString);
                };
            }
        }

        /**
         * Sends a message through the paho mqtt client on the topic specified
         * Message schema: "UserId: body"
         */
        send(body){
            if(this.id == MQTT_TYPE.sender){
                const message = this.userId + ": " + body;
                const mqtt_msg = new paho_mqtt__WEBPACK_IMPORTED_MODULE_0___default.a.MQTT.Message(message);
                mqtt_msg.destinationName = this.topic;
                this.client.send(mqtt_msg);
            }
        }
    }
    // Register mqttClient class as mqtt-client element
    customElements.define('mqtt-client', MqttClient);
})();


/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi ./web-component/mqttClient.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./web-component/mqttClient.js */"./web-component/mqttClient.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhaG8tbXF0dC9wYWhvLW1xdHQuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWItY29tcG9uZW50L21xdHRDbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsa0JB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QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRCxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwrQkFBK0I7QUFDMUQ7O0FBRUE7QUFDQSxrREFBa0QsNEJBQTRCLDJFQUEyRTtBQUN6Sjs7QUFFQTtBQUNBLGlEQUFpRCw0QkFBNEIseUdBQXlHO0FBQ3RMOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxtREFBbUQ7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVDQUF1Qyw4QkFBOEIsdURBQXVEO0FBQzVIO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLHFEQUFxRDtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0I7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixxQkFBcUI7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtRUFBbUUsZ0NBQWdDO0FBQ25HLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQSxpRUFBaUUsZ0RBQWdEO0FBQ2pIO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyx3REFBd0Q7QUFDN0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGdEQUFnRDtBQUNoSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsZ0RBQWdEO0FBQ2pIOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQThELGdEQUFnRDtBQUM5RztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOERBQThELGdEQUFnRDtBQUM5Rzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksVUFBVTtBQUN0QixZQUFZLElBQUk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksVUFBVTtBQUN0QixZQUFZLFVBQVU7QUFDdEI7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnREFBSTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoibXF0dC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQ29weXJpZ2h0IChjKSAyMDEzIElCTSBDb3JwLlxuICpcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHNcbiAqIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgdjEuMFxuICogYW5kIEVjbGlwc2UgRGlzdHJpYnV0aW9uIExpY2Vuc2UgdjEuMCB3aGljaCBhY2NvbXBhbnkgdGhpcyBkaXN0cmlidXRpb24uXG4gKlxuICogVGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgaXMgYXZhaWxhYmxlIGF0XG4gKiAgICBodHRwOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC12MTAuaHRtbFxuICogYW5kIHRoZSBFY2xpcHNlIERpc3RyaWJ1dGlvbiBMaWNlbnNlIGlzIGF2YWlsYWJsZSBhdFxuICogICBodHRwOi8vd3d3LmVjbGlwc2Uub3JnL29yZy9kb2N1bWVudHMvZWRsLXYxMC5waHAuXG4gKlxuICogQ29udHJpYnV0b3JzOlxuICogICAgQW5kcmV3IEJhbmtzIC0gaW5pdGlhbCBBUEkgYW5kIGltcGxlbWVudGF0aW9uIGFuZCBpbml0aWFsIGRvY3VtZW50YXRpb25cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbi8vIE9ubHkgZXhwb3NlIGEgc2luZ2xlIG9iamVjdCBuYW1lIGluIHRoZSBnbG9iYWwgbmFtZXNwYWNlLlxuLy8gRXZlcnl0aGluZyBtdXN0IGdvIHRocm91Z2ggdGhpcyBtb2R1bGUuIEdsb2JhbCBQYWhvIG1vZHVsZVxuLy8gb25seSBoYXMgYSBzaW5nbGUgcHVibGljIGZ1bmN0aW9uLCBjbGllbnQsIHdoaWNoIHJldHVybnNcbi8vIGEgUGFobyBjbGllbnQgb2JqZWN0IGdpdmVuIGNvbm5lY3Rpb24gZGV0YWlscy5cblxuLyoqXG4gKiBTZW5kIGFuZCByZWNlaXZlIG1lc3NhZ2VzIHVzaW5nIHdlYiBicm93c2Vycy5cbiAqIDxwPlxuICogVGhpcyBwcm9ncmFtbWluZyBpbnRlcmZhY2UgbGV0cyBhIEphdmFTY3JpcHQgY2xpZW50IGFwcGxpY2F0aW9uIHVzZSB0aGUgTVFUVCBWMy4xIG9yXG4gKiBWMy4xLjEgcHJvdG9jb2wgdG8gY29ubmVjdCB0byBhbiBNUVRULXN1cHBvcnRpbmcgbWVzc2FnaW5nIHNlcnZlci5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gc3VwcG9ydGVkIGluY2x1ZGVzOlxuICogPG9sPlxuICogPGxpPkNvbm5lY3RpbmcgdG8gYW5kIGRpc2Nvbm5lY3RpbmcgZnJvbSBhIHNlcnZlci4gVGhlIHNlcnZlciBpcyBpZGVudGlmaWVkIGJ5IGl0cyBob3N0IG5hbWUgYW5kIHBvcnQgbnVtYmVyLlxuICogPGxpPlNwZWNpZnlpbmcgb3B0aW9ucyB0aGF0IHJlbGF0ZSB0byB0aGUgY29tbXVuaWNhdGlvbnMgbGluayB3aXRoIHRoZSBzZXJ2ZXIsXG4gKiBmb3IgZXhhbXBsZSB0aGUgZnJlcXVlbmN5IG9mIGtlZXAtYWxpdmUgaGVhcnRiZWF0cywgYW5kIHdoZXRoZXIgU1NML1RMUyBpcyByZXF1aXJlZC5cbiAqIDxsaT5TdWJzY3JpYmluZyB0byBhbmQgcmVjZWl2aW5nIG1lc3NhZ2VzIGZyb20gTVFUVCBUb3BpY3MuXG4gKiA8bGk+UHVibGlzaGluZyBtZXNzYWdlcyB0byBNUVRUIFRvcGljcy5cbiAqIDwvb2w+XG4gKiA8cD5cbiAqIFRoZSBBUEkgY29uc2lzdHMgb2YgdHdvIG1haW4gb2JqZWN0czpcbiAqIDxkbD5cbiAqIDxkdD48Yj57QGxpbmsgUGFoby5DbGllbnR9PC9iPjwvZHQ+XG4gKiA8ZGQ+VGhpcyBjb250YWlucyBtZXRob2RzIHRoYXQgcHJvdmlkZSB0aGUgZnVuY3Rpb25hbGl0eSBvZiB0aGUgQVBJLFxuICogaW5jbHVkaW5nIHByb3Zpc2lvbiBvZiBjYWxsYmFja3MgdGhhdCBub3RpZnkgdGhlIGFwcGxpY2F0aW9uIHdoZW4gYSBtZXNzYWdlXG4gKiBhcnJpdmVzIGZyb20gb3IgaXMgZGVsaXZlcmVkIHRvIHRoZSBtZXNzYWdpbmcgc2VydmVyLFxuICogb3Igd2hlbiB0aGUgc3RhdHVzIG9mIGl0cyBjb25uZWN0aW9uIHRvIHRoZSBtZXNzYWdpbmcgc2VydmVyIGNoYW5nZXMuPC9kZD5cbiAqIDxkdD48Yj57QGxpbmsgUGFoby5NZXNzYWdlfTwvYj48L2R0PlxuICogPGRkPlRoaXMgZW5jYXBzdWxhdGVzIHRoZSBwYXlsb2FkIG9mIHRoZSBtZXNzYWdlIGFsb25nIHdpdGggdmFyaW91cyBhdHRyaWJ1dGVzXG4gKiBhc3NvY2lhdGVkIHdpdGggaXRzIGRlbGl2ZXJ5LCBpbiBwYXJ0aWN1bGFyIHRoZSBkZXN0aW5hdGlvbiB0byB3aGljaCBpdCBoYXNcbiAqIGJlZW4gKG9yIGlzIGFib3V0IHRvIGJlKSBzZW50LjwvZGQ+XG4gKiA8L2RsPlxuICogPHA+XG4gKiBUaGUgcHJvZ3JhbW1pbmcgaW50ZXJmYWNlIHZhbGlkYXRlcyBwYXJhbWV0ZXJzIHBhc3NlZCB0byBpdCwgYW5kIHdpbGwgdGhyb3dcbiAqIGFuIEVycm9yIGNvbnRhaW5pbmcgYW4gZXJyb3IgbWVzc2FnZSBpbnRlbmRlZCBmb3IgZGV2ZWxvcGVyIHVzZSwgaWYgaXQgZGV0ZWN0c1xuICogYW4gZXJyb3Igd2l0aCBhbnkgcGFyYW1ldGVyLlxuICogPHA+XG4gKiBFeGFtcGxlOlxuICpcbiAqIDxjb2RlPjxwcmU+XG52YXIgY2xpZW50ID0gbmV3IFBhaG8uTVFUVC5DbGllbnQobG9jYXRpb24uaG9zdG5hbWUsIE51bWJlcihsb2NhdGlvbi5wb3J0KSwgXCJjbGllbnRJZFwiKTtcbmNsaWVudC5vbkNvbm5lY3Rpb25Mb3N0ID0gb25Db25uZWN0aW9uTG9zdDtcbmNsaWVudC5vbk1lc3NhZ2VBcnJpdmVkID0gb25NZXNzYWdlQXJyaXZlZDtcbmNsaWVudC5jb25uZWN0KHtvblN1Y2Nlc3M6b25Db25uZWN0fSk7XG5cbmZ1bmN0aW9uIG9uQ29ubmVjdCgpIHtcbiAgLy8gT25jZSBhIGNvbm5lY3Rpb24gaGFzIGJlZW4gbWFkZSwgbWFrZSBhIHN1YnNjcmlwdGlvbiBhbmQgc2VuZCBhIG1lc3NhZ2UuXG4gIGNvbnNvbGUubG9nKFwib25Db25uZWN0XCIpO1xuICBjbGllbnQuc3Vic2NyaWJlKFwiL1dvcmxkXCIpO1xuICB2YXIgbWVzc2FnZSA9IG5ldyBQYWhvLk1RVFQuTWVzc2FnZShcIkhlbGxvXCIpO1xuICBtZXNzYWdlLmRlc3RpbmF0aW9uTmFtZSA9IFwiL1dvcmxkXCI7XG4gIGNsaWVudC5zZW5kKG1lc3NhZ2UpO1xufTtcbmZ1bmN0aW9uIG9uQ29ubmVjdGlvbkxvc3QocmVzcG9uc2VPYmplY3QpIHtcbiAgaWYgKHJlc3BvbnNlT2JqZWN0LmVycm9yQ29kZSAhPT0gMClcblx0Y29uc29sZS5sb2coXCJvbkNvbm5lY3Rpb25Mb3N0OlwiK3Jlc3BvbnNlT2JqZWN0LmVycm9yTWVzc2FnZSk7XG59O1xuZnVuY3Rpb24gb25NZXNzYWdlQXJyaXZlZChtZXNzYWdlKSB7XG4gIGNvbnNvbGUubG9nKFwib25NZXNzYWdlQXJyaXZlZDpcIittZXNzYWdlLnBheWxvYWRTdHJpbmcpO1xuICBjbGllbnQuZGlzY29ubmVjdCgpO1xufTtcbiAqIDwvcHJlPjwvY29kZT5cbiAqIEBuYW1lc3BhY2UgUGFob1xuICovXG5cbi8qIGpzaGludCBzaGFkb3c6dHJ1ZSAqL1xuKGZ1bmN0aW9uIEV4cG9ydExpYnJhcnkocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiKXtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCl7XG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKXtcblx0XHRleHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9IGVsc2Uge1xuXHRcdC8vaWYgKHR5cGVvZiByb290LlBhaG8gPT09IFwidW5kZWZpbmVkXCIpe1xuXHRcdC8vXHRyb290LlBhaG8gPSB7fTtcblx0XHQvL31cblx0XHRyb290LlBhaG8gPSBmYWN0b3J5KCk7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIExpYnJhcnlGYWN0b3J5KCl7XG5cblxuXHR2YXIgUGFob01RVFQgPSAoZnVuY3Rpb24gKGdsb2JhbCkge1xuXG5cdC8vIFByaXZhdGUgdmFyaWFibGVzIGJlbG93LCB0aGVzZSBhcmUgb25seSB2aXNpYmxlIGluc2lkZSB0aGUgZnVuY3Rpb24gY2xvc3VyZVxuXHQvLyB3aGljaCBpcyB1c2VkIHRvIGRlZmluZSB0aGUgbW9kdWxlLlxuXHR2YXIgdmVyc2lvbiA9IFwiQFZFUlNJT05ALUBCVUlMRExFVkVMQFwiO1xuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIGxvY2FsU3RvcmFnZSA9IGdsb2JhbC5sb2NhbFN0b3JhZ2UgfHwgKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgZGF0YSA9IHt9O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHNldEl0ZW06IGZ1bmN0aW9uIChrZXksIGl0ZW0pIHsgZGF0YVtrZXldID0gaXRlbTsgfSxcblx0XHRcdGdldEl0ZW06IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGRhdGFba2V5XTsgfSxcblx0XHRcdHJlbW92ZUl0ZW06IGZ1bmN0aW9uIChrZXkpIHsgZGVsZXRlIGRhdGFba2V5XTsgfSxcblx0XHR9O1xuXHR9KSgpO1xuXG5cdFx0LyoqXG5cdCAqIFVuaXF1ZSBtZXNzYWdlIHR5cGUgaWRlbnRpZmllcnMsIHdpdGggYXNzb2NpYXRlZFxuXHQgKiBhc3NvY2lhdGVkIGludGVnZXIgdmFsdWVzLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0XHR2YXIgTUVTU0FHRV9UWVBFID0ge1xuXHRcdFx0Q09OTkVDVDogMSxcblx0XHRcdENPTk5BQ0s6IDIsXG5cdFx0XHRQVUJMSVNIOiAzLFxuXHRcdFx0UFVCQUNLOiA0LFxuXHRcdFx0UFVCUkVDOiA1LFxuXHRcdFx0UFVCUkVMOiA2LFxuXHRcdFx0UFVCQ09NUDogNyxcblx0XHRcdFNVQlNDUklCRTogOCxcblx0XHRcdFNVQkFDSzogOSxcblx0XHRcdFVOU1VCU0NSSUJFOiAxMCxcblx0XHRcdFVOU1VCQUNLOiAxMSxcblx0XHRcdFBJTkdSRVE6IDEyLFxuXHRcdFx0UElOR1JFU1A6IDEzLFxuXHRcdFx0RElTQ09OTkVDVDogMTRcblx0XHR9O1xuXG5cdFx0Ly8gQ29sbGVjdGlvbiBvZiB1dGlsaXR5IG1ldGhvZHMgdXNlZCB0byBzaW1wbGlmeSBtb2R1bGUgY29kZVxuXHRcdC8vIGFuZCBwcm9tb3RlIHRoZSBEUlkgcGF0dGVybi5cblxuXHRcdC8qKlxuXHQgKiBWYWxpZGF0ZSBhbiBvYmplY3QncyBwYXJhbWV0ZXIgbmFtZXMgdG8gZW5zdXJlIHRoZXlcblx0ICogbWF0Y2ggYSBsaXN0IG9mIGV4cGVjdGVkIHZhcmlhYmxlcyBuYW1lIGZvciB0aGlzIG9wdGlvblxuXHQgKiB0eXBlLiBVc2VkIHRvIGVuc3VyZSBvcHRpb24gb2JqZWN0IHBhc3NlZCBpbnRvIHRoZSBBUEkgZG9uJ3Rcblx0ICogY29udGFpbiBlcnJvbmVvdXMgcGFyYW1ldGVycy5cblx0ICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIFVzZXIgb3B0aW9ucyBvYmplY3Rcblx0ICogQHBhcmFtIHtPYmplY3R9IGtleXMgLSB2YWxpZCBrZXlzIGFuZCB0eXBlcyB0aGF0IG1heSBleGlzdCBpbiBvYmouXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSBJbnZhbGlkIG9wdGlvbiBwYXJhbWV0ZXIgZm91bmQuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRcdHZhciB2YWxpZGF0ZSA9IGZ1bmN0aW9uKG9iaiwga2V5cykge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRpZiAoa2V5cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIG9ialtrZXldICE9PSBrZXlzW2tleV0pXG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuSU5WQUxJRF9UWVBFLCBbdHlwZW9mIG9ialtrZXldLCBrZXldKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHZhciBlcnJvclN0ciA9IFwiVW5rbm93biBwcm9wZXJ0eSwgXCIgKyBrZXkgKyBcIi4gVmFsaWQgcHJvcGVydGllcyBhcmU6XCI7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciB2YWxpZEtleSBpbiBrZXlzKVxuXHRcdFx0XHRcdFx0XHRpZiAoa2V5cy5oYXNPd25Qcm9wZXJ0eSh2YWxpZEtleSkpXG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3JTdHIgPSBlcnJvclN0citcIiBcIit2YWxpZEtleTtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihlcnJvclN0cik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHQgKiBSZXR1cm4gYSBuZXcgZnVuY3Rpb24gd2hpY2ggcnVucyB0aGUgdXNlciBmdW5jdGlvbiBib3VuZFxuXHQgKiB0byBhIGZpeGVkIHNjb3BlLlxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBVc2VyIGZ1bmN0aW9uXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBGdW5jdGlvbiBzY29wZVxuXHQgKiBAcmV0dXJuIHtmdW5jdGlvbn0gVXNlciBmdW5jdGlvbiBib3VuZCB0byBhbm90aGVyIHNjb3BlXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRcdHZhciBzY29wZSA9IGZ1bmN0aW9uIChmLCBzY29wZSkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIGYuYXBwbHkoc2NvcGUsIGFyZ3VtZW50cyk7XG5cdFx0XHR9O1xuXHRcdH07XG5cblx0XHQvKipcblx0ICogVW5pcXVlIG1lc3NhZ2UgdHlwZSBpZGVudGlmaWVycywgd2l0aCBhc3NvY2lhdGVkXG5cdCAqIGFzc29jaWF0ZWQgaW50ZWdlciB2YWx1ZXMuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRcdHZhciBFUlJPUiA9IHtcblx0XHRcdE9LOiB7Y29kZTowLCB0ZXh0OlwiQU1RSlNDMDAwMEkgT0suXCJ9LFxuXHRcdFx0Q09OTkVDVF9USU1FT1VUOiB7Y29kZToxLCB0ZXh0OlwiQU1RSlNDMDAwMUUgQ29ubmVjdCB0aW1lZCBvdXQuXCJ9LFxuXHRcdFx0U1VCU0NSSUJFX1RJTUVPVVQ6IHtjb2RlOjIsIHRleHQ6XCJBTVFKUzAwMDJFIFN1YnNjcmliZSB0aW1lZCBvdXQuXCJ9LFxuXHRcdFx0VU5TVUJTQ1JJQkVfVElNRU9VVDoge2NvZGU6MywgdGV4dDpcIkFNUUpTMDAwM0UgVW5zdWJzY3JpYmUgdGltZWQgb3V0LlwifSxcblx0XHRcdFBJTkdfVElNRU9VVDoge2NvZGU6NCwgdGV4dDpcIkFNUUpTMDAwNEUgUGluZyB0aW1lZCBvdXQuXCJ9LFxuXHRcdFx0SU5URVJOQUxfRVJST1I6IHtjb2RlOjUsIHRleHQ6XCJBTVFKUzAwMDVFIEludGVybmFsIGVycm9yLiBFcnJvciBNZXNzYWdlOiB7MH0sIFN0YWNrIHRyYWNlOiB7MX1cIn0sXG5cdFx0XHRDT05OQUNLX1JFVFVSTkNPREU6IHtjb2RlOjYsIHRleHQ6XCJBTVFKUzAwMDZFIEJhZCBDb25uYWNrIHJldHVybiBjb2RlOnswfSB7MX0uXCJ9LFxuXHRcdFx0U09DS0VUX0VSUk9SOiB7Y29kZTo3LCB0ZXh0OlwiQU1RSlMwMDA3RSBTb2NrZXQgZXJyb3I6ezB9LlwifSxcblx0XHRcdFNPQ0tFVF9DTE9TRToge2NvZGU6OCwgdGV4dDpcIkFNUUpTMDAwOEkgU29ja2V0IGNsb3NlZC5cIn0sXG5cdFx0XHRNQUxGT1JNRURfVVRGOiB7Y29kZTo5LCB0ZXh0OlwiQU1RSlMwMDA5RSBNYWxmb3JtZWQgVVRGIGRhdGE6ezB9IHsxfSB7Mn0uXCJ9LFxuXHRcdFx0VU5TVVBQT1JURUQ6IHtjb2RlOjEwLCB0ZXh0OlwiQU1RSlMwMDEwRSB7MH0gaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIGJyb3dzZXIuXCJ9LFxuXHRcdFx0SU5WQUxJRF9TVEFURToge2NvZGU6MTEsIHRleHQ6XCJBTVFKUzAwMTFFIEludmFsaWQgc3RhdGUgezB9LlwifSxcblx0XHRcdElOVkFMSURfVFlQRToge2NvZGU6MTIsIHRleHQ6XCJBTVFKUzAwMTJFIEludmFsaWQgdHlwZSB7MH0gZm9yIHsxfS5cIn0sXG5cdFx0XHRJTlZBTElEX0FSR1VNRU5UOiB7Y29kZToxMywgdGV4dDpcIkFNUUpTMDAxM0UgSW52YWxpZCBhcmd1bWVudCB7MH0gZm9yIHsxfS5cIn0sXG5cdFx0XHRVTlNVUFBPUlRFRF9PUEVSQVRJT046IHtjb2RlOjE0LCB0ZXh0OlwiQU1RSlMwMDE0RSBVbnN1cHBvcnRlZCBvcGVyYXRpb24uXCJ9LFxuXHRcdFx0SU5WQUxJRF9TVE9SRURfREFUQToge2NvZGU6MTUsIHRleHQ6XCJBTVFKUzAwMTVFIEludmFsaWQgZGF0YSBpbiBsb2NhbCBzdG9yYWdlIGtleT17MH0gdmFsdWU9ezF9LlwifSxcblx0XHRcdElOVkFMSURfTVFUVF9NRVNTQUdFX1RZUEU6IHtjb2RlOjE2LCB0ZXh0OlwiQU1RSlMwMDE2RSBJbnZhbGlkIE1RVFQgbWVzc2FnZSB0eXBlIHswfS5cIn0sXG5cdFx0XHRNQUxGT1JNRURfVU5JQ09ERToge2NvZGU6MTcsIHRleHQ6XCJBTVFKUzAwMTdFIE1hbGZvcm1lZCBVbmljb2RlIHN0cmluZzp7MH0gezF9LlwifSxcblx0XHRcdEJVRkZFUl9GVUxMOiB7Y29kZToxOCwgdGV4dDpcIkFNUUpTMDAxOEUgTWVzc2FnZSBidWZmZXIgaXMgZnVsbCwgbWF4aW11bSBidWZmZXIgc2l6ZTogezB9LlwifSxcblx0XHR9O1xuXG5cdFx0LyoqIENPTk5BQ0sgUkMgTWVhbmluZy4gKi9cblx0XHR2YXIgQ09OTkFDS19SQyA9IHtcblx0XHRcdDA6XCJDb25uZWN0aW9uIEFjY2VwdGVkXCIsXG5cdFx0XHQxOlwiQ29ubmVjdGlvbiBSZWZ1c2VkOiB1bmFjY2VwdGFibGUgcHJvdG9jb2wgdmVyc2lvblwiLFxuXHRcdFx0MjpcIkNvbm5lY3Rpb24gUmVmdXNlZDogaWRlbnRpZmllciByZWplY3RlZFwiLFxuXHRcdFx0MzpcIkNvbm5lY3Rpb24gUmVmdXNlZDogc2VydmVyIHVuYXZhaWxhYmxlXCIsXG5cdFx0XHQ0OlwiQ29ubmVjdGlvbiBSZWZ1c2VkOiBiYWQgdXNlciBuYW1lIG9yIHBhc3N3b3JkXCIsXG5cdFx0XHQ1OlwiQ29ubmVjdGlvbiBSZWZ1c2VkOiBub3QgYXV0aG9yaXplZFwiXG5cdFx0fTtcblxuXHQvKipcblx0ICogRm9ybWF0IGFuIGVycm9yIG1lc3NhZ2UgdGV4dC5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtlcnJvcn0gRVJST1IgdmFsdWUgYWJvdmUuXG5cdCAqIEBwYXJhbSB7c3Vic3RpdHV0aW9uc30gW2FycmF5XSBzdWJzdGl0dXRlZCBpbnRvIHRoZSB0ZXh0LlxuXHQgKiBAcmV0dXJuIHRoZSB0ZXh0IHdpdGggdGhlIHN1YnN0aXR1dGlvbnMgbWFkZS5cblx0ICovXG5cdFx0dmFyIGZvcm1hdCA9IGZ1bmN0aW9uKGVycm9yLCBzdWJzdGl0dXRpb25zKSB7XG5cdFx0XHR2YXIgdGV4dCA9IGVycm9yLnRleHQ7XG5cdFx0XHRpZiAoc3Vic3RpdHV0aW9ucykge1xuXHRcdFx0XHR2YXIgZmllbGQsc3RhcnQ7XG5cdFx0XHRcdGZvciAodmFyIGk9MDsgaTxzdWJzdGl0dXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0ZmllbGQgPSBcIntcIitpK1wifVwiO1xuXHRcdFx0XHRcdHN0YXJ0ID0gdGV4dC5pbmRleE9mKGZpZWxkKTtcblx0XHRcdFx0XHRpZihzdGFydCA+IDApIHtcblx0XHRcdFx0XHRcdHZhciBwYXJ0MSA9IHRleHQuc3Vic3RyaW5nKDAsc3RhcnQpO1xuXHRcdFx0XHRcdFx0dmFyIHBhcnQyID0gdGV4dC5zdWJzdHJpbmcoc3RhcnQrZmllbGQubGVuZ3RoKTtcblx0XHRcdFx0XHRcdHRleHQgPSBwYXJ0MStzdWJzdGl0dXRpb25zW2ldK3BhcnQyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0fTtcblxuXHRcdC8vTVFUVCBwcm90b2NvbCBhbmQgdmVyc2lvbiAgICAgICAgICA2ICAgIE0gICAgUSAgICBJICAgIHMgICAgZCAgICBwICAgIDNcblx0XHR2YXIgTXF0dFByb3RvSWRlbnRpZmllcnYzID0gWzB4MDAsMHgwNiwweDRkLDB4NTEsMHg0OSwweDczLDB4NjQsMHg3MCwweDAzXTtcblx0XHQvL01RVFQgcHJvdG8vdmVyc2lvbiBmb3IgMzExICAgICAgICAgNCAgICBNICAgIFEgICAgVCAgICBUICAgIDRcblx0XHR2YXIgTXF0dFByb3RvSWRlbnRpZmllcnY0ID0gWzB4MDAsMHgwNCwweDRkLDB4NTEsMHg1NCwweDU0LDB4MDRdO1xuXG5cdFx0LyoqXG5cdCAqIENvbnN0cnVjdCBhbiBNUVRUIHdpcmUgcHJvdG9jb2wgbWVzc2FnZS5cblx0ICogQHBhcmFtIHR5cGUgTVFUVCBwYWNrZXQgdHlwZS5cblx0ICogQHBhcmFtIG9wdGlvbnMgb3B0aW9uYWwgd2lyZSBtZXNzYWdlIGF0dHJpYnV0ZXMuXG5cdCAqXG5cdCAqIE9wdGlvbmFsIHByb3BlcnRpZXNcblx0ICpcblx0ICogbWVzc2FnZUlkZW50aWZpZXI6IG1lc3NhZ2UgSUQgaW4gdGhlIHJhbmdlIFswLi42NTUzNV1cblx0ICogcGF5bG9hZE1lc3NhZ2U6XHRBcHBsaWNhdGlvbiBNZXNzYWdlIC0gUFVCTElTSCBvbmx5XG5cdCAqIGNvbm5lY3RTdHJpbmdzOlx0YXJyYXkgb2YgMCBvciBtb3JlIFN0cmluZ3MgdG8gYmUgcHV0IGludG8gdGhlIENPTk5FQ1QgcGF5bG9hZFxuXHQgKiB0b3BpY3M6XHRcdFx0YXJyYXkgb2Ygc3RyaW5ncyAoU1VCU0NSSUJFLCBVTlNVQlNDUklCRSlcblx0ICogcmVxdWVzdFFvUzpcdFx0YXJyYXkgb2YgUW9TIHZhbHVlcyBbMC4uMl1cblx0ICpcblx0ICogXCJGbGFnXCIgcHJvcGVydGllc1xuXHQgKiBjbGVhblNlc3Npb246XHR0cnVlIGlmIHByZXNlbnQgLyBmYWxzZSBpZiBhYnNlbnQgKENPTk5FQ1QpXG5cdCAqIHdpbGxNZXNzYWdlOiAgXHR0cnVlIGlmIHByZXNlbnQgLyBmYWxzZSBpZiBhYnNlbnQgKENPTk5FQ1QpXG5cdCAqIGlzUmV0YWluZWQ6XHRcdHRydWUgaWYgcHJlc2VudCAvIGZhbHNlIGlmIGFic2VudCAoQ09OTkVDVClcblx0ICogdXNlck5hbWU6XHRcdHRydWUgaWYgcHJlc2VudCAvIGZhbHNlIGlmIGFic2VudCAoQ09OTkVDVClcblx0ICogcGFzc3dvcmQ6XHRcdHRydWUgaWYgcHJlc2VudCAvIGZhbHNlIGlmIGFic2VudCAoQ09OTkVDVClcblx0ICoga2VlcEFsaXZlSW50ZXJ2YWw6XHRpbnRlZ2VyIFswLi42NTUzNV0gIChDT05ORUNUKVxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAaWdub3JlXG5cdCAqL1xuXHRcdHZhciBXaXJlTWVzc2FnZSA9IGZ1bmN0aW9uICh0eXBlLCBvcHRpb25zKSB7XG5cdFx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHRcdFx0Zm9yICh2YXIgbmFtZSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG5cdFx0XHRcdFx0dGhpc1tuYW1lXSA9IG9wdGlvbnNbbmFtZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0V2lyZU1lc3NhZ2UucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uKCkge1xuXHRcdC8vIENvbXB1dGUgdGhlIGZpcnN0IGJ5dGUgb2YgdGhlIGZpeGVkIGhlYWRlclxuXHRcdFx0dmFyIGZpcnN0ID0gKCh0aGlzLnR5cGUgJiAweDBmKSA8PCA0KTtcblxuXHRcdFx0Lypcblx0XHQgKiBOb3cgY2FsY3VsYXRlIHRoZSBsZW5ndGggb2YgdGhlIHZhcmlhYmxlIGhlYWRlciArIHBheWxvYWQgYnkgYWRkaW5nIHVwIHRoZSBsZW5ndGhzXG5cdFx0ICogb2YgYWxsIHRoZSBjb21wb25lbnQgcGFydHNcblx0XHQgKi9cblxuXHRcdFx0dmFyIHJlbUxlbmd0aCA9IDA7XG5cdFx0XHR2YXIgdG9waWNTdHJMZW5ndGggPSBbXTtcblx0XHRcdHZhciBkZXN0aW5hdGlvbk5hbWVMZW5ndGggPSAwO1xuXHRcdFx0dmFyIHdpbGxNZXNzYWdlUGF5bG9hZEJ5dGVzO1xuXG5cdFx0XHQvLyBpZiB0aGUgbWVzc2FnZSBjb250YWlucyBhIG1lc3NhZ2VJZGVudGlmaWVyIHRoZW4gd2UgbmVlZCB0d28gYnl0ZXMgZm9yIHRoYXRcblx0XHRcdGlmICh0aGlzLm1lc3NhZ2VJZGVudGlmaWVyICE9PSB1bmRlZmluZWQpXG5cdFx0XHRcdHJlbUxlbmd0aCArPSAyO1xuXG5cdFx0XHRzd2l0Y2godGhpcy50eXBlKSB7XG5cdFx0XHQvLyBJZiB0aGlzIGEgQ29ubmVjdCB0aGVuIHdlIG5lZWQgdG8gaW5jbHVkZSAxMiBieXRlcyBmb3IgaXRzIGhlYWRlclxuXHRcdFx0Y2FzZSBNRVNTQUdFX1RZUEUuQ09OTkVDVDpcblx0XHRcdFx0c3dpdGNoKHRoaXMubXF0dFZlcnNpb24pIHtcblx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdHJlbUxlbmd0aCArPSBNcXR0UHJvdG9JZGVudGlmaWVydjMubGVuZ3RoICsgMztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0OlxuXHRcdFx0XHRcdHJlbUxlbmd0aCArPSBNcXR0UHJvdG9JZGVudGlmaWVydjQubGVuZ3RoICsgMztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlbUxlbmd0aCArPSBVVEY4TGVuZ3RoKHRoaXMuY2xpZW50SWQpICsgMjtcblx0XHRcdFx0aWYgKHRoaXMud2lsbE1lc3NhZ2UgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHJlbUxlbmd0aCArPSBVVEY4TGVuZ3RoKHRoaXMud2lsbE1lc3NhZ2UuZGVzdGluYXRpb25OYW1lKSArIDI7XG5cdFx0XHRcdFx0Ly8gV2lsbCBtZXNzYWdlIGlzIGFsd2F5cyBhIHN0cmluZywgc2VudCBhcyBVVEYtOCBjaGFyYWN0ZXJzIHdpdGggYSBwcmVjZWRpbmcgbGVuZ3RoLlxuXHRcdFx0XHRcdHdpbGxNZXNzYWdlUGF5bG9hZEJ5dGVzID0gdGhpcy53aWxsTWVzc2FnZS5wYXlsb2FkQnl0ZXM7XG5cdFx0XHRcdFx0aWYgKCEod2lsbE1lc3NhZ2VQYXlsb2FkQnl0ZXMgaW5zdGFuY2VvZiBVaW50OEFycmF5KSlcblx0XHRcdFx0XHRcdHdpbGxNZXNzYWdlUGF5bG9hZEJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkocGF5bG9hZEJ5dGVzKTtcblx0XHRcdFx0XHRyZW1MZW5ndGggKz0gd2lsbE1lc3NhZ2VQYXlsb2FkQnl0ZXMuYnl0ZUxlbmd0aCArMjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy51c2VyTmFtZSAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdHJlbUxlbmd0aCArPSBVVEY4TGVuZ3RoKHRoaXMudXNlck5hbWUpICsgMjtcblx0XHRcdFx0aWYgKHRoaXMucGFzc3dvcmQgIT09IHVuZGVmaW5lZClcblx0XHRcdFx0XHRyZW1MZW5ndGggKz0gVVRGOExlbmd0aCh0aGlzLnBhc3N3b3JkKSArIDI7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvLyBTdWJzY3JpYmUsIFVuc3Vic2NyaWJlIGNhbiBib3RoIGNvbnRhaW4gdG9waWMgc3RyaW5nc1xuXHRcdFx0Y2FzZSBNRVNTQUdFX1RZUEUuU1VCU0NSSUJFOlxuXHRcdFx0XHRmaXJzdCB8PSAweDAyOyAvLyBRb3MgPSAxO1xuXHRcdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCB0aGlzLnRvcGljcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHRvcGljU3RyTGVuZ3RoW2ldID0gVVRGOExlbmd0aCh0aGlzLnRvcGljc1tpXSk7XG5cdFx0XHRcdFx0cmVtTGVuZ3RoICs9IHRvcGljU3RyTGVuZ3RoW2ldICsgMjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZW1MZW5ndGggKz0gdGhpcy5yZXF1ZXN0ZWRRb3MubGVuZ3RoOyAvLyAxIGJ5dGUgZm9yIGVhY2ggdG9waWMncyBRb3Ncblx0XHRcdFx0Ly8gUW9TIG9uIFN1YnNjcmliZSBvbmx5XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIE1FU1NBR0VfVFlQRS5VTlNVQlNDUklCRTpcblx0XHRcdFx0Zmlyc3QgfD0gMHgwMjsgLy8gUW9zID0gMTtcblx0XHRcdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgdGhpcy50b3BpY3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0b3BpY1N0ckxlbmd0aFtpXSA9IFVURjhMZW5ndGgodGhpcy50b3BpY3NbaV0pO1xuXHRcdFx0XHRcdHJlbUxlbmd0aCArPSB0b3BpY1N0ckxlbmd0aFtpXSArIDI7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgTUVTU0FHRV9UWVBFLlBVQlJFTDpcblx0XHRcdFx0Zmlyc3QgfD0gMHgwMjsgLy8gUW9zID0gMTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgTUVTU0FHRV9UWVBFLlBVQkxJU0g6XG5cdFx0XHRcdGlmICh0aGlzLnBheWxvYWRNZXNzYWdlLmR1cGxpY2F0ZSkgZmlyc3QgfD0gMHgwODtcblx0XHRcdFx0Zmlyc3QgID0gZmlyc3QgfD0gKHRoaXMucGF5bG9hZE1lc3NhZ2UucW9zIDw8IDEpO1xuXHRcdFx0XHRpZiAodGhpcy5wYXlsb2FkTWVzc2FnZS5yZXRhaW5lZCkgZmlyc3QgfD0gMHgwMTtcblx0XHRcdFx0ZGVzdGluYXRpb25OYW1lTGVuZ3RoID0gVVRGOExlbmd0aCh0aGlzLnBheWxvYWRNZXNzYWdlLmRlc3RpbmF0aW9uTmFtZSk7XG5cdFx0XHRcdHJlbUxlbmd0aCArPSBkZXN0aW5hdGlvbk5hbWVMZW5ndGggKyAyO1xuXHRcdFx0XHR2YXIgcGF5bG9hZEJ5dGVzID0gdGhpcy5wYXlsb2FkTWVzc2FnZS5wYXlsb2FkQnl0ZXM7XG5cdFx0XHRcdHJlbUxlbmd0aCArPSBwYXlsb2FkQnl0ZXMuYnl0ZUxlbmd0aDtcblx0XHRcdFx0aWYgKHBheWxvYWRCeXRlcyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKVxuXHRcdFx0XHRcdHBheWxvYWRCeXRlcyA9IG5ldyBVaW50OEFycmF5KHBheWxvYWRCeXRlcyk7XG5cdFx0XHRcdGVsc2UgaWYgKCEocGF5bG9hZEJ5dGVzIGluc3RhbmNlb2YgVWludDhBcnJheSkpXG5cdFx0XHRcdFx0cGF5bG9hZEJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkocGF5bG9hZEJ5dGVzLmJ1ZmZlcik7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIE1FU1NBR0VfVFlQRS5ESVNDT05ORUNUOlxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5vdyB3ZSBjYW4gYWxsb2NhdGUgYSBidWZmZXIgZm9yIHRoZSBtZXNzYWdlXG5cblx0XHRcdHZhciBtYmkgPSBlbmNvZGVNQkkocmVtTGVuZ3RoKTsgIC8vIENvbnZlcnQgdGhlIGxlbmd0aCB0byBNUVRUIE1CSSBmb3JtYXRcblx0XHRcdHZhciBwb3MgPSBtYmkubGVuZ3RoICsgMTsgICAgICAgIC8vIE9mZnNldCBvZiBzdGFydCBvZiB2YXJpYWJsZSBoZWFkZXJcblx0XHRcdHZhciBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIocmVtTGVuZ3RoICsgcG9zKTtcblx0XHRcdHZhciBieXRlU3RyZWFtID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKTsgICAgLy8gdmlldyBpdCBhcyBhIHNlcXVlbmNlIG9mIGJ5dGVzXG5cblx0XHRcdC8vV3JpdGUgdGhlIGZpeGVkIGhlYWRlciBpbnRvIHRoZSBidWZmZXJcblx0XHRcdGJ5dGVTdHJlYW1bMF0gPSBmaXJzdDtcblx0XHRcdGJ5dGVTdHJlYW0uc2V0KG1iaSwxKTtcblxuXHRcdFx0Ly8gSWYgdGhpcyBpcyBhIFBVQkxJU0ggdGhlbiB0aGUgdmFyaWFibGUgaGVhZGVyIHN0YXJ0cyB3aXRoIGEgdG9waWNcblx0XHRcdGlmICh0aGlzLnR5cGUgPT0gTUVTU0FHRV9UWVBFLlBVQkxJU0gpXG5cdFx0XHRcdHBvcyA9IHdyaXRlU3RyaW5nKHRoaXMucGF5bG9hZE1lc3NhZ2UuZGVzdGluYXRpb25OYW1lLCBkZXN0aW5hdGlvbk5hbWVMZW5ndGgsIGJ5dGVTdHJlYW0sIHBvcyk7XG5cdFx0XHQvLyBJZiB0aGlzIGlzIGEgQ09OTkVDVCB0aGVuIHRoZSB2YXJpYWJsZSBoZWFkZXIgY29udGFpbnMgdGhlIHByb3RvY29sIG5hbWUvdmVyc2lvbiwgZmxhZ3MgYW5kIGtlZXBhbGl2ZSB0aW1lXG5cblx0XHRcdGVsc2UgaWYgKHRoaXMudHlwZSA9PSBNRVNTQUdFX1RZUEUuQ09OTkVDVCkge1xuXHRcdFx0XHRzd2l0Y2ggKHRoaXMubXF0dFZlcnNpb24pIHtcblx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdGJ5dGVTdHJlYW0uc2V0KE1xdHRQcm90b0lkZW50aWZpZXJ2MywgcG9zKTtcblx0XHRcdFx0XHRwb3MgKz0gTXF0dFByb3RvSWRlbnRpZmllcnYzLmxlbmd0aDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0OlxuXHRcdFx0XHRcdGJ5dGVTdHJlYW0uc2V0KE1xdHRQcm90b0lkZW50aWZpZXJ2NCwgcG9zKTtcblx0XHRcdFx0XHRwb3MgKz0gTXF0dFByb3RvSWRlbnRpZmllcnY0Lmxlbmd0aDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgY29ubmVjdEZsYWdzID0gMDtcblx0XHRcdFx0aWYgKHRoaXMuY2xlYW5TZXNzaW9uKVxuXHRcdFx0XHRcdGNvbm5lY3RGbGFncyA9IDB4MDI7XG5cdFx0XHRcdGlmICh0aGlzLndpbGxNZXNzYWdlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0Y29ubmVjdEZsYWdzIHw9IDB4MDQ7XG5cdFx0XHRcdFx0Y29ubmVjdEZsYWdzIHw9ICh0aGlzLndpbGxNZXNzYWdlLnFvczw8Myk7XG5cdFx0XHRcdFx0aWYgKHRoaXMud2lsbE1lc3NhZ2UucmV0YWluZWQpIHtcblx0XHRcdFx0XHRcdGNvbm5lY3RGbGFncyB8PSAweDIwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy51c2VyTmFtZSAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdGNvbm5lY3RGbGFncyB8PSAweDgwO1xuXHRcdFx0XHRpZiAodGhpcy5wYXNzd29yZCAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdGNvbm5lY3RGbGFncyB8PSAweDQwO1xuXHRcdFx0XHRieXRlU3RyZWFtW3BvcysrXSA9IGNvbm5lY3RGbGFncztcblx0XHRcdFx0cG9zID0gd3JpdGVVaW50MTYgKHRoaXMua2VlcEFsaXZlSW50ZXJ2YWwsIGJ5dGVTdHJlYW0sIHBvcyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE91dHB1dCB0aGUgbWVzc2FnZUlkZW50aWZpZXIgLSBpZiB0aGVyZSBpcyBvbmVcblx0XHRcdGlmICh0aGlzLm1lc3NhZ2VJZGVudGlmaWVyICE9PSB1bmRlZmluZWQpXG5cdFx0XHRcdHBvcyA9IHdyaXRlVWludDE2ICh0aGlzLm1lc3NhZ2VJZGVudGlmaWVyLCBieXRlU3RyZWFtLCBwb3MpO1xuXG5cdFx0XHRzd2l0Y2godGhpcy50eXBlKSB7XG5cdFx0XHRjYXNlIE1FU1NBR0VfVFlQRS5DT05ORUNUOlxuXHRcdFx0XHRwb3MgPSB3cml0ZVN0cmluZyh0aGlzLmNsaWVudElkLCBVVEY4TGVuZ3RoKHRoaXMuY2xpZW50SWQpLCBieXRlU3RyZWFtLCBwb3MpO1xuXHRcdFx0XHRpZiAodGhpcy53aWxsTWVzc2FnZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0cG9zID0gd3JpdGVTdHJpbmcodGhpcy53aWxsTWVzc2FnZS5kZXN0aW5hdGlvbk5hbWUsIFVURjhMZW5ndGgodGhpcy53aWxsTWVzc2FnZS5kZXN0aW5hdGlvbk5hbWUpLCBieXRlU3RyZWFtLCBwb3MpO1xuXHRcdFx0XHRcdHBvcyA9IHdyaXRlVWludDE2KHdpbGxNZXNzYWdlUGF5bG9hZEJ5dGVzLmJ5dGVMZW5ndGgsIGJ5dGVTdHJlYW0sIHBvcyk7XG5cdFx0XHRcdFx0Ynl0ZVN0cmVhbS5zZXQod2lsbE1lc3NhZ2VQYXlsb2FkQnl0ZXMsIHBvcyk7XG5cdFx0XHRcdFx0cG9zICs9IHdpbGxNZXNzYWdlUGF5bG9hZEJ5dGVzLmJ5dGVMZW5ndGg7XG5cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy51c2VyTmFtZSAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdHBvcyA9IHdyaXRlU3RyaW5nKHRoaXMudXNlck5hbWUsIFVURjhMZW5ndGgodGhpcy51c2VyTmFtZSksIGJ5dGVTdHJlYW0sIHBvcyk7XG5cdFx0XHRcdGlmICh0aGlzLnBhc3N3b3JkICE9PSB1bmRlZmluZWQpXG5cdFx0XHRcdFx0cG9zID0gd3JpdGVTdHJpbmcodGhpcy5wYXNzd29yZCwgVVRGOExlbmd0aCh0aGlzLnBhc3N3b3JkKSwgYnl0ZVN0cmVhbSwgcG9zKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgTUVTU0FHRV9UWVBFLlBVQkxJU0g6XG5cdFx0XHRcdC8vIFBVQkxJU0ggaGFzIGEgdGV4dCBvciBiaW5hcnkgcGF5bG9hZCwgaWYgdGV4dCBkbyBub3QgYWRkIGEgMiBieXRlIGxlbmd0aCBmaWVsZCwganVzdCB0aGUgVVRGIGNoYXJhY3RlcnMuXG5cdFx0XHRcdGJ5dGVTdHJlYW0uc2V0KHBheWxvYWRCeXRlcywgcG9zKTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvLyAgICBcdCAgICBjYXNlIE1FU1NBR0VfVFlQRS5QVUJSRUM6XG5cdFx0XHRcdC8vICAgIFx0ICAgIGNhc2UgTUVTU0FHRV9UWVBFLlBVQlJFTDpcblx0XHRcdFx0Ly8gICAgXHQgICAgY2FzZSBNRVNTQUdFX1RZUEUuUFVCQ09NUDpcblx0XHRcdFx0Ly8gICAgXHQgICAgXHRicmVhaztcblxuXHRcdFx0Y2FzZSBNRVNTQUdFX1RZUEUuU1VCU0NSSUJFOlxuXHRcdFx0XHQvLyBTVUJTQ1JJQkUgaGFzIGEgbGlzdCBvZiB0b3BpYyBzdHJpbmdzIGFuZCByZXF1ZXN0IFFvU1xuXHRcdFx0XHRmb3IgKHZhciBpPTA7IGk8dGhpcy50b3BpY3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRwb3MgPSB3cml0ZVN0cmluZyh0aGlzLnRvcGljc1tpXSwgdG9waWNTdHJMZW5ndGhbaV0sIGJ5dGVTdHJlYW0sIHBvcyk7XG5cdFx0XHRcdFx0Ynl0ZVN0cmVhbVtwb3MrK10gPSB0aGlzLnJlcXVlc3RlZFFvc1tpXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBNRVNTQUdFX1RZUEUuVU5TVUJTQ1JJQkU6XG5cdFx0XHRcdC8vIFVOU1VCU0NSSUJFIGhhcyBhIGxpc3Qgb2YgdG9waWMgc3RyaW5nc1xuXHRcdFx0XHRmb3IgKHZhciBpPTA7IGk8dGhpcy50b3BpY3MubGVuZ3RoOyBpKyspXG5cdFx0XHRcdFx0cG9zID0gd3JpdGVTdHJpbmcodGhpcy50b3BpY3NbaV0sIHRvcGljU3RyTGVuZ3RoW2ldLCBieXRlU3RyZWFtLCBwb3MpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Ly8gRG8gbm90aGluZy5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGJ1ZmZlcjtcblx0XHR9O1xuXG5cdFx0ZnVuY3Rpb24gZGVjb2RlTWVzc2FnZShpbnB1dCxwb3MpIHtcblx0XHRcdHZhciBzdGFydGluZ1BvcyA9IHBvcztcblx0XHRcdHZhciBmaXJzdCA9IGlucHV0W3Bvc107XG5cdFx0XHR2YXIgdHlwZSA9IGZpcnN0ID4+IDQ7XG5cdFx0XHR2YXIgbWVzc2FnZUluZm8gPSBmaXJzdCAmPSAweDBmO1xuXHRcdFx0cG9zICs9IDE7XG5cblxuXHRcdFx0Ly8gRGVjb2RlIHRoZSByZW1haW5pbmcgbGVuZ3RoIChNQkkgZm9ybWF0KVxuXG5cdFx0XHR2YXIgZGlnaXQ7XG5cdFx0XHR2YXIgcmVtTGVuZ3RoID0gMDtcblx0XHRcdHZhciBtdWx0aXBsaWVyID0gMTtcblx0XHRcdGRvIHtcblx0XHRcdFx0aWYgKHBvcyA9PSBpbnB1dC5sZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm4gW251bGwsc3RhcnRpbmdQb3NdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRpZ2l0ID0gaW5wdXRbcG9zKytdO1xuXHRcdFx0XHRyZW1MZW5ndGggKz0gKChkaWdpdCAmIDB4N0YpICogbXVsdGlwbGllcik7XG5cdFx0XHRcdG11bHRpcGxpZXIgKj0gMTI4O1xuXHRcdFx0fSB3aGlsZSAoKGRpZ2l0ICYgMHg4MCkgIT09IDApO1xuXG5cdFx0XHR2YXIgZW5kUG9zID0gcG9zK3JlbUxlbmd0aDtcblx0XHRcdGlmIChlbmRQb3MgPiBpbnB1dC5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuIFtudWxsLHN0YXJ0aW5nUG9zXTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHdpcmVNZXNzYWdlID0gbmV3IFdpcmVNZXNzYWdlKHR5cGUpO1xuXHRcdFx0c3dpdGNoKHR5cGUpIHtcblx0XHRcdGNhc2UgTUVTU0FHRV9UWVBFLkNPTk5BQ0s6XG5cdFx0XHRcdHZhciBjb25uZWN0QWNrbm93bGVkZ2VGbGFncyA9IGlucHV0W3BvcysrXTtcblx0XHRcdFx0aWYgKGNvbm5lY3RBY2tub3dsZWRnZUZsYWdzICYgMHgwMSlcblx0XHRcdFx0XHR3aXJlTWVzc2FnZS5zZXNzaW9uUHJlc2VudCA9IHRydWU7XG5cdFx0XHRcdHdpcmVNZXNzYWdlLnJldHVybkNvZGUgPSBpbnB1dFtwb3MrK107XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIE1FU1NBR0VfVFlQRS5QVUJMSVNIOlxuXHRcdFx0XHR2YXIgcW9zID0gKG1lc3NhZ2VJbmZvID4+IDEpICYgMHgwMztcblxuXHRcdFx0XHR2YXIgbGVuID0gcmVhZFVpbnQxNihpbnB1dCwgcG9zKTtcblx0XHRcdFx0cG9zICs9IDI7XG5cdFx0XHRcdHZhciB0b3BpY05hbWUgPSBwYXJzZVVURjgoaW5wdXQsIHBvcywgbGVuKTtcblx0XHRcdFx0cG9zICs9IGxlbjtcblx0XHRcdFx0Ly8gSWYgUW9TIDEgb3IgMiB0aGVyZSB3aWxsIGJlIGEgbWVzc2FnZUlkZW50aWZpZXJcblx0XHRcdFx0aWYgKHFvcyA+IDApIHtcblx0XHRcdFx0XHR3aXJlTWVzc2FnZS5tZXNzYWdlSWRlbnRpZmllciA9IHJlYWRVaW50MTYoaW5wdXQsIHBvcyk7XG5cdFx0XHRcdFx0cG9zICs9IDI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKGlucHV0LnN1YmFycmF5KHBvcywgZW5kUG9zKSk7XG5cdFx0XHRcdGlmICgobWVzc2FnZUluZm8gJiAweDAxKSA9PSAweDAxKVxuXHRcdFx0XHRcdG1lc3NhZ2UucmV0YWluZWQgPSB0cnVlO1xuXHRcdFx0XHRpZiAoKG1lc3NhZ2VJbmZvICYgMHgwOCkgPT0gMHgwOClcblx0XHRcdFx0XHRtZXNzYWdlLmR1cGxpY2F0ZSA9ICB0cnVlO1xuXHRcdFx0XHRtZXNzYWdlLnFvcyA9IHFvcztcblx0XHRcdFx0bWVzc2FnZS5kZXN0aW5hdGlvbk5hbWUgPSB0b3BpY05hbWU7XG5cdFx0XHRcdHdpcmVNZXNzYWdlLnBheWxvYWRNZXNzYWdlID0gbWVzc2FnZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgIE1FU1NBR0VfVFlQRS5QVUJBQ0s6XG5cdFx0XHRjYXNlICBNRVNTQUdFX1RZUEUuUFVCUkVDOlxuXHRcdFx0Y2FzZSAgTUVTU0FHRV9UWVBFLlBVQlJFTDpcblx0XHRcdGNhc2UgIE1FU1NBR0VfVFlQRS5QVUJDT01QOlxuXHRcdFx0Y2FzZSAgTUVTU0FHRV9UWVBFLlVOU1VCQUNLOlxuXHRcdFx0XHR3aXJlTWVzc2FnZS5tZXNzYWdlSWRlbnRpZmllciA9IHJlYWRVaW50MTYoaW5wdXQsIHBvcyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICBNRVNTQUdFX1RZUEUuU1VCQUNLOlxuXHRcdFx0XHR3aXJlTWVzc2FnZS5tZXNzYWdlSWRlbnRpZmllciA9IHJlYWRVaW50MTYoaW5wdXQsIHBvcyk7XG5cdFx0XHRcdHBvcyArPSAyO1xuXHRcdFx0XHR3aXJlTWVzc2FnZS5yZXR1cm5Db2RlID0gaW5wdXQuc3ViYXJyYXkocG9zLCBlbmRQb3MpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBbd2lyZU1lc3NhZ2UsZW5kUG9zXTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB3cml0ZVVpbnQxNihpbnB1dCwgYnVmZmVyLCBvZmZzZXQpIHtcblx0XHRcdGJ1ZmZlcltvZmZzZXQrK10gPSBpbnB1dCA+PiA4OyAgICAgIC8vTVNCXG5cdFx0XHRidWZmZXJbb2Zmc2V0KytdID0gaW5wdXQgJSAyNTY7ICAgICAvL0xTQlxuXHRcdFx0cmV0dXJuIG9mZnNldDtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB3cml0ZVN0cmluZyhpbnB1dCwgdXRmOExlbmd0aCwgYnVmZmVyLCBvZmZzZXQpIHtcblx0XHRcdG9mZnNldCA9IHdyaXRlVWludDE2KHV0ZjhMZW5ndGgsIGJ1ZmZlciwgb2Zmc2V0KTtcblx0XHRcdHN0cmluZ1RvVVRGOChpbnB1dCwgYnVmZmVyLCBvZmZzZXQpO1xuXHRcdFx0cmV0dXJuIG9mZnNldCArIHV0ZjhMZW5ndGg7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVhZFVpbnQxNihidWZmZXIsIG9mZnNldCkge1xuXHRcdFx0cmV0dXJuIDI1NipidWZmZXJbb2Zmc2V0XSArIGJ1ZmZlcltvZmZzZXQrMV07XG5cdFx0fVxuXG5cdFx0LyoqXG5cdCAqIEVuY29kZXMgYW4gTVFUVCBNdWx0aS1CeXRlIEludGVnZXJcblx0ICogQHByaXZhdGVcblx0ICovXG5cdFx0ZnVuY3Rpb24gZW5jb2RlTUJJKG51bWJlcikge1xuXHRcdFx0dmFyIG91dHB1dCA9IG5ldyBBcnJheSgxKTtcblx0XHRcdHZhciBudW1CeXRlcyA9IDA7XG5cblx0XHRcdGRvIHtcblx0XHRcdFx0dmFyIGRpZ2l0ID0gbnVtYmVyICUgMTI4O1xuXHRcdFx0XHRudW1iZXIgPSBudW1iZXIgPj4gNztcblx0XHRcdFx0aWYgKG51bWJlciA+IDApIHtcblx0XHRcdFx0XHRkaWdpdCB8PSAweDgwO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG91dHB1dFtudW1CeXRlcysrXSA9IGRpZ2l0O1xuXHRcdFx0fSB3aGlsZSAoIChudW1iZXIgPiAwKSAmJiAobnVtQnl0ZXM8NCkgKTtcblxuXHRcdFx0cmV0dXJuIG91dHB1dDtcblx0XHR9XG5cblx0XHQvKipcblx0ICogVGFrZXMgYSBTdHJpbmcgYW5kIGNhbGN1bGF0ZXMgaXRzIGxlbmd0aCBpbiBieXRlcyB3aGVuIGVuY29kZWQgaW4gVVRGOC5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdFx0ZnVuY3Rpb24gVVRGOExlbmd0aChpbnB1dCkge1xuXHRcdFx0dmFyIG91dHB1dCA9IDA7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaTxpbnB1dC5sZW5ndGg7IGkrKylcblx0XHRcdHtcblx0XHRcdFx0dmFyIGNoYXJDb2RlID0gaW5wdXQuY2hhckNvZGVBdChpKTtcblx0XHRcdFx0aWYgKGNoYXJDb2RlID4gMHg3RkYpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBTdXJyb2dhdGUgcGFpciBtZWFucyBpdHMgYSA0IGJ5dGUgY2hhcmFjdGVyXG5cdFx0XHRcdFx0aWYgKDB4RDgwMCA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8PSAweERCRkYpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aSsrO1xuXHRcdFx0XHRcdFx0b3V0cHV0Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG91dHB1dCArPTM7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoY2hhckNvZGUgPiAweDdGKVxuXHRcdFx0XHRcdG91dHB1dCArPTI7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRvdXRwdXQrKztcblx0XHRcdH1cblx0XHRcdHJldHVybiBvdXRwdXQ7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdCAqIFRha2VzIGEgU3RyaW5nIGFuZCB3cml0ZXMgaXQgaW50byBhbiBhcnJheSBhcyBVVEY4IGVuY29kZWQgYnl0ZXMuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRcdGZ1bmN0aW9uIHN0cmluZ1RvVVRGOChpbnB1dCwgb3V0cHV0LCBzdGFydCkge1xuXHRcdFx0dmFyIHBvcyA9IHN0YXJ0O1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGk8aW5wdXQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGNoYXJDb2RlID0gaW5wdXQuY2hhckNvZGVBdChpKTtcblxuXHRcdFx0XHQvLyBDaGVjayBmb3IgYSBzdXJyb2dhdGUgcGFpci5cblx0XHRcdFx0aWYgKDB4RDgwMCA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8PSAweERCRkYpIHtcblx0XHRcdFx0XHR2YXIgbG93Q2hhckNvZGUgPSBpbnB1dC5jaGFyQ29kZUF0KCsraSk7XG5cdFx0XHRcdFx0aWYgKGlzTmFOKGxvd0NoYXJDb2RlKSkge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5NQUxGT1JNRURfVU5JQ09ERSwgW2NoYXJDb2RlLCBsb3dDaGFyQ29kZV0pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2hhckNvZGUgPSAoKGNoYXJDb2RlIC0gMHhEODAwKTw8MTApICsgKGxvd0NoYXJDb2RlIC0gMHhEQzAwKSArIDB4MTAwMDA7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjaGFyQ29kZSA8PSAweDdGKSB7XG5cdFx0XHRcdFx0b3V0cHV0W3BvcysrXSA9IGNoYXJDb2RlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGNoYXJDb2RlIDw9IDB4N0ZGKSB7XG5cdFx0XHRcdFx0b3V0cHV0W3BvcysrXSA9IGNoYXJDb2RlPj42ICAmIDB4MUYgfCAweEMwO1xuXHRcdFx0XHRcdG91dHB1dFtwb3MrK10gPSBjaGFyQ29kZSAgICAgJiAweDNGIHwgMHg4MDtcblx0XHRcdFx0fSBlbHNlIGlmIChjaGFyQ29kZSA8PSAweEZGRkYpIHtcblx0XHRcdFx0XHRvdXRwdXRbcG9zKytdID0gY2hhckNvZGU+PjEyICYgMHgwRiB8IDB4RTA7XG5cdFx0XHRcdFx0b3V0cHV0W3BvcysrXSA9IGNoYXJDb2RlPj42ICAmIDB4M0YgfCAweDgwO1xuXHRcdFx0XHRcdG91dHB1dFtwb3MrK10gPSBjaGFyQ29kZSAgICAgJiAweDNGIHwgMHg4MDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRvdXRwdXRbcG9zKytdID0gY2hhckNvZGU+PjE4ICYgMHgwNyB8IDB4RjA7XG5cdFx0XHRcdFx0b3V0cHV0W3BvcysrXSA9IGNoYXJDb2RlPj4xMiAmIDB4M0YgfCAweDgwO1xuXHRcdFx0XHRcdG91dHB1dFtwb3MrK10gPSBjaGFyQ29kZT4+NiAgJiAweDNGIHwgMHg4MDtcblx0XHRcdFx0XHRvdXRwdXRbcG9zKytdID0gY2hhckNvZGUgICAgICYgMHgzRiB8IDB4ODA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBvdXRwdXQ7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcGFyc2VVVEY4KGlucHV0LCBvZmZzZXQsIGxlbmd0aCkge1xuXHRcdFx0dmFyIG91dHB1dCA9IFwiXCI7XG5cdFx0XHR2YXIgdXRmMTY7XG5cdFx0XHR2YXIgcG9zID0gb2Zmc2V0O1xuXG5cdFx0XHR3aGlsZSAocG9zIDwgb2Zmc2V0K2xlbmd0aClcblx0XHRcdHtcblx0XHRcdFx0dmFyIGJ5dGUxID0gaW5wdXRbcG9zKytdO1xuXHRcdFx0XHRpZiAoYnl0ZTEgPCAxMjgpXG5cdFx0XHRcdFx0dXRmMTYgPSBieXRlMTtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dmFyIGJ5dGUyID0gaW5wdXRbcG9zKytdLTEyODtcblx0XHRcdFx0XHRpZiAoYnl0ZTIgPCAwKVxuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5NQUxGT1JNRURfVVRGLCBbYnl0ZTEudG9TdHJpbmcoMTYpLCBieXRlMi50b1N0cmluZygxNiksXCJcIl0pKTtcblx0XHRcdFx0XHRpZiAoYnl0ZTEgPCAweEUwKSAgICAgICAgICAgICAvLyAyIGJ5dGUgY2hhcmFjdGVyXG5cdFx0XHRcdFx0XHR1dGYxNiA9IDY0KihieXRlMS0weEMwKSArIGJ5dGUyO1xuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR2YXIgYnl0ZTMgPSBpbnB1dFtwb3MrK10tMTI4O1xuXHRcdFx0XHRcdFx0aWYgKGJ5dGUzIDwgMClcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5NQUxGT1JNRURfVVRGLCBbYnl0ZTEudG9TdHJpbmcoMTYpLCBieXRlMi50b1N0cmluZygxNiksIGJ5dGUzLnRvU3RyaW5nKDE2KV0pKTtcblx0XHRcdFx0XHRcdGlmIChieXRlMSA8IDB4RjApICAgICAgICAvLyAzIGJ5dGUgY2hhcmFjdGVyXG5cdFx0XHRcdFx0XHRcdHV0ZjE2ID0gNDA5NiooYnl0ZTEtMHhFMCkgKyA2NCpieXRlMiArIGJ5dGUzO1xuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR2YXIgYnl0ZTQgPSBpbnB1dFtwb3MrK10tMTI4O1xuXHRcdFx0XHRcdFx0XHRpZiAoYnl0ZTQgPCAwKVxuXHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuTUFMRk9STUVEX1VURiwgW2J5dGUxLnRvU3RyaW5nKDE2KSwgYnl0ZTIudG9TdHJpbmcoMTYpLCBieXRlMy50b1N0cmluZygxNiksIGJ5dGU0LnRvU3RyaW5nKDE2KV0pKTtcblx0XHRcdFx0XHRcdFx0aWYgKGJ5dGUxIDwgMHhGOCkgICAgICAgIC8vIDQgYnl0ZSBjaGFyYWN0ZXJcblx0XHRcdFx0XHRcdFx0XHR1dGYxNiA9IDI2MjE0NCooYnl0ZTEtMHhGMCkgKyA0MDk2KmJ5dGUyICsgNjQqYnl0ZTMgKyBieXRlNDtcblx0XHRcdFx0XHRcdFx0ZWxzZSAgICAgICAgICAgICAgICAgICAgIC8vIGxvbmdlciBlbmNvZGluZ3MgYXJlIG5vdCBzdXBwb3J0ZWRcblx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KEVSUk9SLk1BTEZPUk1FRF9VVEYsIFtieXRlMS50b1N0cmluZygxNiksIGJ5dGUyLnRvU3RyaW5nKDE2KSwgYnl0ZTMudG9TdHJpbmcoMTYpLCBieXRlNC50b1N0cmluZygxNildKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHV0ZjE2ID4gMHhGRkZGKSAgIC8vIDQgYnl0ZSBjaGFyYWN0ZXIgLSBleHByZXNzIGFzIGEgc3Vycm9nYXRlIHBhaXJcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHV0ZjE2IC09IDB4MTAwMDA7XG5cdFx0XHRcdFx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhEODAwICsgKHV0ZjE2ID4+IDEwKSk7IC8vIGxlYWQgY2hhcmFjdGVyXG5cdFx0XHRcdFx0dXRmMTYgPSAweERDMDAgKyAodXRmMTYgJiAweDNGRik7ICAvLyB0cmFpbCBjaGFyYWN0ZXJcblx0XHRcdFx0fVxuXHRcdFx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh1dGYxNik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb3V0cHV0O1xuXHRcdH1cblxuXHRcdC8qKlxuXHQgKiBSZXBlYXQga2VlcGFsaXZlIHJlcXVlc3RzLCBtb25pdG9yIHJlc3BvbnNlcy5cblx0ICogQGlnbm9yZVxuXHQgKi9cblx0XHR2YXIgUGluZ2VyID0gZnVuY3Rpb24oY2xpZW50LCBrZWVwQWxpdmVJbnRlcnZhbCkge1xuXHRcdFx0dGhpcy5fY2xpZW50ID0gY2xpZW50O1xuXHRcdFx0dGhpcy5fa2VlcEFsaXZlSW50ZXJ2YWwgPSBrZWVwQWxpdmVJbnRlcnZhbCoxMDAwO1xuXHRcdFx0dGhpcy5pc1Jlc2V0ID0gZmFsc2U7XG5cblx0XHRcdHZhciBwaW5nUmVxID0gbmV3IFdpcmVNZXNzYWdlKE1FU1NBR0VfVFlQRS5QSU5HUkVRKS5lbmNvZGUoKTtcblxuXHRcdFx0dmFyIGRvVGltZW91dCA9IGZ1bmN0aW9uIChwaW5nZXIpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZG9QaW5nLmFwcGx5KHBpbmdlcik7XG5cdFx0XHRcdH07XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiogQGlnbm9yZSAqL1xuXHRcdFx0dmFyIGRvUGluZyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIXRoaXMuaXNSZXNldCkge1xuXHRcdFx0XHRcdHRoaXMuX2NsaWVudC5fdHJhY2UoXCJQaW5nZXIuZG9QaW5nXCIsIFwiVGltZWQgb3V0XCIpO1xuXHRcdFx0XHRcdHRoaXMuX2NsaWVudC5fZGlzY29ubmVjdGVkKCBFUlJPUi5QSU5HX1RJTUVPVVQuY29kZSAsIGZvcm1hdChFUlJPUi5QSU5HX1RJTUVPVVQpKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmlzUmVzZXQgPSBmYWxzZTtcblx0XHRcdFx0XHR0aGlzLl9jbGllbnQuX3RyYWNlKFwiUGluZ2VyLmRvUGluZ1wiLCBcInNlbmQgUElOR1JFUVwiKTtcblx0XHRcdFx0XHR0aGlzLl9jbGllbnQuc29ja2V0LnNlbmQocGluZ1JlcSk7XG5cdFx0XHRcdFx0dGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChkb1RpbWVvdXQodGhpcyksIHRoaXMuX2tlZXBBbGl2ZUludGVydmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5yZXNldCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0aGlzLmlzUmVzZXQgPSB0cnVlO1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblx0XHRcdFx0aWYgKHRoaXMuX2tlZXBBbGl2ZUludGVydmFsID4gMClcblx0XHRcdFx0XHR0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGRvVGltZW91dCh0aGlzKSwgdGhpcy5fa2VlcEFsaXZlSW50ZXJ2YWwpO1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5jYW5jZWwgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cdFx0XHR9O1xuXHRcdH07XG5cblx0XHQvKipcblx0ICogTW9uaXRvciByZXF1ZXN0IGNvbXBsZXRpb24uXG5cdCAqIEBpZ25vcmVcblx0ICovXG5cdFx0dmFyIFRpbWVvdXQgPSBmdW5jdGlvbihjbGllbnQsIHRpbWVvdXRTZWNvbmRzLCBhY3Rpb24sIGFyZ3MpIHtcblx0XHRcdGlmICghdGltZW91dFNlY29uZHMpXG5cdFx0XHRcdHRpbWVvdXRTZWNvbmRzID0gMzA7XG5cblx0XHRcdHZhciBkb1RpbWVvdXQgPSBmdW5jdGlvbiAoYWN0aW9uLCBjbGllbnQsIGFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gYWN0aW9uLmFwcGx5KGNsaWVudCwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChkb1RpbWVvdXQoYWN0aW9uLCBjbGllbnQsIGFyZ3MpLCB0aW1lb3V0U2Vjb25kcyAqIDEwMDApO1xuXG5cdFx0XHR0aGlzLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblx0XHRcdH07XG5cdFx0fTtcblxuXHQvKipcblx0ICogSW50ZXJuYWwgaW1wbGVtZW50YXRpb24gb2YgdGhlIFdlYnNvY2tldHMgTVFUVCBWMy4xIGNsaWVudC5cblx0ICpcblx0ICogQG5hbWUgUGFoby5DbGllbnRJbXBsIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaG9zdCB0aGUgRE5TIG5hbWVvZiB0aGUgd2ViU29ja2V0IGhvc3QuXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBwb3J0IHRoZSBwb3J0IG51bWJlciBmb3IgdGhhdCBob3N0LlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gY2xpZW50SWQgdGhlIE1RIGNsaWVudCBpZGVudGlmaWVyLlxuXHQgKi9cblx0XHR2YXIgQ2xpZW50SW1wbCA9IGZ1bmN0aW9uICh1cmksIGhvc3QsIHBvcnQsIHBhdGgsIGNsaWVudElkKSB7XG5cdFx0Ly8gQ2hlY2sgZGVwZW5kZW5jaWVzIGFyZSBzYXRpc2ZpZWQgaW4gdGhpcyBicm93c2VyLlxuXHRcdFx0aWYgKCEoXCJXZWJTb2NrZXRcIiBpbiBnbG9iYWwgJiYgZ2xvYmFsLldlYlNvY2tldCAhPT0gbnVsbCkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5VTlNVUFBPUlRFRCwgW1wiV2ViU29ja2V0XCJdKSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIShcIkFycmF5QnVmZmVyXCIgaW4gZ2xvYmFsICYmIGdsb2JhbC5BcnJheUJ1ZmZlciAhPT0gbnVsbCkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5VTlNVUFBPUlRFRCwgW1wiQXJyYXlCdWZmZXJcIl0pKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3RyYWNlKFwiUGFoby5DbGllbnRcIiwgdXJpLCBob3N0LCBwb3J0LCBwYXRoLCBjbGllbnRJZCk7XG5cblx0XHRcdHRoaXMuaG9zdCA9IGhvc3Q7XG5cdFx0XHR0aGlzLnBvcnQgPSBwb3J0O1xuXHRcdFx0dGhpcy5wYXRoID0gcGF0aDtcblx0XHRcdHRoaXMudXJpID0gdXJpO1xuXHRcdFx0dGhpcy5jbGllbnRJZCA9IGNsaWVudElkO1xuXHRcdFx0dGhpcy5fd3N1cmkgPSBudWxsO1xuXG5cdFx0XHQvLyBMb2NhbCBzdG9yYWdla2V5cyBhcmUgcXVhbGlmaWVkIHdpdGggdGhlIGZvbGxvd2luZyBzdHJpbmcuXG5cdFx0XHQvLyBUaGUgY29uZGl0aW9uYWwgaW5jbHVzaW9uIG9mIHBhdGggaW4gdGhlIGtleSBpcyBmb3IgYmFja3dhcmRcblx0XHRcdC8vIGNvbXBhdGliaWxpdHkgdG8gd2hlbiB0aGUgcGF0aCB3YXMgbm90IGNvbmZpZ3VyYWJsZSBhbmQgYXNzdW1lZCB0b1xuXHRcdFx0Ly8gYmUgL21xdHRcblx0XHRcdHRoaXMuX2xvY2FsS2V5PWhvc3QrXCI6XCIrcG9ydCsocGF0aCE9XCIvbXF0dFwiP1wiOlwiK3BhdGg6XCJcIikrXCI6XCIrY2xpZW50SWQrXCI6XCI7XG5cblx0XHRcdC8vIENyZWF0ZSBwcml2YXRlIGluc3RhbmNlLW9ubHkgbWVzc2FnZSBxdWV1ZVxuXHRcdFx0Ly8gSW50ZXJuYWwgcXVldWUgb2YgbWVzc2FnZXMgdG8gYmUgc2VudCwgaW4gc2VuZGluZyBvcmRlci5cblx0XHRcdHRoaXMuX21zZ19xdWV1ZSA9IFtdO1xuXHRcdFx0dGhpcy5fYnVmZmVyZWRfbXNnX3F1ZXVlID0gW107XG5cblx0XHRcdC8vIE1lc3NhZ2VzIHdlIGhhdmUgc2VudCBhbmQgYXJlIGV4cGVjdGluZyBhIHJlc3BvbnNlIGZvciwgaW5kZXhlZCBieSB0aGVpciByZXNwZWN0aXZlIG1lc3NhZ2UgaWRzLlxuXHRcdFx0dGhpcy5fc2VudE1lc3NhZ2VzID0ge307XG5cblx0XHRcdC8vIE1lc3NhZ2VzIHdlIGhhdmUgcmVjZWl2ZWQgYW5kIGFja25vd2xlZ2VkIGFuZCBhcmUgZXhwZWN0aW5nIGEgY29uZmlybSBtZXNzYWdlIGZvclxuXHRcdFx0Ly8gaW5kZXhlZCBieSB0aGVpciByZXNwZWN0aXZlIG1lc3NhZ2UgaWRzLlxuXHRcdFx0dGhpcy5fcmVjZWl2ZWRNZXNzYWdlcyA9IHt9O1xuXG5cdFx0XHQvLyBJbnRlcm5hbCBsaXN0IG9mIGNhbGxiYWNrcyB0byBiZSBleGVjdXRlZCB3aGVuIG1lc3NhZ2VzXG5cdFx0XHQvLyBoYXZlIGJlZW4gc3VjY2Vzc2Z1bGx5IHNlbnQgb3ZlciB3ZWIgc29ja2V0LCBlLmcuIGRpc2Nvbm5lY3Rcblx0XHRcdC8vIHdoZW4gaXQgZG9lc24ndCBoYXZlIHRvIHdhaXQgZm9yIEFDSywganVzdCBtZXNzYWdlIGlzIGRpc3BhdGNoZWQuXG5cdFx0XHR0aGlzLl9ub3RpZnlfbXNnX3NlbnQgPSB7fTtcblxuXHRcdFx0Ly8gVW5pcXVlIGlkZW50aWZpZXIgZm9yIFNFTkQgbWVzc2FnZXMsIGluY3JlbWVudGluZ1xuXHRcdFx0Ly8gY291bnRlciBhcyBtZXNzYWdlcyBhcmUgc2VudC5cblx0XHRcdHRoaXMuX21lc3NhZ2VfaWRlbnRpZmllciA9IDE7XG5cblx0XHRcdC8vIFVzZWQgdG8gZGV0ZXJtaW5lIHRoZSB0cmFuc21pc3Npb24gc2VxdWVuY2Ugb2Ygc3RvcmVkIHNlbnQgbWVzc2FnZXMuXG5cdFx0XHR0aGlzLl9zZXF1ZW5jZSA9IDA7XG5cblxuXHRcdFx0Ly8gTG9hZCB0aGUgbG9jYWwgc3RhdGUsIGlmIGFueSwgZnJvbSB0aGUgc2F2ZWQgdmVyc2lvbiwgb25seSByZXN0b3JlIHN0YXRlIHJlbGV2YW50IHRvIHRoaXMgY2xpZW50LlxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGxvY2FsU3RvcmFnZSlcblx0XHRcdFx0aWYgKCAgIGtleS5pbmRleE9mKFwiU2VudDpcIit0aGlzLl9sb2NhbEtleSkgPT09IDAgfHwga2V5LmluZGV4T2YoXCJSZWNlaXZlZDpcIit0aGlzLl9sb2NhbEtleSkgPT09IDApXG5cdFx0XHRcdFx0dGhpcy5yZXN0b3JlKGtleSk7XG5cdFx0fTtcblxuXHRcdC8vIE1lc3NhZ2luZyBDbGllbnQgcHVibGljIGluc3RhbmNlIG1lbWJlcnMuXG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUuaG9zdCA9IG51bGw7XG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUucG9ydCA9IG51bGw7XG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUucGF0aCA9IG51bGw7XG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUudXJpID0gbnVsbDtcblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5jbGllbnRJZCA9IG51bGw7XG5cblx0XHQvLyBNZXNzYWdpbmcgQ2xpZW50IHByaXZhdGUgaW5zdGFuY2UgbWVtYmVycy5cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5zb2NrZXQgPSBudWxsO1xuXHRcdC8qIHRydWUgb25jZSB3ZSBoYXZlIHJlY2VpdmVkIGFuIGFja25vd2xlZGdlbWVudCB0byBhIENPTk5FQ1QgcGFja2V0LiAqL1xuXHRcdENsaWVudEltcGwucHJvdG90eXBlLmNvbm5lY3RlZCA9IGZhbHNlO1xuXHRcdC8qIFRoZSBsYXJnZXN0IG1lc3NhZ2UgaWRlbnRpZmllciBhbGxvd2VkLCBtYXkgbm90IGJlIGxhcmdlciB0aGFuIDIqKjE2IGJ1dFxuXHRcdCAqIGlmIHNldCBzbWFsbGVyIHJlZHVjZXMgdGhlIG1heGltdW0gbnVtYmVyIG9mIG91dGJvdW5kIG1lc3NhZ2VzIGFsbG93ZWQuXG5cdFx0ICovXG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUubWF4TWVzc2FnZUlkZW50aWZpZXIgPSA2NTUzNjtcblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5jb25uZWN0T3B0aW9ucyA9IG51bGw7XG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUuaG9zdEluZGV4ID0gbnVsbDtcblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5vbkNvbm5lY3RlZCA9IG51bGw7XG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUub25Db25uZWN0aW9uTG9zdCA9IG51bGw7XG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUub25NZXNzYWdlRGVsaXZlcmVkID0gbnVsbDtcblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5vbk1lc3NhZ2VBcnJpdmVkID0gbnVsbDtcblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS50cmFjZUZ1bmN0aW9uID0gbnVsbDtcblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fbXNnX3F1ZXVlID0gbnVsbDtcblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fYnVmZmVyZWRfbXNnX3F1ZXVlID0gbnVsbDtcblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fY29ubmVjdFRpbWVvdXQgPSBudWxsO1xuXHRcdC8qIFRoZSBzZW5kUGluZ2VyIG1vbml0b3JzIGhvdyBsb25nIHdlIGFsbG93IGJlZm9yZSB3ZSBzZW5kIGRhdGEgdG8gcHJvdmUgdG8gdGhlIHNlcnZlciB0aGF0IHdlIGFyZSBhbGl2ZS4gKi9cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5zZW5kUGluZ2VyID0gbnVsbDtcblx0XHQvKiBUaGUgcmVjZWl2ZVBpbmdlciBtb25pdG9ycyBob3cgbG9uZyB3ZSBhbGxvdyBiZWZvcmUgd2UgcmVxdWlyZSBldmlkZW5jZSB0aGF0IHRoZSBzZXJ2ZXIgaXMgYWxpdmUuICovXG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUucmVjZWl2ZVBpbmdlciA9IG51bGw7XG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUuX3JlY29ubmVjdEludGVydmFsID0gMTsgLy8gUmVjb25uZWN0IERlbGF5LCBzdGFydHMgYXQgMSBzZWNvbmRcblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUuX3JlY29ubmVjdFRpbWVvdXQgPSBudWxsO1xuXHRcdENsaWVudEltcGwucHJvdG90eXBlLmRpc2Nvbm5lY3RlZFB1Ymxpc2hpbmcgPSBmYWxzZTtcblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5kaXNjb25uZWN0ZWRCdWZmZXJTaXplID0gNTAwMDtcblxuXHRcdENsaWVudEltcGwucHJvdG90eXBlLnJlY2VpdmVCdWZmZXIgPSBudWxsO1xuXG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUuX3RyYWNlQnVmZmVyID0gbnVsbDtcblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fTUFYX1RSQUNFX0VOVFJJRVMgPSAxMDA7XG5cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKGNvbm5lY3RPcHRpb25zKSB7XG5cdFx0XHR2YXIgY29ubmVjdE9wdGlvbnNNYXNrZWQgPSB0aGlzLl90cmFjZU1hc2soY29ubmVjdE9wdGlvbnMsIFwicGFzc3dvcmRcIik7XG5cdFx0XHR0aGlzLl90cmFjZShcIkNsaWVudC5jb25uZWN0XCIsIGNvbm5lY3RPcHRpb25zTWFza2VkLCB0aGlzLnNvY2tldCwgdGhpcy5jb25uZWN0ZWQpO1xuXG5cdFx0XHRpZiAodGhpcy5jb25uZWN0ZWQpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuSU5WQUxJRF9TVEFURSwgW1wiYWxyZWFkeSBjb25uZWN0ZWRcIl0pKTtcblx0XHRcdGlmICh0aGlzLnNvY2tldClcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX1NUQVRFLCBbXCJhbHJlYWR5IGNvbm5lY3RlZFwiXSkpO1xuXG5cdFx0XHRpZiAodGhpcy5fcmVjb25uZWN0aW5nKSB7XG5cdFx0XHQvLyBjb25uZWN0KCkgZnVuY3Rpb24gaXMgY2FsbGVkIHdoaWxlIHJlY29ubmVjdCBpcyBpbiBwcm9ncmVzcy5cblx0XHRcdC8vIFRlcm1pbmF0ZSB0aGUgYXV0byByZWNvbm5lY3QgcHJvY2VzcyB0byB1c2UgbmV3IGNvbm5lY3Qgb3B0aW9ucy5cblx0XHRcdFx0dGhpcy5fcmVjb25uZWN0VGltZW91dC5jYW5jZWwoKTtcblx0XHRcdFx0dGhpcy5fcmVjb25uZWN0VGltZW91dCA9IG51bGw7XG5cdFx0XHRcdHRoaXMuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmNvbm5lY3RPcHRpb25zID0gY29ubmVjdE9wdGlvbnM7XG5cdFx0XHR0aGlzLl9yZWNvbm5lY3RJbnRlcnZhbCA9IDE7XG5cdFx0XHR0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcblx0XHRcdGlmIChjb25uZWN0T3B0aW9ucy51cmlzKSB7XG5cdFx0XHRcdHRoaXMuaG9zdEluZGV4ID0gMDtcblx0XHRcdFx0dGhpcy5fZG9Db25uZWN0KGNvbm5lY3RPcHRpb25zLnVyaXNbMF0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fZG9Db25uZWN0KHRoaXMudXJpKTtcblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZmlsdGVyLCBzdWJzY3JpYmVPcHRpb25zKSB7XG5cdFx0XHR0aGlzLl90cmFjZShcIkNsaWVudC5zdWJzY3JpYmVcIiwgZmlsdGVyLCBzdWJzY3JpYmVPcHRpb25zKTtcblxuXHRcdFx0aWYgKCF0aGlzLmNvbm5lY3RlZClcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX1NUQVRFLCBbXCJub3QgY29ubmVjdGVkXCJdKSk7XG5cbiAgICAgICAgICAgIHZhciB3aXJlTWVzc2FnZSA9IG5ldyBXaXJlTWVzc2FnZShNRVNTQUdFX1RZUEUuU1VCU0NSSUJFKTtcbiAgICAgICAgICAgIHdpcmVNZXNzYWdlLnRvcGljcyA9IGZpbHRlci5jb25zdHJ1Y3RvciA9PT0gQXJyYXkgPyBmaWx0ZXIgOiBbZmlsdGVyXTtcbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVPcHRpb25zLnFvcyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHN1YnNjcmliZU9wdGlvbnMucW9zID0gMDtcbiAgICAgICAgICAgIHdpcmVNZXNzYWdlLnJlcXVlc3RlZFFvcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aXJlTWVzc2FnZS50b3BpY3MubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgICAgd2lyZU1lc3NhZ2UucmVxdWVzdGVkUW9zW2ldID0gc3Vic2NyaWJlT3B0aW9ucy5xb3M7XG5cblx0XHRcdGlmIChzdWJzY3JpYmVPcHRpb25zLm9uU3VjY2Vzcykge1xuXHRcdFx0XHR3aXJlTWVzc2FnZS5vblN1Y2Nlc3MgPSBmdW5jdGlvbihncmFudGVkUW9zKSB7c3Vic2NyaWJlT3B0aW9ucy5vblN1Y2Nlc3Moe2ludm9jYXRpb25Db250ZXh0OnN1YnNjcmliZU9wdGlvbnMuaW52b2NhdGlvbkNvbnRleHQsZ3JhbnRlZFFvczpncmFudGVkUW9zfSk7fTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHN1YnNjcmliZU9wdGlvbnMub25GYWlsdXJlKSB7XG5cdFx0XHRcdHdpcmVNZXNzYWdlLm9uRmFpbHVyZSA9IGZ1bmN0aW9uKGVycm9yQ29kZSkge3N1YnNjcmliZU9wdGlvbnMub25GYWlsdXJlKHtpbnZvY2F0aW9uQ29udGV4dDpzdWJzY3JpYmVPcHRpb25zLmludm9jYXRpb25Db250ZXh0LGVycm9yQ29kZTplcnJvckNvZGUsIGVycm9yTWVzc2FnZTpmb3JtYXQoZXJyb3JDb2RlKX0pO307XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzdWJzY3JpYmVPcHRpb25zLnRpbWVvdXQpIHtcblx0XHRcdFx0d2lyZU1lc3NhZ2UudGltZU91dCA9IG5ldyBUaW1lb3V0KHRoaXMsIHN1YnNjcmliZU9wdGlvbnMudGltZW91dCwgc3Vic2NyaWJlT3B0aW9ucy5vbkZhaWx1cmUsXG5cdFx0XHRcdFx0W3tpbnZvY2F0aW9uQ29udGV4dDpzdWJzY3JpYmVPcHRpb25zLmludm9jYXRpb25Db250ZXh0LFxuXHRcdFx0XHRcdFx0ZXJyb3JDb2RlOkVSUk9SLlNVQlNDUklCRV9USU1FT1VULmNvZGUsXG5cdFx0XHRcdFx0XHRlcnJvck1lc3NhZ2U6Zm9ybWF0KEVSUk9SLlNVQlNDUklCRV9USU1FT1VUKX1dKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWxsIHN1YnNjcmlwdGlvbnMgcmV0dXJuIGEgU1VCQUNLLlxuXHRcdFx0dGhpcy5fcmVxdWlyZXNfYWNrKHdpcmVNZXNzYWdlKTtcblx0XHRcdHRoaXMuX3NjaGVkdWxlX21lc3NhZ2Uod2lyZU1lc3NhZ2UpO1xuXHRcdH07XG5cblx0XHQvKiogQGlnbm9yZSAqL1xuXHRcdENsaWVudEltcGwucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24oZmlsdGVyLCB1bnN1YnNjcmliZU9wdGlvbnMpIHtcblx0XHRcdHRoaXMuX3RyYWNlKFwiQ2xpZW50LnVuc3Vic2NyaWJlXCIsIGZpbHRlciwgdW5zdWJzY3JpYmVPcHRpb25zKTtcblxuXHRcdFx0aWYgKCF0aGlzLmNvbm5lY3RlZClcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX1NUQVRFLCBbXCJub3QgY29ubmVjdGVkXCJdKSk7XG5cbiAgICAgICAgICAgIHZhciB3aXJlTWVzc2FnZSA9IG5ldyBXaXJlTWVzc2FnZShNRVNTQUdFX1RZUEUuVU5TVUJTQ1JJQkUpO1xuICAgICAgICAgICAgd2lyZU1lc3NhZ2UudG9waWNzID0gZmlsdGVyLmNvbnN0cnVjdG9yID09PSBBcnJheSA/IGZpbHRlciA6IFtmaWx0ZXJdO1xuXG5cdFx0XHRpZiAodW5zdWJzY3JpYmVPcHRpb25zLm9uU3VjY2Vzcykge1xuXHRcdFx0XHR3aXJlTWVzc2FnZS5jYWxsYmFjayA9IGZ1bmN0aW9uKCkge3Vuc3Vic2NyaWJlT3B0aW9ucy5vblN1Y2Nlc3Moe2ludm9jYXRpb25Db250ZXh0OnVuc3Vic2NyaWJlT3B0aW9ucy5pbnZvY2F0aW9uQ29udGV4dH0pO307XG5cdFx0XHR9XG5cdFx0XHRpZiAodW5zdWJzY3JpYmVPcHRpb25zLnRpbWVvdXQpIHtcblx0XHRcdFx0d2lyZU1lc3NhZ2UudGltZU91dCA9IG5ldyBUaW1lb3V0KHRoaXMsIHVuc3Vic2NyaWJlT3B0aW9ucy50aW1lb3V0LCB1bnN1YnNjcmliZU9wdGlvbnMub25GYWlsdXJlLFxuXHRcdFx0XHRcdFt7aW52b2NhdGlvbkNvbnRleHQ6dW5zdWJzY3JpYmVPcHRpb25zLmludm9jYXRpb25Db250ZXh0LFxuXHRcdFx0XHRcdFx0ZXJyb3JDb2RlOkVSUk9SLlVOU1VCU0NSSUJFX1RJTUVPVVQuY29kZSxcblx0XHRcdFx0XHRcdGVycm9yTWVzc2FnZTpmb3JtYXQoRVJST1IuVU5TVUJTQ1JJQkVfVElNRU9VVCl9XSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFsbCB1bnN1YnNjcmliZXMgcmV0dXJuIGEgU1VCQUNLLlxuXHRcdFx0dGhpcy5fcmVxdWlyZXNfYWNrKHdpcmVNZXNzYWdlKTtcblx0XHRcdHRoaXMuX3NjaGVkdWxlX21lc3NhZ2Uod2lyZU1lc3NhZ2UpO1xuXHRcdH07XG5cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcblx0XHRcdHRoaXMuX3RyYWNlKFwiQ2xpZW50LnNlbmRcIiwgbWVzc2FnZSk7XG5cblx0XHRcdHZhciB3aXJlTWVzc2FnZSA9IG5ldyBXaXJlTWVzc2FnZShNRVNTQUdFX1RZUEUuUFVCTElTSCk7XG5cdFx0XHR3aXJlTWVzc2FnZS5wYXlsb2FkTWVzc2FnZSA9IG1lc3NhZ2U7XG5cblx0XHRcdGlmICh0aGlzLmNvbm5lY3RlZCkge1xuXHRcdFx0Ly8gTWFyayBxb3MgMSAmIDIgbWVzc2FnZSBhcyBcIkFDSyByZXF1aXJlZFwiXG5cdFx0XHQvLyBGb3IgcW9zIDAgbWVzc2FnZSwgaW52b2tlIG9uTWVzc2FnZURlbGl2ZXJlZCBjYWxsYmFjayBpZiB0aGVyZSBpcyBvbmUuXG5cdFx0XHQvLyBUaGVuIHNjaGVkdWxlIHRoZSBtZXNzYWdlLlxuXHRcdFx0XHRpZiAobWVzc2FnZS5xb3MgPiAwKSB7XG5cdFx0XHRcdFx0dGhpcy5fcmVxdWlyZXNfYWNrKHdpcmVNZXNzYWdlKTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLm9uTWVzc2FnZURlbGl2ZXJlZCkge1xuXHRcdFx0XHRcdHRoaXMuX25vdGlmeV9tc2dfc2VudFt3aXJlTWVzc2FnZV0gPSB0aGlzLm9uTWVzc2FnZURlbGl2ZXJlZCh3aXJlTWVzc2FnZS5wYXlsb2FkTWVzc2FnZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fc2NoZWR1bGVfbWVzc2FnZSh3aXJlTWVzc2FnZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gQ3VycmVudGx5IGRpc2Nvbm5lY3RlZCwgd2lsbCBub3Qgc2NoZWR1bGUgdGhpcyBtZXNzYWdlXG5cdFx0XHQvLyBDaGVjayBpZiByZWNvbm5lY3RpbmcgaXMgaW4gcHJvZ3Jlc3MgYW5kIGRpc2Nvbm5lY3RlZCBwdWJsaXNoIGlzIGVuYWJsZWQuXG5cdFx0XHRcdGlmICh0aGlzLl9yZWNvbm5lY3RpbmcgJiYgdGhpcy5kaXNjb25uZWN0ZWRQdWJsaXNoaW5nKSB7XG5cdFx0XHRcdC8vIENoZWNrIHRoZSBsaW1pdCB3aGljaCBpbmNsdWRlIHRoZSBcInJlcXVpcmVkIEFDS1wiIG1lc3NhZ2VzXG5cdFx0XHRcdFx0dmFyIG1lc3NhZ2VDb3VudCA9IE9iamVjdC5rZXlzKHRoaXMuX3NlbnRNZXNzYWdlcykubGVuZ3RoICsgdGhpcy5fYnVmZmVyZWRfbXNnX3F1ZXVlLmxlbmd0aDtcblx0XHRcdFx0XHRpZiAobWVzc2FnZUNvdW50ID4gdGhpcy5kaXNjb25uZWN0ZWRCdWZmZXJTaXplKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KEVSUk9SLkJVRkZFUl9GVUxMLCBbdGhpcy5kaXNjb25uZWN0ZWRCdWZmZXJTaXplXSkpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAobWVzc2FnZS5xb3MgPiAwKSB7XG5cdFx0XHRcdFx0XHQvLyBNYXJrIHRoaXMgbWVzc2FnZSBhcyBcIkFDSyByZXF1aXJlZFwiXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JlcXVpcmVzX2Fjayh3aXJlTWVzc2FnZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR3aXJlTWVzc2FnZS5zZXF1ZW5jZSA9ICsrdGhpcy5fc2VxdWVuY2U7XG5cdFx0XHRcdFx0XHRcdC8vIEFkZCBtZXNzYWdlcyBpbiBmaWZvIG9yZGVyIHRvIGFycmF5LCBieSBhZGRpbmcgdG8gc3RhcnRcblx0XHRcdFx0XHRcdFx0dGhpcy5fYnVmZmVyZWRfbXNnX3F1ZXVlLnVuc2hpZnQod2lyZU1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KEVSUk9SLklOVkFMSURfU1RBVEUsIFtcIm5vdCBjb25uZWN0ZWRcIl0pKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fdHJhY2UoXCJDbGllbnQuZGlzY29ubmVjdFwiKTtcblxuXHRcdFx0aWYgKHRoaXMuX3JlY29ubmVjdGluZykge1xuXHRcdFx0Ly8gZGlzY29ubmVjdCgpIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGlsZSByZWNvbm5lY3QgaXMgaW4gcHJvZ3Jlc3MuXG5cdFx0XHQvLyBUZXJtaW5hdGUgdGhlIGF1dG8gcmVjb25uZWN0IHByb2Nlc3MuXG5cdFx0XHRcdHRoaXMuX3JlY29ubmVjdFRpbWVvdXQuY2FuY2VsKCk7XG5cdFx0XHRcdHRoaXMuX3JlY29ubmVjdFRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHR0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCF0aGlzLnNvY2tldClcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX1NUQVRFLCBbXCJub3QgY29ubmVjdGluZyBvciBjb25uZWN0ZWRcIl0pKTtcblxuXHRcdFx0dmFyIHdpcmVNZXNzYWdlID0gbmV3IFdpcmVNZXNzYWdlKE1FU1NBR0VfVFlQRS5ESVNDT05ORUNUKTtcblxuXHRcdFx0Ly8gUnVuIHRoZSBkaXNjb25uZWN0ZWQgY2FsbCBiYWNrIGFzIHNvb24gYXMgdGhlIG1lc3NhZ2UgaGFzIGJlZW4gc2VudCxcblx0XHRcdC8vIGluIGNhc2Ugb2YgYSBmYWlsdXJlIGxhdGVyIG9uIGluIHRoZSBkaXNjb25uZWN0IHByb2Nlc3NpbmcuXG5cdFx0XHQvLyBhcyBhIGNvbnNlcXVlbmNlLCB0aGUgX2Rpc2NvbmVjdGVkIGNhbGwgYmFjayBtYXkgYmUgcnVuIHNldmVyYWwgdGltZXMuXG5cdFx0XHR0aGlzLl9ub3RpZnlfbXNnX3NlbnRbd2lyZU1lc3NhZ2VdID0gc2NvcGUodGhpcy5fZGlzY29ubmVjdGVkLCB0aGlzKTtcblxuXHRcdFx0dGhpcy5fc2NoZWR1bGVfbWVzc2FnZSh3aXJlTWVzc2FnZSk7XG5cdFx0fTtcblxuXHRcdENsaWVudEltcGwucHJvdG90eXBlLmdldFRyYWNlTG9nID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCB0aGlzLl90cmFjZUJ1ZmZlciAhPT0gbnVsbCApIHtcblx0XHRcdFx0dGhpcy5fdHJhY2UoXCJDbGllbnQuZ2V0VHJhY2VMb2dcIiwgbmV3IERhdGUoKSk7XG5cdFx0XHRcdHRoaXMuX3RyYWNlKFwiQ2xpZW50LmdldFRyYWNlTG9nIGluIGZsaWdodCBtZXNzYWdlc1wiLCB0aGlzLl9zZW50TWVzc2FnZXMubGVuZ3RoKTtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIHRoaXMuX3NlbnRNZXNzYWdlcylcblx0XHRcdFx0XHR0aGlzLl90cmFjZShcIl9zZW50TWVzc2FnZXMgXCIsa2V5LCB0aGlzLl9zZW50TWVzc2FnZXNba2V5XSk7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiB0aGlzLl9yZWNlaXZlZE1lc3NhZ2VzKVxuXHRcdFx0XHRcdHRoaXMuX3RyYWNlKFwiX3JlY2VpdmVkTWVzc2FnZXMgXCIsa2V5LCB0aGlzLl9yZWNlaXZlZE1lc3NhZ2VzW2tleV0pO1xuXG5cdFx0XHRcdHJldHVybiB0aGlzLl90cmFjZUJ1ZmZlcjtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUuc3RhcnRUcmFjZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICggdGhpcy5fdHJhY2VCdWZmZXIgPT09IG51bGwgKSB7XG5cdFx0XHRcdHRoaXMuX3RyYWNlQnVmZmVyID0gW107XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl90cmFjZShcIkNsaWVudC5zdGFydFRyYWNlXCIsIG5ldyBEYXRlKCksIHZlcnNpb24pO1xuXHRcdH07XG5cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5zdG9wVHJhY2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5fdHJhY2VCdWZmZXI7XG5cdFx0fTtcblxuXHRcdENsaWVudEltcGwucHJvdG90eXBlLl9kb0Nvbm5lY3QgPSBmdW5jdGlvbiAod3N1cmwpIHtcblx0XHQvLyBXaGVuIHRoZSBzb2NrZXQgaXMgb3BlbiwgdGhpcyBjbGllbnQgd2lsbCBzZW5kIHRoZSBDT05ORUNUIFdpcmVNZXNzYWdlIHVzaW5nIHRoZSBzYXZlZCBwYXJhbWV0ZXJzLlxuXHRcdFx0aWYgKHRoaXMuY29ubmVjdE9wdGlvbnMudXNlU1NMKSB7XG5cdFx0XHRcdHZhciB1cmlQYXJ0cyA9IHdzdXJsLnNwbGl0KFwiOlwiKTtcblx0XHRcdFx0dXJpUGFydHNbMF0gPSBcIndzc1wiO1xuXHRcdFx0XHR3c3VybCA9IHVyaVBhcnRzLmpvaW4oXCI6XCIpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fd3N1cmkgPSB3c3VybDtcblx0XHRcdHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG5cblxuXG5cdFx0XHRpZiAodGhpcy5jb25uZWN0T3B0aW9ucy5tcXR0VmVyc2lvbiA8IDQpIHtcblx0XHRcdFx0dGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KHdzdXJsLCBbXCJtcXR0djMuMVwiXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNvY2tldCA9IG5ldyBXZWJTb2NrZXQod3N1cmwsIFtcIm1xdHRcIl0pO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zb2NrZXQuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcblx0XHRcdHRoaXMuc29ja2V0Lm9ub3BlbiA9IHNjb3BlKHRoaXMuX29uX3NvY2tldF9vcGVuLCB0aGlzKTtcblx0XHRcdHRoaXMuc29ja2V0Lm9ubWVzc2FnZSA9IHNjb3BlKHRoaXMuX29uX3NvY2tldF9tZXNzYWdlLCB0aGlzKTtcblx0XHRcdHRoaXMuc29ja2V0Lm9uZXJyb3IgPSBzY29wZSh0aGlzLl9vbl9zb2NrZXRfZXJyb3IsIHRoaXMpO1xuXHRcdFx0dGhpcy5zb2NrZXQub25jbG9zZSA9IHNjb3BlKHRoaXMuX29uX3NvY2tldF9jbG9zZSwgdGhpcyk7XG5cblx0XHRcdHRoaXMuc2VuZFBpbmdlciA9IG5ldyBQaW5nZXIodGhpcywgdGhpcy5jb25uZWN0T3B0aW9ucy5rZWVwQWxpdmVJbnRlcnZhbCk7XG5cdFx0XHR0aGlzLnJlY2VpdmVQaW5nZXIgPSBuZXcgUGluZ2VyKHRoaXMsIHRoaXMuY29ubmVjdE9wdGlvbnMua2VlcEFsaXZlSW50ZXJ2YWwpO1xuXHRcdFx0aWYgKHRoaXMuX2Nvbm5lY3RUaW1lb3V0KSB7XG5cdFx0XHRcdHRoaXMuX2Nvbm5lY3RUaW1lb3V0LmNhbmNlbCgpO1xuXHRcdFx0XHR0aGlzLl9jb25uZWN0VGltZW91dCA9IG51bGw7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9jb25uZWN0VGltZW91dCA9IG5ldyBUaW1lb3V0KHRoaXMsIHRoaXMuY29ubmVjdE9wdGlvbnMudGltZW91dCwgdGhpcy5fZGlzY29ubmVjdGVkLCAgW0VSUk9SLkNPTk5FQ1RfVElNRU9VVC5jb2RlLCBmb3JtYXQoRVJST1IuQ09OTkVDVF9USU1FT1VUKV0pO1xuXHRcdH07XG5cblxuXHRcdC8vIFNjaGVkdWxlIGEgbmV3IG1lc3NhZ2UgdG8gYmUgc2VudCBvdmVyIHRoZSBXZWJTb2NrZXRzXG5cdFx0Ly8gY29ubmVjdGlvbi4gQ09OTkVDVCBtZXNzYWdlcyBjYXVzZSBXZWJTb2NrZXQgY29ubmVjdGlvblxuXHRcdC8vIHRvIGJlIHN0YXJ0ZWQuIEFsbCBvdGhlciBtZXNzYWdlcyBhcmUgcXVldWVkIGludGVybmFsbHlcblx0XHQvLyB1bnRpbCB0aGlzIGhhcyBoYXBwZW5lZC4gV2hlbiBXUyBjb25uZWN0aW9uIHN0YXJ0cywgcHJvY2Vzc1xuXHRcdC8vIGFsbCBvdXRzdGFuZGluZyBtZXNzYWdlcy5cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fc2NoZWR1bGVfbWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG5cdFx0XHQvLyBBZGQgbWVzc2FnZXMgaW4gZmlmbyBvcmRlciB0byBhcnJheSwgYnkgYWRkaW5nIHRvIHN0YXJ0XG5cdFx0XHR0aGlzLl9tc2dfcXVldWUudW5zaGlmdChtZXNzYWdlKTtcblx0XHRcdC8vIFByb2Nlc3Mgb3V0c3RhbmRpbmcgbWVzc2FnZXMgaW4gdGhlIHF1ZXVlIGlmIHdlIGhhdmUgYW4gIG9wZW4gc29ja2V0LCBhbmQgaGF2ZSByZWNlaXZlZCBDT05OQUNLLlxuXHRcdFx0aWYgKHRoaXMuY29ubmVjdGVkKSB7XG5cdFx0XHRcdHRoaXMuX3Byb2Nlc3NfcXVldWUoKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUuc3RvcmUgPSBmdW5jdGlvbihwcmVmaXgsIHdpcmVNZXNzYWdlKSB7XG5cdFx0XHR2YXIgc3RvcmVkTWVzc2FnZSA9IHt0eXBlOndpcmVNZXNzYWdlLnR5cGUsIG1lc3NhZ2VJZGVudGlmaWVyOndpcmVNZXNzYWdlLm1lc3NhZ2VJZGVudGlmaWVyLCB2ZXJzaW9uOjF9O1xuXG5cdFx0XHRzd2l0Y2god2lyZU1lc3NhZ2UudHlwZSkge1xuXHRcdFx0Y2FzZSBNRVNTQUdFX1RZUEUuUFVCTElTSDpcblx0XHRcdFx0aWYod2lyZU1lc3NhZ2UucHViUmVjUmVjZWl2ZWQpXG5cdFx0XHRcdFx0c3RvcmVkTWVzc2FnZS5wdWJSZWNSZWNlaXZlZCA9IHRydWU7XG5cblx0XHRcdFx0Ly8gQ29udmVydCB0aGUgcGF5bG9hZCB0byBhIGhleCBzdHJpbmcuXG5cdFx0XHRcdHN0b3JlZE1lc3NhZ2UucGF5bG9hZE1lc3NhZ2UgPSB7fTtcblx0XHRcdFx0dmFyIGhleCA9IFwiXCI7XG5cdFx0XHRcdHZhciBtZXNzYWdlQnl0ZXMgPSB3aXJlTWVzc2FnZS5wYXlsb2FkTWVzc2FnZS5wYXlsb2FkQnl0ZXM7XG5cdFx0XHRcdGZvciAodmFyIGk9MDsgaTxtZXNzYWdlQnl0ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAobWVzc2FnZUJ5dGVzW2ldIDw9IDB4Rilcblx0XHRcdFx0XHRcdGhleCA9IGhleCtcIjBcIittZXNzYWdlQnl0ZXNbaV0udG9TdHJpbmcoMTYpO1xuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGhleCA9IGhleCttZXNzYWdlQnl0ZXNbaV0udG9TdHJpbmcoMTYpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN0b3JlZE1lc3NhZ2UucGF5bG9hZE1lc3NhZ2UucGF5bG9hZEhleCA9IGhleDtcblxuXHRcdFx0XHRzdG9yZWRNZXNzYWdlLnBheWxvYWRNZXNzYWdlLnFvcyA9IHdpcmVNZXNzYWdlLnBheWxvYWRNZXNzYWdlLnFvcztcblx0XHRcdFx0c3RvcmVkTWVzc2FnZS5wYXlsb2FkTWVzc2FnZS5kZXN0aW5hdGlvbk5hbWUgPSB3aXJlTWVzc2FnZS5wYXlsb2FkTWVzc2FnZS5kZXN0aW5hdGlvbk5hbWU7XG5cdFx0XHRcdGlmICh3aXJlTWVzc2FnZS5wYXlsb2FkTWVzc2FnZS5kdXBsaWNhdGUpXG5cdFx0XHRcdFx0c3RvcmVkTWVzc2FnZS5wYXlsb2FkTWVzc2FnZS5kdXBsaWNhdGUgPSB0cnVlO1xuXHRcdFx0XHRpZiAod2lyZU1lc3NhZ2UucGF5bG9hZE1lc3NhZ2UucmV0YWluZWQpXG5cdFx0XHRcdFx0c3RvcmVkTWVzc2FnZS5wYXlsb2FkTWVzc2FnZS5yZXRhaW5lZCA9IHRydWU7XG5cblx0XHRcdFx0Ly8gQWRkIGEgc2VxdWVuY2UgbnVtYmVyIHRvIHNlbnQgbWVzc2FnZXMuXG5cdFx0XHRcdGlmICggcHJlZml4LmluZGV4T2YoXCJTZW50OlwiKSA9PT0gMCApIHtcblx0XHRcdFx0XHRpZiAoIHdpcmVNZXNzYWdlLnNlcXVlbmNlID09PSB1bmRlZmluZWQgKVxuXHRcdFx0XHRcdFx0d2lyZU1lc3NhZ2Uuc2VxdWVuY2UgPSArK3RoaXMuX3NlcXVlbmNlO1xuXHRcdFx0XHRcdHN0b3JlZE1lc3NhZ2Uuc2VxdWVuY2UgPSB3aXJlTWVzc2FnZS5zZXF1ZW5jZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgRXJyb3IoZm9ybWF0KEVSUk9SLklOVkFMSURfU1RPUkVEX0RBVEEsIFtwcmVmaXgrdGhpcy5fbG9jYWxLZXkrd2lyZU1lc3NhZ2UubWVzc2FnZUlkZW50aWZpZXIsIHN0b3JlZE1lc3NhZ2VdKSk7XG5cdFx0XHR9XG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShwcmVmaXgrdGhpcy5fbG9jYWxLZXkrd2lyZU1lc3NhZ2UubWVzc2FnZUlkZW50aWZpZXIsIEpTT04uc3RyaW5naWZ5KHN0b3JlZE1lc3NhZ2UpKTtcblx0XHR9O1xuXG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUucmVzdG9yZSA9IGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0dmFyIHZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcblx0XHRcdHZhciBzdG9yZWRNZXNzYWdlID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG5cblx0XHRcdHZhciB3aXJlTWVzc2FnZSA9IG5ldyBXaXJlTWVzc2FnZShzdG9yZWRNZXNzYWdlLnR5cGUsIHN0b3JlZE1lc3NhZ2UpO1xuXG5cdFx0XHRzd2l0Y2goc3RvcmVkTWVzc2FnZS50eXBlKSB7XG5cdFx0XHRjYXNlIE1FU1NBR0VfVFlQRS5QVUJMSVNIOlxuXHRcdFx0XHQvLyBSZXBsYWNlIHRoZSBwYXlsb2FkIG1lc3NhZ2Ugd2l0aCBhIE1lc3NhZ2Ugb2JqZWN0LlxuXHRcdFx0XHR2YXIgaGV4ID0gc3RvcmVkTWVzc2FnZS5wYXlsb2FkTWVzc2FnZS5wYXlsb2FkSGV4O1xuXHRcdFx0XHR2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKChoZXgubGVuZ3RoKS8yKTtcblx0XHRcdFx0dmFyIGJ5dGVTdHJlYW0gPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuXHRcdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRcdHdoaWxlIChoZXgubGVuZ3RoID49IDIpIHtcblx0XHRcdFx0XHR2YXIgeCA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KTtcblx0XHRcdFx0XHRoZXggPSBoZXguc3Vic3RyaW5nKDIsIGhleC5sZW5ndGgpO1xuXHRcdFx0XHRcdGJ5dGVTdHJlYW1baSsrXSA9IHg7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIHBheWxvYWRNZXNzYWdlID0gbmV3IE1lc3NhZ2UoYnl0ZVN0cmVhbSk7XG5cblx0XHRcdFx0cGF5bG9hZE1lc3NhZ2UucW9zID0gc3RvcmVkTWVzc2FnZS5wYXlsb2FkTWVzc2FnZS5xb3M7XG5cdFx0XHRcdHBheWxvYWRNZXNzYWdlLmRlc3RpbmF0aW9uTmFtZSA9IHN0b3JlZE1lc3NhZ2UucGF5bG9hZE1lc3NhZ2UuZGVzdGluYXRpb25OYW1lO1xuXHRcdFx0XHRpZiAoc3RvcmVkTWVzc2FnZS5wYXlsb2FkTWVzc2FnZS5kdXBsaWNhdGUpXG5cdFx0XHRcdFx0cGF5bG9hZE1lc3NhZ2UuZHVwbGljYXRlID0gdHJ1ZTtcblx0XHRcdFx0aWYgKHN0b3JlZE1lc3NhZ2UucGF5bG9hZE1lc3NhZ2UucmV0YWluZWQpXG5cdFx0XHRcdFx0cGF5bG9hZE1lc3NhZ2UucmV0YWluZWQgPSB0cnVlO1xuXHRcdFx0XHR3aXJlTWVzc2FnZS5wYXlsb2FkTWVzc2FnZSA9IHBheWxvYWRNZXNzYWdlO1xuXG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyBFcnJvcihmb3JtYXQoRVJST1IuSU5WQUxJRF9TVE9SRURfREFUQSwgW2tleSwgdmFsdWVdKSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrZXkuaW5kZXhPZihcIlNlbnQ6XCIrdGhpcy5fbG9jYWxLZXkpID09PSAwKSB7XG5cdFx0XHRcdHdpcmVNZXNzYWdlLnBheWxvYWRNZXNzYWdlLmR1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX3NlbnRNZXNzYWdlc1t3aXJlTWVzc2FnZS5tZXNzYWdlSWRlbnRpZmllcl0gPSB3aXJlTWVzc2FnZTtcblx0XHRcdH0gZWxzZSBpZiAoa2V5LmluZGV4T2YoXCJSZWNlaXZlZDpcIit0aGlzLl9sb2NhbEtleSkgPT09IDApIHtcblx0XHRcdFx0dGhpcy5fcmVjZWl2ZWRNZXNzYWdlc1t3aXJlTWVzc2FnZS5tZXNzYWdlSWRlbnRpZmllcl0gPSB3aXJlTWVzc2FnZTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUuX3Byb2Nlc3NfcXVldWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgbWVzc2FnZSA9IG51bGw7XG5cblx0XHRcdC8vIFNlbmQgYWxsIHF1ZXVlZCBtZXNzYWdlcyBkb3duIHNvY2tldCBjb25uZWN0aW9uXG5cdFx0XHR3aGlsZSAoKG1lc3NhZ2UgPSB0aGlzLl9tc2dfcXVldWUucG9wKCkpKSB7XG5cdFx0XHRcdHRoaXMuX3NvY2tldF9zZW5kKG1lc3NhZ2UpO1xuXHRcdFx0XHQvLyBOb3RpZnkgbGlzdGVuZXJzIHRoYXQgbWVzc2FnZSB3YXMgc3VjY2Vzc2Z1bGx5IHNlbnRcblx0XHRcdFx0aWYgKHRoaXMuX25vdGlmeV9tc2dfc2VudFttZXNzYWdlXSkge1xuXHRcdFx0XHRcdHRoaXMuX25vdGlmeV9tc2dfc2VudFttZXNzYWdlXSgpO1xuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl9ub3RpZnlfbXNnX3NlbnRbbWVzc2FnZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdCAqIEV4cGVjdCBhbiBBQ0sgcmVzcG9uc2UgZm9yIHRoaXMgbWVzc2FnZS4gQWRkIG1lc3NhZ2UgdG8gdGhlIHNldCBvZiBpbiBwcm9ncmVzc1xuXHQgKiBtZXNzYWdlcyBhbmQgc2V0IGFuIHVudXNlZCBpZGVudGlmaWVyIGluIHRoaXMgbWVzc2FnZS5cblx0ICogQGlnbm9yZVxuXHQgKi9cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fcmVxdWlyZXNfYWNrID0gZnVuY3Rpb24gKHdpcmVNZXNzYWdlKSB7XG5cdFx0XHR2YXIgbWVzc2FnZUNvdW50ID0gT2JqZWN0LmtleXModGhpcy5fc2VudE1lc3NhZ2VzKS5sZW5ndGg7XG5cdFx0XHRpZiAobWVzc2FnZUNvdW50ID4gdGhpcy5tYXhNZXNzYWdlSWRlbnRpZmllcilcblx0XHRcdFx0dGhyb3cgRXJyb3IgKFwiVG9vIG1hbnkgbWVzc2FnZXM6XCIrbWVzc2FnZUNvdW50KTtcblxuXHRcdFx0d2hpbGUodGhpcy5fc2VudE1lc3NhZ2VzW3RoaXMuX21lc3NhZ2VfaWRlbnRpZmllcl0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR0aGlzLl9tZXNzYWdlX2lkZW50aWZpZXIrKztcblx0XHRcdH1cblx0XHRcdHdpcmVNZXNzYWdlLm1lc3NhZ2VJZGVudGlmaWVyID0gdGhpcy5fbWVzc2FnZV9pZGVudGlmaWVyO1xuXHRcdFx0dGhpcy5fc2VudE1lc3NhZ2VzW3dpcmVNZXNzYWdlLm1lc3NhZ2VJZGVudGlmaWVyXSA9IHdpcmVNZXNzYWdlO1xuXHRcdFx0aWYgKHdpcmVNZXNzYWdlLnR5cGUgPT09IE1FU1NBR0VfVFlQRS5QVUJMSVNIKSB7XG5cdFx0XHRcdHRoaXMuc3RvcmUoXCJTZW50OlwiLCB3aXJlTWVzc2FnZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5fbWVzc2FnZV9pZGVudGlmaWVyID09PSB0aGlzLm1heE1lc3NhZ2VJZGVudGlmaWVyKSB7XG5cdFx0XHRcdHRoaXMuX21lc3NhZ2VfaWRlbnRpZmllciA9IDE7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHQgKiBDYWxsZWQgd2hlbiB0aGUgdW5kZXJseWluZyB3ZWJzb2NrZXQgaGFzIGJlZW4gb3BlbmVkLlxuXHQgKiBAaWdub3JlXG5cdCAqL1xuXHRcdENsaWVudEltcGwucHJvdG90eXBlLl9vbl9zb2NrZXRfb3BlbiA9IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBDcmVhdGUgdGhlIENPTk5FQ1QgbWVzc2FnZSBvYmplY3QuXG5cdFx0XHR2YXIgd2lyZU1lc3NhZ2UgPSBuZXcgV2lyZU1lc3NhZ2UoTUVTU0FHRV9UWVBFLkNPTk5FQ1QsIHRoaXMuY29ubmVjdE9wdGlvbnMpO1xuXHRcdFx0d2lyZU1lc3NhZ2UuY2xpZW50SWQgPSB0aGlzLmNsaWVudElkO1xuXHRcdFx0dGhpcy5fc29ja2V0X3NlbmQod2lyZU1lc3NhZ2UpO1xuXHRcdH07XG5cblx0XHQvKipcblx0ICogQ2FsbGVkIHdoZW4gdGhlIHVuZGVybHlpbmcgd2Vic29ja2V0IGhhcyByZWNlaXZlZCBhIGNvbXBsZXRlIHBhY2tldC5cblx0ICogQGlnbm9yZVxuXHQgKi9cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fb25fc29ja2V0X21lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdHRoaXMuX3RyYWNlKFwiQ2xpZW50Ll9vbl9zb2NrZXRfbWVzc2FnZVwiLCBldmVudC5kYXRhKTtcblx0XHRcdHZhciBtZXNzYWdlcyA9IHRoaXMuX2RlZnJhbWVNZXNzYWdlcyhldmVudC5kYXRhKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWVzc2FnZXMubGVuZ3RoOyBpKz0xKSB7XG5cdFx0XHRcdHRoaXMuX2hhbmRsZU1lc3NhZ2UobWVzc2FnZXNbaV0pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fZGVmcmFtZU1lc3NhZ2VzID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0dmFyIGJ5dGVBcnJheSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuXHRcdFx0dmFyIG1lc3NhZ2VzID0gW107XG5cdFx0XHRpZiAodGhpcy5yZWNlaXZlQnVmZmVyKSB7XG5cdFx0XHRcdHZhciBuZXdEYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5yZWNlaXZlQnVmZmVyLmxlbmd0aCtieXRlQXJyYXkubGVuZ3RoKTtcblx0XHRcdFx0bmV3RGF0YS5zZXQodGhpcy5yZWNlaXZlQnVmZmVyKTtcblx0XHRcdFx0bmV3RGF0YS5zZXQoYnl0ZUFycmF5LHRoaXMucmVjZWl2ZUJ1ZmZlci5sZW5ndGgpO1xuXHRcdFx0XHRieXRlQXJyYXkgPSBuZXdEYXRhO1xuXHRcdFx0XHRkZWxldGUgdGhpcy5yZWNlaXZlQnVmZmVyO1xuXHRcdFx0fVxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFyIG9mZnNldCA9IDA7XG5cdFx0XHRcdHdoaWxlKG9mZnNldCA8IGJ5dGVBcnJheS5sZW5ndGgpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gZGVjb2RlTWVzc2FnZShieXRlQXJyYXksb2Zmc2V0KTtcblx0XHRcdFx0XHR2YXIgd2lyZU1lc3NhZ2UgPSByZXN1bHRbMF07XG5cdFx0XHRcdFx0b2Zmc2V0ID0gcmVzdWx0WzFdO1xuXHRcdFx0XHRcdGlmICh3aXJlTWVzc2FnZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0bWVzc2FnZXMucHVzaCh3aXJlTWVzc2FnZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAob2Zmc2V0IDwgYnl0ZUFycmF5Lmxlbmd0aCkge1xuXHRcdFx0XHRcdHRoaXMucmVjZWl2ZUJ1ZmZlciA9IGJ5dGVBcnJheS5zdWJhcnJheShvZmZzZXQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHR2YXIgZXJyb3JTdGFjayA9ICgoZXJyb3IuaGFzT3duUHJvcGVydHkoXCJzdGFja1wiKSA9PSBcInVuZGVmaW5lZFwiKSA/IGVycm9yLnN0YWNrLnRvU3RyaW5nKCkgOiBcIk5vIEVycm9yIFN0YWNrIEF2YWlsYWJsZVwiKTtcblx0XHRcdFx0dGhpcy5fZGlzY29ubmVjdGVkKEVSUk9SLklOVEVSTkFMX0VSUk9SLmNvZGUgLCBmb3JtYXQoRVJST1IuSU5URVJOQUxfRVJST1IsIFtlcnJvci5tZXNzYWdlLGVycm9yU3RhY2tdKSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtZXNzYWdlcztcblx0XHR9O1xuXG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUuX2hhbmRsZU1lc3NhZ2UgPSBmdW5jdGlvbih3aXJlTWVzc2FnZSkge1xuXG5cdFx0XHR0aGlzLl90cmFjZShcIkNsaWVudC5faGFuZGxlTWVzc2FnZVwiLCB3aXJlTWVzc2FnZSk7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdHN3aXRjaCh3aXJlTWVzc2FnZS50eXBlKSB7XG5cdFx0XHRcdGNhc2UgTUVTU0FHRV9UWVBFLkNPTk5BQ0s6XG5cdFx0XHRcdFx0dGhpcy5fY29ubmVjdFRpbWVvdXQuY2FuY2VsKCk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX3JlY29ubmVjdFRpbWVvdXQpXG5cdFx0XHRcdFx0XHR0aGlzLl9yZWNvbm5lY3RUaW1lb3V0LmNhbmNlbCgpO1xuXG5cdFx0XHRcdFx0Ly8gSWYgd2UgaGF2ZSBzdGFydGVkIHVzaW5nIGNsZWFuIHNlc3Npb24gdGhlbiBjbGVhciB1cCB0aGUgbG9jYWwgc3RhdGUuXG5cdFx0XHRcdFx0aWYgKHRoaXMuY29ubmVjdE9wdGlvbnMuY2xlYW5TZXNzaW9uKSB7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gdGhpcy5fc2VudE1lc3NhZ2VzKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBzZW50TWVzc2FnZSA9IHRoaXMuX3NlbnRNZXNzYWdlc1trZXldO1xuXHRcdFx0XHRcdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIlNlbnQ6XCIrdGhpcy5fbG9jYWxLZXkrc2VudE1lc3NhZ2UubWVzc2FnZUlkZW50aWZpZXIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGhpcy5fc2VudE1lc3NhZ2VzID0ge307XG5cblx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiB0aGlzLl9yZWNlaXZlZE1lc3NhZ2VzKSB7XG5cdFx0XHRcdFx0XHRcdHZhciByZWNlaXZlZE1lc3NhZ2UgPSB0aGlzLl9yZWNlaXZlZE1lc3NhZ2VzW2tleV07XG5cdFx0XHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiUmVjZWl2ZWQ6XCIrdGhpcy5fbG9jYWxLZXkrcmVjZWl2ZWRNZXNzYWdlLm1lc3NhZ2VJZGVudGlmaWVyKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuX3JlY2VpdmVkTWVzc2FnZXMgPSB7fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gQ2xpZW50IGNvbm5lY3RlZCBhbmQgcmVhZHkgZm9yIGJ1c2luZXNzLlxuXHRcdFx0XHRcdGlmICh3aXJlTWVzc2FnZS5yZXR1cm5Db2RlID09PSAwKSB7XG5cblx0XHRcdFx0XHRcdHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdC8vIEp1bXAgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdCBvZiB1cmlzIGFuZCBzdG9wIGxvb2tpbmcgZm9yIGEgZ29vZCBob3N0LlxuXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5jb25uZWN0T3B0aW9ucy51cmlzKVxuXHRcdFx0XHRcdFx0XHR0aGlzLmhvc3RJbmRleCA9IHRoaXMuY29ubmVjdE9wdGlvbnMudXJpcy5sZW5ndGg7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5fZGlzY29ubmVjdGVkKEVSUk9SLkNPTk5BQ0tfUkVUVVJOQ09ERS5jb2RlICwgZm9ybWF0KEVSUk9SLkNPTk5BQ0tfUkVUVVJOQ09ERSwgW3dpcmVNZXNzYWdlLnJldHVybkNvZGUsIENPTk5BQ0tfUkNbd2lyZU1lc3NhZ2UucmV0dXJuQ29kZV1dKSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBSZXNlbmQgbWVzc2FnZXMuXG5cdFx0XHRcdFx0dmFyIHNlcXVlbmNlZE1lc3NhZ2VzID0gW107XG5cdFx0XHRcdFx0Zm9yICh2YXIgbXNnSWQgaW4gdGhpcy5fc2VudE1lc3NhZ2VzKSB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5fc2VudE1lc3NhZ2VzLmhhc093blByb3BlcnR5KG1zZ0lkKSlcblx0XHRcdFx0XHRcdFx0c2VxdWVuY2VkTWVzc2FnZXMucHVzaCh0aGlzLl9zZW50TWVzc2FnZXNbbXNnSWRdKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBBbHNvIHNjaGVkdWxlIHFvcyAwIGJ1ZmZlcmVkIG1lc3NhZ2VzIGlmIGFueVxuXHRcdFx0XHRcdGlmICh0aGlzLl9idWZmZXJlZF9tc2dfcXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0dmFyIG1zZyA9IG51bGw7XG5cdFx0XHRcdFx0XHR3aGlsZSAoKG1zZyA9IHRoaXMuX2J1ZmZlcmVkX21zZ19xdWV1ZS5wb3AoKSkpIHtcblx0XHRcdFx0XHRcdFx0c2VxdWVuY2VkTWVzc2FnZXMucHVzaChtc2cpO1xuXHRcdFx0XHRcdFx0XHRpZiAodGhpcy5vbk1lc3NhZ2VEZWxpdmVyZWQpXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fbm90aWZ5X21zZ19zZW50W21zZ10gPSB0aGlzLm9uTWVzc2FnZURlbGl2ZXJlZChtc2cucGF5bG9hZE1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFNvcnQgc2VudE1lc3NhZ2VzIGludG8gdGhlIG9yaWdpbmFsIHNlbnQgb3JkZXIuXG5cdFx0XHRcdFx0dmFyIHNlcXVlbmNlZE1lc3NhZ2VzID0gc2VxdWVuY2VkTWVzc2FnZXMuc29ydChmdW5jdGlvbihhLGIpIHtyZXR1cm4gYS5zZXF1ZW5jZSAtIGIuc2VxdWVuY2U7fSApO1xuXHRcdFx0XHRcdGZvciAodmFyIGk9MCwgbGVuPXNlcXVlbmNlZE1lc3NhZ2VzLmxlbmd0aDsgaTxsZW47IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIHNlbnRNZXNzYWdlID0gc2VxdWVuY2VkTWVzc2FnZXNbaV07XG5cdFx0XHRcdFx0XHRpZiAoc2VudE1lc3NhZ2UudHlwZSA9PSBNRVNTQUdFX1RZUEUuUFVCTElTSCAmJiBzZW50TWVzc2FnZS5wdWJSZWNSZWNlaXZlZCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgcHViUmVsTWVzc2FnZSA9IG5ldyBXaXJlTWVzc2FnZShNRVNTQUdFX1RZUEUuUFVCUkVMLCB7bWVzc2FnZUlkZW50aWZpZXI6c2VudE1lc3NhZ2UubWVzc2FnZUlkZW50aWZpZXJ9KTtcblx0XHRcdFx0XHRcdFx0dGhpcy5fc2NoZWR1bGVfbWVzc2FnZShwdWJSZWxNZXNzYWdlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3NjaGVkdWxlX21lc3NhZ2Uoc2VudE1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIEV4ZWN1dGUgdGhlIGNvbm5lY3RPcHRpb25zLm9uU3VjY2VzcyBjYWxsYmFjayBpZiB0aGVyZSBpcyBvbmUuXG5cdFx0XHRcdFx0Ly8gV2lsbCBhbHNvIG5vdyByZXR1cm4gaWYgdGhpcyBjb25uZWN0aW9uIHdhcyB0aGUgcmVzdWx0IG9mIGFuIGF1dG9tYXRpY1xuXHRcdFx0XHRcdC8vIHJlY29ubmVjdCBhbmQgd2hpY2ggVVJJIHdhcyBzdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvLlxuXHRcdFx0XHRcdGlmICh0aGlzLmNvbm5lY3RPcHRpb25zLm9uU3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0dGhpcy5jb25uZWN0T3B0aW9ucy5vblN1Y2Nlc3Moe2ludm9jYXRpb25Db250ZXh0OnRoaXMuY29ubmVjdE9wdGlvbnMuaW52b2NhdGlvbkNvbnRleHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgcmVjb25uZWN0ZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRpZiAodGhpcy5fcmVjb25uZWN0aW5nKSB7XG5cdFx0XHRcdFx0XHRyZWNvbm5lY3RlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR0aGlzLl9yZWNvbm5lY3RJbnRlcnZhbCA9IDE7XG5cdFx0XHRcdFx0XHR0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBFeGVjdXRlIHRoZSBvbkNvbm5lY3RlZCBjYWxsYmFjayBpZiB0aGVyZSBpcyBvbmUuXG5cdFx0XHRcdFx0dGhpcy5fY29ubmVjdGVkKHJlY29ubmVjdGVkLCB0aGlzLl93c3VyaSk7XG5cblx0XHRcdFx0XHQvLyBQcm9jZXNzIGFsbCBxdWV1ZWQgbWVzc2FnZXMgbm93IHRoYXQgdGhlIGNvbm5lY3Rpb24gaXMgZXN0YWJsaXNoZWQuXG5cdFx0XHRcdFx0dGhpcy5fcHJvY2Vzc19xdWV1ZSgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgTUVTU0FHRV9UWVBFLlBVQkxJU0g6XG5cdFx0XHRcdFx0dGhpcy5fcmVjZWl2ZVB1Ymxpc2god2lyZU1lc3NhZ2UpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgTUVTU0FHRV9UWVBFLlBVQkFDSzpcblx0XHRcdFx0XHR2YXIgc2VudE1lc3NhZ2UgPSB0aGlzLl9zZW50TWVzc2FnZXNbd2lyZU1lc3NhZ2UubWVzc2FnZUlkZW50aWZpZXJdO1xuXHRcdFx0XHRcdC8vIElmIHRoaXMgaXMgYSByZSBmbG93IG9mIGEgUFVCQUNLIGFmdGVyIHdlIGhhdmUgcmVzdGFydGVkIHJlY2VpdmVkTWVzc2FnZSB3aWxsIG5vdCBleGlzdC5cblx0XHRcdFx0XHRpZiAoc2VudE1lc3NhZ2UpIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl9zZW50TWVzc2FnZXNbd2lyZU1lc3NhZ2UubWVzc2FnZUlkZW50aWZpZXJdO1xuXHRcdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJTZW50OlwiK3RoaXMuX2xvY2FsS2V5K3dpcmVNZXNzYWdlLm1lc3NhZ2VJZGVudGlmaWVyKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLm9uTWVzc2FnZURlbGl2ZXJlZClcblx0XHRcdFx0XHRcdFx0dGhpcy5vbk1lc3NhZ2VEZWxpdmVyZWQoc2VudE1lc3NhZ2UucGF5bG9hZE1lc3NhZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIE1FU1NBR0VfVFlQRS5QVUJSRUM6XG5cdFx0XHRcdFx0dmFyIHNlbnRNZXNzYWdlID0gdGhpcy5fc2VudE1lc3NhZ2VzW3dpcmVNZXNzYWdlLm1lc3NhZ2VJZGVudGlmaWVyXTtcblx0XHRcdFx0XHQvLyBJZiB0aGlzIGlzIGEgcmUgZmxvdyBvZiBhIFBVQlJFQyBhZnRlciB3ZSBoYXZlIHJlc3RhcnRlZCByZWNlaXZlZE1lc3NhZ2Ugd2lsbCBub3QgZXhpc3QuXG5cdFx0XHRcdFx0aWYgKHNlbnRNZXNzYWdlKSB7XG5cdFx0XHRcdFx0XHRzZW50TWVzc2FnZS5wdWJSZWNSZWNlaXZlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR2YXIgcHViUmVsTWVzc2FnZSA9IG5ldyBXaXJlTWVzc2FnZShNRVNTQUdFX1RZUEUuUFVCUkVMLCB7bWVzc2FnZUlkZW50aWZpZXI6d2lyZU1lc3NhZ2UubWVzc2FnZUlkZW50aWZpZXJ9KTtcblx0XHRcdFx0XHRcdHRoaXMuc3RvcmUoXCJTZW50OlwiLCBzZW50TWVzc2FnZSk7XG5cdFx0XHRcdFx0XHR0aGlzLl9zY2hlZHVsZV9tZXNzYWdlKHB1YlJlbE1lc3NhZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIE1FU1NBR0VfVFlQRS5QVUJSRUw6XG5cdFx0XHRcdFx0dmFyIHJlY2VpdmVkTWVzc2FnZSA9IHRoaXMuX3JlY2VpdmVkTWVzc2FnZXNbd2lyZU1lc3NhZ2UubWVzc2FnZUlkZW50aWZpZXJdO1xuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiUmVjZWl2ZWQ6XCIrdGhpcy5fbG9jYWxLZXkrd2lyZU1lc3NhZ2UubWVzc2FnZUlkZW50aWZpZXIpO1xuXHRcdFx0XHRcdC8vIElmIHRoaXMgaXMgYSByZSBmbG93IG9mIGEgUFVCUkVMIGFmdGVyIHdlIGhhdmUgcmVzdGFydGVkIHJlY2VpdmVkTWVzc2FnZSB3aWxsIG5vdCBleGlzdC5cblx0XHRcdFx0XHRpZiAocmVjZWl2ZWRNZXNzYWdlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9yZWNlaXZlTWVzc2FnZShyZWNlaXZlZE1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3JlY2VpdmVkTWVzc2FnZXNbd2lyZU1lc3NhZ2UubWVzc2FnZUlkZW50aWZpZXJdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBBbHdheXMgZmxvdyBQdWJDb21wLCB3ZSBtYXkgaGF2ZSBwcmV2aW91c2x5IGZsb3dlZCBQdWJDb21wIGJ1dCB0aGUgc2VydmVyIGxvc3QgaXQgYW5kIHJlc3RhcnRlZC5cblx0XHRcdFx0XHR2YXIgcHViQ29tcE1lc3NhZ2UgPSBuZXcgV2lyZU1lc3NhZ2UoTUVTU0FHRV9UWVBFLlBVQkNPTVAsIHttZXNzYWdlSWRlbnRpZmllcjp3aXJlTWVzc2FnZS5tZXNzYWdlSWRlbnRpZmllcn0pO1xuXHRcdFx0XHRcdHRoaXMuX3NjaGVkdWxlX21lc3NhZ2UocHViQ29tcE1lc3NhZ2UpO1xuXG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIE1FU1NBR0VfVFlQRS5QVUJDT01QOlxuXHRcdFx0XHRcdHZhciBzZW50TWVzc2FnZSA9IHRoaXMuX3NlbnRNZXNzYWdlc1t3aXJlTWVzc2FnZS5tZXNzYWdlSWRlbnRpZmllcl07XG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3NlbnRNZXNzYWdlc1t3aXJlTWVzc2FnZS5tZXNzYWdlSWRlbnRpZmllcl07XG5cdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJTZW50OlwiK3RoaXMuX2xvY2FsS2V5K3dpcmVNZXNzYWdlLm1lc3NhZ2VJZGVudGlmaWVyKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vbk1lc3NhZ2VEZWxpdmVyZWQpXG5cdFx0XHRcdFx0XHR0aGlzLm9uTWVzc2FnZURlbGl2ZXJlZChzZW50TWVzc2FnZS5wYXlsb2FkTWVzc2FnZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSBNRVNTQUdFX1RZUEUuU1VCQUNLOlxuXHRcdFx0XHRcdHZhciBzZW50TWVzc2FnZSA9IHRoaXMuX3NlbnRNZXNzYWdlc1t3aXJlTWVzc2FnZS5tZXNzYWdlSWRlbnRpZmllcl07XG5cdFx0XHRcdFx0aWYgKHNlbnRNZXNzYWdlKSB7XG5cdFx0XHRcdFx0XHRpZihzZW50TWVzc2FnZS50aW1lT3V0KVxuXHRcdFx0XHRcdFx0XHRzZW50TWVzc2FnZS50aW1lT3V0LmNhbmNlbCgpO1xuXHRcdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIG5lZWQgdG8gYmUgZml4ZWQgd2hlbiB3ZSBhZGQgbXVsdGlwbGUgdG9waWMgc3VwcG9ydFxuXHRcdFx0XHRcdFx0aWYgKHdpcmVNZXNzYWdlLnJldHVybkNvZGVbMF0gPT09IDB4ODApIHtcblx0XHRcdFx0XHRcdFx0aWYgKHNlbnRNZXNzYWdlLm9uRmFpbHVyZSkge1xuXHRcdFx0XHRcdFx0XHRcdHNlbnRNZXNzYWdlLm9uRmFpbHVyZSh3aXJlTWVzc2FnZS5yZXR1cm5Db2RlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChzZW50TWVzc2FnZS5vblN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdFx0c2VudE1lc3NhZ2Uub25TdWNjZXNzKHdpcmVNZXNzYWdlLnJldHVybkNvZGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3NlbnRNZXNzYWdlc1t3aXJlTWVzc2FnZS5tZXNzYWdlSWRlbnRpZmllcl07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgTUVTU0FHRV9UWVBFLlVOU1VCQUNLOlxuXHRcdFx0XHRcdHZhciBzZW50TWVzc2FnZSA9IHRoaXMuX3NlbnRNZXNzYWdlc1t3aXJlTWVzc2FnZS5tZXNzYWdlSWRlbnRpZmllcl07XG5cdFx0XHRcdFx0aWYgKHNlbnRNZXNzYWdlKSB7XG5cdFx0XHRcdFx0XHRpZiAoc2VudE1lc3NhZ2UudGltZU91dClcblx0XHRcdFx0XHRcdFx0c2VudE1lc3NhZ2UudGltZU91dC5jYW5jZWwoKTtcblx0XHRcdFx0XHRcdGlmIChzZW50TWVzc2FnZS5jYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0XHRzZW50TWVzc2FnZS5jYWxsYmFjaygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3NlbnRNZXNzYWdlc1t3aXJlTWVzc2FnZS5tZXNzYWdlSWRlbnRpZmllcl07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSBNRVNTQUdFX1RZUEUuUElOR1JFU1A6XG5cdFx0XHRcdC8qIFRoZSBzZW5kUGluZ2VyIG9yIHJlY2VpdmVQaW5nZXIgbWF5IGhhdmUgc2VudCBhIHBpbmcsIHRoZSByZWNlaXZlUGluZ2VyIGhhcyBhbHJlYWR5IGJlZW4gcmVzZXQuICovXG5cdFx0XHRcdFx0dGhpcy5zZW5kUGluZ2VyLnJlc2V0KCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSBNRVNTQUdFX1RZUEUuRElTQ09OTkVDVDpcblx0XHRcdFx0Ly8gQ2xpZW50cyBkbyBub3QgZXhwZWN0IHRvIHJlY2VpdmUgZGlzY29ubmVjdCBwYWNrZXRzLlxuXHRcdFx0XHRcdHRoaXMuX2Rpc2Nvbm5lY3RlZChFUlJPUi5JTlZBTElEX01RVFRfTUVTU0FHRV9UWVBFLmNvZGUgLCBmb3JtYXQoRVJST1IuSU5WQUxJRF9NUVRUX01FU1NBR0VfVFlQRSwgW3dpcmVNZXNzYWdlLnR5cGVdKSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR0aGlzLl9kaXNjb25uZWN0ZWQoRVJST1IuSU5WQUxJRF9NUVRUX01FU1NBR0VfVFlQRS5jb2RlICwgZm9ybWF0KEVSUk9SLklOVkFMSURfTVFUVF9NRVNTQUdFX1RZUEUsIFt3aXJlTWVzc2FnZS50eXBlXSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHR2YXIgZXJyb3JTdGFjayA9ICgoZXJyb3IuaGFzT3duUHJvcGVydHkoXCJzdGFja1wiKSA9PSBcInVuZGVmaW5lZFwiKSA/IGVycm9yLnN0YWNrLnRvU3RyaW5nKCkgOiBcIk5vIEVycm9yIFN0YWNrIEF2YWlsYWJsZVwiKTtcblx0XHRcdFx0dGhpcy5fZGlzY29ubmVjdGVkKEVSUk9SLklOVEVSTkFMX0VSUk9SLmNvZGUgLCBmb3JtYXQoRVJST1IuSU5URVJOQUxfRVJST1IsIFtlcnJvci5tZXNzYWdlLGVycm9yU3RhY2tdKSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqIEBpZ25vcmUgKi9cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fb25fc29ja2V0X2Vycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRpZiAoIXRoaXMuX3JlY29ubmVjdGluZykge1xuXHRcdFx0XHR0aGlzLl9kaXNjb25uZWN0ZWQoRVJST1IuU09DS0VUX0VSUk9SLmNvZGUgLCBmb3JtYXQoRVJST1IuU09DS0VUX0VSUk9SLCBbZXJyb3IuZGF0YV0pKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqIEBpZ25vcmUgKi9cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fb25fc29ja2V0X2Nsb3NlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCF0aGlzLl9yZWNvbm5lY3RpbmcpIHtcblx0XHRcdFx0dGhpcy5fZGlzY29ubmVjdGVkKEVSUk9SLlNPQ0tFVF9DTE9TRS5jb2RlICwgZm9ybWF0KEVSUk9SLlNPQ0tFVF9DTE9TRSkpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKiogQGlnbm9yZSAqL1xuXHRcdENsaWVudEltcGwucHJvdG90eXBlLl9zb2NrZXRfc2VuZCA9IGZ1bmN0aW9uICh3aXJlTWVzc2FnZSkge1xuXG5cdFx0XHRpZiAod2lyZU1lc3NhZ2UudHlwZSA9PSAxKSB7XG5cdFx0XHRcdHZhciB3aXJlTWVzc2FnZU1hc2tlZCA9IHRoaXMuX3RyYWNlTWFzayh3aXJlTWVzc2FnZSwgXCJwYXNzd29yZFwiKTtcblx0XHRcdFx0dGhpcy5fdHJhY2UoXCJDbGllbnQuX3NvY2tldF9zZW5kXCIsIHdpcmVNZXNzYWdlTWFza2VkKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgdGhpcy5fdHJhY2UoXCJDbGllbnQuX3NvY2tldF9zZW5kXCIsIHdpcmVNZXNzYWdlKTtcblxuXHRcdFx0dGhpcy5zb2NrZXQuc2VuZCh3aXJlTWVzc2FnZS5lbmNvZGUoKSk7XG5cdFx0XHQvKiBXZSBoYXZlIHByb3ZlZCB0byB0aGUgc2VydmVyIHdlIGFyZSBhbGl2ZS4gKi9cblx0XHRcdHRoaXMuc2VuZFBpbmdlci5yZXNldCgpO1xuXHRcdH07XG5cblx0XHQvKiogQGlnbm9yZSAqL1xuXHRcdENsaWVudEltcGwucHJvdG90eXBlLl9yZWNlaXZlUHVibGlzaCA9IGZ1bmN0aW9uICh3aXJlTWVzc2FnZSkge1xuXHRcdFx0c3dpdGNoKHdpcmVNZXNzYWdlLnBheWxvYWRNZXNzYWdlLnFvcykge1xuXHRcdFx0Y2FzZSBcInVuZGVmaW5lZFwiOlxuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHR0aGlzLl9yZWNlaXZlTWVzc2FnZSh3aXJlTWVzc2FnZSk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHZhciBwdWJBY2tNZXNzYWdlID0gbmV3IFdpcmVNZXNzYWdlKE1FU1NBR0VfVFlQRS5QVUJBQ0ssIHttZXNzYWdlSWRlbnRpZmllcjp3aXJlTWVzc2FnZS5tZXNzYWdlSWRlbnRpZmllcn0pO1xuXHRcdFx0XHR0aGlzLl9zY2hlZHVsZV9tZXNzYWdlKHB1YkFja01lc3NhZ2UpO1xuXHRcdFx0XHR0aGlzLl9yZWNlaXZlTWVzc2FnZSh3aXJlTWVzc2FnZSk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHRoaXMuX3JlY2VpdmVkTWVzc2FnZXNbd2lyZU1lc3NhZ2UubWVzc2FnZUlkZW50aWZpZXJdID0gd2lyZU1lc3NhZ2U7XG5cdFx0XHRcdHRoaXMuc3RvcmUoXCJSZWNlaXZlZDpcIiwgd2lyZU1lc3NhZ2UpO1xuXHRcdFx0XHR2YXIgcHViUmVjTWVzc2FnZSA9IG5ldyBXaXJlTWVzc2FnZShNRVNTQUdFX1RZUEUuUFVCUkVDLCB7bWVzc2FnZUlkZW50aWZpZXI6d2lyZU1lc3NhZ2UubWVzc2FnZUlkZW50aWZpZXJ9KTtcblx0XHRcdFx0dGhpcy5fc2NoZWR1bGVfbWVzc2FnZShwdWJSZWNNZXNzYWdlKTtcblxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgRXJyb3IoXCJJbnZhaWxkIHFvcz1cIiArIHdpcmVNZXNzYWdlLnBheWxvYWRNZXNzYWdlLnFvcyk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKiBAaWdub3JlICovXG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUuX3JlY2VpdmVNZXNzYWdlID0gZnVuY3Rpb24gKHdpcmVNZXNzYWdlKSB7XG5cdFx0XHRpZiAodGhpcy5vbk1lc3NhZ2VBcnJpdmVkKSB7XG5cdFx0XHRcdHRoaXMub25NZXNzYWdlQXJyaXZlZCh3aXJlTWVzc2FnZS5wYXlsb2FkTWVzc2FnZSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHQgKiBDbGllbnQgaGFzIGNvbm5lY3RlZC5cblx0ICogQHBhcmFtIHtyZWNvbm5lY3R9IFtib29sZWFuXSBpbmRpY2F0ZSBpZiB0aGlzIHdhcyBhIHJlc3VsdCBvZiByZWNvbm5lY3Qgb3BlcmF0aW9uLlxuXHQgKiBAcGFyYW0ge3VyaX0gW3N0cmluZ10gZnVsbHkgcXVhbGlmaWVkIFdlYlNvY2tldCBVUkkgb2YgdGhlIHNlcnZlci5cblx0ICovXG5cdFx0Q2xpZW50SW1wbC5wcm90b3R5cGUuX2Nvbm5lY3RlZCA9IGZ1bmN0aW9uIChyZWNvbm5lY3QsIHVyaSkge1xuXHRcdC8vIEV4ZWN1dGUgdGhlIG9uQ29ubmVjdGVkIGNhbGxiYWNrIGlmIHRoZXJlIGlzIG9uZS5cblx0XHRcdGlmICh0aGlzLm9uQ29ubmVjdGVkKVxuXHRcdFx0XHR0aGlzLm9uQ29ubmVjdGVkKHJlY29ubmVjdCwgdXJpKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdCAqIEF0dGVtcHRzIHRvIHJlY29ubmVjdCB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIuXG4gICAqIEZvciBlYWNoIHJlY29ubmVjdCBhdHRlbXB0LCB3aWxsIGRvdWJsZSB0aGUgcmVjb25uZWN0IGludGVydmFsXG4gICAqIHVwIHRvIDEyOCBzZWNvbmRzLlxuXHQgKi9cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fcmVjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fdHJhY2UoXCJDbGllbnQuX3JlY29ubmVjdFwiKTtcblx0XHRcdGlmICghdGhpcy5jb25uZWN0ZWQpIHtcblx0XHRcdFx0dGhpcy5fcmVjb25uZWN0aW5nID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5zZW5kUGluZ2VyLmNhbmNlbCgpO1xuXHRcdFx0XHR0aGlzLnJlY2VpdmVQaW5nZXIuY2FuY2VsKCk7XG5cdFx0XHRcdGlmICh0aGlzLl9yZWNvbm5lY3RJbnRlcnZhbCA8IDEyOClcblx0XHRcdFx0XHR0aGlzLl9yZWNvbm5lY3RJbnRlcnZhbCA9IHRoaXMuX3JlY29ubmVjdEludGVydmFsICogMjtcblx0XHRcdFx0aWYgKHRoaXMuY29ubmVjdE9wdGlvbnMudXJpcykge1xuXHRcdFx0XHRcdHRoaXMuaG9zdEluZGV4ID0gMDtcblx0XHRcdFx0XHR0aGlzLl9kb0Nvbm5lY3QodGhpcy5jb25uZWN0T3B0aW9ucy51cmlzWzBdKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9kb0Nvbm5lY3QodGhpcy51cmkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHQgKiBDbGllbnQgaGFzIGRpc2Nvbm5lY3RlZCBlaXRoZXIgYXQgaXRzIG93biByZXF1ZXN0IG9yIGJlY2F1c2UgdGhlIHNlcnZlclxuXHQgKiBvciBuZXR3b3JrIGRpc2Nvbm5lY3RlZCBpdC4gUmVtb3ZlIGFsbCBub24tZHVyYWJsZSBzdGF0ZS5cblx0ICogQHBhcmFtIHtlcnJvckNvZGV9IFtudW1iZXJdIHRoZSBlcnJvciBudW1iZXIuXG5cdCAqIEBwYXJhbSB7ZXJyb3JUZXh0fSBbc3RyaW5nXSB0aGUgZXJyb3IgdGV4dC5cblx0ICogQGlnbm9yZVxuXHQgKi9cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fZGlzY29ubmVjdGVkID0gZnVuY3Rpb24gKGVycm9yQ29kZSwgZXJyb3JUZXh0KSB7XG5cdFx0XHR0aGlzLl90cmFjZShcIkNsaWVudC5fZGlzY29ubmVjdGVkXCIsIGVycm9yQ29kZSwgZXJyb3JUZXh0KTtcblxuXHRcdFx0aWYgKGVycm9yQ29kZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuX3JlY29ubmVjdGluZykge1xuXHRcdFx0XHQvL0NvbnRpbnVlIGF1dG9tYXRpYyByZWNvbm5lY3QgcHJvY2Vzc1xuXHRcdFx0XHR0aGlzLl9yZWNvbm5lY3RUaW1lb3V0ID0gbmV3IFRpbWVvdXQodGhpcywgdGhpcy5fcmVjb25uZWN0SW50ZXJ2YWwsIHRoaXMuX3JlY29ubmVjdCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zZW5kUGluZ2VyLmNhbmNlbCgpO1xuXHRcdFx0dGhpcy5yZWNlaXZlUGluZ2VyLmNhbmNlbCgpO1xuXHRcdFx0aWYgKHRoaXMuX2Nvbm5lY3RUaW1lb3V0KSB7XG5cdFx0XHRcdHRoaXMuX2Nvbm5lY3RUaW1lb3V0LmNhbmNlbCgpO1xuXHRcdFx0XHR0aGlzLl9jb25uZWN0VGltZW91dCA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENsZWFyIG1lc3NhZ2UgYnVmZmVycy5cblx0XHRcdHRoaXMuX21zZ19xdWV1ZSA9IFtdO1xuXHRcdFx0dGhpcy5fYnVmZmVyZWRfbXNnX3F1ZXVlID0gW107XG5cdFx0XHR0aGlzLl9ub3RpZnlfbXNnX3NlbnQgPSB7fTtcblxuXHRcdFx0aWYgKHRoaXMuc29ja2V0KSB7XG5cdFx0XHQvLyBDYW5jZWwgYWxsIHNvY2tldCBjYWxsYmFja3Mgc28gdGhhdCB0aGV5IGNhbm5vdCBiZSBkcml2ZW4gYWdhaW4gYnkgdGhpcyBzb2NrZXQuXG5cdFx0XHRcdHRoaXMuc29ja2V0Lm9ub3BlbiA9IG51bGw7XG5cdFx0XHRcdHRoaXMuc29ja2V0Lm9ubWVzc2FnZSA9IG51bGw7XG5cdFx0XHRcdHRoaXMuc29ja2V0Lm9uZXJyb3IgPSBudWxsO1xuXHRcdFx0XHR0aGlzLnNvY2tldC5vbmNsb3NlID0gbnVsbDtcblx0XHRcdFx0aWYgKHRoaXMuc29ja2V0LnJlYWR5U3RhdGUgPT09IDEpXG5cdFx0XHRcdFx0dGhpcy5zb2NrZXQuY2xvc2UoKTtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuc29ja2V0O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5jb25uZWN0T3B0aW9ucy51cmlzICYmIHRoaXMuaG9zdEluZGV4IDwgdGhpcy5jb25uZWN0T3B0aW9ucy51cmlzLmxlbmd0aC0xKSB7XG5cdFx0XHQvLyBUcnkgdGhlIG5leHQgaG9zdC5cblx0XHRcdFx0dGhpcy5ob3N0SW5kZXgrKztcblx0XHRcdFx0dGhpcy5fZG9Db25uZWN0KHRoaXMuY29ubmVjdE9wdGlvbnMudXJpc1t0aGlzLmhvc3RJbmRleF0pO1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRpZiAoZXJyb3JDb2RlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRlcnJvckNvZGUgPSBFUlJPUi5PSy5jb2RlO1xuXHRcdFx0XHRcdGVycm9yVGV4dCA9IGZvcm1hdChFUlJPUi5PSyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSdW4gYW55IGFwcGxpY2F0aW9uIGNhbGxiYWNrcyBsYXN0IGFzIHRoZXkgbWF5IGF0dGVtcHQgdG8gcmVjb25uZWN0IGFuZCBoZW5jZSBjcmVhdGUgYSBuZXcgc29ja2V0LlxuXHRcdFx0XHRpZiAodGhpcy5jb25uZWN0ZWQpIHtcblx0XHRcdFx0XHR0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdC8vIEV4ZWN1dGUgdGhlIGNvbm5lY3Rpb25Mb3N0Q2FsbGJhY2sgaWYgdGhlcmUgaXMgb25lLCBhbmQgd2Ugd2VyZSBjb25uZWN0ZWQuXG5cdFx0XHRcdFx0aWYgKHRoaXMub25Db25uZWN0aW9uTG9zdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5vbkNvbm5lY3Rpb25Mb3N0KHtlcnJvckNvZGU6ZXJyb3JDb2RlLCBlcnJvck1lc3NhZ2U6ZXJyb3JUZXh0LCByZWNvbm5lY3Q6dGhpcy5jb25uZWN0T3B0aW9ucy5yZWNvbm5lY3QsIHVyaTp0aGlzLl93c3VyaX0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoZXJyb3JDb2RlICE9PSBFUlJPUi5PSy5jb2RlICYmIHRoaXMuY29ubmVjdE9wdGlvbnMucmVjb25uZWN0KSB7XG5cdFx0XHRcdFx0Ly8gU3RhcnQgYXV0b21hdGljIHJlY29ubmVjdCBwcm9jZXNzIGZvciB0aGUgdmVyeSBmaXJzdCB0aW1lIHNpbmNlIGxhc3Qgc3VjY2Vzc2Z1bCBjb25uZWN0LlxuXHRcdFx0XHRcdFx0dGhpcy5fcmVjb25uZWN0SW50ZXJ2YWwgPSAxO1xuXHRcdFx0XHRcdFx0dGhpcy5fcmVjb25uZWN0KCk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBPdGhlcndpc2Ugd2UgbmV2ZXIgaGFkIGEgY29ubmVjdGlvbiwgc28gaW5kaWNhdGUgdGhhdCB0aGUgY29ubmVjdCBoYXMgZmFpbGVkLlxuXHRcdFx0XHRcdGlmICh0aGlzLmNvbm5lY3RPcHRpb25zLm1xdHRWZXJzaW9uID09PSA0ICYmIHRoaXMuY29ubmVjdE9wdGlvbnMubXF0dFZlcnNpb25FeHBsaWNpdCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3RyYWNlKFwiRmFpbGVkIHRvIGNvbm5lY3QgVjQsIGRyb3BwaW5nIGJhY2sgdG8gVjNcIik7XG5cdFx0XHRcdFx0XHR0aGlzLmNvbm5lY3RPcHRpb25zLm1xdHRWZXJzaW9uID0gMztcblx0XHRcdFx0XHRcdGlmICh0aGlzLmNvbm5lY3RPcHRpb25zLnVyaXMpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5ob3N0SW5kZXggPSAwO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9kb0Nvbm5lY3QodGhpcy5jb25uZWN0T3B0aW9ucy51cmlzWzBdKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2RvQ29ubmVjdCh0aGlzLnVyaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmKHRoaXMuY29ubmVjdE9wdGlvbnMub25GYWlsdXJlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmNvbm5lY3RPcHRpb25zLm9uRmFpbHVyZSh7aW52b2NhdGlvbkNvbnRleHQ6dGhpcy5jb25uZWN0T3B0aW9ucy5pbnZvY2F0aW9uQ29udGV4dCwgZXJyb3JDb2RlOmVycm9yQ29kZSwgZXJyb3JNZXNzYWdlOmVycm9yVGV4dH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKiogQGlnbm9yZSAqL1xuXHRcdENsaWVudEltcGwucHJvdG90eXBlLl90cmFjZSA9IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBQYXNzIHRyYWNlIG1lc3NhZ2UgYmFjayB0byBjbGllbnQncyBjYWxsYmFjayBmdW5jdGlvblxuXHRcdFx0aWYgKHRoaXMudHJhY2VGdW5jdGlvbikge1xuXHRcdFx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0XHRcdGZvciAodmFyIGkgaW4gYXJncylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgYXJnc1tpXSAhPT0gXCJ1bmRlZmluZWRcIilcblx0XHRcdFx0XHRcdGFyZ3Muc3BsaWNlKGksIDEsIEpTT04uc3RyaW5naWZ5KGFyZ3NbaV0pKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgcmVjb3JkID0gYXJncy5qb2luKFwiXCIpO1xuXHRcdFx0XHR0aGlzLnRyYWNlRnVuY3Rpb24gKHtzZXZlcml0eTogXCJEZWJ1Z1wiLCBtZXNzYWdlOiByZWNvcmRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvL2J1ZmZlciBzdHlsZSB0cmFjZVxuXHRcdFx0aWYgKCB0aGlzLl90cmFjZUJ1ZmZlciAhPT0gbnVsbCApIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIG1heCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuXHRcdFx0XHRcdGlmICggdGhpcy5fdHJhY2VCdWZmZXIubGVuZ3RoID09IHRoaXMuX01BWF9UUkFDRV9FTlRSSUVTICkge1xuXHRcdFx0XHRcdFx0dGhpcy5fdHJhY2VCdWZmZXIuc2hpZnQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGkgPT09IDApIHRoaXMuX3RyYWNlQnVmZmVyLnB1c2goYXJndW1lbnRzW2ldKTtcblx0XHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzW2ldID09PSBcInVuZGVmaW5lZFwiICkgdGhpcy5fdHJhY2VCdWZmZXIucHVzaChhcmd1bWVudHNbaV0pO1xuXHRcdFx0XHRcdGVsc2UgdGhpcy5fdHJhY2VCdWZmZXIucHVzaChcIiAgXCIrSlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzW2ldKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqIEBpZ25vcmUgKi9cblx0XHRDbGllbnRJbXBsLnByb3RvdHlwZS5fdHJhY2VNYXNrID0gZnVuY3Rpb24gKHRyYWNlT2JqZWN0LCBtYXNrZWQpIHtcblx0XHRcdHZhciB0cmFjZU9iamVjdE1hc2tlZCA9IHt9O1xuXHRcdFx0Zm9yICh2YXIgYXR0ciBpbiB0cmFjZU9iamVjdCkge1xuXHRcdFx0XHRpZiAodHJhY2VPYmplY3QuaGFzT3duUHJvcGVydHkoYXR0cikpIHtcblx0XHRcdFx0XHRpZiAoYXR0ciA9PSBtYXNrZWQpXG5cdFx0XHRcdFx0XHR0cmFjZU9iamVjdE1hc2tlZFthdHRyXSA9IFwiKioqKioqXCI7XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0dHJhY2VPYmplY3RNYXNrZWRbYXR0cl0gPSB0cmFjZU9iamVjdFthdHRyXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRyYWNlT2JqZWN0TWFza2VkO1xuXHRcdH07XG5cblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQvLyBQdWJsaWMgUHJvZ3JhbW1pbmcgaW50ZXJmYWNlLlxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0LyoqXG5cdCAqIFRoZSBKYXZhU2NyaXB0IGFwcGxpY2F0aW9uIGNvbW11bmljYXRlcyB0byB0aGUgc2VydmVyIHVzaW5nIGEge0BsaW5rIFBhaG8uQ2xpZW50fSBvYmplY3QuXG5cdCAqIDxwPlxuXHQgKiBNb3N0IGFwcGxpY2F0aW9ucyB3aWxsIGNyZWF0ZSBqdXN0IG9uZSBDbGllbnQgb2JqZWN0IGFuZCB0aGVuIGNhbGwgaXRzIGNvbm5lY3QoKSBtZXRob2QsXG5cdCAqIGhvd2V2ZXIgYXBwbGljYXRpb25zIGNhbiBjcmVhdGUgbW9yZSB0aGFuIG9uZSBDbGllbnQgb2JqZWN0IGlmIHRoZXkgd2lzaC5cblx0ICogSW4gdGhpcyBjYXNlIHRoZSBjb21iaW5hdGlvbiBvZiBob3N0LCBwb3J0IGFuZCBjbGllbnRJZCBhdHRyaWJ1dGVzIG11c3QgYmUgZGlmZmVyZW50IGZvciBlYWNoIENsaWVudCBvYmplY3QuXG5cdCAqIDxwPlxuXHQgKiBUaGUgc2VuZCwgc3Vic2NyaWJlIGFuZCB1bnN1YnNjcmliZSBtZXRob2RzIGFyZSBpbXBsZW1lbnRlZCBhcyBhc3luY2hyb25vdXMgSmF2YVNjcmlwdCBtZXRob2RzXG5cdCAqIChldmVuIHRob3VnaCB0aGUgdW5kZXJseWluZyBwcm90b2NvbCBleGNoYW5nZSBtaWdodCBiZSBzeW5jaHJvbm91cyBpbiBuYXR1cmUpLlxuXHQgKiBUaGlzIG1lYW5zIHRoZXkgc2lnbmFsIHRoZWlyIGNvbXBsZXRpb24gYnkgY2FsbGluZyBiYWNrIHRvIHRoZSBhcHBsaWNhdGlvbixcblx0ICogdmlhIFN1Y2Nlc3Mgb3IgRmFpbHVyZSBjYWxsYmFjayBmdW5jdGlvbnMgcHJvdmlkZWQgYnkgdGhlIGFwcGxpY2F0aW9uIG9uIHRoZSBtZXRob2QgaW4gcXVlc3Rpb24uXG5cdCAqIFN1Y2ggY2FsbGJhY2tzIGFyZSBjYWxsZWQgYXQgbW9zdCBvbmNlIHBlciBtZXRob2QgaW52b2NhdGlvbiBhbmQgZG8gbm90IHBlcnNpc3QgYmV5b25kIHRoZSBsaWZldGltZVxuXHQgKiBvZiB0aGUgc2NyaXB0IHRoYXQgbWFkZSB0aGUgaW52b2NhdGlvbi5cblx0ICogPHA+XG5cdCAqIEluIGNvbnRyYXN0IHRoZXJlIGFyZSBzb21lIGNhbGxiYWNrIGZ1bmN0aW9ucywgbW9zdCBub3RhYmx5IDxpPm9uTWVzc2FnZUFycml2ZWQ8L2k+LFxuXHQgKiB0aGF0IGFyZSBkZWZpbmVkIG9uIHRoZSB7QGxpbmsgUGFoby5DbGllbnR9IG9iamVjdC5cblx0ICogVGhlc2UgbWF5IGdldCBjYWxsZWQgbXVsdGlwbGUgdGltZXMsIGFuZCBhcmVuJ3QgZGlyZWN0bHkgcmVsYXRlZCB0byBzcGVjaWZpYyBtZXRob2QgaW52b2NhdGlvbnMgbWFkZSBieSB0aGUgY2xpZW50LlxuXHQgKlxuXHQgKiBAbmFtZSBQYWhvLkNsaWVudFxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGhvc3QgLSB0aGUgYWRkcmVzcyBvZiB0aGUgbWVzc2FnaW5nIHNlcnZlciwgYXMgYSBmdWxseSBxdWFsaWZpZWQgV2ViU29ja2V0IFVSSSwgYXMgYSBETlMgbmFtZSBvciBkb3R0ZWQgZGVjaW1hbCBJUCBhZGRyZXNzLlxuXHQgKiBAcGFyYW0ge251bWJlcn0gcG9ydCAtIHRoZSBwb3J0IG51bWJlciB0byBjb25uZWN0IHRvIC0gb25seSByZXF1aXJlZCBpZiBob3N0IGlzIG5vdCBhIFVSSVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBwYXRoIG9uIHRoZSBob3N0IHRvIGNvbm5lY3QgdG8gLSBvbmx5IHVzZWQgaWYgaG9zdCBpcyBub3QgYSBVUkkuIERlZmF1bHQ6ICcvbXF0dCcuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjbGllbnRJZCAtIHRoZSBNZXNzYWdpbmcgY2xpZW50IGlkZW50aWZpZXIsIGJldHdlZW4gMSBhbmQgMjMgY2hhcmFjdGVycyBpbiBsZW5ndGguXG5cdCAqXG5cdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBob3N0IC0gPGk+cmVhZCBvbmx5PC9pPiB0aGUgc2VydmVyJ3MgRE5TIGhvc3RuYW1lIG9yIGRvdHRlZCBkZWNpbWFsIElQIGFkZHJlc3MuXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwb3J0IC0gPGk+cmVhZCBvbmx5PC9pPiB0aGUgc2VydmVyJ3MgcG9ydC5cblx0ICogQHByb3BlcnR5IHtzdHJpbmd9IHBhdGggLSA8aT5yZWFkIG9ubHk8L2k+IHRoZSBzZXJ2ZXIncyBwYXRoLlxuXHQgKiBAcHJvcGVydHkge3N0cmluZ30gY2xpZW50SWQgLSA8aT5yZWFkIG9ubHk8L2k+IHVzZWQgd2hlbiBjb25uZWN0aW5nIHRvIHRoZSBzZXJ2ZXIuXG5cdCAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IG9uQ29ubmVjdGlvbkxvc3QgLSBjYWxsZWQgd2hlbiBhIGNvbm5lY3Rpb24gaGFzIGJlZW4gbG9zdC5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgYSBjb25uZWN0KCkgbWV0aG9kIGhhcyBzdWNjZWVkZWQuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVzdGFibGlzaCB0aGUgY2FsbCBiYWNrIHVzZWQgd2hlbiBhIGNvbm5lY3Rpb24gaGFzIGJlZW4gbG9zdC4gVGhlIGNvbm5lY3Rpb24gbWF5IGJlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3QgYmVjYXVzZSB0aGUgY2xpZW50IGluaXRpYXRlcyBhIGRpc2Nvbm5lY3Qgb3IgYmVjYXVzZSB0aGUgc2VydmVyIG9yIG5ldHdvcmtcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F1c2UgdGhlIGNsaWVudCB0byBiZSBkaXNjb25uZWN0ZWQuIFRoZSBkaXNjb25uZWN0IGNhbGwgYmFjayBtYXkgYmUgY2FsbGVkIHdpdGhvdXRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGNvbm5lY3Rpb25Db21wbGV0ZSBjYWxsIGJhY2sgYmVpbmcgaW52b2tlZCBpZiwgZm9yIGV4YW1wbGUgdGhlIGNsaWVudCBmYWlscyB0b1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0LlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBIHNpbmdsZSByZXNwb25zZSBvYmplY3QgcGFyYW1ldGVyIGlzIHBhc3NlZCB0byB0aGUgb25Db25uZWN0aW9uTG9zdCBjYWxsYmFjayBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcgZmllbGRzOlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b2w+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5lcnJvckNvZGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPmVycm9yTWVzc2FnZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuXHQgKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBvbk1lc3NhZ2VEZWxpdmVyZWQgLSBjYWxsZWQgd2hlbiBhIG1lc3NhZ2UgaGFzIGJlZW4gZGVsaXZlcmVkLlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbGwgcHJvY2Vzc2luZyB0aGF0IHRoaXMgQ2xpZW50IHdpbGwgZXZlciBkbyBoYXMgYmVlbiBjb21wbGV0ZWQuIFNvLCBmb3IgZXhhbXBsZSxcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gdGhlIGNhc2Ugb2YgYSBRb3M9MiBtZXNzYWdlIHNlbnQgYnkgdGhpcyBjbGllbnQsIHRoZSBQdWJDb21wIGZsb3cgaGFzIGJlZW4gcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgbWVzc2FnZSBoYXMgYmVlbiByZW1vdmVkIGZyb20gcGVyc2lzdGVudCBzdG9yYWdlIGJlZm9yZSB0aGlzIGNhbGxiYWNrIGlzIGludm9rZWQuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcmFtZXRlcnMgcGFzc2VkIHRvIHRoZSBvbk1lc3NhZ2VEZWxpdmVyZWQgY2FsbGJhY2sgYXJlOlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b2w+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT57QGxpbmsgUGFoby5NZXNzYWdlfSB0aGF0IHdhcyBkZWxpdmVyZWQuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG5cdCAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IG9uTWVzc2FnZUFycml2ZWQgLSBjYWxsZWQgd2hlbiBhIG1lc3NhZ2UgaGFzIGFycml2ZWQgaW4gdGhpcyBQYWhvLmNsaWVudC5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFyYW1ldGVycyBwYXNzZWQgdG8gdGhlIG9uTWVzc2FnZUFycml2ZWQgY2FsbGJhY2sgYXJlOlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b2w+XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT57QGxpbmsgUGFoby5NZXNzYWdlfSB0aGF0IGhhcyBhcnJpdmVkLlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuXHQgKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBvbkNvbm5lY3RlZCAtIGNhbGxlZCB3aGVuIGEgY29ubmVjdGlvbiBpcyBzdWNjZXNzZnVsbHkgbWFkZSB0byB0aGUgc2VydmVyLlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZnRlciBhIGNvbm5lY3QoKSBtZXRob2QuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcmFtZXRlcnMgcGFzc2VkIHRvIHRoZSBvbkNvbm5lY3RlZCBjYWxsYmFjayBhcmU6XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvbD5cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPnJlY29ubmVjdCAoYm9vbGVhbikgLSBJZiB0cnVlLCB0aGUgY29ubmVjdGlvbiB3YXMgdGhlIHJlc3VsdCBvZiBhIHJlY29ubmVjdC48L2xpPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+VVJJIChzdHJpbmcpIC0gVGhlIFVSSSB1c2VkIHRvIGNvbm5lY3QgdG8gdGhlIHNlcnZlci48L2xpPlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuXHQgKiBAcHJvcGVydHkge2Jvb2xlYW59IGRpc2Nvbm5lY3RlZFB1Ymxpc2hpbmcgLSBpZiBzZXQsIHdpbGwgZW5hYmxlIGRpc2Nvbm5lY3RlZCBwdWJsaXNoaW5nIGluXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiB0aGUgZXZlbnQgdGhhdCB0aGUgY29ubmVjdGlvbiB0byB0aGUgc2VydmVyIGlzIGxvc3QuXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkaXNjb25uZWN0ZWRCdWZmZXJTaXplIC0gVXNlZCB0byBzZXQgdGhlIG1heGltdW0gbnVtYmVyIG9mIG1lc3NhZ2VzIHRoYXQgdGhlIGRpc2Nvbm5lY3RlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciB3aWxsIGhvbGQgYmVmb3JlIHJlamVjdGluZyBuZXcgbWVzc2FnZXMuIERlZmF1bHQgc2l6ZTogNTAwMCBtZXNzYWdlc1xuXHQgKiBAcHJvcGVydHkge2Z1bmN0aW9ufSB0cmFjZSAtIGNhbGxlZCB3aGVuZXZlciB0cmFjZSBpcyBjYWxsZWQuIFRPRE9cblx0ICovXG5cdFx0dmFyIENsaWVudCA9IGZ1bmN0aW9uIChob3N0LCBwb3J0LCBwYXRoLCBjbGllbnRJZCkge1xuXG5cdFx0XHR2YXIgdXJpO1xuXG5cdFx0XHRpZiAodHlwZW9mIGhvc3QgIT09IFwic3RyaW5nXCIpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuSU5WQUxJRF9UWVBFLCBbdHlwZW9mIGhvc3QsIFwiaG9zdFwiXSkpO1xuXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSB7XG5cdFx0XHQvLyBob3N0OiBtdXN0IGJlIGZ1bGwgd3M6Ly8gdXJpXG5cdFx0XHQvLyBwb3J0OiBjbGllbnRJZFxuXHRcdFx0XHRjbGllbnRJZCA9IHBvcnQ7XG5cdFx0XHRcdHVyaSA9IGhvc3Q7XG5cdFx0XHRcdHZhciBtYXRjaCA9IHVyaS5tYXRjaCgvXih3c3M/KTpcXC9cXC8oKFxcWyguKylcXF0pfChbXlxcL10rPykpKDooXFxkKykpPyhcXC8uKikkLyk7XG5cdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdGhvc3QgPSBtYXRjaFs0XXx8bWF0Y2hbMl07XG5cdFx0XHRcdFx0cG9ydCA9IHBhcnNlSW50KG1hdGNoWzddKTtcblx0XHRcdFx0XHRwYXRoID0gbWF0Y2hbOF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX0FSR1VNRU5ULFtob3N0LFwiaG9zdFwiXSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAzKSB7XG5cdFx0XHRcdFx0Y2xpZW50SWQgPSBwYXRoO1xuXHRcdFx0XHRcdHBhdGggPSBcIi9tcXR0XCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHR5cGVvZiBwb3J0ICE9PSBcIm51bWJlclwiIHx8IHBvcnQgPCAwKVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuSU5WQUxJRF9UWVBFLCBbdHlwZW9mIHBvcnQsIFwicG9ydFwiXSkpO1xuXHRcdFx0XHRpZiAodHlwZW9mIHBhdGggIT09IFwic3RyaW5nXCIpXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX1RZUEUsIFt0eXBlb2YgcGF0aCwgXCJwYXRoXCJdKSk7XG5cblx0XHRcdFx0dmFyIGlwdjZBZGRTQnJhY2tldCA9IChob3N0LmluZGV4T2YoXCI6XCIpICE9PSAtMSAmJiBob3N0LnNsaWNlKDAsMSkgIT09IFwiW1wiICYmIGhvc3Quc2xpY2UoLTEpICE9PSBcIl1cIik7XG5cdFx0XHRcdHVyaSA9IFwid3M6Ly9cIisoaXB2NkFkZFNCcmFja2V0P1wiW1wiK2hvc3QrXCJdXCI6aG9zdCkrXCI6XCIrcG9ydCtwYXRoO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY2xpZW50SWRMZW5ndGggPSAwO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGk8Y2xpZW50SWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGNoYXJDb2RlID0gY2xpZW50SWQuY2hhckNvZGVBdChpKTtcblx0XHRcdFx0aWYgKDB4RDgwMCA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8PSAweERCRkYpICB7XG5cdFx0XHRcdFx0aSsrOyAvLyBTdXJyb2dhdGUgcGFpci5cblx0XHRcdFx0fVxuXHRcdFx0XHRjbGllbnRJZExlbmd0aCsrO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBjbGllbnRJZCAhPT0gXCJzdHJpbmdcIiB8fCBjbGllbnRJZExlbmd0aCA+IDY1NTM1KVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KEVSUk9SLklOVkFMSURfQVJHVU1FTlQsIFtjbGllbnRJZCwgXCJjbGllbnRJZFwiXSkpO1xuXG5cdFx0XHR2YXIgY2xpZW50ID0gbmV3IENsaWVudEltcGwodXJpLCBob3N0LCBwb3J0LCBwYXRoLCBjbGllbnRJZCk7XG5cblx0XHRcdC8vUHVibGljIFByb3BlcnRpZXNcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMse1xuXHRcdFx0XHRcImhvc3RcIjp7XG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIGhvc3Q7IH0sXG5cdFx0XHRcdFx0c2V0OiBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5VTlNVUFBPUlRFRF9PUEVSQVRJT04pKTsgfVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInBvcnRcIjp7XG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHBvcnQ7IH0sXG5cdFx0XHRcdFx0c2V0OiBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5VTlNVUFBPUlRFRF9PUEVSQVRJT04pKTsgfVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInBhdGhcIjp7XG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHBhdGg7IH0sXG5cdFx0XHRcdFx0c2V0OiBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5VTlNVUFBPUlRFRF9PUEVSQVRJT04pKTsgfVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInVyaVwiOntcblx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdXJpOyB9LFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuVU5TVVBQT1JURURfT1BFUkFUSU9OKSk7IH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJjbGllbnRJZFwiOntcblx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gY2xpZW50LmNsaWVudElkOyB9LFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuVU5TVVBQT1JURURfT1BFUkFUSU9OKSk7IH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJvbkNvbm5lY3RlZFwiOntcblx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gY2xpZW50Lm9uQ29ubmVjdGVkOyB9LFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24obmV3T25Db25uZWN0ZWQpIHtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgbmV3T25Db25uZWN0ZWQgPT09IFwiZnVuY3Rpb25cIilcblx0XHRcdFx0XHRcdFx0Y2xpZW50Lm9uQ29ubmVjdGVkID0gbmV3T25Db25uZWN0ZWQ7XG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuSU5WQUxJRF9UWVBFLCBbdHlwZW9mIG5ld09uQ29ubmVjdGVkLCBcIm9uQ29ubmVjdGVkXCJdKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImRpc2Nvbm5lY3RlZFB1Ymxpc2hpbmdcIjp7XG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIGNsaWVudC5kaXNjb25uZWN0ZWRQdWJsaXNoaW5nOyB9LFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24obmV3RGlzY29ubmVjdGVkUHVibGlzaGluZykge1xuXHRcdFx0XHRcdFx0Y2xpZW50LmRpc2Nvbm5lY3RlZFB1Ymxpc2hpbmcgPSBuZXdEaXNjb25uZWN0ZWRQdWJsaXNoaW5nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJkaXNjb25uZWN0ZWRCdWZmZXJTaXplXCI6e1xuXHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBjbGllbnQuZGlzY29ubmVjdGVkQnVmZmVyU2l6ZTsgfSxcblx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKG5ld0Rpc2Nvbm5lY3RlZEJ1ZmZlclNpemUpIHtcblx0XHRcdFx0XHRcdGNsaWVudC5kaXNjb25uZWN0ZWRCdWZmZXJTaXplID0gbmV3RGlzY29ubmVjdGVkQnVmZmVyU2l6ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwib25Db25uZWN0aW9uTG9zdFwiOntcblx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gY2xpZW50Lm9uQ29ubmVjdGlvbkxvc3Q7IH0sXG5cdFx0XHRcdFx0c2V0OiBmdW5jdGlvbihuZXdPbkNvbm5lY3Rpb25Mb3N0KSB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIG5ld09uQ29ubmVjdGlvbkxvc3QgPT09IFwiZnVuY3Rpb25cIilcblx0XHRcdFx0XHRcdFx0Y2xpZW50Lm9uQ29ubmVjdGlvbkxvc3QgPSBuZXdPbkNvbm5lY3Rpb25Mb3N0O1xuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KEVSUk9SLklOVkFMSURfVFlQRSwgW3R5cGVvZiBuZXdPbkNvbm5lY3Rpb25Mb3N0LCBcIm9uQ29ubmVjdGlvbkxvc3RcIl0pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwib25NZXNzYWdlRGVsaXZlcmVkXCI6e1xuXHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBjbGllbnQub25NZXNzYWdlRGVsaXZlcmVkOyB9LFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24obmV3T25NZXNzYWdlRGVsaXZlcmVkKSB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIG5ld09uTWVzc2FnZURlbGl2ZXJlZCA9PT0gXCJmdW5jdGlvblwiKVxuXHRcdFx0XHRcdFx0XHRjbGllbnQub25NZXNzYWdlRGVsaXZlcmVkID0gbmV3T25NZXNzYWdlRGVsaXZlcmVkO1xuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KEVSUk9SLklOVkFMSURfVFlQRSwgW3R5cGVvZiBuZXdPbk1lc3NhZ2VEZWxpdmVyZWQsIFwib25NZXNzYWdlRGVsaXZlcmVkXCJdKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIm9uTWVzc2FnZUFycml2ZWRcIjp7XG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIGNsaWVudC5vbk1lc3NhZ2VBcnJpdmVkOyB9LFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24obmV3T25NZXNzYWdlQXJyaXZlZCkge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBuZXdPbk1lc3NhZ2VBcnJpdmVkID09PSBcImZ1bmN0aW9uXCIpXG5cdFx0XHRcdFx0XHRcdGNsaWVudC5vbk1lc3NhZ2VBcnJpdmVkID0gbmV3T25NZXNzYWdlQXJyaXZlZDtcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX1RZUEUsIFt0eXBlb2YgbmV3T25NZXNzYWdlQXJyaXZlZCwgXCJvbk1lc3NhZ2VBcnJpdmVkXCJdKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInRyYWNlXCI6e1xuXHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBjbGllbnQudHJhY2VGdW5jdGlvbjsgfSxcblx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHRyYWNlKSB7XG5cdFx0XHRcdFx0XHRpZih0eXBlb2YgdHJhY2UgPT09IFwiZnVuY3Rpb25cIil7XG5cdFx0XHRcdFx0XHRcdGNsaWVudC50cmFjZUZ1bmN0aW9uID0gdHJhY2U7XG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX1RZUEUsIFt0eXBlb2YgdHJhY2UsIFwib25UcmFjZVwiXSkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXG5cdFx0XHQvKipcblx0XHQgKiBDb25uZWN0IHRoaXMgTWVzc2FnaW5nIGNsaWVudCB0byBpdHMgc2VydmVyLlxuXHRcdCAqXG5cdFx0ICogQG5hbWUgUGFoby5DbGllbnQjY29ubmVjdFxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBwYXJhbSB7b2JqZWN0fSBjb25uZWN0T3B0aW9ucyAtIEF0dHJpYnV0ZXMgdXNlZCB3aXRoIHRoZSBjb25uZWN0aW9uLlxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBjb25uZWN0T3B0aW9ucy50aW1lb3V0IC0gSWYgdGhlIGNvbm5lY3QgaGFzIG5vdCBzdWNjZWVkZWQgd2l0aGluIHRoaXNcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgbnVtYmVyIG9mIHNlY29uZHMsIGl0IGlzIGRlZW1lZCB0byBoYXZlIGZhaWxlZC5cblx0XHQgKiAgICAgICAgICAgICAgICAgICAgVGhlIGRlZmF1bHQgaXMgMzAgc2Vjb25kcy5cblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gY29ubmVjdE9wdGlvbnMudXNlck5hbWUgLSBBdXRoZW50aWNhdGlvbiB1c2VybmFtZSBmb3IgdGhpcyBjb25uZWN0aW9uLlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBjb25uZWN0T3B0aW9ucy5wYXNzd29yZCAtIEF1dGhlbnRpY2F0aW9uIHBhc3N3b3JkIGZvciB0aGlzIGNvbm5lY3Rpb24uXG5cdFx0ICogQHBhcmFtIHtQYWhvLk1lc3NhZ2V9IGNvbm5lY3RPcHRpb25zLndpbGxNZXNzYWdlIC0gc2VudCBieSB0aGUgc2VydmVyIHdoZW4gdGhlIGNsaWVudFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICBkaXNjb25uZWN0cyBhYm5vcm1hbGx5LlxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBjb25uZWN0T3B0aW9ucy5rZWVwQWxpdmVJbnRlcnZhbCAtIHRoZSBzZXJ2ZXIgZGlzY29ubmVjdHMgdGhpcyBjbGllbnQgaWZcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgdGhlcmUgaXMgbm8gYWN0aXZpdHkgZm9yIHRoaXMgbnVtYmVyIG9mIHNlY29uZHMuXG5cdFx0ICogICAgICAgICAgICAgICAgICAgIFRoZSBkZWZhdWx0IHZhbHVlIG9mIDYwIHNlY29uZHMgaXMgYXNzdW1lZCBpZiBub3Qgc2V0LlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gY29ubmVjdE9wdGlvbnMuY2xlYW5TZXNzaW9uIC0gaWYgdHJ1ZShkZWZhdWx0KSB0aGUgY2xpZW50IGFuZCBzZXJ2ZXJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgcGVyc2lzdGVudCBzdGF0ZSBpcyBkZWxldGVkIG9uIHN1Y2Nlc3NmdWwgY29ubmVjdC5cblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGNvbm5lY3RPcHRpb25zLnVzZVNTTCAtIGlmIHByZXNlbnQgYW5kIHRydWUsIHVzZSBhbiBTU0wgV2Vic29ja2V0IGNvbm5lY3Rpb24uXG5cdFx0ICogQHBhcmFtIHtvYmplY3R9IGNvbm5lY3RPcHRpb25zLmludm9jYXRpb25Db250ZXh0IC0gcGFzc2VkIHRvIHRoZSBvblN1Y2Nlc3MgY2FsbGJhY2sgb3Igb25GYWlsdXJlIGNhbGxiYWNrLlxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbm5lY3RPcHRpb25zLm9uU3VjY2VzcyAtIGNhbGxlZCB3aGVuIHRoZSBjb25uZWN0IGFja25vd2xlZGdlbWVudFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICBoYXMgYmVlbiByZWNlaXZlZCBmcm9tIHRoZSBzZXJ2ZXIuXG5cdFx0ICogQSBzaW5nbGUgcmVzcG9uc2Ugb2JqZWN0IHBhcmFtZXRlciBpcyBwYXNzZWQgdG8gdGhlIG9uU3VjY2VzcyBjYWxsYmFjayBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcgZmllbGRzOlxuXHRcdCAqIDxvbD5cblx0XHQgKiA8bGk+aW52b2NhdGlvbkNvbnRleHQgYXMgcGFzc2VkIGluIHRvIHRoZSBvblN1Y2Nlc3MgbWV0aG9kIGluIHRoZSBjb25uZWN0T3B0aW9ucy5cblx0XHQgKiA8L29sPlxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25uZWN0T3B0aW9ucy5vbkZhaWx1cmUgLSBjYWxsZWQgd2hlbiB0aGUgY29ubmVjdCByZXF1ZXN0IGhhcyBmYWlsZWQgb3IgdGltZWQgb3V0LlxuXHRcdCAqIEEgc2luZ2xlIHJlc3BvbnNlIG9iamVjdCBwYXJhbWV0ZXIgaXMgcGFzc2VkIHRvIHRoZSBvbkZhaWx1cmUgY2FsbGJhY2sgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIGZpZWxkczpcblx0XHQgKiA8b2w+XG5cdFx0ICogPGxpPmludm9jYXRpb25Db250ZXh0IGFzIHBhc3NlZCBpbiB0byB0aGUgb25GYWlsdXJlIG1ldGhvZCBpbiB0aGUgY29ubmVjdE9wdGlvbnMuXG5cdFx0ICogPGxpPmVycm9yQ29kZSBhIG51bWJlciBpbmRpY2F0aW5nIHRoZSBuYXR1cmUgb2YgdGhlIGVycm9yLlxuXHRcdCAqIDxsaT5lcnJvck1lc3NhZ2UgdGV4dCBkZXNjcmliaW5nIHRoZSBlcnJvci5cblx0XHQgKiA8L29sPlxuXHQgKiBAcGFyYW0ge2FycmF5fSBjb25uZWN0T3B0aW9ucy5ob3N0cyAtIElmIHByZXNlbnQgdGhpcyBjb250YWlucyBlaXRoZXIgYSBzZXQgb2YgaG9zdG5hbWVzIG9yIGZ1bGx5IHF1YWxpZmllZFxuXHRcdCAqIFdlYlNvY2tldCBVUklzICh3czovL2lvdC5lY2xpcHNlLm9yZzo4MC93cyksIHRoYXQgYXJlIHRyaWVkIGluIG9yZGVyIGluIHBsYWNlXG5cdFx0ICogb2YgdGhlIGhvc3QgYW5kIHBvcnQgcGFyYW1hdGVyIG9uIHRoZSBjb25zdHJ1dG9yLiBUaGUgaG9zdHMgYXJlIHRyaWVkIG9uZSBhdCBhdCB0aW1lIGluIG9yZGVyIHVudGlsXG5cdFx0ICogb25lIG9mIHRoZW4gc3VjY2VlZHMuXG5cdCAqIEBwYXJhbSB7YXJyYXl9IGNvbm5lY3RPcHRpb25zLnBvcnRzIC0gSWYgcHJlc2VudCB0aGUgc2V0IG9mIHBvcnRzIG1hdGNoaW5nIHRoZSBob3N0cy4gSWYgaG9zdHMgY29udGFpbnMgVVJJcywgdGhpcyBwcm9wZXJ0eVxuXHRcdCAqIGlzIG5vdCB1c2VkLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGNvbm5lY3RPcHRpb25zLnJlY29ubmVjdCAtIFNldHMgd2hldGhlciB0aGUgY2xpZW50IHdpbGwgYXV0b21hdGljYWxseSBhdHRlbXB0IHRvIHJlY29ubmVjdFxuXHQgKiB0byB0aGUgc2VydmVyIGlmIHRoZSBjb25uZWN0aW9uIGlzIGxvc3QuXG5cdCAqPHVsPlxuXHQgKjxsaT5JZiBzZXQgdG8gZmFsc2UsIHRoZSBjbGllbnQgd2lsbCBub3QgYXR0ZW1wdCB0byBhdXRvbWF0aWNhbGx5IHJlY29ubmVjdCB0byB0aGUgc2VydmVyIGluIHRoZSBldmVudCB0aGF0IHRoZVxuXHQgKiBjb25uZWN0aW9uIGlzIGxvc3QuPC9saT5cblx0ICo8bGk+SWYgc2V0IHRvIHRydWUsIGluIHRoZSBldmVudCB0aGF0IHRoZSBjb25uZWN0aW9uIGlzIGxvc3QsIHRoZSBjbGllbnQgd2lsbCBhdHRlbXB0IHRvIHJlY29ubmVjdCB0byB0aGUgc2VydmVyLlxuXHQgKiBJdCB3aWxsIGluaXRpYWxseSB3YWl0IDEgc2Vjb25kIGJlZm9yZSBpdCBhdHRlbXB0cyB0byByZWNvbm5lY3QsIGZvciBldmVyeSBmYWlsZWQgcmVjb25uZWN0IGF0dGVtcHQsIHRoZSBkZWxheVxuXHQgKiB3aWxsIGRvdWJsZSB1bnRpbCBpdCBpcyBhdCAyIG1pbnV0ZXMgYXQgd2hpY2ggcG9pbnQgdGhlIGRlbGF5IHdpbGwgc3RheSBhdCAyIG1pbnV0ZXMuPC9saT5cblx0ICo8L3VsPlxuXHQgKiBAcGFyYW0ge251bWJlcn0gY29ubmVjdE9wdGlvbnMubXF0dFZlcnNpb24gLSBUaGUgdmVyc2lvbiBvZiBNUVRUIHRvIHVzZSB0byBjb25uZWN0IHRvIHRoZSBNUVRUIEJyb2tlci5cblx0ICo8dWw+XG5cdCAqPGxpPjMgLSBNUVRUIFYzLjE8L2xpPlxuXHQgKjxsaT40IC0gTVFUVCBWMy4xLjE8L2xpPlxuXHQgKjwvdWw+XG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gY29ubmVjdE9wdGlvbnMubXF0dFZlcnNpb25FeHBsaWNpdCAtIElmIHNldCB0byB0cnVlLCB3aWxsIGZvcmNlIHRoZSBjb25uZWN0aW9uIHRvIHVzZSB0aGVcblx0ICogc2VsZWN0ZWQgTVFUVCBWZXJzaW9uIG9yIHdpbGwgZmFpbCB0byBjb25uZWN0LlxuXHQgKiBAcGFyYW0ge2FycmF5fSBjb25uZWN0T3B0aW9ucy51cmlzIC0gSWYgcHJlc2VudCwgc2hvdWxkIGNvbnRhaW4gYSBsaXN0IG9mIGZ1bGx5IHF1YWxpZmllZCBXZWJTb2NrZXQgdXJpc1xuXHQgKiAoZS5nLiB3czovL2lvdC5lY2xpcHNlLm9yZzo4MC93cyksIHRoYXQgYXJlIHRyaWVkIGluIG9yZGVyIGluIHBsYWNlIG9mIHRoZSBob3N0IGFuZCBwb3J0IHBhcmFtZXRlciBvZiB0aGUgY29uc3RydXRvci5cblx0ICogVGhlIHVyaXMgYXJlIHRyaWVkIG9uZSBhdCBhIHRpbWUgaW4gb3JkZXIgdW50aWwgb25lIG9mIHRoZW0gc3VjY2VlZHMuIERvIG5vdCB1c2UgdGhpcyBpbiBjb25qdW5jdGlvbiB3aXRoIGhvc3RzIGFzXG5cdCAqIHRoZSBob3N0cyBhcnJheSB3aWxsIGJlIGNvbnZlcnRlZCB0byB1cmlzIGFuZCB3aWxsIG92ZXJ3cml0ZSB0aGlzIHByb3BlcnR5LlxuXHRcdCAqIEB0aHJvd3Mge0ludmFsaWRTdGF0ZX0gSWYgdGhlIGNsaWVudCBpcyBub3QgaW4gZGlzY29ubmVjdGVkIHN0YXRlLiBUaGUgY2xpZW50IG11c3QgaGF2ZSByZWNlaXZlZCBjb25uZWN0aW9uTG9zdFxuXHRcdCAqIG9yIGRpc2Nvbm5lY3RlZCBiZWZvcmUgY2FsbGluZyBjb25uZWN0IGZvciBhIHNlY29uZCBvciBzdWJzZXF1ZW50IHRpbWUuXG5cdFx0ICovXG5cdFx0XHR0aGlzLmNvbm5lY3QgPSBmdW5jdGlvbiAoY29ubmVjdE9wdGlvbnMpIHtcblx0XHRcdFx0Y29ubmVjdE9wdGlvbnMgPSBjb25uZWN0T3B0aW9ucyB8fCB7fSA7XG5cdFx0XHRcdHZhbGlkYXRlKGNvbm5lY3RPcHRpb25zLCAge3RpbWVvdXQ6XCJudW1iZXJcIixcblx0XHRcdFx0XHR1c2VyTmFtZTpcInN0cmluZ1wiLFxuXHRcdFx0XHRcdHBhc3N3b3JkOlwic3RyaW5nXCIsXG5cdFx0XHRcdFx0d2lsbE1lc3NhZ2U6XCJvYmplY3RcIixcblx0XHRcdFx0XHRrZWVwQWxpdmVJbnRlcnZhbDpcIm51bWJlclwiLFxuXHRcdFx0XHRcdGNsZWFuU2Vzc2lvbjpcImJvb2xlYW5cIixcblx0XHRcdFx0XHR1c2VTU0w6XCJib29sZWFuXCIsXG5cdFx0XHRcdFx0aW52b2NhdGlvbkNvbnRleHQ6XCJvYmplY3RcIixcblx0XHRcdFx0XHRvblN1Y2Nlc3M6XCJmdW5jdGlvblwiLFxuXHRcdFx0XHRcdG9uRmFpbHVyZTpcImZ1bmN0aW9uXCIsXG5cdFx0XHRcdFx0aG9zdHM6XCJvYmplY3RcIixcblx0XHRcdFx0XHRwb3J0czpcIm9iamVjdFwiLFxuXHRcdFx0XHRcdHJlY29ubmVjdDpcImJvb2xlYW5cIixcblx0XHRcdFx0XHRtcXR0VmVyc2lvbjpcIm51bWJlclwiLFxuXHRcdFx0XHRcdG1xdHRWZXJzaW9uRXhwbGljaXQ6XCJib29sZWFuXCIsXG5cdFx0XHRcdFx0dXJpczogXCJvYmplY3RcIn0pO1xuXG5cdFx0XHRcdC8vIElmIG5vIGtlZXAgYWxpdmUgaW50ZXJ2YWwgaXMgc2V0LCBhc3N1bWUgNjAgc2Vjb25kcy5cblx0XHRcdFx0aWYgKGNvbm5lY3RPcHRpb25zLmtlZXBBbGl2ZUludGVydmFsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdFx0Y29ubmVjdE9wdGlvbnMua2VlcEFsaXZlSW50ZXJ2YWwgPSA2MDtcblxuXHRcdFx0XHRpZiAoY29ubmVjdE9wdGlvbnMubXF0dFZlcnNpb24gPiA0IHx8IGNvbm5lY3RPcHRpb25zLm1xdHRWZXJzaW9uIDwgMykge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuSU5WQUxJRF9BUkdVTUVOVCwgW2Nvbm5lY3RPcHRpb25zLm1xdHRWZXJzaW9uLCBcImNvbm5lY3RPcHRpb25zLm1xdHRWZXJzaW9uXCJdKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY29ubmVjdE9wdGlvbnMubXF0dFZlcnNpb24gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGNvbm5lY3RPcHRpb25zLm1xdHRWZXJzaW9uRXhwbGljaXQgPSBmYWxzZTtcblx0XHRcdFx0XHRjb25uZWN0T3B0aW9ucy5tcXR0VmVyc2lvbiA9IDQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29ubmVjdE9wdGlvbnMubXF0dFZlcnNpb25FeHBsaWNpdCA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL0NoZWNrIHRoYXQgaWYgcGFzc3dvcmQgaXMgc2V0LCBzbyBpcyB1c2VybmFtZVxuXHRcdFx0XHRpZiAoY29ubmVjdE9wdGlvbnMucGFzc3dvcmQgIT09IHVuZGVmaW5lZCAmJiBjb25uZWN0T3B0aW9ucy51c2VyTmFtZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuSU5WQUxJRF9BUkdVTUVOVCwgW2Nvbm5lY3RPcHRpb25zLnBhc3N3b3JkLCBcImNvbm5lY3RPcHRpb25zLnBhc3N3b3JkXCJdKSk7XG5cblx0XHRcdFx0aWYgKGNvbm5lY3RPcHRpb25zLndpbGxNZXNzYWdlKSB7XG5cdFx0XHRcdFx0aWYgKCEoY29ubmVjdE9wdGlvbnMud2lsbE1lc3NhZ2UgaW5zdGFuY2VvZiBNZXNzYWdlKSlcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuSU5WQUxJRF9UWVBFLCBbY29ubmVjdE9wdGlvbnMud2lsbE1lc3NhZ2UsIFwiY29ubmVjdE9wdGlvbnMud2lsbE1lc3NhZ2VcIl0pKTtcblx0XHRcdFx0XHQvLyBUaGUgd2lsbCBtZXNzYWdlIG11c3QgaGF2ZSBhIHBheWxvYWQgdGhhdCBjYW4gYmUgcmVwcmVzZW50ZWQgYXMgYSBzdHJpbmcuXG5cdFx0XHRcdFx0Ly8gQ2F1c2UgdGhlIHdpbGxNZXNzYWdlIHRvIHRocm93IGFuIGV4Y2VwdGlvbiBpZiB0aGlzIGlzIG5vdCB0aGUgY2FzZS5cblx0XHRcdFx0XHRjb25uZWN0T3B0aW9ucy53aWxsTWVzc2FnZS5zdHJpbmdQYXlsb2FkID0gbnVsbDtcblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgY29ubmVjdE9wdGlvbnMud2lsbE1lc3NhZ2UuZGVzdGluYXRpb25OYW1lID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX1RZUEUsIFt0eXBlb2YgY29ubmVjdE9wdGlvbnMud2lsbE1lc3NhZ2UuZGVzdGluYXRpb25OYW1lLCBcImNvbm5lY3RPcHRpb25zLndpbGxNZXNzYWdlLmRlc3RpbmF0aW9uTmFtZVwiXSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0eXBlb2YgY29ubmVjdE9wdGlvbnMuY2xlYW5TZXNzaW9uID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0XHRcdGNvbm5lY3RPcHRpb25zLmNsZWFuU2Vzc2lvbiA9IHRydWU7XG5cdFx0XHRcdGlmIChjb25uZWN0T3B0aW9ucy5ob3N0cykge1xuXG5cdFx0XHRcdFx0aWYgKCEoY29ubmVjdE9wdGlvbnMuaG9zdHMgaW5zdGFuY2VvZiBBcnJheSkgKVxuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX0FSR1VNRU5ULCBbY29ubmVjdE9wdGlvbnMuaG9zdHMsIFwiY29ubmVjdE9wdGlvbnMuaG9zdHNcIl0pKTtcblx0XHRcdFx0XHRpZiAoY29ubmVjdE9wdGlvbnMuaG9zdHMubGVuZ3RoIDwxIClcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuSU5WQUxJRF9BUkdVTUVOVCwgW2Nvbm5lY3RPcHRpb25zLmhvc3RzLCBcImNvbm5lY3RPcHRpb25zLmhvc3RzXCJdKSk7XG5cblx0XHRcdFx0XHR2YXIgdXNpbmdVUklzID0gZmFsc2U7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGk8Y29ubmVjdE9wdGlvbnMuaG9zdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgY29ubmVjdE9wdGlvbnMuaG9zdHNbaV0gIT09IFwic3RyaW5nXCIpXG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuSU5WQUxJRF9UWVBFLCBbdHlwZW9mIGNvbm5lY3RPcHRpb25zLmhvc3RzW2ldLCBcImNvbm5lY3RPcHRpb25zLmhvc3RzW1wiK2krXCJdXCJdKSk7XG5cdFx0XHRcdFx0XHRpZiAoL14od3NzPyk6XFwvXFwvKChcXFsoLispXFxdKXwoW15cXC9dKz8pKSg6KFxcZCspKT8oXFwvLiopJC8udGVzdChjb25uZWN0T3B0aW9ucy5ob3N0c1tpXSkpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGkgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHR1c2luZ1VSSXMgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCF1c2luZ1VSSXMpIHtcblx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KEVSUk9SLklOVkFMSURfQVJHVU1FTlQsIFtjb25uZWN0T3B0aW9ucy5ob3N0c1tpXSwgXCJjb25uZWN0T3B0aW9ucy5ob3N0c1tcIitpK1wiXVwiXSkpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHVzaW5nVVJJcykge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KEVSUk9SLklOVkFMSURfQVJHVU1FTlQsIFtjb25uZWN0T3B0aW9ucy5ob3N0c1tpXSwgXCJjb25uZWN0T3B0aW9ucy5ob3N0c1tcIitpK1wiXVwiXSkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICghdXNpbmdVUklzKSB7XG5cdFx0XHRcdFx0XHRpZiAoIWNvbm5lY3RPcHRpb25zLnBvcnRzKVxuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KEVSUk9SLklOVkFMSURfQVJHVU1FTlQsIFtjb25uZWN0T3B0aW9ucy5wb3J0cywgXCJjb25uZWN0T3B0aW9ucy5wb3J0c1wiXSkpO1xuXHRcdFx0XHRcdFx0aWYgKCEoY29ubmVjdE9wdGlvbnMucG9ydHMgaW5zdGFuY2VvZiBBcnJheSkgKVxuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KEVSUk9SLklOVkFMSURfQVJHVU1FTlQsIFtjb25uZWN0T3B0aW9ucy5wb3J0cywgXCJjb25uZWN0T3B0aW9ucy5wb3J0c1wiXSkpO1xuXHRcdFx0XHRcdFx0aWYgKGNvbm5lY3RPcHRpb25zLmhvc3RzLmxlbmd0aCAhPT0gY29ubmVjdE9wdGlvbnMucG9ydHMubGVuZ3RoKVxuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KEVSUk9SLklOVkFMSURfQVJHVU1FTlQsIFtjb25uZWN0T3B0aW9ucy5wb3J0cywgXCJjb25uZWN0T3B0aW9ucy5wb3J0c1wiXSkpO1xuXG5cdFx0XHRcdFx0XHRjb25uZWN0T3B0aW9ucy51cmlzID0gW107XG5cblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpPGNvbm5lY3RPcHRpb25zLmhvc3RzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgY29ubmVjdE9wdGlvbnMucG9ydHNbaV0gIT09IFwibnVtYmVyXCIgfHwgY29ubmVjdE9wdGlvbnMucG9ydHNbaV0gPCAwKVxuXHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihmb3JtYXQoRVJST1IuSU5WQUxJRF9UWVBFLCBbdHlwZW9mIGNvbm5lY3RPcHRpb25zLnBvcnRzW2ldLCBcImNvbm5lY3RPcHRpb25zLnBvcnRzW1wiK2krXCJdXCJdKSk7XG5cdFx0XHRcdFx0XHRcdHZhciBob3N0ID0gY29ubmVjdE9wdGlvbnMuaG9zdHNbaV07XG5cdFx0XHRcdFx0XHRcdHZhciBwb3J0ID0gY29ubmVjdE9wdGlvbnMucG9ydHNbaV07XG5cblx0XHRcdFx0XHRcdFx0dmFyIGlwdjYgPSAoaG9zdC5pbmRleE9mKFwiOlwiKSAhPT0gLTEpO1xuXHRcdFx0XHRcdFx0XHR1cmkgPSBcIndzOi8vXCIrKGlwdjY/XCJbXCIraG9zdCtcIl1cIjpob3N0KStcIjpcIitwb3J0K3BhdGg7XG5cdFx0XHRcdFx0XHRcdGNvbm5lY3RPcHRpb25zLnVyaXMucHVzaCh1cmkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25uZWN0T3B0aW9ucy51cmlzID0gY29ubmVjdE9wdGlvbnMuaG9zdHM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2xpZW50LmNvbm5lY3QoY29ubmVjdE9wdGlvbnMpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyoqXG5cdFx0ICogU3Vic2NyaWJlIGZvciBtZXNzYWdlcywgcmVxdWVzdCByZWNlaXB0IG9mIGEgY29weSBvZiBtZXNzYWdlcyBzZW50IHRvIHRoZSBkZXN0aW5hdGlvbnMgZGVzY3JpYmVkIGJ5IHRoZSBmaWx0ZXIuXG5cdFx0ICpcblx0XHQgKiBAbmFtZSBQYWhvLkNsaWVudCNzdWJzY3JpYmVcblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gZmlsdGVyIGRlc2NyaWJpbmcgdGhlIGRlc3RpbmF0aW9ucyB0byByZWNlaXZlIG1lc3NhZ2VzIGZyb20uXG5cdFx0ICogPGJyPlxuXHRcdCAqIEBwYXJhbSB7b2JqZWN0fSBzdWJzY3JpYmVPcHRpb25zIC0gdXNlZCB0byBjb250cm9sIHRoZSBzdWJzY3JpcHRpb25cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBzdWJzY3JpYmVPcHRpb25zLnFvcyAtIHRoZSBtYXhpbXVtIHFvcyBvZiBhbnkgcHVibGljYXRpb25zIHNlbnRcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcyBhIHJlc3VsdCBvZiBtYWtpbmcgdGhpcyBzdWJzY3JpcHRpb24uXG5cdFx0ICogQHBhcmFtIHtvYmplY3R9IHN1YnNjcmliZU9wdGlvbnMuaW52b2NhdGlvbkNvbnRleHQgLSBwYXNzZWQgdG8gdGhlIG9uU3VjY2VzcyBjYWxsYmFja1xuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIG9uRmFpbHVyZSBjYWxsYmFjay5cblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdWJzY3JpYmVPcHRpb25zLm9uU3VjY2VzcyAtIGNhbGxlZCB3aGVuIHRoZSBzdWJzY3JpYmUgYWNrbm93bGVkZ2VtZW50XG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzIGJlZW4gcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyLlxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEEgc2luZ2xlIHJlc3BvbnNlIG9iamVjdCBwYXJhbWV0ZXIgaXMgcGFzc2VkIHRvIHRoZSBvblN1Y2Nlc3MgY2FsbGJhY2sgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIGZpZWxkczpcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b2w+XG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPmludm9jYXRpb25Db250ZXh0IGlmIHNldCBpbiB0aGUgc3Vic2NyaWJlT3B0aW9ucy5cblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29sPlxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1YnNjcmliZU9wdGlvbnMub25GYWlsdXJlIC0gY2FsbGVkIHdoZW4gdGhlIHN1YnNjcmliZSByZXF1ZXN0IGhhcyBmYWlsZWQgb3IgdGltZWQgb3V0LlxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEEgc2luZ2xlIHJlc3BvbnNlIG9iamVjdCBwYXJhbWV0ZXIgaXMgcGFzc2VkIHRvIHRoZSBvbkZhaWx1cmUgY2FsbGJhY2sgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIGZpZWxkczpcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b2w+XG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPmludm9jYXRpb25Db250ZXh0IC0gaWYgc2V0IGluIHRoZSBzdWJzY3JpYmVPcHRpb25zLlxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5lcnJvckNvZGUgLSBhIG51bWJlciBpbmRpY2F0aW5nIHRoZSBuYXR1cmUgb2YgdGhlIGVycm9yLlxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5lcnJvck1lc3NhZ2UgLSB0ZXh0IGRlc2NyaWJpbmcgdGhlIGVycm9yLlxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IHN1YnNjcmliZU9wdGlvbnMudGltZW91dCAtIHdoaWNoLCBpZiBwcmVzZW50LCBkZXRlcm1pbmVzIHRoZSBudW1iZXIgb2Zcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRzIGFmdGVyIHdoaWNoIHRoZSBvbkZhaWx1cmUgY2FsYmFjayBpcyBjYWxsZWQuXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIHByZXNlbmNlIG9mIGEgdGltZW91dCBkb2VzIG5vdCBwcmV2ZW50IHRoZSBvblN1Y2Nlc3Ncblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayBmcm9tIGJlaW5nIGNhbGxlZCB3aGVuIHRoZSBzdWJzY3JpYmUgY29tcGxldGVzLlxuXHRcdCAqIEB0aHJvd3Mge0ludmFsaWRTdGF0ZX0gaWYgdGhlIGNsaWVudCBpcyBub3QgaW4gY29ubmVjdGVkIHN0YXRlLlxuXHRcdCAqL1xuXHRcdFx0dGhpcy5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZmlsdGVyLCBzdWJzY3JpYmVPcHRpb25zKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZmlsdGVyICE9PSBcInN0cmluZ1wiICYmIGZpbHRlci5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudDpcIitmaWx0ZXIpO1xuXHRcdFx0XHRzdWJzY3JpYmVPcHRpb25zID0gc3Vic2NyaWJlT3B0aW9ucyB8fCB7fSA7XG5cdFx0XHRcdHZhbGlkYXRlKHN1YnNjcmliZU9wdGlvbnMsICB7cW9zOlwibnVtYmVyXCIsXG5cdFx0XHRcdFx0aW52b2NhdGlvbkNvbnRleHQ6XCJvYmplY3RcIixcblx0XHRcdFx0XHRvblN1Y2Nlc3M6XCJmdW5jdGlvblwiLFxuXHRcdFx0XHRcdG9uRmFpbHVyZTpcImZ1bmN0aW9uXCIsXG5cdFx0XHRcdFx0dGltZW91dDpcIm51bWJlclwiXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZiAoc3Vic2NyaWJlT3B0aW9ucy50aW1lb3V0ICYmICFzdWJzY3JpYmVPcHRpb25zLm9uRmFpbHVyZSlcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzdWJzY3JpYmVPcHRpb25zLnRpbWVvdXQgc3BlY2lmaWVkIHdpdGggbm8gb25GYWlsdXJlIGNhbGxiYWNrLlwiKTtcblx0XHRcdFx0aWYgKHR5cGVvZiBzdWJzY3JpYmVPcHRpb25zLnFvcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhKHN1YnNjcmliZU9wdGlvbnMucW9zID09PSAwIHx8IHN1YnNjcmliZU9wdGlvbnMucW9zID09PSAxIHx8IHN1YnNjcmliZU9wdGlvbnMucW9zID09PSAyICkpXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX0FSR1VNRU5ULCBbc3Vic2NyaWJlT3B0aW9ucy5xb3MsIFwic3Vic2NyaWJlT3B0aW9ucy5xb3NcIl0pKTtcblx0XHRcdFx0Y2xpZW50LnN1YnNjcmliZShmaWx0ZXIsIHN1YnNjcmliZU9wdGlvbnMpO1xuXHRcdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFVuc3Vic2NyaWJlIGZvciBtZXNzYWdlcywgc3RvcCByZWNlaXZpbmcgbWVzc2FnZXMgc2VudCB0byBkZXN0aW5hdGlvbnMgZGVzY3JpYmVkIGJ5IHRoZSBmaWx0ZXIuXG5cdFx0ICpcblx0XHQgKiBAbmFtZSBQYWhvLkNsaWVudCN1bnN1YnNjcmliZVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBmaWx0ZXIgLSBkZXNjcmliaW5nIHRoZSBkZXN0aW5hdGlvbnMgdG8gcmVjZWl2ZSBtZXNzYWdlcyBmcm9tLlxuXHRcdCAqIEBwYXJhbSB7b2JqZWN0fSB1bnN1YnNjcmliZU9wdGlvbnMgLSB1c2VkIHRvIGNvbnRyb2wgdGhlIHN1YnNjcmlwdGlvblxuXHRcdCAqIEBwYXJhbSB7b2JqZWN0fSB1bnN1YnNjcmliZU9wdGlvbnMuaW52b2NhdGlvbkNvbnRleHQgLSBwYXNzZWQgdG8gdGhlIG9uU3VjY2VzcyBjYWxsYmFja1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgb3Igb25GYWlsdXJlIGNhbGxiYWNrLlxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb259IHVuc3Vic2NyaWJlT3B0aW9ucy5vblN1Y2Nlc3MgLSBjYWxsZWQgd2hlbiB0aGUgdW5zdWJzY3JpYmUgYWNrbm93bGVkZ2VtZW50IGhhcyBiZWVuIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlci5cblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEEgc2luZ2xlIHJlc3BvbnNlIG9iamVjdCBwYXJhbWV0ZXIgaXMgcGFzc2VkIHRvIHRoZVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzIGNhbGxiYWNrIGNvbnRhaW5pbmcgdGhlIGZvbGxvd2luZyBmaWVsZHM6XG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b2w+XG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+aW52b2NhdGlvbkNvbnRleHQgLSBpZiBzZXQgaW4gdGhlIHVuc3Vic2NyaWJlT3B0aW9ucy5cblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbn0gdW5zdWJzY3JpYmVPcHRpb25zLm9uRmFpbHVyZSBjYWxsZWQgd2hlbiB0aGUgdW5zdWJzY3JpYmUgcmVxdWVzdCBoYXMgZmFpbGVkIG9yIHRpbWVkIG91dC5cblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEEgc2luZ2xlIHJlc3BvbnNlIG9iamVjdCBwYXJhbWV0ZXIgaXMgcGFzc2VkIHRvIHRoZSBvbkZhaWx1cmUgY2FsbGJhY2sgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIGZpZWxkczpcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvbD5cblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5pbnZvY2F0aW9uQ29udGV4dCAtIGlmIHNldCBpbiB0aGUgdW5zdWJzY3JpYmVPcHRpb25zLlxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPmVycm9yQ29kZSAtIGEgbnVtYmVyIGluZGljYXRpbmcgdGhlIG5hdHVyZSBvZiB0aGUgZXJyb3IuXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+ZXJyb3JNZXNzYWdlIC0gdGV4dCBkZXNjcmliaW5nIHRoZSBlcnJvci5cblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvb2w+XG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IHVuc3Vic2NyaWJlT3B0aW9ucy50aW1lb3V0IC0gd2hpY2gsIGlmIHByZXNlbnQsIGRldGVybWluZXMgdGhlIG51bWJlciBvZiBzZWNvbmRzXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZnRlciB3aGljaCB0aGUgb25GYWlsdXJlIGNhbGxiYWNrIGlzIGNhbGxlZC4gVGhlIHByZXNlbmNlIG9mXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIHRpbWVvdXQgZG9lcyBub3QgcHJldmVudCB0aGUgb25TdWNjZXNzIGNhbGxiYWNrIGZyb20gYmVpbmdcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxlZCB3aGVuIHRoZSB1bnN1YnNjcmliZSBjb21wbGV0ZXNcblx0XHQgKiBAdGhyb3dzIHtJbnZhbGlkU3RhdGV9IGlmIHRoZSBjbGllbnQgaXMgbm90IGluIGNvbm5lY3RlZCBzdGF0ZS5cblx0XHQgKi9cblx0XHRcdHRoaXMudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZmlsdGVyLCB1bnN1YnNjcmliZU9wdGlvbnMpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBmaWx0ZXIgIT09IFwic3RyaW5nXCIgJiYgZmlsdGVyLmNvbnN0cnVjdG9yICE9PSBBcnJheSlcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50OlwiK2ZpbHRlcik7XG5cdFx0XHRcdHVuc3Vic2NyaWJlT3B0aW9ucyA9IHVuc3Vic2NyaWJlT3B0aW9ucyB8fCB7fSA7XG5cdFx0XHRcdHZhbGlkYXRlKHVuc3Vic2NyaWJlT3B0aW9ucywgIHtpbnZvY2F0aW9uQ29udGV4dDpcIm9iamVjdFwiLFxuXHRcdFx0XHRcdG9uU3VjY2VzczpcImZ1bmN0aW9uXCIsXG5cdFx0XHRcdFx0b25GYWlsdXJlOlwiZnVuY3Rpb25cIixcblx0XHRcdFx0XHR0aW1lb3V0OlwibnVtYmVyXCJcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmICh1bnN1YnNjcmliZU9wdGlvbnMudGltZW91dCAmJiAhdW5zdWJzY3JpYmVPcHRpb25zLm9uRmFpbHVyZSlcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1YnNjcmliZU9wdGlvbnMudGltZW91dCBzcGVjaWZpZWQgd2l0aCBubyBvbkZhaWx1cmUgY2FsbGJhY2suXCIpO1xuXHRcdFx0XHRjbGllbnQudW5zdWJzY3JpYmUoZmlsdGVyLCB1bnN1YnNjcmliZU9wdGlvbnMpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyoqXG5cdFx0ICogU2VuZCBhIG1lc3NhZ2UgdG8gdGhlIGNvbnN1bWVycyBvZiB0aGUgZGVzdGluYXRpb24gaW4gdGhlIE1lc3NhZ2UuXG5cdFx0ICpcblx0XHQgKiBAbmFtZSBQYWhvLkNsaWVudCNzZW5kXG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd8UGFoby5NZXNzYWdlfSB0b3BpYyAtIDxiPm1hbmRhdG9yeTwvYj4gVGhlIG5hbWUgb2YgdGhlIGRlc3RpbmF0aW9uIHRvIHdoaWNoIHRoZSBtZXNzYWdlIGlzIHRvIGJlIHNlbnQuXG5cdFx0ICogXHRcdFx0XHRcdCAgIC0gSWYgaXQgaXMgdGhlIG9ubHkgcGFyYW1ldGVyLCB1c2VkIGFzIFBhaG8uTWVzc2FnZSBvYmplY3QuXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd8QXJyYXlCdWZmZXJ9IHBheWxvYWQgLSBUaGUgbWVzc2FnZSBkYXRhIHRvIGJlIHNlbnQuXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IHFvcyBUaGUgUXVhbGl0eSBvZiBTZXJ2aWNlIHVzZWQgdG8gZGVsaXZlciB0aGUgbWVzc2FnZS5cblx0XHQgKiBcdFx0PGRsPlxuXHRcdCAqIFx0XHRcdDxkdD4wIEJlc3QgZWZmb3J0IChkZWZhdWx0KS5cblx0XHQgKiAgICAgXHRcdFx0PGR0PjEgQXQgbGVhc3Qgb25jZS5cblx0XHQgKiAgICAgXHRcdFx0PGR0PjIgRXhhY3RseSBvbmNlLlxuXHRcdCAqIFx0XHQ8L2RsPlxuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gcmV0YWluZWQgSWYgdHJ1ZSwgdGhlIG1lc3NhZ2UgaXMgdG8gYmUgcmV0YWluZWQgYnkgdGhlIHNlcnZlciBhbmQgZGVsaXZlcmVkXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICB0byBib3RoIGN1cnJlbnQgYW5kIGZ1dHVyZSBzdWJzY3JpcHRpb25zLlxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgSWYgZmFsc2UgdGhlIHNlcnZlciBvbmx5IGRlbGl2ZXJzIHRoZSBtZXNzYWdlIHRvIGN1cnJlbnQgc3Vic2NyaWJlcnMsIHRoaXMgaXMgdGhlIGRlZmF1bHQgZm9yIG5ldyBNZXNzYWdlcy5cblx0XHQgKiAgICAgICAgICAgICAgICAgICAgIEEgcmVjZWl2ZWQgbWVzc2FnZSBoYXMgdGhlIHJldGFpbmVkIGJvb2xlYW4gc2V0IHRvIHRydWUgaWYgdGhlIG1lc3NhZ2Ugd2FzIHB1Ymxpc2hlZFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgcmV0YWluZWQgYm9vbGVhbiBzZXQgdG8gdHJ1ZVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzdWJzY3JwdGlvbiB3YXMgbWFkZSBhZnRlciB0aGUgbWVzc2FnZSBoYXMgYmVlbiBwdWJsaXNoZWQuXG5cdFx0ICogQHRocm93cyB7SW52YWxpZFN0YXRlfSBpZiB0aGUgY2xpZW50IGlzIG5vdCBjb25uZWN0ZWQuXG5cdFx0ICovXG5cdFx0XHR0aGlzLnNlbmQgPSBmdW5jdGlvbiAodG9waWMscGF5bG9hZCxxb3MscmV0YWluZWQpIHtcblx0XHRcdFx0dmFyIG1lc3NhZ2UgO1xuXG5cdFx0XHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnQuXCIrXCJsZW5ndGhcIik7XG5cblx0XHRcdFx0fWVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxKSB7XG5cblx0XHRcdFx0XHRpZiAoISh0b3BpYyBpbnN0YW5jZW9mIE1lc3NhZ2UpICYmICh0eXBlb2YgdG9waWMgIT09IFwic3RyaW5nXCIpKVxuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudDpcIisgdHlwZW9mIHRvcGljKTtcblxuXHRcdFx0XHRcdG1lc3NhZ2UgPSB0b3BpYztcblx0XHRcdFx0XHRpZiAodHlwZW9mIG1lc3NhZ2UuZGVzdGluYXRpb25OYW1lID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX0FSR1VNRU5ULFttZXNzYWdlLmRlc3RpbmF0aW9uTmFtZSxcIk1lc3NhZ2UuZGVzdGluYXRpb25OYW1lXCJdKSk7XG5cdFx0XHRcdFx0Y2xpZW50LnNlbmQobWVzc2FnZSk7XG5cblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHQvL3BhcmFtZXRlciBjaGVja2luZyBpbiBNZXNzYWdlIG9iamVjdFxuXHRcdFx0XHRcdG1lc3NhZ2UgPSBuZXcgTWVzc2FnZShwYXlsb2FkKTtcblx0XHRcdFx0XHRtZXNzYWdlLmRlc3RpbmF0aW9uTmFtZSA9IHRvcGljO1xuXHRcdFx0XHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPj0gMylcblx0XHRcdFx0XHRcdG1lc3NhZ2UucW9zID0gcW9zO1xuXHRcdFx0XHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPj0gNClcblx0XHRcdFx0XHRcdG1lc3NhZ2UucmV0YWluZWQgPSByZXRhaW5lZDtcblx0XHRcdFx0XHRjbGllbnQuc2VuZChtZXNzYWdlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0LyoqXG5cdFx0ICogUHVibGlzaCBhIG1lc3NhZ2UgdG8gdGhlIGNvbnN1bWVycyBvZiB0aGUgZGVzdGluYXRpb24gaW4gdGhlIE1lc3NhZ2UuXG5cdFx0ICogU3lub255bSBmb3IgUGFoby5NcXR0LkNsaWVudCNzZW5kXG5cdFx0ICpcblx0XHQgKiBAbmFtZSBQYWhvLkNsaWVudCNwdWJsaXNoXG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd8UGFoby5NZXNzYWdlfSB0b3BpYyAtIDxiPm1hbmRhdG9yeTwvYj4gVGhlIG5hbWUgb2YgdGhlIHRvcGljIHRvIHdoaWNoIHRoZSBtZXNzYWdlIGlzIHRvIGJlIHB1Ymxpc2hlZC5cblx0XHQgKiBcdFx0XHRcdFx0ICAgLSBJZiBpdCBpcyB0aGUgb25seSBwYXJhbWV0ZXIsIHVzZWQgYXMgUGFoby5NZXNzYWdlIG9iamVjdC5cblx0XHQgKiBAcGFyYW0ge1N0cmluZ3xBcnJheUJ1ZmZlcn0gcGF5bG9hZCAtIFRoZSBtZXNzYWdlIGRhdGEgdG8gYmUgcHVibGlzaGVkLlxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBxb3MgVGhlIFF1YWxpdHkgb2YgU2VydmljZSB1c2VkIHRvIGRlbGl2ZXIgdGhlIG1lc3NhZ2UuXG5cdFx0ICogXHRcdDxkbD5cblx0XHQgKiBcdFx0XHQ8ZHQ+MCBCZXN0IGVmZm9ydCAoZGVmYXVsdCkuXG5cdFx0ICogICAgIFx0XHRcdDxkdD4xIEF0IGxlYXN0IG9uY2UuXG5cdFx0ICogICAgIFx0XHRcdDxkdD4yIEV4YWN0bHkgb25jZS5cblx0XHQgKiBcdFx0PC9kbD5cblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IHJldGFpbmVkIElmIHRydWUsIHRoZSBtZXNzYWdlIGlzIHRvIGJlIHJldGFpbmVkIGJ5IHRoZSBzZXJ2ZXIgYW5kIGRlbGl2ZXJlZFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgdG8gYm90aCBjdXJyZW50IGFuZCBmdXR1cmUgc3Vic2NyaXB0aW9ucy5cblx0XHQgKiAgICAgICAgICAgICAgICAgICAgIElmIGZhbHNlIHRoZSBzZXJ2ZXIgb25seSBkZWxpdmVycyB0aGUgbWVzc2FnZSB0byBjdXJyZW50IHN1YnNjcmliZXJzLCB0aGlzIGlzIHRoZSBkZWZhdWx0IGZvciBuZXcgTWVzc2FnZXMuXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICBBIHJlY2VpdmVkIG1lc3NhZ2UgaGFzIHRoZSByZXRhaW5lZCBib29sZWFuIHNldCB0byB0cnVlIGlmIHRoZSBtZXNzYWdlIHdhcyBwdWJsaXNoZWRcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgIHdpdGggdGhlIHJldGFpbmVkIGJvb2xlYW4gc2V0IHRvIHRydWVcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc3Vic2NycHRpb24gd2FzIG1hZGUgYWZ0ZXIgdGhlIG1lc3NhZ2UgaGFzIGJlZW4gcHVibGlzaGVkLlxuXHRcdCAqIEB0aHJvd3Mge0ludmFsaWRTdGF0ZX0gaWYgdGhlIGNsaWVudCBpcyBub3QgY29ubmVjdGVkLlxuXHRcdCAqL1xuXHRcdFx0dGhpcy5wdWJsaXNoID0gZnVuY3Rpb24odG9waWMscGF5bG9hZCxxb3MscmV0YWluZWQpIHtcblx0XHRcdFx0dmFyIG1lc3NhZ2UgO1xuXG5cdFx0XHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnQuXCIrXCJsZW5ndGhcIik7XG5cblx0XHRcdFx0fWVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxKSB7XG5cblx0XHRcdFx0XHRpZiAoISh0b3BpYyBpbnN0YW5jZW9mIE1lc3NhZ2UpICYmICh0eXBlb2YgdG9waWMgIT09IFwic3RyaW5nXCIpKVxuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudDpcIisgdHlwZW9mIHRvcGljKTtcblxuXHRcdFx0XHRcdG1lc3NhZ2UgPSB0b3BpYztcblx0XHRcdFx0XHRpZiAodHlwZW9mIG1lc3NhZ2UuZGVzdGluYXRpb25OYW1lID09PSBcInVuZGVmaW5lZFwiKVxuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX0FSR1VNRU5ULFttZXNzYWdlLmRlc3RpbmF0aW9uTmFtZSxcIk1lc3NhZ2UuZGVzdGluYXRpb25OYW1lXCJdKSk7XG5cdFx0XHRcdFx0Y2xpZW50LnNlbmQobWVzc2FnZSk7XG5cblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdC8vcGFyYW1ldGVyIGNoZWNraW5nIGluIE1lc3NhZ2Ugb2JqZWN0XG5cdFx0XHRcdFx0bWVzc2FnZSA9IG5ldyBNZXNzYWdlKHBheWxvYWQpO1xuXHRcdFx0XHRcdG1lc3NhZ2UuZGVzdGluYXRpb25OYW1lID0gdG9waWM7XG5cdFx0XHRcdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA+PSAzKVxuXHRcdFx0XHRcdFx0bWVzc2FnZS5xb3MgPSBxb3M7XG5cdFx0XHRcdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA+PSA0KVxuXHRcdFx0XHRcdFx0bWVzc2FnZS5yZXRhaW5lZCA9IHJldGFpbmVkO1xuXHRcdFx0XHRcdGNsaWVudC5zZW5kKG1lc3NhZ2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHQvKipcblx0XHQgKiBOb3JtYWwgZGlzY29ubmVjdCBvZiB0aGlzIE1lc3NhZ2luZyBjbGllbnQgZnJvbSBpdHMgc2VydmVyLlxuXHRcdCAqXG5cdFx0ICogQG5hbWUgUGFoby5DbGllbnQjZGlzY29ubmVjdFxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEB0aHJvd3Mge0ludmFsaWRTdGF0ZX0gaWYgdGhlIGNsaWVudCBpcyBhbHJlYWR5IGRpc2Nvbm5lY3RlZC5cblx0XHQgKi9cblx0XHRcdHRoaXMuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y2xpZW50LmRpc2Nvbm5lY3QoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qKlxuXHRcdCAqIEdldCB0aGUgY29udGVudHMgb2YgdGhlIHRyYWNlIGxvZy5cblx0XHQgKlxuXHRcdCAqIEBuYW1lIFBhaG8uQ2xpZW50I2dldFRyYWNlTG9nXG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQHJldHVybiB7T2JqZWN0W119IHRyYWNlYnVmZmVyIGNvbnRhaW5pbmcgdGhlIHRpbWUgb3JkZXJlZCB0cmFjZSByZWNvcmRzLlxuXHRcdCAqL1xuXHRcdFx0dGhpcy5nZXRUcmFjZUxvZyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIGNsaWVudC5nZXRUcmFjZUxvZygpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyoqXG5cdFx0ICogU3RhcnQgdHJhY2luZy5cblx0XHQgKlxuXHRcdCAqIEBuYW1lIFBhaG8uQ2xpZW50I3N0YXJ0VHJhY2Vcblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKi9cblx0XHRcdHRoaXMuc3RhcnRUcmFjZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y2xpZW50LnN0YXJ0VHJhY2UoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qKlxuXHRcdCAqIFN0b3AgdHJhY2luZy5cblx0XHQgKlxuXHRcdCAqIEBuYW1lIFBhaG8uQ2xpZW50I3N0b3BUcmFjZVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqL1xuXHRcdFx0dGhpcy5zdG9wVHJhY2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGNsaWVudC5zdG9wVHJhY2UoKTtcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuaXNDb25uZWN0ZWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIGNsaWVudC5jb25uZWN0ZWQ7XG5cdFx0XHR9O1xuXHRcdH07XG5cblx0XHQvKipcblx0ICogQW4gYXBwbGljYXRpb24gbWVzc2FnZSwgc2VudCBvciByZWNlaXZlZC5cblx0ICogPHA+XG5cdCAqIEFsbCBhdHRyaWJ1dGVzIG1heSBiZSBudWxsLCB3aGljaCBpbXBsaWVzIHRoZSBkZWZhdWx0IHZhbHVlcy5cblx0ICpcblx0ICogQG5hbWUgUGFoby5NZXNzYWdlXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge1N0cmluZ3xBcnJheUJ1ZmZlcn0gcGF5bG9hZCBUaGUgbWVzc2FnZSBkYXRhIHRvIGJlIHNlbnQuXG5cdCAqIDxwPlxuXHQgKiBAcHJvcGVydHkge3N0cmluZ30gcGF5bG9hZFN0cmluZyA8aT5yZWFkIG9ubHk8L2k+IFRoZSBwYXlsb2FkIGFzIGEgc3RyaW5nIGlmIHRoZSBwYXlsb2FkIGNvbnNpc3RzIG9mIHZhbGlkIFVURi04IGNoYXJhY3RlcnMuXG5cdCAqIEBwcm9wZXJ0eSB7QXJyYXlCdWZmZXJ9IHBheWxvYWRCeXRlcyA8aT5yZWFkIG9ubHk8L2k+IFRoZSBwYXlsb2FkIGFzIGFuIEFycmF5QnVmZmVyLlxuXHQgKiA8cD5cblx0ICogQHByb3BlcnR5IHtzdHJpbmd9IGRlc3RpbmF0aW9uTmFtZSA8Yj5tYW5kYXRvcnk8L2I+IFRoZSBuYW1lIG9mIHRoZSBkZXN0aW5hdGlvbiB0byB3aGljaCB0aGUgbWVzc2FnZSBpcyB0byBiZSBzZW50XG5cdCAqICAgICAgICAgICAgICAgICAgICAoZm9yIG1lc3NhZ2VzIGFib3V0IHRvIGJlIHNlbnQpIG9yIHRoZSBuYW1lIG9mIHRoZSBkZXN0aW5hdGlvbiBmcm9tIHdoaWNoIHRoZSBtZXNzYWdlIGhhcyBiZWVuIHJlY2VpdmVkLlxuXHQgKiAgICAgICAgICAgICAgICAgICAgKGZvciBtZXNzYWdlcyByZWNlaXZlZCBieSB0aGUgb25NZXNzYWdlIGZ1bmN0aW9uKS5cblx0ICogPHA+XG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBxb3MgVGhlIFF1YWxpdHkgb2YgU2VydmljZSB1c2VkIHRvIGRlbGl2ZXIgdGhlIG1lc3NhZ2UuXG5cdCAqIDxkbD5cblx0ICogICAgIDxkdD4wIEJlc3QgZWZmb3J0IChkZWZhdWx0KS5cblx0ICogICAgIDxkdD4xIEF0IGxlYXN0IG9uY2UuXG5cdCAqICAgICA8ZHQ+MiBFeGFjdGx5IG9uY2UuXG5cdCAqIDwvZGw+XG5cdCAqIDxwPlxuXHQgKiBAcHJvcGVydHkge0Jvb2xlYW59IHJldGFpbmVkIElmIHRydWUsIHRoZSBtZXNzYWdlIGlzIHRvIGJlIHJldGFpbmVkIGJ5IHRoZSBzZXJ2ZXIgYW5kIGRlbGl2ZXJlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgIHRvIGJvdGggY3VycmVudCBhbmQgZnV0dXJlIHN1YnNjcmlwdGlvbnMuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgSWYgZmFsc2UgdGhlIHNlcnZlciBvbmx5IGRlbGl2ZXJzIHRoZSBtZXNzYWdlIHRvIGN1cnJlbnQgc3Vic2NyaWJlcnMsIHRoaXMgaXMgdGhlIGRlZmF1bHQgZm9yIG5ldyBNZXNzYWdlcy5cblx0ICogICAgICAgICAgICAgICAgICAgICBBIHJlY2VpdmVkIG1lc3NhZ2UgaGFzIHRoZSByZXRhaW5lZCBib29sZWFuIHNldCB0byB0cnVlIGlmIHRoZSBtZXNzYWdlIHdhcyBwdWJsaXNoZWRcblx0ICogICAgICAgICAgICAgICAgICAgICB3aXRoIHRoZSByZXRhaW5lZCBib29sZWFuIHNldCB0byB0cnVlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzdWJzY3JwdGlvbiB3YXMgbWFkZSBhZnRlciB0aGUgbWVzc2FnZSBoYXMgYmVlbiBwdWJsaXNoZWQuXG5cdCAqIDxwPlxuXHQgKiBAcHJvcGVydHkge0Jvb2xlYW59IGR1cGxpY2F0ZSA8aT5yZWFkIG9ubHk8L2k+IElmIHRydWUsIHRoaXMgbWVzc2FnZSBtaWdodCBiZSBhIGR1cGxpY2F0ZSBvZiBvbmUgd2hpY2ggaGFzIGFscmVhZHkgYmVlbiByZWNlaXZlZC5cblx0ICogICAgICAgICAgICAgICAgICAgICBUaGlzIGlzIG9ubHkgc2V0IG9uIG1lc3NhZ2VzIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlci5cblx0ICpcblx0ICovXG5cdFx0dmFyIE1lc3NhZ2UgPSBmdW5jdGlvbiAobmV3UGF5bG9hZCkge1xuXHRcdFx0dmFyIHBheWxvYWQ7XG5cdFx0XHRpZiAoICAgdHlwZW9mIG5ld1BheWxvYWQgPT09IFwic3RyaW5nXCIgfHxcblx0XHRuZXdQYXlsb2FkIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHxcblx0XHQoQXJyYXlCdWZmZXIuaXNWaWV3KG5ld1BheWxvYWQpICYmICEobmV3UGF5bG9hZCBpbnN0YW5jZW9mIERhdGFWaWV3KSlcblx0XHRcdCkge1xuXHRcdFx0XHRwYXlsb2FkID0gbmV3UGF5bG9hZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IChmb3JtYXQoRVJST1IuSU5WQUxJRF9BUkdVTUVOVCwgW25ld1BheWxvYWQsIFwibmV3UGF5bG9hZFwiXSkpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZGVzdGluYXRpb25OYW1lO1xuXHRcdFx0dmFyIHFvcyA9IDA7XG5cdFx0XHR2YXIgcmV0YWluZWQgPSBmYWxzZTtcblx0XHRcdHZhciBkdXBsaWNhdGUgPSBmYWxzZTtcblxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcyx7XG5cdFx0XHRcdFwicGF5bG9hZFN0cmluZ1wiOntcblx0XHRcdFx0XHRlbnVtZXJhYmxlIDogdHJ1ZSxcblx0XHRcdFx0XHRnZXQgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIHBheWxvYWQgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXlsb2FkO1xuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VVVEY4KHBheWxvYWQsIDAsIHBheWxvYWQubGVuZ3RoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwicGF5bG9hZEJ5dGVzXCI6e1xuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdFx0XHR2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKFVURjhMZW5ndGgocGF5bG9hZCkpO1xuXHRcdFx0XHRcdFx0XHR2YXIgYnl0ZVN0cmVhbSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XG5cdFx0XHRcdFx0XHRcdHN0cmluZ1RvVVRGOChwYXlsb2FkLCBieXRlU3RyZWFtLCAwKTtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYnl0ZVN0cmVhbTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXlsb2FkO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJkZXN0aW5hdGlvbk5hbWVcIjp7XG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gZGVzdGluYXRpb25OYW1lOyB9LFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24obmV3RGVzdGluYXRpb25OYW1lKSB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIG5ld0Rlc3RpbmF0aW9uTmFtZSA9PT0gXCJzdHJpbmdcIilcblx0XHRcdFx0XHRcdFx0ZGVzdGluYXRpb25OYW1lID0gbmV3RGVzdGluYXRpb25OYW1lO1xuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KEVSUk9SLklOVkFMSURfQVJHVU1FTlQsIFtuZXdEZXN0aW5hdGlvbk5hbWUsIFwibmV3RGVzdGluYXRpb25OYW1lXCJdKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInFvc1wiOntcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBxb3M7IH0sXG5cdFx0XHRcdFx0c2V0OiBmdW5jdGlvbihuZXdRb3MpIHtcblx0XHRcdFx0XHRcdGlmIChuZXdRb3MgPT09IDAgfHwgbmV3UW9zID09PSAxIHx8IG5ld1FvcyA9PT0gMiApXG5cdFx0XHRcdFx0XHRcdHFvcyA9IG5ld1Fvcztcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudDpcIituZXdRb3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJyZXRhaW5lZFwiOntcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7IHJldHVybiByZXRhaW5lZDsgfSxcblx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKG5ld1JldGFpbmVkKSB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIG5ld1JldGFpbmVkID09PSBcImJvb2xlYW5cIilcblx0XHRcdFx0XHRcdFx0cmV0YWluZWQgPSBuZXdSZXRhaW5lZDtcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGZvcm1hdChFUlJPUi5JTlZBTElEX0FSR1VNRU5ULCBbbmV3UmV0YWluZWQsIFwibmV3UmV0YWluZWRcIl0pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwidG9waWNcIjp7XG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gZGVzdGluYXRpb25OYW1lOyB9LFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24obmV3VG9waWMpIHtkZXN0aW5hdGlvbk5hbWU9bmV3VG9waWM7fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImR1cGxpY2F0ZVwiOntcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBkdXBsaWNhdGU7IH0sXG5cdFx0XHRcdFx0c2V0OiBmdW5jdGlvbihuZXdEdXBsaWNhdGUpIHtkdXBsaWNhdGU9bmV3RHVwbGljYXRlO31cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdC8vIE1vZHVsZSBjb250ZW50cy5cblx0XHRyZXR1cm4ge1xuXHRcdFx0Q2xpZW50OiBDbGllbnQsXG5cdFx0XHRNZXNzYWdlOiBNZXNzYWdlXG5cdFx0fTtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG5cdH0pKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pO1xuXHRyZXR1cm4gUGFob01RVFQ7XG59KTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImltcG9ydCBQYWhvIGZyb20gJ3BhaG8tbXF0dCc7XG5cbihmdW5jdGlvbigpe1xuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmIHtTdHJpbmd9IE1RVFRfVFlQRVxuICAgICAqIERpY3Rpb25hcnkgZm9yIGNvbXBhcmluZyBtcXR0IHR5cGVzXG4gICAgICovXG4gICAgY29uc3QgTVFUVF9UWVBFID0ge1xuICAgICAgICBzZW5kZXI6IFwic2VuZGVyXCIsXG4gICAgICAgIHJlY2VpdmVyOiBcInJlY2VpdmVyXCIsXG4gICAgfTtcblxuICAgIGNsYXNzIE1xdHRDbGllbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgICAgIGdldCBpZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCB0b3BpYygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndG9waWMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCB1c2VySWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3VzZXJJZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHVzZXJJZCh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3VzZXJJZCcsIHZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCd1c2VySWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBDb25zdHJ1Y3RvciBmb3Igc2V0dGluZyB1cCBzaGFkb3cgZG9tIGFuZCBjbGFzcyBkZWZpbml0aW9uc1xuICAgICAgICAgKiBmb3Igd2ViIGNvbXBvbmVudC4gVGhlIGF0dHJpYnV0ZXMgYXJlIGlkLCBzbG90LCBhbmQgdG9waWNcbiAgICAgICAgICogQGV4YW1wbGUgPGlucHV0LXJ0IG1vZGU9XCJ0ZXh0YXJlYVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1xdHQtY2xpZW50IGlkPVwicmVjZWl2ZXJcIiBzbG90PVwibWVzc2VuZ2VyXCIgdG9waWM9XCJjaGF0dGVzdC8xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21xdHQtY2xpZW50PlxuICAgICAgICAgICAgICAgICAgICA8L2lucHV0LXJ0PlxuICAgICAgICAgKiBAY2xhc3MgTVFUVCBDbGllbnQgV2ViIENvbXBvbmVudCwgVGhpcyBjbGFzcyBwcm92aWRlcyBmdW5jdGlvbmFsaXR5IHRvIHNlbmQgYW5kIGZldGNoIG1lc3NhZ2VzIHRvIGFuZCBmcm9tIGEgcG9ydCwgZ2l2ZW4gYSB0b3BpYyxcbiAgICAgICAgICogSXQgY2FuIGJlIGF0dGFjaGVkIHRvIGlucHV0UlRcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICAvL2V2ZW50dWFsbHkgbWF5IHdhbnQgdG8gdHJ5IHRoaXMgYXBwcm9hY2g6IGh0dHBzOi8vYXl1c2hncC5naXRodWIuaW8vaHRtbC13ZWItY29tcG9uZW50cy11c2luZy12YW5pbGxhLWpzLXBhcnQtMy9cblxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBzaGFkb3cgcm9vdFxuICAgICAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBjbGllbnQgaW5zdGFuY2VcbiAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG4gICAgICAgICAgICB0aGlzLmNsaWVudCA9IG5ldyBQYWhvLk1RVFQuQ2xpZW50KFwiYnJva2VyLm1xdHRkYXNoYm9hcmQuY29tXCIsIE51bWJlcig4MDAwKSwgXCJcIik7XG5cbiAgICAgICAgICAgIHRoaXMuY2xpZW50Lm9uQ29ubmVjdGlvbkxvc3QgPSBmdW5jdGlvbihyZXNwb25zZU9iamVjdCl7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogUGVyaGFwcyB3ZSBzaG91bGQgcmVmbGVjdCBjb25uZWN0ZWQgYXMgYW4gYXR0cmlidXRlIHJhdGhlclxuICAgICAgICAgICAgICAgIC8vIHRoYW4gYSBjb25zb2xlIHN0YXRlbWVudCBcbiAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIExvc3RcIiArIHJlc3BvbnNlT2JqZWN0LmVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDb25uZWN0IHRoZSBjbGllbnRcbiAgICAgICAgICAgIGNvbnN0IG9uQ29ubmVjdCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogUGVyaGFwcyB3ZSBzaG91bGQgcmVmbGVjdCBjb25uZWN0ZWQgYXMgYW4gYXR0cmlidXRlIHJhdGhlclxuICAgICAgICAgICAgICAgIC8vIHRoYW4gYSBjb25zb2xlIHN0YXRlbWVudCBcbiAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGllbnQuc3Vic2NyaWJlKHRoaXMudG9waWMpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5jb25uZWN0KHtvblN1Y2Nlc3M6b25Db25uZWN0fSk7XG5cbiAgICAgICAgICAgIC8vIFRPRE86IHRoaXMgc2hvdWxkIGJlIHJlZmFjdG9yZWQgc28gdGhhdCBpdCBpcyBzdHlsYWJsZSBpbiBhIHNsb3RcbiAgICAgICAgICAgIC8vIGFuZCBpcyBtb3JlIGRldiBmcmllbmRseVxuICAgICAgICAgICAgaWYodGhpcy51c2VySWQgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSBcImFub255bW91c1wiO1xuICAgICAgICAgICAgICAgIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgICAgIGkuc2V0QXR0cmlidXRlKFwiaWRcIixcInVzZXJJZFwiKTtcbiAgICAgICAgICAgICAgICBpLnNldEF0dHJpYnV0ZShcIm5hbWVcIixcInVzZXJJZFwiKTtcbiAgICAgICAgICAgICAgICBpLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsXCJhbm9ueW1vdXNcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbm5lY3RlZENhbGxiYWNrKCl7XG4gICAgICAgICAgICAvLyBMaXN0ZW4gZm9yIHVzZXJJZCBDaGFuZ2VcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gICAgICAgICAgICBpZihpbnB1dCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuaWQgPT0gTVFUVF9UWVBFLnJlY2VpdmVyKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmUodGhpcy5wYXJlbnRFbGVtZW50LmFwcGVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlKGNhbGxiYWNrKXtcbiAgICAgICAgICAgIGlmKHRoaXMuaWQgPT0gTVFUVF9UWVBFLnJlY2VpdmVyKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudC5vbk1lc3NhZ2VBcnJpdmVkID0gZnVuY3Rpb24obWVzc2FnZSl7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG1lc3NhZ2UucGF5bG9hZFN0cmluZyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZW5kcyBhIG1lc3NhZ2UgdGhyb3VnaCB0aGUgcGFobyBtcXR0IGNsaWVudCBvbiB0aGUgdG9waWMgc3BlY2lmaWVkXG4gICAgICAgICAqIE1lc3NhZ2Ugc2NoZW1hOiBcIlVzZXJJZDogYm9keVwiXG4gICAgICAgICAqL1xuICAgICAgICBzZW5kKGJvZHkpe1xuICAgICAgICAgICAgaWYodGhpcy5pZCA9PSBNUVRUX1RZUEUuc2VuZGVyKXtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy51c2VySWQgKyBcIjogXCIgKyBib2R5O1xuICAgICAgICAgICAgICAgIGNvbnN0IG1xdHRfbXNnID0gbmV3IFBhaG8uTVFUVC5NZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIG1xdHRfbXNnLmRlc3RpbmF0aW9uTmFtZSA9IHRoaXMudG9waWM7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGllbnQuc2VuZChtcXR0X21zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVnaXN0ZXIgbXF0dENsaWVudCBjbGFzcyBhcyBtcXR0LWNsaWVudCBlbGVtZW50XG4gICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtcXR0LWNsaWVudCcsIE1xdHRDbGllbnQpO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=