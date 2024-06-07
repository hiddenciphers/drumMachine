import React, { useEffect, useState } from 'react';
import './DrumMachine.css';

const DrumMachine = () => {
  const [volume, setVolume] = useState(0.5);
  const [displayText, setDisplayText] = useState('');
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [volumeText, setVolumeText] = useState('');

  useEffect(() => {
    const pads = document.querySelectorAll('.drum-pad');
    pads.forEach(pad => {
      pad.addEventListener('click', handlePadClick);
    });

    // Add keydown event listener
    document.addEventListener('keydown', handleKeyPress);

    // Update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup event listeners and interval on component unmount
    return () => {
      pads.forEach(pad => {
        pad.removeEventListener('click', handlePadClick);
      });
      document.removeEventListener('keydown', handleKeyPress);
      clearInterval(interval);
    };
  }, [volume, isPoweredOn]);

  const handlePadClick = (event) => {
    if (!isPoweredOn) return;

    const pad = event.currentTarget;
    const audio = pad.querySelector('audio');
    const soundName = audio.getAttribute('name');
    setDisplayText(soundName);

    audio.volume = volume;
    audio.currentTime = 0; // Rewind to the start
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

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value / 100;
    setVolume(newVolume);
    setVolumeText(`Volume: ${Math.round(newVolume * 100)}`);
  };

  const togglePower = () => {
    setIsPoweredOn(prevState => !prevState);
    if (!isPoweredOn) {
      setDisplayText('');
      setVolumeText('');
    } else {
      setDisplayText('Power Off');
    }
  };

  return (
    <div id='container'>
      <div id='power-button' onClick={togglePower}>
        <div id='power-light' className={isPoweredOn ? 'on' : 'off'}></div>
      </div>
      <div id='drum-machine'>
        <div id='left-col'>
          <div id='display-container'>
            <div id='inner-display'>
              <div id='display'>
                <div id='display-spans'>
                  <span id='time'>{currentTime.toLocaleTimeString()}</span>
                  <br />
                  <span id='text'>{displayText}</span>
                  <br />
                  <span id='volume'>{volumeText}</span>
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
              <div id='data-knob'>
                <div id='inner-knob'>
                  <div id='knob'></div>
                </div>
              </div>
            </div>
            <div id='dials-bottom'>
              <div id='bottom-left'>
                <div id='power'></div>
                <div id="volume-container">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={volume * 100}
                    className="volume-slider"
                    id="volume-range"
                    onChange={handleVolumeChange}
                    disabled={!isPoweredOn}
                  />
                </div>
              </div>
              <div id=''></div>
              <div id='bank'>
                <div id='bank-switch'></div>
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
            <div id='panel-inner'></div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;

  
  
  
  
  
  