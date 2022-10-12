<div align="center">
    <h1>Tokens</h1>
</div>

This repository contains the information about tokens across multiple chains in the "list" and "key-value" formats. The list of supported chains as well as the number of tokens is coherent within each file in the <a href='./content'>content</a> directory. The main source of data collection is <a href="https://www.coingecko.com/en/api/documentation">Coingecko</a>, however it can be blended with data from other sources.

The information provided about each token:

- `address` - non-checksummed address
- `name` - full name of the token
- `symbol` - token symbol
- `decimals` - token decimals set in the contract
- `icon` - token logo URL

NB: <b>all of the info points</b> mentioned above may vary across different chains.
