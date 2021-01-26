import { initializeDb } from "../src/initializers"
import { User, Movies } from "../src/models"
import { addMovie } from "../src/controllers/movies/endpoints"
import httpMocks from 'node-mocks-http';

const {
  API_URL,
  API_KEY
} = process.env;

describe("Movies test", () => {
  let db;

  beforeAll(async () => {
    db = await initializeDb(global.__MONGO_URI__)
    let basicUser = new User({ username: "basic_tom", password: "basic", role: "basic", id: 3, name: 'basic' });
    await basicUser.save();
  });

  test("Add movie", async () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/movies',
      body: {
        title: "Harry Potter"
      }
    });
    request.userDetails =
    {
      userId: 3,
      name: 'basic',
      role: 'basic',
      iat: 1611619287,
      exp: 1611621087,
      iss: 'https://www.netguru.com/',
      sub: '434'
    }

    const response = httpMocks.createResponse();
    await (addMovie(API_URL, API_KEY))(request, response)
    expect(response.statusCode).toEqual(200)
  });

  test("Test if basic user could add at most 5 movies.", async () => {
    let response;
    const titles = ["Tom&Jerry", "Go", "Makbet", "Potop", "It", "Sharknado"]
    for (const title of titles) {
      let request = httpMocks.createRequest({
        method: 'POST',
        url: '/movies',
        body: {
          title
        }
      });
      request.userDetails =
      {
        userId: 3,
        name: 'basic',
        role: 'basic',
        iat: 1611619287,
        exp: 1611621087,
        iss: 'https://www.netguru.com/',
        sub: '434'
      }

      response = httpMocks.createResponse();
      await (addMovie(API_URL, API_KEY))(request, response)
    }
    expect(response.statusCode).toEqual(403)
  });


  afterAll(async () => {
    await db.close()
  });


});