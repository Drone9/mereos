# `mereos`

<img src="logo.svg" alt="mereos" height="500"/>

Mereos is a JavaScript library for online proctoring.

The `mereos` package contains only the functionality necessary to conduct an online proctoring. It empowered with Artifical intelligence to make online proctoring reliable and secure.

**Note:** by default, mereos is a open source library. However it works in subscription based model. You are encourged to buy the subscription from [mereos](https://mereos.eu). 

## Example Usage

1. Import the mereos library.

```js
var mereos = require('mereos');
```

1. `init` function is used to initiate a session of proctoring. It takes `school_id` and `assessment_id`. In response, it returns the profile of the features to take assessment with.

**Note:** 'assessment_id' is optional. In case 'assessment_id' is not provided. Default profile of the school will be retured.

```js
var {init} = require('mereos');
var profile = init(school_id, assessment_id);
```

2. `start_prechecks` function is used to start prechecks. All the prechecks are based on profile assigned to a school or assessment.

```js
var {start_prechecks} = require('mereos');
var resp = start_prechecks(profile);
```

3. `start_recording` function is used to start the video recording for proctoring.

```js
var {start_recording} = require('mereos');
var resp = start_recording();
```

4. `stop_recording` function is used to stop the video recording.

```js
var {stop_recording} = require('mereos');
var resp = stop_recording(session);
```

## Contributing
The main purpose of this repository is to continue evolving mereos core, making it faster and easier to use. Development of Mereos happens in the open on GitHub, and we are grateful to the community and our devs for contributing bugfixes and improvements. Read below to learn how you can take part in improving React.

## Code of Conduct
Mereos has adopted a Code of Conduct that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

## Contributing Guide
Read our contributing guide to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Mereos.

## Good First Issues
To help you get your feet wet and get you familiar with our contribution process, we have a list of good first issues that contain bugs that have a relatively limited scope. This is a great place to get started.

## License
Mereos is MIT licensed.
