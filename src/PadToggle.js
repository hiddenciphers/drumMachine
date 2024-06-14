const togglePadBanks = (padBanks, buttonName) => {
    if (buttonName.startsWith('pad')) {
        const audioObjects = document.getElementsByClassName('audio-objects');
      
        switch (buttonName) {
          case 'pad bank : a':
            padBanks.bankA.isActive = true;
            padBanks.bankB.isActive = false;
            padBanks.bankC.isActive = false;
            padBanks.bankD.isActive = false;
            
            audioObjects[0].setAttribute('id', padBanks.bankA.pad1.id);
            audioObjects[0].setAttribute('name', padBanks.bankA.pad1.name);
            audioObjects[0].setAttribute('src', padBanks.bankA.pad1.src);
            audioObjects[0].setAttribute('type', padBanks.bankA.pad1.type);
            
            audioObjects[1].setAttribute('id', padBanks.bankA.pad2.id);
            audioObjects[1].setAttribute('name', padBanks.bankA.pad2.name);
            audioObjects[1].setAttribute('src', padBanks.bankA.pad2.src);
            audioObjects[1].setAttribute('type', padBanks.bankA.pad2.type);
            
            audioObjects[2].setAttribute('id', padBanks.bankA.pad3.id);
            audioObjects[2].setAttribute('name', padBanks.bankA.pad3.name);
            audioObjects[2].setAttribute('src', padBanks.bankA.pad3.src);
            audioObjects[2].setAttribute('type', padBanks.bankA.pad3.type);
            
            audioObjects[3].setAttribute('id', padBanks.bankA.pad4.id);
            audioObjects[3].setAttribute('name', padBanks.bankA.pad4.name);
            audioObjects[3].setAttribute('src', padBanks.bankA.pad4.src);
            audioObjects[3].setAttribute('type', padBanks.bankA.pad4.type);
            
            audioObjects[4].setAttribute('id', padBanks.bankA.pad5.id);
            audioObjects[4].setAttribute('name', padBanks.bankA.pad5.name);
            audioObjects[4].setAttribute('src', padBanks.bankA.pad5.src);
            audioObjects[4].setAttribute('type', padBanks.bankA.pad5.type);
            
            audioObjects[5].setAttribute('id', padBanks.bankA.pad6.id);
            audioObjects[5].setAttribute('name', padBanks.bankA.pad6.name);
            audioObjects[5].setAttribute('src', padBanks.bankA.pad6.src);
            audioObjects[5].setAttribute('type', padBanks.bankA.pad6.type);
            
            audioObjects[6].setAttribute('id', padBanks.bankA.pad7.id);
            audioObjects[6].setAttribute('name', padBanks.bankA.pad7.name);
            audioObjects[6].setAttribute('src', padBanks.bankA.pad7.src);
            audioObjects[6].setAttribute('type', padBanks.bankA.pad7.type);
            
            audioObjects[7].setAttribute('id', padBanks.bankA.pad8.id);
            audioObjects[7].setAttribute('name', padBanks.bankA.pad8.name);
            audioObjects[7].setAttribute('src', padBanks.bankA.pad8.src);
            audioObjects[7].setAttribute('type', padBanks.bankA.pad8.type);
            
            audioObjects[8].setAttribute('id', padBanks.bankA.pad9.id);
            audioObjects[8].setAttribute('name', padBanks.bankA.pad9.name);
            audioObjects[8].setAttribute('src', padBanks.bankA.pad9.src);
            audioObjects[8].setAttribute('type', padBanks.bankA.pad9.type);
            
            audioObjects[9].setAttribute('id', padBanks.bankA.pad10.id);
            audioObjects[9].setAttribute('name', padBanks.bankA.pad10.name);
            audioObjects[9].setAttribute('src', padBanks.bankA.pad10.src);
            audioObjects[9].setAttribute('type', padBanks.bankA.pad10.type);
            
            audioObjects[10].setAttribute('id', padBanks.bankA.pad11.id);
            audioObjects[10].setAttribute('name', padBanks.bankA.pad11.name);
            audioObjects[10].setAttribute('src', padBanks.bankA.pad11.src);
            audioObjects[10].setAttribute('type', padBanks.bankA.pad11.type);
            
            audioObjects[11].setAttribute('id', padBanks.bankA.pad12.id);
            audioObjects[11].setAttribute('name', padBanks.bankA.pad12.name);
            audioObjects[11].setAttribute('src', padBanks.bankA.pad12.src);
            audioObjects[11].setAttribute('type', padBanks.bankA.pad12.type);
            
            audioObjects[12].setAttribute('id', padBanks.bankA.pad13.id);
            audioObjects[12].setAttribute('name', padBanks.bankA.pad13.name);
            audioObjects[12].setAttribute('src', padBanks.bankA.pad13.src);
            audioObjects[12].setAttribute('type', padBanks.bankA.pad13.type);
            
            audioObjects[13].setAttribute('id', padBanks.bankA.pad14.id);
            audioObjects[13].setAttribute('name', padBanks.bankA.pad14.name);
            audioObjects[13].setAttribute('src', padBanks.bankA.pad14.src);
            audioObjects[13].setAttribute('type', padBanks.bankA.pad14.type);
            
            audioObjects[14].setAttribute('id', padBanks.bankA.pad15.id);
            audioObjects[14].setAttribute('name', padBanks.bankA.pad15.name);
            audioObjects[14].setAttribute('src', padBanks.bankA.pad15.src);
            audioObjects[14].setAttribute('type', padBanks.bankA.pad15.type);
            
            audioObjects[15].setAttribute('id', padBanks.bankA.pad16.id);
            audioObjects[15].setAttribute('name', padBanks.bankA.pad16.name);
            audioObjects[15].setAttribute('src', padBanks.bankA.pad16.src);
            audioObjects[15].setAttribute('type', padBanks.bankA.pad16.type);
            break;
  
          case 'pad bank : b':
            padBanks.bankA.isActive = false;
            padBanks.bankB.isActive = true;
            padBanks.bankC.isActive = false;
            padBanks.bankD.isActive = false;
            audioObjects[0].setAttribute('id', padBanks.bankB.pad1.id);
            audioObjects[0].setAttribute('name', padBanks.bankB.pad1.name);
            audioObjects[0].setAttribute('src', padBanks.bankB.pad1.src);
            audioObjects[0].setAttribute('type', padBanks.bankB.pad1.type);
  
            audioObjects[1].setAttribute('id', padBanks.bankB.pad2.id);
            audioObjects[1].setAttribute('name', padBanks.bankB.pad2.name);
            audioObjects[1].setAttribute('src', padBanks.bankB.pad2.src);
            audioObjects[1].setAttribute('type', padBanks.bankB.pad2.type);
  
            audioObjects[2].setAttribute('id', padBanks.bankB.pad3.id);
            audioObjects[2].setAttribute('name', padBanks.bankB.pad3.name);
            audioObjects[2].setAttribute('src', padBanks.bankB.pad3.src);
            audioObjects[2].setAttribute('type', padBanks.bankB.pad3.type);
  
            audioObjects[3].setAttribute('id', padBanks.bankB.pad4.id);
            audioObjects[3].setAttribute('name', padBanks.bankB.pad4.name);
            audioObjects[3].setAttribute('src', padBanks.bankB.pad4.src);
            audioObjects[3].setAttribute('type', padBanks.bankB.pad4.type);
  
            audioObjects[4].setAttribute('id', padBanks.bankB.pad5.id);
            audioObjects[4].setAttribute('name', padBanks.bankB.pad5.name);
            audioObjects[4].setAttribute('src', padBanks.bankB.pad5.src);
            audioObjects[4].setAttribute('type', padBanks.bankB.pad5.type);
  
            audioObjects[5].setAttribute('id', padBanks.bankB.pad6.id);
            audioObjects[5].setAttribute('name', padBanks.bankB.pad6.name);
            audioObjects[5].setAttribute('src', padBanks.bankB.pad6.src);
            audioObjects[5].setAttribute('type', padBanks.bankB.pad6.type);
  
            audioObjects[6].setAttribute('id', padBanks.bankB.pad7.id);
            audioObjects[6].setAttribute('name', padBanks.bankB.pad7.name);
            audioObjects[6].setAttribute('src', padBanks.bankB.pad7.src);
            audioObjects[6].setAttribute('type', padBanks.bankB.pad7.type);
  
            audioObjects[7].setAttribute('id', padBanks.bankB.pad8.id);
            audioObjects[7].setAttribute('name', padBanks.bankB.pad8.name);
            audioObjects[7].setAttribute('src', padBanks.bankB.pad8.src);
            audioObjects[7].setAttribute('type', padBanks.bankB.pad8.type);
  
            audioObjects[8].setAttribute('id', padBanks.bankB.pad9.id);
            audioObjects[8].setAttribute('name', padBanks.bankB.pad9.name);
            audioObjects[8].setAttribute('src', padBanks.bankB.pad9.src);
            audioObjects[8].setAttribute('type', padBanks.bankB.pad9.type);
  
            audioObjects[9].setAttribute('id', padBanks.bankB.pad10.id);
            audioObjects[9].setAttribute('name', padBanks.bankB.pad10.name);
            audioObjects[9].setAttribute('src', padBanks.bankB.pad10.src);
            audioObjects[9].setAttribute('type', padBanks.bankB.pad10.type);
  
            audioObjects[10].setAttribute('id', padBanks.bankB.pad11.id);
            audioObjects[10].setAttribute('name', padBanks.bankB.pad11.name);
            audioObjects[10].setAttribute('src', padBanks.bankB.pad11.src);
            audioObjects[10].setAttribute('type', padBanks.bankB.pad11.type);
  
            audioObjects[11].setAttribute('id', padBanks.bankB.pad12.id);
            audioObjects[11].setAttribute('name', padBanks.bankB.pad12.name);
            audioObjects[11].setAttribute('src', padBanks.bankB.pad12.src);
            audioObjects[11].setAttribute('type', padBanks.bankB.pad12.type);
  
            audioObjects[12].setAttribute('id', padBanks.bankB.pad13.id);
            audioObjects[12].setAttribute('name', padBanks.bankB.pad13.name);
            audioObjects[12].setAttribute('src', padBanks.bankB.pad13.src);
            audioObjects[12].setAttribute('type', padBanks.bankB.pad13.type);
  
            audioObjects[13].setAttribute('id', padBanks.bankB.pad14.id);
            audioObjects[13].setAttribute('name', padBanks.bankB.pad14.name);
            audioObjects[13].setAttribute('src', padBanks.bankB.pad14.src);
            audioObjects[13].setAttribute('type', padBanks.bankB.pad14.type);
  
            audioObjects[14].setAttribute('id', padBanks.bankB.pad15.id);
            audioObjects[14].setAttribute('name', padBanks.bankB.pad15.name);
            audioObjects[14].setAttribute('src', padBanks.bankB.pad15.src);
            audioObjects[14].setAttribute('type', padBanks.bankB.pad15.type);
  
            audioObjects[15].setAttribute('id', padBanks.bankB.pad16.id);
            audioObjects[15].setAttribute('name', padBanks.bankB.pad16.name);
            audioObjects[15].setAttribute('src', padBanks.bankB.pad16.src);
            audioObjects[15].setAttribute('type', padBanks.bankB.pad16.type);
            break;
  
          case 'pad bank : c':
            padBanks.bankA.isActive = false;
            padBanks.bankB.isActive = false;
            padBanks.bankC.isActive = true;
            padBanks.bankD.isActive = false;
            audioObjects[0].setAttribute('id', padBanks.bankC.pad1.id);
            audioObjects[0].setAttribute('name', padBanks.bankC.pad1.name);
            audioObjects[0].setAttribute('src', padBanks.bankC.pad1.src);
            audioObjects[0].setAttribute('type', padBanks.bankC.pad1.type);
  
            audioObjects[1].setAttribute('id', padBanks.bankC.pad2.id);
            audioObjects[1].setAttribute('name', padBanks.bankC.pad2.name);
            audioObjects[1].setAttribute('src', padBanks.bankC.pad2.src);
            audioObjects[1].setAttribute('type', padBanks.bankC.pad2.type);
  
            audioObjects[2].setAttribute('id', padBanks.bankC.pad3.id);
            audioObjects[2].setAttribute('name', padBanks.bankC.pad3.name);
            audioObjects[2].setAttribute('src', padBanks.bankC.pad3.src);
            audioObjects[2].setAttribute('type', padBanks.bankC.pad3.type);
  
            audioObjects[3].setAttribute('id', padBanks.bankC.pad4.id);
            audioObjects[3].setAttribute('name', padBanks.bankC.pad4.name);
            audioObjects[3].setAttribute('src', padBanks.bankC.pad4.src);
            audioObjects[3].setAttribute('type', padBanks.bankC.pad4.type);
  
            audioObjects[4].setAttribute('id', padBanks.bankC.pad5.id);
            audioObjects[4].setAttribute('name', padBanks.bankC.pad5.name);
            audioObjects[4].setAttribute('src', padBanks.bankC.pad5.src);
            audioObjects[4].setAttribute('type', padBanks.bankC.pad5.type);
  
            audioObjects[5].setAttribute('id', padBanks.bankC.pad6.id);
            audioObjects[5].setAttribute('name', padBanks.bankC.pad6.name);
            audioObjects[5].setAttribute('src', padBanks.bankC.pad6.src);
            audioObjects[5].setAttribute('type', padBanks.bankC.pad6.type);
  
            audioObjects[6].setAttribute('id', padBanks.bankC.pad7.id);
            audioObjects[6].setAttribute('name', padBanks.bankC.pad7.name);
            audioObjects[6].setAttribute('src', padBanks.bankC.pad7.src);
            audioObjects[6].setAttribute('type', padBanks.bankC.pad7.type);
  
            audioObjects[7].setAttribute('id', padBanks.bankC.pad8.id);
            audioObjects[7].setAttribute('name', padBanks.bankC.pad8.name);
            audioObjects[7].setAttribute('src', padBanks.bankC.pad8.src);
            audioObjects[7].setAttribute('type', padBanks.bankC.pad8.type);
  
            audioObjects[8].setAttribute('id', padBanks.bankC.pad9.id);
            audioObjects[8].setAttribute('name', padBanks.bankC.pad9.name);
            audioObjects[8].setAttribute('src', padBanks.bankC.pad9.src);
            audioObjects[8].setAttribute('type', padBanks.bankC.pad9.type);
  
            audioObjects[9].setAttribute('id', padBanks.bankC.pad10.id);
            audioObjects[9].setAttribute('name', padBanks.bankC.pad10.name);
            audioObjects[9].setAttribute('src', padBanks.bankC.pad10.src);
            audioObjects[9].setAttribute('type', padBanks.bankC.pad10.type);
  
            audioObjects[10].setAttribute('id', padBanks.bankC.pad11.id);
            audioObjects[10].setAttribute('name', padBanks.bankC.pad11.name);
            audioObjects[10].setAttribute('src', padBanks.bankC.pad11.src);
            audioObjects[10].setAttribute('type', padBanks.bankC.pad11.type);
  
            audioObjects[11].setAttribute('id', padBanks.bankC.pad12.id);
            audioObjects[11].setAttribute('name', padBanks.bankC.pad12.name);
            audioObjects[11].setAttribute('src', padBanks.bankC.pad12.src);
            audioObjects[11].setAttribute('type', padBanks.bankC.pad12.type);
  
            audioObjects[12].setAttribute('id', padBanks.bankC.pad13.id);
            audioObjects[12].setAttribute('name', padBanks.bankC.pad13.name);
            audioObjects[12].setAttribute('src', padBanks.bankC.pad13.src);
            audioObjects[12].setAttribute('type', padBanks.bankC.pad13.type);
  
            audioObjects[13].setAttribute('id', padBanks.bankC.pad14.id);
            audioObjects[13].setAttribute('name', padBanks.bankC.pad14.name);
            audioObjects[13].setAttribute('src', padBanks.bankC.pad14.src);
            audioObjects[13].setAttribute('type', padBanks.bankC.pad14.type);
  
            audioObjects[14].setAttribute('id', padBanks.bankC.pad15.id);
            audioObjects[14].setAttribute('name', padBanks.bankC.pad15.name);
            audioObjects[14].setAttribute('src', padBanks.bankC.pad15.src);
            audioObjects[14].setAttribute('type', padBanks.bankC.pad15.type);
  
            audioObjects[15].setAttribute('id', padBanks.bankC.pad16.id);
            audioObjects[15].setAttribute('name', padBanks.bankC.pad16.name);
            audioObjects[15].setAttribute('src', padBanks.bankC.pad16.src);
            audioObjects[15].setAttribute('type', padBanks.bankC.pad16.type);
            break;
  
          case 'pad bank : d':
            padBanks.bankA.isActive = false;
            padBanks.bankB.isActive = false;
            padBanks.bankC.isActive = false;
            padBanks.bankD.isActive = true;
            audioObjects[0].setAttribute('id', padBanks.bankD.pad1.id);
            audioObjects[0].setAttribute('name', padBanks.bankD.pad1.name);
            audioObjects[0].setAttribute('src', padBanks.bankD.pad1.src);
            audioObjects[0].setAttribute('type', padBanks.bankD.pad1.type);
  
            audioObjects[1].setAttribute('id', padBanks.bankD.pad2.id);
            audioObjects[1].setAttribute('name', padBanks.bankD.pad2.name);
            audioObjects[1].setAttribute('src', padBanks.bankD.pad2.src);
            audioObjects[1].setAttribute('type', padBanks.bankD.pad2.type);

  
            audioObjects[2].setAttribute('id', padBanks.bankD.pad3.id);
            audioObjects[2].setAttribute('name', padBanks.bankD.pad3.name);
            audioObjects[2].setAttribute('src', padBanks.bankD.pad3.src);
            audioObjects[2].setAttribute('type', padBanks.bankD.pad3.type);
  
            audioObjects[3].setAttribute('id', padBanks.bankD.pad4.id);
            audioObjects[3].setAttribute('name', padBanks.bankD.pad4.name);
            audioObjects[3].setAttribute('src', padBanks.bankD.pad4.src);
            audioObjects[3].setAttribute('type', padBanks.bankD.pad4.type);
  
            audioObjects[4].setAttribute('id', padBanks.bankD.pad5.id);
            audioObjects[4].setAttribute('name', padBanks.bankD.pad5.name);
            audioObjects[4].setAttribute('src', padBanks.bankD.pad5.src);
            audioObjects[4].setAttribute('type', padBanks.bankD.pad5.type);
  
            audioObjects[5].setAttribute('id', padBanks.bankD.pad6.id);
            audioObjects[5].setAttribute('name', padBanks.bankD.pad6.name);
            audioObjects[5].setAttribute('src', padBanks.bankD.pad6.src);
            audioObjects[5].setAttribute('type', padBanks.bankD.pad6.type);
  
            audioObjects[6].setAttribute('id', padBanks.bankD.pad7.id);
            audioObjects[6].setAttribute('name', padBanks.bankD.pad7.name);
            audioObjects[6].setAttribute('src', padBanks.bankD.pad7.src);
            audioObjects[6].setAttribute('type', padBanks.bankD.pad7.type);
  
            audioObjects[7].setAttribute('id', padBanks.bankD.pad8.id);
            audioObjects[7].setAttribute('name', padBanks.bankD.pad8.name);
            audioObjects[7].setAttribute('src', padBanks.bankD.pad8.src);
            audioObjects[7].setAttribute('type', padBanks.bankD.pad8.type);
  
            audioObjects[8].setAttribute('id', padBanks.bankD.pad9.id);
            audioObjects[8].setAttribute('name', padBanks.bankD.pad9.name);
            audioObjects[8].setAttribute('src', padBanks.bankD.pad9.src);
            audioObjects[8].setAttribute('type', padBanks.bankD.pad9.type);
  
            audioObjects[9].setAttribute('id', padBanks.bankD.pad10.id);
            audioObjects[9].setAttribute('name', padBanks.bankD.pad10.name);
            audioObjects[9].setAttribute('src', padBanks.bankD.pad10.src);
            audioObjects[9].setAttribute('type', padBanks.bankD.pad10.type);
  
            audioObjects[10].setAttribute('id', padBanks.bankD.pad11.id);
            audioObjects[10].setAttribute('name', padBanks.bankD.pad11.name);
            audioObjects[10].setAttribute('src', padBanks.bankD.pad11.src);
            audioObjects[10].setAttribute('type', padBanks.bankD.pad11.type);
  
            audioObjects[11].setAttribute('id', padBanks.bankD.pad12.id);
            audioObjects[11].setAttribute('name', padBanks.bankD.pad12.name);
            audioObjects[11].setAttribute('src', padBanks.bankD.pad12.src);
            audioObjects[11].setAttribute('type', padBanks.bankD.pad12.type);
  
            audioObjects[12].setAttribute('id', padBanks.bankD.pad13.id);
            audioObjects[12].setAttribute('name', padBanks.bankD.pad13.name);
            audioObjects[12].setAttribute('src', padBanks.bankD.pad13.src);
            audioObjects[12].setAttribute('type', padBanks.bankD.pad13.type);
  
            audioObjects[13].setAttribute('id', padBanks.bankD.pad14.id);
            audioObjects[13].setAttribute('name', padBanks.bankD.pad14.name);
            audioObjects[13].setAttribute('src', padBanks.bankD.pad14.src);
            audioObjects[13].setAttribute('type', padBanks.bankD.pad14.type);
  
            audioObjects[14].setAttribute('id', padBanks.bankD.pad15.id);
            audioObjects[14].setAttribute('name', padBanks.bankD.pad15.name);
            audioObjects[14].setAttribute('src', padBanks.bankD.pad15.src);
            audioObjects[14].setAttribute('type', padBanks.bankD.pad15.type);
  
            audioObjects[15].setAttribute('id', padBanks.bankD.pad16.id);
            audioObjects[15].setAttribute('name', padBanks.bankD.pad16.name);
            audioObjects[15].setAttribute('src', padBanks.bankD.pad16.src);
            audioObjects[15].setAttribute('type', padBanks.bankD.pad16.type);
            break;
          default:
            return;  
        }
      }
};

export default togglePadBanks;

