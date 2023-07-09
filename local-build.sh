nvm use 16
cd plugins/explorer-core-plugins && npm run build-dev && cd ../..
# npm run build-dev
npx acp link -t plugins/dist plugins/explorer-core-plugins/packages/eth-common plugins/explorer-core-plugins/packages/eth-lite plugins/explorer-core-plugins/packages/eth-memento
# npx acp install -d -t plugins/dist @alethio/explorer-plugin-3box@1.1.1

