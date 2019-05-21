/**
 * HelloWorld class
 * Provides template for core-hello element
 */
class MsgSend extends HTMLElement {
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

    constructMessage(body){
        const date = new Date();
        const timeStamp = date.getTime();
        const message = { 
                            sender:this.userId,
                            timestamp:timeStamp,
                            body:body,
                            hash:"TBD"
                        }
        return [message]
    }

    send(body){
        const message = this.constructMessage(body);
        const http = new XMLHttpRequest();
        const url = this.url;
        const params = JSON.stringify(message);
        http.open('POST', url, true);
        
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
        
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                alert(http.responseText);
            }
        }
        http.send(params);

    }
}

// Register ChatBox class as chat-box element
customElements.define('msg-send', MsgSend);