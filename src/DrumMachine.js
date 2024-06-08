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
  ////////////////// REC-GAIN DIAL START //////////////////////////////
  const recGainDial = document.querySelector('.rec-gain-dial');
  Draggable.create(recGainDial, {
    type: 'rotation',
    bounds: { minRotation: -120, maxRotation: 120 },
    inertia: true,
    onDrag: function () {
      const angle = this.rotation;
      console.log(`Rec-gain dial is being dragged. Angle: ${angle}`);
      setRecGainText(`REC GAIN: ${angle}`); 
      const newRecGain = (angle + 120) / 239;
      setRecGainText(`REC GAIN: ${Math.round(newRecGain * 100)}`);
    },
    onThrowUpdate: function () {
      const angle = this.rotation;
      console.log(`Rec-gain dial is being updated. Angle: ${angle}`);
      const newRecGain = (angle + 120) / 239;
      setRecGainText(`REC GAIN: ${Math.round(newRecGain * 100)}`);
    },
    onThrowComplete: function () {
      console.log(`Rec-gain dial drag complete.`);
    }
  });
  ////////////////// REC-GAIN DIAL END //////////////////////////////
  ////////////////// VOLUME DIAL START //////////////////////////////
  const volumeDial = document.querySelectorAll('.volume-dial')
  Draggable.create(volumeDial, {
    type: 'rotation',
    bounds: { minRotation: -120, maxRotation: 120 },
    inertia: true,
    onDrag: function () {
      const angle = this.rotation;
      console.log(`Volume dial is being dragged. Angle: ${angle}`);
      const newVolume = (angle + 120) / 239;
      setVolume(newVolume);
      setVolumeText(`Volume: ${Math.round(newVolume * 100)}`);
    },
    onThrowUpdate: function () {
      const angle = this.rotation;
      console.log(`Volume dial is being updated. Angle: ${angle}`);
      const newVolume = (angle + 120) / 239;
      setVolume(newVolume);
      setVolumeText(`Volume: ${Math.round(newVolume * 100)}`);
    },
    onThrowComplete: function () {
      console.log(`Volume dial drag complete.`);
    }
  });
  ////////////////// VOLUME DIAL END //////////////////////////////
  ////////////////// DATA DIAL START //////////////////////////////
  const dial = document.querySelector('.data-dial')
  Draggable.create(dial, {
    type: 'rotation',
    bounds: { minRotation: -10000, maxRotation: 10000 },
    inertia: true,
    onDrag: function () {
      const angle = this.rotation;
      console.log(`Dial is being dragged. Angle: ${angle}`);
      setDataText(`DATA: ${angle}`);  
    },
    onThrowUpdate: function () {
      const angle = this.rotation;
      console.log(`Dial is being updated. Angle: ${angle}`);
      setDataText(`Data: ${angle}`);
    },
    onThrowComplete: function () {
      console.log(`Dial drag complete.`);
    }
  });
  ////////////////// DATA DIAL END ///////////////////////////////
  ////////////////// FUNCTIONS START ///////////////////////////////
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
      setDisplayText('Power Off');
    }
  };

  // const handleVolumeChange = (event) => {
  //   const newVolume = event.target.value / 100;
  //   setVolume(newVolume);
  //   setVolumeText(`Volume: ${Math.round(newVolume * 100)}`);
  // };

  ////////////////// FUNCTIONS END ///////////////////////////////
  ////////////////// HTML START ///////////////////////////////
  return (
    <div id='container'>
      <div id='power-button' onClick={togglePower}>
        <div id='power-light' className={isPoweredOn ? 'on' : 'off'}></div>
      </div>
      <div id='drum-machine'>
        <div id='top-line'></div>
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
            </div>
          </div>
          <div id='dials'>
            <div id='dials-top'>
              <div id='f-numbers'>
                <div className='f-number'><p className='f-labels'>F1</p></div>
                <div className='f-number'><p className='f-labels'>F2</p></div>
                <div className='f-number'><p className='f-labels'>F3</p></div>
                <div className='f-number'><p className='f-labels'>F4</p></div>
                <div className='f-number'><p className='f-labels'>F5</p></div>
                <div className='f-number'><p className='f-labels'>F6</p></div>
              </div>
              <div id='blue-buttons-container'>
                <span className='shift no-shift'>7<div className='blue-buttons'></div><span className='blue-button-label-spans'>MIXER</span></span>
                <span className='shift no-shift'>8<div className='blue-buttons'></div><span className='blue-button-label-spans'>OTHER</span></span>
                <span className='shift no-shift'>9<div className='blue-buttons'></div><span className='blue-button-label-spans'>MIDI/SYNC</span></span>
                <span className='shift no-shift'>4<div className='blue-buttons'></div><span className='blue-button-label-spans'>SAMPLE</span></span>
                <span className='shift no-shift'>5<div className='blue-buttons'></div><span className='blue-button-label-spans'>TRIM</span></span>
                <span className='shift no-shift'>6<div className='blue-buttons'></div><span className='blue-button-label-spans'>PROGRAM</span></span>
                <span className='shift no-shift'>1<div className='blue-buttons'></div><span className='blue-button-label-spans'>SOUND</span></span>
                <span className='shift no-shift'>2<div className='blue-buttons'></div><span className='blue-button-label-spans'>MISC.</span></span>
                <span className='shift no-shift'>3<div className='blue-buttons '></div><span className='blue-button-label-spans'>LOAD</span></span>
                <span className='shift'>SHIFT<div className='blue-buttons white-button left'></div></span>
                <span className='shift no-shift'>0<div className='blue-buttons '></div></span>
                <span className='shift no-shift'>ENTER<div className='blue-buttons white-button left'></div><span className='blue-button-label-spans'>SAVE</span></span>
              </div>
              <div id='above-data-dial'>
                <div id='main-screen-button' className='above-dd-btns'><span id='main-screen-label'>MAIN SCREEN</span></div>
                <div id='open-window-button' className='above-dd-btns'><span id='open-window-label'>OPEN WINDOW</span></div>
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
                  <div id='bottom-left-light'><div id='after-light' className={isPoweredOn ? 'after-on' : 'after-off'}></div></div>
                  <div id='bottom-left-button'><span id='assign'></span></div>
                </div>
                <div id="volume-container">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    // value={volume * 100}
                    className="volume-slider"
                    // id="volume-range"
                    // onChange={handleVolumeChange}
                    disabled={!isPoweredOn}
                  />
                </div>
              </div>
              <div id='bottom-left-right-bottom'>
                  <div id='bottom-left-right-bottom-row-0'></div>
                  <div id='bottom-left-right-bottom-row-1'><span id='locate'>LOCATE</span>
                    <div className='bottom-left-right-bottom-row-1-buttons'></div>
                    <div className='bottom-left-right-bottom-row-1-buttons'></div>
                    <div className='bottom-left-right-bottom-row-1-buttons'></div>
                    <div className='bottom-left-right-bottom-row-1-buttons'></div>
                    <div className='bottom-left-right-bottom-row-1-buttons'></div>
                  </div>
                  <div id='bottom-left-right-bottom-row-2'>
                    <div className='bottom-left-right-bottom-row-2-buttons red-button'><div id='rec-light' className={isPoweredOn ? 'rec-on' : 'rec-off'}></div><div id='bottom-left-light'></div><span id='rec'>REC</span></div>
                    <div className='bottom-left-right-bottom-row-2-buttons red-button'><div id='over-dub-light' className={isPoweredOn ? 'over-dub-on' : 'over-dub-off'}></div><span id='over-dub'><div id='bottom-left-light'></div>OVER<br></br>DUB</span></div>
                    <div className='bottom-left-right-bottom-row-2-buttons'><span id='stop'>STOP</span></div>
                    <div className='bottom-left-right-bottom-row-2-buttons'><div id='play-light' className={isPoweredOn ? 'play-on' : 'play-off'}></div><span id='play'><div id='bottom-left-light'></div>PLAY</span></div>
                    <div className='bottom-left-right-bottom-row-2-buttons'><span id='play-start'>PLAY<br></br>START</span></div>
                  </div>
                </div>
            </div>
          </div>
        </div>
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
                <div id='full-level'>
                  <span id='full-level-span'>FULL LEVEL</span>
                  <div id='full-level-light' className={isPoweredOn ? 'full-level-on' : 'full-level-off'}></div>
                  <div id='Aa'><span id='Aa-span'>A/a</span></div>
                  <span>16 LEVELS</span>
                  <div id='sixteen-levels-light' className={isPoweredOn ? 'sixteen-levels-on' : 'sixteen-levels-off'}></div>
                  <div id='space'><span id='space-span'>SPACE</span></div>
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
                <div id='full-level'>
                  <span id='next-seq-span'>NEXT SEQ</span>
                  <div id='next-seq-light' className={isPoweredOn ? 'full-level-on' : 'full-level-off'}></div>
                  <span>TRACK MUTE</span>
                  <div id='sixteen-levels-light' className={isPoweredOn ? 'sixteen-levels-on' : 'sixteen-levels-off'}></div>
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
                <div className='pad-bank-buttons'></div>
                <div className='pad-bank-buttons'></div>
                <div className='pad-bank-buttons'></div>
                <div className='pad-bank-buttons'></div>
                <div className='pad-bank-buttons'></div>
                <div className='pad-bank-buttons'></div>
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
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' name='Closed HH' type='audio/mpeg' id='C'></audio>
            </div>
            <div className='drum-pad'>C
              <audio src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' name='Closed HH' type='audio/mpeg' id='C'></audio>
            </div>
          </div>
        </div>
        <div id='bottom-line'></div>
      </div>
    </div>
  );
};

export default DrumMachine;



  
  
  
  
  
  