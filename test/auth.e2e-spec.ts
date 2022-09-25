import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupCookieSession, setupGlobalPipes } from 'src/app.setup';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    // setupCookieSession(app); // Not Recommended by NEST
    // setupGlobalPipes(app); // Not Recommended by NEST
    await app.init();
  });

  afterEach(async () => { // Closing app to run test in serial with memory database
    await app.close();
   });

  it('displays the welcome message', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello! Welcome to my application runnining on PORT 3000');
  });

  it('handles a signup request', () => {
    const email = 'asdlkq4321@akl.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'alskdfjl' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'asdf@asdf.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asdf' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
