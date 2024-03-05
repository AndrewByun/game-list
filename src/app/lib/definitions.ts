export type Game = {
    id: number,
    name: string,
    slug: string,
    dateModified: string,
    Assets: Array<{
        Id: number,
        GameId: number,
        Name: string,
    }>,
    GameFiles: [],
    
}