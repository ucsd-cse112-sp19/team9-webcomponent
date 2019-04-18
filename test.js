class HelloWorld extends HTMLElement {
  // Can define constructor arguments if you wish.
  constructor() {
    // If you define a constructor, always call super() first!
    // This is specific to CE and required by the spec.
    super();
    console.log("Created")
    // Setup a click listener on <app-drawer> itself.
    this.addEventListener('click', e => {
      this.drawer();
    });
  }

  drawer() {
    document.write("Hello World");
  }
}

window.customElements.define('hello-world', HelloWorld);