import { initializeDb } from "../src/initializers"
import { User } from "../src/models"
import { authUser } from "../src/controllers/auth/endpoints"
import { checkAuthMiddleware } from "../src/middlewares"
import httpMocks from 'node-mocks-http';


describe("Auth test", () => {
  let db;
  let jwtSecret = "secret"
  beforeAll(async () => {
    db = await initializeDb(global.__MONGO_URI__)
    let basicUser = new User({ username: "basic", password: "basic", role: "basic", id: 2, name: 'basic' });
    await basicUser.save();
    let premiumUser = new User({ username: "premium", password: "premium", role: "premium", id: 1, name: 'premium' });
    await premiumUser.save();

  });

  test("Authorization with wrong username", async () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/auth',
      body: {
        username: "basic2",
        password: "basic"
      }
    });
    var response = httpMocks.createResponse();
    await (authUser(jwtSecret))(request, response)
    expect(response.statusCode).toEqual(401)
  });

  test("Authorization with wrong password", async () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/auth',
      body: {
        username: "basic",
        password: "basic2"
      }
    });
    var response = httpMocks.createResponse();
    await (authUser(jwtSecret))(request, response)
    expect(response.statusCode).toEqual(401)
  });

  test("Authorization with correct Credentials", async () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/auth',
      body: {
        username: "basic",
        password: "basic"
      }
    });
    var response = httpMocks.createResponse();
    await (authUser(jwtSecret))(request, response)
    expect(response._getJSONData().token).toBeDefined()

  });

  test("AuthMiddleware incorrect jwt", async () => {
    const incorrectJwt = "eytest"
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/auth',
      headers: {
        authorization: `Bearer ${incorrectJwt}`
      }
    });
    var response = httpMocks.createResponse();
    await (checkAuthMiddleware(jwtSecret))(request, response)
    expect(response.statusCode).toEqual(403)
  });

  test("AuthMiddleware correct jwt", async () => {
    const requestAuth = httpMocks.createRequest({
      method: 'POST',
      url: '/auth',
      body: {
        username: "basic",
        password: "basic"
      }
    });
    var response = httpMocks.createResponse();
    await (authUser(jwtSecret))(requestAuth, response)
    const jwt = response._getJSONData().token;

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/auth',
      headers: {
        authorization: `Bearer ${jwt}`
      }
    });
    var response = httpMocks.createResponse();
    await (checkAuthMiddleware(jwtSecret))(request, response)
    expect(request.userDetails).toBeDefined()
  });

  afterAll(async () => {
    await db.close()
  });


});
