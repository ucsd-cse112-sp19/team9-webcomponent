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
  
    }
    
    connectedCallback() {
      // Initialize shadowroot
      const shadowRoot = this.attachShadow({mode: 'open'});
      // Append to shadowdom style
      // Eventually turn into text area so that we can scroll
      // Through - if not sprint1 def sprint 2
      // console.log(this.innerHTML);

      shadowRoot.innerHTML += this.innerHTML;

      const i = document.createElement('input');
      i.setAttribute("id","msg");
      i.setAttribute("name","msg");
      i.setAttribute("value","");
      shadowRoot.append(i);
      // Add Send button
      const b = document.createElement('button');
      b.innerHTML = "Send";
      shadowRoot.append(b);
      
      b.addEventListener('click', ()=>{
          const msgInput = shadowRoot.querySelector('input');
          
          console.log(msgInput.value);
          //call send function
          const sender = shadowRoot.querySelector('#sender');
          sender.send(msgInput.value);

          msgInput.value = '';

      });
    }
}

// Register ChatBox class as chat-box element
customElements.define('chat-box', ChatBox);