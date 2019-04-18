class HelloWorld extends HTMLElement {
  // Can define constructor arguments if you wish.
  constructor() {
    // If you define a constructor, always call super() first!
    // This is specific to CE and required by the spec.
    super();
    console.log("Created")
    this.clicks = 0;
    // Setup a click listener on <app-drawer> itself.
    this.addEventListener('click', e => {
      this.drawer();
    });
  }

  drawer() {
    this.clicks+=1;

    document.getElementById("example").innerHTML = "Hello World " + this.clicks; 
  }
}

window.customElements.define('hello-world', HelloWorld);