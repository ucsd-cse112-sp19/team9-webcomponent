/**
 * inputBox class
 * Provides template for input element
 */
class InputBox extends HTMLElement {
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
        this.innerHTML = "";

        // Append to shadowdom style
        // Eventually turn into text area so that we can scroll
        // Through - if not sprint1 def sprint 2
        const i = document.createElement('input');
        i.setAttribute("id","msg");
        i.setAttribute("name","msg");
        i.setAttribute("value","");
        shadowRoot.append(i);

        // Register a listener to trigger on enter.
        i.addEventListener('keypress', (e) => {
            const key = e.which || e.keyCode;
            if(key === 13){
                const msgInput = shadowRoot.querySelector('input');
                //call send function
                const sender = shadowRoot.querySelector('#sender');
                sender.send(msgInput.value);
                msgInput.value = '';
            }
        });
    }
}

// Register ChatBox class as chat-box element
customElements.define('input-box', InputBox);