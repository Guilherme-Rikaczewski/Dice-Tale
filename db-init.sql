
CREATE TABLE IF NOT EXISTS roles (
    id_role SERIAL PRIMARY KEY,
    role VARCHAR(1) NOT NULL
);

CREATE TABLE IF NOT EXISTS games (
    id_game SERIAL PRIMARY KEY,
    id_game_image_games INTEGER,
    name_game VARCHAR(100) NOT NULL, 
    page_link TEXT NOT NULL,
    game_code TEXT NOT NULL,
    image_name TEXT NOT NULL,
    image_path TEXT NOT NULL,
    FOREIGN KEY (id_game_image_games) REFERENCES game_images (id_game_image) 
);

CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL PRIMARY KEY,
    id_profile_pic_path INTEGER,
    email_user VARCHAR(256) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    hours_played INTEGER,
    password_hash TEXT NOT NULL,
    profile_pic_name TEXT NOT NULL,
    profile_pic_path TEXT NOT NULL,
    FOREIGN KEY (id_profile_pic_path) REFERENCES profile_pictures (id_profile_pic)
);

CREATE TABLE IF NOT EXISTS game_rules (
    id_gamerules SERIAL PRIMARY KEY,
    id_user_gamerules INTEGER NOT NULL,
    id_roles_gamerules INTEGER NOT NULL,
    id_games_gamerules INTEGER NOT NULL,
    FOREIGN KEY (id_user_gamerules) REFERENCES users (id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_roles_gamerules) REFERENCES roles (id_role) ON DELETE CASCADE,
    FOREIGN KEY (id_games_gamerules) REFERENCES games (id_game) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS sheets (
    id_sheet SERIAL PRIMARY KEY,
    id_game_sheets INT,
    name_sheet TEXT,
    image_sheet_path TEXT NOT NULL DEFAULT '/path/da/imagem/padrao.png',
    current_hitpoints INT,
    max_hitpoints INT,
    ac INT,
    inspiration BOOLEAN DEFAULT FALSE,
    movement TEXT,
    current_temp_hitpoints INT,
    max_temp_hitpoints INT,
    current_hit_dices INT,
    max_hit_dices INT,
    death_saving_success INT,
    death_saving_failures INT,
    passive_wisdom INT, -- sabedoria passiva
    initiative JSONB NOT NULL DEFAULT '{}', -- iniciativa: bonus numericos, destreza,valor total...
    moneys JSONB NOT NULL DEFAULT '{}', -- dinheiros da ficha
    resources jSONB NOT NULL DEFAULT '{}', -- outros recursos
    characteristics JSONB NOT NULL DEFAULT '{}', -- caracteristicas do personagem
    skills JSONB NOT NULL DEFAULT '{}', -- pericias
    saving_throws JSONB NOT NULL DEFAULT '{}', -- testes de resistencia
    spells JSONB NOT NULL DEFAULT '{}', -- magias
    attacks JSONB NOT NULL DEFAULT '{}', -- ataques
    attributes JSONB NOT NULL DEFAULT '{}', -- atributos
    bio JSONB NOT NULL DEFAULT '{}', -- biografias e caracteristicas
    abilities JSONB NOT NULL DEFAULT '{}', -- habilidades
    proficiencies JSONB NOT NULL DEFAULT '{}', -- proeficiencias
    other_skills JSONB NOT NULL DEFAULT '{}', -- outras proeficiencias e idiomas
    items JSONB NOT NULL DEFAULT '{}', -- itens da ficha
    FOREIGN KEY (id_game_sheets) REFERENCES games(id_game)
);

CREATE TABLE IF NOT EXISTS sheets_access (
    id_access SERIAL PRIMARY KEY,
    id_sheet INT NOT NULL,
    id_user INT NOT NULL,
    owner BOOLEAN NOT NULL,
    last_access TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (id_sheet) REFERENCES sheets(id_sheet) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tokens (
    id_token SERIAL PRIMARY KEY,
    id_games_token INT NOT NULL,
    id_sheets_token INT,
    image_token_path TEXT NOT NULL DEFAULT '/path/da/imagem/padrao.png',
    token_name VARCHAR(50),
    show_token_name_check BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_games_token) REFERENCES games(id_game) ON DELETE CASCADE,
    FOREIGN KEY (id_sheets_token) REFERENCES sheets(id_sheet) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS token_bars (
    id_bar SERIAL PRIMARY KEY,
    id_token_bar INT NOT NULL,
    current_value INT,
    max_value INT,
    data_sheet_link VARCHAR(50),
    hex_code VARCHAR(8) NOT NULL,
    FOREIGN KEY (id_token_bar) REFERENCES tokens(id_token) ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS tokens_access (
    id_access SERIAL PRIMARY KEY,
    id_token_access INT NOT NULL,
    id_user_access INT NOT NULL,
    FOREIGN KEY (id_token_access) REFERENCES tokens(id_token) ON DELETE CASCADE,
    FOREIGN KEY (id_user_access) REFERENCES users(id_user) ON DELETE CASCADE
);

