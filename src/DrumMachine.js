import React, { useEffect, useState } from 'react';
import './DrumMachine.css';
import { Draggable } from 'gsap/Draggable';
import { gsap } from 'gsap';

gsap.registerPlugin(Draggable);

const DrumMachine = () => {
  const [volume, setVolume] = useState(0.5);
  const [displayText, setDisplayText] = useState('');
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [volumeText, setVolumeText] = useState('');
  const [dataText, setDataText] = useState('');
  const [recGainText, setRecGainText] = useState('');

  useEffect(() => {
    const pads = document.querySelectorAll('.drum-pad');
    pads.forEach(pad => {
      pad.addEventListener('click', handlePadClick);
    });

    document.addEventListener('keydown', handleKeyPress);

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      pads.forEach(pad => {
        pad.removeEventListener('click', handlePadClick);
      });
      document.removeEventListener('keydown', handleKeyPress);
      clearInterval(interval);
    };
  }, [volume, isPoweredOn]);

  useEffect(() => {
    // REC-GAIN DIAL
    const recGainDial = document.querySelector('.rec-gain-dial');
    Draggable.create(recGainDial, {
      type: 'rotation',
      bounds: { minRotation: -120, maxRotation: 120 },
      inertia: true,
      onDrag: function () {
        const angle = this.rotation;
        const newRecGain = (angle + 120) / 239;
        setRecGainText(`REC GAIN: ${Math.round(newRecGain * 100)}`);
      },
      onThrowUpdate: function () {
        const angle = this.rotation;
        const newRecGain = (angle + 120) / 239;
        setRecGainText(`REC GAIN: ${Math.round(newRecGain * 100)}`);
      },
    });

    // VOLUME DIAL
    const volumeDial = document.querySelector('.volume-dial');
    Draggable.create(volumeDial, {
      type: 'rotation',
      bounds: { minRotation: -120, maxRotation: 120 },
      inertia: true,
      onDrag: function () {
        const angle = this.rotation;
        const newVolume = (angle + 120) / 239;
        setVolume(newVolume);
        setVolumeText(`Volume: ${Math.round(newVolume * 100)}`);
      },
      onThrowUpdate: function () {
        const angle = this.rotation;
        const newVolume = (angle + 120) / 239;
        setVolume(newVolume);
        setVolumeText(`Volume: ${Math.round(newVolume * 100)}`);
      },
    });

    // DATA DIAL
    const dataDial = document.querySelector('.data-dial');
    Draggable.create(dataDial, {
      type: 'rotation',
      bounds: { minRotation: -10000, maxRotation: 10000 },
      inertia: true,
      onDrag: function () {
        const angle = this.rotation;
        setDataText(`DATA: ${angle}`);
      },
      onThrowUpdate: function () {
        const angle = this.rotation;
        setDataText(`DATA: ${angle}`);
      },
    });
  }, []);

  useEffect(() => {
    const AllButtons = document.querySelectorAll('.button');

    AllButtons.forEach(button => {
      button.addEventListener('click', handleButtonClick);
    });

    return () => {
      AllButtons.forEach(button => {
        button.removeEventListener('click', handleButtonClick);
      });
    };
  }, [isPoweredOn]);

  const handlePadClick = (event) => {
    if (!isPoweredOn) return;

    const pad = event.currentTarget;
    const audio = pad.querySelector('audio');
    const soundName = audio.getAttribute('name');
    setDisplayText(soundName);

    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
    pad.classList.add('pressed');
    setTimeout(() => pad.classList.remove('pressed'), 100);
  };

  const handleKeyPress = (event) => {
    if (!isPoweredOn) return;

    const key = event.key.toUpperCase();
    const pad = document.getElementById(key)?.parentElement;
    if (pad) {
      pad.click();
    }
  };

  const togglePower = () => {
    setIsPoweredOn(prevState => !prevState);
    if (!isPoweredOn) {
      setDisplayText('');
      setVolumeText('');
      setDataText('');
      setRecGainText('');
    } else {
      setDisplayText('POWER OFF');
    }
  };

  const handleButtonClick = (event) => {
    if (!isPoweredOn) return;
    const button = event.currentTarget;
    const buttonName = button.getAttribute('name');
    console.log(`Button Clicked: ${buttonName}`);
    if (buttonName.startsWith('c')) {
      return;
    } else {
    button.classList.add('pressed');
    setTimeout(() => {
      button.classList.remove('pressed')
    }, 100);
    }
    
  
    const lights = {
      name: [
        'assign',
        'record',
        'over',
        'play',
        'full',
        'sixteen',
        'next',
        'track',
        'undo'
      ]
    };
  
    //  F Lights START
    if (buttonName.startsWith('f')) {
      const fLights = document.querySelectorAll('.f-light');
      switch (buttonName) {
        case 'f1':
          button.classList.add('f-pressed');
          setTimeout(() => button.classList.remove('f-pressed'), 100);
          fLights[0].classList.add('f-on');
          setTimeout(() => fLights[0].classList.remove('f-on'), 100);
          break;
        case 'f2':
          button.classList.add('f-pressed');
          setTimeout(() => button.classList.remove('f-pressed'), 100);
          fLights[1].classList.add('f-on');
          setTimeout(() => fLights[1].classList.remove('f-on'), 100);
          break;
        case 'f3':
          button.classList.add('f-pressed');
          setTimeout(() => button.classList.remove('f-pressed'), 100);
          fLights[2].classList.add('f-on');
          setTimeout(() => fLights[2].classList.remove('f-on'), 100);
          break;
        case 'f4':
          button.classList.add('f-pressed');
          setTimeout(() => button.classList.remove('f-pressed'), 100);
          fLights[3].classList.add('f-on');
          setTimeout(() => fLights[3].classList.remove('f-on'), 100);
          break;
        case 'f5':
          button.classList.add('f-pressed');
          setTimeout(() => button.classList.remove('f-pressed'), 100);
          fLights[4].classList.add('f-on');
          setTimeout(() => fLights[4].classList.remove('f-on'), 100);
          break;
        case 'f6':
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
  
  return (
    <div id='container'>
      <div id='power-button' onClick={togglePower}>
        <div id='power-light' className={isPoweredOn ? 'power-on' : 'power-off'}></div>
      </div>
      <div id='top-cover'></div>
      <div id='drum-machine'>
        <div id='top-line'></div>
        {/* LEFT COLUMN START */}
        <div id='left-col'>
          <div id='display-container'>
            <div id='inner-display'>
              <div id='display'>
                <div id='display-border'>
                  <div id='display-spans'>
                    <span id='time'>{currentTime.toLocaleTimeString()}</span>
                    <span id='display-text'>{displayText}</span>
                    <span id='volume'>{volumeText}</span>
                    <span id='data-text'>{dataText}</span>
                    <span id='rec-gain-text'>{recGainText}</span>
                  </div>
                </div>
              </div>
              <div id='f-lights'>
                <div id='f1' className='f-light'>F1</div>
                <div id='f2' className='f-light'>F2</div>
                <div id='f3' className='f-light'>F3</div>
                <div id='f4' className='f-light'>F4</div>
                <div id='f5' className='f-light'>F5</div>
                <div id='f6' className='f-light'>F6</div>
              </div>
            </div>
          </div>
          <div id='dials'>
            <div id='dials-top'>
              <div id='f-buttons'>
                <p className='f-button-labels' >F1</p>
                <div className='button f-button' name='f1'></div>
                  
                <p className='f-button-labels'>F2</p>
                <div className='button f-button' name='f2'></div>
                  
                <p className='f-button-labels'>F3</p>
                <div className='button f-button' name='f3'></div>
                  
                <p className='f-button-labels'>F4</p>
                <div className='button f-button' name='f4'></div>
                  
                <p className='f-button-labels'>F5</p>
                <div className='button f-button' name='f5'></div>
                  
                <p className='f-button-labels'>F6</p>
                <div className='button f-button' name='f6'></div>
              </div>
              <div id='blue-buttons-container'>
                <span className='shift no-shift'>7<div className='button blue-buttons' name='mixer'></div><span className='blue-button-label-spans'>MIXER</span></span>
                <span className='shift no-shift'>8<div className='button blue-buttons' name='other'></div><span className='blue-button-label-spans'>OTHER</span></span>
                <span className='shift no-shift'>9<div className='button blue-buttons' name='midi/sync'></div><span className='blue-button-label-spans'>MIDI/SYNC</span></span>
                <span className='shift no-shift'>4<div className='button blue-buttons' name='sample'></div><span className='blue-button-label-spans'>SAMPLE</span></span>
                <span className='shift no-shift'>5<div className='button blue-buttons' name='trim'></div><span className='blue-button-label-spans'>TRIM</span></span>
                <span className='shift no-shift'>6<div className='button blue-buttons' name='program'></div><span className='blue-button-label-spans'>PROGRAM</span></span>
                <span className='shift no-shift'>1<div className='button blue-buttons' name='sound'></div><span className='blue-button-label-spans'>SOUND</span></span>
                <span className='shift no-shift'>2<div className='button blue-buttons' name='misc'></div><span className='blue-button-label-spans'>MISC.</span></span>
                <span className='shift no-shift'>3<div className='button blue-buttons' name='load'></div><span className='blue-button-label-spans'>LOAD</span></span>
                <span className='shift'>SHIFT<div className='button blue-buttons white-button left' name='shift'></div></span>
                <span className='shift no-shift'>0<div className='button blue-buttons' name='0'></div></span>
                <span className='shift no-shift'>ENTER<div className='button blue-buttons white-button left' name='enter'></div><span className='blue-button-label-spans'>SAVE</span></span>
              </div>
              <div id='above-data-dial'>
                <div id='main-screen-button' className='button above-dd-btns' name='main screen'><span id='main-screen-label'>MAIN SCREEN</span></div>
                <div id='open-window-button' className='button above-dd-btns' name='open window'><span id='open-window-label'>OPEN WINDOW</span></div>
                <div id='data'>DATA</div>
              </div>
              <div id='data-knob' className="data-dial">
                <img id='dial-png3' src='https://www.svgrepo.com/show/521865/sun.svg' alt='Dial'/>
                <div id='inner-knob'>
                  <div id='knob'></div>
                </div>
              </div>
            </div>
            <div id='dials-bottom'>
              <div id='bottom-left'>
                <div id='bottom-left-top'>
                  <div id='note-variation'>NOTE<br></br>VARIATION</div>
                  <div id='after'>AFTER</div>
                  <div id='bottom-left-light'><div id='assign' className='off'></div></div>
                  <div id='bottom-left-button' className='button' name='assign'><span id='assign-span'>ASSIGN</span></div>
                </div>
                <div id="note-variation-container">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    className="note-variation-slider"
                    disabled={!isPoweredOn}
                  />
                </div>
              </div>
                  <div id='bottom-left-right-top-container'>
                    <div id='tap-tempo'><span id='tap-tempo-span'>TAP TEMPO NOTE REPEAT</span></div>
                    <div id='tap-tempo-button' className='button' name='tempo'></div>
                  </div>
                  <div id='bottom-left-right-mid-container'>
                    <div id='undo-seq'><span id='undo-seq-span'>UNDO SEQ</span><div id='undo' className='off'></div></div>
                    <div id='undo-seq-button' className='button' name='undo'></div>
                  </div>
                  <div id='bottom-left-right-bottom-container'>
                    <div id='erase'><span id='erase-span'>ERASE</span></div>
                    <div id='erase-button' className='button' name='erase'></div>
                  </div>
                  <div id='bottom-left-right-bottom-right-container'>
                    <div id='cursor'><span id='cursor-span'>CURSOR</span></div>
                    <div id='cursor-buttons'>
                      <div id='line-top-left'></div>
                
                      <div id='line-top-right'></div>
                      <div id='line-bottom-left'></div>
                      <div id='line-bottom-right'></div>
                      <div id='cursor-left' className='button' name='cursor-left'><img id='chevron-left' src='https://cdn-icons-png.flaticon.com/512/120/120890.png' alt='Chevron Left'/></div>
                      <div id='cursor-button-middle-container'>
                        <div id='cursor-top' className='button' name='cursor-top'><img id='chevron-up' src='https://cdn-icons-png.flaticon.com/512/120/120890.png' alt='Chevron Up'/></div>
                        <div id='line-middle'></div>
                        <div id='cursor-bottom' className='button' name='cursor-bottom'><img id='chevron-down' src='https://cdn-icons-png.flaticon.com/512/120/120890.png' alt='Chevron Down'/></div>
                      </div>
                      <div id='cursor-right' className='button' name='cursor-right'><img id='chevron-right' src='https://cdn-icons-png.flaticon.com/512/120/120890.png' alt='Chevron Right'/></div>
                      <span id='digit-span'><img id='chevron-left-small' src='https://cdn-icons-png.flaticon.com/512/120/120890.png' alt='Chevron Left'/><span className='digit-span-gap'></span> DIGIT<span className='digit-span-gap'></span> <img id='chevron-right-small' src='https://cdn-icons-png.flaticon.com/512/120/120890.png' alt='Chevron Right'/></span>
                    </div>
                  </div>
              <div id='bottom-left-right-bottom'>
                  <div id='bottom-left-right-bottom-row-1'><span id='locate'>LOCATE</span>
                    <div id='locate-labels-container'>
                      <span id='step-chevron-left'><img id='step-chev-left' className='chev' src='https://ipfs.io/ipfs/QmbyuMMHpBoEQgvVXHx31Y1txzofyuYe1BqxXEQ5zUpGxU?filename=chevron.png' alt='Chevron Left'/></span>
                      <span id='step-span'>STEP</span>
                      <span id='step-chevron-right'><img id='step-chev-right' className='chev' src='https://ipfs.io/ipfs/QmbyuMMHpBoEQgvVXHx31Y1txzofyuYe1BqxXEQ5zUpGxU?filename=chevron.png' alt='Chevron Right'/></span>
                      
                      <span id='goto-span'>GO TO</span>
                      <span id='bar-chevron-left'><img id='bar-chev-left' className='bar-chev' src='https://ipfs.io/ipfs/QmPQU3m2FrjsXZBu2x9jSfqDRaMgY7adpTiSxDK64yT8hd?filename=two-left-chevrons.png' alt='Double Chevron Left'/></span>
                      <span id='bar-span'>BAR</span>
                      <span id='bar-chevron-right'><img id='bar-chev-right' className='bar-chev' src='https://ipfs.io/ipfs/QmPQU3m2FrjsXZBu2x9jSfqDRaMgY7adpTiSxDK64yT8hd?filename=two-left-chevrons.png' alt='Double Chevron Right'/></span>
                    </div>

                    <div className='bottom-left-right-bottom-row-1-buttons button' name='step left'></div>
                    <div className='bottom-left-right-bottom-row-1-buttons button' name='step-right'></div>
                    <div className='bottom-left-right-bottom-row-1-buttons button' name='go to'></div>
                    <div className='bottom-left-right-bottom-row-1-buttons button' name='bar left'></div>
                    
                    <div className='bottom-left-right-bottom-row-1-buttons button' name='bar right'></div>
                  </div>
                  <div id='bottom-left-right-bottom-row-2'>
                    <div className='bottom-left-right-bottom-row-2-buttons red-button button' name='record'><div id='record' className='off'></div><div id='bottom-left-light'></div><span id='rec'>REC</span></div>
                    <div className='bottom-left-right-bottom-row-2-buttons red-button button' name='over'><div id='over' className='off'></div><span id='over-dub'><div id='bottom-left-light'></div>OVER<br></br>DUB</span></div>
                    <div className='bottom-left-right-bottom-row-2-buttons button' name='stop'><span id='stop'>STOP</span></div>
                    <div className='bottom-left-right-bottom-row-2-buttons button' name='play'><div id='play' className='off'></div><span id='play-span'><div id='bottom-left-light'></div>PLAY</span></div>
                    <div className='bottom-left-right-bottom-row-2-buttons button' name='play start'><span id='play-start'>PLAY<br></br>START</span></div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        {/* RIGHT COLUMN START */}
        <div id='right-col'>
          <div id='logo'>
            <span id='H'>H</span>
            <img id='akai-logo' src='https://musiccitycanada.com/cdn/shop/collections/akai_1200x630.png?v=1554830919' alt='Akai Logo' />
            <div id='logo-div'>FCC<strong>2000</strong>XL
              <div id='line'></div>
              <div id='midi'>MIDI PRODUCTION CENTER</div>
            </div>
          </div>
          <div id='panel'>
            <div id='panel-top'>
              <div id='panel-top-left'>
                <div id='full-level-div'>
                  <span id='full-level-span'>FULL LEVEL</span>
                  <div id='full' className={isPoweredOn ? 'full-on' : 'off'}></div>
                  <div id='Aa' className='button' name='full'><span id='Aa-span'>A/a</span></div>
                  <span>16 LEVELS</span>
                  <div id='sixteen' className='off'></div>
                  <div id='space' className='button' name='sixteen'><span id='space-span'>SPACE</span></div>
                </div>
              </div>
              <div id='panel-top-right'>
                  <div id='panel-top-right-labels'>
                    <div id='rec-gain-label'>REC GAIN</div>
                    <div id='main-volume-label'>MAIN VOLUME</div>
                  </div>
                  <img id='dial-png' src='https://www.svgrepo.com/show/478370/volume-knob.svg' alt='Dial'/>
                  <div className="viewport-box">
                    <div className="rec-gain-dial"><div className="dial-inner"></div><div className='indicator'></div></div>
                  </div>
                  <div id='min-max'><div>MIN</div><div>MAX</div></div>
                  <img id='dial-png2' src='https://www.svgrepo.com/show/478370/volume-knob.svg' alt='Dial'/>
                  <div className="viewport-box">
                    <div className="volume-dial"><div className="dial-inner"></div><div className='indicator'></div></div>
                  </div>
                  <div id='min-max2'><div>MIN</div><div>MAX</div></div>
                </div>
            </div>
            <div id='panel-bottom'>
              <div id='panel-bottom-left'>
                <div id='panel-bottom-left-inner'>
                  <div id='next-seq-span'>NEXT SEQ</div>
                  <div id='next' className='off'></div>
                  <div>TRACK MUTE</div>
                  <div id='track' className='off'></div>
                </div>
              </div>
              <div id='panel-bottom-right'>
                <div id='pad-bank-line'>
                  <div id='pad-bank-top-border'></div>
                  <span id='pad-bank-label'>PAD BANK</span>
                  <div id='pad-bank-labels'>
                    <div>A<div id='pad-bank-a-light' className={isPoweredOn ? 'pad-bank-a-on' : 'pad-bank-a-off'}></div></div>
                    <div>B<div id='pad-bank-b-light' className={isPoweredOn ? 'pad-bank-b-on' : 'pad-bank-b-off'}></div></div>
                    <div>C<div id='pad-bank-c-light' className={isPoweredOn ? 'pad-bank-c-on' : 'pad-bank-c-off'}></div></div>
                    <div>D<div id='pad-bank-d-light' className={isPoweredOn ? 'pad-bank-d-on' : 'pad-bank-d-off'}></div></div>
                  </div>
                </div>
                <div id='pad-bank-buttons'>
                  <div className='pad-bank-buttons button' name='next'></div>
                  <div className='pad-bank-buttons button' name='track'></div>
                  <div className='pad-bank-buttons button' name='pad bank a'></div>
                  <div className='pad-bank-buttons button' name='pad bank b'></div>
                  <div className='pad-bank-buttons button' name='pad bank c'></div>
                  <div className='pad-bank-buttons button' name='pad bank d'></div>
                </div>
              </div>
            </div>
          </div>
          <div id='drum-pad'>
            <div className='drum-pad'>Q
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3' name='Heater 1' type='audio/mpeg' id='Q'></audio>
            </div>
            <div className='drum-pad'>W
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3' name='Heater 2' type='audio/mpeg' id='W'></audio>
            </div>
            <div className='drum-pad'>E
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3' name='Heater 3' type='audio/mpeg' id='E'></audio>
            </div>
            <div className='drum-pad'>A
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3' name='Heater 4' type='audio/mpeg' id='A'></audio>
            </div>
            <div className='drum-pad'>S
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3' name='Clap' type='audio/mpeg' id='S'></audio>
            </div>
            <div className='drum-pad'>D
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3' name='Open HH' type='audio/mpeg' id='D'></audio>
            </div>
            <div className='drum-pad'>Z
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3' name="Kick n' Hat" type='audio/mpeg' id='Z'></audio>
            </div>
            <div className='drum-pad'>X
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3' name='Kick' type='audio/mpeg' id='X'></audio>
            </div>
            <div className='drum-pad'>C
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' name='Closed HH' type='audio/mpeg' id='C'></audio>
            </div>
            <div className='drum-pad'>C
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' name='Closed HH' type='audio/mpeg' id='C'></audio>
            </div>
            <div className='drum-pad'>C
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' name='Closed HH' type='audio/mpeg' id='C'></audio>
            </div>
            <div className='drum-pad'>C
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' name='Closed HH' type='audio/mpeg' id='C'></audio>
            </div>
            <div className='drum-pad'>C
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' name='Closed HH' type='audio/mpeg' id='C'></audio>
            </div>
            <div className='drum-pad'>C
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' name='Closed HH' type='audio/mpeg' id='C'></audio>
            </div>
            <div className='drum-pad'>C
              <audio src='https://ipfs.io/ipfs/QmbVAJe8G14Wj5kbkVC7KgUyvpy3JYgHgrPUFLLLxgJoki?filename=78_DillaClassicBeat_TL.wav' name='Classic Dilla' type='audio/mpeg' id='C'></audio>
            </div>
            <div className='drum-pad'>C
              <audio src='https://ipfs.io/ipfs/QmWEzZF29qmbCTGjm9bEYWoDzuJ6h9sXvCQKXWf1oBNizT?filename=150_ReelToReelDrums_Taped_FX_20_TL.wav' name='Hip Hop Pack' type='audio/mpeg' id='C'></audio>
            </div>
          </div>
        </div>
        <div id='bottom-line'></div>
      </div>
      {/* <div id='shape'></div> */}
    </div>
  );
};

export default DrumMachine;




  
  
  
  
  
  