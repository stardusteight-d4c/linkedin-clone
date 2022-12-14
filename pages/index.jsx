import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState, modalTypeState } from '../atoms/modalAtom'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Modal from '../components/Modal'

import { AnimatePresence } from 'framer-motion'
import Widgets from '../components/Widgets'

import TimeAgo from 'javascript-time-ago'
import pt from 'javascript-time-ago/locale/pt.json'
TimeAgo.addDefaultLocale(pt)

export const getServerSideProps = async () => {
  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=br&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json())

  return {
    props: {
      articles: results.articles,
    },
  }
}

export default function Home({ articles }) {
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
              <Feed />
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
