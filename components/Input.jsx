import React from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { modalState, modalTypeState } from '../atoms/modalAtom'

import { motion } from 'framer-motion'
import { Avatar } from '@mui/material'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ArticleIcon from '@mui/icons-material/Article'

const Input = () => {
  const { data: session, status } = useSession()
  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const [modalType, setModalType] = useRecoilState(modalTypeState)

  return (
    <div className="bg-white dark:bg-[#1d2226] text-[#1b1818] dark:text-white/75 rounded-lg p-3 space-y-3 border border-gray-300 dark:border-transparent">
      <div className="flex items-center space-x-2">
        <Avatar
          src={session?.user.image}
          className="!w-10 !h-10 cursor-pointer"
        />
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-100 font-medium w-full text-left"
          onClick={() => {
            setModalOpen(true)
            setModalType('dropIn')
          }}
        >
          Comece um post
        </motion.button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 gap-y-4 md:gap-x-10">
        <button className="inputButton group">
          <PhotoSizeSelectActualIcon className="text-blue-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Foto</h4>
        </button>
        <button className="inputButton group">
          <VideoCameraBackIcon className="text-green-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Vídeo</h4>
        </button>
        <button className="inputButton group">
          <BusinessCenterIcon className="text-blue-300" />
          <h4 className="opacity-80 group-hover:opacity-100">Emprego</h4>
        </button>
        <button className="inputButton group">
          <ArticleIcon className="text-red-400" />
          <h4 className="opacity-80 group-hover:opacity-100 whitespace-nowrap">
            Escrever artigo
          </h4>
        </button>
      </div>
    </div>
  )
}

export default Input
