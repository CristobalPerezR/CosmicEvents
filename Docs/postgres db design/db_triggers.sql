-- Execute this one only after db_scheme.sql
CREATE FUNCTION create_notification_settings()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO ca_notification_settings (ns_user_id)
    VALUES (NEW.user_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_created
AFTER INSERT ON ca_users
FOR EACH ROW
EXECUTE FUNCTION create_notification_settings();