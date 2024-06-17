// PadToggle.js
import { setAudioAttributes } from './utils';

const togglePadBanks = (padBanks, buttonName, setPadBankText) => {
  if (buttonName.startsWith('pad')) {
    const audioObjects = document.getElementsByClassName('audio-objects');
    let activeBank;
    
    switch (buttonName) {
      case 'pad bank : a':
        padBanks.bankA.isActive = true;
        padBanks.bankB.isActive = false;
        padBanks.bankC.isActive = false;
        padBanks.bankD.isActive = false;
        activeBank = padBanks.bankA;
        setPadBankText('A');
        break;
      case 'pad bank : b':
        padBanks.bankA.isActive = false;
        padBanks.bankB.isActive = true;
        padBanks.bankC.isActive = false;
        padBanks.bankD.isActive = false;
        activeBank = padBanks.bankB;
        setPadBankText('B');
        break;
      case 'pad bank : c':
        padBanks.bankA.isActive = false;
        padBanks.bankB.isActive = false;
        padBanks.bankC.isActive = true;
        padBanks.bankD.isActive = false;
        activeBank = padBanks.bankC;
        setPadBankText('C');
        break;
      case 'pad bank : d':
        padBanks.bankA.isActive = false;
        padBanks.bankB.isActive = false;
        padBanks.bankC.isActive = false;
        padBanks.bankD.isActive = true;
        activeBank = padBanks.bankD;
        setPadBankText('D');
        break;
      default:
        return;
    }
    
    Array.from(audioObjects).forEach((audioElement, index) => {
      setAudioAttributes(audioElement, activeBank[`pad${index + 1}`]);
    });
  }
};

export default togglePadBanks;


