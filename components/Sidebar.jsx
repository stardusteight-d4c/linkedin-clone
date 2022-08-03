import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

import { Avatar } from '@mui/material'
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

const Sidebar = () => {
  const { data: session, status } = useSession()
  
  // function stringAvatar(name) {
  //   return {
  //     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  //   };
  // } // 'Gabriel Sena' -> 'GS'

  return (
    <div className="max-w-lg space-y-2 min-w-max">
      {/* Top */}
      <div className="bg-white dark:bg-[#1d2226] text-[#1b1818] dark:text-white/75 rounded-lg overflow-hidden relative flex flex-col items-center text-center border border-gray-300 dark:border-none">
        <div className="relative w-full h-14">
          <Image src="/banner.png" layout="fill" priority alt="" />
        </div>
        <Avatar
          onClick={signOut}
          src={session?.user.image}
          // {...stringAvatar(`${session?.user.name}`)} 
          className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
        />
        <div className="mt-5 py-4 space-x-0.5">
          <h4 className="cursor-pointer hover:underline decoration-blue-700 underline-offset-1">
            {session?.user.name}
          </h4>
          <p className="text-sm text-[#131313]/80 dark:text-white/75">
            {session?.user.email}
          </p>
        </div>

        <div className="hidden text-sm text-left md:inline dark:text-white/75">
          <div className="sidebarButton font-medium space-y-0.5">
            <div className="flex justify-between space-x-2">
              <h4>Who viewed your profile</h4>
              <span className="text-blue-500">321</span>
            </div>
            <div className="flex justify-between space-x-2">
              <h4>Views of your post</h4>
              <span className="text-blue-500">1,892</span>
            </div>
          </div>
          <div className="sidebarButton">
            <h4 className="text-xs leading-4">
              Access exclusive tools & insights
            </h4>
            <h4 className="font-medium dark:text-white">
              <span className="inline-block w-3 h-3 mr-1 rounded-sm bg-gradient-to-tr from-yellow-700 to-yellow-200" />{' '}
              Try Premium for free
            </h4>
          </div>

          <div className="sidebarButton flex items-center space-x-1.5">
            <BookmarkOutlinedIcon className="!-ml-1" />
            <h4 className="font-medium dark:text-white">My items</h4>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="hidden md:flex bg-white dark:bg-[#1d2226] text-[#1b1818] dark:text-white/75 rounded-lg overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300 dark:border-none">
        <p className="sidebarLink">Groups</p>
        <div className="flex items-center justify-between">
          <p className="sidebarLink">Events</p>
          <AddRoundedIcon className="!w-5" />
        </div>
        <p className="sidebarLink">Followed Hashtags</p>
        <div className="text-center sidebarButton">
          <h4 className="text-sm font-medium dark:text-white">Discover More</h4>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
