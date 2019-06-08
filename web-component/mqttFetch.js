class MqttFetch extends HTMLElement {

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
                 <mqtt-fetch id="receiver" slot="messenger" topic="chattest/1">
                 </mqtt-fetch>
             </input-rt>
     * @class MQTT Fetch Web Component, This class provides functionality to fetch messages from a port, given a topic,
     * It can be attached to inputRT
     */
    constructor () {
        super();

        //eventually may want to try this approach: https://ayushgp.github.io/html-web-components-using-vanilla-js-part-3/
        this.userId = "anonymous";
        this.msgId = -1;

        // Initialize shadow root
        this.attachShadow({mode: 'open'});

        // Create a client instance
        this.client = new Paho.MQTT.Client("broker.mqttdashboard.com", Number(8000), "");

        this.client.onConnectionLost = function(responseObject){
            console.log("Connection Lost" + responseObject.errorMessage);
        };

        // Connect the client
        const onConnect = function(){
            console.log("fetch Connected");
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

        this.observe(this.parentElement.append);
    }

    observe(callback){
        this.client.onMessageArrived = function(message){
            callback(message.payloadString);
        };
    }
}

// Register mqtt-fetch class as mqtt-fetch element
customElements.define('mqtt-fetch', MqttFetch);
