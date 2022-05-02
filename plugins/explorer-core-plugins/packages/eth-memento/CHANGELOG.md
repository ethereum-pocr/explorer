# v2.0.2

- Add compatibility with @alethio/cms v1.0.0-beta.10

# v2.0.1

- Fix errors caused by some optional adapters being undefined

# v2.0.0

- **Breaking change** Increase minimum @alethio/cms version to 1.0.0-beta.8. Remove prices adapter stub.
- Make dashboardPage subtitle more customizable when overriding translations

# v1.1.0

- added modules
    - `module://aleth.io/memento/block/basic`
    - `module://aleth.io/memento/block/txs`
    - `module://aleth.io/memento/block/advanced`
    - `module://aleth.io/memento/block/logs-bloom`
    - `module://aleth.io/memento/tx/basic`
    - `module://aleth.io/memento/tx/advanced`
    - `module://aleth.io/memento/tx/summary`
    - `module://aleth.io/memento/tx/payload`
    - `module://aleth.io/memento/uncle/details`
    - `module://aleth.io/memento/account/details`
    - `module://aleth.io/memento/account/contract`

- added adapters
    - `adapter://aleth.io/block/basic`
    - `adapter://aleth.io/full/block/details`
    - `adapter://aleth.io/prices/latest`
    - `adapter://aleth.io/block-range/summary`
    - `adapter://aleth.io/memento/tx/details`
    - `adapter://aleth.io/search/v2`
    - `adapter://aleth.io/block/latestNo`
    - `adapter://aleth.io/block/confirmations`
    - `adapter://aleth.io/full/uncle/details`
    - `adapter://aleth.io/lite/account/balance`
    - `adapter://aleth.io/lite/account/details`

- added context
    - `context://aleth.io/memento/tx/parentBlock`

- added pages
    - `page://aleth.io/dashboard`
    - `page://aleth.io/uncle`

# v1.0.1

- (Visual bug) Fix account summary accordion arrow offset

# v1.0.0

Initial release
