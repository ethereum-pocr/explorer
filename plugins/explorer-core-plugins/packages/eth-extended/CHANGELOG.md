# v6.1.3

- Fix transaction highlight selector on block page in cases where contract message count is 0

# v6.1.2

- Fix gas value indicator for contract messages when gas limit is 0

# v6.1.1

- Add compatibility with @alethio/cms v1.0.0-beta.10

# v6.1.0

- Added module that shows a notification banner when a chain reorg occurs, prompting the user to refresh the page

# v6.0.1

- Fix errors caused by some optional adapters being undefined
- Fix transaction details falsely showing an empty error message

# v6.0.0

- **Breaking change** Increase minimum @alethio/cms version to 1.0.0-beta.8. Define prices adapter only when prices are enabled.
- Fix queries in contract read section when contract ABI doesn't provide named outputs.

# v5.0.0

- **Breaking change** Removed deprecated `module://aleth.io/block/details` & `adapter://aleth.io/block/details`
- **Breaking change** Renamed `adapter://aleth.io/extended/block/details` to `adapter://aleth.io/full/block/details`
- **Breaking change** Renamed `adapter://aleth.io/extended/uncle/details` to `adapter://aleth.io/full/uncle/details`

# v4.0.3

- (Visual bug) Fix account summary accordion arrow offset

# v4.0.2

- Increase source code widget height

# v4.0.1

- Fix balance chart gradient rendering on Safari

# v4.0.0

- **Breaking change** Remove left padding from account summary and contract modules (will display correctly with eth-common plugin v3+).

# v3.5.1

- Lazily subscribe to deepstream records, to avoid errors when those records are missing, even when they weren't used

# v3.5.0

- Add plugin manifest (@alethio/cms@1.0.0-beta.7)

# v3.4.0

- Deprecated `module://aleth.io/block/details` and split into smaller modules (`/block/basic`, `/block/txs`, `/block/advanced` and `/block/logs-bloom`)
- Deprecated `module://aleth.io/tx/details` and split into smaller modules (`/tx/basic` and `/tx/advanced`)
- Add help content (requires @alethio/cms@1.0.0-beta.6)

# v3.3.0

- Fix error when searching for a non-existent tx hash.
- Fix bugs which were visible only when modules with accordions were placed in a relatively positioned parent
- Remove TX fields which are no longer available from `pending/v3`.

# v3.2.0

- Update to `pending/v3` deepstream API.

# v3.1.0

- Option to disable USD prices functionality by configuration (`usdPrices` config option).
- Add configurable `ethSymbol` (e.g. GöETH)
- Add configurable token address for main balance chart on account page (`mainChartTokenAddress` module option). Useful when USD prices are disabled and we want to plot ETH or a given token instead.

# v3.0.0

- Move toolbar product links to `@alethio/explorer-plugin-eth-common`.

# v2.1.3

- Show date/time instead of short date in account accordion grids

# v2.1.2

- Fix clipboard copy confirmation icon in several components
- Show ellipsis for long block extra data tooltips

# v2.1.1

- Fix contract accordion console errors related to monaco-editor

# v2.1.0

- Add company link module (toolbar, topbar)

# v2.0.0

- Replaced search API with suggest API. `SEARCH_API_URL_MASK` config option updated in config.sample.json.
