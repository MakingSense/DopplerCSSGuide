# DopplerCSSGuide

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project.

### Prerequisites

This project uses Elastic Search as back end. To install please check this document https://docs.google.com/document/d/1rDMcoIpwRxdIWpOUrIBdNhI4lHY9S0hLR_9aIJhDex0/edit
Notice that CORS needs to be enabled for elastic search. More info here https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-http.html
Once installed you would need to run elastic search in a separate command window for the app to work.
Also you will need to have node with npm, and bower for this project to work.

### Installing

After downloading the code, install the third party npm packages, and bower packages.

```
npm install
bower install
```

To run the app, type gulp in the command prompt and open the browser in port 8080 (http://localhost:8080/)

Since the database is empty you will need to create at least a component first, type a name and hit Crear button.

### Usage
This is a test app, to create a component type the name in the first input and hit Crear button. To load this component press Cargar button.


## Built With

* [Typescript](https://www.typescriptlang.org/) - The js framework used
* [Angular](https://code.angularjs.org/snapshot/docs/guide) - The MVC framework
* [Webpack](https://webpack.js.org/) - Module Bundler


