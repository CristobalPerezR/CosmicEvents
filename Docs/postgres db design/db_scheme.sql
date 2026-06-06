CREATE TABLE ca_country(
	country_id smallserial PRIMARY KEY,
	country_name text NOT NULL,
	country_sig bpchar(3) UNIQUE
);

CREATE TABLE ca_subdivision(
	subd_id smallserial PRIMARY KEY,
	subd_name text NOT NULL,
	subd_country smallint NOT NULL,
	CONSTRAINT fk_subdivision_country FOREIGN KEY (subd_country) REFERENCES ca_country(country_id)
);

CREATE TABLE ca_city(
	city_id serial PRIMARY KEY,
	city_name text NOT NULL,
	city_sub smallint NOT NULL,
	CONSTRAINT fk_city_ad FOREIGN KEY (city_sub) REFERENCES ca_subdivision(subd_id),
	CONSTRAINT uq_city_name_subdivision UNIQUE (city_name, city_sub)
);

CREATE TABLE ca_users(
    user_id bigserial PRIMARY KEY,
	user_username text UNIQUE NOT NULL,
	user_display_name text NOT NULL,
	user_psw_hash text NOT NULL,
	user_email text UNIQUE NOT NULL,
	user_phone text CHECK (user_phone ~ '^\+?[0-9]+$'),
	user_city integer NULL,
	user_profile_picture_url text,
	CONSTRAINT fk_users_city FOREIGN KEY (user_city) REFERENCES ca_city(city_id)
);
COMMENT ON COLUMN ca_users.user_username IS 'Unique @username used for mentions and profile URLs';
COMMENT ON COLUMN ca_users.user_display_name IS 'Public display name shown in the application';

CREATE TABLE ca_astro_posts(
	ap_id bigserial PRIMARY KEY,
	ap_user_id bigint NOT NULL,
	ap_image_url text NOT NULL,
	ap_description text CHECK (length(ap_description) <= 2000),
	ap_created_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT fk_astroposts_user_id FOREIGN KEY (ap_user_id) REFERENCES ca_users(user_id) ON DELETE CASCADE
);

CREATE TABLE ca_post_metadata(
	metadata_post_id bigint PRIMARY KEY,
	metadata_iso smallint CHECK (metadata_iso > 0),
	metadata_aperture numeric(5,2) CHECK (metadata_aperture > 0),
	metadata_exptime numeric(10,3) CHECK (metadata_exptime > 0),
	metadata_telescope_model text,
	CONSTRAINT fk_metadata_post_id FOREIGN KEY (metadata_post_id) REFERENCES ca_astro_posts (ap_id) ON DELETE CASCADE
);

CREATE TABLE ca_comments(
	comment_id bigserial PRIMARY KEY,
	comment_user_id bigint NOT NULL,
	comment_post_id bigint NOT NULL,
	comment_content text NOT NULL CHECK (length(comment_content) <= 2000),
	comment_created_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT fk_comments_user_id FOREIGN KEY (comment_user_id) REFERENCES ca_users(user_id) ON DELETE CASCADE,
	CONSTRAINT fk_comments_post_id FOREIGN KEY (comment_post_id) REFERENCES ca_astro_posts(ap_id) ON DELETE CASCADE
);

CREATE TABLE ca_likes(
    like_user_id bigint NOT NULL,
    like_post_id bigint NOT NULL,
    PRIMARY KEY (like_user_id, like_post_id),
	CONSTRAINT fk_likes_user_id FOREIGN KEY (like_user_id) REFERENCES ca_users(user_id) ON DELETE CASCADE,
	CONSTRAINT fk_likes_post_id FOREIGN KEY (like_post_id) REFERENCES ca_astro_posts(ap_id) ON DELETE CASCADE
);

CREATE TABLE ca_follows(
	follower_id bigint NOT NULL,
	following_id bigint NOT NULL,
	PRIMARY KEY (follower_id, following_id),
	CONSTRAINT chk_no_self_follow CHECK (follower_id <> following_id),
	CONSTRAINT fk_follower_id FOREIGN KEY (follower_id) REFERENCES ca_users(user_id) ON DELETE CASCADE,
	CONSTRAINT fk_following_id FOREIGN KEY (following_id) REFERENCES ca_users(user_id) ON DELETE CASCADE
);

CREATE TABLE ca_tags(
	tag_id bigserial PRIMARY KEY,
	tag_text text UNIQUE NOT NULL CHECK (length(tag_text) <= 100)
);

CREATE TABLE ca_post_tags(
	pt_post_id bigint NOT NULL,
	pt_tag_id bigint NOT NULL,
	PRIMARY KEY (pt_post_id, pt_tag_id),
	CONSTRAINT fk_pt_post_id FOREIGN KEY (pt_post_id) REFERENCES ca_astro_posts(ap_id) ON DELETE CASCADE,
	CONSTRAINT fk_pt_tag_id FOREIGN KEY (pt_tag_id) REFERENCES ca_tags(tag_id) ON DELETE CASCADE
);

CREATE TABLE ca_event_type(
	et_id serial PRIMARY KEY,
	et_name text UNIQUE NOT NULL
);

CREATE TABLE ca_astro_events(
	ae_id bigserial PRIMARY KEY,
	ae_name text NOT NULL,

	ae_start timestamptz NOT NULL,
	ae_end timestamptz NOT NULL,

    ae_min_latitude numeric(6,3) NOT NULL,
    ae_max_latitude numeric(6,3) NOT NULL,

	ae_event_type integer NOT NULL,

	CONSTRAINT chk_event_latitudes CHECK ( ae_min_latitude >= -90
    	AND ae_max_latitude <= 90
    	AND ae_min_latitude <= ae_max_latitude),
	CONSTRAINT chk_event_dates CHECK (ae_start < ae_end),
	CONSTRAINT fk_ae_event_type FOREIGN KEY (ae_event_type) REFERENCES ca_event_type(et_id)
);

CREATE TABLE ca_favorite_points(
    fp_id bigserial PRIMARY KEY,
    fp_user_id bigint NOT NULL,
    fp_name text NOT NULL,
    fp_location geography(Point, 4326) NOT NULL,
	fp_elevation_m integer,
	CONSTRAINT uq_user_fav_point_name UNIQUE (fp_user_id, fp_name),
    CONSTRAINT fk_fp_user FOREIGN KEY (fp_user_id) REFERENCES ca_users(user_id) ON DELETE CASCADE
);


-- LAST PART ADDED
CREATE TABLE ca_notification_settings(
	ns_user_id bigint NOT NULL PRIMARY KEY,
	ns_enabled BOOLEAN NOT NULL DEFAULT TRUE,
	ns_catalogue BOOLEAN NOT NULL DEFAULT FALSE,
	ns_nearby_events BOOLEAN NOT NULL DEFAULT TRUE,
	ns_new_followers BOOLEAN NOT NULL DEFAULT FALSE,
	ns_likes_summary BOOLEAN NOT NULL DEFAULT FALSE,
	CONSTRAINT fk_ns_user_id FOREIGN KEY (ns_user_id) REFERENCES ca_users(user_id) ON DELETE CASCADE
)