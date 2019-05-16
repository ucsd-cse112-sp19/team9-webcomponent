const addChatBoxDefaultStyles = () => {
    let el = document.querySelector('chat-box');
    let id_el =el.shadowRoot.querySelector("#sender").shadowRoot.querySelector("#userId");
    id_el.style.cssText = `
    color: #006A96; border: none; font-size: 15px;
    box-sizing: border-box; border: 2px solid #685972;
    width: 100%; height: 25px; border-bottom: none;
    `;
}

addChatBoxDefaultStyles(); 


