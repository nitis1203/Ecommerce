import { useEffect, useState } from 'react';
import abi from "./contractJson/PaymentContract.json";
import { ethers } from "ethers";
import Buy from './components/Buy';
import './App.css';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    Contract: null
  });
  const [account, setAccount] = useState('Not Connected');

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x0aFe6BF48111dd11dfCe16e6956Bd424972FaF86";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        const account = await ethereum.request({
          method: "eth_requestAccounts"
        });

        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const Contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(Contract);
        setState({ provider, signer, Contract });

        // Add "accountsChanged" event listener
        ethereum.on("accountsChanged", handleAccountsChanged);
      } catch (error) {
        alert(error);
      }
    };

    // Define the event handler for "accountsChanged"
    const handleAccountsChanged = (newAccounts) => {
      setAccount(newAccounts[0]);
    };

    // Execute the template function
    template();

    // Remove the "accountsChanged" event listener when the component unmounts
    return () => {
      const { ethereum } = window;
      if (ethereum) {
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  return (
    <div className='App'>
      Connected Account: {account}
      <Buy state={state} contractAddress="0xa6c3E6eAE081C4232979Da8e747c79f3c32f0418" />

    </div>
  );
}

export default App;
