-- 1) ROLES
INSERT INTO roles (role)
SELECT chr(65 + (random() * 25)::int)  -- gera letras A-Z
FROM generate_series(1, 200000);

-- 2) GAME_IMAGES
INSERT INTO game_images (image_name, image_path, image_size_game)
SELECT 
    'game_img_' || gs,
    '/images/games/game_' || gs || '.png',
    round((random() * 5000)::numeric, 2)  -- até 5000 KB
FROM generate_series(1, 200000) gs;

-- 3) PROFILE_PICTURES
INSERT INTO profile_pictures (image_name, image_path, image_size)
SELECT 
    'profile_pic_' || gs,
    '/images/profiles/profile_' || gs || '.png',
    round((random() * 3000)::numeric, 2)  -- até 3000 KB
FROM generate_series(1, 200000) gs;

-- 4) GAMES
INSERT INTO games (id_game_image_games, name_game, page_link, game_code)
SELECT 
    (random() * 199999 + 1)::int,  -- id válido de game_images (1 a 200000)
    'Game ' || gs,
    'https://example.com/game/' || gs,
    md5(random()::text)  -- código único
FROM generate_series(1, 200000) gs;

-- 5) USERS
INSERT INTO users (id_profile_pic_path, email_user, username, hours_played, password_hash)
SELECT 
    (random() * 199999 + 1)::int,  -- id válido de profile_pictures (1 a 200000)
    'user' || gs || '@mail.com',
    'username_' || gs,
    (random() * 2000)::int,  -- horas jogadas
    md5(random()::text)      -- senha fake
FROM generate_series(1, 200000) gs;

-- 6) GAME_RULES
INSERT INTO game_rules (id_user_gamerules, id_roles_gamerules, id_games_gamerules)
SELECT
    (random() * 199999 + 1)::int,  -- id válido de users (1 a 200000)
    (random() * 199999 + 1)::int,  -- id válido de roles (1 a 200000)
    (random() * 199999 + 1)::int   -- id válido de games (1 a 200000)
FROM generate_series(1, 200000);

-- Teste rápido
SELECT * FROM users LIMIT 1;
