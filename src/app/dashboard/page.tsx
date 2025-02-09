"use client";

import { observer } from "mobx-react-lite";
import Navbar from "@/app/components/navbar";
import { FaTrash } from 'react-icons/fa';
import workspaceStore from "@/app/stores/workspace";

const DashboardPage = observer(() => {
    return (
        <div>
            <div className="w-full min-h-screen">
                <Navbar />

                <div className="w-full  max-w-[1200px] mx-auto my-[50px]">
                    <div className="grid grid-cols-2 gap-4">
                        {workspaceStore.workspaces.map((workspace: any, index: number) => (
                            <div className='w-full rounded-[12px] bg-gray-200 h-[300px] shadow-xl flex justify-center items-center relative' key={index}>
                                <div>
                                    <div className='flex'>_id: <p>{workspace._id}</p></div>
                                    <div className='flex'>userId: <p>{workspace.userId}</p></div>
                                    <div className='flex'>slug: <p>{workspace.slug}</p></div>
                                    <div className='flex'>name: <p>{workspace.name}</p></div>
                                    <div className='flex'>createdAt: <p>{workspace.createdAt}</p></div>
                                </div>
                                <FaTrash
                                    className='absolute top-2 right-2 text-red-500 cursor-pointer'
                                    onClick={() => workspaceStore.deleteWorkspace(workspace._id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default DashboardPage;
