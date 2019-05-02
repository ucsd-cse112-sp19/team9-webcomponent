# Linter

Linter is a tool that analyzes source code to flag programming errors, bugs, stylistic errors, and suspicious constructs.  
At the moment, we are just using ESlint and Stylelint.  

## ESLint

You can run ESLint on any of you JavaScript file in the web_component folder with the command  
>npm run lint

This is because this is a reference in the package.json file.  

Let's take a look at the eslint.js file.

<img src="eslint.png">

We are running the recommended option of ESLint. In this file you can modify the rules etc.. Refer to the ESLint documentation for that.  
The recommended option uses Airbnb style.  

## StyleLint

Style lint is used for CSS. In the pipeline, we only run it on the files in the web_component folder but feel free to try it out on your files.  
I just implemented the basic structure and use the recommended style.

<img src="stylelint.png">