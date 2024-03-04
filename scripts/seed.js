const db = require('../src/app/lib/db.js');
const {gamedata} = require('../src/app/lib/game-data.js');

async function seedGames () {
    try {
        const insertQuery = await Promise.all(
            gamedata.map(async (game)=>{
                return db.query(`
                INSERT INTO games (ID, Name, Slug, SupportsAddons, SupportsVoice, GameOrder, SupportsNotifications)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                ON CONFLICT (id) DO NOTHING;
              `, [
                game.ID,
                game.Name,
                game.Slug,
                game.SupportsAddons,
                game.SupportsVoice,
                game.Order,
                game.SupportsNotifications,
              ])
            }),
        );
            console.log(`Seeded game data`);

        return {
            games: insertQuery,
        }
    } catch (error) {
        console.error("error seeding games: ", error);
        throw error;
    }
}

async function main() {
    const client =await db.pool.connect();
    try{
        await seedGames(client);
    } finally { 
        client.release();
}
}

main().catch((err)=>{
    console.error(
        `An error occurred while attempting to seed the database`,
        err,
    );
});