import { fetchGames } from "@/app/lib/data"
import {rubik} from '../fonts';
import { Game } from "@/app/lib/definitions";
import Image from "next/image";

export default async function RecentGames () {
   const latestGames = await fetchGames();
   console.log(`logging from inside GamesPreview component`);
//    console.log(latestGames)
   return (
    <div className="flex w-full flex-col md:col-span-4">
            <h2 className={`${rubik.className} mb-4 text-xl md:text-2xl`}>Games</h2>
            <div className="flex-grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                <div className="bg-white px-6">
                    {latestGames.map((game: Game, i: number) => (
                        <div key={game.id} className={`border-b ${i !== 0 ? 'border-gray-50' : ''} py-4 flex flex-col items-center`}>
                            <h3 className="text-lg font-semibold mb-2">{game.name}</h3>
                            <Image
                            src={`/gameIcons/${game.id}.png`}
                            alt="Icon for game"
                            width={80}
                            height={80}
                            /> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
   )
}