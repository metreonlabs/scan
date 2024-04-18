const Utils = {
    chains: [
        // =========== MAINNET =========== //

        { id: 97, name: "BSC", image: "/images/bsc.png", symbol: "BNB", chainHexId: "0x61", rpc: "https://bsc-dataseed4.defibit.io", coin: "Binance Smart Chain", scan: 'https://testnet.bscscan.com' },
        { id: 80001, name: "Polygon", image: "/images/polygon.png", symbol: "MATIC", chainHexId: "0x13881", rpc: "https://polygon-polygon.blockpi.network/v1/rpc/public", coin: "Polygon", scan: 'https://polygon.polygonscan.com' },
        { id: 462, name: "Areon", image: "/images/areon.png", symbol: "AREA", chainHexId: "0x1CE", rpc: "https://mainnet-rpc.areon.network", coin: "TAREA", scan: 'https://areonscan.com' },

        // =========== TESTNET =========== //

        { id: 97, name: "BSC", image: "/images/bsc.png", symbol: "BNB", chainHexId: "0x61", rpc: "https://bsc-dataseed4.defibit.io", coin: "Binance Smart Chain", scan: 'https://testnet.bscscan.com' },
        { id: 80001, name: "Polygon", image: "/images/polygon.png", symbol: "MATIC", chainHexId: "0x13881", rpc: "https://polygon-polygon.blockpi.network/v1/rpc/public", coin: "Polygon", scan: 'https://polygon.polygonscan.com' },
        { id: 462, name: "Areon", image: "/images/areon.png", symbol: "AREA", chainHexId: "0x1CE", rpc: "https://mainnet-rpc.areon.network", coin: "TAREA", scan: 'https://areonscan.com' },
    ],
    chain: function (id) {
        return this.chains.find(chain => chain.id == id);
    },
    currencies: [
        // =========== MAINNET =========== //

        // usdt
        { id: 1, code: 1, chain: 97, name: "Tether USD", symbol: "USDT", image: "/images/usdt.png", address: '0xFE57951e4aA44B274e681678efcf2dFB9e9B34aA' },
        { id: 2, code: 1, chain: 80001, name: "Tether USD", symbol: "USDT", image: "/images/usdt.png", address: '0x9252C5aC33132959954b7e783A1043394Dd1b083' },
        { id: 3, code: 1, chain: 462, name: "Tether USD", symbol: "USDT", image: "/images/usdt.png", address: '0x6Ad70B09ab3e4aB416F6D48D3F77Fbc2b07f0C0e' },

        // usdc
        { id: 4, code: 2, chain: 97, name: "Circle USD", symbol: "USDC", image: "/images/usdc.png", address: '0x1cf6234A8aEE6Ec0B28Fac9Abdd2A9ddB15d0F85' },
        { id: 5, code: 2, chain: 80001, name: "Circle USD", symbol: "USDC", image: "/images/usdc.png", address: '0x81297d0e83488A4eFC074041488bB4a9B5713a0E' },
        { id: 6, code: 2, chain: 462, name: "Circle USD", symbol: "USDC", image: "/images/usdc.png", address: '0x95a8ca97Eb9DB7dE25D0A8D2F5eea6AB5123d3c0' },

        // area
        { id: 7, code: 3, chain: 97, name: "Wrapped Areon", symbol: "WAREA", image: "/images/areon.png", address: '0x201761F8bA8bfF62345594Ee7cbc280Ae2DA19AC' },
        { id: 8, code: 3, chain: 80001, name: "Wrapped Areon", symbol: "WAREA", image: "/images/areon.png", address: '0xe61C27B23970D90Bb6A0425498D41cC990B8F517' },
        { id: 9, code: 3, chain: 462, name: "Areon", symbol: "AREA", image: "/images/areon.png", address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', isNative: true },

        // bnb
        { id: 10, code: 4, chain: 97, name: "BNB", symbol: "BNB", image: "/images/bsc.png", address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', isNative: true },
        { id: 11, code: 4, chain: 462, name: "Wrapped BNB", symbol: "WBNB", image: "/images/bsc.png", address: '0xE52Fe45e9a911198C95883C82e3580A9aadF0C7e' },

        // matic
        { id: 12, code: 5, chain: 80001, name: "Polygon", symbol: "MATIC", image: "/images/polygon.png", address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', isNative: true },
        { id: 13, code: 5, chain: 462, name: "Wrapped Polygon", symbol: "WMATIC", image: "/images/polugon.png", address: '0xA2c51C976875836874308FAAa86e37Ac4c19e545' },

        // =========== TESTNET =========== //

        // usdt
        { id: 1, code: 1, chain: 97, name: "Tether USD", symbol: "USDT", image: "/images/usdt.png", address: '0xFE57951e4aA44B274e681678efcf2dFB9e9B34aA' },
        { id: 2, code: 1, chain: 80001, name: "Tether USD", symbol: "USDT", image: "/images/usdt.png", address: '0x9252C5aC33132959954b7e783A1043394Dd1b083' },
        { id: 3, code: 1, chain: 462, name: "Tether USD", symbol: "USDT", image: "/images/usdt.png", address: '0x6Ad70B09ab3e4aB416F6D48D3F77Fbc2b07f0C0e' },

        // usdc
        { id: 4, code: 2, chain: 97, name: "Circle USD", symbol: "USDC", image: "/images/usdc.png", address: '0x1cf6234A8aEE6Ec0B28Fac9Abdd2A9ddB15d0F85' },
        { id: 5, code: 2, chain: 80001, name: "Circle USD", symbol: "USDC", image: "/images/usdc.png", address: '0x81297d0e83488A4eFC074041488bB4a9B5713a0E' },
        { id: 6, code: 2, chain: 462, name: "Circle USD", symbol: "USDC", image: "/images/usdc.png", address: '0x95a8ca97Eb9DB7dE25D0A8D2F5eea6AB5123d3c0' },

        // area
        { id: 7, code: 3, chain: 97, name: "Wrapped Areon", symbol: "WAREA", image: "/images/areon.png", address: '0x201761F8bA8bfF62345594Ee7cbc280Ae2DA19AC' },
        { id: 8, code: 3, chain: 80001, name: "Wrapped Areon", symbol: "WAREA", image: "/images/areon.png", address: '0xe61C27B23970D90Bb6A0425498D41cC990B8F517' },
        { id: 9, code: 3, chain: 462, name: "Areon", symbol: "AREA", image: "/images/areon.png", address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', isNative: true },

        // bnb
        { id: 10, code: 4, chain: 97, name: "BNB", symbol: "BNB", image: "/images/bsc.png", address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', isNative: true },
        { id: 11, code: 4, chain: 462, name: "Wrapped BNB", symbol: "WBNB", image: "/images/bsc.png", address: '0xE52Fe45e9a911198C95883C82e3580A9aadF0C7e' },

        // matic
        { id: 12, code: 5, chain: 80001, name: "Polygon", symbol: "MATIC", image: "/images/polygon.png", address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', isNative: true },
        { id: 13, code: 5, chain: 462, name: "Wrapped Polygon", symbol: "WMATIC", image: "/images/polugon.png", address: '0xA2c51C976875836874308FAAa86e37Ac4c19e545' },
    ],
    currencyAddress: function (address) {
        return this.currencies.find(currency => currency.address.toLowerCase() == address.toLowerCase());
    },
    toDate: function (timestamp) {
        var a = new Date(timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        return {
            month: month,
            date: date,
            hour: hour,
            min: min
        };
    }
};

export default Utils;