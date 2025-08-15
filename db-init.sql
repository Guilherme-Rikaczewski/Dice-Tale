
CREATE TABLE IF NOT EXISTS roles (
    id_role SERIAL PRIMARY KEY,
    role VARCHAR(1) NOT NULL
);

CREATE TABLE IF NOT EXISTS game_images (
    id_game_image SERIAL PRIMARY KEY,
    image_name VARCHAR(50) NOT NULL,
    image_path TEXT NOT NULL,
    image_size_game NUMERIC(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS profile_pictures (
    id_profile_pic SERIAL PRIMARY KEY,
    image_name VARCHAR(50) NOT NULL,
    image_path TEXT NOT NULL,
    image_size NUMERIC(10, 2) NOT NULL
);


CREATE TABLE IF NOT EXISTS games (
    id_game SERIAL PRIMARY KEY,
    id_game_image_games INTEGER,
    name_game VARCHAR(50) NOT NULL, 
    page_link TEXT NOT NULL,
    game_code VARCHAR(12) NOT NULL,
    FOREIGN KEY (id_game_image_games) REFERENCES game_images (id_game_image) 
);

CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL PRIMARY KEY,
    id_profile_pic_path INTEGER,
    email_user VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    hours_played INTEGER NOT NULL,
    password_hash TEXT NOT NULL,
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
    id_user_sheets INT NOT NULL,
    name_sheet VARCHAR(50),
    bio TEXT,
    hitpoints INT,
    ac INT,
    inspiration BOOLEAN,
    movement INT,
    temp_hitpoints INT,
    current_hit_dices INT,
    max_hit_dices INT,
    death_saving_success INT,
    death_saving_failures INT,
    pc INT,
    pp INT,
    pe INT,
    po INT,
    pl INT,
    first_custom_resources_name VARCHAR(50),
    max_first_custom_resources INT,
    current_first_custom_resources INT,
    second_custom_resources_name VARCHAR(50),
    max_second_custom_resources INT,
    current_second_custom_resources INT,
    personallity_notes TEXT,
    ideals TEXT,
    bonds TEXT,
    flaws TEXT,
    passive_wisdom INT,
    acrobatics_level VARCHAR(1) NOT NULL,
    animal_handing_level VARCHAR(1) NOT NULL,
    arcana_level VARCHAR(1) NOT NULL,
    athletics_level VARCHAR(1) NOT NULL,
    deception_level VARCHAR(1) NOT NULL,
    history_level VARCHAR(1) NOT NULL,
    insight_level VARCHAR(1) NOT NULL,
    intimidation_level VARCHAR(1) NOT NULL,
    investigation_level VARCHAR(1) NOT NULL,
    medicine_level VARCHAR(1) NOT NULL,
    nature_level VARCHAR(1) NOT NULL,
    perception_level VARCHAR(1) NOT NULL,
    performance_level VARCHAR(1) NOT NULL,
    persuasion_level VARCHAR(1) NOT NULL,
    religion_level VARCHAR(1) NOT NULL,
    sleight_of_hand_level VARCHAR(1) NOT NULL,
    stealth_level VARCHAR(1) NOT NULL,
    survival_level VARCHAR(1) NOT NULL,
    acrobatics_value INT NOT NULL,
    animal_handing_value INT NOT NULL,
    arcana_value INT NOT NULL,
    athletics_value INT NOT NULL,
    deception_value INT NOT NULL,
    history_value INT NOT NULL,
    insight_value INT NOT NULL,
    intimidation_value INT NOT NULL,
    investigation_value INT NOT NULL,
    medicine_value INT NOT NULL,
    nature_value INT NOT NULL,
    perception_value INT NOT NULL,
    performance_value INT NOT NULL,
    persuasion_value INT NOT NULL,
    religion_value INT NOT NULL,
    sleight_of_hand_value INT NOT NULL,
    stealth_value INT NOT NULL,
    survival_value INT NOT NULL,
    strength_saving_value INT NOT NULL,
    dexterity_saving_value INT NOT NULL,
    constitution_saving_value INT NOT NULL,
    intelligence_saving_value INT NOT NULL,
    wisdom_saving_value INT NOT NULL,
    charisma_saving_value INT NOT NULL,
    strength_saving_check BOOLEAN,
    dexterity_saving_check BOOLEAN,
    constitution_saving_check BOOLEAN,
    intelligence_saving_check BOOLEAN,
    wisdom_saving_check BOOLEAN,
    charisma_saving_check BOOLEAN,
    acrobatics_numeric_bonus INT,
    animal_handing_numeric_bonus INT,
    arcana_numeric_bonus INT,
    athletics_numeric_bonus INT,
    deception_numeric_bonus INT,
    history_numeric_bonus INT,
    insight_numeric_bonus INT,
    intimidation_numeric_bonus INT,
    investigation_numeric_bonus INT,
    medicine_numeric_bonus INT,
    nature_numeric_bonus INT,
    perception_numeric_bonus INT,
    performance_numeric_bonus INT,
    persuasion_numeric_bonus INT,
    religion_numeric_bonus INT,
    sleight_of_hand_numeric_bonus INT,
    stealth_numeric_bonus INT,
    survival_numeric_bonus INT,
    strength_saving_numeric_bonus INT,
    dexterity_saving_numeric_bonus INT,
    constitution_saving_numeric_bonus INT,
    intelligence_saving_numeric_bonus INT,
    wisdom_saving_numeric_bonus INT,
    charisma_saving_numeric_bonus INT,
    FOREIGN KEY (id_game_sheets) REFERENCES games(id_game),
    FOREIGN KEY (id_user_sheets) REFERENCES users(id_user) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS spells (
    id_spell SERIAL PRIMARY KEY,
    id_spell_sheets INTEGER NOT NULL,
    spell_level INTEGER NOT NULL,
    spell_name VARCHAR(50) NOT NULL,
    school VARCHAR(50),
    ritual BOOLEAN,
    casting_time VARCHAR(50),
    range_spell VARCHAR(50),
    target_spell VARCHAR(50),
    components_text TEXT,
    visual_component BOOLEAN,
    vocal_component BOOLEAN,
    material_component BOOLEAN,
    concentration BOOLEAN,
    duration VARCHAR(50),
    spell_attribute VARCHAR(3),
    description TEXT,
    attack_type VARCHAR(1),
    first_damage VARCHAR(50),
    first_damage_type VARCHAR(50),
    second_damage VARCHAR(50),
    second_damage_type VARCHAR(50),
    heal VARCHAR(6),
    damage_heal_attribute_mod VARCHAR(3),
    saving_throw VARCHAR(3),
    class VARCHAR(50),
    FOREIGN KEY (id_spell_sheets) REFERENCES sheets (id_sheet) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS attacks (
    id_attack SERIAL PRIMARY KEY,
    id_attack_sheets INTEGER NOT NULL,
    attack_name VARCHAR(50) NOT NULL,
    range_attack VARCHAR(50),
    attack_mod_roll INTEGER,
    is_proficient BOOLEAN,
    numeric_bonus_roll INTEGER,
    critical_range_attack INTEGER,
    first_damage_attack VARCHAR(50),
    first_damage_attack_type VARCHAR(50),
    first_damage_attack_mod VARCHAR(3),
    first_damage_attack_numeric_bonus INTEGER,
    first_check_critical BOOLEAN,
    second_damage_attack VARCHAR(50),
    second_damage_attack_mod VARCHAR(50),
    second_damage_attack_numeric_bonus INTEGER,
    second_check_critical_attack BOOLEAN,
    is_saving_throw BOOLEAN,
    saving_throw VARCHAR(3),
    saving_throw_cd_mod VARCHAR(3),
    saving_throw_cd_value INTEGER,
    text_effect TEXT,
    FOREIGN KEY (id_attack_sheets) REFERENCES sheets (id_sheet) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS attributes (
    id_attribute SERIAL PRIMARY KEY,
    id_attribute_sheets INTEGER NOT NULL,
    attribute_value_strength INTEGER NOT NULL,
    attribute_value_dexterity INTEGER NOT NULL,
    attribute_value_constitution INTEGER NOT NULL,
    attribute_value_intelligence INTEGER NOT NULL,
    attribute_value_wisdom INTEGER NOT NULL,
    attribute_value_charisma INTEGER NOT NULL,
    FOREIGN KEY (id_attribute_sheets) REFERENCES sheets (id_sheet) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bio (
    id_bio SERIAL PRIMARY KEY,
    id_bio_sheets INTEGER NOT NULL,
    personality_traits TEXT,
    ideals TEXT,
    links TEXT,
    defects TEXT,
    age INTEGER,
    size VARCHAR(50),
    height VARCHAR(10),
    weight VARCHAR(10),
    eyes TEXT,
    skin TEXT,
    hair TEXT,
    character_appearance TEXT,
    allies_and_organizations TEXT,
    additional_features_and_traits TEXT,
    treasures TEXT,
    character_history TEXT,
    FOREIGN KEY (id_bio_sheets) REFERENCES sheets (id_sheet) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS habilities_sheets (
    id_habilities SERIAL PRIMARY KEY,
    id_habilities_sheets INTEGER NOT NULL,
    ability_name VARCHAR(50) NOT NULL,
    ability_source VARCHAR(30),
    ability_source_type VARCHAR(30),
    ability_description TEXT,
    FOREIGN KEY (id_habilities_sheets) REFERENCES sheets (id_sheet) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS itens_sheets (
    id_itens SERIAL PRIMARY KEY,
    id_itens_sheets INTEGER NOT NULL,
    item_name VARCHAR(50) NOT NULL,
    item_is_equipped BOOLEAN NOT NULL DEFAULT FALSE,
    item_have_attack BOOLEAN,
    item_quantity INTEGER,
    item_weight NUMERIC(10, 2) NOT NULL,
    item_description TEXT,
    FOREIGN KEY (id_itens_sheets) REFERENCES sheets (id_sheet) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS proficiency_sheets (
    id_proeficiency SERIAL PRIMARY KEY, 
    id_sheets_proficiency INT NOT NULL,
    proficiency_name VARCHAR(50) NOT NULL,
    proficiency_bonus_level INT NOT NULL,
    proficiency_attribute VARCHAR(3) NOT NULL,
    proficiency_numeric_bonus INT,
    FOREIGN KEY (id_sheets_proficiency) REFERENCES sheets(id_sheet) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS other_skills_sheets (
    id_other_skill SERIAL PRIMARY KEY,
    id_sheets_other_skill INT NOT NULL,
    other_skill_type VARCHAR(50) NOT NULL,
    skill_text TEXT NOT NULL,
    FOREIGN KEY (id_sheets_other_skill) REFERENCES sheets(id_sheet) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tokens (
    id_token SERIAL PRIMARY KEY,
    id_games_token INT NOT NULL,
    id_sheets_token INT,
    token_name VARCHAR(50),
    show_token_name_check BOOLEAN NOT NULL,
    first_bar_current_value INT,
    first_bar_max_value INT,
    first_bar__col_sheet_link VARCHAR(50),
    second_bar_current_value INT,
    second_bar_max_value INT,
    second_bar__col_sheet_link VARCHAR(50),
    third_bar_current_value INT,
    third_bar_max_value INT,
    third_bar__col_sheet_link VARCHAR(50),
    hex_code_first_bar VARCHAR(8) NOT NULL,
    hex_code_second_bar VARCHAR(8) NOT NULL,
    hex_code_third_bar VARCHAR(8) NOT NULL,
    FOREIGN KEY (id_games_token) REFERENCES sheets(id_sheet) ON DELETE CASCADE,
    FOREIGN KEY (id_sheets_token) REFERENCES games(id_game) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tokens_images (
    id_image SERIAL PRIMARY KEY,
    id_token_image INT,
    id_sheet_image INT,
    image_path TEXT NOT NULL,
    FOREIGN KEY (id_token_image) REFERENCES tokens(id_token) ON DELETE CASCADE,
    FOREIGN KEY (id_sheet_image) REFERENCES sheets(id_sheet)
);

CREATE TABLE IF NOT EXISTS tokens_access (
    id_access SERIAL PRIMARY KEY,
    id_token_access INT NOT NULL,
    id_user_access INT NOT NULL,
    FOREIGN KEY (id_token_access) REFERENCES tokens(id_token) ON DELETE CASCADE,
    FOREIGN KEY (id_user_access) REFERENCES users(id_user)
);

CREATE TABLE IF NOT EXISTS recent_sheets (
    id_recent_sheets SERIAL PRIMARY KEY,
    id_user_recent_sheets INT NOT NULL,
    id_sheets_recent_sheets INT,
    FOREIGN KEY (id_user_recent_sheets) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_sheets_recent_sheets) REFERENCES users(id_sheet) ON DELETE CASCADE
);
