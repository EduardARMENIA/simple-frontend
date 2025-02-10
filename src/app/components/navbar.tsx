import authStore from "@/app/stores/auth";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import workspace from "@/app/stores/workspace";


const Navbar = observer(() => {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);

    async function getTotalInformation() {
        try {
            await authStore.retrieveUser();
            if (authStore.user[0]?.id) {
                setUserId(authStore.user[0].id);
                // await workspace.getAllWorkspaces(authStore.user[0].id);
            }
        } catch (e) {
            return;
        }
    }

    useEffect(() => {
        getTotalInformation();
    }, []);

    useEffect(() => {
        if (userId) {
            workspace.getAllWorkspaces(userId);
        }
    }, [userId]);

    async function logout() {
        await authStore.logout()
        router.push('/auth/login')
    }
    return (
      <div className="w-full bg-blue-500 shadow-2xl">
        <div className='w-full h-[60px] flex justify-between max-w-[1200px] mx-auto items-center'>
            <h1 className="text-white font-bold">{authStore.user[0]?.email}</h1>
            <h1 className="text-white font-bold">{authStore.user[0]?.id}</h1>

            <div className='flex gap-[20px]'>
                <h1 className="text-white font-bold cursor-pointer" onClick={() => { router.push('/admin/create')}}>create</h1>
                <h1 className="text-white font-bold cursor-pointer" onClick={ logout }>logout</h1>
            </div>
        </div>
      </div>
    )
});

export default Navbar;