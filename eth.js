
Account = null
App = {
   init: async function()  {
    if (App.web3Provider != null) {
      return;
    }
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.error("User denied account access");
      }
    } else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:8545"
      );
    }
    App.web3 = new Web3(App.web3Provider);
    getAddress()
  }
}
  




function getAddress() {
    let i = 1;
    return new Promise((res, rej) => {
        web3.eth.getCoinbase(function(err, account) {
          if (err === null) {
            Account = account;
            $("#address").html("Your Account: " + account);
          }
          i++;
          if (i == 2) {
            res();
          }
        });
      });
}

function cb() {
	console.log("MOney Sent")
}
function getBalance() {
	return web3.eth.getBalance(Account,console.log)	
}
function sendDisBitchSomeMoney(bitchToSend,amount) {
	if(!Account) {
		getAddress().then(() => {
			web3.eth.sendTransaction({from: Account, to:bitchToSend, value: web3.toWei(amount, 'ether'), gasLimit: 21000, gasPrice: 20000000000},cb)
		})
	} else {
		web3.eth.sendTransaction({from: Account, to:bitchToSend, value: web3.toWei(amount, 'ether'), gasLimit: 21000, gasPrice: 20000000000},cb);
	}	
}


console.log("I Loaded")