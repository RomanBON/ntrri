import { FC } from "react";

import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { posts, users } from "~/redux/features";

import styles from "./Post.module.css";

export type PostProps = PostDeleteType & PostUserIdType & {
    className?: string;
}

const Post: FC<PostProps> = ({ id, userId, className }) => {
    const dispatch = useAppDispatch();
    const usersAll = useAppSelector(users.slice.getUsers());
    const isPendingDeletePost = useAppSelector(posts.slice.isPendingDeletePost({ id }));
    const currentPost = useAppSelector(posts.slice.getPostById({ id }));
    const currentUser = usersAll.find(user => user.id === userId);

    function handleDeletePost(data: PostDeleteType) {
        dispatch(posts.slice.deleteById(data));
    }

    if (!currentPost || !currentUser) {
        return null;
    }

    return (
        <div className={`${className} ${styles.post}`}>
            <h3 className={styles.userName}>
                {currentUser.name}
            </h3>

            <p>{currentPost.id}: {currentPost.title}</p>

            <button
                onClick={() => handleDeletePost({ id })}
                disabled={isPendingDeletePost}
            >
                Delete
            </button>
        </div>
    );
};

export default Post;
