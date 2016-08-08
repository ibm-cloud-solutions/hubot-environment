[![Build Status](https://travis-ci.org/ibm-cloud-solutions/hubot-environment.svg?branch=master)](https://travis-ci.org/ibm-cloud-solutions/hubot-environment)
[![Dependency Status](https://dependencyci.com/github/ibm-cloud-solutions/hubot-environment/badge)](https://dependencyci.com/github/ibm-cloud-solutions/hubot-environment)
[![Coverage Status](https://coveralls.io/repos/github/ibm-cloud-solutions/hubot-environment/badge.svg?branch=cleanup)](https://coveralls.io/github/ibm-cloud-solutions/hubot-environment?branch=cleanup)
[![npm](https://img.shields.io/npm/v/hubot-environment.svg?maxAge=2592000)](https://www.npmjs.com/package/hubot-environment)


# hubot-environment

A Hubot Script for accessing the environment variable settings in the runtime
environment.  A filtered list of environment variables is also available when
a string is provided to match against the variable names.

## Getting Started
* [Installation](#installation)
* [Dependencies](#dependencies)
* [License](#license)
* [Contribute](#contribute)

## Installation
```
npm install -S hubot-environment
```

Then add `"hubot-environment"` to your bot's `external-scripts.json`.

## Dependencies

This script emits the version results as the event `ibmcloud.formatter`, which is a listener from `hubot-ibmcloud-formatter`.

## License

See [LICENSE.txt](https://github.com/ibm-cloud-solutions/hubot-environment/blob/master/LICENSE.txt) for license information.

## Contribute

Please check out our [Contribution Guidelines](https://github.com/ibm-cloud-solutions/hubot-environment/blob/master/CONTRIBUTING.md) for detailed information on how you can lend a hand.
