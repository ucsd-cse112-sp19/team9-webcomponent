/**
 * HelloWorld class
 * Provides template for core-hello element
 */
class ChatBox extends HTMLElement {
    /**
     * Constructor for setting up shadow dom and class definitions 
     * for web component.
     */

     /**
     * get defaultstyle() 
     * Check if defaultstyle exists in HTML.
     * Returns: True or False 
     */
    get defaultstyle() {
      return this.hasAttribute('defaultstyle');
    }
    /**
     * set defaultstyle(val) 
     * Sets defaultstyle if value passed in, or removes it if nothing
     * is passed.
     * Returns: Null
     */
    set defaultstyle(val) {
      if (val !== '') {
        this.setAttribute('defaultstyle', '');
      } else {
        this.removeAttribute('defaultstyle');
      }
    }
    
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
      if (this.defaultstyle) {
        let style = `<link rel="stylesheet" type="text/css" href="chatbox-defaultstyle.css"></link>`;
        shadowRoot.innerHTML += style;
      }
      shadowRoot.innerHTML += this.innerHTML;
      this.innerHTML = ''; 
      

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