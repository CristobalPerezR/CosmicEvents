import { conn } from "../../shared/config/postgres.js";

export const get_user_data = async (
    userID: number
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
    return (result.rowCount ?? 0) > 0;
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
    return (result.rowCount ?? 0) > 0;
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
    return (result.rowCount ?? 0) > 0;
};

export const update_city = async(
    userID: number,
    cityID?: number
) => {
    const result = await conn.query(
        `UPDATE ca_users u
        SET user_city = c.city_id
        FROM ca_city c
        WHERE c.city_id = $2
            AND u.user_id = $1`,
        [userID, cityID ?? null]
    );
    return (result.rowCount ?? 0) > 0;
};

export const update_settings = async(
    userID: number,
    enabled: boolean,
    catalogue: boolean,
    nearby_events: boolean,
    new_followers: boolean,
    likes_summary: boolean
) => {
    const result = await conn.query(
        `UPDATE ca_notification_settings
        SET
            ns_enabled = $2,
            ns_catalogue = $3,
            ns_nearby_events = $4,
            ns_new_followers = $5,
            ns_likes_summary = $6
        WHERE ns_user_id = $1`,
        [userID, enabled, catalogue, nearby_events, new_followers, likes_summary]
    );
    return (result.rowCount ?? 0) > 0;
};

export const update_password = async(
    userID: number,
    psw_hash: string
) => {
    const result = await conn.query(
        `UPDATE ca_users
        SET user_psw_hash = $2
        WHERE user_id = $1`,
        [userID, psw_hash]
    );
    return (result.rowCount ?? 0) > 0;
}

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

export const Get_Phone = async(
    userID: number
) => {
    const result = await conn.query(
        `SELECT user_phone
        FROM ca_users
        WHERE user_id = $1`,
        [userID]
    );
    return result.rows[0] ?? null;
}


export const Get_Email = async(
    userID: number
) => {
    const result = await conn.query(
        `SELECT user_email
        FROM ca_users
        WHERE user_id = $1`,
        [userID]
    );
    return result.rows[0] ?? null;
}


export const Get_Settings = async(
    userID: number
) => {
    const result = await conn.query(
        `SELECT ns_enabled, ns_catalogue, ns_nearby_events, ns_new_followers, ns_likes_summary
        FROM ca_notification_settings
        WHERE ns_user_id = $1`,
        [userID] 
    );
    return result.rows[0];
}

export const Get_Password = async(
    userID: number
) => {
    const result = await conn.query(
        `SELECT user_psw_hash
        FROM ca_users
        WHERE user_id = $1`,
        [userID]
    );
    return result.rows[0];
}


//#region GET LOCATION
export const Get_Countries = async() => {
    const result = await conn.query(
        `SELECT country_id, country_name
        FROM ca_country`,
    );
    return result.rows;
}

export const Get_Subdivisions = async(
    country_id: number
) => {
    const result = await conn.query(
        `SELECT subd_id, subd_name
        FROM ca_subdivision
        WHERE subd_country = $1`,
        [country_id]
    );
    return result.rows;
}

export const Get_Cities = async(
    subd_id: number
) => {
    const result = await conn.query(
        `SELECT city_id, city_name
        FROM ca_city
        WHERE city_sub = $1`,
        [subd_id]
    );
    return result.rows;
}