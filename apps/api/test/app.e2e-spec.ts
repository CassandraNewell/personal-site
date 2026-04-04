import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /status', () => {
    return request(app.getHttpServer())
      .get('/status')
      .expect(200)
      .expect({ ok: true });
  });

  it('GET /message/:name', () => {
    return request(app.getHttpServer())
      .get('/message/jared')
      .expect(200)
      .expect({ message: 'hello jared' });
  });
});
