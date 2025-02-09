import authStore from "@/app/stores/auth";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";



const Navbar = observer(() => {
    async function GetUserInformation() {
        await authStore.retrieveUser();
    }

    useEffect(() => {
        GetUserInformation()
        console.log("Page Rendered !!");
    }, [])

    return (
      <div className="w-full bg-blue-500 shadow-2xl">
        <div className='w-full h-[60px] flex justify-between max-w-[1200px] mx-auto items-center'>
            <h1 className="text-3xl font-bold">{JSON.stringify(authStore.user[0]?.email)}</h1>
            <h1 className="text-3xl font-bold">logout</h1>
        </div>
      </div>
    )
});

export default Navbar;