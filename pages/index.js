import {useState, useEffect, useRef} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [weight, setWeight] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const weightRef = useRef(null);
  
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }


  const getWeight = async() => {
    if (atm) {
      setWeight((await atm.getWeight()).toNumber());
    }
  }

  const checkWeight = async() => {
    if (atm) {
      setStatus(await atm.checkWeight());
    }
  }

  const addWeight = async() => {
    if (atm) {
      let tx= await atm.addWeight(weightRef.current.value);
      await tx.wait()
      getWeight();
      checkWeight();
    }
  }

  const removeWeight = async() => {
    if (atm) {
      let tx= await atm.removeWeight(weightRef.current.value);
      await tx.wait()
      getWeight();
      checkWeight();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (weight == undefined) {
      getWeight();
    }

    if (status == undefined) {
      checkWeight();
    }

    return (
      <div>
        <p>Your Weight: {weight}kg</p>

        <div>
          <input
          type="number"
          defaultValue={0}
          placeholder="Enter new weight"
          ref={weightRef}
          />
        </div>

        <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'center'}}>
        <button onClick={addWeight}>Add Weight</button>
        <button onClick={removeWeight}>Remove Weight</button>
        </div>

        <div>
          <p>{status}</p>
        </div>
        
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Weight Checking</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}