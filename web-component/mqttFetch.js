/**
 * MsgFetch class
 * API for fetching messages over a network
 */
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
     * Constructor for setting up shadow dom and class definitions
     * for web component.
     */
    constructor () {
        super();

        //eventually may want to try this approach: https://ayushgp.github.io/html-web-components-using-vanilla-js-part-3/
        this.userId = "anonymous";
        this.msgId = -1;

        // Initialize shadow root
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
        // NOTE: If you have client issues its because there is another client connected with this name
        // Choose another random client id and it should fix the problem
        // You can determine this by opening dev tools and if it says socket closed that is the problem
        // TODO: FIX ABOVE -- kinda fixed but perhaps a better fix can be implemented
        this.client = new Paho.MQTT.Client("broker.mqttdashboard.com", Number(8000), makeid(8));

        this.client.onConnectionLost = function(responseObject){
            console.log("Connection Lost" + responseObject.errorMessage);
        };
        // connect the client
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
