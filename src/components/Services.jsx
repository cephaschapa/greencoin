import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from 'react-icons/bi' ;
import { RiHeart2Fill } from 'react-icons/ri';

const Card = ({color, title, icon, subtitle}) =>{
    return(
        <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
            <div className={`w-10 ${color} h-10 rounded-full flex justify-center items-center`}>
                {icon}
            </div>
            <div className="ml-5 flex flex-col flex-1">
                <h1 className="mt-2 text-white text-lg">{title}</h1>
                <p className="mt-2 text-white md:w-9/12">{subtitle}</p>
            </div>
        </div>
    )
}

const Services = () => {
    return(
        <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className="text-white text-3xl sm:text-5xl text-gradient">Services that we <br/>
                        continue to improve
                    </h1>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-start items-center">
                <Card color="bg-[#2952e3]" title="Security Guaranteed" icon={<BsShieldFillCheck fontSize={21} className="text-white"/>} subtitle="Security is guaranteed. We always maintain privacy and quality."/>
                <Card color="bg-green-600" title="Best Exchange Rate" icon={<BiSearchAlt fontSize={21} className="text-white"/>} subtitle="Security is guaranteed. We always maintain privacy and quality."/>
                <Card color="bg-yellow-600" title="Fastest Transactions" icon={<RiHeart2Fill fontSize={21} className="text-white"/>} subtitle="Security is guaranteed. We always maintain privacy and quality."/>
            </div>
        </div>
    )
}

export default Services;