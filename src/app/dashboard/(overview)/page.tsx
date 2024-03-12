import CardWrapper from "../../ui/dashboard/cards"
import RecentGames from "@/app/ui/dashboard/recentgames"
import { rubik } from "@/app/ui/fonts"
export default function Page(){
    return (
        <div>
    <h1 className={`${rubik.className} mb-4 text-xl md:text-2xl`}>Dashboard Home Page</h1>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CardWrapper/>
        </div>
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1">
        <RecentGames/>
    </div>
        </div>
    )
}