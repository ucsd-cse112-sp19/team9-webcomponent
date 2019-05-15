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


      /////////////////////////////////////////////////////
      var addStyleSheet = function(){
        const linkDiv = document.createElement('link');
        linkDiv.setAttribute('rel','stylesheet');
        linkDiv.setAttribute('type','text/css');
        linkDiv.setAttribute('href','highlight.css');
        shadowRoot.append(linkDiv);
      };
      var addDivs = function(){
        const backdropDiv = document.createElement('div');
        backdropDiv.setAttribute('class','backdrop');
        const highlightsDiv = document.createElement('div');
        highlightsDiv.setAttribute('class','highlights');
        backdropDiv.appendChild(highlightsDiv);
        shadowRoot.append(backdropDiv);
      };
      addStyleSheet();
      addDivs();
      ///////////////////////////////////////////////////


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
        console.log("hi");
          const box = shadowRoot.querySelector('textarea');
          box.scrollTop = box.scrollHeight;
          const receiver = shadowRoot.querySelector('#receiver');
          receiver.observe(this, this.append);

      });

      //this should be changed to that of the current user's username
      let username = "Georgie";

      /* This function adjusts the scroll of the backdrop to match the textarea */
      const adjustScroll = function(){
        const $textarea = shadowRoot.querySelector('textarea');
        const $backdrop = shadowRoot.querySelector('.backdrop');
        $backdrop.scrollTop = $textarea.scrollTop;
        $backdrop.scrollLeft = $textarea.scrollLeft;
      }

      /* This function rehighlights the textarea so that the current user's username is highlighted
         This should be called whenever data is added to the textarea */
      const reHighlight = function(){
        const $textarea = shadowRoot.querySelector('textarea');
        const $highlights = shadowRoot.querySelector('.highlights');
        const regexString = username + ":";
        let rx = new RegExp(regexString,'g');
        $highlights.innerHTML = $textarea.value.replace(/\n$/g,'\n\n').replace(rx,'<mark>$&</mark>');
        adjustScroll();
      }

      shadowRoot.querySelector('textarea').addEventListener('input',()=>{
        reHighlight();
      });

      shadowRoot.querySelector('textarea').addEventListener('scroll',()=>{
        adjustScroll();
      });
    }


    /**
     * Append is a callback function for an observe function
     * that will update the textarea.
     * @param {*} that allows this to be used in setInterval
     * @param {*} messages the messages to be printed
     */
    append(that, messages){
        // FIXME: add that as hack to use set Interval
        const text = that.shadowRoot.querySelector('textarea');
        // TODO: Decide on where we should reconstruct message
        if(messages !== null){
            for(let i = 0; i < messages.length; i++){
                let toAppend = messages[i].user + ': ' + messages[i].message + '\n';
                text.innerHTML += toAppend;
                // TODO: We will need a way to allow user scrolling to override this
                text.scrollTop = text.scrollHeight;
            }
        }
    }
}

// Register ChatBox class as chat-box element
customElements.define('chat-stream', ChatStream);
