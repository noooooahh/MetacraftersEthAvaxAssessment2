import {useState, useEffect, useRef} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [weight, setWeight] = useState(undefined);
  const [status, setStatus] = useState(undefined);

  const [stocks, setStocks] = useState([]);
  const itemIdRef = useRef(); // Reference for the item ID input
  const newStockRef = useRef(); // Reference for the new stock input
  const purchaseItemIdRef = useRef(); // Reference for the purchase item ID input
  const purchaseQuantityRef = useRef(); // Reference for the purchase quantity input

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

  const getStock = async () => {
    if (atm) {
      const allStocks = [];
      for (let i = 0; i < 3; i++) {
        const [itemName, stock] = await atm.checkStock(i);
        allStocks.push({ name: itemName, stock: stock.toNumber() });
      }
      setStocks(allStocks);
    }
  }

  const updateStock = async () => {
    if (atm) {
      const itemId = itemIdRef.current.value;
      const newStock = newStockRef.current.value;

      if (!itemId || !newStock) {
        alert("Please provide valid item ID and stock quantity.");
        return;
      }

      let tx = await atm.updateStock(itemId,newStock);
      await tx.wait();
      getStock();
    }
  }

  const purchaseItem = async () => {
    if (atm) {
      const itemId = purchaseItemIdRef.current.value;
      const quantity = purchaseQuantityRef.current.value;

      if (!itemId || !quantity) {
        alert("Please provide valid item ID and quantity.");
        return;
      }

      const tx = await atm.purchaseItem(itemId, quantity);
      await tx.wait(); 
      getStock();
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

    
    getStock();
    
    return (
      
      <div>
        <div>
          <h2>Stock Information</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {stocks.map((item, index) => (
              <li key={index}>
                [{index}] {item.name}: {item.stock}
              </li>
            ))}
          </ul>

          <h3>Update Stock</h3>
          <div style={{ marginBottom: 10}}>
            <label>Item ID: </label>
            <input
              type="number"
              placeholder="Enter Item ID"
              ref={itemIdRef}
              min="0"
              max="2"
            />
          </div>
          <div style={{ marginBottom: 10}}>
            <label>New Stock Quantity: </label>
            <input
              type="number"
              placeholder="Enter new stock quantity"
              ref={newStockRef}
              min="0"
            />
          </div>
          <button onClick={updateStock}>
            Update Stock
          </button>
        </div>

        <h3>Purchase Item</h3>
        <div style={{ marginBottom: 10}}>
          <label>Item ID: </label>
          <input
            type="number"
            placeholder="Enter Item ID"
            ref={purchaseItemIdRef}
            min="0"
            max="2"
          />
        </div>
        <div style={{ marginBottom: 10}}>
          <label>Quantity: </label>
          <input
            type="number"
            placeholder="Enter quantity"
            ref={purchaseQuantityRef}
            min="1"
          />
        </div>
        <button onClick={purchaseItem}>
          Purchase Item
        </button>

        <div>
          <p>{status}</p>
        </div>
        
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Grocery Stock Manager</h1></header>
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