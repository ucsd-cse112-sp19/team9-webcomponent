import { Selector } from 'testcafe';

fixture `Testing Chat`
    .page `../cafe-html/default_chat.html`
  
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

test('[MQTT DEFAULT] Test Suite: name and message change', async t => {
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
        textarea += m.name + ": " + m.message + "\n";
        await t.expect(r_stream.value).eql(textarea, 'Error: textarea is actually: ' + r_stream.value)
    }
});

const testCases = [
    { name: 'Peter', message: 'Tester I am Peter' },
    { name: 'Powell', message: 'Tester I am POWELL!!' }
];

// For each test case, change sender username to $name and send $message
for (const c of testCases) {
    test(`[MQTT DEFAULT] Single test: change name to ${c.name}`, async t => {
        // Stall to make sure mqtt is connected
        await t.wait(3000);
        await t
            .selectText(s_username)
            .typeText(s_username, c.name)
            .typeText(s_message, c.message)
            .click(send_btn)
            .typeText(s_message, c.message)
            .click(send_btn);
        let textarea = c.name + ": " + c.message + "\n";
        textarea += textarea;
        await t.expect(r_stream.value).eql(textarea, 'Error: textarea is actually: ' + r_stream.value);
    });
}