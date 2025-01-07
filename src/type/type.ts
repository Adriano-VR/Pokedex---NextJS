export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Ability[];
    forms: Form[];
    game_indices: GameIndex[];
    held_items: HeldItem[];
    location_area_encounters: string;
    moves: Move[];
    species: Species;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
};

export type Ability = {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
};

export type Form = NamedAPIResource;

export type GameIndex = {
    game_index: number;
    version: NamedAPIResource;
};

export type HeldItem = {
    item: NamedAPIResource;
    version_details: VersionDetail[];
};

export type Move = {
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
};

export type Species = NamedAPIResource;

export type Sprites = {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other?: OtherSprites;
    versions?: { [key: string]: { [key: string]: Sprite } };
};

export type Stat = {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
};

export type Type = {
    slot: number;
    type: NamedAPIResource;
};

export type NamedAPIResource = {
    name: string;
    url: string;
};

export type VersionDetail = {
    rarity: number;
    version: NamedAPIResource;
};

export type VersionGroupDetail = {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
};

export type OtherSprites = {
    dream_world: Sprite;
    home: Sprite;
    'official-artwork': Sprite;
};

export type Sprite = {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
};