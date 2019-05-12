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
    get rainbow() {
      return this.hasAttribute('rainbow');
    }
    /**
     * set rainbow(val) 
     * Sets rainbow if value passed in, or removes it if nothing
     * is passed.
     * Returns: Null
     */
    set rainbow(val) {
      if (val !== '') {
        this.setAttribute('rainbow', '');
      } else {
        this.removeAttribute('rainbow');
      }
    }
    /**
     * get font() 
     * Check if font exists in HTML.
     * Returns: True or False 
     */
    get font() {
      return this.getAttribute('font');
    }
    /**
     * set font(val) 
     * Sets font to value passed in, or removes it if nothing
     * is passed.
     * Returns: Null
     */
    set font(val) {
      if (val !== '') {
        this.setAttribute('font', val);
      } else {
        this.removeAttribute('font');
      }
    }

    /**
     * Constructor for setting up shadow dom and class definitions 
     * for web component.
     */
    constructor () {
      super();

      this.userId = "anonymous"
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
        console.log(this.userId);
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
        return message
    }

    send(body){
        const message = this.constructMessage(body)
    }
}

// Register ChatBox class as chat-box element
customElements.define('msg-send', MsgSend);