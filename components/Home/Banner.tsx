"use client"
import {
  useFonts,
  NotoSerif_400Regular,
  NotoSerif_400Regular_Italic,
  NotoSerif_700Bold,
  NotoSerif_700Bold_Italic,
} from '@expo-google-fonts/noto-serif';
import 'typeface-dancing-script';
import { ArrowUpRight } from 'lucide-react';
const Banner = () => {
  return (
    <div className="h-[94%]">
      <div className="flex h-full">
        <div className="w-full h-90 flex lg:flex-col items-center justify-center lg:w-1/2">
          <div className='w-full h-full grid grid-rows-3 lg:ml-[7.5%] lg:w-[75%] lg:h-[75%]'>
            <div className='flex flex-wrap items-end justify-center lg:justify-start text-center md:text-left tablet:items-end laptop:items-start lg:items-end'>
              <h1 className='text-[4rem] font-mediumSerif' style={{ fontFamily: 'NotoSerif_700Bold', fontWeight: 600 }}>Wisdom Preserved.</h1>
            </div>
            <div className='flex items-start justify-center lg:justify-start'>
              <div className='w-3/5 flex flex-col items-center justify-center ml-4 lg:w-3/4 lg:ml-2 mt-4 lg:items-start lg:justify-normal'>
                <div style={{ fontSize: '1.5rem', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontWeight: 500 }} className='inline'>Amplify Your Voice, Unleash Potential: Where Support Meets Smart Insights</div>
                <a href="/sign-up" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 500 }} className="text-[45px] w-fit block mt-6">Start creating! <ArrowUpRight className='hidden lg:inline' size={35} /></a>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div className="w-0 lg:w-1/2 h-90 flex items-center justify-center">
          <img src='/illustration_8.jpg' className='hidden lg:block'></img>
        </div>
      </div>
    </div>
  )
}

export default Banner