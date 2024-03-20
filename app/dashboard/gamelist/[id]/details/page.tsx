import { fetchGameDetails } from '../../../../lib/data';
import { Game } from '../../../../lib/definitions';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import Image from 'next/image';
export default async function Page({params}:{params: {id:number}}) {
    const id = params.id
    const gameDetails = await fetchGameDetails(id)
    if (!gameDetails) notFound();
  return (
    <div className='mt-6 flow-root'>
      <div className='overflow-x-auto'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
            <div className='overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0'>
              <div className='md:hidden'>
                <div
                  key={gameDetails.id}
                  className='mb-2 w-full rounded-md bg-white p-4'
                >
                  <div className='flex items-center justify-between border-b pb-4'>
                    <div>
                      <div className='mb-2 flex items-center'>
                        <p>{gameDetails.name}</p>
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
                  </div>
                </div>
              </div>
            </div>
            <table className='hidden min-w-full text-gray-900 md:table'>
              <thead className='rounded-lg text-left text-sm font-normal'>
                <tr>
                  <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                    Game
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    ID
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Slug
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Supports Add Ons
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Supports Voice
                  </th>
                  <th scope='col' className='relative py-3 pl-6 pr-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                  <tr
                    key={gameDetails.id}
                    className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex items-center gap-3'>
                      <Image src={`/gameIcons/${gameDetails.id}.png`}
                        alt ='Game Icon'
                        height={100}
                        width={100}></Image>
                        <p>{gameDetails.name}</p>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {gameDetails.id}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {gameDetails.slug}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {gameDetails.supportsaddons ? 'Yes' : 'No'}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {gameDetails.supportsvoice ? 'Yes' : 'No'}
                    </td>
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex justify-end gap-3'></div>
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
