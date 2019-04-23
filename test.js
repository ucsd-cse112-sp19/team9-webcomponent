class HelloWorld extends HTMLElement {
  // Can define constructor arguments if you wish.
  constructor() {
    // If you define a constructor, always call super() first!
    // This is specific to CE and required by the spec.
    super();
    console.log("Created")

    const root = this.attachShadow({mode: 'open', delegatesFocus: true});
    root.innerHTML = `
      <style>
        :host {
          display: flex;
          border: 1px dotted black;
          padding: 16px;
        }
        :focus {
          outline: 2px solid blue;
        }
      </style>
      <div>Click for a bio</div>
      `
    
    this.clicks = 0;
    // // Setup a click listener on <app-drawer> itself.
    this.addEventListener('click', e => {
      this.drawer();
    });
  }

  drawer() {
    var member_data = [
        {
            "name": "Jordan Coursey",
            "bio": "Hi, my name is Jordan! Some of my hobbies are rock climbing and ping pong. When i'm not studying i'm mostly hanging out with friends."
        },
        {
            "name": "Alex Haggart",
            "bio": "Hi, I'm Alex. I'm a skier and a sailor. I code sometimes too."
        },
        {
            "name": "Eric Sen",
            "bio": "I am a 4th year computer science major in the BS/MS program. I enjoy surfing and camping."
        },
        {
            "name": "Jayvee Inthisone",
            "bio": "Hi, I'm Jayvee Inthisone and I am a Math-CS major and I am currently an officer of Triton Gaming and osu! Division. In my free time, I like to play League of Legends and Dragon Ball FighterZ."
        },
        {
            "name": "Hillary Thi",
            "bio": "Hi, I'm Hillary! I'm a CS Major and a huge theme park junkie. If I could be reborn as an animal, I would be a corgi!"
        },
        {
            "name": "Kaung Yang",
            "bio": "Hi, I am Kaung. My major is Computer Science. I like playing badminton"
        },
        {
            "name": "Olivia Wong",
            "bio": "Hi! My name is Olivia and I am a CS Major. I like to play badminton and binge watch on Netflix in my free time."
        },
        {
            "name": "Georgie Karma ",
            "bio": "My name is Georgie, I'm a 4th year CS student. Some things I enjoy are going to the beach, snowboarding, and going to music festivals."
        },
        {
            "name": "Valentin Bielecki",
            "bio": "Hi, I am Valentin from France. I play Rugby and I love surfing in San Diego."
        },
        {
            "name": "Kevin Zavier",
            "bio": "Hi I'm Kevin. Im a 4th year computer engineering student getting ready to graduate. Some things I enjoy are going to the beach, boxing, and ping pong"
        }
    ]
    console.log(member_data[this.clicks]);
    document.getElementById("example").innerHTML = member_data[this.clicks]["bio"]; 
    this.clicks+=1;
    
    if(this.clicks > 9){
        this.clicks = 0;
    }
  }
}

window.customElements.define('hello-world', HelloWorld);