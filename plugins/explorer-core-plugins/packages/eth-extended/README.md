# @alethio/explorer-plugin-eth-extended

Alethio Explorer core plugin with content from the Alethio data pipeline. Used by aleth.io. Works together with the @alethio/explorer-plugin-eth-common core plugin.

See [cms-plugin-tool](https://github.com/Alethio/cms-plugin-tool) for install instructions.

## Configuration

The structure of the config object is described [here](../../src/app/eth-extended/EthExtendedPluginConfig.ts).

See [config.sample.json](config.sample.json) for an example.

Refer to [pages.sample.json](pages.sample.json) for a `pages` structure example.

## Exported entities

### Pages

| Page URI | Created context shape | Module slots | Description | Implementation |
| --- | --- | --- | --- | --- |
| page://aleth.io/uncle | { uncleHash } | content | Uncle details page | [unclePage](../../src/app/shared/page/uncle/unclePage.ts) |
| page://aleth.io/cm | { txHash, validationIndex } | sidebar, content | Contract Message page | [cmPage](../../src/app/eth-extended/page/cm/cmPage.tsx) |
| page://aleth.io/dashboard | {} | content | Main dashboard page | [dashboardPage](../../src/app/eth-extended/page/dashboard/dashboardPage.ts) |

### Context

| Context URI | Generated context shape | Placed in context | Description | Implementation |
| --- | --- | --- | --- | --- |
| context://aleth.io/extended/tx/parentBlock | { txHash, blockNumber } | { txHash } | Adds the parent block to the current TX context | [txParentBlockContext](../../src/app/shared/context/txParentBlockContext.ts) |
| context://aleth.io/extended/tx/parentBlock?optional | { txHash, blockNumber? } | { txHash } | Adds the parent block to the current TX context, if it exists (not a pending TX) | [txParentBlockOptionalContext](../../src/app/eth-extended/context/txParentBlockOptionalContext.ts) |
| context://aleth.io/cm/parent | { txHash, validationIndex, parentValidationIndex, blockNumber } |  { txHash, validationIndex } | Adds the parent contract message or TX to the current context | [cmParentContext](../../src/app/eth-extended/context/cmParentContext.ts) |

### Modules

| Module URI | Context shape | Module slots | Description | Implementation | Options |
| --- | --- | --- | --- | --- | --- |
| module://aleth.io/block/basic | { blockNumber } | confirmations | Block basic data fields |[blockBasicModule](../../src/app/shared/module/block/blockBasic/blockBasicModule.tsx) | N/A |
| module://aleth.io/block/txs | { blockNumber } | N/A | Transactions in given block, in two visualizations (grid and heat map) | [blockTxsModule](../../src/app/shared/module/block/blockTxs/blockTxsModule.ts) | N/A |
| module://aleth.io/block/advanced | { blockNumber } | extraData | Block advanced data fields |[blockAdvancedModule](../../src/app/shared/module/block/blockAdvanced/blockAdvancedModule.tsx) | N/A |
| module://aleth.io/block/logs-bloom | { blockNumber } | N/A | Block logs bloom |[blockLogsBloomModule](../../src/app/shared/module/block/blockLogsBloom/blockLogsBloomModule.tsx) | N/A |
| module://aleth.io/uncle/details | { uncleHash } | N/A | Uncle data fields | [uncleDetailsModule](../../src/app/shared/module/uncle/uncleDetails/uncleDetailsModule.ts) | N/A |
| module://aleth.io/tx/basic | { txHash } | blockConfirmations | Transaction basic data fields | [txBasicModule](../../src/app/shared/module/tx/txBasic/txBasicModule.tsx) | N/A |
| module://aleth.io/tx/advanced | { txHash } | N/A | Transaction advanced data fields | [txAdvancedModule](../../src/app/shared/module/tx/txAdvanced/txAdvancedModule.tsx) | N/A |
| module://aleth.io/tx/summary | { txHash } | N/A | Accordion with contract messages, log events, token transfers etc. |[txSummaryModule](../../src/app/eth-extended/module/tx/txSummary/txSummaryModule.ts) | N/A |
| module://aleth.io/tx/payload" | { txHash } | N/A | Decoded tx payload | [txPayloadModule](../../src/app/shared/module/tx/txPayload/txPayloadModule.ts) | N/A |
| module://aleth.io/account/details | { accountHash } | N/A | Account data fields | [accountDetailsModule](../../src/app/eth-extended/module/account/accountDetails/accountDetailsModule.ts) | N/A |
| module://aleth.io/account/balance | { accountHash } | N/A | Account balance chart | [accountBalanceModule](../../src/app/eth-extended/module/account/balance/accountBalanceModule.ts) | [IAccountBalanceModuleOptions](../../src/app/eth-extended/module/account/balance/IAccountBalanceModuleOptions.ts) |
| module://aleth.io/account/summary | { accountHash } | N/A | Accordion with transactions, contract messages etc. | [accountSummaryModule](../../src/app/eth-extended/module/account/summary/accountSummaryModule.ts) | N/A |
| module://aleth.io/account/contract | { accountHash } | accordionItems | Accordion with contract data (source code, account code etc.) with slots for adding new items | [accountContractModule](../../src/app/eth-extended/module/account/contract/accountContractModule.ts) | N/A |
| module://aleth.io/cm/list | { txHash, validationIndex, parentValidationIndex} | N/A | Chart for CM page sidebar showing contract messages found in the same parent | [cmListModule](../../src/app/eth-extended/module/cm/cmList/cmListModule.ts) | N/A |
| module://aleth.io/cm/details | { txHash, validationIndex } | modules | Contract message data fields | [cmDetailsModule](../../src/app/eth-extended/module/cm/cmDetails/cmDetailsModule.ts) | N/A |
| module://aleth.io/cm/summary | { txHash, validationIndex } | N/A | Accordion with child contract messages, token transfers etc. | [cmSummaryModule](../../src/app/eth-extended/module/cm/cmSummary/cmSummaryModule.ts) | N/A |
| module://aleth.io/dashboard/avgTimeInPoolChart | { rangeStart, rangeEnd } | N/A | Chart showing average time spent in pool for Txs that were included in each block | [avgTimeInPoolChartModule](../../src/app/eth-extended/module/dashboard/charts/avgTimeInPoolChartModule.ts) | N/A |
| module://aleth.io/dashboard/propagationChart | {} | N/A | Chart showing mined block propagation statistics | [propagationChartModule](../../src/app/eth-extended/module/dashboard/charts/propagationChartModule.ts) | N/A |
| module://aleth.io/cm/payload | { txHash, validationIndex } | N/A | Decoded contract message payload | [cmPayloadModule](../../src\app/eth-extended/module/cm/cmPayload/cmPayloadModule.ts) | N/A |
| module://aleth.io/reorg-banner | { blockNumber } | N/A | Show a notification banner when reorg events occur. Should be placed on every page that depends on the given context blockNumber | [reorgBannerModule.tsx](../../src/app/eth-extended/module/reorgBannerModule.tsx) | N/A |

### Data Adapters

| Adapter URI | Context shape | Return type | Description | Implementation |
| --- | --- | --- | --- | --- |
| adapter://aleth.io/block/basic | { blockNumber } | [IBlockBasicInfo](../../src/app/shared/data/block/IBlockBasicInfo.ts) | Adapter for basic block data | [BlockBasicInfoAdapter](../../src/app/shared/adapter/block/BlockBasicInfoAdapter.ts) |
| adapter://aleth.io/full/block/details | { blockNumber } | [IBlockDetails](../../src/app/shared/data/block/details/IBlockDetails.ts) | Provides detailed block data specific to the full explorer | [BlockDetailsAdapter](../../src/app/shared/adapter/block/BlockDetailsAdapter.ts) |
| adapter://aleth.io/prices/latest | { blockNumber } | number \| undefined | The price of ETH in USD at the latest block or undefined if disabled by configuration | [EthPriceAdapter](../../src/app/eth-extended/adapter/EthPriceAdapter.ts) |
| adapter://aleth.io/block/confirmations | { blockNumber } | [IBlockConfirmations](../../src/app/shared/adapter/block/BlockConfirmationsAdapter.ts) | Info about number of confirmations for a given block | [BlockConfirmationsAdapter](../../src/app/shared/adapter/block/BlockConfirmationsAdapter.ts) |
| adapter://aleth.io/block-range/summary | { rangeStart, rangeEnd, blockNumber } | Array<[IBlockTxCount](../../src/app/shared/data/block/value/IBlockTxCount.ts) \| undefined>| TX counts per block for a range of blocks | [BlockListAdapter](../../src/app/shared/adapter/block/BlockListAdapter.ts) |
| adapter://aleth.io/block/latestNo | {} | number | Returns the latest block number on the chain | [LatestBlockNumberAdapter](../../src/app/shared/adapter/block/LatestBlockNumberAdapter.ts) |
| adapter://aleth.io/full/uncle/details | { uncleHash } | [IUncleDetails](../../src/app/shared/data/uncle/IUncleDetails.ts) | Uncle data fields | [UncleDetailsAdapter](../../src/app/shared/adapter/uncle/UncleDetailsAdapter.ts) |
| adapter://aleth.io/extended/tx/details | { txHash } | [ITxDetails](../../src/app/shared/data/tx/details/ITxDetails.ts) | Transaction data fields | [TxDetailsAdapter](../../src/app/eth-extended/adapter/tx/TxDetailsAdapter.ts) |
| adapter://aleth.io/extended/account/details | { accountHash } | [IAccountDetails](../../src/app/eth-extended/data/account/IAccountDetails.ts) | Aggregated account data | [AccountDetailsAdapter](../../src/app/eth-extended/adapter/account/AccountDetailsAdapter.ts) |
| adapter://aleth.io/extended/account/balance?latest | { accountHash } | [AccountBalance](../../src/app/eth-extended/data/account/balance/AccountBalance.ts) | Account balance for the latest available block | [AccountBalanceAdapter](../../src/app/eth-extended/adapter/account/AccountBalanceAdapter.ts) |
| adapter://aleth.io/extended/account/balance?historical | { accountHash } | [AccountBalance](../../src/app/eth-extended/data/account/balance/AccountBalance.ts) | Detailed account balance for the last 30 days | [ AccountBalanceAdapter](../../src/app/eth-extended/adapter/account/AccountBalanceAdapter.ts) |
| adapter://aleth.io/cm/details | { txHash, validationIndex } | [ICmDetails](../../src/app/eth-extended/data/contractMsg/details/ICmDetails.ts) | Contract message data fields | [CmDetailsAdapter](../../src/app/eth-extended/adapter/cm/CmDetailsAdapter.ts) |
| adapter://aleth.io/search/v2 | {} | [ISearch](../../src/app/shared/data/search/ISearch.ts) | Returns a search provider | [SearchAdapter](../../src/app/shared/adapter/SearchAdapter.ts) |
| adapter://aleth.io/avgTxTimeInPool | {} | Array<[IBlockTxTimeInPool](../../src/app/eth-extended/data/block/txTimeInPool/IBlockTxTimeInPool.ts) \| undefined> | Average time spent in pool for latest blocks | [BlockAvgTxTimeInPoolAdapter](../../src/app/eth-extended/adapter/block/BlockAvgTxTimeInPoolAdapter.ts) |
| adapter://aleth.io/pendingPoolInfo | {} | [IPendingPoolInfo](../../src/app/eth-extended/module/dashboard/charts/data/IPendingPoolInfo.ts) | Information about the pending pool | [PendingPoolInfoAdapter](../../src/app/eth-extended/adapter/PendingPoolInfoAdapter.ts) |
| adapter://aleth.io/propagationInfo | {} | Array<[IPropagationChartItem](../../src/app/eth-extended/module/dashboard/charts/data/IPropagationChartItem.ts)> \| undefined | Data about the node propagation | [PropagationInfoAdapter](../../src/app/eth-extended/adapter/PropagationInfoAdapter.ts) |
| adapter://aleth.io/ethNodesInfo | {} | [IEthNodesInfo](../../src/app/eth-extended/module/dashboard/charts/data/IEthNodesInfo.ts) | Info about the active nodes (count etc.) | [EthNodesInfoAdapter](../../src/app/eth-extended/adapter/EthNodesInfoAdapter.ts) |
