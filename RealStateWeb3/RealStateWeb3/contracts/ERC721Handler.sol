pragma solidity ^0.8.0;

import "./ERC721Token.sol";

contract ERC721Handler {
    ERC721Token private immutable erc721Token;
    address payable private immutable owner;

    constructor(ERC721Token _Erc721Token) {
        owner = payable(msg.sender);
        erc721Token = _Erc721Token;
    }

    struct AboutSeller {
        address payable seller;
        uint256 amount;
        bool completed;
        bool started;
    }
    //Events...
    event PropertySold(
        address indexed seller,
        uint256 indexed amount,
        uint256 token_id,
        address indexed buyer
    );
    event PropertyBought(
        address indexed buyer,
        uint256 indexed amount,
        uint256 token_id,
        address indexed seller
    );
    event Subscriptionevent(
        address indexed subscriber,
        uint256 indexed from,
        uint256 indexed to
    );

    // Mappings....
    mapping(uint256 => AboutSeller) private sellerDetails;

    mapping(address => uint256) private subscription;

    mapping(address => bool) private FreeSubscription;

    //  Functions...

    //Get Mapping data
    function getsellerDetails(uint256 id)
        external
        view
        returns (AboutSeller memory)
    {
        return sellerDetails[id];
    }

    function getSubscription(address _add) external view returns (uint256) {
        return subscription[_add];
    }

    function getFreeSubscription(address _add) external view returns (bool) {
        return FreeSubscription[_add];
    }

    // Subscription
    function Subscription() external payable {
        require(
            msg.value >= 100000000000,
            "You cantnot send less than 10000000 wei"
        );
        uint256 from;
        uint256 to;
        if (subscription[msg.sender] > block.timestamp) {
            from = subscription[msg.sender];
            to = subscription[msg.sender] + (3 * msg.value) / 100000000000;
        } else {
            from = block.timestamp;
            to = block.timestamp + (3 * msg.value) / 100000000000;
        }
        subscription[msg.sender] = to;
        emit Subscriptionevent(msg.sender, from, to);
    }

    // Free subscription...

    function freeSubscription() external {
        require(!FreeSubscription[msg.sender], "Already Taken");
        require(subscription[msg.sender] < block.timestamp, "Already");
        FreeSubscription[msg.sender] = true;
        subscription[msg.sender] = block.timestamp + 2592000;
        emit Subscriptionevent(
            msg.sender,
            block.timestamp,
            block.timestamp + 2592000
        );
    }

    modifier subscriptionRequired() {
        require(
            block.timestamp < subscription[msg.sender],
            " Subscription expired"
        );
        _;
    }

    // Selling Property With Token Id ..
    function sellPropertyWithId(uint256 Token_Id, uint256 Amount)
        external
        subscriptionRequired
    {
        require(!sellerDetails[Token_Id].started, "Already");
        erc721Token.transferFrom(msg.sender, address(this), Token_Id);
        sellerDetails[Token_Id].seller = payable(msg.sender);
        sellerDetails[Token_Id].amount = Amount;
        sellerDetails[Token_Id].started = true;
        sellerDetails[Token_Id].completed = false;
    }

    //Selling Property
    function sellProperty(string calldata uri, uint256 Amount)
        external
        subscriptionRequired
    {
        uint256 Token_Id = erc721Token.MintNft(uri);
        sellerDetails[Token_Id].seller = payable(msg.sender);
        sellerDetails[Token_Id].amount = Amount;
        sellerDetails[Token_Id].started = true;
    }

    // cancelling to sell the property

    function cancelSellingProperty(uint256 Token_Id) external {
        require(
            sellerDetails[Token_Id].seller == msg.sender,
            "You are not the owner of the property"
        );
        erc721Token.transferFrom(address(this), msg.sender, Token_Id);
        sellerDetails[Token_Id].completed = true;
        sellerDetails[Token_Id].started = false;
    }

    function buyProperty(uint256 Token_Id) public payable {
        AboutSeller storage indv = sellerDetails[Token_Id];
        require(!indv.completed, "Already Sold");
        require(msg.value >= indv.amount, "Not enough amount");
        erc721Token.transferFrom(address(this), msg.sender, Token_Id);
        indv.completed = true;
        indv.started = false;
        payable(msg.sender).transfer(indv.amount);
        emit PropertyBought(msg.sender, msg.value, Token_Id, indv.seller);
        emit PropertySold(indv.seller, msg.value, Token_Id, msg.sender);
    }

    // to get the total balance of account
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // towithdraw the ethers from the contract
    function sendEth(uint256 amount) external payable {
        require(msg.sender == owner, "Only owner of contract is allowed");
        owner.transfer(amount);
    }
}
