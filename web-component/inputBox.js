const SIZES ={
        "l": "width: 500px; height: 50px; font-size: 25px !important; padding: 10px 10px;",
        "m": "width: 400px; height: 40px; font-size: 20px !important; padding: 8px 8px;",
        "d": "width: 300px; height: 30px; font-size: 18px !important;",
        "s": "width: 250px; height: 30px; font-size: 15px !important; padding: 5px 5px;"
    };

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
     * get width() 
     * Check if width exists in HTML.
     * Returns: True or False 
     */
    get width() {
        return this.getAttribute('width');
    }
    /**
     * set width(val) 
     * Sets width if value passed in, or removes it if nothing
     * is passed.
     * Returns: Null
     */
    set width(val) {
        this.settingStringAttribute(val,'width');
    }

    settingStringAttribute(val,attribute) {
        const stringval = String(val);
        if (stringval) {
            this.setAttribute(attribute, val);
        }
        else {
            this.removeAttribute(attribute);
        }
    }

    /**
    * get height() 
    * Check if height exists in HTML.
    * Returns: True or False 
    */
    get height() {
        return this.getAttribute('height');
    }
    /**
     * set height(val) 
     * Sets height if value passed in, or removes it if nothing
     * is passed.
     * Returns: Null
     */
    set height(val) {
        this.settingStringAttribute(val,'height');
    }

    /**
     * get size() 
     * Check if size exists in HTML.
     * Returns: String: size of input 
     */
    get size() {
        return this.getAttribute('size');
    }
    /**
     * set size(val) 
     * Sets size if value passed in, or removes it if nothing
     * is passed.
     * Returns: Null
     */
    set size(val) {
        this.settingStringAttribute(val,'size');
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
        this.settingStringAttribute(val,'bootstrap');
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
        this.settingStringAttribute(val,'url');
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

        // Append to shadowdom style
        // Eventually turn into text area so that we can scroll
        // Through - if not sprint1 def sprint 2
        const l = this.createLink(shadowRoot);
        const i = this.createInput(shadowRoot);

        // Set the attributes href and class if url and boostrap
        this.settingAttributes(l, i); 

        // If disabled, will set a default disabled style
        this.settingDisabledStyle(i, shadowRoot);  

        // size configurations according to size parameters
        let sizeStyle = this.settingSizeStyle(SIZES); 
        shadowRoot.querySelector('link').insertAdjacentElement("beforebegin", sizeStyle)


        // TODO: We need to make a logical filter that can 
        // listen to some sort of backplane that could trigger this
        // from an internal button 
        // Register a listener to trigger on enter.
        this.createEventListener(i, shadowRoot);
    }

    createEventListener(i, shadowRoot) {
        i.addEventListener('keypress', (e) => {
            if (e.key == 13) {
                const msgInput = shadowRoot.querySelector('input');
                //call send function
                var sender = shadowRoot.querySelector('#sender');
                if (sender != null) {
                    sender.send(msgInput.value);
                }
                msgInput.value = '';
            }
        });
    }

    settingSizeStyle(SIZES) {
        let sizeStyle = document.createElement('style');
        if (this.size) {
            sizeStyle.innerHTML += `input {
                ${SIZES[this.size]}
            }`;
        }
        else {
            sizeStyle.innerHTML += `input {
                ${SIZES["d"]}
            }`;
        }
        if (this.width) {
            sizeStyle.innerHTML += `input {
                width: ${this.width} !important; 
            }`;
        }
        if (this.height) {
            sizeStyle.innerHTML += `input {
                height: ${this.height} !important; 
            }`;
        }
        return sizeStyle;
    }

    settingDisabledStyle(i, shadowRoot) {
        if (this.disabled) {
            let disabledStyle = document.createElement('style');
            disabledStyle.innerHTML += `input {
                opacity: 0.5!important;
                cursor: not-allowed;
                background-color: #ccc;
            }`;
            i.setAttribute('disabled', true);
            shadowRoot.querySelector('link').insertAdjacentElement("beforebegin", disabledStyle);
        }
    }

    settingAttributes(l, i) {
        if (this.url && this.bootstrap) {
            l.setAttribute('href', this.url);
            i.setAttribute('class', this.bootstrap);
        }
        else {
            l.setAttribute('href', 'inputbox-default-style.css');
        }
    }

    createInput(shadowRoot) {
        const i = document.createElement('input');
        i.setAttribute("id", "msg");
        i.setAttribute("name", "msg");
        i.setAttribute("value", "");
        shadowRoot.append(i);
        return i;
    }

    createLink(shadowRoot) {
        const l = document.createElement('link');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('type', 'text/css');
        shadowRoot.appendChild(l);
        return l;
    }
}

// Register ChatBox class as chat-box element
customElements.define('input-box', InputBox);

