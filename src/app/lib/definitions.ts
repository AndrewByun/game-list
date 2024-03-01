export type Game = {
    ID: number,
    Name: string,
    Slug: string,
    DateModified: string,
    Assets: Array<{
        Id: number,
        GameId: number,
        Name: string,
    }>,
    GameFiles: [],
    
}