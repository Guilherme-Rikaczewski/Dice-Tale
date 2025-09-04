
CREATE OR REPLACE VIEW view_users_info AS
SELECT 
    u.id_user, 
    u.username, 
    u.email_user, 
    u.hours_played,
    COALESCE(p.image_name, def.image_name) AS image_name,
    COALESCE(p.image_path, def.image_path) AS image_path
FROM users u
LEFT JOIN profile_pictures p 
       ON u.id_profile_pic_path = p.id_profile_pic
CROSS JOIN LATERAL (
    SELECT image_name, image_path
    FROM profile_pictures
--  id da imagem padrão
    WHERE id_profile_pic = 1
) def;
