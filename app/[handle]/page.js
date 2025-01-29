import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation"

export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise
    const db = client.db("linktree-clone")
    const collection = db.collection('links')

    // Check if handle already exists
    const item = await collection.findOne({ handle })

    if (!item) {
        return notFound()
    }

    return <div className="flex min-h-screen justify-center items-start pt-32">
        <div className="flex flex-col items-center justify-center gap-3">
            <img src={item.pic} className="w-52 h-52 border-2 rounded-full object-cover" alt="" />
            <span className="font-bold text-lg">@{item.handle}</span>

            {/* <p className="text-center max-w-80 text-black/70 font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum earum possimus quas.</p> */}

            <div className="">
                {item.links.map(item => {
                    return <div
                        key={item.linkText}
                        className="p-4 bg-yellow-200 rounded-lg min-w-56 text-center my-3 font-medium shadow-lg cursor-pointer"
                    >
                        <Link href={item.link}>
                            {item.linkText}
                        </Link>
                    </div>
                })}
            </div>
        </div>
    </div>
}