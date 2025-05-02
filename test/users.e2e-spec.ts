// import { INestApplication, ValidationPipe } from "@nestjs/common";
// import { Test, TestingModule } from "@nestjs/testing";
// import { AppModule } from "../src/app.module";
// import * as request from "supertest";
// import { User } from "../src/users/models/user.model";

// describe("Users E2E test", () => {
//   let app: INestApplication;
//   let token: string;
//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     app.useGlobalPipes(new ValidationPipe());
//     await app.init();

//     const res = await request(app.getHttpServer())
//       .post("/auth/sign-in-user")
//       .send({
//         email: "yusufsirojiddinov.5562@gmail.com",
//         password: "99999998y-Y",
//       });

//     token = res.body.token;
//     // console.log("26 token", token);
//   });

//   it("/users (GET) --> 200 OK", async () => {
//     return request(app.getHttpServer())
//       .get("/users")
//       .set("Authorization", `Bearer ${token}`)
//       .expect("Content-Type", /json/)
//       .expect(200);
//   });

//   // it('/users (GET) --> 401 "UnauthorizedException" error ', async () => {
//   //   return request(app.getHttpServer())
//   //     .get("/users")
//   //     .set("Authorization", `Bearer ${token}`)
//   //     .expect("Content-Type", /json/)
//   //     .expect(401);
//   // });

//   // it('/users (GET) --> 404 "NotFoundException" error ', async () => {
//   //   return request(app.getHttpServer())
//   //     .get("/users")
//   //     .set("Authorization", `Bearer ${token}`)
//   //     .expect("Content-Type", /json/)
//   //     .expect(404);
//   // });

//   // it("/users/:id (GET) --> 200", async () => {
//   //   return request(app.getHttpServer())
//   //     .get("users/:id")
//   //     .set(1)
//   //     .expect(200)
//   //     .expect(User);
//   // });

//   // it("/auth/sign-up-user (POST) --> 409", async () => {
//   //   return request(app.getHttpServer())
//   //     .post("/auth/sign-up-user")
//   //     .send({
//   //       first_name: "Yusuf",
//   //       email: "yusufsirojiddinov.5562@gmail.com",
//   //       password: "99999998y-Y",
//   //     })
//   //     .expect("Content-type", /json/)
//   //     .expect(409);
//   // });

//   // it("/auth/sign-up-user (POST) --> 201", async () => {
//   //   return request(app.getHttpServer())
//   //     .post("/auth/sign-up-user")
//   //     .send({
//   //       first_name: "Sodiq",
//   //       email: "muhammadsodiqmuhammadjao0v@gmail.com",
//   //       password: "3128777m-M",
//   //     })
//   //     .expect("Content-type", /json/)
//   //     .expect(201);
//   // });

//   // it("/auth/sign-in-admin (POST) --> 200", async () => {
//   //   return request(app.getHttpServer())
//   //     .post("/auth/sign-in-admin")
//   //     .send({
//   //       email: "muhammadsodiqmuhammadjanov@gmail.com",
//   //       password: "3128777m-M",
//   //     })
//   //     .expect("Content-type", /json/)
//   //     .expect(200);
//   // });

//   // it("/auth/sign-in-admin (POST) --> 401", async () => {
//   //   return request(app.getHttpServer())
//   //     .post("/auth/sign-in-admin")
//   //     .send({
//   //       email: "muhammadsodiqmuhammadjao0v@gmail.com",
//   //       password: "3128777m-M",
//   //     })
//   //     .expect("Content-type", /json/)
//   //     .expect(401);
//   // });

//   // it("/users/:id (PATCH) --> 200", async () => {
//   //   return request(app.getHttpServer())
//   //     .patch("/users/1")
//   //     .send({
//   //       first_name: "OldName",
//   //       email: "update-tsfdgest8@example.com",
//   //       password: "test1234-P",
//   //     })
//   //     .expect("Content-type", /json/)
//   //     .expect(200);
//   // });

//   // it("/users/:id (PATCH) --> 409", async () => {
//   //   return request(app.getHttpServer())
//   //     .patch("/users/5")
//   //     .send({
//   //       email: "yusufsirojiddinov.556@gmail.com",
//   //     })
//   //     .expect("Content-type", /json/)
//   //     .expect(409);
//   // });

//   // it("/users/:id (DELETE) --> 200", async () => {
//   //   return request(app.getHttpServer())
//   //     .delete("/users/2")
//   //     .expect("Content-type", /json/)
//   //     .expect(200);
//   // });

//   // it("/users/:id (DELETE) --> 404", async () => {
//   //   return request(app.getHttpServer())
//   //     .delete("/users/2")
//   //     .expect("Content-type", /json/)
//   //     .expect(404);
//   // });
// });
