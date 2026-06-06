import { conn } from "../../shared/config/postgres.js";

export const Login = async(
    username: string
) => {
    const result = await conn.query(
        `SELECT u.user_id, u.user_username, u.user_display_name, u.user_profile_picture_url, c.city_name, co.country_name, co.country_sig
        FROM ca_users u 
            LEFT JOIN ca_city c
                ON u.user_city = c.city_id
            LEFT JOIN ca_subdivision s
                ON c.city_sub = s.subd_id
            LEFT JOIN ca_country co
                ON s.subd_country = co.country_id
        WHERE u.user_username = $1`,
        [username]
    );
    return result.rows[0] ?? null;
};

export const CreateAccount = async(
    username: string,
    displayname: string,
    pswhash: string,
    email: string
) => {
    const result = await conn.query(
        `INSERT INTO ca_users(user_username, user_display_name, user_psw_hash, user_email, user_phone, user_city, user_profile_picture_url)
        VALUES ($1, $2, $3, $4, NULL, NULL, NULL)`,
        [username, displayname, pswhash, email]
    );
    return result.rowCount;
};


/* TOOLS*/
export const CheckUsername = async(
    username:string
) => {
    const result = await conn.query(
        `SELECT user_username 
        FROM ca_users 
        WHERE user_username = $1`,
        [username]
    );
    return (result.rowCount ?? 0) > 0;
};

export const CheckEmail = async(
    email:string
) => {
    const result = await conn.query(
        `SELECT user_email 
        FROM ca_users 
        WHERE user_email = $1`,
        [email]
    );
    return (result.rowCount ?? 0) > 0;
};

export const GetPsw = async(
    username:string
) => {
    const result = await conn.query(
        `SELECT user_psw_hash
        FROM ca_users 
        WHERE user_username = $1`,
        [username]
    );
    return result.rows[0] ?? null;
};