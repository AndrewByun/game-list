import CardWrapper from "../../ui/dashboard/cards"
import RecentGames from "../../ui/dashboard/recentgames"
import { rubik } from "../../ui/fonts"
import { Suspense } from "react"
import { CardsSkeleton, GamesPreviewSkeleton } from "../../ui/skeletons"
export default function Page(){
    return (
        <div>
    <h1 className={`${rubik.className} mb-4 text-xl md:text-2xl`}>Dashboard Home Page</h1>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<CardsSkeleton/>}>
        <CardWrapper/>
        </Suspense>
        </div>
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1">
        <Suspense fallback = {<GamesPreviewSkeleton/>}>
        <RecentGames/>
        </Suspense>
    </div>
        </div>
    )
}