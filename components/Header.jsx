import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import HeaderLink from './HeaderLink'
import GroupIcon from '@mui/icons-material/Group'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import { Avatar } from '@mui/material'

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}

const Header = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme, theme } = useTheme()

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

  console.log('Current theme is', theme)
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg">
      {/* Left */}
      <div className="flex items-center w-full max-w-xs space-x-2">
        {mounted && (
          <>
            {resolvedTheme === 'dark' ? (
              <Image
                src="/logosm-light.png"
                width={45}
                height={45}
                alt="Logo Linkend"
              />
            ) : (
              <Image
                src="/logosm-normal.png"
                width={45}
                height={45}
                alt="Logo Linkend"
              />
            )}
          </>
        )}

        <div className="flex items-center space-x-1 bg-zinc-200 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Pesquisar"
            className="flex-grow hidden text-sm bg-transparent md:inline-flex focus:outline-none placeholder-black/70 dark:placeholder-white/75"
          />
        </div>
      </div>
      {/* Right */}

      <div className="flex items-center space-x-6">
        <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
        <HeaderLink Icon={GroupIcon} text="My Network" feed />
        <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} text="Messaging" feed />
        <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
        <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
        <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />

        {/* Dark mode toggle */}
        {mounted && (
          <div
            className={`bg-gray-600 flex items-center px-0.5 cursor-pointer rounded-full h-6 w-12 flex-shrink-0 relative ${
              resolvedTheme === 'dark' ? 'justify-end' : 'justify-start'
            }`}
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            <span className="absolute left-0.5">🌜</span>
            <motion.div
              className="z-40 w-5 h-5 bg-white rounded-full"
              layout
              transition={spring}
            />
            <span className="absolute right-0.5">🌞</span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
