// utils.js
export const setAudioAttributes = (audioElement, pad) => {
    audioElement.setAttribute('id', pad.id);
    audioElement.setAttribute('name', pad.name);
    audioElement.setAttribute('src', pad.src);
    audioElement.setAttribute('type', pad.type);
  };


  

export const handleMultipleButtons = (button, buttonName) => {
  if (buttonName.startsWith('cursor')) {
    return;
  } else if (buttonName.startsWith('full') || buttonName.startsWith('six') || buttonName.startsWith('step') || buttonName.startsWith('go') || buttonName.startsWith('bar')) {
    button.classList.add('full-sixteen-pressed');
    setTimeout(() => {
      button.classList.remove('full-sixteen-pressed')
    }, 100);
  } else {
    button.classList.add('pressed');
    setTimeout(() => {
      button.classList.remove('pressed')
    }, 100);
  }
};

export const handleLights = (button, buttonName) => {

  const lights = {
    name: [
      'assign',
      'record',
      'over-dub',
      'play',
      'full-level',
      'sixteen-levels',
      'next-seq',
      'track-mute',
      'undo-seq'
    ]
  };
  const fButtons = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6'];

  //  F Lights START
  if (fButtons.includes(buttonName)) {
    const fLights = document.querySelectorAll('.f-light');
    switch (buttonName) {
      case 'F1':
        button.classList.add('f-pressed');
        setTimeout(() => button.classList.remove('f-pressed'), 100);
        fLights[0].classList.add('f-on');
        setTimeout(() => fLights[0].classList.remove('f-on'), 100);
        break;
      case 'F2':
        button.classList.add('f-pressed');
        setTimeout(() => button.classList.remove('f-pressed'), 100);
        fLights[1].classList.add('f-on');
        setTimeout(() => fLights[1].classList.remove('f-on'), 100);
        break;
      case 'F3':
        button.classList.add('f-pressed');
        setTimeout(() => button.classList.remove('f-pressed'), 100);
        fLights[2].classList.add('f-on');
        setTimeout(() => fLights[2].classList.remove('f-on'), 100);
        break;
      case 'F4':
        button.classList.add('f-pressed');
        setTimeout(() => button.classList.remove('f-pressed'), 100);
        fLights[3].classList.add('f-on');
        setTimeout(() => fLights[3].classList.remove('f-on'), 100);
        break;
      case 'F5':
        button.classList.add('f-pressed');
        setTimeout(() => button.classList.remove('f-pressed'), 100);
        fLights[4].classList.add('f-on');
        setTimeout(() => fLights[4].classList.remove('f-on'), 100);
        break;
      case 'F6':
        button.classList.add('f-pressed');
        setTimeout(() => button.classList.remove('f-pressed'), 100);
        fLights[5].classList.add('f-on');
        setTimeout(() => fLights[5].classList.remove('f-on'), 100);
        break;
      default:
        break;
    }
  } else if (lights.name.includes(buttonName)) {
    const light = document.querySelector(`#${buttonName}`);
    light.classList.remove('off');
    setTimeout(() => light.classList.add('off'), 100);
    light.classList.add('on');
    setTimeout(() => light.classList.remove('on'), 100);
  }
};


