# Testing

To test our components, we use Mocha for unit tests and TestCafe for integration tests. 

## How to Run

By pushing a commit to our repo, your code will automatically be pushed through our CI pipeline, which will do a variety of checks besides testing.
No extra work is needed on your part. If desired, you can run most of the build process locally using the command
>`npm test`

By default, this will lint your code, run unit tests, and run integration tests on the cloud.

All the scripts will be in the `package.json` file, so feel free to edit which test files you want to run if you are in development. 

## Unit testing with Mocha

If you’ve made changes to the input-rt component, you can start by running mocha tests in isolation with
>`npm run mocha`

All unit tests are written in `test/inputRT-spec.js` if you would like to add or modify any unit tests.

## Integration testing with TestCafe

After passing all unit tests, you can start running the integration tests to make sure that the components show up and work as expected by itself and integrated with other components.
Our integration tests function as our browser tests as well, to check compatibility with popular browsers.
They mainly test input-rt alone and integrated in a chat function (which uses MQTT).

TestCafe tests are ran locally by opening up browsers you have pre-installed on your device.
To run all existing integration tests on your local browsers, use the command:
>`npm run testcafe`

Currently, the script is set up to test on Chrome, Safari, Firefox, and Opera. 
If you do not have a browser already installed, make sure you remove it from script before you run it, or else you will encounter an error. 
To edit browsers ran, edit the scripts called `"test_input"` and `"test_mqtt"` and add/remove said browsers.
Make sure the browser aliases are comma separated with no spaces.

Our script for local browser testing is split into two because the tests on input-rt alone can be ran concurrently, 
but since the integrated chat connects to an MQTT server, we have to run those tests in succession, 
or else the expected outputs will be affected by the other browsers also running the same test.

As a result, we split up our tests into two folders: `test/cafe-tests` (no mqtt), and `test/cafe-tests-mqtt` (with mqtt). 
You can add any new test files to their corresponding folders if needed. The .js files in these two folders will test the .html files in `test/cafe-html`.

### Sauce Labs

If you would like to test your TestCafe tests on more browsers, you can do so by running them in the cloud with our Sauce Labs plugin.
Sauce Labs offers headless browser testing in the cloud, and has a variety of browsers and versions to choose from.

To be able to run tests on Sauce Labs, you must have a Sauce Labs account. Set up your credentials as environment variables as shown in
[this guide.](https://wiki.saucelabs.com/display/DOCS/Best+Practice%3A+Use+Environment+Variables+for+Authentication+Credentials)

Our default `npm test` script will run your tests using Sauce Labs. You can run your TestCafe tests using SauceLabs browsers locally as well, with the command:
>`npm run saucelabs`

Check out which browsers you can test with on Sauce Labs with
>`npm run browsers`

Like above, remember to list the browser aliases as comma separated with no spaces. 

Note: you can only run the integration tests WITHOUT mqtt through Sauce Labs. 
It seems that their VMs aren't able to connect to the mqtt server, so you can only run tests for mqtt (chat integration) with your local browsers.
Our default `npm run saucelabs` script will only run tests in `test/cafe-tests`.
