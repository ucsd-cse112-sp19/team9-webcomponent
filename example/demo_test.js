import { Selector, ClientFunction } from 'testcafe';

fixture `Testing Demo Page`
    .page `./model.html`

// Selectors
const sender = Selector( () => document.querySelector('input-rt#first[mode="sender"]').shadowRoot ); 
const s_message = sender.find('input[slot="text"]');
const send_btn = Selector('button[slot="append"]');

const receiver = Selector( () => document.querySelector('input-rt[mode="textarea"]').shadowRoot );
const r_stream = receiver.find('textarea[slot="text"]');

// Scroll function
const browserscroll = ClientFunction(function() {
    window.scrollBy(0,400);
});

// Test Messages
const testCases = [
    { message: 'Heading to the gym. Anyone want to come?' },
    { message: 'Ill be there until 8' }
];

// For each test case, change sender username to $name and send $message
test(`[DEMO] Send messages through chat`, async t => {
    
        await t.maximizeWindow();

        // Make sure mqtt is connected
        await t.wait(3000)

        // Sender ID
        const userid = await Selector('mqtt-client').getAttribute('userid');
        
        let textarea = "";
        
        // Test it sends correctly
        for (const c of testCases) {
            await t
                .click(s_message)
                .typeText(s_message, c.message).wait(500)
                .click(send_btn)
            textarea += userid + ": " + c.message + "\n";
            const actual = await r_stream.value;
            await t.expect(r_stream.value).eql(textarea, 'Error: textarea is actually: ' + actual);
        }
});