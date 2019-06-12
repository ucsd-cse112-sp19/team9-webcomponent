/**
 * HelloWorld class
 * Provides template for core-hello element
 */
class CoreHello extends HTMLElement {
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
        this.setAttributes(val,'rainbow')
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
        this.setAttributes(val,'lang')
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
        this.setAttributes(val,'font')
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
        this.setAttributes(val,'fontsize')
    }

    setAttributes(val,attribute) {
        if (String(val)!=='') {
            this.setAttribute(attribute, val);
        }
        else {
            this.removeAttribute(attribute);
        }
    }
    /**
    * Constructor for setting up shadow dom and class definitions 
    * for web component.
    */
  constructor () {
      super();
    
      // Dictionary for Hello World in different languages
      let languages = this.setLanguages();

      // Initialize shadow root
      const shadowRoot = this.attachShadow({mode: 'open'});
    
      // Check if rainbow is set and if it is append the css file to shadow dom
      if(this.rainbow) {
          this.setStyle(shadowRoot);
      }

      let { size, font, hello } = this.settingSizeFontHello(languages);
      // Append to shadowdom style
      shadowRoot.innerHTML += "<style>  p{" + size  + font +  "} </style>";

      // Create p element
      let p = document.createElement('p');
      // Generate proper version of hello world
      p.innerHTML += "<span>" + hello + " " + this.innerHTML + "</span>";
      // Append p to shadow dom
      shadowRoot.appendChild(p);

      // For fun, user can customize language through buttons

      // For each language code, add a button to shadowROM
      Object.keys(languages).forEach( (e)=> {
          this.createLangButtons(e, shadowRoot);
      });

      // Attach click event to all buttons so that hello world text will change
      shadowRoot.querySelectorAll("button").forEach( (elem)=>{
          elem.addEventListener('click',()=>{
              // Change content of p from above with new language
              p.innerHTML = "<span>" + languages[elem.innerHTML] + " " + this.innerHTML + "</span>";
              this.lang = elem.innerHTML; // Set attribute
          });
      });
   
      let slider = this.createSlider(shadowRoot);
      // For fun, let user change size of text through slider 
      // Add event listener that changes font size
      slider.addEventListener('change', ()=>{
          this.fontsize = slider.value;
          shadowRoot.querySelector('style').innerHTML= 'p{ font-size: ' + slider.value + 'px; ' + font +  '}';
      });
    }

    createLangButtons(e, shadowRoot) {
        const b = document.createElement('button');
        b.innerHTML = e;
        shadowRoot.append(b);
    }

    setStyle(shadowRoot) {
        let style = "<link rel=\"stylesheet\" type=\"text/css\" href=\"Rainbow.css\"></link>";
        shadowRoot.innerHTML += style;
    }

    createSlider(shadowRoot) {
        // Create slider element
        let slider = document.createElement('input');
        slider.min = 12;
        slider.max = 72;
        slider.type = 'range';
        slider.value = this.fontsize;
        shadowRoot.appendChild(slider);
        return slider;
    }

    settingSizeFontHello(languages) {
        // Determine and filter the right language for Hello world, defaults to English
        let hello = "Hello World";
        if (this.lang) {
            hello = languages[this.lang];
        }
        // Determine font
        let font = "";
        if (this.font) {
            font = "font-family:" + this.font + ";";
        }
        // Determine font size
        let size = "";
        if (this.fontsize) {
            size = "font-size:" + this.fontsize + "px;";
        }
        return { size, font, hello };
    }

    setLanguages() {
        return {
          "en": "Hello World",
          "ar": "مرحبا بالعالم",
          "es": "Hola Mundo",
          "fr": "Bonjour le monde",
          "zh": "你好"
        };
    }
}

// Register HelloWorld class as core-hello element
customElements.define('core-hello', CoreHello);