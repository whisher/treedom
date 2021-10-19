import type { NextApiRequest, NextApiResponse } from "next";
import type { ErrorDto, UserDetailsDto } from "../../../types";

const userDetails = async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorDto | UserDetailsDto>
) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const { firstname, lastname } = req.body;
  if (firstname.length === 0) {
    return res.status(422).json({ message: "Firstname is required" });
  }
  if (lastname.length === 0) {
    return res.status(422).json({ message: "Lastname is required" });
  }
  return res.status(200).json({ firstname, lastname });
};

export default userDetails;
