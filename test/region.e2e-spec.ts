// import { INestApplication, ValidationPipe } from "@nestjs/common";
// import { TestingModule, Test } from "@nestjs/testing";
// import { AppModule } from "../src/app.module";
// import cookieParser from "cookie-parser";
// import * as request from "supertest";
// import { Region } from "../src/region/models/region.model";

// describe("Region E2E test", () => {
//   let app: INestApplication;
//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     app.useGlobalPipes(new ValidationPipe());
//     // app.setGlobalPrefix("api");
//     // app.use(cookieParser());
//     await app.init();

//     const res = await request(app.getHttpServer());

//     // it("/api", async () => {
//     //   return request(app.getHttpServer()).get("/api").expect(404).expect({
//     //     message: "Cannot GET /api/",
//     //     error: "Not Found",
//     //     statusCode: 404,
//     //   });
//     // });
//   });

//   //findAll
//   //   it("/region (GET) --> 200 OK", async () => {
//   //     return request(app.getHttpServer())
//   //       .get("/region")
//   //       .expect("Content-type", /json/)
//   //       .expect(200);
//   //   });
//   //   it("/region (GET) --> 404 NotFound", async () => {
//   //     return request(app.getHttpServer())
//   //       .get("/region")
//   //       .expect("Content-type", /json/)
//   //       .expect(404);
//   //   });

//   //crete
//   it("/region (CREATE) -->201", async () => {
//     return request(app.getHttpServer())
//       .post("/region")
//       .send({ name: "Toshkent" })
//       .expect(201);
//   });

//   afterAll(async () => {
//     await app.close();
//   });
// });
