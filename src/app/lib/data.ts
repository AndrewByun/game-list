const db = require('./db');
import { Game } from "./definitions";


export async function fetchGames() {
  try {
    const result = await db.query(`
        SELECT * FROM games
        ORDER BY GameOrder
        LIMIT 5
        `);
    const latestGames = result.rows.map((game: Game) => ({
      name: game.name,
      id: game.id
    }));
    return latestGames;
  } catch (error) {
    console.error(`Error fetching games for dashboard: `, error);
    throw error;
  }
}


export async function fetchCardData (){
  try {
    // console.log(`hit fetchCardData`)
    const gameCountPromise =  db.query(`
    SELECT COUNT(*) FROM games
    `)

    const [gameCountResult] = await Promise.all([
      gameCountPromise,
    ])

    
    const numberOfGames = Number(gameCountResult.rows[0].count)
    console.log(`this is number of games`, numberOfGames);
    return numberOfGames;
  } catch(error) {

    console.error(`Error trying to fetch number of games: `, error);

    throw error;
  }
}