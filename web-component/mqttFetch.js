/**
 * MsgFetch class
 * API for fetching messages over a network
 */
class MqttFetch extends HTMLElement {
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
    }

    connectedCallback(){
      // Initialize shadow root
      const shadowRoot = this.attachShadow({mode: 'open'});
      let defaultStyle = `<link rel="stylesheet" type="text/css" href="mqtt-fetch-default-style.css"></link>`;
      shadowRoot.innerHTML += defaultStyle;


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
      //"clientId-AbaseqDRPji"
      this.client = new Paho.MQTT.Client("broker.mqttdashboard.com", Number(8000), makeid(8));

      this.client.onConnectionLost = function(responseObject){
        console.log("Connection Lost" + responseObject.errorMessage);
      };
      // connect the client
      const that = this;
      this.client.connect({onSuccess:function(){
          console.log("fetch connected");
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

    observe(that,callback){
        this.client.onMessageArrived = function(message){
            callback(that,message.payloadString);
        };
    }
}

// Register ChatBox class as chat-box element
customElements.define('mqtt-fetch', MqttFetch);