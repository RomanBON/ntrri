import { FC, useState, FormEvent, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { users, posts } from "~/redux/features";
import Post from "~/components/Post";

import styles from "./Posts.module.css";

const Posts: FC = () => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [currentUser, setCurrentUser] = useState<UserType>();

    const usersAll = useAppSelector(users.slice.getUsers());
    const isSuccessFetchUsers = useAppSelector(users.slice.isSuccessFetchUsers());
    const postsAll = useAppSelector(posts.slice.getPosts());
    const isPendingAddPost = useAppSelector(posts.slice.isPendingAddPost());
    const isSuccessAddPost = useAppSelector(posts.slice.isSuccessAddPost());

    useEffect(() => {
        dispatch(users.slice.get());
    }, []);

    useEffect(() => {
        setCurrentUser(usersAll[0]);
    }, [isSuccessFetchUsers]);

    useEffect(() => {
        if (isSuccessAddPost) {
            setTitle("");
        }
    }, [isSuccessAddPost]);

    function handleChangeSelect(e: { target: HTMLSelectElement; }) {
        const foundUser = usersAll.find(user => user.id === parseInt(e.target.value));

        if (foundUser) {
            setCurrentUser(foundUser);
        }
    }

    function handleChange(e: { target: HTMLInputElement; }) {
        setTitle(e.target.value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!title.trim() || !currentUser) {
            return;
        }

        dispatch(posts.slice.add({ userId: currentUser?.id, title }));
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <select value={currentUser?.id} onChange={handleChangeSelect}>
                    {usersAll.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <input value={title} onChange={handleChange} />
                <button type="submit" disabled={!title || isPendingAddPost}>
                    Add Post
                </button>
            </form>

            {postsAll.map(({ id, userId }) => (
                <Post
                    key={id}
                    id={id}
                    userId={userId}
                    className={styles.post}
                />
            ))}
        </div>
    );
};

export default Posts;
