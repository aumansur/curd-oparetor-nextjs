"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";


const addTopic = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !description) {
            alert("Please enter title and description");
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/api/topics", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ title, description })
            });

            if (res.ok) {
                router.push('/')
            } else {
                throw new Error(" failed to create a topic ")
            }
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div>
            <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                <input
                    className='border border-slate-500 px-8 py-2 '
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder='Topic Tile'
                />
                <input
                    className='border border-slate-500 px-8 py-2 '
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='Topic Description'
                />
                <button type="submit" className='bg-green-600 font-bold text-white py-3 px-6 w-fit'>Add Topic</button>
            </form>
        </div>
    );
};

export default addTopic;