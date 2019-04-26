class HelloWorld extends HTMLElement{

    get rainbow() {
      return this.hasAttribute('rainbow');
    }

    set rainbow(val) {
      if (val) {
        this.setAttribute('rainbow', '');
      } else {
        this.removeAttribute('rainbow');
      }
    }

    get lang() {
      return this.hasAttribute('lang');
    }

    set lang(val) {
      if (val) {
        this.setAttribute('lang', val);
      } else {
        this.removeAttribute('lang');
      }
    }

    constructor () {
      super();

      const shadowRoot = this.attachShadow({mode: 'open'});

      let style = "<link rel=\"stylesheet\" type=\"text/css\" href=\"StarRating.css\"></link>";
      shadowRoot.innerHTML = style;

      let p = document.createElement('p');
      p.innerHTML = "Hello World " + this.innerHTML + "!";
      shadowRoot.appendChild(p);
    }
}

class StarRating extends HTMLElement {
    get value () {
        return this.getAttribute('value') || 0;
    }

    set value (val) {
        this.setAttribute('value', val);
        this.highlight(this.value - 1);
    }

    get number () {
        return this.getAttribute('number') || 5;
    }

    set number (val) {
        this.setAttribute('number', val);

        this.stars = [];

        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        for (let i = 0; i < this.number; i++) {
            let s = document.createElement('img');
            s.src = "star_empty.png"
            s.className = 'star';
            this.appendChild(s);
            this.stars.push(s);
        }

        this.value = this.value;
    }

    highlight (index) {
        this.stars.forEach((star, i) => {
            if(i <= index){
                star.src = "star.png"
            }else{
                star.src = "star_empty.png"
            }
        });
    }

    constructor () {
        super();

        this.number = this.number;

        this.addEventListener('mousemove', e => {
            let box = this.getBoundingClientRect();
            let starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);
            this.highlight(starIndex);
        });

        this.addEventListener('mouseout', () => {
            this.value = this.value;
        });

        this.addEventListener('click', e => {
            let box = this.getBoundingClientRect();
            let starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);
            this.value = starIndex + 1;
        });
    }
}

customElements.define('core-hello', HelloWorld);
customElements.define('x-star-rating', StarRating);
