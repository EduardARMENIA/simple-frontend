"use client";

import { observer } from "mobx-react-lite";
import authStore from "@/app/stores/auth";
import {useEffect} from "react";
import Navbar from "@/app/components/navbar";


const LoginPage = observer(() => {

    return (
        <div>
            <div className="w-full h-screen">
                <Navbar />


                <div className="w-full  max-w-[1200px] mx-auto mt-[50px]">
                    <div className="grid grid-cols-2 gap-4">
                        {authStore.user[0]?.workspaces.map((workspace: any, index: number) => (
                            <div className='w-full rounded-[12px] bg-gray-200 h-[300px] shadow-xl'  key={index}>
                                <p>{workspace._id}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default LoginPage;
