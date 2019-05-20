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
      

      const i = document.createElement('input');
      i.setAttribute("id","msg");
      i.setAttribute("name","msg");
      i.setAttribute("value","");


      shadowRoot.append(i);
      const b = document.createElement('button');
      b.innerHTML = "Send";
      shadowRoot.append(b);

      // listen to enter press
      i.addEventListener('keypress', (e) => {
        let key = e.which || e.keyCode;
        if (key === 13) {
          console.log("entered before clicking");
          b.click();
        }
      });

      // listen to button click 
      b.addEventListener('click', () => {
          const msgInput = shadowRoot.querySelector('input');
          const sender = shadowRoot.querySelector('#sender');
          //call send function
          sender.send(msgInput.value);
          msgInput.value = '';

      });

    }
}

// Register ChatBox class as chat-box element
customElements.define('chat-box', ChatBox);