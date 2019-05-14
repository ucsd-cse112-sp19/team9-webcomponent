/**
 * HelloWorld class
 * Provides template for core-hello element
 */
class ChatStream extends HTMLElement {
    /**
     * get width() 
     * Check if font exists in HTML.
     * Returns: True or False 
     */
    get width() {
        return this.getAttribute('width');
    }

    /**
     * get height() 
     * Check if font exists in HTML.
     * Returns: True or False 
     */
    get height() {
        return this.getAttribute('height');
    }


    /**
     * Constructor for setting up shadow dom and class definitions 
     * for web component.
     */
    constructor () {
      super();
    }

    connectedCallback(){
      // Initialize shadow root
      const shadowRoot = this.attachShadow({mode: 'open'});
      
      // Append to shadowdom style
      // Eventually turn into text area so that we can scroll
      // Through - if not sprint1 def sprint 2
      shadowRoot.innerHTML += this.innerHTML;

      const text = document.createElement('textarea');
      text.setAttribute('id','msg');
      text.setAttribute('rows',this.width);
      text.setAttribute('cols',this.height);
      text.innerHTML = "Your Message will appear here";
      shadowRoot.append(text);


      // Create a Fake update for testing purposes
      const b = document.createElement('button');
      b.innerHTML = "Fake Update";
      shadowRoot.append(b);
      
      b.addEventListener('click', ()=>{
          const box = shadowRoot.querySelector('textarea');
          box.innerHTML += "testing";
          box.scrollTop = box.scrollHeight;

          const receiver = shadowRoot.querySelector('#receiver');
          //receiver.cat("ASDFASFDA");
          receiver.observe(this, this.append);
     
      });
    }
    // FIXME: add that as hack to use set Interval
    append(that, messages){
        const text = that.shadowRoot.querySelector('textarea');
        // TODO: Decide on where we should reconstruct message
        if(messages !== null){
            for(let i = 0; i < messages.length; i++){
                let toAppend = messages[i].user + ': ' + messages[i].body + '\n'; 
                text.innerHTML += toAppend;
                // TODO: We will need a way to allow user scrolling to override this
                text.scrollTop = text.scrollHeight;
            }
        }
    }
}

// Register ChatBox class as chat-box element
customElements.define('chat-stream', ChatStream);