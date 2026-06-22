import * as Sentry from '@sentry/browser';

const MEREOS_SENTRY_INIT_KEY = '__mereosSentryInitialized';

const isSentryAlreadyInitialized = () => {
	if (typeof Sentry.getClient === 'function' && Sentry.getClient()) {
		return true;
	}
	if (typeof window !== 'undefined' && window[MEREOS_SENTRY_INIT_KEY]) {
		return true;
	}
	return false;
};

const initSentry = (environment = 'production') => {
	/*
	 * Session Replay allows only one instance per page. Skip init when Sentry is
	 * already set up (second mereos load, or LMS host app initialized Sentry first).
	 */
	if (isSentryAlreadyInitialized()) {
		return;
	}

	Sentry.init({
		dsn: 'https://edb36d1ddfd737dbf7b6d291a63d192a@o4507933105389568.ingest.de.sentry.io/4510827301634128',

		integrations: [
			Sentry.browserProfilingIntegration(),
			Sentry.browserTracingIntegration({
				tracePropagationTargets: ['localhost', /^\//],
			}),
			Sentry.replayIntegration(),
		],

		environment: environment,

		profileSessionSampleRate: 0.5,
		tracesSampleRate: 0.1,
		replaysSessionSampleRate: 0.05,
		replaysOnErrorSampleRate: 1.0,
	});

	if (typeof window !== 'undefined') {
		window[MEREOS_SENTRY_INIT_KEY] = true;
	}
};

export { initSentry };
