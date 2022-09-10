import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState, modalTypeState } from '../atoms/modalAtom'
import { connectToDatabase } from '../util/mongodb'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Modal from '../components/Modal'

import { AnimatePresence } from 'framer-motion'
import Widgets from '../components/Widgets'

import TimeAgo from 'javascript-time-ago'
import pt from 'javascript-time-ago/locale/pt.json'
TimeAgo.addDefaultLocale(pt)

// Tirar getSession e utilizar um useSession pelo client-side, ou remover a verificação do server-side

export const getServerSideProps = async (context) => {
  // Check if the user is authenticated on the server-side
  // const session = await getSession(context)
  // if (!session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/home',
  //     },
  //   }
  // }
  console.log('server-side loading...')
  // Get posts on SSR
  const { db } = await connectToDatabase()
  const posts = await db
    .collection('posts')
    .find()
    .sort({ timestamp: -1 })
    .toArray()

  // Get Google News API
  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=br&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json())

  
  console.log('posts status:', posts)
  console.log('articles status:', results)
  return {
    props: {
      // session,
      articles: results.articles,
      /* Error: Error serializing `.posts[0]._id` returned from `getServerSideProps` in "/".
        Reason: `object` ("[object Object]") cannot be serialized as JSON. Please only return JSON serializable data types. 
        Ex: _id: ObjectId("62ebbd9c40bc2d74a899a652")
        "_id": { "$oid" : "62ebbd9c40bc2d74a899a652" }
      */
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt,
      })),
    },
  }
}

export default function Home({ posts, articles }) {
  // console.log(posts)
  // console.log(articles)

  const { data: session, status } = useSession()
  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const [modalType, setModalType] = useRecoilState(modalTypeState)
  const router = useRouter()

  // Check if the user is authenticated on the client-side
  if (status === 'loading') return <p>Loading...</p>
  if (status === 'unauthenticated') router.push('/home')
  return (
    <>
      {status === 'authenticated' && (
        <div className="bg-[#f3f2ef] dark:bg-[#0d1117] text-black/80 dark:text-white h-screen overflow-y-scroll md:space-y-6">
          <Head>
            <title>LinkedIn | Feed</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Header />

          <main className="flex justify-center px-4 gap-x-5 sm:px-12">
            <div className="flex flex-col gap-5 md:flex-row gap-x-5">
              <Sidebar />
              <Feed posts={posts} />
            </div>
            <Widgets articles={articles} />
            <AnimatePresence>
              {modalOpen && (
                <Modal
                  handleClose={() => setModalOpen(false)}
                  type={modalType}
                />
              )}
            </AnimatePresence>
          </main>
        </div>
      )}
    </>
  )
}
