// Default.js
import { setAudioAttributes } from './utils';

const setDefaultPads = (padBanks) => {
  let activeBank;
  
  if (padBanks.bankA.isActive) {
    padBanks.bankB.isActive = false;
    padBanks.bankC.isActive = false;
    padBanks.bankD.isActive = false;
    activeBank = padBanks.bankA;
  } else if (padBanks.bankB.isActive) {
    padBanks.bankA.isActive = false;
    padBanks.bankC.isActive = false;
    padBanks.bankD.isActive = false;
    activeBank = padBanks.bankB;
  } else if (padBanks.bankC.isActive) {
    padBanks.bankA.isActive = false;
    padBanks.bankB.isActive = false;
    padBanks.bankD.isActive = false;
    activeBank = padBanks.bankC;
  } else if (padBanks.bankD.isActive) {
    padBanks.bankA.isActive = false;
    padBanks.bankB.isActive = false;
    padBanks.bankC.isActive = false;
    activeBank = padBanks.bankD;
  } else {
    padBanks.bankA.isActive = true;
    padBanks.bankB.isActive = false;
    padBanks.bankC.isActive = false;
    padBanks.bankD.isActive = false;
    activeBank = padBanks.bankA;
  }
  
  const audioObjects = document.getElementsByClassName('audio-objects');
  Array.from(audioObjects).forEach((audioElement, index) => {
    setAudioAttributes(audioElement, activeBank[`pad${index + 1}`]);
  });
};

export default setDefaultPads;
