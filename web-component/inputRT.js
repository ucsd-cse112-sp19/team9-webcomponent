(function(){
    // Dictionary for comparing key presses
    const KEYCODE = {
        ENTER: 13
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
    `;

    class InputRT extends HTMLElement {
        static get observedAttributes(){
            return ['mode'];
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
        _init_mode(mode){
            // TODO: need discussion on if this is the right approach 
            // if we plan on adding more modes then we should 
            // keep switch else a simple if - else might be better
            switch(mode){
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
         * An uninit function so that we can properly replace
         * what was internally set as mode.
         * @param {*} mode the mode to undo
         */
        _uninit_mode(mode){
            switch(mode){
                case 'custom':
                    // Don't do anything on custom because user can implement there 
                    // own thing in the slot as well
                    break;
                case 'textarea':
                    const textarea = this._textSlot.querySelector('textarea');
                    this._textSlot.removeChild(textarea);
                    break;
                case 'sender':
                default:
                    // Set default to input box.
                    const input = this._textSlot.querySelector('input');
                    this._textSlot.removeChild(input);
                    break;
            }
        }

        /**
         * Internal function that helps with setting the event handlers
         * for the mode attribute
         */
        _register_mode(mode){
            switch(mode){
                case 'sender':
                    // TODO: think of a way to refactor to handle more cases
                    // Also perhaps allow user to input

                    // UHHHH?? TODO: figure out why this is a thing essentially
                    // in our test environment the bind expires?????
                    const bound = this.send.bind(this);
                    this._textSlot.addEventListener('keypress',this._onEnter);
                    this._appendSlot.addEventListener('click', bound);
                    break;
                default:
                    break;
            }
        }

        /**
         * Internal function that helps with removing the event handlers
         * for the mode attribute
         */
        _unregister_mode(mode){
            switch(mode){
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

        constructor(){
            super();
            // Bind to this object
            this.append = this.append.bind(this);
            this.send = this.send.bind(this);
            this._onEnter = this._onEnter.bind(this);

            // // Initialize shadowRoot
            // this.attachShadow({mode: 'open'});
            // this.shadowRoot.appendChild(template.content.cloneNode(true));
            
            // // Grab slots for easier use
            // this._messengerSlot = this.shadowRoot.querySelector('slot[name=messenger]');
            // this._textSlot = this.shadowRoot.querySelector('slot[name=text]');
            // this._appendSlot = this.shadowRoot.querySelector('slot[name=append]');

            // // Initialize attributes
            // this._init_mode(this.mode);
        }

        connectedCallback(){
                        // Initialize shadowRoot
                        this.attachShadow({mode: 'open'});
                        this.shadowRoot.appendChild(template.content.cloneNode(true));
                        
                        // Grab slots for easier use
                        this._messengerSlot = this.shadowRoot.querySelector('slot[name=messenger]');
                        this._textSlot = this.shadowRoot.querySelector('slot[name=text]');
                        this._appendSlot = this.shadowRoot.querySelector('slot[name=append]');
            
                        // Initialize attributes
                        this._init_mode(this.mode);

            // Add Event listeners
            this._register_mode(this.mode);
        }

        disconnectedCallback(){
            // Remove Event listeners
            this._unregister_mode(this.mode);
        }

        attributeChangedCallback(name, oldValue, newValue){
            switch(name){
                case('mode'):
                    // this._uninit_mode(oldValue);
                    // this._init_mode(newValue);
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
    customElements.define('input-rt', InputRT);
})();