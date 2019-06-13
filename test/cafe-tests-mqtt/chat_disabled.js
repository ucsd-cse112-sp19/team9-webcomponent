import { Selector } from 'testcafe';

fixture `Testing Chat - disabled sender`
    .page `../cafe-html/chat_disabled.html`
  
// Selectors
const sender = Selector( () => document.querySelector('input-rt[mode="sender"]').shadowRoot ); 
const s_message = sender.find('input[slot="text"]'); 
const s_mqtt = Selector( () => document.querySelector('mqtt-client#sender').shadowRoot );
const s_username =  s_mqtt.find('input[name="userId"]');
const send_btn = Selector('button[slot="append"]');

const receiver = Selector( () => document.querySelector('input-rt[mode="textarea"]').shadowRoot );
const r_stream = receiver.find('textarea[slot="text"]');
const r_mqtt = Selector( () => document.querySelector('mqtt-client#receiver').shadowRoot );
const r_username =  r_mqtt.find('input[name="userId"]');


// Change sender username and attempt to send messages on a disabled text box
test('Test Suite: attempt to change name and message', async t => {
    // Stall to make sure mqtt is connected
    await t.wait(3000);

    const messages = [
        { name: 'Jordan', message: 'Hey guys good job on the deliverable' },
        { name: 'Kevin', message: 'Yeah guys good job, good job Jordan good leading' },
        { name: 'Hillary', message: '*reacts emoji*' },
        { name: 'Olivia', message: '*second reacts emoji*' },
        { name: 'Peter', message: 'What is going on....' }
    ];

    let textarea = "";

    for (const m of messages) {
        await t
            .selectText(s_username)
            .typeText(s_username, m.name)
            .typeText(s_message, m.message)
            .click(send_btn);

        await t
            .expect(s_username.value).eql(m.name, 'Error: name is actually: ' + s_message.value)
            .expect(r_stream.value).eql('', 'Error: textarea is actually: ' + r_stream.value);
    }
});

const testCases = [
    { name: 'Peter', message: 'Test Peter' },
    { name: 'Powell', message: 'Test Powell' }
];

// For each test case, change sender username to $name and attempt to send $message on a disabled text box
for (const c of testCases) {
    test(`Single test: change name to ${c.name} and attempt to change message`, async t => {
        // Stall to make sure mqtt is connected
        await t.wait(3000);
        await t
            .selectText(s_username)
            .typeText(s_username, c.name)
            .typeText(s_message, c.message)
            .click(send_btn)
            .typeText(s_message, c.message)
            .click(send_btn);
        await t
            .expect(s_username.value).eql(c.name, 'Error: name is actually: ' + s_message.value)
            .expect(r_stream.value).eql('', 'Error: textarea is actually: ' + r_stream.value);
    });
}