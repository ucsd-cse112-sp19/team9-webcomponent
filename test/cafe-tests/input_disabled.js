import { Selector } from 'testcafe';

fixture `Testing Input - disabled`
    .page `../cafe-html/input_disabled.html`

// Selectors
const input = Selector( () => document.querySelector('input-rt[disabled="true"]').shadowRoot ); 
const text = input.find('input[slot="text"]'); 
const button = Selector('button[slot="append"]');
const checkText = Selector('#output');

const messages = [
    { message: 'test1' },
    { message: 'test 2' },
    { message: ' ' }
];

// Test that the first input-rt on the page is disabled with a value of true
test('Single Test: make sure input box is disabled', async t => {
    await t
        .expect(Selector('input-rt').hasAttribute("disabled")).eql(true)
        .expect(Selector('input-rt').getAttribute("disabled")).eql("true");
});


// Types in input box, checks input box value
test('Test Suite: make sure input box is empty after typing', async t => {
    for (const m of messages) {
        await t
            .selectText(text)
            .typeText(text, m.message);

        await t
            .expect(text.value).eql('', 'Error: text value is actually: ' + text.value);
    }
});

// Types in input box, attempts to append text to #output, checks that it stays empty
test('Test Suite: make sure input value is empty so nothing is appended', async t => {
    for (const m of messages) {
        await t
            .selectText(text)
            .typeText(text, m.message)
            .click(button);

        const innerText = await t.eval(() => document.getElementById('output').innerHTML);
        await t.expect(innerText).eql('', 'Error: appended text value is actually: ' + innerText);
    }
});