import { NextApiRequest, NextApiResponse } from "next";

import { postsList } from "./index"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;


    if (method !== "DELETE") {
        res.status(405).send({ message: "Only DELETE requests allowed" })
        res.send({});

        return;
    }

    const { id } = query as { id: string };
    postsList.deleteItem({ id: parseInt(id, 10) });

    res.send(postsList);
};
