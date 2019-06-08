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
      this.settingStringAttribute(val,'rainbow');
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
      this.settingStringAttribute(val,'lang');
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
      this.settingStringAttribute(val,'font');
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
      this.settingStringAttribute(val,'fontsize');
    }
      
    settingStringAttribute(val,attribute) {
      const stringval = String(val);
      if (stringval) {
          this.setAttribute(attribute, val);
      }
      else {
          this.removeAttribute(attribute);
      }
  }
    }
    /**
     * Constructor for setting up shadow dom and class definitions 
     * for web component.
     */
    constructor () {
      super();
      // Dictionary for Hello World in different languages
      let languages = setlanguages();

      // Initialize shadow root
      const shadowRoot = this.attachShadow({mode: 'open'});
      
      // Check if rainbow is set and if it is append the css file to shadow dom
      if(this.rainbow) {
        let style = "<link rel=\"stylesheet\" type=\"text/css\" href=\"Rainbow.css\"></link>";
        shadowRoot.innerHTML += style;
      }

      // Determine and filter the right language for Hello world, defaults to English
      let { size, font, hello } = this.Setting3Attributes(languages);
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
        const b = document.createElement('button');
        b.innerHTML = e;
        shadowRoot.append(b);
      });

      // Attach click event to all buttons so that hello world text will change
      shadowRoot.querySelectorAll("button").forEach( (elem)=>{
        elem.addEventListener('click',()=>{
            // Change content of p from above with new language
            p.innerHTML = "<span>" + languages[elem.innerHTML] + " " + this.innerHTML + "</span>";
            // Set attribute
            this.lang = elem.innerHTML;
        });
      });

      // For fun, let user change size of text through slider

      // Create slider element
      this.createSlider(shadowRoot, font);
    }

  createSlider(shadowRoot, font) {
    let slider = document.createElement('input');
    slider.min = 12;
    slider.max = 72;
    slider.type = 'range';
    slider.value = this.fontsize;
    shadowRoot.appendChild(slider);
    // Add event listener that changes font size
    slider.addEventListener('change', () => {
      this.fontsize = slider.value;
      shadowRoot.querySelector('style').innerHTML = 'p{ font-size: ' + slider.value + 'px; ' + font + '}';
    });
  }

  Setting3Attributes(languages) {
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
}

// Register HelloWorld class as core-hello element
customElements.define('core-hello', CoreHello);

function setlanguages() {
  return {
  "en": "Hello World",
    "ar": "مرحبا بالعالم",
    "es": "Hola Mundo",
    "fr": "Bonjour le monde",
    "zh": "你好"
  };
}

