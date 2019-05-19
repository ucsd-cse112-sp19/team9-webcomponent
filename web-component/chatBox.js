/**
 * HelloWorld class
 * Provides template for core-hello element
 */
class ChatBox extends HTMLElement {

  /**
   * get bootstrap() 
   * Check if bootstrap exists in HTML.
   * Returns: True or False 
   */
  get bootstrap() {
    return this.hasAttribute('bootstrap');
  }
  /**
   * set bootstrap(val) 
   * Sets bootstrap if value passed in, or removes it if nothing
   * is passed.
   * Returns: Null
   */
  set bootstrap(val) {
    if (val !== '') {
      this.setAttribute('bootstrap', val);
    } else {
      this.removeAttribute('bootstrap');
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

      if (this.boostrap) {
        let boostrapStyles = 
        `<link rel="stylesheet" type="text/css" href="./bootstrap.min.css"></link>`;
      }
      
      let defaultStyle = `<link rel="stylesheet" type="text/css" href="chatbox-default-style.css"></link>`;
      shadowRoot.innerHTML += defaultStyle;

      
      shadowRoot.innerHTML += this.innerHTML;
      this.innerHTML = ''; 
      

      // Append to shadowdom style
      // Eventually turn into text area so that we can scroll
      // Through - if not sprint1 def sprint 2
      const i = document.createElement('input');
      i.setAttribute("id","msg");
      i.setAttribute("name","msg");
      i.setAttribute("value","");
      shadowRoot.append(i);
      // Add Send button
      const b = document.createElement('button');
      b.innerHTML = "Send";
      shadowRoot.append(b);
      
      i.addEventListener('keypress', (e) => {
        let key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
          console.log("entered before clicking");
          b.click();
        }
      });

      b.addEventListener('click', () => {
          const msgInput = shadowRoot.querySelector('input');
          //call send function
          const sender = shadowRoot.querySelector('#sender');
          sender.send(msgInput.value);

          msgInput.value = '';

      });

      const defaultScript = document.createElement('script'); 
      defaultScript.setAttribute('src', './chatbox-default-script.js');
      shadowRoot.appendChild(defaultScript); 


      
    }
}

// Register ChatBox class as chat-box element
customElements.define('chat-box', ChatBox);