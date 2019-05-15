/**
 * HelloWorld class
 * Provides template for core-hello element
 */
class MsgFetch extends HTMLElement {
    /**
     * get rainbow() 
     * Check if rainbow exists in HTML.
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
    
      //eventually may want to try this approach: https://ayushgp.github.io/html-web-components-using-vanilla-js-part-3/
      this.userId = "anonymous";
      this.msgId = -1;
    }

    connectedCallback(){
      // Initialize shadow root
      const shadowRoot = this.attachShadow({mode: 'open'});
      
 
      // Append to shadowdom style
      // Eventually turn into text area so that we can scroll
      // Through - if not sprint1 def sprint 2
      const i = document.createElement('input');
      i.setAttribute("id","userId");
      i.setAttribute("name","userId");
      i.setAttribute("value","anonymous");
      shadowRoot.append(i);


      // Listen for userId Change
      i.addEventListener('change', ()=>{
        this.userId = shadowRoot.querySelector('input').value;
      });
    }

    deconstructMessage(messages){
        // TODO: eventually check time stamp against last received?
        let ret = [];
        for(let i = 0; i < messages.length; i++){
          if(messages[i].body !== ''){
            const item = {user:messages[i].sender,message:messages[i].body};
            ret.push(item)
          }
        }
        return ret
    }

    observe(that, callback){
        const they = this;
        const autoupdate = setInterval(function(){
            let http = new XMLHttpRequest();
            let url = they.url + '/' + they.msgId;
    
            http.open("GET", url, true); // true for asynchronous 
    
            http.onreadystatechange = function() { 
                if (http.readyState == 4 && http.status == 200){
                    const parsed = JSON.parse(http.responseText);
                    
                    they.msgId = parsed["msgId"];
 
                    const msgs = they.deconstructMessage(parsed["msgs"]);
                    callback(that,msgs);
                }
            }
          
          
            http.send(null);
        }, 1000);
        
    }
}

// Register ChatBox class as chat-box element
customElements.define('msg-fetch', MsgFetch);