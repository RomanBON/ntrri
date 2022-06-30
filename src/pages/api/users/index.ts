import { NextApiRequest, NextApiResponse } from "next";
import { USERS_LIST } from "~/constants/mock"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.send(USERS_LIST);
};
