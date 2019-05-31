import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `../cafe-html/HelloWorld.html`;

test('My first test', async t => {
	const shadowSpanish = Selector(() => document.querySelector('#core_hello').shadowRoot.querySelector('#es'));
	const shadowInput = Selector(() => document.querySelector('#core_hello').shadowRoot.querySelector('#change_name_input'));
	const shadowText = Selector(() => document.querySelector('#core_hello').shadowRoot.querySelector('#core_hello_text'));

    // Test code
        await t
        .typeText('#test_input', 'Am testing in lightDOM')
        .typeText(shadowInput, ', I am testing in shadowDOM')
        .click(shadowSpanish)

        // Use the assertion to check if the actual header text is equal to the expected one
        .expect(shadowText.innerText).eql('Hola Mundo Georgie');
});