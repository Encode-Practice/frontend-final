import { providers,utils, getDefaultProvider, Wallet, Contract} from 'ethers';
let dnftContract = require("../artifacts/contracts/Dnft.sol/DNFT.json");


class BlockchainService {
    
  
    constructor() {
   
        this.dnftContractAddress = process.env.REACT_APP_DNFT_CONTRACT_ADDRESS || ""
        this.provider = this.getProvider();
        this.userWallet = Wallet.createRandom().connect(this.provider);
        this.dnftContractInstance = new Contract(
        this.dnftContractAddress,
        dnftContract.abi
        ).connect(this.userWallet);
      }
    
      getProvider() {
        return getDefaultProvider(process.env.REACT_APP_NETWORK);
      }
    
      async address() {
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
        const networkName = process.env.REACT_APP_NETWORK;
        return networkName;
      }
    
      async number() {
        const number = await this.provider.getBlockNumber();
        return number.toFixed(0);
      }
    
      async dnftAddress() {
        const Address = this.dnftContractAddress;
        return Address;
      }
    
      async tokenName() {
        const tokenName = await this.dnftContractInstance.name();
        return tokenName;
      }
    
      async symbol() {
        const symbol = await this.dnftContractInstance.symbol();
        return symbol;
      }
    
      async supply() {
        const supplyBN = await this.dnftContractInstance.totalSupply();
        const supply = utils.formatEther(supplyBN);
        return supply + ' Tokens';
      }
    
      async tokenBalance() {
        const tokenBalanceBN = await this.dnftContractInstance.balanceOf(
          this.userWallet.address
        );
        const tokenBalance = utils.formatEther(tokenBalanceBN);
        return tokenBalance + ' Tokens';
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