//function allows keycode and template to only be accessed by inputRT
(function(){
    // Dictionary for comparing key presses
    const KEYCODE = {
        ENTER: 13
    };

    const SIZES = {
        input: {
            "l": "width: 500px; height: 50px; font-size: 25px !important; padding: 10px 10px;",
            "m": "width: 400px; height: 40px; font-size: 20px !important; padding: 8px 8px;",
            "d": "width: 300px; height: 30px; font-size: 12px !important;",
            "s": "width: 250px; height: 30px; font-size: 12px !important; padding: 5px 5px;"
        }, 
        textarea: {
            "l": "width: 500px; height: 800px; font-size: 25px !important; padding: 10px 10px;",
            "m": "width: 400px; height: 600px; font-size: 20px !important; padding: 8px 8px;",
            "d": "width: 300px; height: 100px; font-size: 12px !important;",
            "s": "width: 250px; height: 75px; font-size: 10px !important; padding: 5px 5px;",
        }
    };

    // Create and define a template for WC
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
        </style>
        <div>
            <slot name="messenger"></slot>
        </div>
        <slot name="text"></slot>
        <slot name="append"></slot>
        <slot name="link"></slot>
    `;

    class inputRT extends HTMLElement {
        static get observedAttributes(){
            return ['disabled'];
        }

        get mode() {
            return this.getAttribute('mode');
        }

        set mode(val) {
            if (val !== '') {
                this.setAttribute('mode', val);
              } else {
                this.removeAttribute('mode');
            }
        }

        /**
         * Init function that generates the internal value based on 
         * the mode being set.
         */
        _init_mode(){
            // TODO: need discussion on if this is the right approach 
            // if we plan on adding more modes then we should 
            // keep switch else a simple if - else might be better
            switch(this.mode){
                case 'custom':
                    // Don't do anything on custom because user can implement there 
                    // own thing in the slot as well
                    break;
                case 'textarea':
                    const textarea = document.createElement('textarea');
                    textarea.setAttribute("slot","text");
                    // TODO: should we have a receiveer object as well
                    textarea.setAttribute("readonly","true");
                    this._textSlot.appendChild(textarea);
                    break;
                case 'sender':
                default:
                    // Set default to input box.
                    const input = document.createElement('input');
                    input.setAttribute("slot","text");
                    this._textSlot.appendChild(input);
                    break;
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

        _init_bootstrap_URL(){
            const link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            if (this.url && this.bootstrap) {
                link.setAttribute('href', this.url);
                const el = this._choose_element(this.mode); 
                this._textSlot.querySelector(el).setAttribute('class', this.bootstrap);
            } else {
                link.setAttribute('href', 'inputbox-rt-default-style.css');
            } 
            this._linkSlot.appendChild(link);
        }

        /**
         * get password() 
         * Check if password exists in HTML.
         * Returns: True or False 
         */
        get password() {
            return this.hasAttribute('password');
        }
        /**
         * set password(val) 
         * Sets password if value passed in, or removes it if nothing
         * is passed.
         * Returns: Null
         */
        set password(val) {
            const isPassword = Boolean(val);
            if (isPassword) {
                this.setAttribute('password', val);
            } else {
                this.removeAttribute('password');
            }
        }

        /**
         * Initializes this element to be of type password only if the element in concern is input
         */
        _init_password(){
            if (this.password) {
                const el = this._choose_element(this.mode);  
                if(el && el === "input") {
                    this._textSlot.querySelector('input').setAttribute('type', "password");
                }
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
            const isWidth = String(val);
            if (isWidth) {
                this.setAttribute('width', val);
            } else {
                this.removeAttribute('width');
            }
        }

        _init_width(){
            if (this.width) {
                const el = this._choose_element(this.mode);
                const sizeStyle = `${el} {
                    width: ${this.width} !important; 
                }`;
                this.shadowRoot.querySelector('style').innerHTML += sizeStyle;
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
            const isHeight = String(val);
            if (isHeight) {
                this.setAttribute('height', val);
            } else {
                this.removeAttribute('height');
            }
        }

        _init_height() {
            if (this.height) {
                const el = this._choose_element(this.mode);
                const sizeStyle = `${el} {
                    height: ${this.height} !important; 
                }`;
                this.shadowRoot.querySelector('style').innerHTML += sizeStyle;
            }
        }

        /**
         * get size() 
         * Check if size exists in HTML.
         * Returns: True or False 
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
            const isSize = String(val);
            if (isSize) {
                this.setAttribute('size', val);
            } else {
                this.removeAttribute('size');
            }
        }


        /**
         * Initializes size if specificed, and chooses default if not. 
         */
        _init_size() {
            let size = "d"; 
            if (this.size && ! this.width && ! this.height) {
                size = this.size; 
            }
            const el = this._choose_element(this.mode);
            const sizeStyle = `${el} { 
                    ${SIZES[el][size]}
            }`;
            this.shadowRoot.querySelector('style').innerHTML += sizeStyle;
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

        _init_disabled(){
            if(this.disabled){
                const el = this._choose_element(this.mode);
                const disabledStyle = `${el} {
                    opacity: 0.5!important;
                    cursor: not-allowed;
                    background-color: #ccc;
                }`; 
                this.shadowRoot.querySelector('style').innerHTML += disabledStyle;
                this._textSlot.querySelector(el).setAttribute('disabled', '');
            }      
        }

        /**
         * Internal function that helps with setting the event handlers
         * for the mode attribute
         */
        _register_mode(){
            switch(this.mode){
                case 'sender':
                    // TODO: think of a way to refactor to handle more cases
                    // Also perhaps allow user to input
                    this._textSlot.addEventListener('keypress',this._onEnter);
                    this._appendSlot.addEventListener('click', this.send);
                    break;
                default:
                    break;
            }
        }

        /**
         * Internal function that helps with removing the event handlers
         * for the mode attribute
         */
        _unregister_mode(){
            switch(this.mode){
                case 'sender':
                    // TODO: think of a way to refactor to handle more cases
                    // Also perhaps allow user to input
                    this._textSlot.removeEventListener('keypress',this._onEnter);
                    this._appendSlot.removeEventListener('click', this.send);
                    break;
                default:
                    break;
            }
        }

        /**
         * Internal function to determine the correct element in concern. 
         * @param {*} mode 
         * @returns {string} an html element in concern
         */
        _choose_element(mode) {
            let retVal = "";
            switch (mode) {
                case "custom":
                    break; 
                case "textarea":
                    retVal = "textarea"; 
                    break; 
                case 'sender':
                default:
                    retVal = "input"; 
                    break;
            }
            return retVal; 
        }

        constructor(){
            super();
            // Bind to this object
            this.append = this.append.bind(this);
            this.send = this.send.bind(this);
            this._onEnter = this._onEnter.bind(this);

            // Initialize shadowRoot
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            
            // Grab slots for easier use
            this._messengerSlot = this.shadowRoot.querySelector('slot[name=messenger]');
            this._textSlot = this.shadowRoot.querySelector('slot[name=text]');
            this._appendSlot = this.shadowRoot.querySelector('slot[name=append]');
            this._linkSlot = this.shadowRoot.querySelector('slot[name=link]');

            // Initialize attributes
            this._init_mode();
            this._init_disabled();
            this._init_bootstrap_URL();
            this._init_password();
            this._init_width();
            this._init_height();
            this._init_size();
        }

        connectedCallback(){
            // Add Event listeners
            this._register_mode();
        }

        disconnectedCallback(){
            // Remove Event listeners
            this._unregister_mode();
        }

        attributeChangedCallback(name, oldVal, newVal){
            switch (name) {
                case 'disabled':
                    this._init_disabled();
                    break;
                default: 
                    break; 
            } 
        }

        /**
         * public function for sending messages, leverages an internal WC's 
         * send functionality. 
         */
        send(){
            const msgInput = this._textSlot.querySelector('input');
            //call send function
            const sender = this.querySelector('#sender');
            // TODO: need to find a way the input element and poluate that
            sender.send(msgInput.value);
            msgInput.value = '';
        }

        /**
         * public function that works as a callback to populate the internal 
         * text area with JS if desired
         * @param {*} message thing to print out
         */
        append(message){
            const textarea = this._textSlot.querySelector('textarea');
            textarea.innerHTML += message + "\n";
            // TODO: We will need a way to allow user scrolling to override this
            textarea.scrollTop = textarea.scrollHeight;
        }
        
        /**
         * Internal function that handles an enter press
         * @param {*} event the keypress to check against
         */
        _onEnter(event){
            // Might be better to just have an if?
            switch (event.keyCode) {
                case KEYCODE.ENTER:
                    this.send();
                default:
                    break;
            }
        }
    }
    customElements.define('input-rt', inputRT);
})();