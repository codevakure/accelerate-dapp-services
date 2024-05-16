import { Client } from '@loopback/testlab';
import { ClausesApplication } from '../..';
import { setupApplication } from './test-helper';

describe('HomePage', () => {
  let app: ClausesApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('exposes a default home page', async () => {
    await client
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/);
  });

  // it('exposes self-hosted explorer', async () => {
  //   await client
  //     .get('/acc-api/clauses-explorer')
  //     .expect(301)
  //     .expect('location', '/clauses-explorer/');
  // });
});
