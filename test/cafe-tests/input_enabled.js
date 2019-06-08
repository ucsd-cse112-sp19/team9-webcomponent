import { Selector } from 'testcafe';

fixture `Testing Input - enabled`
    .page `../cafe-html/input_enabled.html`
  
const messages = [
    { message: 'test1' },
    { message: 'test 2' },
    { message: ' ' },
    { message: '$' },
    { message: '<h1><b>html text</b></h1>'}
];

const input = Selector( () => document.querySelector('input-rt').shadowRoot ); 
const text = input.find('input[slot="text"]'); 
const button = Selector('button[slot="append"]');
const checkText = Selector('#output');

// Types in input box, checks that value is appended 
test('Test Suite: make sure input value is appended', async t => {
    for (const m of messages) {
        await t
            .selectText(text)
            .typeText(text, m.message)
            .click(button);

        const innerText = await t.eval(() => document.getElementById('output').innerHTML);
        await t.expect(innerText).eql(m.message, 'Error: appended text value is actually: ' + innerText);
    }
});