import type { NextApiRequest, NextApiResponse } from "next";
import type { ErrorDto, UserCredentialsDto } from "../../../types";

const userCredentials = async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorDto | UserCredentialsDto>
) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const { email, password } = req.body;
  if (email.length === 0) {
    return res.status(422).json({ message: "Email is required" });
  }
  if (password.length === 0) {
    return res.status(422).json({ message: "Password is required" });
  }
  return res.status(200).json({ email, password });
};

export default userCredentials;
