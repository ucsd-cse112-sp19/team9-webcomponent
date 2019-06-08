
    /** 
     * @typedef {Integer} KEYCODE
     *  Dictionary for comparing key presses
    */
    const KEYCODE = {
        ENTER: 13
    };

    /**
     * @typedef {HTMLDocument} template
     * @
     * Creates and defines a template for web component
     */
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
        </style>
        <div>
            <slot name="messenger"></slot>
        </div>
        <slot name="text"></slot>
        <slot name="append"></slot>
    `;

    class InputRT extends HTMLElement {

        static get observedAttributes(){
            return [];
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
         * Mode attribute that sets the properties of the input field
         * 
         * @property {String} custom user can implement their own mode in this slot
         * @property {String} textarea create a textarea which will display text
         * @property {String} sender set default to input box
         * 
         * @example this._init_mode();
         */
        _init_mode(){
            switch(this.mode){
                case 'custom':
                    //Do not put anything there
                    break;
                case 'textarea':
                    const textarea = document.createElement('textarea');
                    textarea.setAttribute("slot","text");
                    // TODO: should we have a receiver object as well
                    textarea.setAttribute("readonly","true");
                    this._textSlot.appendChild(textarea);
                    break;
                case 'sender':
                default:
                    // Set default to input box
                    const input = document.createElement('input');
                    input.setAttribute("slot","text");
                    this._textSlot.appendChild(input);
                    break;
            }
        }

        /**
         * Internal function that helps with setting the event handlers for the mode attribute hello
         * 
         * @param {Bool} register if True will add evenListener, else will remove them
         * @property {String} sender add eventListener keypress & click 
         * 
         * @example connectedCallback(){this._register_mode();}
         * 
         * @todo think of a way to refactor to handle more cases
         * @todo perhaps allow user to input
         */
        _register_mode(register){
            switch(this.mode){
                case 'sender':
                    if(register){
                        this._textSlot.addEventListener('keypress',this._onEnter);
                        this._appendSlot.addEventListener('click', this.send);
                    }
                    else{
                        this._textSlot.removeEventListener('keypress',this._onEnter);
                        this._appendSlot.removeEventListener('click', this.send);
                    }
                    break;
                default:
                    break;
            }
        }

        _unregister_mode(){
            switch(this.mode){
                case 'sender':
                    this._textSlot.removeEventListener('keypress',this._onEnter);
                    this._appendSlot.removeEventListener('click', this.send);
                    break;
                default:
                    break;
            }
        }

        /**
         * InputRT Web Component
         *
         * Initialize ShadowRoot, create text slot and bind to object
         *
         * @class InputRT
         *
         * @example <input-rt mode="sender"></input-rt>
         * @example <input-rt mode="sender" url="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                bootstrap="border-primary border"></input-rt>
         * @example <input-rt size="s"></input-rt>
         * @example <input-rt height="200px" width="600px"></input-rt>
         * @example <input-rt password></input-rt>
         * @example <input-rt disable></input-rt>
         */
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
            // Initialize attributes
            this._init_mode();
        }
        connectedCallback(){
            // Add Event listeners
            this._register_mode(True);
        }
        disconnectedCallback(){
            // Remove Event listeners
            this._register_mode(False);
        }
        attributeChangedCallback(){
        }


        /**
         * Public function for sending messages, leverages an internal WC's send functionality
         * @property {String} msgInput query the input
         * @property {Function} send the sender sends the msgInput value
         * 
         * @example case KEYCODE.ENTER: this.send();
         */
        send(){
            const msgInput = this._textSlot.querySelector('input');
            //call send function
            const sender = this.querySelector('#sender');
            //todo: need to find a way the input element and poluate that
            sender.send(msgInput.value);
            msgInput.value = '';
        }


        /**
         * Public function that works as a callback to populate the internal text area with JS if desired
         * @param {String} message text to print out
         * 
         * @example append('Runtime Terror is the best team!')
         */
        append(message){
            //todo: we will need a way to allow user scrolling to override this
            const textarea = this._textSlot.querySelector('textarea');
            textarea.innerHTML += message + "\n";
            textarea.scrollTop = textarea.scrollHeight;
        }
        
        //Internal function that handles an enter press
        _onEnter(event){   
            switch (event.keyCode) {
                case KEYCODE.ENTER:
                    this.send();
                default:
                    break;
            }
        }


    }
    customElements.define('input-rt', InputRT);