export {};

declare global {
    interface PostType {
        id: number;
        userId: number;
        title: string;
    }

    type PostAddType = Pick<PostType, "userId" | "title">;

    type PostDeleteType = Pick<PostType, "id">;
}
