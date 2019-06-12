(function(){

  /**
   * @typedef {String} MQTT_TYPE
   *  Dictionary for comparing mqtt types
   */
  const MQTT_TYPE = {
    sender: "sender",
    receiver: "receiver",
  };

  class MqttClient extends HTMLElement {


    get id() {
      return this.getAttribute('id');
    }

    /**
     * get topic()
     * Check if topic exists in HTML.
     * Returns: True or False
     */
    get topic() {
        return this.getAttribute('topic');
    }

    /**
     *
     * Constructor for setting up shadow dom and class definitions
     * for web component. The attributes are id, slot, and topic
     * @example        <input-rt mode="textarea">
                 <mqtt-client id="receiver" slot="messenger" topic="chattest/1">
                 </mqtt-client>
             </input-rt>
     * @class MQTT Client Web Component, This class provides functionality to send and fetch messages to and from a port, given a topic,
     * It can be attached to inputRT
     */
    constructor () {
        super();
        //eventually may want to try this approach: https://ayushgp.github.io/html-web-components-using-vanilla-js-part-3/
        this.userId = "anonymous";

        // Initialize shadow root
        this.attachShadow({mode: 'open'});

        // Create a client instance
        /* eslint-disable no-undef */
        this.client = new Paho.MQTT.Client("broker.mqttdashboard.com", Number(8000), "");

        this.client.onConnectionLost = function(responseObject){
            /* eslint-disable no-console */
            console.log("Connection Lost" + responseObject.errorMessage);
        };

        // Connect the client
        const onConnect = function(){
            /* eslint-disable no-console */
            console.log("Connected");
            this.client.subscribe(this.topic);
        }.bind(this);

        this.client.connect({onSuccess:onConnect});

        // Append to shadowdom style
        // Eventually turn into text area so that we can scroll
        // Through - if not sprint1 def sprint 2
        const i = document.createElement('input');
        i.setAttribute("id","userId");
        i.setAttribute("name","userId");
        i.setAttribute("value","anonymous");
        this.shadowRoot.append(i);
    }

    connectedCallback(){
        // Listen for userId Change
        const input = this.shadowRoot.querySelector('input');
        input.addEventListener('change', ()=>{
            this.userId = input.value;
        });

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
          const mqtt_msg = new Paho.MQTT.Message(message);
          mqtt_msg.destinationName = this.topic;
          this.client.send(mqtt_msg);
        }
    }

  }

  // Register mqttClient class as mqtt-client element
  customElements.define('mqtt-client', MqttClient);

})();
