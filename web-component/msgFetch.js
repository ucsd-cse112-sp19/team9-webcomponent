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
        console.log(this.userId);
      });
    }

    deconstructMessage(message){
        // TODO: eventually check time stamp against last received?
        if(message.body !== ''){
            return {user:message.sender,message:message.body};
        }
        return null
    }

    observe(that, callback){
        // let http = new XMLHttpRequest();
        // let url = this.url + '/' + this.msgId;

        // http.open("GET", url, true); // true for asynchronous 

        // http.onreadystatechange = function() { 
        //     if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        //         console.log(http.responseText);
        //         const parsed = JSON.parse(http.responseText);
        //         const msg = this.deconstructMessage(parsed);
        //         this.msgId = parsed.msgId;
        //         callback(msg);
        //     }
        // }
        console.log("hello");
        const autoupdate = setInterval(function(){
            //http.send(null);
            const testMessage =                
                [
                    { 
                        sender: "tester",
                        timestamp: 14,
                        body: "Hello!",
                        hash:"TBD"
                    }, 
                    {
                        sender: "user",
                        timestamp: 11,
                        body: "Bye!",
                        hash:"TBD"
                    }
                ];
            
            callback(that, [{user:testMessage[0].sender,body:testMessage[0].body},{user:testMessage[1].sender,body:testMessage[1].body} ]);
        }, 1000);
        
    }
}

// Register ChatBox class as chat-box element
customElements.define('msg-fetch', MsgFetch);