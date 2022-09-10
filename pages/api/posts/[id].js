import { ObjectId } from 'mongodb'

const { db } = await connectToDatabase()

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req

  if (method === 'DELETE') {
    try {
      await db.collection('posts').deleteOne({ _id: new ObjectId(id) })
      res.status(200).json({ message: 'The post has been deleted' })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
