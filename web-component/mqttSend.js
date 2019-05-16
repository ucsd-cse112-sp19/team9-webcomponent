/**
 * HelloWorld class
 * Provides template for core-hello element
 */
class MqttSend extends HTMLElement {
    /**
     * get rainbow() 
     * Check if rainbow exists in HTML.
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
    }

    connectedCallback(){
      // Initialize shadow root
      const shadowRoot = this.attachShadow({mode: 'open'});
 
      // Create a client instance
      this.client = new Paho.MQTT.Client("broker.mqttdashboard.com", Number(8000), "clientId-asfsMWjX");

      this.client.onConnectionLost = function(responseObject){
        console.log("Connection Lost" + responseObject.errorMessage);
        // that.client.connect({onSuccess:function(){
        //     console.log("send connected");
        // }});
      };
      // connect the client
      const that = this;
      this.client.connect({onSuccess:function(){
        console.log("send connected");
        that.client.subscribe(that.topic);
      }});


      // Append to shadowdom style
      // Eventually turn into text area so that we can scroll
      // Through - if not sprint1 def sprint 2
      const i = document.createElement('input');
      i.setAttribute("id","userId");
      i.setAttribute("name","userId");
      i.setAttribute("value","anonymous");
      shadowRoot.append(i);
      


      // Listen for userId Change
      i.addEventListener('change', ()=>{
        this.userId = shadowRoot.querySelector('input').value;
      });
    }

    send(body){
        const message = this.userId + ": " + body;
        const mqtt_msg = new Paho.MQTT.Message(message);
        mqtt_msg.destinationName = this.topic;
        this.client.send(mqtt_msg);
    }
}

// Register ChatBox class as chat-box element
customElements.define('mqtt-send', MqttSend);