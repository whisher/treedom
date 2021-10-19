import type { NextApiRequest, NextApiResponse } from "next";
import type { ErrorDto, UserAddressDto } from "../../../types";

const userAddress = async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorDto | UserAddressDto>
) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const { street, city } = req.body;
  if (street.length === 0) {
    return res.status(422).json({ message: "Street is required" });
  }
  if (city.length === 0) {
    return res.status(422).json({ message: "City is required" });
  }
  return res.status(200).json({ street, city });
};

export default userAddress;
