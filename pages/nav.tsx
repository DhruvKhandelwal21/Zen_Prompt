"use client"
import React, {useState,useEffect} from 'react'
import Image from 'next/image'
import logo from '../public/assets/images/logo.svg'
import menu from '../public/assets/icons/menu.svg'
import { isMobile } from 'react-device-detect'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
const Nav = () => {
    const {data: session} = useSession();
    const [showDropDown, setshowDropDown] = useState(false)
    const [providers,setProviders] = useState(null);
    useEffect(() => {
      (async () => {
        const res: any = await getProviders();
        setProviders(res);
      })();
    }, []);
    
  return (
    <div className='mt-2 mb-3 w-full flex-between'>
         <Image src={logo} alt="logo" className='object-contain' width={30} />
         <p className='logo_txt'>Promptopia</p>
        
            {session?.user ? ( <div>
              <Image src={menu} alt="menu" className='sm:hidden cursor-pointer' width={20} height={20} onClick={()=>{setshowDropDown(!showDropDown)}} />
              {showDropDown && (
                <div className='absolute right-0 flex flex-col gap-2 px-4 py-3 mr-2 bg-white rounded-md'>
                 <button className='black_btn'>Create Post</button>
                 <button className='outline_btn' onClick={()=> signOut()}>Sign Out</button>
                </div>
              )}
            </div>):(
                <div className='sm:hidden'>
                <>
                {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
                </>
                </div>
            )}
          
       
          {session?.user ? (
            <div className='sm:flex hidden gap-2'>
              <button onClick={()=>{}} className='black_btn'>Create Post</button>
              <button onClick={()=> signOut()} className='outline_btn'>Sign Out</button>
            </div>
          ):(
            <div className='sm:flex hidden'>
              <>
              {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
              </>
            </div>
          )}

    </div>
  )
}

export default Nav