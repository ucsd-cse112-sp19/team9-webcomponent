/**
 * inputBox class
 * Provides template for input element
 */
class InputBox extends HTMLElement {



    /**
     * get disabled() 
     * Check if disabled exists in HTML.
     * Returns: True or False 
     */
    get disabled() {
        return this.hasAttribute('disabled');
    }
    /**
     * set disabled(val) 
     * Sets disabled if value passed in, or removes it if nothing
     * is passed.
     * Returns: Null
     */
    set disabled(val) {
        const isDisabled = Boolean(val);
        if (isDisabled) {
            this.setAttribute('disabled', val);
        } else {
            this.removeAttribute('disabled');
        }
    }

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
     * get url() 
     * Check if url exists in HTML.
     * Returns: True or False 
     */
    get url() {
        return this.getAttribute('url');
    }
    /**
     * set url(val) 
     * Sets url if value passed in, or removes it if nothing
     * is passed.
     * Returns: Null
     */
    set url(val) {
        if (val !== '') {
            this.setAttribute('url', val);
        } else {
            this.removeAttribute('url');
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
        this.innerHTML = "";

        const l = document.createElement('link');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('type', 'text/css');
        shadowRoot.appendChild(l);

        // Append to shadowdom style
        // Eventually turn into text area so that we can scroll
        // Through - if not sprint1 def sprint 2
        const i = document.createElement('input');
        i.setAttribute("id","msg");
        i.setAttribute("name","msg");
        i.setAttribute("value","");
        shadowRoot.append(i);

        if (this.url && this.bootstrap) {
            l.setAttribute('href', this.url);
            i.setAttribute('class', this.bootstrap);
            
        } else {
            l.setAttribute('href', 'inputbox-default-style.css');
        } 

        if (this.disabled) {
            let disabledStyle = document.createElement('style'); 
            disabledStyle.innerHTML += `input {
                opacity: 0.5!important;
                cursor: not-allowed;
                background-color: #ccc;
            }`; 
            i.setAttribute('disabled', true)
           
            console.log(shadowRoot.querySelector('link'));
            shadowRoot.querySelector('link').insertAdjacentElement("beforebegin", disabledStyle)
        }  
        // TODO: We need to make a logical filter that can 
        // listen to some sort of backplane that could trigger this
        // from an internal button 
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