/**
 * HelloWorld class
 * Provides template for core-hello element
 */
class ChatBox extends HTMLElement {
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

      // Initialize shadow root
      const shadowRoot = this.attachShadow({mode: 'open'});
      
 
      // Append to shadowdom style
      // Eventually turn into text area so that we can scroll
      // Through - if not sprint1 def sprint 2
      shadowRoot.innerHTML += "<input name='msg' value='cat'>";

      // Add Send button
      const b = document.createElement('button');
      b.innerHTML = "Send";
      shadowRoot.append(b);
      
      b.addEventListener('click', ()=>{
          const msgInput = shadowRoot.querySelector('input');
          const msg = msgInput.getAttribute('value');
          console.log(msg);

          msgInput.setAttribute('value', '');
      });


    }
}

// Register ChatBox class as chat-box element
customElements.define('chat-box', ChatBox);