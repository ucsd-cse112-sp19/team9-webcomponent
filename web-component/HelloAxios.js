import axios from 'axios';

import './MockData';


class HelloAxios extends HTMLElement {
    constructor() {
        super();

        axios.get('/messages')
             .then(response => {
                response.data.forEach(message => {
                    let div = document.createElement("div");
                    div.innerText = message;
                    this.appendChild(div);
                });
             })
             .catch(error => {
                this.innerText = error;
             });
    }
}

customElements.define('hello-axios', HelloAxios);