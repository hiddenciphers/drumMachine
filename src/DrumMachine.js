// useRef
import React, { useEffect, useState } from 'react';
import './DrumMachine.css';
import padBanks from './PadBanks';
import togglePadBanks from './PadToggle';
import setDefaultPads from './Default';
import { Draggable } from 'gsap/Draggable';
import { gsap } from 'gsap';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
// import audioBufferToWav from 'audiobuffer-to-wav';
// import lamejs from 'lamejs';

gsap.registerPlugin(Draggable);

const DrumMachine = () => {
  const [volume, setVolume] = useState(0.5);
  const [displayText, setDisplayText] = useState('');
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [volumeText, setVolumeText] = useState('');
  const [dataText, setDataText] = useState('');
  const [recGainText, setRecGainText] = useState('');
  const [buttonClickedText, setButtonClickedText] = useState('');
  const [recordingInfo, setRecordingInfo] = useState('');
  const [noteVariation, setNoteVariation] = useState(0.5);
  const [noteVariationText, setNoteVariationText] = useState('');
  const [padBankText, setPadBankText] = useState('A');
  const [padText, setPadText] = useState('');
  const [displayLogo, setDisplayLogo] = useState('');
  const [visualizer, setVisualizer] = useState('');
  // const [isRecording, setIsRecording] = useState('');
  // const audioContext = useRef(new (window.AudioContext || window.AudioContext)());
  // const [sequence, setSequence] = useState([]);
  // const mediaRecorder = useRef(null);
  // const audioChunks = useRef([]);
  // const recordingStartTime = useRef(null);

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
        setRecGainText(` ${Math.round(newRecGain * 100)}`);
      },
      onThrowUpdate: function () {
        const angle = this.rotation;
        const newRecGain = (angle + 120) / 239;
        setRecGainText(` ${Math.round(newRecGain * 100)}`);
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
        const newVolume = (angle + 120) / 240;
        setVolume(newVolume);
        setVolumeText(` ${Math.round(newVolume * 100)}`);
      },
      onThrowUpdate: function () {
        const angle = this.rotation;
        const newVolume = (angle + 120) / 240;
        setVolume(newVolume);
        setVolumeText(` ${Math.round(newVolume * 100)}`);
      },
    });

    // DATA DIAL
    const dataDial = document.querySelector('.data-dial');
    Draggable.create(dataDial, {
      type: 'rotation',
      bounds: { minRotation: -10000, maxRotation: 10000 },
      inertia: true,
      onDrag: function () {
        const angle = Math.floor(this.rotation);
        setDataText(` ${angle}`);
      },
      onThrowUpdate: function () {
        const angle = this.rotation;
        setDataText(` ${angle}`);
      },
    });
  }, []);

  useEffect(() => {
    setDefaultPads(padBanks);

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
    setPadText(pad.getAttribute('name'));
    const audio = pad.querySelector('audio');
    const soundName = audio.getAttribute('name');
    setDisplayText(soundName);

    // Get all audio elements
    const audioElements = document.getElementsByClassName('audio-objects');
    const audioElementArray = Array.from(audioElements);

    // Create the AudioMotionAnalyzer instance
    const audioMotion = new AudioMotionAnalyzer(
      document.getElementById('viz-container'),
      {
        height: 70,
        ansiBands: false,
        showScaleX: false,
        bgAlpha: 0,
        overlay: true,
        mode: 6,
        frequencyScale: "log",
        showPeaks: false,
        smoothing: 0.7,
        ledBars: false
      }
    );

    // Register a custom gradient with black color
    audioMotion.registerGradient('black', {
      bgColor: 'black',
      colorStops: [
        { pos: 0, color: 'black' },
        { pos: 1, color: 'black' }
      ]
    });

    // Set the custom gradient
    audioMotion.setOptions({ gradient: 'black' });

    // Connect each audio element to the analyzer
    audioElementArray.forEach(audioElement => {
      audioMotion.connectInput(audioElement);
    });


    

    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
    pad.classList.add('pressed');
    setTimeout(() => pad.classList.remove('pressed'), 100);

    // if (isRecording) {
    //   const timeStamp = audioContext.current.currentTime - recordingStartTime.current;
    //   setSequence(prevSequence => [...prevSequence, { soundName, timeStamp }]);
    // }
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
      setButtonClickedText('');
      setRecordingInfo('');
      setPadText('');
      setDisplayLogo('');
      setVisualizer('');
    } else {
      setDisplayText('');
    }
  };

  const handleNoteVariationChange = (event) => {
    const newNoteVariation = event.target.value / 100;
    setNoteVariation(newNoteVariation);
    setNoteVariationText(` ${Math.round(newNoteVariation * 100)}`);
  };

  const handleButtonClick = (event) => {
    if (!isPoweredOn) return;
  
    const button = event.currentTarget;
    const buttonName = button.getAttribute('name');
    setButtonClickedText(buttonName);
  
    togglePadBanks(padBanks, buttonName);
  
    if (buttonName.startsWith('pad')) {
      switch (buttonName) {
        case 'pad bank : a':
          setPadBankText('A');
          break;
        case 'pad bank : b':
          setPadBankText('B');
          break;
        case 'pad bank : c':
          setPadBankText('C');
          break;
        case 'pad bank : d':
          setPadBankText('D');
          break;
        default:
          setPadBankText(padBankText);
      }
    }
  
    // if (buttonName === 'record') {
    //   if (isRecording) {
    //     stopRecording();
    //   } else {
    //     startRecording();
    //   }
    // } else if (buttonName === 'play') {
    //   playSequence();
    //     return;
    // }
  
    if (buttonName.startsWith('cursor')) {
      return;
    } else if (buttonName === 'full-level' || buttonName === 'sixteen-levels' || buttonName.startsWith('step') || buttonName.startsWith('go') || buttonName.startsWith('bar')) {
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
  
  // const startRecording = async () => {
  //   setIsRecording(true);
    // setSequence([]);
    // recordingStartTime.current = audioContext.current.currentTime;
  
    // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // mediaRecorder.current = new MediaRecorder(stream);
  
    // mediaRecorder.current.ondataavailable = event => {
    //   audioChunks.current.push(event.data);
    // };
  
    // mediaRecorder.current.onstop = async () => {
    //   const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
    //   const arrayBuffer = await audioBlob.arrayBuffer();
    //   audioContext.current.decodeAudioData(arrayBuffer, buffer => {
    //     const mp3Buffer = encodeMp3(buffer);
    //     const mp3Blob = new Blob(mp3Buffer, { type: 'audio/mp3' });
    //     const url = URL.createObjectURL(mp3Blob);
    //     const a = document.createElement('a');
    //     a.style.display = 'none';
    //     a.href = url;
    //     a.download = 'recording.mp3';
    //     document.body.appendChild(a);
    //     a.click();
    //     URL.revokeObjectURL(url);
    //     setRecordingInfo('Recording saved as recording.mp3');
    //     audioChunks.current = [];  // Clear audio chunks after saving
    //   });
    // };
  
    // setRecordingInfo('Recording...');
    // mediaRecorder.current.start();
  // };
  
  // const stopRecording = () => {
  //   setIsRecording(false);
    // mediaRecorder.current.stop();
  //   setRecordingInfo('Processing...');
  // };
  

  // const encodeMp3 = (buffer) => {
  //   const mp3encoder = new lamejs.Mp3Encoder(buffer.numberOfChannels, buffer.sampleRate, 128);
  //   let mp3Data = [];
  //   for (let i = 0; i < buffer.numberOfChannels; i++) {
  //     const channelData = buffer.getChannelData(i);
  //     const mp3buf = mp3encoder.encodeBuffer(channelData);
  //     if (mp3buf.length > 0) {
  //       mp3Data.push(mp3buf);
  //     }
  //   }
  //   const mp3buf = mp3encoder.flush();
  //   if (mp3buf.length > 0) {
  //     mp3Data.push(mp3buf);
  //   }
  //   return mp3Data;
  // };

  // const playSequence = () => {
  //   if (sequence.length === 0) return;

  //   sequence.forEach(note => {
  //     setTimeout(() => {
  //       const pad = document.querySelector(`.drum-pad[name="${note.soundName}"]`);
  //       if (pad) pad.click();
  //     }, note.timeStamp * 1000);
  //   });
  // };

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
              <span id='inner-display-text'>INTEGRATED RHYTHM MACHINE 16 BIT DRUM SAMPLER / MIDI SEQUENCER</span>
              <div id='display' className={isPoweredOn ? '' : 'display-off'}>
                <div id='display-border'>
                  <div id='display-spans'>
                    <span id='time'><span>{currentTime.toDateString().slice(4)}</span><span>{currentTime.toLocaleTimeString()}</span></span>
                    <span id='display-logo' className={isPoweredOn ? 'hidden' : 'visible'}>{displayLogo}</span>
                    <span id='viz-span'><span id='viz-container' className={isPoweredOn ? '' : 'hidden'}>{visualizer}</span></span>
                    <span id='display-text'>{displayText}</span>
                    <span id='pad-bank-text' className={isPoweredOn ? '' : 'hidden'}>BANK: {padBankText}</span>
                    <span id='pad-text' className={isPoweredOn ? '' : 'hidden'}>PAD: {padText}</span>
                    <span id='note-text' className={isPoweredOn ? '' : 'hidden'}>NOTE-VAR:{noteVariationText}</span>
                    <span id='volume' className={isPoweredOn ? '' : 'hidden'}>VOLUME:{volumeText}</span>
                    <span id='data-text' className={isPoweredOn ? '' : 'hidden'}>DATA:{dataText}</span>
                    <span id='rec-gain-text' className={isPoweredOn ? '' : 'hidden'}>REC-GAIN:{recGainText}</span>
                    <span id='button-clicked-text' className={isPoweredOn ? '' : 'hidden'}>{buttonClickedText}</span>
                    <span id='recording-info' className={isPoweredOn ? '' : 'hidden'}>{recordingInfo}</span>
                    <span id='data-icon' className={isPoweredOn ? '' : 'hidden'}><img src='https://www.svgrepo.com/show/447559/assessment.svg' alt='freeCodeCamp logo' width='26px'/></span>
                  </div>
                </div>
              </div>
              <div id='f-lights'>
                <div id='F1' className='f-light'>F1</div>
                <div id='F2' className='f-light'>F2</div>
                <div id='F3' className='f-light'>F3</div>
                <div id='F4' className='f-light'>F4</div>
                <div id='F5' className='f-light'>F5</div>
                <div id='F6' className='f-light'>F6</div>
              </div>
            </div>
          </div>
          <div id='dials'>
            <div id='dials-top'>
              <div id='f-buttons'>
                <p className='f-button-labels' >F1</p>
                <div className='button f-button' name='F1'></div>
                  
                <p className='f-button-labels'>F2</p>
                <div className='button f-button' name='F2'></div>
                  
                <p className='f-button-labels'>F3</p>
                <div className='button f-button' name='F3'></div>
                  
                <p className='f-button-labels'>F4</p>
                <div className='button f-button' name='F4'></div>
                  
                <p className='f-button-labels'>F5</p>
                <div className='button f-button' name='F5'></div>
                  
                <p className='f-button-labels'>F6</p>
                <div className='button f-button' name='F6'></div>
              </div>
              <div id='blue-buttons-container'>
                <span className='shift no-shift'>7<div className='button blue-buttons' name='7 mixer'></div><span className='blue-button-label-spans'>MIXER</span></span>
                <span className='shift no-shift'>8<div className='button blue-buttons' name='8 other'></div><span className='blue-button-label-spans'>OTHER</span></span>
                <span className='shift no-shift'>9<div className='button blue-buttons' name='9 midi/sync'></div><span className='blue-button-label-spans'>MIDI/SYNC</span></span>
                <span className='shift no-shift'>4<div className='button blue-buttons' name='4 sample'></div><span className='blue-button-label-spans'>SAMPLE</span></span>
                <span className='shift no-shift'>5<div className='button blue-buttons' name='5 trim'></div><span className='blue-button-label-spans'>TRIM</span></span>
                <span className='shift no-shift'>6<div className='button blue-buttons' name='6 program'></div><span className='blue-button-label-spans'>PROGRAM</span></span>
                <span className='shift no-shift'>1<div className='button blue-buttons' name='1 sound'></div><span className='blue-button-label-spans'>SOUND</span></span>
                <span className='shift no-shift'>2<div className='button blue-buttons' name='2 misc'></div><span className='blue-button-label-spans'>MISC.</span></span>
                <span className='shift no-shift'>3<div className='button blue-buttons' name='3 load'></div><span className='blue-button-label-spans'>LOAD</span></span>
                <span className='shift'>SHIFT<div className='button blue-buttons white-button left' name='shift'></div></span>
                <span className='shift no-shift'>0<div className='button blue-buttons' name='0'></div></span>
                <span className='shift no-shift'>ENTER<div className='button blue-buttons white-button left' name='enter/save'></div><span className='blue-button-label-spans'>SAVE</span></span>
              </div>
              <div id='above-data-dial'>
                <div id='main-screen' className='button above-dd-btns' name='main screen'><span id='main-screen-label'>MAIN SCREEN</span></div>
                <div id='open-window' className='button above-dd-btns' name='open window'><span id='open-window-label'>OPEN WINDOW</span></div>
                <div id='data'>DATA</div>
              </div>
              <div id='data-knob' className="data-dial">
                <img id='dial-png3' src='https://www.svgrepo.com/show/118173/sun.svg' alt='Dial'/>
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
                    value={noteVariation * 100}
                    className="note-variation-slider"
                    id="note-range"
                    onChange={handleNoteVariationChange}
                    disabled={!isPoweredOn}
                  />
                </div>
              </div>
                  <div id='bottom-left-right-top-container'>
                    <div id='tap-tempo'><span id='tap-tempo-span'>TAP TEMPO NOTE REPEAT</span></div>
                    <div id='tap-tempo-button' className='button' name='tap tempo note repeat'></div>
                  </div>
                  <div id='bottom-left-right-mid-container'>
                    <div id='undo-seq-container'><span id='undo-seq-span'>UNDO SEQ</span><div id='undo-seq' className='off'></div></div>
                    <div id='undo-seq-button' className='button' name='undo-seq'></div>
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
                        <div id='cursor-left' className='button' name='cursor-left'>
                          <svg fill="rgb(6, 104, 184)" id="chevron-left" viewBox="0 0 51.388 51.388">
                            <g>
                        	  <g>
                        		<path d="M9.169,51.388c-0.351,0-0.701-0.157-0.93-0.463c-0.388-0.514-0.288-1.243,0.227-1.634l31.066-23.598L8.461,2.098
                        			C7.95,1.708,7.85,0.977,8.237,0.463c0.395-0.517,1.126-0.615,1.64-0.225l33.51,25.456L9.877,51.151
                        			C9.664,51.31,9.415,51.388,9.169,51.388z"/>
                        	  </g>
                            </g>
                          </svg>
                        </div>
                        <div id='cursor-button-middle-container'>
                          <div id='cursor-top' className='button' name='cursor-top'>
                            <svg fill="rgb(6, 104, 184)" id="chevron-up" viewBox="0 0 51.388 51.388">
                            <g>
                      	    <g>
                      		  <path d="M9.169,51.388c-0.351,0-0.701-0.157-0.93-0.463c-0.388-0.514-0.288-1.243,0.227-1.634l31.066-23.598L8.461,2.098
                      			C7.95,1.708,7.85,0.977,8.237,0.463c0.395-0.517,1.126-0.615,1.64-0.225l33.51,25.456L9.877,51.151
                      			C9.664,51.31,9.415,51.388,9.169,51.388z"/>
                      	    </g>
                            </g>
                            </svg>
                          </div>
                          <div id='line-middle'></div>
                            <div id='cursor-bottom' className='button' name='cursor-bottom'>
                              <svg fill="rgb(6, 104, 184)" id="chevron-down" viewBox="0 0 51.388 51.388">
                              <g>
                      	      <g>
                      		    <path d="M9.169,51.388c-0.351,0-0.701-0.157-0.93-0.463c-0.388-0.514-0.288-1.243,0.227-1.634l31.066-23.598L8.461,2.098
                      			  C7.95,1.708,7.85,0.977,8.237,0.463c0.395-0.517,1.126-0.615,1.64-0.225l33.51,25.456L9.877,51.151
                      			  C9.664,51.31,9.415,51.388,9.169,51.388z"/>
                      	      </g>
                              </g>
                              </svg>
                            </div>
                          </div>
                          <div id='cursor-right' className='button' name='cursor-right'>
                            <svg fill="rgb(6, 104, 184)" id="chevron-right" viewBox="0 0 51.388 51.388">
                              <g>
                      	      <g>
                      		    <path d="M9.169,51.388c-0.351,0-0.701-0.157-0.93-0.463c-0.388-0.514-0.288-1.243,0.227-1.634l31.066-23.598L8.461,2.098
                      			  C7.95,1.708,7.85,0.977,8.237,0.463c0.395-0.517,1.126-0.615,1.64-0.225l33.51,25.456L9.877,51.151
                      			  C9.664,51.31,9.415,51.388,9.169,51.388z"/>
                      	      </g>
                              </g>
                            </svg>
                          </div>
                          <span id='digit-span'><img id='chevron-left-small' src='https://cdn-icons-png.flaticon.com/512/120/120890.png' alt='Chevron Left'/><span className='digit-span-gap'></span> DIGIT<span className='digit-span-gap'></span> <img id='chevron-right-small' src='https://cdn-icons-png.flaticon.com/512/120/120890.png' alt='Chevron Right'/></span>
                        </div>
                  </div>
              <div id='bottom-left-right-bottom'>
                  <div id='bottom-left-right-bottom-row-1'><span id='locate'>LOCATE</span>
                  <div id='locate-line'></div>
                    <div id='locate-labels-container'>
                      <span id='step-chevron-left'><img id='step-chev-left' className='chev' src='https://ipfs.io/ipfs/QmbyuMMHpBoEQgvVXHx31Y1txzofyuYe1BqxXEQ5zUpGxU?filename=chevron.png' alt='Chevron Left'/></span>
                      <span id='step-span'>STEP</span>
                      <span id='step-chevron-right'><img id='step-chev-right' className='chev' src='https://ipfs.io/ipfs/QmbyuMMHpBoEQgvVXHx31Y1txzofyuYe1BqxXEQ5zUpGxU?filename=chevron.png' alt='Chevron Right'/></span>
                      <span id='goto-span'>GO TO</span>
                      <span id='bar-chevron-left'>
                        <svg viewBox="0 0 72 72" id="bar-chev-left" className='bar-chev'>
                          <g>
                            <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" d="M41,55l-18.7948-9.1111l-15.817-7.6675c-1.8509-0.8972-1.8509-3.5456,0-4.4428l15.817-7.6675L41,17"/>
                            <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" d="M67,55l-18.8824-9.1111l-15.8908-7.6675c-1.8595-0.8972-1.8595-3.5456,0-4.4428l15.8908-7.6675L67,17"/>
                          </g>
                        </svg>
                      </span>
                      <span id='bar-span'>BAR</span>
                      <span id='bar-chevron-right'>
                        <svg viewBox="0 0 72 72" id="bar-chev-right" className='bar-chev'>
                          <g>
                            <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" d="M41,55l-18.7948-9.1111l-15.817-7.6675c-1.8509-0.8972-1.8509-3.5456,0-4.4428l15.817-7.6675L41,17"/>
                            <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5" d="M67,55l-18.8824-9.1111l-15.8908-7.6675c-1.8595-0.8972-1.8595-3.5456,0-4.4428l15.8908-7.6675L67,17"/>
                          </g>
                        </svg>
                      </span>
                    </div>
                    <div className='bottom-left-right-bottom-row-1-buttons button' name='step left'></div>
                    <div className='bottom-left-right-bottom-row-1-buttons button' name='step-right'></div>
                    <div className='bottom-left-right-bottom-row-1-buttons button' name='go to'></div>
                    <div className='bottom-left-right-bottom-row-1-buttons button' name='bar left'></div>
                    <div className='bottom-left-right-bottom-row-1-buttons button' name='bar right'></div>
                    <div id='locate-bottom-container'>
                      <span id='event-chev-left-span' className='locate-bottom-labels'>
                      <svg fill="#ffffff" id="event-chev-left" viewBox="0 0 54 54">
                        <g>
                        	<path d="M53,26H10.414l14.293-14.293c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0l-16,16
                        		c-0.092,0.092-0.165,0.203-0.216,0.325c-0.101,0.245-0.101,0.52,0,0.764c0.051,0.122,0.124,0.233,0.216,0.325l16,16
                        		C23.488,43.902,23.744,44,24,44s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L10.414,28H53c0.553,0,1-0.448,1-1
                        		S53.553,26,53,26z"/>
                        	<path d="M1,10c-0.552,0-1,0.448-1,1v32c0,0.552,0.448,1,1,1s1-0.448,1-1V11C2,10.448,1.552,10,1,10z"/>
                        </g>
                      </svg>
                      </span>
                      <span id='event-chev-right-span' className='locate-bottom-labels'>
                      <svg fill="#ffffff" id="event-chev-right" viewBox="0 0 54 54">
                        <g>
                        	<path d="M53,26H10.414l14.293-14.293c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0l-16,16
                        		c-0.092,0.092-0.165,0.203-0.216,0.325c-0.101,0.245-0.101,0.52,0,0.764c0.051,0.122,0.124,0.233,0.216,0.325l16,16
                        		C23.488,43.902,23.744,44,24,44s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L10.414,28H53c0.553,0,1-0.448,1-1
                        		S53.553,26,53,26z"/>
                        	<path d="M1,10c-0.552,0-1,0.448-1,1v32c0,0.552,0.448,1,1,1s1-0.448,1-1V11C2,10.448,1.552,10,1,10z"/>
                        </g>
                      </svg>
                      </span>
                      <span id='bar-start' className='locate-bottom-labels'>START</span>
                      <span id='bar-end' className='locate-bottom-labels'>END</span>
                      <div id='red-line-container'><span id='red-line-left'></span><span id='red-line-divider'></span><span id='red-line-right'></span></div>
                    </div>
                  </div>
                  <div id='bottom-left-right-bottom-row-2'>
                    <div className='bottom-left-right-bottom-row-2-buttons red-button button' name='record'><div id='record' className='off'></div><div id='bottom-left-light'></div><span id='rec'>REC</span></div>
                    <div className='bottom-left-right-bottom-row-2-buttons red-button button' name='over-dub'><div id='over-dub' className='off'></div><span id='over'><div id='bottom-left-light'></div>OVER<br></br>DUB</span></div>
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
            <div id='logo-div'>MPC<strong>2000</strong>XL
              <div id='line'></div>
              <div id='midi'>MIDI PRODUCTION CENTER</div>
            </div>
          </div>
          <div id='panel'>
            <div id='panel-top'>
              <div id='panel-top-left'>
                <div id='full-level-div'>
                  <span id='full-level-span'>FULL LEVEL</span>
                  <div id='full-level' className='off'></div>
                  <div id='Aa' className='button' name='full-level'><span id='Aa-span'>A/a</span></div>
                  <span>16 LEVELS</span>
                  <div id='sixteen-levels' className='off'></div>
                  <div id='space' className='button' name='sixteen-levels'><span id='space-span'>SPACE</span></div>
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
                  <div id='next-seq' className='off'></div>
                  <div>TRACK MUTE</div>
                  <div id='track-mute' className='off'></div>
                </div>
              </div>
              <div id='panel-bottom-right'>
                <div id='pad-bank-line'>
                  <div id='pad-bank-top-border'></div>
                  <span id='pad-bank-label'>PAD BANK</span>
                  <div id='pad-bank-labels'>
                    <div>A<div id='pad-bank-a-light' className={padBanks.bankA.isActive && isPoweredOn ? 'on' : 'off'}></div></div>
                    <div>B<div id='pad-bank-b-light' className={padBanks.bankB.isActive && isPoweredOn ? 'on' : 'off'}></div></div>
                    <div>C<div id='pad-bank-c-light' className={padBanks.bankC.isActive && isPoweredOn ? 'on' : 'off'}></div></div>
                    <div>D<div id='pad-bank-d-light' className={padBanks.bankD.isActive && isPoweredOn ? 'on' : 'off'}></div></div>
                  </div>
                </div>
                <div id='pad-bank-buttons'>
                  <div className='pad-bank-buttons button' name='next-seq'></div>
                  <div className='pad-bank-buttons button' name='track-mute'></div>
                  <div className='pad-bank-buttons button' name='pad bank : a'></div>
                  <div className='pad-bank-buttons button' name='pad bank : b'></div>
                  <div className='pad-bank-buttons button' name='pad bank : c'></div>
                  <div className='pad-bank-buttons button' name='pad bank : d'></div>
                </div>
              </div>
            </div>
          </div>
          <div id='drum-pad'>
            <div className='drum-pad' name='13'><span className='pads'>PAD 13<span className='pad-numbers'>YZ</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad'  name='14'><span className='pads'>PAD 14<span className='pad-numbers'>&#</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='15'><span className='pads'>PAD 15<span className='pad-numbers'>-!</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='16'><span className='pads'>PAD 16<span className='pad-numbers'>()</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='9'><span className='pads'>PAD 9<span className='pad-numbers'>QR</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='10'><span className='pads'>PAD 10<span className='pad-numbers'>ST</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='11'><span className='pads'>PAD 11<span className='pad-numbers'>UV</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='12'><span className='pads'>PAD 12<span className='pad-numbers'>WX</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='5'><span className='pads'>PAD 5<span className='pad-numbers'>IJ</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='6'><span className='pads'>PAD 6<span className='pad-numbers'>KL</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='7'><span className='pads'>PAD 7<span className='pad-numbers'>MN</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='8'><span className='pads'>8<span className='pad-numbers'>OP</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='1'><span className='pads'>PAD 1<span className='pad-numbers'>AB</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='2'><span className='pads'>PAD 2<span className='pad-numbers'>CD</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='3'><span className='pads'>PAD 3<span className='pad-numbers'>EF</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
            <div className='drum-pad' name='4'><span className='pads'>PAD 4<span className='pad-numbers'>GH</span></span>
              <audio src='' name='' type='' id='' crossOrigin='anonymous' className='audio-objects'></audio>
            </div>
          </div>
        </div>
        <div id='bottom-line'></div>
      </div>
    </div>
  );
};

export default DrumMachine;



  
  
  
  
  
  