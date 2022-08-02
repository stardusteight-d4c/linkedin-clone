import React from 'react'
import Image from 'next/image'
import HeaderLink from '../components/HeaderLink'

import ExploreIcon from '@mui/icons-material/Explore'
import GroupIcon from '@mui/icons-material/Group'
import LaptopChromebook from '@mui/icons-material/LaptopChromebook'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'

const Home = () => {
  return (
    <div className="max-w-[1100px] mx-auto px-4 xl:px-0">
      <header className="flex items-center justify-between py-4">
        <div className="relative h-10 w-36">
          <Image
            src="/linkedin-logo.png"
            alt="LinkedIn"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex items-center divide-gray-300 sm:divide-x">
          <div className="hidden pr-4 space-x-8 sm:flex">
            <HeaderLink Icon={ExploreIcon} text="Descobrir" />
            <HeaderLink Icon={GroupIcon} text="Pessoas" />
            <HeaderLink Icon={LaptopChromebook} text="Estudos" />
            <HeaderLink Icon={BusinessCenterIcon} text="Vagas" />
          </div>
          <div className="pl-4">
            <button className="text-blue-700 font-semibold transition-all hover:ring-2 ring-blue-700 hover:border-transparent rounded-full border border-blue-700 px-5 py-1.5">
              Entrar
            </button>
          </div>
        </div>
      </header>
      <main className="flex flex-col items-center mt-8 xl:flex-row">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-blue-800/80 max-w-xl !leading-snug pl-4 xl:pl-0">
            Conheça a sua nova comunidade profissional
          </h1>
          <div className="space-y-4">
            <div className="intent group">
              <h2 className="text-xl text-[#131313]">Procurar emprego</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700 transition-all duration-300 group-hover:-translate-x-3" />
            </div>
            <div className="intent group">
              <h2 className="text-xl text-[#131313]">Encontrar pessoas que você conhece</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700 transition-all duration-300 group-hover:-translate-x-3" />
            </div>
            <div className="intent group">
              <h2 className="text-xl text-[#131313]">Aprender novas competências</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700 transition-all duration-300 group-hover:-translate-x-3" />
            </div>
          </div>
        </div>

        <div className="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-14 right-5">
          <Image src="/art.svg" alt="Flat art" layout="fill" priority />
        </div>
      </main>
    </div>
  )
}

export default Home
