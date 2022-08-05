/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import Image from 'next/image'

import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'

import Moment from 'react-moment'
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pr-br')

const Widgets = ({ articles }) => {
  return (
    <aside className="hidden space-y-2 xl:inline">
      {/* News */}
      <div className="bg-white dark:bg-[#1d2226] py-2.5 rounded-lg space-y-2 w-11/12 overflow-hidden border border-gray-300 dark:border-transparent">
        <div className="flex items-center justify-between font-bold px-2.5">
          <h4>LinkedIn News</h4>
          <InfoRoundedIcon className="w-5 h-5" />
        </div>

        <div className="space-y-1">
          {articles.map((article, index) => (
            <a href={article.url} target="_blank" key={index}>
              <div className="flex space-x-2 items-center cursor-pointer hover:bg-black/10 dark:hover:bg-black/20 px-2.5 py-1">
                <FiberManualRecordRoundedIcon className="!h-2 !w-2" />
                <div>
                  <h5 className="max-w-xs pr-10 text-sm font-mediu line-clamp-2">
                    {article.title}
                  </h5>
                  <Moment
                    fromNow
                    className="text-xs mt-0.5 dark:text-white/75 opacity-80"
                  >
                    {article.publishedAt}
                  </Moment>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Ads */}
      <div className="bg-white dark:bg-[#1D2226] w-11/12 h-64 rounded-lg sticky top-20 border border-gray-300 dark:border-transparent">
        <div className="relative w-full h-full">
          <Image
            src="/ads.jpg"
            layout="fill"
            objectFit="cover"
            priority
            alt="ads"
            className="rounded-lg"
          />
        </div>
      </div>
    </aside>
  )
}

export default Widgets
