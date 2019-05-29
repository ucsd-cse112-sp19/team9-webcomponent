(function(){
    const KEYCODE = {
        ENTER: 13
    };

    const template = document.createElement('template');

    // TODO: will the above be necessary
    // I think we don't want to use slots for the input and 
    // text div?
    template.innerHTML = `
        <style>
        </style>
        <slot name="messenger"></slot>
        <slot name="text"></slot>
        <slot name="append"></slot>
    `;

    class inputRT extends HTMLElement {
        static get observedAttributes(){
            return [];
        }

        get mode() {
            return this.getAttribute('mode');
        }

        constructor(){
            super();
            this._append = this._append.bind(this);
            this._send = this._send.bind(this);
            this._onEnter = this._onEnter.bind(this);

            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            
            // Do I determine type here or in connectedCallback?
            // Potential types: input, textarea, sender, receiver
            this._messengerSlot = this.shadowRoot.querySelector('slot[name=messenger]');
            this._textSlot = this.shadowRoot.querySelector('slot[name=text]');
            this._appendSlot = this.shadowRoot.querySelector('slot[name=append]');

        }

        connectedCallback(){
            // Add Event listeners
            switch(this.mode){
                case 'sender':
                    // TODO: think of a way to refactor to handle more cases
                    // Also perhaps allow user to input
                    this._textSlot.addEventListener('keypress',this._onEnter);
                    //this._appendSlot.addEventListener('onclick', this._send);
                case 'input':
                    const input = document.createElement('input');
                    input.setAttribute("slot","text");
                    this._textSlot.append(input);
                    break;
    
                case 'receiver':
                    // Remove inner from shadowroot and query publicly?
                case 'textarea':
                    const textarea = document.createElement('textarea');
                    textarea.setAttribute("slot","text");
                    textarea.setAttribute("readonly","true");
                    this._textSlot.append(textarea);
                    break;


                default:
                    break;
            }
        }

        disconnectedCallback(){
            // Remove Event listeners
        }

        _send(){
            const msgInput = this._textSlot.querySelector('input');
            //call send function
            const sender = this.querySelector('#sender');
            // TODO: need to find a way the input element and poluate that
            sender.send(msgInput.value);
            msgInput.value = '';
        }

        _append(message){
            const text = this._textSlot.querySelector('textarea');
            text.innerHTML += message + "\n";
            // TODO: We will need a way to allow user scrolling to override this
            text.scrollTop = text.scrollHeight;
        }

        _onEnter(event){
            // Might be better to just have an if?
            switch (event.keyCode) {
                case KEYCODE.ENTER:
                    this._send();
                default:
                    return;
            }
        }
    }
    customElements.define('input-rt', inputRT);
})();