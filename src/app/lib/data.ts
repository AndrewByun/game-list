const db = require('./db');
import { Game } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchGames() {
  noStore();
  try {
    const result = await db.query(`
        SELECT * FROM games
        ORDER BY GameOrder
        LIMIT 5
        `);
    // console.log(`this is result:`)
    // console.log(result);
    const latestGames = result.rows.map((game: Game) => ({
      name: game.name,
      id: game.id,
    }));
    return latestGames;
  } catch (error) {
    console.error(`Error fetching games for dashboard: `, error);
    throw error;
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // console.log(`hit fetchCardData`)
    const gameCountPromise = db.query(`
    SELECT COUNT(*) FROM games
    `);

    const [gameCountResult] = await Promise.all([gameCountPromise]);

    const numberOfGames = Number(gameCountResult.rows[0].count);
    console.log(`this is number of games`, numberOfGames);
    return numberOfGames;
  } catch (error) {
    console.error(`Error trying to fetch number of games: `, error);

    throw error;
  }
}
const ITEMS_PER_PAGE = 12

export async function fetchFilteredGames(query: string, currentPage: number){
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  console.log(`Query Parameter: ${query}`);

  try {
    const games = await db.query(`
    SELECT
      games.Id,
      games.Name,
      games.Slug,
      games.SupportsAddons,
      games.SupportsVoice,
      games.GameOrder,
      games.SupportsNotifications
    FROM games
    WHERE
      games.Name ILIKE '%' || $1 || '%' OR
      games.Slug ILIKE '%' || $2 || '%' 
    ORDER BY GameOrder
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `, [query, query])
    console.log(`query results`, games)
    return games.rows
  } catch(error){
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered games.');
  }
}

export async function fetchGamesPages(query: string) {
  noStore();
  try {
    const count = await db.query(`
    SELECT COUNT(*)
    FROM games
    WHERE
    games.Name ILIKE '%' || $1 || '%' OR
    games.Slug ILIKE '%' || $2 || '%' 
    `, [query, query]);
    
    console.log(`this is count: `, count)
    const totalPages = Math.ceil(count.rows[0].count / ITEMS_PER_PAGE)
    return totalPages;
  } catch(error){
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of games.');
  }
}
