import Pagination from "../../ui/gamelist/pagination"
import Search from "../../ui/gamelist/search";
import GamesTable from "../../ui/gamelist/table";
import { rubik } from "../../ui/fonts";
import { fetchGamesPages } from "../../lib/data";
import { GamesTableSkeleton } from "../../ui/skeletons";
import { Suspense } from "react";
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  //we can access the searchParams from the Search component because Search is a child component of this Page component
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchGamesPages(query);

  return (
    <div className="w-full">
    <div className="flex w-full items-center justify-between">
      <h1 className={`${rubik.className} text-2xl`}>Games</h1>
    </div>
    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <Search placeholder="Search games by name or slug..." />
      {/* <CreateInvoice /> */}
    </div>
     <Suspense key={query + currentPage} fallback={<GamesTableSkeleton />}>
      <GamesTable query={query} currentPage={currentPage} />
    </Suspense>
    <div className="mt-5 flex w-full justify-center">
      <Pagination totalPages={totalPages} />
    </div>
  </div>
  )
}