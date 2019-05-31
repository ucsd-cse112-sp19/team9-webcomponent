/**
 * OutputStream class
 * Provides template for output element
 */
class OutputStream extends HTMLElement {
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

    /**
     * connectedCallback is called when the web component is loaded into
     * the site.
     */
    connectedCallback(){
        // Initialize shadow root
        const shadowRoot = this.attachShadow({mode: 'open'});

        // Append to shadowdom style
        // Eventually turn into text area so that we can scroll
        // Through - if not sprint1 def sprint 2
        shadowRoot.innerHTML += this.innerHTML;
        this.innerHTML = "";

        const text = document.createElement('textarea');
        text.setAttribute('id','msg');
        text.setAttribute('rows',this.width);
        text.setAttribute('cols',this.height);
        shadowRoot.append(text);

        const onloaded = function(){
            const receiver = this.shadowRoot.querySelector('#receiver');
            if(receiver !== null){
                const append = this.append.bind(this);
                receiver.observe(append);
            }
        }.bind(this);

        setTimeout(onloaded);
    }

    /**
     * Append is a callback function for an observe function
     * that will update the textarea.
     * @param {*} messages the messages to be printed
     * TODO Maybe: Allow append to take in an array or a single message
     */
    append(message){
        const text = this.shadowRoot.querySelector('textarea');
        text.innerHTML += message + "\n";
        // TODO: We will need a way to allow user scrolling to override this
        text.scrollTop = text.scrollHeight;
    }

}

// Register OutputStream class as output-stream element
customElements.define('output-stream', OutputStream);

module.exports = { OutputStream };
