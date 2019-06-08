import { Selector } from 'testcafe';

fixture `Testing Input`
    .page `../cafe-html/default_input.html`

// Selectors
const shadow = Selector( () => document.querySelector('input-rt').shadowRoot );
const text = shadow.find('input[slot="text"]');

const testCases = [
    { text: 'Text 1: ', text2: 'New text 1' },
    { text: 'Text 2: Second', text2: 'New text 2'},
    { text: ' ', text2: ' '},
    { text: ' ', text2: ';'}
];

// For each test case, type in $text, then select the text and overwrite with $text2 
for (const c of testCases) {
    test(`[INPUT DEFAULT] Single test: change text to [${c.text}] to [${c.text2}]`, async t => {
        await t
            .typeText(text, c.text)
            .expect(text.value).eql(c.text, 'Error: text is actually: ' + text.value)
            .selectText(text)
            .typeText(text, c.text2)
            .expect(text.value).eql(c.text2, 'Error: text is actually: ' + text.value);
    });
}