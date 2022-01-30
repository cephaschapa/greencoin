import React, {useState} from 'react';
import {HiMenuAlt3} from 'react-icons/hi';
import {HiOutlineLockClosed} from 'react-icons/hi';

import logo from '../images/ethereum.png';

const NavbarItem = ({title, classProps}) => {
    return(
        <li className={`mx-4 cursor-pointer ${classProps} hover:bg-slate-100 hover:text-slate-900 p-3 rounded-full transition duration-200`}>
            {title}
        </li>
    )
}

const NavBar = () => {
    const [toggle, setToggle] = useState(false)

    const handleToggle = () => {
        setToggle((initialToggleState)=> !initialToggleState);
        console.log(toggle)
    }
    return(
        <>
            <nav className='w-full p-2 px-4 md:px-32 lg:px-52  blue-glassmorphism rounded-none'>
                
            <div className='flex w-full justify-between items-center'>
                <div className='flex items-center space-x-3'>
                    <img src={logo} alt='logo' className='w-12 md:w-16 cursor-pointer'/>
                    <p className='text-2xl text-white font-thin'>Greencoin Kimora</p>
                </div>
                <ul className='text-white font-thin md:flex hidden list-none flex-row justify-between items-center flex-initial'>
                    {
                        ["Wallet","Market", "Exchange", "About"].map((item, index)=>{
                            return(
                                <NavbarItem key={item+index} title={item} />
                            )
                        })
                    }
                    
                </ul>
                <div className='flex justify-end w-full md:hidden'>
                    <button onClick={handleToggle}>
                        <HiMenuAlt3 className='h-6 w-6 text-white'/>
                    </button>
                </div>
                
            </div>
            {/* <div className='border border-slate-600 w-full mt-5' /> */}
        </nav>
        <div className={`flex py-10 bg-slate-900 w-full absolute transition duration-200 h-auto ${toggle ? 'inline-block': 'hidden'}`}>

            <ul className='flex   flex-col text-white text-center w-full space-y-3'>
                {
                    ["Wallet","Market", "Exchange", "About"].map((item, index)=>{
                        return(
                            <NavbarItem key={item+index} title={item} classProps={'my-2 text-2xl'}/>
                        )
                    })
                }
            </ul>
        </div>
        </>
    )
}

export default NavBar;