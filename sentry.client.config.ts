import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://b29c139d73bdcd29f314828f1e326697@o4510032326819840.ingest.us.sentry.io/4510032330817536',
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: 'system',
    }),
  ],
});
