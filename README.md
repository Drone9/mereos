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

1. `init` function is used to initiate a session of proctoring. It takes `candidate_object`, `profile_id` and `assessment_object`.

**Note:** 
`profile_id` is related to proctoring profile which is created at Admin panel.
`external_id` in candidate_object is a unique id of candidate in LMS. It's advice to used properly to bridge library and LMS. 
`external_id` in assessment_object is the id of assessment in LMS. It's advice to used properly to bridge library and LMS. 

```js
var {init} = require('mereos');

var credentials = {
    client_id: '3425XXXXXXXXXXXXXXXXX',
	client_secret: 'HZXXXXXXXXXXXXXXXXXXXXXXXXXX'
}
var candidate_object = {
    type: 'candidate',
    name: `John Doe`,
    email: 'john.doe@gmail.com',
    phone: '+613324234',
    external_id: 'ui11223',
    school: 1999999,
    ...
}
var profile_id = 33212214;

var assessment_object = {
    name: 'Geology',
    external_id: '3235235235' 
    ...
}
var theme_object ={
    language: 'es',
    theming: '#00000',
    ...
}

var resp = init(credentials, candidate_object, profile_id, assessment_object, theme_object);
```

2. `start_prechecks` function is used to start prechecks. All the prechecks are based on profile used in `init` function. This function takes a callback function which runs once the whole process of prechecks is executed.The session_resume key is an optional parameter for the start_prechecks function. When provided, it ensures that prechecks resume from the step where they were last left off in case of a page reload or any interruption. If this key is not passed, the prechecks process will start from the beginning. This feature helps maintain the continuity of the precheck process, providing a seamless experience for the user.

```js
var {start_prechecks} = require('mereos');
var resp = start_prechecks(callback,'session_resume');
```

3. `stop_prechecks` function is used to closing the pre-checks modal.
```js
var {stop_prechecks} = require('mereos');
var resp = stop_prechecks(callback);
```

3. `start_session` function is used to start the session of proctoring through library. This function takes a callback function which runs once the whole process is executed.

```js
var {start_session} = require('mereos');
var resp = start_session(callback);
```

4. `stop_session` function is used to finish the session. This function takes a callback function which runs once the whole process is executed.

```js
var {stop_session} = require('mereos');
var resp = stop_session(callback);
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
