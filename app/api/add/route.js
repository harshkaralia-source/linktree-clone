import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("linktree-clone")
    const collection = db.collection('links')

    // Check if handle already exists
    const doc = await collection.findOne({ handle: body.handle })

    if (doc) {
        return Response.json({ success: false, message: 'Handle Already Exists!', result: null })
    }

    const result = await collection.insertOne(body)

    return Response.json({ success: true, message: 'Linktree created successfully', result: result })
}