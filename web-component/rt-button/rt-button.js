(function () {
/**
 * inputBox class
 * Provides template for input element
 */
class RtButton extends HTMLElement {

    
    static get observedAttributes() {
        return ['disabled'];
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


    /*
    *set bootstrap(val) 
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
         * get bootstrap() 
         * Check if bootstrap exists in HTML.
         * Returns: True or False 
         */
    get bootstrap() {
        return this.getAttribute('bootstrap');

    }
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

    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: 'open' });

        const SIZES = {
            "l": "width: 50px; height: 50px; font-size: 25px !important; padding: 10px 10px;",
            "m": "width: 40px; height: 40px; font-size: 20px !important; padding: 8px 8px;",
            "d": "width: 30px; height: 30px; font-size: 18px !important;",
            "s": "width: 25px; height: 30px; font-size: 15px !important; padding: 5px 5px;"
        };

        const l = document.createElement('link');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('type', 'text/css');
        shadowRoot.appendChild(l);

        const b = document.createElement('button');
        b.innerHTML = this.innerHTML;
        shadowRoot.append(b);

        if (this.url && this.bootstrap) {
            l.setAttribute('href', this.url);
            i.setAttribute('class', this.bootstrap);

        } else {
            l.setAttribute('href', 'inputbox-default-style.css');
        }
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (this.disabled) {
            let disabledStyle = document.createElement('style');
            disabledStyle.innerHTML += `input {
                opacity: 0.5!important;
                cursor: not-allowed;
                background-color: #ccc;
            }`;
            this.shadowRoot.querySelector("button").setAttribute('disabled', true)
            this.shadowRoot.querySelector('link').insertAdjacentElement("beforebegin", disabledStyle)
        }

    }

}





// Register ChatBox class as chat-box element
window.customElements.define('rt-button', RtButton);

})();