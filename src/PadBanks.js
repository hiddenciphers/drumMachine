const padBanks = {
    bankA: {
        isActive: null,
        pad1: {
            id: 'Q',
            name: 'Classic Dilla',
            src: 'https://ipfs.io/ipfs/QmbVAJe8G14Wj5kbkVC7KgUyvpy3JYgHgrPUFLLLxgJoki?filename=78_DillaClassicBeat_TL.wav'
        },
        pad2: {
            id: 'W',
            name: 'Gm_DrumsSkippy',
            src: 'https://ipfs.io/ipfs/QmTDVUX4BhndpjPxT7XHJLyvTrjuVNLfV4jKwtpb8vVUrJ?filename=78_Gm_DrumsSkippy_TL.wav'
        },
        pad3: {
            id: 'E',
            name: 'ReelToReelDrums',
            src: 'https://ipfs.io/ipfs/QmRbvV3mUAvoqETPWwhAFH85pZABRiWSeezzjaCSnShAcg?filename=90_ReelToReelDrums_Taped_02_TL.wav'
        },
        pad4: {
            id: 'R',
            name: 'RoomyBeat',
            src: 'https://ipfs.io/ipfs/QmY5c6G6syR95DgH3mCzk21jtERRVcEmEaZxJbDXbpSKpG?filename=80_RoomyBeat_TL.wav'
        },
        pad5: {
            id: 'A',
            name: '',
            src: ''
        },
        pad6: {
            id: 'S',
            name: '',
            src: ''
        },
        pad7: {
            id: 'D',
            name: 'HipHopBeat_01',
            src: 'https://ipfs.io/ipfs/Qmcvb768LaBstHoLQ35qEtv9WqgMgFEw6xWLy4q5vtZzGx?filename=85_HipHopBeat_01_Spring_TL.wav'
        },
        pad8: {
            id: 'F',
            name: 'HipHopBeat_07',
            src: 'https://ipfs.io/ipfs/QmaZkP1483cpyeFfzqLMu6pncc5CJZ1ow6Z6BmJMvpXAK3?filename=85_HipHopBeat_07_Spring_TL.wav'
        },
        pad9: {
            id: 'Z',
            name: 'SinglesBeat_03',
            src: 'https://ipfs.io/ipfs/QmRhPBJ9GWEq5NggjGT6wR8bpPp6YiQ6iddgfh4Lajihwb?filename=85_SinglesBeat_03_Spring_TL.wav'
        },
        pad10: {
            id: 'X',
            name: 'SprungBreaks_3',
            src: 'https://ipfs.io/ipfs/QmVi8x4AtcXVGqcpVpDyupBzTyDSymbePDGfGKM7qenNV1?filename=85_SprungBreaks_3_TL.wav'
        },
        pad11: {
            id: 'C',
            name: '',
            src: ''
        },
        pad12: {
            id: 'V',
            name: 'VintageDrums_05',
            src: 'https://ipfs.io/ipfs/QmRZoj3QtZWhYDCkBzjso1insRprTjV4LrEJ53JjeqV8zy?filename=85_VintageDrums_05.wav'
        },
        pad13: {
            id: 'U',
            name: 'VintageDrums_08',
            src: 'https://ipfs.io/ipfs/QmX5AYYcwg15RZ79ESnoSRvJqgC968sT9XjRBg2QM5qNgV?filename=85_VintageDrums_08.wav'
        },
        pad14: {
            id: 'I',
            name: 'VintageDrums_10',
            src: 'https://ipfs.io/ipfs/QmcD1qqVNq93vkDrPngubnAjjEzffvFMj2W1WjmrBzXNjH?filename=85_VintageDrums_10.wav'
        },
        pad15: {
            id: 'O',
            name: 'DirtBeat',
            src: 'https://ipfs.io/ipfs/QmVrAitqmKWK8JLRpAMNEs3xEZafs3nAvGgnD7yR8uhGKo?filename=90_DirtBeat_TL.wav'
        },
        pad16: {
            id: 'P',
            name: '',
            src: ''
        }
        
    },
    bankB: {
        isActive: null,
        pad1: {
            id: 'Q',
            name: 'Synth 1',
            src: 'https://ipfs.io/ipfs/Qmc44KMtTXGTcdKnnJ59AERGMaZJf8UPejxjEpMzsexoog?filename=1.wav'
        },
        pad2: {
            id: 'W',
            name: 'Synth 2',
            src: 'https://ipfs.io/ipfs/QmRq6dygCKN7eGZnfVDRTAGD3ukg1pq4PXQQq39JMeDTm4?filename=2.wav'
        },
        pad3: {
            id: 'E',
            name: 'Synth 3',
            src: 'https://ipfs.io/ipfs/QmTo4ocG2JKEbZ3o6jS7A8Tvfd6SKw3EjtQA7XwVDzjmjy?filename=3.wav'
        },
        pad4: {
            id: 'R',
            name: 'Synth 4',
            src: 'https://ipfs.io/ipfs/QmReuHz1BDJEeWV1Cg5DqdSQZFMHpv7CJ8WZgzra3vSRSF?filename=4.wav'
        },
        pad5: {
            id: 'A',
            name: 'Synth 5',
            src: 'https://ipfs.io/ipfs/QmPeMvcbe1bSkXidM6Fq44KK81pFHZwVCGPgWwJiaRYeVH?filename=5.wav'
        },
        pad6: {
            id: 'S',
            name: 'Synth 6',
            src: 'https://ipfs.io/ipfs/QmNc9ps4Kkg524fLqf78HcAgKftaNwzyKPkDSATYkkYWZK?filename=6.wav'
        },
        pad7: {
            id: 'D',
            name: 'Synth 7',
            src: 'https://ipfs.io/ipfs/QmUVS9yjzX4FP3fEEPvWJKoUk6Y6vL8zivXqsHaSkzXCFN?filename=7.wav'
        },
        pad8: {
            id: 'F',
            name: 'Synth 8',
            src: 'https://ipfs.io/ipfs/QmddWHg5bqdjhBx7kETgP3huLNm42RWU4xZEXBFoBTnMNh?filename=8.wav'
        },
        pad9: {
            id: 'Z',
            name: 'Synth 9',
            src: 'https://ipfs.io/ipfs/QmbEYLv9TyiyzWTvc7E4trR129qYZwP143wPtUz8rwsySL?filename=9.wav'
        },
        pad10: {
            id: 'X',
            name: 'Synth 10',
            src: 'https://ipfs.io/ipfs/QmQRVgfGgmmuwmGdGsYqGVyPJ7V28PAAKzov1a3MTo7TJE?filename=10.wav'
        },
        pad11: {
            id: 'C',
            name: 'Synth 11',
            src: 'https://ipfs.io/ipfs/QmeWaRBKWjwcfDRjeAaUoPoED6FfttKu65G4rth97grcWe?filename=11.wav'
        },
        pad12: {
            id: 'V',
            name: 'Synth 12',
            src: 'https://ipfs.io/ipfs/QmQhLyPMtkmP4nFUNR2Vp5wz1KJkN6RFkEhbCvwzLgo8iZ?filename=12.wav'
        },
        pad13: {
            id: 'U',
            name: 'Synth 13',
            src: 'https://ipfs.io/ipfs/QmXYtse6Guj7Qg9inKtbcZuZWurMD71zfpHjoD5fpUZc31?filename=13.wav'
        },
        pad14: {
            id: 'I',
            name: 'Synth 14',
            src: 'https://ipfs.io/ipfs/QmRQpUMqXGXeL9zRdZ8UiYQdBuq4Dhq1AQrRUJnSwmzgpE?filename=14.wav'
        },
        pad15: {
            id: 'O',
            name: 'Synth 15',
            src: 'https://ipfs.io/ipfs/QmbLp8gZ9qQKKrhGWqAvbeQaRJfb1zhvvDapugWD6hktty?filename=15.wav'
        },
        pad16: {
            id: 'P',
            name: 'Synth 16',
            src: 'https://ipfs.io/ipfs/QmbZ4DjpEZJL5e6dErrCmaGaGVHnQtyTCwSJmZM9Z6Ls5i?filename=16.wav'
        }
        
    },
    bankC: {
        isActive: null,
        pad1: {
            id: 'Q',
            name: '',
            src: ''
        },
        pad2: {
            id: 'W',
            name: '',
            src: ''
        },
        pad3: {
            id: 'E',
            name: '',
            src: ''
        },
        pad4: {
            id: 'R',
            name: '',
            src: ''
        },
        pad5: {
            id: 'A',
            name: '',
            src: ''
        },
        pad6: {
            id: 'S',
            name: '',
            src: ''
        },
        pad7: {
            id: 'D',
            name: '',
            src: ''
        },
        pad8: {
            id: 'F',
            name: '',
            src: ''
        },
        pad9: {
            id: 'Z',
            name: '',
            src: ''
        },
        pad10: {
            id: 'X',
            name: '',
            src: ''
        },
        pad11: {
            id: 'C',
            name: 'Synth 11',
            src: ''
        },
        pad12: {
            id: 'V',
            name: '',
            src: ''
        },
        pad13: {
            id: 'U',
            name: '',
            src: ''
        },
        pad14: {
            id: 'I',
            name: '',
            src: ''
        },
        pad15: {
            id: 'O',
            name: '',
            src: ''
        },
        pad16: {
            id: 'P',
            name: '',
            src: ''
        }
        
    },
    bankD: {
        isActive: null,
        pad1: {
            id: 'Q',
            name: '',
            src: ''
        },
        pad2: {
            id: 'W',
            name: '',
            src: ''
        },
        pad3: {
            id: 'E',
            name: '',
            src: ''
        },
        pad4: {
            id: 'R',
            name: '',
            src: ''
        },
        pad5: {
            id: 'A',
            name: '',
            src: ''
        },
        pad6: {
            id: 'S',
            name: '',
            src: ''
        },
        pad7: {
            id: 'D',
            name: '',
            src: ''
        },
        pad8: {
            id: 'F',
            name: '',
            src: ''
        },
        pad9: {
            id: 'Z',
            name: '',
            src: ''
        },
        pad10: {
            id: 'X',
            name: '',
            src: ''
        },
        pad11: {
            id: 'C',
            name: 'Synth 11',
            src: ''
        },
        pad12: {
            id: 'V',
            name: '',
            src: ''
        },
        pad13: {
            id: 'U',
            name: '',
            src: ''
        },
        pad14: {
            id: 'I',
            name: '',
            src: ''
        },
        pad15: {
            id: 'O',
            name: '',
            src: ''
        },
        pad16: {
            id: 'P',
            name: '',
            src: ''
        }
        
    }
};

export default padBanks;
