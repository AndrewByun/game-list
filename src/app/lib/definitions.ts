export type Game = {
    id: number,
    name: string,
    slug: string,
    supportsaddons: boolean,
    supportsvoice: boolean,
    dateModified: string,
    Assets: Array<{
        Id: number,
        GameId: number,
        Name: string,
    }>,
    GameFiles: [],
    
}