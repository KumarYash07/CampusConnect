const protect = require("../middleware/authMiddleware");

const jwt = require("jsonwebtoken");

describe("Auth Middleware", () => {

  test("should return 401 if no token provided", () => {

    const req = {
      headers: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "No Token Provided",
    });

  });

  test("should return 401 for invalid token", () => {

    const req = {
      headers: {
        authorization: "invalid_token",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid Token",
    });

  });

});