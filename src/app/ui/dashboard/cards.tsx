import { ListBulletIcon } from '@heroicons/react/24/outline';
import { rubik } from '../fonts';
import { fetchGamesSupportAddOn, fetchTotalGames } from '@/app/lib/data';

const iconMap = {
  games: ListBulletIcon,
};

export default async function CardWrapper() {
  const numberOfGames = await fetchTotalGames();
  const gamesSupportAddons = await fetchGamesSupportAddOn();
  //   console.log(numberOfGames)
  return (
    <>
      <Card title='Total Games' value={numberOfGames} type='games' />
      <Card
        title='Games That Support Addons'
        value={gamesSupportAddons}
        type='games'
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string | boolean;
  type: 'games';
}) {
  const Icon = iconMap[type];
  return (
    <div className='rounded-xl bg-gray-100 p-2 shadow-sm'>
      <div className='flex p-4'>
        {Icon ? <Icon className='h-5 w-5 text-gray-700' /> : null}
        <h3 className={`${rubik.className} ml-2 text-sm`}>{title}</h3>
      </div>
      <p
        className={`${rubik.className} truncate rounded-xl bg-white ox-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
