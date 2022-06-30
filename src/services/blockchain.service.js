import { providers,utils, JsonRpcProvider, Wallet, Contract, ethers} from 'ethers';
import Web3Modal from 'web3modal'
let dnftContract = require("../../artifacts/contracts/Dnft.sol/DNFT.json");


class BlockchainService {
    
  
    constructor() {
   
        this.dnftContractAddress = process.env.DNFT_CONTRACT_ADDRESS || ""
        this.provider = this.getProvider();
        this.Wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
        this.userWallet = this.Wallet.connect(this.provider);

        this.dnftContractInstance = new Contract(
        this.dnftContractAddress,
        dnftContract.abi,
        this.userWallet
        );
        
      }
    
      getProvider() {
        return new ethers.providers.JsonRpcProvider(process.env.RPC);
      }
    
      async ownerAddress() {
        const address = this.userWallet.address;
        return address;
      }
    
      async etherBalance() {
        const etherBalanceBN = await this.provider.getBalance(
          this.userWallet.address
        );
        const etherBalance = utils.formatEther(etherBalanceBN) + ' ETH';
        return etherBalance;
      }
    
      async networkName() {
        const networkName = process.env.NETWORK;
        return networkName;
      }
    
      async blockNumber() {
        const number = await this.provider.getBlockNumber();
        return number.toFixed(0);
      }
    
      async contractAddress() {
        const Address = this.dnftContractAddress;
        return Address;
      }
    
      async name() {
       
        const name = await this.dnftContractInstance.name();
        return name;
      }
    
      async symbol() {
        console.log(this.dnftContractInstance);
        const symbol = await this.dnftContractInstance.symbol();
        return symbol;
      }
    
      async supply() {
        const supplyBN = await this.dnftContractInstance.totalSupply();
        const supply = utils.formatEther(supplyBN);
        return supply + ' Tokens';
      }
    
      async safeMint(x) {
        // const web3Modal = new Web3Modal()
        // const connection = await web3Modal.connect()
        // const provider = new ethers.providers.Web3Provider(connection)
        // const signer = provider.getSigner()
        // const signerAddress = signer.getAddress();
        await this.dnftContractInstance.safeMint(
          this.userWallet.address
        );
       
        return 'success';
      }

      async tokenBalance() {
        const tokenBalanceBN = await this.dnftContractInstance.balanceOf(
          this.userWallet.address
        );
        const tokenBalance = utils.formatEther(tokenBalanceBN);
        return tokenBalance + ' Tokens';
      }

      async changeInterval(id) {
         await this.dnftContractInstance.changeInterval(id);
        return ' Success';
      }

      async getInterval() {
       const intervalBN = await this.dnftContractInstance.getInterval();
       const interval = intervalBN.toString();
       console.log(intervalBN);
       if(interval) return interval    
     }

     async randomNumber() {
      await this.dnftContractInstance.requestRandom();  
      const randomBN = await this.dnftContractInstance.randomNumber();
      const randomNumber = randomBN.toString();
      console.log(`random number BN ${randomNumber}`);
      if(randomNumber) return randomNumber;
   
    }

    async changeStageRandom(id) {
      await this.dnftContractInstance.changeStageRandom(id)
      console.log('Random change cycle has started');
     return 'success';
   }

   async changeStagePricefeed(id) {
    await this.dnftContractInstance.changeStagePricefeed(id, "changeStagePricefeed");  
    const [rBN, price1BN, price2BN] = await this.dnftContractInstance.randomNumber();
    const r = rBN.toString();
    const price1 = price1BN.toString();
    const price2 = price2BN.toString()
    let feed = `price feed and interval ${r}, ${price1}, ${price2}`
    console.log(feed);
    if(feed) return feed;
 
  }

     async tokenURI(id) {
      const intervalBN = await this.dnftContractInstance.tokenURI(id);
      return intervalBN;
    }

      async changeStageOne(id) {
         await this.dnftContractInstance.changeStageOne(id)
         console.log(' started change stage');
        return 'success';
      }
       
      async getStage(x) {
        const stageBN = await this.dnftContractInstance.getStage(x)
        const stage = stageBN.toString();
        console.log(stageBN);
       return stage;
     }

    //   async signTokenRequest(amount: number) {
    //     const signatureObject = {
    //       address: this.userWallet.address,
    //       amount: amount,
    //     };
    //     const signatureMessage = JSON.stringify(signatureObject);
    //     return await this.userWallet.signMessage(signatureMessage);
    // }   
}


export default new BlockchainService();