class HelloAxios extends HTMLElement {
    constructor() {
        super();

        axios.get('https://dog.ceo/api/breeds')
             .then(function (response) {
                 console.log(response);
             })
             .catch(function (error) {
                 console.log(error);
             });
    }
};

customElements.define('hello-axios', HelloAxios);