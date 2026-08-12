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

const isLocalHost = () => {
	if (typeof window === 'undefined' || !window.location) return false;

	const hostname = window.location.hostname || '';
	if (!hostname) return false;

	if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0' || hostname === '::1') {
		return true;
	}
	if (hostname.endsWith('.local')) return true;

	// RFC1918 private ranges commonly used for local dev servers.
	if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
	if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
	if (/^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;

	return false;
};

const initSentry = (environment = 'production') => {
	if (isSentryAlreadyInitialized()) {
		return;
	}

	if (isLocalHost()) {
		console.info('[mereos] Sentry disabled on local/dev host:', window.location.hostname);
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
