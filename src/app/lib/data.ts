const db = require('./db');
import { Game } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

//fetches games for the dashboard home page
export async function fetchGames() {
  noStore();
  try {
    const result = await db.query(`
        SELECT * FROM games
        ORDER BY GameOrder, Name
        LIMIT 5
        `);
    console.log(`we are in fetch games, this is result:`);
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

//fetches number of games in the list for the dashboard home page
export async function fetchTotalGames() {
  noStore();
  try {
    // console.log(`hit fetchTotalGames`)
    const gameCountPromise = db.query(`
    SELECT COUNT (*) FROM games
    `);

    const [gameCountResult] = await Promise.all([gameCountPromise]);

    const numberOfGames = Number(gameCountResult.rows[0].count);
    // console.log(`this is number of games`, numberOfGames);
    return numberOfGames;
  } catch (error) {
    console.error(`Error trying to fetch number of games: `, error);

    throw error;
  }
}

export async function fetchGamesSupportAddOn() {
  noStore();
  try {

    const [addOnsResult, voiceResult] = await Promise.all([
      db.query(`SELECT COUNT (*) FROM games WHERE SupportsAddons = true`), db.query(`SELECT COUNT (*) FROM games WHERE SupportsVoice = true`)
    ])

    
    const gamesSupportAddons = addOnsResult.rows[0].count;
    const gamesSupportVoice = voiceResult.rows[0].count;
    console.log(gamesSupportAddons);
    return {
      gamesSupportAddons,
      gamesSupportVoice
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data for cards');
  }
}

const ITEMS_PER_PAGE = 12;

//fetch games based on search query, 12 items at a time
export async function fetchFilteredGames(query: string, currentPage: number) {
  noStore();
  // console.log(`Query Parameter: ${query}`);
  console.log(`we are in fetch filtered games`);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const games = await db.query(
      `
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
      games.Slug ILIKE '%' || $1 || '%' 
    ORDER BY GameOrder, Name
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `,
      [query]
    );
    console.log(`query results`, games.rows);
    return games.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered games.');
  }
}

//fetches the number of games in our db, then determines the number of pages we need to display based on the number of items we display per page
export async function fetchGamesPages(query: string) {
  noStore();
  console.log(`we are in fetch games pages for gameslist tab`);

  try {
    const count = await db.query(
      `
    SELECT COUNT(*)
    FROM games
    WHERE
    games.Name ILIKE '%' || $1 || '%' OR
    games.Slug ILIKE '%' || $1 || '%' 
    `,
      [query]
    );

    // console.log(`this is count: `, count.rows)
    const totalPages = Math.ceil(count.rows[0].count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of games.');
  }
}

export async function fetchGameDetails(gameId: any) {
  noStore();
  console.log(`we are in fetch game details for modal`);
  try {
    const gameDetails = await db.query(
      `
    SELECT (*)
    FROM games
    WHERE
    id = $1
    `,
      [gameId]
    );
    // console.log(`this is modal details`, gameDetails.rows);
    return gameDetails.rows;
  } catch (error) {
    console.error('Error fetching modal details');
    throw new Error('Failed to fetch modal details');
  }
}
