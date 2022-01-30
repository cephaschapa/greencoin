import React, {useEffect, useState} from "react";
import {ethers} from 'ethers';

import {contractABI, contractAddress} from '../utils/constants';

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)


    // console.log({provider,signer, transactionContract})
    return transactionContract
}

export const TransactionProvider = ({children}) => {
    const [connectedAccount, setConnectedAccount] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);
     const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const transactionContract =  getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions()
            const t = availableTransactions.map(t=>({
                addressTo: t.receiver,
                addressFrom: t.sender,
                timestamp: new Date(t.timestamp.toNumber() * 1000).toLocaleString(),
                message: t.message,
                keyword: t.keyword,
                amount: parseInt(t.amount._hex)/(10**18)
            }))
            console.log(t)
            setTransactions(t)
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object");
        }
    }

    const checkIfWalletIsConnect = async () =>{
        if(!ethereum) return alert("Please install metamask");

        const accounts = await ethereum.request({
            method: 'eth_accounts'
        })

        try {
            if(accounts.length){
                setConnectedAccount(accounts[0])

                getAllTransactions();
    
                // getAllTransactions
            }else{
                console.log('No accounts found')
            }
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object");
        }   
        console.log(accounts);
    }

    const checkIfTransactionExists = async () => {
        try {
            const transactionContract =  getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount)
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const connectWallet = async () => {
        try{
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            }); 

            setConnectedAccount(accounts[0])
        }catch(error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");

            console.log(ethereum)
            // get data from input
            const {addressTo, amount, keyword, message} = formData;
            const transactionContract =  getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount)
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: connectedAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex,

                }]
            });

            const transactionHash = await transactionContract.addToBlockBlockchain(addressTo, parsedAmount, message, keyword)
            setisLoading(true)
            console.log(`loading - ${transactionHash.hash}`)

            await transactionHash.wait();

            setisLoading(false)
            console.log(`Success - ${transactionHash.hash}`)

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber())
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    useEffect(()=>{
        checkIfWalletIsConnect();
        checkIfTransactionExists();
    }, [])

    return (
        <TransactionContext.Provider value={{connectWallet, connectedAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}
