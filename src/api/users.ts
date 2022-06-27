import client, { ClientResponseType } from "~/api/httpClient";

const Users = {
    get: (): ClientResponseType<UserType[]> =>
        client.get("/users"),
};

export default Users;
