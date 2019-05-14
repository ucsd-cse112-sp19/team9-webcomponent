/**
 * HelloWorld class
 * Provides template for core-hello element
 */
class ChatBox extends HTMLElement {
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