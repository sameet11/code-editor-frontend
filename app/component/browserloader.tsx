import { Skeleton } from "@/components/ui/skeleton"
const BrowserLoader=()=>{
    return(
        <div className="h-full w-11/12 space-y-2 m-2">
            <Skeleton className="w-full h-10 bg-[#1E1E1E]"/>
            <Skeleton className="h-5/6 w-full bg-[#1E1E1E]"/>
        </div>
    )
}
export default BrowserLoader;