# angular-fis-kit

One new angular and fis development kits, Hummer Demo Via AngularJS and develop with FIS.


This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app.
You can use it to quickly bootstrap your angular webapp projects and dev environment for these
projects.


## Getting Started

To get you started you can simply clone the angular-seed repository and install the dependencies:

### Prerequisites

You need git to clone the angular-seed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test angular-seed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone 

Clone the angular-seed repository using [git][git]:

```
git clone https://github.com/enimo/angular-fis-kit.git
cd angular-fis-kit
```


### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
# open root dir
cd ./

# start the server
npm start 

# dev and debug
npm run dev

#stop server if all done 
npm stop 

```

Now browse to the app at `http://localhost:8080/`.



## Directory Layout

```
app/                    --> all of the source files for the application
  assets/               --> all static files, such as css, js, images
  view/                --> the view1 view template and logic
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
karma.conf.js         --> config file for running unit tests with Karma
fis-conf.js         	--> config workflow with fis
dist/            		--> all compiled file
dist_tmp/            	--> temporary compiled file for web server debug
kit/            		--> some kit shell script, e.g. start webserver, compile and debug etc.
test/            		--> unit test case 
Dapper/            		--> a backend PHP dapper framework, for Restful API or smarty render
```

## Testing

There are two kinds of tests in the angular-seed application: Unit tests and End to End tests.

### Running Unit Tests

The angular-seed app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `..._test.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to
check that a particular version of the code is operating as expected.  The project contains a
predefined script to do this:

```
npm run test-single-run
```
