# Runtime Terror Repo Structure 

The code is organized into several folders:  
- *coverage* contains the output on code coverage
- *docs* contain documentation from our auto-generated API docs
- *images* contain images used in documentation
- *test* contain unit tests and TestCafe browser tests
- *tutorials* contain markdown files for our documentation
- *web-component* contains the source code for the components


## Example
Below is an example of what the repo should look like

```
├── coverage/
│   ├── lcov-report/
│   ├── lcov.info
│   └── .html files
├── docs/
│   ├── scripts/
│   ├── styles/
│   ├── images/
│   └── .html files
├── images/
│   └── img files
├── test/
│   ├── cafe-html/
│   │   └── .html files
│   ├── cafe-tests/
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
├── package.json
└── webpack.config.js
```
