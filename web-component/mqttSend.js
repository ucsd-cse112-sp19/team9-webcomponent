class MqttSend extends HTMLElement {

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
     * @example   <input-rt mode="sender">
           <mqtt-send id="sender" slot="messenger" topic="chattest/1">
           </mqtt-send>
       </input-rt>
     * @class MQTT Send Web Component, This class provides functionality to send messages to a port, given a topic,
     * It can be attached to inputRT
     */
    constructor () {
        super();

        //eventually may want to try this approach: https://ayushgp.github.io/html-web-components-using-vanilla-js-part-3/
        // Such as using that html template that generates requirements to be used by wrappers (like an interface).
        this.userId = "anonymous";
        this.attachShadow({mode: 'open'});

        let Paho
        // Create a client instance
        this.client = new Paho.MQTT.Client("broker.mqttdashboard.com", Number(8000), "");

        this.client.onConnectionLost = function(responseObject){
            console.log("Connection Lost" + responseObject.errorMessage);
        };

        // Connect the client
        this.client.connect({onSuccess:function(){
            console.log("send connected");
        }});

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
    }

    /**
     * Sends a message through the paho mqtt client on the topic specified
     * Message schema: "UserId: body"
     */
    send(body){
        const message = this.userId + ": " + body;
        const mqtt_msg = new Paho.MQTT.Message(message);
        mqtt_msg.destinationName = this.topic;
        this.client.send(mqtt_msg);
    }
}

// Register MqttSend class as mqtt-send element
customElements.define('mqtt-send', MqttSend);
