import { createPublicClient, http, parseAbiItem } from 'viem';
import { sepolia } from 'viem/chains'; // 假设你的合约部署在 Sepolia 测试网上，请根据实际情况修改

// 替换为你的 NFTMarket 合约地址和 RPC URL
const NFT_MARKET_CONTRACT_ADDRESS = '0xYourNFTMarketContractAddressHere'; // 替换为实际部署的 NFTMarket 合约地址
const RPC_URL = 'https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY'; // 替换为你的 RPC 提供商 URL 和 API 密钥

// 创建 Viem 客户端
const client = createPublicClient({
  chain: sepolia, // 根据你的链修改
  transport: http(RPC_URL),
});

// 定义你想要监听的事件 ABI
const eventAbis = [
  parseAbiItem('event NFTListed(uint256 indexed listingId, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price)'),
  parseAbiItem('event NFTSold(uint256 indexed listingId, address indexed buyer, address indexed seller, address nftContract, uint256 tokenId, uint256 price)'),
  parseAbiItem('event NFTListingCancelled(uint256 indexed listingId)'), // 如果你也想监听取消事件
];

async function listenToNFTMarketEvents() {
  console.log('开始监听 NFTMarket 合约事件...');

  // 监听 NFTListed 事件
  client.watchEvent({
    address: NFT_MARKET_CONTRACT_ADDRESS,
    event: eventAbis[0], // NFTListed event ABI
    onLogs: logs => {
      logs.forEach(log => {
        console.log('--- NFT 上架事件 ---');
        console.log(`Listing ID: ${log.args.listingId}`);
        console.log(`Seller: ${log.args.seller}`);
        console.log(`NFT Contract: ${log.args.nftContract}`);
        console.log(`Token ID: ${log.args.tokenId}`);
        console.log(`Price: ${log.args.price}`);
        console.log('--------------------');
      });
    },
    onError: error => {
      console.error('监听 NFTListed 事件时发生错误:', error);
    },
  });

  // 监听 NFTSold 事件
  client.watchEvent({
    address: NFT_MARKET_CONTRACT_ADDRESS,
    event: eventAbis[1], // NFTSold event ABI
    onLogs: logs => {
      logs.forEach(log => {
        console.log('--- NFT 购买事件 ---');
        console.log(`Listing ID: ${log.args.listingId}`);
        console.log(`Buyer: ${log.args.buyer}`);
        console.log(`Seller: ${log.args.seller}`);
        console.log(`NFT Contract: ${log.args.nftContract}`);
        console.log(`Token ID: ${log.args.tokenId}`);
        console.log(`Price: ${log.args.price}`);
        console.log('--------------------');
      });
    },
    onError: error => {
      console.error('监听 NFTSold 事件时发生错误:', error);
    },
  });

  // 监听 NFTListingCancelled 事件 (可选)
  client.watchEvent({
    address: NFT_MARKET_CONTRACT_ADDRESS,
    event: eventAbis[2], // NFTListingCancelled event ABI
    onLogs: logs => {
      logs.forEach(log => {
        console.log('--- NFT 上架取消事件 ---');
        console.log(`Listing ID: ${log.args.listingId}`);
        console.log('----------------------');
      });
    },
    onError: error => {
      console.error('监听 NFTListingCancelled 事件时发生错误:', error);
    },
  });
}

listenToNFTMarketEvents().catch(console.error);
