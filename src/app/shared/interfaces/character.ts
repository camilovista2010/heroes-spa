export interface ResponseCharacter {
    count: number;
    limit: number;
    offset: number;
    results: Character[];
    total: number;
}

export interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: { path: string; extension: string };
}