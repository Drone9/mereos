# `mereos`

Mereos is a JavaScript library for online proctoring.

The `mereos` package contains only the functionality necessary to conduct an online proctoring. It empowered with Artifical intelligence to make online proctoring reliable and secure.

**Note:** by default, mereos is a open source library. However it works in subscription based model. You are encourged to buy the subscription from [mereos](https://mereos.eu). 

## Example Usage

1. Import the mereos library.

```js
var mereos = require('mereos');
```

1. `init` function is used to initiate a session of proctoring. It takes `school_id` and `assessment_id`. In response, it returns the profile of the features to take assessment with.
**Note:** assessment_id is optional. In case of assessment_id not provided. Default profile of the school will be retured.

```js
var {init} = require('mereos');
var resp = init(school_id, assessment_id);
```

2. `start_prechecks` function is used to start prechecks. All the prechecks are based on profile assigned to a school or assessment.

```js
var {start_prechecks} = require('mereos');
var resp = start_prechecks(profile)
```

3. `start_recording` function is used to start the video recording for proctoring.

```js
var {start_recording} = require('mereos');
var resp = start_recording()
```

3. `stop_recording` function is used to stop the video recording.

```js
var {stop_recording} = require('mereos');
var resp = stop_recording(session)
```