import Image from 'next/image';
import { ViewDetails } from './buttons';
// import InvoiceStatus from '@/app/ui/invoices/status';
// import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredGames } from '../../lib/data';
import { Game } from '../../lib/definitions';
import Link from 'next/link';

export default async function GamesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const games = await fetchFilteredGames(query, currentPage);

  // const searchParams = useSearchParams();
  // const pathName = usePathname();
  // const { replace } = useRouter();
  // const handleClick = () => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set('page', '1');
  //   replace(`${pathName}?${params.toString()}`);
  // }
  // console.log(`Games: `, games)
  return (
    <div className='mt-6 flow-root'>
      <div className='overflow-x-auto'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
            <div className='overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0'>
              <div className='md:hidden'>
                {games?.map((game: Game) => (
                //  <Link
                //  key={game.id}
                //  href={`/dashboard/gamelist/[id]`}
                //  as={`/dashboard/gamelist/${game.id}`}
                //  onClick={handleClick}
                //  >
                  <div
                  key={game.id}
                  className='mb-2 w-full rounded-md bg-white p-4'
                  >
                    <div className='flex items-center justify-between border-b pb-4'>
                      <div>
                        <div className='mb-2 flex items-center'>
                          <Image
                            src={`/gameIcons/${game.id}.png`}
                            className='mr-2 rounded-full'
                            width={28}
                            height={28}
                            alt={`${game.name}'s profile picture`}
                          />
                          <p>{game.name}</p>
                        </div>
                        {/* <p className="text-sm text-gray-500">{game.email}</p> */}
                      </div>
                    </div>
                    <div className='flex w-full items-center justify-between pt-4'>
                      <div>
                        {/* <p className="text-xl font-medium">
                        {formatCurrency(game.amount)}
                      </p> */}
                        {/* <p>{formatDateToLocal(game.date)}</p> */}
                      </div>
                      <div className='flex justify-end gap-2'></div>
                      <ViewDetails id={game.id} />
                    </div>
                  </div>
                  // </Link>

                ))}
              </div>
            </div>
            <table className='hidden min-w-full text-gray-900 md:table'>
              <thead className='rounded-lg text-left text-sm font-normal'>
                <tr>
                  <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                    Game
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Supports Add Ons
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Supports Voice
                  </th>
                  
                  {/* <th scope='col' className='px-3 py-5 font-medium'>
                    game order
                  </th> */}
                  <th scope='col' className='relative py-3 pl-6 pr-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {games?.map((game: Game) => (
                  // <Link key = {game.id} href = {{pathname: `/dashboard/gamelist/${game.id}`, query: {querydata: game}}}>
                    <tr
                      key={game.id}
                      className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                    >
                      <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                        <div className='flex items-center gap-3'>
                          <Image
                            src={`/gameIcons/${game.id}.png`}
                            className='rounded-full'
                            width={28}
                            height={28}
                            alt={`${game.name}'s profile picture`}
                          />
                          <p>{game.name}</p>
                        </div>
                      </td>
                      <td className='whitespace-nowrap px-3 py-3'>
                        {game.supportsaddons ? 'Yes' : 'No'}
                      </td>
                      <td className='whitespace-nowrap px-3 py-3'>
                        {game.supportsvoice ? 'Yes' : 'No'}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ViewDetails id={game.id} />
                    </div>
                    </td>
                      {/* <td className='whitespace-nowrap px-3 py-3'>
                        {game.gameorder}
                      </td> */}
                      {/* <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                        <div className='flex justify-end gap-3'></div>
                      </td> */}
                    </tr>
                    // </Link>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
