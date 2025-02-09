'use client'
import {useState} from "react";
import {useRouter} from 'next/navigation';
import authStore from "@/app/stores/auth";
import workspaceStore from "@/app/stores/workspace";

import {useDebouncedCallback} from 'use-debounce';
import {observer} from "mobx-react-lite";
import workspace from "@/app/stores/workspace";
import Navbar from "@/app/components/navbar";

const CreatePage = observer(() => {


    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const debounced = useDebouncedCallback(
        (value: any) => {
            setSlug(value);
            workspaceStore.checkSlug(value)
        },
        1000
    );

    const [error, setError] = useState("");
    const router = useRouter();

    const createWorkspace = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            if(workspaceStore.availableSlug) {
                alert(authStore.user[0]?.id)
                await workspace.createWorkspace(authStore.user[0]?.id,  name, slug)
                router.push("/dashboard");
            }
        } catch (err) {
            setError("Register failed. Check your credentials.");
        }
    };


    return (
        <div className="w-full h-screen bg-gray-100">
            <Navbar />

            <div className="flex justify-center min-h-screen mt-[50px]">
                <form
                    onSubmit={createWorkspace}
                    className="bg-white p-6 rounded-lg shadow-md w-96 h-[500px]"
                >
                    {error && <p className="text-red-500">{error}</p>}
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 mb-2 border rounded focus:outline-none border-gray-300"
                        required
                    />

                    <div>
                        <input
                            type="text"
                            placeholder="Slug"
                            onChange={(e) => debounced(e.target.value)}
                            className={`w-full p-2 mb-2 border rounded focus:outline-none border-gray-300
                            ${
                                slug ? workspaceStore.availableSlug ?
                                         "border-green-500 text-green-600"
                                        : "border-red-500 text-red-600": 'border border-gray-300 text-black'
                            }`}
                            required
                        />

                        <div>
                            {slug && workspaceStore.availableSlug !== null && (
                                <p
                                    className={`font-medium ${
                                        workspaceStore.availableSlug ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                    Slug is {workspaceStore.availableSlug ? "available ✅" : `taken ❌, ${workspace.availableSlugs}`}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-[30px]"
                    >
                        Add New Workspace
                    </button>
                </form>
            </div>
        </div>
    );
})

export default CreatePage;

