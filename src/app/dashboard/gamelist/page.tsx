import Pagination from "@/app/ui/gamelist/pagination"
import Search from "@/app/ui/gamelist/search";
import GamesTable from "@/app/ui/gamelist/table";
import { rubik } from "@/app/ui/fonts";
import { fetchGamesPages } from "@/app/lib/data";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchGamesPages(query);

  return (
    // <div className = 'w-full'>
    //   <h1>Games</h1>
    //   <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
    //   <Search placeholder="Search games..."/>
    //   </div>
    //   <div className="flex w-full items-center justify-between">
    //   <div className="mt-5 flex w-full justify-center">
    //   <GamesTable query={query} currentPage={currentPage}/>
    //   </div>
    //   </div>
    //   <div className="flex items-enter justify-between">
    //   <Pagination totalPages={totalPages}/>
    //   </div>
    // </div>
    <div className="w-full">
    <div className="flex w-full items-center justify-between">
      <h1 className={`${rubik.className} text-2xl`}>Games</h1>
    </div>
    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <Search placeholder="Search invoices..." />
      {/* <CreateInvoice /> */}
    </div>
     {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
      <GamesTable query={query} currentPage={currentPage} />
    {/* </Suspense> */}
    <div className="mt-5 flex w-full justify-center">
      <Pagination totalPages={totalPages} />
    </div>
  </div>
  )
}