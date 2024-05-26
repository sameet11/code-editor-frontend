import axios from "axios"
const getFolder = async (pathname: string, token: string) => {
    const rootpath=pathname.split('/')[0]+'/';
    const Response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/folder/?path=${pathname}&rootpath=${rootpath}`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if (Response.status !== 200 || Response.data.error || !Response.data.data) {
        return { error: Response.data.error }
    }
    else {
        return { data: Response.data.data.folder };
    }
}
export default getFolder;