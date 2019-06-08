# JSDoc Documentation

JSDoc is well structured and has a simple configuration.  
The configuration file is jsdoc.json  
It has 3 main parts: source, plugins and options  

<img src="images/jsdoc.png">

Source shows where to find and what to take as inputs.  
Here we will only look at files in the web_component folder and only take the JavaScript files.  

Plugins gives the list of all the modules used to make the documentation.  
In this documentation, we are using a template called better-docs and we can create diagrams with JsDoc Mermaid  

Options is a list of what we choose to use and where to find elements. The documentation will be in a docs folder.  

You can make Markdown tutorials just like this one and put it in the tutorials folder.  

Very important! If you want to update the docs locally, you need to run the following command  
>npm run docs