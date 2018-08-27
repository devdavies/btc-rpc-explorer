var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

module.exports = {
	name:"Davies",
	logoUrl:"/img/logo/dvs.png",
	siteTitle:"Davies Explorer",
	nodeTitle:"Davies Full Node",
	nodeUrl:"https://daviescoin.io/",
	demoSiteUrl: "https://explorer.daviescoin.io",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/hashstream/pools/master/pools.json",
	],
	maxBlockWeight: 4000000,
	currencyUnits:[
		{
			name:"DVS",
			multiplier:1,
			default:true,
			values:["", "dvs", "DVS"],
			decimalPlaces:8
		},
		{
			name:"lite",
			multiplier:1000,
			values:["lite"],
			decimalPlaces:5
		},
		{
			name:"photon",
			multiplier:1000000,
			values:["photon"],
			decimalPlaces:2
		},
		{
			name:"litoshi",
			multiplier:100000000,
			values:["litoshi", "lit"],
			decimalPlaces:0
		}
	],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHash: "f0f28695c029b93bfc0f7b75fa85cb742573b12a221fd9ec02f4207308f021ef",
	genesisCoinbaseTransactionId: "f36a59601eb663a4aed9c4c3290dd619f94b62737bccafd6b13263fbddeb97cf",
	genesisCoinbaseTransaction: {
		"txid":"f36a59601eb663a4aed9c4c3290dd619f94b62737bccafd6b13263fbddeb97cf",
		"hash":"f36a59601eb663a4aed9c4c3290dd619f94b62737bccafd6b13263fbddeb97cf",
		"blockhash":"f0f28695c029b93bfc0f7b75fa85cb742573b12a221fd9ec02f4207308f021ef",
		"version":1,
		"locktime":0,
		"size":176,
		"vsize":176,
		"time":1529517603,
		"blocktime":1529517603,
		"vin":[
			{
				"prev_out":{
					"hash":"0000000000000000000000000000000000000000000000000000000000000000",
					"n":0
				},
				"coinbase":"04ffff001d01042932302f4a756e2f323031382044656d6f63726174696320436f696e20666f722074686520576f726c64"
			}
		],
		"vout":[
			{
				"value":"50.00000000",
				"n":0,
				"scriptPubKey":{
					"hex":"040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9 OP_CHECKSIG",
					"type":"pubkey",
					"reqSigs":1,
					"addresses":[
						"Ecn1Wjgv2EbYvGBEExPF7uvaNrc648XZU1"
					]
				}
			}
		]
	},
	historicalData: [
		// {
		// 	type: "blockheight",
		// 	date: "2011-10-07",
		// 	blockHeight: 0,
		// 	blockHash: "12a765e31ffd4059bada1e25190f6e98c99d9714d334efa41a195a7e7e04bfe2",
		// 	summary: "The Litecoin genesis block.",
		// 	alertBodyHtml: "This is the first block in the Litecoin blockchain.",
		// 	referenceUrl: "https://medium.com/@SatoshiLite/satoshilite-1e2dad89a017"
		// },
		// {
		// 	type: "tx",
		// 	date: "2017-05-10",
		// 	txid: "ce385e55fb2a73fa438426145b074f08314812fa3396472dc572b3079e26e0f9",
		// 	summary: "First SegWit transaction.",
		// 	referenceUrl: "https://twitter.com/satoshilite/status/862345830082138113"
		// },
		// {
		// 	type: "blockheight",
		// 	date: "2011-10-13",
		// 	blockHeight: 448,
		// 	blockHash: "6995d69ce2cb7768ef27f55e02dd1772d452deb44e1716bb1dd9c29409edf252",
		// 	summary: "The first block containing a (non-coinbase) transaction.",
		// 	referenceUrl: ""
		// },
		// {
		// 	type: "link",
		// 	date: "2016-05-02",
		// 	url: "/rpc-browser?method=verifymessage&args%5B0%5D=Ler4HNAEfwYhBmGXcFP2Po1NpRUEiK8km2&args%5B1%5D=G7W57QZ1jevRhBp7SajpcUgJiGs998R4AdBjcIgJq5BOECh4jHNatZKCFLQeo9PvZLf60ykR32XjT4IrUi9PtCU%3D&args%5B2%5D=I%2C+Charlie+Lee%2C+am+the+creator+of+Litecoin&execute=Execute",
		// 	summary: "Litecoin's Proof-of-Creator",
		// 	referenceUrl: "https://medium.com/@SatoshiLite/satoshilite-1e2dad89a017"
		// }
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v2/ticker/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return 0;// responseBody[0].price_usd;
			}
			
			return -1;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(50) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 840000);

		return eras[index];
	}
};
