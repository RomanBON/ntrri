export {};

declare global {
    interface PostType {
        id: number;
        userId: number;
        title: string;
    }

    type PostUserIdType = Pick<PostType, "userId">;

    type PostAddType = Pick<PostType, "userId" | "title">;

    type PostDeleteType = Pick<PostType, "id">;
}
