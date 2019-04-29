
/**
 * HelloWorld class
 * Provides template for core-hello element
 */
class HelloWorld extends HTMLElement {
    /**
     * get rainbow() 
     * Check if rainbow exists in HTML.
     * Returns: True or False 
     */
    get rainbow() {
      return this.hasAttribute('rainbow');
    }
    /**
     * set rainbow(val) 
     * Sets rainbow if value passed in, or removes it if nothing
     * is passed.
     * Returns: Null
     */
    set rainbow(val) {
      if (val !== '') {
        this.setAttribute('rainbow', '');
      } else {
        this.removeAttribute('rainbow');
      }
    }
    /**
     * get lang() 
     * Check if langauge exists in HTML.
     * Returns: True or False 
     */
    get lang() {
      return this.getAttribute('lang');
    }
    /**
     * set lang(val) 
     * Sets lang to value passed in, or removes it if nothing
     * is passed.
     * Returns: Null
     */
    set lang(val) {
      if (val !== '') {
        this.setAttribute('lang', val);
      } else {
        this.removeAttribute('lang');
      }
    }
    /**
     * get font() 
     * Check if font exists in HTML.
     * Returns: True or False 
     */
    get font() {
      return this.getAttribute('font');
    }
    /**
     * set font(val) 
     * Sets font to value passed in, or removes it if nothing
     * is passed.
     * Returns: Null
     */
    set font(val) {
      if (val !== '') {
        this.setAttribute('font', val);
      } else {
        this.removeAttribute('font');
      }
    }
    /**
     * get fontsize() 
     * Check if fontsize exists in HTML.
     * Returns: True or False 
     */
    get fontsize() {
      return this.getAttribute('fontsize');
    }
    /**
     * set fontsize(val) 
     * Sets fontsize to value passed in, or removes it if nothing
     * is passed.
     * Returns: Null
     */
    set fontsize(val) {
      if (val !== '') {
        this.setAttribute('fontsize', val);
      } else {
        this.removeAttribute('fontsize');
      }
    }
    /**
     * Constructor for setting up shadow dom and class definitions 
     * for web component.
     */
    constructor () {
      super();
      // Dictionary for Hello World in different languages
      let languages = { "en": "Hello World",
                        "ar": "مرحبا بالعالم",
                        "es": "Hola Mundo",
                        "fr": "Bonjour le monde"};

      // Initialize shadow root
      const shadowRoot = this.attachShadow({mode: 'open'});
      
      // Check if rainbow is set and if it is append the css file to shadow dom
      if(this.rainbow) {
        let style = "<link rel=\"stylesheet\" type=\"text/css\" href=\"Rainbow.css\"></link>";
        shadowRoot.innerHTML += style;
      }

      // Determine and filter the right language for Hello world, defaults to English
      let hello = "Hello World";
      if(this.lang) {
        hello = languages[this.lang];
      }

      // Determine font
      let font = ""
      if(this.font) {
        font = "font-family:" + this.font + ";";
      }
      // Determine font size
      let size = ""
      if(this.fontsize) {
        size =  "font-size:" + this.fontsize + "px;";
      }
      // Append to shadowdom style
      shadowRoot.innerHTML += "<style>  p{" + size  + font +  "} </style>";

      // Create p element
      let p = document.createElement('p');
      // Generate proper version of hello world
      p.innerHTML += "<span> " + hello + " " + this.innerHTML + "</span>";
      // Append p to shadow dom
      shadowRoot.appendChild(p);
    }
}

// Register HelloWorld class as core-hello element
customElements.define('core-hello', HelloWorld);
