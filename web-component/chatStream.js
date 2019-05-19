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

      let defaultStyle = `<link rel="stylesheet" type="text/css" href="chatstream-default-style.css"></link>`;
      shadowRoot.innerHTML += defaultStyle;

      shadowRoot.innerHTML += this.innerHTML;
      this.innerHTML = "";

      const addStyleSheet = function(){
        const linkDiv = document.createElement('link');
        linkDiv.setAttribute('rel','stylesheet');
        linkDiv.setAttribute('type','text/css');
        linkDiv.setAttribute('href','highlight.css');
        shadowRoot.append(linkDiv);
      };
      const addDivs = function(){
        const backdropDiv = document.createElement('div');
        backdropDiv.setAttribute('class','backdrop');
        const highlightsDiv = document.createElement('div');
        highlightsDiv.setAttribute('class','highlights');
        
        backdropDiv.appendChild(highlightsDiv);
        shadowRoot.append(backdropDiv);
      };
      addStyleSheet();
      addDivs();

      const text = document.createElement('textarea');
      text.setAttribute('id','msg');
      text.setAttribute('rows',this.width);
      text.setAttribute('cols',this.height);
      text.setAttribute('readonly', '');
      shadowRoot.append(text);

      const that = this;
      setTimeout(function(){
        const receiver = shadowRoot.querySelector('#receiver');
        //receiver.observe(this, this.append);
        receiver.observe(that,that.append);
      },1000);
      
      // This function adjusts the scroll of the backdrop to match the textarea
      // Create a Fake update for testing purposes
      const b = document.createElement('button');
      b.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="redo-alt" class="svg-inline--fa fa-redo-alt fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z" /></svg>`; 
      b.setAttribute('id', 'refreshButton');

      shadowRoot.append(b);

      b.addEventListener('click', () => {
          const box = shadowRoot.querySelector('textarea');
          box.scrollTop = box.scrollHeight;
          const receiver = shadowRoot.querySelector('#receiver');
          receiver.observe(this, this.append);
      });


      /* This function adjusts the scroll of the backdrop to match the textarea */
      this.adjustScroll = function(){
        const $textarea = shadowRoot.querySelector('textarea');
        const $backdrop = shadowRoot.querySelector('.backdrop');
        $backdrop.scrollTop = $textarea.scrollTop;
        $backdrop.scrollLeft = $textarea.scrollLeft;
      }
      
      // This function rehighlights the textarea so that the current user's username is highlighted
      // This should be called whenever data is added to the textarea
      this.highlight = function(){
        // TODO: Change highlight when the user id changes as well
        const $textarea = shadowRoot.querySelector('textarea');
        const $highlights = shadowRoot.querySelector('.highlights');
        const receiver = shadowRoot.querySelector('#receiver');
        
        const regexString = receiver.userId;
        let rx = new RegExp(regexString,'g');
        $highlights.innerHTML = $textarea.value.replace(/\n$/g,'\n\n').replace(rx,'<mark>$&</mark>');
        this.adjustScroll();
      }

      shadowRoot.querySelector('textarea').addEventListener('scroll',()=>{
        this.adjustScroll();
      });

      const defaultScript = document.createElement('script');
      defaultScript.setAttribute('src', './chatstream-default-script.js');
      shadowRoot.appendChild(defaultScript); 
    }

    /**
     * Append is a callback function for an observe function
     * that will update the textarea.
     * @param {*} that allows this to be used in setInterval
     * @param {*} messages the messages to be printed
     * TODO: Allow append to take in an array or a single message
     */
    append(that,message){
        const text = that.shadowRoot.querySelector('textarea');
        text.innerHTML += message + "\n";
        // TODO: We will need a way to allow user scrolling to override this
        text.scrollTop = text.scrollHeight;
        that.highlight();
    }

    // append(that, messages){
    //     // FIXME: add that as hack to use set Interval
    //     const text = that.shadowRoot.querySelector('textarea');
    //     // TODO: Decide on where we should reconstruct message
    //     if(messages !== null){
    //         for(let i = 0; i < messages.length; i++){
    //             let toAppend = messages[i].user + ': ' + messages[i].message + '\n';
    //             text.innerHTML += toAppend;
    //             // TODO: We will need a way to allow user scrolling to override this
    //             text.scrollTop = text.scrollHeight;
    //             that.highlight();
    //         }
    //     }
    // }
}

// Register ChatBox class as chat-box element
customElements.define('chat-stream', ChatStream);
