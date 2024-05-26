import { Skeleton } from "@/components/ui/skeleton"
import BrowserLoader from "./browserloader"
const PlaygroundLoader=()=>{
    return(
        <div className="h-full w-full flex bg-black p-2">
        <div className="w-1/3 h-full m-2">
            <Skeleton className="h-full w-full bg-[#1E1E1E]"/>
        </div>
        <div className="w-1/3 h-full m-2">
            <Skeleton className="h-1/2 w-full bg-[#1E1E1E]"/>
            <h1 className="text-white">Your container is getting ready</h1>
            <Skeleton className="h-1/3 w-full bg-[#1E1E1E]"/>
        </div>
        <div className="w-1/2 h-full">
            <BrowserLoader/>
        </div>
        </div>
    )
}
export default PlaygroundLoader;