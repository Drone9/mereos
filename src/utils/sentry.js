import { Replay } from '@sentry/replay';
import * as Sentry from '@sentry/browser';

const initSentry = (environment = 'production') => {
	Sentry.init({
		dsn: 'https://edb36d1ddfd737dbf7b6d291a63d192a@o4507933105389568.ingest.de.sentry.io/4510827301634128',

		integrations: [
			Sentry.browserProfilingIntegration(),
			Sentry.browserTracingIntegration({
				tracePropagationTargets: ['localhost', /^\//],
			}),
			new Replay(),
		],

		environment: environment,

		profileSessionSampleRate: 0.5,
		tracesSampleRate: 0.1,          // ✅ good for prod
		replaysSessionSampleRate: 0.05, // ✅ good
		replaysOnErrorSampleRate: 1.0,  // ✅ perfect
	});
};

export { initSentry };