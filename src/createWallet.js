import bip32 from 'bip32'
import bip39 from 'bip39'
import bitcoin from 'bitcoinjs-lib'

//testnet ou bitcoin (testnet ou mainnet)
const network = bitcoin.networks.testnet

// derivação de carteiras HD
const path = `m/49'/1'/0'/0`

// conjunto de palavras aleatorio pra formar seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// criando raiz da carteira HD
let root = bip32.fromSeed(seed, network)

// criando uma conta (private key + public key)
let account = root.derivePath(path)
let node = account.derive(0)


let btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network
}).address

console.log('Wallet generated')
console.log('Address: ', btcAddress)
console.log('Private key', node.toWIF())
console.log("Seed", mnemonic)