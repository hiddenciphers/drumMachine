const padBanks = {
    bankA: {
        isActive: null,
        pad1: {
            id: 'Q',
            name: 'ClassicDilla',
            src: 'https://ipfs.io/ipfs/QmbVAJe8G14Wj5kbkVC7KgUyvpy3JYgHgrPUFLLLxgJoki?filename=78_DillaClassicBeat_TL.wav',
            type: 'audio/wav'
        },
        pad2: {
            id: 'W',
            name: 'Fantasy',
            src: 'https://ipfs.io/ipfs/QmW7qXQzdoJbgB9DT5YNNvmBkDdFWadFxQ77SwsAY5foeY?filename=Fantasy.mp3',
            type: 'audio/wav'
        },
        pad3: {
            id: 'E',
            name: 'ReelToReel',
            src: 'https://ipfs.io/ipfs/QmRbvV3mUAvoqETPWwhAFH85pZABRiWSeezzjaCSnShAcg?filename=90_ReelToReelDrums_Taped_02_TL.wav',
            type: 'audio/wav'
        },
        pad4: {
            id: 'R',
            name: 'Scratch2',
            src: 'https://ipfs.io/ipfs/QmQPEf52b9iEQQRuFWzPHrAhCCXCt55FEr1XC3YtGfJGuH?filename=30420__feveran__feveran-style-scratch-4.mp3',
            type: 'audio/wav'
        },
        pad5: {
            id: 'A',
            name: 'HipHopBeat',
            src: 'https://ipfs.io/ipfs/Qmcvb768LaBstHoLQ35qEtv9WqgMgFEw6xWLy4q5vtZzGx?filename=85_HipHopBeat_01_Spring_TL.wav',
            type: 'audio/wav'
        },
        pad6: {
            id: 'S',
            name: 'Reverse',
            src: 'https://ipfs.io/ipfs/QmYniQPL2Z5J88qRY78SWJAKjioV4NfXe7Tz8Gh6e2Mm5M?filename=Reverse%2003_Bm_75.wav',
            type: 'audio/wav'
        },
        pad7: {
            id: 'D',
            name: 'SinglesBeat',
            src: 'https://ipfs.io/ipfs/QmRhPBJ9GWEq5NggjGT6wR8bpPp6YiQ6iddgfh4Lajihwb?filename=85_SinglesBeat_03_Spring_TL.wav',
            type: 'audio/wav'
        },
        pad8: {
            id: 'F',
            name: 'AFriend',
            src: 'https://ipfs.io/ipfs/QmWH6SPnzRd2SZy3QZPMrS1wSRFwc76fsEzfJ6TRjhemcq',
            type: 'audio/wav'
        },
        pad9: {
            id: 'Z',
            name: 'VintageDrums1',
            src: 'https://ipfs.io/ipfs/QmRZoj3QtZWhYDCkBzjso1insRprTjV4LrEJ53JjeqV8zy?filename=85_VintageDrums_05.wav',
            type: 'audio/wav'
        },
        pad10: {
            id: 'X',
            name: 'Drone',
            src: 'https://ipfs.io/ipfs/QmdDzWueCyciJUEvNrGQLWtZ4BbKDtJHDz94L1kKMK7maJ?filename=Drone%2001_A%23m_95.wav',
            type: 'audio/wav'
        },
        pad11: {
            id: 'C',
            name: 'VintageDrums3',
            src: 'https://ipfs.io/ipfs/QmcD1qqVNq93vkDrPngubnAjjEzffvFMj2W1WjmrBzXNjH?filename=85_VintageDrums_10.wav',
            type: 'audio/wav'
        },
        pad12: {
            id: 'V',
            name: 'Melody 5',
            src: 'https://ipfs.io/ipfs/QmZskr2s8sPwqwRbTw4WZsbtfPas7mArybeh9kVUbJNnD4?filename=Piano%20Melody%2013_G%23m_85.wav',
            type: 'audio/wav'
        },
        pad13: {
            id: 'U',
            name: 'ReelToReel2',
            src: 'https://ipfs.io/ipfs/QmWEzZF29qmbCTGjm9bEYWoDzuJ6h9sXvCQKXWf1oBNizT?filename=150_ReelToReelDrums_Taped_FX_20_TL.wav',
            type: 'audio/wav'
        },
        pad14: {
            id: 'I',
            name: 'Melody 3',
            src: 'https://ipfs.io/ipfs/QmS1Lh8zgrLqZN9kkV2c99sgiTzBWc619ZXP1BvZhmr8S1?filename=Piano%20Melody%2007_E_95.wav',
            type: 'audio/wav'
        },
        pad15: {
            id: 'O',
            name: 'ReelToReel3',
            src: 'https://ipfs.io/ipfs/QmVYEUffpug6fAvXs6H8r3Z1RaiqDs19k6CAKHHcyN5R9R?filename=90_ReelToReelDrums_Taped_07_TL.wav',
            type: 'audio/wav'
        },
        pad16: {
            id: 'P',
            name: 'Melody 1',
            src: 'https://ipfs.io/ipfs/QmYYq3JHy9SJdXQixBKXT2ugriEy7nAREpZsRN89YGbbFc?filename=Piano%20Melody%2002_B_98.wav',
            type: 'audio/wav'
        }
        
    },
    bankB: {
        isActive: null,
        pad1: {
            id: 'Q',
            name: 'TapeMix',
            src: 'https://ipfs.io/ipfs/QmfRFdBjWfaufS1JfX2iSyte4Bs8ZwL9XWh3YNfXBJpvmC?filename=85_TapeBeats_TapeMix_18_TL.wav',
            type: 'audio/wav'
        },
        pad2: {
            id: 'W',
            name: 'Melody 2',
            src: 'https://ipfs.io/ipfs/QmeN9mtP3fLzKuaKTHhNnoDFNiyuGR2knY4ETGnBAg5FsN?filename=Piano%20Melody%2006_E_95.wav',
            type: 'audio/wav'
        },
        pad3: {
            id: 'E',
            name: 'DustBreaks',
            src: 'https://ipfs.io/ipfs/QmaZ7FmUBDGVunznnwK3ghsxko6NzEQsU8ZxEPVS2KkBBX?filename=120_DustBreaks_01_TL.wav',
            type: 'audio/wav'
        },
        pad4: {
            id: 'R',
            name: 'Melody 4',
            src: 'https://ipfs.io/ipfs/Qme5dLYnG24Z3bzWHPZXQweHPPwvA8ThX9YsQoRPaRD15r?filename=Piano%20Melody%2008_C%23m_140.wav',
            type: 'audio/wav'
        },
        pad5: {
            id: 'A',
            name: 'DirtBeat',
            src: 'https://ipfs.io/ipfs/QmVrAitqmKWK8JLRpAMNEs3xEZafs3nAvGgnD7yR8uhGKo?filename=90_DirtBeat_TL.wav',
            type: 'audio/wav'
        },
        pad6: {
            id: 'S',
            name: 'One Shot',
            src: 'https://ipfs.io/ipfs/QmT1C8yZciSPwafhgUiAxhT6WSgZQcK9Ag7wN7Wy1wKxxm?filename=Cmaj11%20Piano%20One%20Shot.wav',
            type: 'audio/wav'
        },
        pad7: {
            id: 'D',
            name: 'VintageDrums2',
            src: 'https://ipfs.io/ipfs/QmX5AYYcwg15RZ79ESnoSRvJqgC968sT9XjRBg2QM5qNgV?filename=85_VintageDrums_08.wav',
            type: 'audio/wav'
        },
        pad8: {
            id: 'F',
            name: 'Drone 2',
            src: 'https://ipfs.io/ipfs/QmbkFpyQ81HheHNo8FvHnrWaCMcNTrwwe4DPMGQAdHY7uL?filename=Lost%20in%20Translation_Drone%2006_Am_72.wav',
            type: 'audio/wav'
        },
        pad9: {
            id: 'Z',
            name: 'SprungBreaks',
            src: 'https://ipfs.io/ipfs/QmVi8x4AtcXVGqcpVpDyupBzTyDSymbePDGfGKM7qenNV1?filename=85_SprungBreaks_3_TL.wav',
            type: 'audio/wav'
        },
        pad10: {
            id: 'X',
            name: 'Particles',
            src: 'https://ipfs.io/ipfs/QmQdogPxyxETVuZ4HsEpHqvKwv49DanmWKTw9waJCKhE1t?filename=Particles_Texture_A%23m_190.wav',
            type: 'audio/wav'
        },
        pad11: {
            id: 'C',
            name: 'HipHopBeat1',
            src: 'https://ipfs.io/ipfs/QmaZkP1483cpyeFfzqLMu6pncc5CJZ1ow6Z6BmJMvpXAK3?filename=85_HipHopBeat_07_Spring_TL.wav',
            type: 'audio/wav'
        },
        pad12: {
            id: 'V',
            name: 'Scratch',
            src: 'https://ipfs.io/ipfs/QmUPsr5zR13BgRgfcSuLBCBhZmgExWVv5ny2qzU7Pj4ttH?filename=30250__feveran__feveran-style-scratch.mp3',
            type: 'audio/wav'
        },
        pad13: {
            id: 'U',
            name: 'Roomy',
            src: 'https://ipfs.io/ipfs/QmY5c6G6syR95DgH3mCzk21jtERRVcEmEaZxJbDXbpSKpG?filename=80_RoomyBeat_TL.wav',
            type: 'audio/wav'
        },
        pad14: {
            id: 'I',
            name: 'Scratch3',
            src: 'https://ipfs.io/ipfs/QmeFzjbKMYVck1KNXUPeEuAJnZFZm29bnE8BRcdJYfPy3C?filename=31146__feveran__feveran-style-scratch-7.mp3',
            type: 'audio/wav'
        },
        pad15: {
            id: 'O',
            name: 'TapeMix1',
            src: 'https://ipfs.io/ipfs/Qmc9DkgZreVvx82NYD8fzwiG6Jxpz1aoB1C7HUh6M75Ksq?filename=85_TapeBeats_TapeMix_09_TL.wav',
            type: 'audio/wav'
        },
        pad16: {
            id: 'P',
            name: 'Scratch5',
            src: 'https://ipfs.io/ipfs/QmTBLBcxGkNTwxR2Mid6GiG2KUY3yvRe47mHpkZxtsAuT8?filename=31145__feveran__feveran-style-scratch-6.mp3',
            type: 'audio/wav'
        }
        
    },
    bankC: {
        isActive: null,
        pad1: {
            id: 'Q',
            name: 'Synth 1',
            src: 'https://ipfs.io/ipfs/Qmc44KMtTXGTcdKnnJ59AERGMaZJf8UPejxjEpMzsexoog?filename=1.wav',
            type: 'audio/wav'
        },
        pad2: {
            id: 'W',
            name: 'Synth 2',
            src: 'https://ipfs.io/ipfs/QmRq6dygCKN7eGZnfVDRTAGD3ukg1pq4PXQQq39JMeDTm4?filename=2.wav',
            type: 'audio/wav'
        },
        pad3: {
            id: 'E',
            name: 'Synth 3',
            src: 'https://ipfs.io/ipfs/QmTo4ocG2JKEbZ3o6jS7A8Tvfd6SKw3EjtQA7XwVDzjmjy?filename=3.wav',
            type: 'audio/wav'
        },
        pad4: {
            id: 'R',
            name: 'Synth 4',
            src: 'https://ipfs.io/ipfs/QmReuHz1BDJEeWV1Cg5DqdSQZFMHpv7CJ8WZgzra3vSRSF?filename=4.wav',
            type: 'audio/wav'
        },
        pad5: {
            id: 'A',
            name: 'Synth 5',
            src: 'https://ipfs.io/ipfs/QmPeMvcbe1bSkXidM6Fq44KK81pFHZwVCGPgWwJiaRYeVH?filename=5.wav',
            type: 'audio/wav'
        },
        pad6: {
            id: 'S',
            name: 'Synth 6',
            src: 'https://ipfs.io/ipfs/QmNc9ps4Kkg524fLqf78HcAgKftaNwzyKPkDSATYkkYWZK?filename=6.wav',
            type: 'audio/wav'
        },
        pad7: {
            id: 'D',
            name: 'Synth 7',
            src: 'https://ipfs.io/ipfs/QmUVS9yjzX4FP3fEEPvWJKoUk6Y6vL8zivXqsHaSkzXCFN?filename=7.wav',
            type: 'audio/wav'
        },
        pad8: {
            id: 'F',
            name: 'Synth 8',
            src: 'https://ipfs.io/ipfs/QmddWHg5bqdjhBx7kETgP3huLNm42RWU4xZEXBFoBTnMNh?filename=8.wav',
            type: 'audio/wav'
        },
        pad9: {
            id: 'Z',
            name: 'Synth 9',
            src: 'https://ipfs.io/ipfs/QmbEYLv9TyiyzWTvc7E4trR129qYZwP143wPtUz8rwsySL?filename=9.wav',
            type: 'audio/wav'
        },
        pad10: {
            id: 'X',
            name: 'Synth 10',
            src: 'https://ipfs.io/ipfs/QmQRVgfGgmmuwmGdGsYqGVyPJ7V28PAAKzov1a3MTo7TJE?filename=10.wav',
            type: 'audio/wav'
        },
        pad11: {
            id: 'C',
            name: 'Synth 11',
            src: 'https://ipfs.io/ipfs/QmeWaRBKWjwcfDRjeAaUoPoED6FfttKu65G4rth97grcWe?filename=11.wav',
            type: 'audio/wav'
        },
        pad12: {
            id: 'V',
            name: 'Synth 12',
            src: 'https://ipfs.io/ipfs/QmQhLyPMtkmP4nFUNR2Vp5wz1KJkN6RFkEhbCvwzLgo8iZ?filename=12.wav',
            type: 'audio/wav'
        },
        pad13: {
            id: 'U',
            name: 'Synth 13',
            src: 'https://ipfs.io/ipfs/QmXYtse6Guj7Qg9inKtbcZuZWurMD71zfpHjoD5fpUZc31?filename=13.wav',
            type: 'audio/wav'
        },
        pad14: {
            id: 'I',
            name: 'Synth 14',
            src: 'https://ipfs.io/ipfs/QmRQpUMqXGXeL9zRdZ8UiYQdBuq4Dhq1AQrRUJnSwmzgpE?filename=14.wav',
            type: 'audio/wav'
        },
        pad15: {
            id: 'O',
            name: 'Synth 15',
            src: 'https://ipfs.io/ipfs/QmbLp8gZ9qQKKrhGWqAvbeQaRJfb1zhvvDapugWD6hktty?filename=15.wav',
            type: 'audio/wav'
        },
        pad16: {
            id: 'P',
            name: 'Synth 16',
            src: 'https://ipfs.io/ipfs/QmbZ4DjpEZJL5e6dErrCmaGaGVHnQtyTCwSJmZM9Z6Ls5i?filename=16.wav',
            type: 'audio/wav'
        }
        
    },
    bankD: {
        isActive: null,
        pad1: {
            id: 'Q',
            name: 'Penalty',
            src: 'https://ipfs.io/ipfs/QmUnApuSBSk8rasctqxs5cDp7dKRZcAdn7RQUGNkWojZbS?filename=DeathBeThePenalty.mp3',
            type: 'audio/mpeg'
        },
        pad2: {
            id: 'W',
            name: 'ComeNow',
            src: 'https://ipfs.io/ipfs/QmbGSui2seuCnRmTM7faT2u7iEAi8Db35eW6WTVARgGmPa?filename=ComeNow.mp3',
            type: 'audio/mpeg'
        },
        pad3: {
            id: 'E',
            name: 'InTheHouse',
            src: 'https://ipfs.io/ipfs/QmebeBSTzSZhMrHc3bSyWefMdcGSnCa7iKNGAwt5f4YiPH?filename=InTheHouse.mp3',
            type: 'audio/mpeg'
        },
        pad4: {
            id: 'R',
            name: 'TakeFlight',
            src: 'https://ipfs.io/ipfs/QmfZUReWD7pzPDdA5oqELEifsMnJ9JnbftcLoW29RaGAbi?filename=TakeFlight.mp3',
            type: 'audio/mpeg'
        },
        pad5: {
            id: 'A',
            name: 'Discipline',
            src: 'https://ipfs.io/ipfs/QmZgFypKxJDdvV6JSoBpz5qJHZycYHSiHeYbC7ZjWr7Rde?filename=Discipline.mp3',
            type: 'audio/mpeg'
        },
        pad6: {
            id: 'S',
            name: 'TheBizness',
            src: 'https://ipfs.io/ipfs/QmdBgzG2xUiT6BUTfpcyEkXxem7dAc71NS8YrihghcEypA?filename=TheBizness.mp3',
            type: 'audio/mpeg'
        },
        pad7: {
            id: 'D',
            name: 'ScrewBall',
            src: 'https://ipfs.io/ipfs/QmUvVVMXYMsz8fXg3eJW76Qotrw5BqAGKTNz2hktPpp92e?filename=BeatEmOnTheHead.mp3',
            type: 'audio/mpeg'
        },
        pad8: {
            id: 'F',
            name: 'DeadlyNeedles',
            src: 'https://ipfs.io/ipfs/QmakK62aFfuNYnewVW9uywRmVWiRi6mkbUyY1EMi9AMYvw?filename=DeadlyNeedles.mp3',
            type: 'audio/mpeg'
        },
        pad9: {
            id: 'Z',
            name: 'Classic',
            src: 'https://ipfs.io/ipfs/QmbTHu5MDsQz8m9q3MGWkQbqK3Cc4GL7613dthKQR4j7L5?filename=Classic.mp3',
            type: 'audio/mpeg'
        },
        pad10: {
            id: 'X',
            name: 'TheNumberSong',
            src: 'https://ipfs.io/ipfs/QmVSt5E9hgv47JKFqWdnNZVmUARTRknfvYkb9qwCSfPZc6?filename=TheNumberSong.mp3',
            type: 'audio/mpeg'
        },
        pad11: {
            id: 'C',
            name: '41stSide',
            src: 'https://ipfs.io/ipfs/QmXu2uqcwwzvbBuH99bzWW6i3WZXpTapFAJgqnDhpwR94E?filename=41stSide.mp3',
            type: 'audio/mpeg'
        },
        pad12: {
            id: 'V',
            name: 'Battle',
            src: 'https://ipfs.io/ipfs/QmTRuj1GGLyaEqMJ7P732HuG5pjhr6ZVLjA6GBJ8AyfCXS?filename=Battle.mp3',
            type: 'audio/mpeg'
        },
        pad13: {
            id: 'U',
            name: 'OffTheBooks',
            src: 'https://ipfs.io/ipfs/QmXCi2dwD9EzAWzkn3UQt5dpjkSHNUF63EKCqmNG1F22PV?filename=OffTheBooks.mp3',
            type: 'audio/mpeg'
        },
        pad14: {
            id: 'I',
            name: 'HeyDJ',
            src: 'https://ipfs.io/ipfs/QmTqsez92ECWnsx4fGQhJFGKxxxTBcQXvNvan2JQiBjHKB?filename=HeyAz.mp3',
            type: 'audio/mpeg'
        },
        pad15: {
            id: 'O',
            name: 'GhettoChild',
            src: 'https://ipfs.io/ipfs/QmSUXooR43UK8DeV8sJvMWQyayYSoPXvo6XVRhKSB4pqUa?filename=GhettoChild.mp3',
            type: 'audio/mpeg'
        },
        pad16: {
            id: 'P',
            name: 'OutOfBusiness',
            src: 'https://ipfs.io/ipfs/QmV9HVihJbefNDybUxyEDbRxGKUeJHtgKxfqY8wENKFkLC?filename=EPMD.mp3',
            type: 'audio/mpeg'
        }
        
    }
};

export default padBanks;
