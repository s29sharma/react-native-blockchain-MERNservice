pragma solidity ^0.4.17;

contract Lottery{
    address public manager;
    address[] public players;

    function Lottery() public {
        manager=msg.sender;
        //access to msg object in any function that runs in contract
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function random() public view returns(uint) {
        return uint(keccak256(block.difficulty, now, players));

        //block is a global variable
        //now to fetch current time
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players= new address[](0);
    }


    modifier restricted() {
        require(msg.sender==manager);
        _;
    }


    function getPlayers() public view returns(address[]) {
        return players;
    }


    function getBalance() public view returns (uint) {
        return this.balance;
    }
}