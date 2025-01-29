'use client'

import Button from "./Button"
import { useState } from "react"
import { useRouter } from "next/navigation"

const Home = () => {
    const [text, setText] = useState('')
    const router = useRouter()

    const createTree = () => {
        router.push(`/generate?handle=${text}`)
    }

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-[#244f1a] pt-64 px:5 sm:px-10 lg:px-24">
            <div className="flex flex-col">
                <h1 className="text-[#d2e823] font-[900] text-7xl py-3">
                    Everything you are. <br /> In one, simple link <br /> in bio.
                </h1>
                <p className="text-[#d2e823] text-lg py-3">
                    Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
                </p>

                {/* FORM */}
                <div className="flex gap-2 my-7">
                    <input
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className='p-4 rounded-lg w-72 focus:border-2 focus:border-double border-white'
                        type="text"
                        name="" id=""
                        placeholder='yourname' />

                    <span onClick={() => createTree()}>
                        <Button

                            title='Claim your Linktree'
                            style='btn_pink'
                        />
                    </span>

                </div>
            </div>

            <div className="flex items-start justify-center">
                {/* IMAGE HERE*/}
            </div>
        </section>
    )
}

export default Home
