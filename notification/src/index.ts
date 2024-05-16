import { ApplicationConfig, NotificationApplication } from './application';

//import {ApplicationConfig} from '@loopback/core';
export * from './application';
//export {NotificationApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new NotificationApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  // console.log(`Try ${url}/ping`);
  return app;
}
if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3031),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
        endpointMapping: {
          '/acc-api/notification-openapi.json': { version: '3.0.0', format: 'json' },
          '/acc-api/notification-openapi.yaml': { version: '3.0.0', format: 'yaml' },

        },
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
