# CodeClimate

When setting up test coverage reporting with Code Climate, we must instrument test coverage ourselves as part of our CI build.  
It must be done in one of our supported languages and formats which is the Icov format with JavaScript.  
Istanbul is just a JavaScript code coverage tool written in JS.  

We added the repository in the .travis.yml file. We are running basic mocha tests here.  
All you need to understand is that for the test coverage percentage is the percentage of lines of code scanned by tests.  
This is why we must try to have a test coverage of 90+ to ensure quality!  

You can check the status with the GitHub badges or by checking online https://codeclimate.com.  
You should be able to see this.

<img src="codeclimate.png">

We run the coverage part after the tests: the report is made and encoded and updated to our repository.