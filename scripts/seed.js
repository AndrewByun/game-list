

const db = require('../app/lib/db.js');
const {gamedata, users} = require('../app/lib/game-data.js');
const bcrypt = require('bcrypt');


async function seedUsers() {
    try {
      await db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
      // Create the "users" table if it doesn't exist
      const createTable = await db.query(`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `);
  
      console.log(`Created "users" table`);
  
      // Insert data into the "users" table
      const insertedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return db.query(`
          INSERT INTO users (id, name, email, password)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id) DO NOTHING;
        `,[user.id, user.name, user.email, hashedPassword]);
        }),
      );
  
      console.log(`Seeded ${insertedUsers.length} users`);
  
      return {
        createTable,
        users: insertedUsers,
      };
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
  }

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
        await seedUsers(client)
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