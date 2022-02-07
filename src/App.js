import { useState, useEffect } from 'react';
import { Contract, ethers, providers } from 'ethers';
import './App.css';
import Wallet from './artifacts/contracts/Wallet.sol/Wallet.json';

const WalletAddress= '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

function App() {

  const [balance, setBalance] = useState(0);
  const [amountSend, setAmountSend] = useState();
  const [amountWithdraw, setAmountWithdraw] = useState();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getBalance();
  }, [])

  async function getBalance(){
    if(typeof window.ethereum !== 'undefined'){
      const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(WalletAddress, Wallet.abi, provider);
      try{
        let overrides = {
          from: accounts[0]
        }
        const data = await contract.getBalance(overrides);
        setBalance(String(data));
      }catch(err){
        setError('Une erreur est survenue.');
      }
    }
  }

  return (
    <div className="App">
      {error && <p className="error">{error}</p>}
      <h2>{balance / 10**18 } eth</h2>
    </div>
  );
}

export default App;
