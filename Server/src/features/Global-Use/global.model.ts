import { conn } from "../../shared/config/postgres.js";

export const get_followers = async (
    username: string
) => {
    const result = await conn.query(
        ``,
        [username]
    );
    return result.rows[0];
}

export const get_follows = async (
    username: string
) => {
    const result = await conn.query(
        ``,
        [username]
    );
    return result.rows[0];
}

export const get_nposts = async (
    username: string
) => {
    const result = await conn.query(
        ``,
        [username]
    );
    return result.rows[0];
}