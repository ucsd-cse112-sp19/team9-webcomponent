const addChatStreamDefaultStyles = () => {

    let el = document.querySelector('chat-stream');
    let id_el = el.shadowRoot.querySelector("#receiver").shadowRoot.querySelector("#userId");
    id_el.style.cssText = `color: #006A96; border: none; font-size: 12px;
    box-sizing: border-box; border: 2px solid #685972;
    width: 100%;height: 25px; border-radius: 5px 5px 0 0;
    border-bottom: none;
    `; 
    
    el.style.height = `${el.offsetHeight + id_el.offsetHeight}px`; 
    
}

// method gives you message on landing
const chatStreamRefreshTrigger = () => {
    let el = document.querySelector('chat-stream'); 
    el.shadowRoot.querySelector('#refreshButton').click();
}


addChatStreamDefaultStyles(); 
chatStreamRefreshTrigger(); 
