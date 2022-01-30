import logo from '../images/logo.png';

const Footer = () => {
    return(
        <div className='w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer'>
            <div className='w-full flex sm:flex-col justify-between items-center '>
                <div className='flex justify-between items-center'>
                    <img src={logo} alt="logo" className='w-12'/>
                </div>
                <div>
                    <p className='p-3 text-white'>GreenCoin kimora</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;