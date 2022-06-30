import { NextApiRequest, NextApiResponse } from "next";

import { POSTS_LIST } from "~/constants/mock"
import generateId from "~/utils/generateId";

class Post {
    list: PostType[];

    constructor() {
        this.list = POSTS_LIST;
    }

    getList() {
        return this.list;
    }

    addItem({ userId, title }: PostAddType) {
        const newPost = { userId, title, id: generateId() };
        this.list.unshift(newPost);
    }

    deleteItem({ id }: PostDeleteType) {
        this.list = this.list.filter((post: PostType) => post.id !== id);
    }
}

export const postsList = new Post();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    if (method === "POST") {
        const { userId, title } = body as PostAddType;
        const newPost = { userId, title, id: generateId() };

        postsList.addItem(newPost);
        res.send(newPost);

        return;
    }

    res.send(postsList.getList());
};
