import { ITxLite } from "app/shared/data/tx/lite/ITxLite";
import { BigNumber } from "app/util/BigNumber";
import { IBlockCommonDetails } from "app/shared/data/block/IBlockCommonDetails";

/**
 * Block data with full block details coming from backend API
 */
export interface IBlockDetails extends IBlockCommonDetails {
    /** Block number */
    id: number;
    /** Unix timestamp */
    creationTime?: number;
    hash: string;
    /** parentHash - not present for genesis block */
    parentHash?: string;
    parentId: number | undefined;
    nonce: string;
    byteSize: number;
    sha3uncles: string;
    beneficiaryAddress?: string;
    gasUsed: BigNumber;
    gasLimit: BigNumber;
    difficulty: BigNumber;
    extraData: string;
    logsBloom: string;
    /** mixHash - not present for genesis block */
    mixHash?: string;
    /** Hashes of uncles */
    uncles: string[];

    transactions: ITxLite[];

    inconsistentWarning?: string;

    /** Number of contract messages - not available for Memento */
    contractMsgCount?: number;

    /** txTrie - not present for genesis block */
    txTrie?: string;
    /** receiptsTree - not present for genesis block */
    receiptsTrie?: string;

    beneficiaryName?: string;
    /** Miner reward (in wei) - not present for Memento */
    beneficiaryReward?: BigNumber;
    /** How much time it took to mine the block (in seconds) */
    mineTime?: number;
}
