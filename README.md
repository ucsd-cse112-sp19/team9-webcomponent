# Runtime Terror
[![Build Status](https://travis-ci.com/ucsd-cse112/team9-webcomponent.svg?branch=dev)](https://travis-ci.com/ucsd-cse112/team9-webcomponent)
[![Maintainability](https://api.codeclimate.com/v1/badges/01d9ca099423c56d223d/maintainability)](https://codeclimate.com/repos/5cc220fa4a01b954d700d805/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/01d9ca099423c56d223d/test_coverage)](https://codeclimate.com/repos/5cc220fa4a01b954d700d805/test_coverage)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
  
![](docs/images/time_terror.png)

## Documentation
Check out our [Documentation](http://htmlpreview.github.io/?https://github.com/ucsd-cse112/team9-webcomponent/blob/valentin/docs/index.html)  
Check out `./docs/index.html` for code documentation and `Structure.md` for navigating our repo.

## Dev Server
See `./tutorials/webpack.md`

## Web Component

HelloWorld  
:bomb: InputRT :bomb: MQTTClient :bomb:

## Getting Started

To begin developing with our web component you will need to perform the following steps:

1. Make sure you have github set up on your local machine. 
    
    a. https://help.github.com/en/articles/set-up-git
1. Once you have github, you can clone our repository at:
    https://github.com/ucsd-cse112/team9-webcomponent.git
1. Install our dependencies with npm install 
    
    a. A guide to install npm can be found here:
    https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
1. You can find our code at under team9-webcomponent/web-component
    Details about our webcomponents can be found under team9-webcomponent/docs
    There are three main sub packages 
        
    a. CoreHello.js Rainbow.css
    
    b. inputRT.js inputbox-rt-default-style.css
    
    c. mqttClient.js
1. After you develop and make changes you can observe them in team9-webcomponent/example/test.html (make sure you include the script at the bottom). If you are using mqttClient.js make sure you have <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"></script> included in your html header
    
    a. If you want to use a more fleshed out example checkout team9-webcomponent/example/model.html
1. Once you feel confident and want to test it you can run npm test which will trigger our unit test, integration test, and browser test
frameworks.
1. After testing you can now add and commit which will trigger a style linter. Once you push it will show up on github which will reevaluate the tests through travis and if it passes you can being a pull request to merge onto our development branch.

## Troubleshooting
If your mqttClient is not connecting make sure you have <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"></script> at the top of your html file and you are connected to a network that allows you to open ports i.e. connect to UCSD-PROTECTED, not UCSD-GUEST.

If npm test is failing after the Unit tests, it is likely that you don't have your saucelabs credentials set. You can find those here:
https://wiki.saucelabs.com/display/DOCS/Best+Practice%3A+Use+Environment+Variables+for+Authentication+Credentials

You included your the web component javascript file but for some reason it throughs console errors. Try adding the js files to the bottom of your html file. It is a symptom of this problem: 
https://stackoverflow.com/questions/48498581/textcontent-empty-in-connectedcallback-of-a-custom-htmlelement

## Acknowledgements
This project uses the following open source software: 
- [Sauce Labs](https://saucelabs.com/) - for offering automated cross browser testing
  
