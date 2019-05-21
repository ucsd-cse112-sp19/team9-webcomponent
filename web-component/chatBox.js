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
    return this.getAttribute('bootstrap');
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

      shadowRoot.innerHTML += this.innerHTML;
      this.innerHTML = ''; 
      

      const l = document.createElement('link');
      l.setAttribute('rel', 'stylesheet');
      l.setAttribute('type', 'text/css');
      shadowRoot.appendChild(l);


      const i = document.createElement('input');
      i.setAttribute("id","msg");
      i.setAttribute("name","msg");
      i.setAttribute("value","");


      shadowRoot.append(i);
      const b = document.createElement('button');
      b.innerHTML = "Send";
      shadowRoot.append(b);

      if (this.bootstrap) {
      
        console.log(this.bootstrap);
        console.log("bootstrap")

        i.setAttribute('class', this.bootstrap);
        l.setAttribute('href', './bootstrap.min.css');

      } else {
        l.setAttribute('href', 'chatbox-default-style.css');
      } 

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