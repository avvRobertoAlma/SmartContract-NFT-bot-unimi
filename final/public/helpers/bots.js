

export async function getBotIds(contract, account){
	/* Ottiene il numero dei bot posseduti dall'utente */
	let balance = await contract.methods.balanceOf(account).call();

	/* restituisce tutti gli id dei bot posseduti */
	let ids = []
	for (let i=0; i< balance; i++){
		ids.push(await contract.methods.tokenOfOwnerByIndex(account,i).call())
	}
	return ids
}

export async function getAllBotIds(contract){
	/* Ottiene il numero totale dei bot esistenti */
	let total = await contract.methods.tokenCounter().call()
	let ids = []
	for (let i=0; i<total-1;i++){
		ids.push(i)
	}
	return ids
}

export async function getBotDetail(contract, id){
	let bot = {}
	bot.colors = await contract.methods.botColors(id).call()
	bot.accessories = await contract.methods.botAccessories(id).call()
	bot.owner = await contract.methods.ownerOf(id).call()
    console.log(bot)
	return bot
}

export async function createBot(web3Instance, contract){
    try {
        /* Ottiene l'indirizzo dell'utente */
	const account = await web3Instance.eth.getAccounts()[0];
    // Mint to own address
    contract.methods.mint(account).send({from: account});
    } catch(err){
        console.log(err)
    }
    
}