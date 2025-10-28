-- 1. Inserir 1000 jogos
INSERT INTO games (name_game, game_code, image_path)
SELECT 
    'Game ' || gs,
    md5(random()::text),
    '/public/images/imagem_padrao_jogo.png'
FROM generate_series(1,1000) AS gs;

-- 2. Inserir 1000 usuários
INSERT INTO users (email_user, username, password_hash, profile_pic_name, profile_pic_path)
SELECT 
    'user' || gs || '@example.com',
    'User' || gs,
    md5(random()::text),
    'imagem_padrao.png',
    '/public/images/imagem_padrao.png'
FROM generate_series(1,1000) AS gs;

-- 3. Inserir 1000 game_rules
INSERT INTO game_rules (id_user_gamerules, game_role, id_games_gamerules, last_access)
SELECT 
    (floor(random() * 1000 + 1))::int, -- usuário aleatório
    substr('ABCDE', (floor(random()*5+1))::int, 1), -- papel aleatório
    (floor(random() * 1000 + 1))::int, -- jogo aleatório
    NOW() - (floor(random()*1000) || ' minutes')::interval
FROM generate_series(1,1000);

-- 4. Inserir 1000 sheets
INSERT INTO sheets (id_game_sheets, name_sheet, current_hitpoints, max_hitpoints, ac, inspiration)
SELECT
    (floor(random() * 1000 + 1))::int, -- jogo aleatório
    'Sheet ' || gs,
    (floor(random() * 50 + 1))::int,
    (floor(random() * 50 + 50))::int,
    (floor(random() * 20 + 1))::int,
    (random() < 0.5)
FROM generate_series(1,1000) AS gs;

-- 5. Inserir 1000 sheets_access
INSERT INTO sheets_access (id_sheet, id_user, owner, last_access)
SELECT 
    (floor(random() * 1000 + 1))::int, -- sheet aleatória
    (floor(random() * 1000 + 1))::int, -- user aleatório
    (random() < 0.1), -- só 10% são donos
    NOW() - (floor(random()*1000) || ' minutes')::interval
FROM generate_series(1,1000);

-- 6. Inserir 1000 tokens
INSERT INTO tokens (id_games_token, id_sheets_token, token_name, show_token_name_check)
SELECT 
    (floor(random() * 1000 + 1))::int, -- jogo aleatório
    (floor(random() * 1000 + 1))::int, -- sheet aleatória
    'Token ' || gs,
    (random() < 0.5)
FROM generate_series(1,1000) AS gs;

-- 7. Inserir 1000 token_bars
INSERT INTO token_bars (id_token_bar, current_value, max_value, data_sheet_link, hex_code)
SELECT 
    (floor(random() * 1000 + 1))::int, -- token aleatório
    (floor(random() * 50 + 1))::int,
    (floor(random() * 50 + 50))::int,
    '/sheet/' || (floor(random()*1000+1))::int,
    substr(md5(random()::text),1,6)
FROM generate_series(1,1000);

-- 8. Inserir 1000 tokens_access
INSERT INTO tokens_access (id_token_access, id_user_access)
SELECT 
    (floor(random() * 1000 + 1))::int, -- token aleatório
    (floor(random() * 1000 + 1))::int -- user aleatório
FROM generate_series(1,1000);
