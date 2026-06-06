-- Execute this one only after db_scheme.sql

CREATE INDEX idx_subdivision_country
ON ca_subdivision(subd_country);

CREATE INDEX idx_city_subdivision
ON ca_city(city_sub);

CREATE INDEX idx_users_city
ON ca_users(user_city);

CREATE INDEX idx_posts_user
ON ca_astro_posts(ap_user_id);

CREATE INDEX idx_comments_post
ON ca_comments(comment_post_id);

CREATE INDEX idx_likes_post
ON ca_likes(like_post_id);

CREATE INDEX idx_follows_following
ON ca_follows(following_id);

CREATE INDEX idx_post_tags_tag
ON ca_post_tags(pt_tag_id);

CREATE UNIQUE INDEX uq_tags_lower
ON ca_tags (lower(tag_text));

CREATE INDEX idx_favorite_points_location
ON ca_favorite_points USING GIST (fp_location);