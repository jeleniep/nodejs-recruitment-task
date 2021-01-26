import jwt from "jsonwebtoken"
import { User } from "../models"
import {AuthError} from "../errors"


const authFactory = (secret) => async (username, password) => {
  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    throw new AuthError("invalid username or password");
  }

  return jwt.sign(
    {
      userId: user.id,
      name: user.name,
      role: user.role,
    },
    secret,
    {
      issuer: "https://www.netguru.com/",
      subject: `${user.id}`,
      expiresIn: 30 * 60,
    }
  );
};

export {
  authFactory
}

