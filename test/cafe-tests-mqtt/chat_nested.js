import { Selector } from 'testcafe';

fixture `Testing Chat - Nested Input-rt in append slot`
    .page `../cafe-html/chat_nested.html`
  
// Selectors
const sender = Selector( () => document.querySelector('input-rt[mode="sender"]').shadowRoot ); 
const s_message = sender.find('input[slot="text"]'); 
const s_mqtt = Selector( () => document.querySelector('mqtt-client#sender').shadowRoot );
const s_username =  s_mqtt.find('input[name="userId"]');

const sender2 = Selector( () => document.querySelectorAll('input-rt')[1].shadowRoot ); 
const s_message2 = sender2.find('input[slot="text"]'); 
const s_mqtt2 = Selector( () => document.querySelectorAll('mqtt-client#sender')[1].shadowRoot );
const s_username2 =  s_mqtt2.find('input[name="userId"]');
const send_btn2 = Selector('button[slot="append"]');

const receiver = Selector( () => document.querySelector('input-rt[mode="textarea"]').shadowRoot );
const r_stream = receiver.find('textarea[slot="text"]');
const r_mqtt = Selector( () => document.querySelector('mqtt-client#receiver').shadowRoot );
const r_username =  r_mqtt.find('input[name="userId"]');

// Due to the structure of our append slot, a message will send no matter what the slot contains
test('Test Suite: nested input doesn\'t get sent', async t => {
    // Stall to make sure mqtt is connected
    await t.wait(3000);

    const error =  { name: 'anonymous', message: 'error' };
    const messages = [
        { name: 'Jordan', message: 'Hey guys good job on the deliverable' },
        { name: 'Kevin', message: 'Yeah guys good job, good job Jordan good leading' },
        { name: 'Hillary', message: '*reacts emoji*' },
        { name: 'Olivia', message: '*second reacts emoji*' },
        { name: 'Peter', message: 'What is going on....' }
    ];

    // Currently Test Cafe tests differs from implementation in that click is not selection,
    // but in our event binding for send(), a selection is a click.
    for (const m of messages) {
        await t
            .selectText(s_username)
            .typeText(s_username, m.name)
            .typeText(s_message, m.message)
            .selectText(s_username2)
            .typeText(s_username2, error.name)
            .selectText(s_message2)
            .typeText(s_message2, error.message)
            .click(send_btn2);
    }

    await t.expect(r_stream.value).notContains('error', 'Error: textarea contains: error');
    await t.expect(r_stream.value).notContains('anonymous', 'Error: textarea contains: anonymous');
});