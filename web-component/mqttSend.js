class MqttSend extends HTMLElement {
    /**
     * get url()
     * Check if url exists in HTML.
     * Returns: True or False
     */
    get url() {
      return this.getAttribute('url');
    }
    /**
     * set url(val)
     * Sets url if value passed in, or removes it if nothing
     * is passed.
     * Returns: Null
     */
    set url(val) {
      if (val !== '') {
        this.setAttribute('url', val);
      } else {
        this.removeAttribute('url');
      }
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

        // TODO: This should be optimized or another method should be implemented.
        // This is a helper function that generates a random client id.
        function makeid(length) {
            let result           = '';
            const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        // Create a client instance
        // NOTE: It appears as tho connecting on the sender side has some issues
        // refreshing multiple times works for me until in devtools you don't see
        // Connection LostAMQJS0008I Socket closed. This is likely do to using a public mqtt
        // server... We can spin up our own some time soon
        // TODO: FIX ABOVE -- kinda fixed but perhaps a better fix can be implemented
        this.client = new Paho.MQTT.Client("broker.mqttdashboard.com", Number(8000), makeid(8));

        this.client.onConnectionLost = function(responseObject){
            console.log("Connection Lost" + responseObject.errorMessage);
        };
        // connect the client
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

    send(body){
        const message = this.userId + ": " + body;
        const mqtt_msg = new Paho.MQTT.Message(message);
        mqtt_msg.destinationName = this.topic;
        this.client.send(mqtt_msg);
    }
}

// Register MqttSend class as mqtt-send element
customElements.define('mqtt-send', MqttSend);
