// let axios = require('axios');
import axios from 'axios';

import './MockData';


class HelloAxios extends HTMLElement {
    constructor() {
        super();

        axios.get('/messages')
             .then(response => {
                this.innerText = response.data;
             })
             .catch(error => {
                this.innerText = error;
             });
    }
}

customElements.define('hello-axios', HelloAxios);