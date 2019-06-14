# Runtime Terror Repo Structure 

The code is organized into several folders:  
- *dist* contains test coverage for mqtt
- *docs* contain documentation from our auto-generated API docs
- *examples* contains our demo app and integration tests for it
- *test* contain unit tests and TestCafe browser tests
- *tutorials* contain markdown files for our documentation
- *web-component* contains the source code for the components


## Example
Below is an example of what the repo should look like

```
├── docs/
│   ├── scripts/
│   ├── styles/
│   ├── images/
│   └── .html files
├── example/
│   ├── images/
│   ├── model.html
│   └── demo_test.js
├── test/
│   ├── cafe-html/
│   │   └── .html files
│   ├── cafe-tests/
│   │   └── .js files
│   ├── cafe-tests-mqtt/
│   │   └── .js files
│   └── inputRT-spec.js
├── tutorials/
│   └── .md files
├── web-component
│   └── source files
├── .eslintrc.js
├── .gitignore
├── .stylelintrc.json
├── .travis.yml
├── LICENSE
├── README.md
├── Structure.md
├── jsdoc.json
└── package.json
```
