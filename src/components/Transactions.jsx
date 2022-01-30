import React, {useContext} from 'react';
import { shortenAdress } from '../utils/shortedAddress';

import { TransactionContext } from '../context/TransactionContext';
import dummyData from '../utils/dummyData';
import { parseEther } from 'ethers/lib/utils';
import useFetch from '../Hooks/useFetch';

const TransactionCard = ({addressTo, addressFrom, timestamp, message, keyword, amount, url}) => {
    const gifUrl = useFetch({keyword})
    return (
        <div className='blue-glassmorphism mt-4 flex flex-col p-2 roundd-md hover:shadow-2xl w-full'>
            <div className='w-full mt-3'>
                <div className='flex flex-col justify-start w-full mb-6 p-2'>
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className='text-white text-base'>From: {shortenAdress(addressFrom)}</p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className='text-white text-base'>To: {shortenAdress(addressTo)}</p>
                    </a>
                    <p className='text-white text-base '>
                        Amount: {amount} ETH
                    </p>
                    {
                        message && (
                            <>
                                <br />
                                <p className='text-white text-base py-2'>
                                    Message: {message}
                                </p>
                            </>
                        )
                    }
                    <img src={gifUrl} alt="git" className='w-full h-24 2x:h-96 rounded-md object-cover'/>

                    <div className='bg-black  mx-auto p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl'>
                        <p className='text-white font-bold'>
                            {
                                timestamp
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Transactions = () => {
    const {connectedAccount, transactions} = useContext(TransactionContext)
    // console.log(connectAccount)
    // const {}
    return(
        <div className='flex w-full justify-center items-center 2xl:p-20 gradient-bg-transactions'>
            <div className='flex flex-col md:p-12 py-12 px-4'>
                {
                    connectedAccount ? (
                        <h3 className='text-white text-3xl text-center my-2'>
                            Latest Transactions
                        </h3>
                    ): (
                        <h3 className='text-white text-3xl text-center my-2'>
                            Connect your account to see your latest changes
                        </h3>
                    )
                }

                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 justify-center items-center'>
                    {transactions.reverse().map((transaction, index) => (
                        <TransactionCard key={index} {...transaction}/>
                    ))}
                </div>
                
                {/* Latest Transactons */}
                {/* Connect your account to see latest connections */}
            </div>
        </div>
    )
}

export default Transactions