import React, { useEffect, useState, useRef } from 'react';
import './DrumMachine.css';
import padBanks from './PadBanks';
import togglePadBanks from './PadToggle';
import setDefaultPads from './Default';
import { handleMultipleButtons, handleLights } from './utils';
import { Draggable } from 'gsap/Draggable';
import { gsap } from 'gsap';
import AudioMotionAnalyzer from 'audiomotion-analyzer';

gsap.registerPlugin(Draggable);

const DrumMachine = () => {
  const [volume, setVolume] = useState(0.5);
  const [displayText, setDisplayText] = useState('');
  const [isPoweredOn, setIsPoweredOn] = useState(false);
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
  const [currentRecordingIndex, setCurrentRecordingIndex] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentRecording, setCurrentRecording] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const audioMotionRef = useRef(null);
  const audioContextRef = useRef(null);
  const mediaRecorderRef = useRef(null);

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
    const createDraggableDial = (selector, onDrag, onThrowUpdate, bounds = null) => {
      const dial = document.querySelector(selector);
      return Draggable.create(dial, {
        type: 'rotation',
        bounds,
        inertia: true,
        onDrag,
        onThrowUpdate,
      })[0];
    };

    const recGainDraggable = createDraggableDial('.rec-gain-dial', function () {
      const angle = this.rotation;
      const newRecGain = (angle + 120) / 240;
      setRecGainText(` ${Math.round(newRecGain * 100)}`);
    }, function () {
      const angle = this.rotation;
      const newRecGain = (angle + 120) / 240;
      setRecGainText(` ${Math.round(newRecGain * 100)}`);
    }, { minRotation: -120, maxRotation: 120 });

    const volumeDraggable = createDraggableDial('.volume-dial', function () {
      const angle = this.rotation;
      const newVolume = (angle + 120) / 240;
      setVolume(newVolume);
      setVolumeText(` ${Math.round(newVolume * 100)}`);
    }, function () {
      const angle = this.rotation;
      const newVolume = (angle + 120) / 240;
      setVolume(newVolume);
      setVolumeText(` ${Math.round(newVolume * 100)}`);
    }, { minRotation: -120, maxRotation: 120 });

    const dataDraggable = createDraggableDial('.data-dial', function () {
      const angle = Math.floor(this.rotation);
      setDataText(` ${angle}`);
    }, function () {
      const angle = this.rotation;
      setDataText(` ${angle}`);
    }, null);

    const toggleDials = (enabled) => {
      recGainDraggable[enabled ? 'enable' : 'disable']();
      volumeDraggable[enabled ? 'enable' : 'disable']();
      dataDraggable[enabled ? 'enable' : 'disable']();
    };

    toggleDials(isPoweredOn);

    return () => {
      recGainDraggable.kill();
      volumeDraggable.kill();
      dataDraggable.kill();
    };
  }, [isPoweredOn]);

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

  useEffect(() => {
    audioMotionRef.current = new AudioMotionAnalyzer(
      document.getElementById('viz-container'),
      {
        height: 70,
        ansiBands: false,
        showScaleX: false,
        bgAlpha: 0,
        overlay: true,
        mode: 6,
        frequencyScale: 'log',
        showPeaks: false,
        smoothing: 0.7,
        ledBars: false,
      }
    );

    audioMotionRef.current.registerGradient('black', {
      bgColor: 'black',
      colorStops: [
        { pos: 0, color: 'black' },
        { pos: 1, color: 'black' },
      ],
    });

    audioMotionRef.current.setOptions({ gradient: 'black' });
    audioContextRef.current = new (window.AudioContext || window.AudioContext)();

    return () => {
      audioMotionRef.current.disconnectInput();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
      audio.volume = volume;
    });
  }, [volume]);

  const handlePadClick = (e) => {
    if (!isPoweredOn) return;

    const pad = e.currentTarget;
    setPadText(pad.getAttribute('name'));
    const audio = pad.querySelector('audio');
    const soundName = audio.getAttribute('name');
    setDisplayText(soundName);

    if (!audio.analyzerConnected) {
      audioMotionRef.current.connectInput(audio);
      audio.analyzerConnected = true;
    }

    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.error('Failed to play audio:', error);
    });

    pad.classList.add('pressed');
    setTimeout(() => pad.classList.remove('pressed'), 100);

    if (isRecording) {
      const source = audioContextRef.current.createMediaElementSource(audio);
      source.connect(audioContextRef.current.destination);
    }
  };

  const startRecording = () => {
    if (!isPoweredOn || isRecording) return;

    setIsRecording(true);
    setDisplayText('Recording...');

    const streamDestination = audioContextRef.current.createMediaStreamDestination();
    const options = { mimeType: 'audio/webm' };
    const recorder = new MediaRecorder(streamDestination.stream, options);

    setRecorder(recorder);
    recorder.start();

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setAudioChunks(prev => [...prev, event.data]);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setRecordings(prev => [...prev, { url, blob }]);
      setAudioChunks([]);
      updateProgramSpan();
    };

    const mediaStreamSource = audioContextRef.current.createMediaStreamSource(streamDestination.stream);
    mediaStreamSource.connect(audioContextRef.current.destination);

    mediaRecorderRef.current = recorder;
  };

  const stopRecording = () => {
    if (!isRecording) return;

    setIsRecording(false);
    setDisplayText('Recording Stopped');
    if (recorder) {
      recorder.stop();
    }
    mediaRecorderRef.current = null;
  };

  const playRecording = () => {
    if (!currentRecording) return;

    const audio = new Audio(currentRecording.url);
    audio.loop = isLooping;
    audio.play();
    setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
  };

  const toggleLooping = () => {
    setIsLooping(!isLooping);
    if (isPlaying) {
      playRecording();
    }
  };

  const overdubRecording = () => {
    if (!currentRecording) return;

    const overlayStream = audioContextRef.current.createMediaStreamDestination();
    const currentAudio = new Audio(currentRecording.url);
    currentAudio.connect(overlayStream);
    startRecording(overlayStream);
    currentAudio.play();
  };

  const handleKeyPress = (e) => {
    if (!isPoweredOn) return;

    const key = e.key.toUpperCase();
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

  const handleNoteVariationChange = (e) => {
    const newNoteVariation = e.target.value / 100;
    setNoteVariation(newNoteVariation);
    setNoteVariationText(` ${Math.round(newNoteVariation * 100)}`);
  };

  const handleButtonClick = (e) => {
    if (!isPoweredOn) return;

    const button = e.currentTarget;
    const buttonName = button.getAttribute('name');
    setButtonClickedText(buttonName);

    togglePadBanks(padBanks, buttonName);
    handleMultipleButtons(button, buttonName);
    handleLights(button, buttonName);

    switch (buttonName) {
      case 'record':
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
        break;
      case 'over-dub':
        overdubRecording();
        break;
      case 'stop':
        stopPlayback();
        break;
      case 'play':
        playRecording();
        break;
      case 'play start':
        toggleLooping();
        break;
      default:
        togglePadBanks(padBanks, buttonName);
        handleMultipleButtons(button, buttonName);
        handleLights(button, buttonName);
        break;
    }

    updateProgramSpan();
  };

  const updateProgramSpan = () => {
    const programSpan = document.getElementById('program-span');
    programSpan.innerHTML = recordings.map((_, idx) => `
      <div class="recording" data-index="${idx}">
        Recording ${idx + 1}
      </div>
    `).join('');
  };

  useEffect(() => {
    const cursorButtons = document.querySelectorAll('.cursor-buttons .button');
    cursorButtons.forEach(button => {
      button.addEventListener('click', handleCursorClick);
    });

    return () => {
      cursorButtons.forEach(button => {
        button.removeEventListener('click', handleCursorClick);
      });
    };
  }, [recordings]);

  const handleCursorClick = (e) => {
    const button = e.currentTarget;
    const buttonName = button.getAttribute('name');
    let newIndex = currentRecordingIndex;

    switch (buttonName) {
      case 'cursor-left':
        newIndex = Math.max(0, currentRecordingIndex - 1);
        break;
      case 'cursor-right':
        newIndex = Math.min(recordings.length - 1, currentRecordingIndex + 1);
        break;
      default:
        break;
    }

    setCurrentRecordingIndex(newIndex);
    setCurrentRecording(recordings[newIndex]);
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
          <span id='inner-display-text'>
            INTEGRATED RHYTHM MACHINE 16 BIT DRUM SAMPLER / MIDI SEQUENCER
          </span>
          <div id='display' className={isPoweredOn ? '' : 'display-off'}>
            <div id='display-border'>
              <div id='display-spans'>
                <span id='time'>
                  <span>{currentTime.toDateString().slice(4)}</span>
                  <span>{currentTime.toLocaleTimeString()}</span>
                </span>
                <span id='display-logo' className={isPoweredOn ? 'hidden' : 'visible'}>
                  {displayLogo}
                </span>
                <span id='viz-span'>
                  <span id='viz-container' className={isPoweredOn ? '' : 'hidden'}>
                    {visualizer}
                  </span>
                </span>
                <span id='file-top' className={isPoweredOn ? '' : 'hidden'}>
                  <span id='sq'>
                    Sq:
                    <span id='sq-id'>{displayText}</span>
                    <span id='dots'></span>
                  </span>
                </span>
                <span id='program-span' className={isPoweredOn ? '' : 'hidden'}></span>
                <span id='display-text'>{displayText}</span>
                <span id='pad-bank-text' className={isPoweredOn ? '' : 'hidden'}>
                  BANK: {padBankText}
                </span>
                <span id='pad-text' className={isPoweredOn ? '' : 'hidden'}>
                  PAD: {padText}
                </span>
                <span id='note-text' className={isPoweredOn ? '' : 'hidden'}>
                  NOTE-VAR:{noteVariationText}
                </span>
                <span id='volume' className={isPoweredOn ? '' : 'hidden'}>
                  VOLUME:{volumeText}
                </span>
                <span id='data-text' className={isPoweredOn ? '' : 'hidden'}>
                  DATA:{dataText}
                </span>
                <span id='rec-gain-text' className={isPoweredOn ? '' : 'hidden'}>
                  REC-GAIN:{recGainText}
                </span>
                <span id='button-clicked-text' className={isPoweredOn ? '' : 'hidden'}>
                  {buttonClickedText}
                </span>
                <span id='recording-info' className={isPoweredOn ? '' : 'hidden'}>
                  {recordingInfo}
                </span>
                <span id='data-icon' className={isPoweredOn ? '' : 'hidden'}>
                  <img
                    src='https://www.svgrepo.com/show/447559/assessment.svg'
                    alt='Data Icon'
                    width='30px'
                  />
                </span>
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
            <p className='f-button-labels'>F1</p>
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
            <span className='shift no-shift'>
              7
              <div className='button blue-buttons' name='7 mixer'></div>
              <span className='blue-button-label-spans'>MIXER</span>
            </span>
            <span className='shift no-shift'>
              8
              <div className='button blue-buttons' name='8 other'></div>
              <span className='blue-button-label-spans'>OTHER</span>
            </span>
            <span className='shift no-shift'>
              9
              <div className='button blue-buttons' name='9 midi/sync'></div>
              <span className='blue-button-label-spans'>MIDI/SYNC</span>
            </span>
            <span className='shift no-shift'>
              4
              <div className='button blue-buttons' name='4 sample'></div>
              <span className='blue-button-label-spans'>SAMPLE</span>
            </span>
            <span className='shift no-shift'>
              5
              <div className='button blue-buttons' name='5 trim'></div>
              <span className='blue-button-label-spans'>TRIM</span>
            </span>
            <span className='shift no-shift'>
              6
              <div className='button blue-buttons' name='6 program'></div>
              <span className='blue-button-label-spans'>PROGRAM</span>
            </span>
            <span className='shift no-shift'>
              1
              <div className='button blue-buttons' name='1 sound'></div>
              <span className='blue-button-label-spans'>SOUND</span>
            </span>
            <span className='shift no-shift'>
              2
              <div className='button blue-buttons' name='2 misc'></div>
              <span className='blue-button-label-spans'>MISC.</span>
            </span>
            <span className='shift no-shift'>
              3
              <div className='button blue-buttons' name='3 load'></div>
              <span className='blue-button-label-spans'>LOAD</span>
            </span>
            <span className='shift'>
              SHIFT
              <div className='button blue-buttons white-button left' name='shift'></div>
            </span>
            <span className='shift no-shift'>
              0
              <div className='button blue-buttons' name='0'></div>
            </span>
            <span className='shift no-shift'>
              ENTER
              <div className='button blue-buttons white-button left' name='enter/save'></div>
              <span className='blue-button-label-spans'>SAVE</span>
            </span>
          </div>
          <div id='above-data-dial'>
            <div id='main-screen' className='button above-dd-btns' name='main screen'>
              <span id='main-screen-label'>MAIN SCREEN</span>
            </div>
            <div id='open-window' className='button above-dd-btns' name='open window'>
              <span id='open-window-label'>OPEN WINDOW</span>
            </div>
            <div id='data'>DATA</div>
          </div>
          <div id='data-knob' className='data-dial'>
            <img
              id='dial-png3'
              src='https://www.svgrepo.com/show/118173/sun.svg'
              alt='Dial'
            />
            <div id='inner-knob'>
              <div id='knob'></div>
            </div>
          </div>
        </div>
        <div id='dials-bottom'>
          <div id='bottom-left'>
            <div id='bottom-left-top'>
              <div id='note-variation'>
                NOTE
                <br />
                VARIATION
              </div>
              <div id='after'>AFTER</div>
              <div id='bottom-left-light'>
                <div id='assign' className='off'></div>
              </div>
              <div id='bottom-left-button' className='button' name='assign'>
                <span id='assign-span'>ASSIGN</span>
              </div>
            </div>
            <div id='note-variation-container'>
              <input
                type='range'
                min='1'
                max='100'
                value={noteVariation * 100}
                className='note-variation-slider'
                id='note-range'
                onChange={handleNoteVariationChange}
                disabled={!isPoweredOn}
              />
            </div>
          </div>
          <div id='bottom-left-right-top-container'>
            <div id='tap-tempo'>
              <span id='tap-tempo-span'>TAP TEMPO NOTE REPEAT</span>
            </div>
            <div
              id='tap-tempo-button'
              className='button'
              name='tap tempo'
            ></div>
          </div>
          <div id='bottom-left-right-mid-container'>
            <div id='undo-seq-container'>
              <span id='undo-seq-span'>UNDO SEQ</span>
              <div id='undo-seq' className='off'></div>
            </div>
            <div id='undo-seq-button' className='button' name='undo-seq'></div>
          </div>
          <div id='bottom-left-right-bottom-container'>
            <div id='erase'>
              <span id='erase-span'>ERASE</span>
            </div>
            <div id='erase-button' className='button' name='erase'></div>
          </div>
          <div id='bottom-left-right-bottom-right-container'>
            <div id='cursor'>
              <span id='cursor-span'>CURSOR</span>
            </div>
            <div id='cursor-buttons'>
              <div id='line-top-left'></div>
              <div id='line-top-right'></div>
              <div id='line-bottom-left'></div>
              <div id='line-bottom-right'></div>
              <div id='cursor-left' className='button' name='cursor-left'>
                <img
                  id='chevron-left'
                  src='https://ipfs.io/ipfs/QmSbfPEsLA1hFofY88siCe16AzwSzvxgjg4ZT7PxvUmtZu?filename=blue-chevron.png'
                  alt='Chevron Left'
                />
              </div>
              <div id='cursor-button-middle-container'>
                <div id='cursor-top' className='button' name='cursor-top'>
                  <img
                    id='chevron-up'
                    src='https://ipfs.io/ipfs/QmSbfPEsLA1hFofY88siCe16AzwSzvxgjg4ZT7PxvUmtZu?filename=blue-chevron.png'
                    alt='Chevron Up'
                  />
                </div>
                <div id='line-middle'></div>
                <div id='cursor-bottom' className='button' name='cursor-bottom'>
                  <img
                    id='chevron-down'
                    src='https://ipfs.io/ipfs/QmSbfPEsLA1hFofY88siCe16AzwSzvxgjg4ZT7PxvUmtZu?filename=blue-chevron.png'
                    alt='Chevron Down'
                  />
                </div>
              </div>
              <div id='cursor-right' className='button' name='cursor-right'>
                <img
                  id='chevron-right'
                  src='https://ipfs.io/ipfs/QmSbfPEsLA1hFofY88siCe16AzwSzvxgjg4ZT7PxvUmtZu?filename=blue-chevron.png'
                  alt='Chevron Down'
                />
              </div>
              <span id='digit-span'>
                <img
                  id='chevron-left-small'
                  src='https://cdn-icons-png.flaticon.com/512/120/120890.png'
                  alt='Chevron Left'
                />
                <span className='digit-span-gap'></span> DIGIT
                <span className='digit-span-gap'></span>
                <img
                  id='chevron-right-small'
                  src='https://cdn-icons-png.flaticon.com/512/120/120890.png'
                  alt='Chevron Right'
                />
              </span>
            </div>
          </div>
          <div id='bottom-left-right-bottom'>
            <div id='bottom-left-right-bottom-row-1'>
              <span id='locate'>LOCATE</span>
              <div id='locate-line'></div>
              <div id='locate-labels-container'>
                <span id='step-chevron-left'>
                  <img
                    id='step-chev-left'
                    className='chev'
                    src='https://ipfs.io/ipfs/QmbyuMMHpBoEQgvVXHx31Y1txzofyuYe1BqxXEQ5zUpGxU?filename=chevron.png'
                    alt='Chevron Left'
                  />
                </span>
                <span id='step-span'>STEP</span>
                <span id='step-chevron-right'>
                  <img
                    id='step-chev-right'
                    className='chev'
                    src='https://ipfs.io/ipfs/QmbyuMMHpBoEQgvVXHx31Y1txzofyuYe1BqxXEQ5zUpGxU?filename=chevron.png'
                    alt='Chevron Right'
                  />
                </span>
                <span id='goto-span'>GO TO</span>
                <span id='bar-chevron-left'>
                  <img
                    id='bar-chev-left'
                    className='bar-chev'
                    src='https://www.svgrepo.com/show/361472/double-arrow-left.svg'
                    alt='Double Chevron Icon'
                  />
                </span>
                <span id='bar-span'>BAR</span>
                <span id='bar-chevron-right'>
                  <img
                    id='bar-chev-right'
                    className='bar-chev'
                    src='https://www.svgrepo.com/show/361472/double-arrow-left.svg'
                    alt='Double Chevron Icon'
                  />
                </span>
              </div>
              <div
                className='bottom-left-right-bottom-row-1-buttons button'
                name='step left'
              ></div>
              <div
                className='bottom-left-right-bottom-row-1-buttons button'
                name='step-right'
              ></div>
              <div
                className='bottom-left-right-bottom-row-1-buttons button'
                name='go to'
              ></div>
              <div
                className='bottom-left-right-bottom-row-1-buttons button'
                name='bar left'
              ></div>
              <div
                className='bottom-left-right-bottom-row-1-buttons button'
                name='bar right'
              ></div>
              <div id='locate-bottom-container'>
                <span id='event-chev-left-span' className='locate-bottom-labels'>
                  <img
                    id='event-chev-left'
                    src='https://ipfs.io/ipfs/QmfLEZ27ZSRJeX7rpsdsPG4zmGYjLb1X4tCMGEMmo4YnDr?filename=arrow-step.png'
                    alt='Arrow Left Icon'
                  />
                </span>
                <span id='event-span'>-EVENT-</span>
                <span id='event-chev-right-span' className='locate-bottom-labels'>
                  <img
                    id='event-chev-right'
                    src='https://ipfs.io/ipfs/QmfLEZ27ZSRJeX7rpsdsPG4zmGYjLb1X4tCMGEMmo4YnDr?filename=arrow-step.png'
                    alt='Arrow Right Icon'
                  />
                </span>
                <span id='bar-start' className='locate-bottom-labels'>START</span>
                <span id='bar-end' className='locate-bottom-labels'>END</span>
                <div id='red-line-container'>
                  <span id='red-line-left'></span>
                  <span id='red-line-divider'></span>
                  <span id='red-line-right'></span>
                </div>
              </div>
            </div>
            <div id='bottom-left-right-bottom-row-2'>
              <div
                className='bottom-left-right-bottom-row-2-buttons red-button button'
                name='record'
              >
                <div id='record' className='off'></div>
                <div id='bottom-left-light'></div>
                <span id='rec'>REC</span>
              </div>
              <div
                className='bottom-left-right-bottom-row-2-buttons red-button button'
                name='over-dub'
              >
                <div id='over-dub' className='off'></div>
                <span id='over'>
                  <div id='bottom-left-light'></div>OVER
                  <br />
                  DUB
                </span>
              </div>
              <div className='bottom-left-right-bottom-row-2-buttons button' name='stop'>
                <span id='stop'>STOP</span>
              </div>
              <div className='bottom-left-right-bottom-row-2-buttons button' name='play'>
                <div id='play' className='off'></div>
                <span id='play-span'>
                  <div id='bottom-left-light'></div>PLAY
                </span>
              </div>
              <div
                className='bottom-left-right-bottom-row-2-buttons button'
                name='play start'
              >
                <span id='play-start'>
                  PLAY
                  <br />
                  START
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* RIGHT COLUMN START */}
    <div id='right-col'>
      <div id='logo'>
        <img
          id='akai-logo'
          src='https://musiccitycanada.com/cdn/shop/collections/akai_1200x630.png?v=1554830919'
          alt='Akai Logo'
        />
        <div id='logo-div'>
          MPC<strong>2000</strong>XL
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
              <div id='Aa' className='button' name='full-level'>
                <span id='Aa-span'>A/a</span>
              </div>
              <span>16 LEVELS</span>
              <div id='sixteen-levels' className='off'></div>
              <div id='space' className='button' name='sixteen-levels'>
                <span id='space-span'>SPACE</span>
              </div>
            </div>
          </div>
          <div id='panel-top-right'>
            <div id='panel-top-right-labels'>
              <div id='rec-gain-label'>REC GAIN</div>
              <div id='main-volume-label'>MAIN VOLUME</div>
            </div>
            <img
              id='dial-png'
              src='https://www.svgrepo.com/show/478370/volume-knob.svg'
              alt='Dial'
            />
            <div className='viewport-box'>
              <div className='rec-gain-dial'>
                <div className='dial-inner'></div>
                <div className='indicator'></div>
              </div>
            </div>
            <div id='min-max'>
              <div>MIN</div>
              <div>MAX</div>
            </div>
            <img
              id='dial-png2'
              src='https://www.svgrepo.com/show/478370/volume-knob.svg'
              alt='Dial'
            />
            <div className='viewport-box'>
              <div className='volume-dial'>
                <div className='dial-inner'></div>
                <div className='indicator'></div>
              </div>
            </div>
            <div id='min-max2'>
              <div>MIN</div>
              <div>MAX</div>
            </div>
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
                <div>
                  A
                  <div
                    id='pad-bank-a-light'
                    className={padBanks.bankA.isActive && isPoweredOn ? 'on' : 'off'}
                  ></div>
                </div>
                <div>
                  B
                  <div
                    id='pad-bank-b-light'
                    className={padBanks.bankB.isActive && isPoweredOn ? 'on' : 'off'}
                  ></div>
                </div>
                <div>
                  C
                  <div
                    id='pad-bank-c-light'
                    className={padBanks.bankC.isActive && isPoweredOn ? 'on' : 'off'}
                  ></div>
                </div>
                <div>
                  D
                  <div
                    id='pad-bank-d-light'
                    className={padBanks.bankD.isActive && isPoweredOn ? 'on' : 'off'}
                  ></div>
                </div>
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
        <span id='drums-line'>
          <span id='drums'>DRUMS</span>
        </span>
        <div className='drum-pad' name='13'>
          <span className='pads'>
            PAD 13<span className='pad-numbers'>YZ</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='14'>
          <span className='pads'>
            PAD 14<span className='pad-numbers'>&#</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='15'>
          <span className='pads'>
            PAD 15<span className='pad-numbers'>-!</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='16'>
          <span className='pads'>
            PAD 16<span className='pad-numbers'>()</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='9'>
          <span className='pads'>
            PAD 9<span className='pad-numbers'>QR</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='10'>
          <span className='pads'>
            PAD 10<span className='pad-numbers'>ST</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='11'>
          <span className='pads'>
            PAD 11<span className='pad-numbers'>UV</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='12'>
          <span className='pads'>
            PAD 12<span className='pad-numbers'>WX</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='5'>
          <span className='pads'>
            PAD 5<span className='pad-numbers'>IJ</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='6'>
          <span className='pads'>
            PAD 6<span className='pad-numbers'>KL</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='7'>
          <span className='pads'>
            PAD 7<span className='pad-numbers'>MN</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='8'>
          <span className='pads'>
            PAD 8<span className='pad-numbers'>OP</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='1'>
          <span className='pads'>
            PAD 1<span className='pad-numbers'>AB</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='2'>
          <span className='pads'>
            PAD 2<span className='pad-numbers'>CD</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='3'>
          <span className='pads'>
            PAD 3<span className='pad-numbers'>EF</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
        <div className='drum-pad' name='4'>
          <span className='pads'>
            PAD 4<span className='pad-numbers'>GH</span>
          </span>
          <audio
            src=''
            name=''
            type=''
            id=''
            crossOrigin='anonymous'
            className='audio-objects'
          ></audio>
        </div>
      </div>
    </div>
    <div id='bottom-line'></div>
  </div>
</div>

);
};

export default DrumMachine;




  
  
  
  
  
  