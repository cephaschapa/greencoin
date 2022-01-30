import React, {useState, useContext} from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import {BsInfo, BsInfoCircle} from 'react-icons/bs';


import { TransactionContext } from '../context/TransactionContext';

import { Loader } from '.';
import { shortenAdress } from '../utils/shortedAddress';

const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );


const Welcome = () => {
    const [addressTo, setaddressTo] = useState('');
    const [amount, setamount] = useState('');
    const [keyword, setkeyword] = useState('');
    const [message, setmessage] = useState('');

    const {connectWallet, connectedAccount, formData, setFormData, handleChange, sendTransaction, isLoading} = useContext(TransactionContext)
  
    
    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message } = formData;
    
        e.preventDefault();
    
        if (!addressTo || !amount || !keyword || !message) return;
    
        sendTransaction();
      };

    return(
        <div className='flex w-full justify-center items-center'>
            <div className='flex md:flex-row flex-col justify-between md:px-32 lg:px-52 w-full py-12 px-5'>
                <div className='flex justify-center flex-1 md:justify-start flex-col md:mr-10 mt-10'>
                    <h1 className='text-3xl text-center md:text-left sm:text-5xl text-white  py-1'>Trusted and Secure ethereum <br/> and crypto Xchange</h1>
                    <p className='text-center md:text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>Buy and sell cryptocurrencies easily on greencoin</p>
                    {
                        !connectedAccount ? (
                            <button className='p-3 mx-auto text-white rounded-2xl py-6 w-52 cursor-pointer my-5 bg-gradient-to-r from-slate-900 to-slate-600' type='button' onClick={connectWallet}>
                                Connect Wallet
                            </button>
                        ) : (
                            <button className='p-3 mx-auto md:mx-0 text-white rounded-2xl py-6 w-52 cursor-pointer my-5 bg-gradient-to-r from-slate-900 to-slate-600' type='button' onClick={connectWallet}>
                                Learn More
                            </button>
                        )
                    }

                    
                </div>
                <div className='flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10'>
                    <div className='p-5 justify-end items-start flex-col rounded-xl h-52 w-full relative z-10 lg:w-96 my-5 gradient-bg-services border-2 border-slate-500'>
                        <div className='flex justify-between flex-col h-full'>
                            <div className='flex justify-between items-start'>
                                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-start'>
                                    <SiEthereum className='h-8 w-8 text-white' />
                                </div>
                                <BsInfoCircle className='h-6 w-6 text-white'/>
                            </div>
                            
                            <div className='p-3 rounded-2xl blue-glassmorphism'>
                                <p className='text-white  font-light text-sm'>
                                    {
                                        shortenAdress(connectedAccount)
                                    }
                                </p>
                                <p className='text-white font-semibold text-lg mt-1'>
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='lg:pt-20  border-2 border-slate-500 sm:w-96 lg:w-2/3 md:-mt-20 w-full flex flex-col justify-start blue-glassmorphism p-3'>
                        {/*  */}
                      
                            {/* <input
                                placeholder="Address To"
                                value={addressTo}
                                type="text"
                                name="addressTo"
                                onChange={(e) => {
                                    setaddressTo(e.target.value)
                                    handleChange(e, e.target.name)
                                }}
                                className="my-2 w-full p-3 rounded-2xl outline-none bg-transparent text-white border-2 border-slate-600 text-sm"
                            />
                            <input
                                placeholder="Amount"
                                value={amount}
                                type="number"
                                step="0.0001"
                                name='amount'
                                onChange={(e) => {
                                    setaddressTo(e.target.value)
                                    handleChange(e, e.target.name)
                                }}
                                className="my-2 w-full p-3 rounded-2xl outline-none bg-transparent text-white border-2 border-slate-600 text-sm"
                            />
                            <input
                                placeholder="Keyword"
                                value={keyword}
                                type="text"
                                name='keyword'
                                onChange={(e) => {
                                    setaddressTo(e.target.value)
                                    handleChange(e, e.target.name)
                                }}
                                className="my-2 w-full p-3 rounded-2xl outline-none bg-transparent text-white border-2 border-slate-600 text-sm"
                            />
                            <input
                                placeholder="Message"
                                value={message}
                                type="text"
                                name='message'
                                onChange={(e) => {
                                    setaddressTo(e.target.value)
                                    handleChange(e, e.target.name)
                                }}
                                className="my-2 w-full p-3 rounded-2xl outline-none bg-transparent text-white border-2 border-slate-600 text-sm"
                            /> */}
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
            {
                            isLoading ? (
                                <Loader />
                            ): (
                                <button 
                                    type='button'
                                    onClick={handleSubmit}
                                    className='text-white w-full mt-2 roun p-2 py-5 bg-slate-600 uppercase rounded-2xl cursor-pointer'
                                    >Send Now
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;