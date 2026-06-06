import { conn } from "../../shared/config/postgres.js";

export const get_user_data = async (
    userID: number
) => {
    const result = await conn.query(
        `SELECT u.user_name, u.user_handle, u.user_phone, c.country_name
        FROM ca_users u
            LEFT JOIN ca_country c
            ON u.user_country = c.country_id
        WHERE u.user_id = $1`,
        [userID]
    );
    return result.rows[0];
}

export const delete_account = async (
    userID: number
) => {
    const result = await conn.query(
        `DELETE FROM ca_users
        WHERE user_id = $1`,
        [userID]
    );
    return result.rowCount;
};

export const update_email = async (
    userID: number,
    email: string
) => {
    const result = await conn.query(
        `UPDATE ca_users
        SET user_email = $2
        WHERE user_id = $1`,
        [userID, email]
    );
    return result.rowCount;
}

export const update_phone = async (
    userID: number,
    phone?: string
) => {
    const result = await conn.query(
        `UPDATE ca_users
        SET user_phone = $2
        WHERE user_id = $1`,
        [userID , phone ?? null]
    );
    return result.rowCount;
};

export const update_country = async(
    userID: number,
    country?: string
) => {
    const result = await conn.query(
        `UPDATE ca_users u
        SET user_country = c.country_id
        FROM ca_country c
        WHERE c.country_name = $3
            AND u.user_id = $1`,
        [userID, country ?? null]
    );
    return result.rowCount;
};


//#region TOOLS

export const Check_Phone = async (
    userID: number,
    phone: string
) => {
    const result = await conn.query(
        `SELECT user_phone
        FROM ca_users
        WHERE user_phone = $2
            AND user_id <> $1`,
        [userID, phone]
    );
    return (result.rowCount ?? 0) > 0;
};

export const Check_Email = async (
    userID: number,
    email: string
) => {
    const result = await conn.query(
        `SELECT user_email
        FROM ca_users
        WHERE user_email = $2
            AND user_id <> $1`,
        [userID, email]
    );
    return (result.rowCount ?? 0) > 0;
};


//#endregion