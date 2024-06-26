import { showTab } from './examPrechecks';

export const IdentityVerificationScreenThree = async (tabContent) => {
    if (!tabContent) {
        console.error('Error: tabContent is not defined or null.');
        return;
    }

    let canvasRef;
    let audioContext;
    let analyserNode;
    let disabledBtn = false;
    let stream = null;
    let msg = {
        type: '',
        text: 'Be loud and clear'
    };

    const schoolInfo = {}; // This would normally come from Redux, you'll need to implement your own state management

    let animationFrameId = null; // To keep track of the requestAnimationFrame ID

    const drawAudioSpikes = async () => {
        try {
            const audioPermission = await navigator.permissions.query({ name: 'microphone' });
            if (audioPermission.state === 'granted') {
                const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                stream = audioStream;

                audioContext = new AudioContext();
                analyserNode = audioContext.createAnalyser();
                analyserNode.fftSize = 2048;
                const mediaStreamSource = audioContext.createMediaStreamSource(audioStream);
                mediaStreamSource.connect(analyserNode);

                const canvas = canvasRef;
                const canvasCtx = canvas.getContext('2d');

                const drawOnCanvas = () => {
                    const bufferLength = analyserNode.frequencyBinCount;
                    const frequencyData = new Uint8Array(bufferLength);
                    analyserNode.getByteFrequencyData(frequencyData);

                    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
                    canvasCtx.fillStyle = schoolInfo?.theme?.color || '#FF961B';
                    const barWidth = (canvas.width / bufferLength) * 8.5;
                    let barHeight;
                    let x = 0;

                    for (let i = 0; i < bufferLength; i++) {
                        barHeight = frequencyData[i] / 2;
                        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                        x += barWidth + 1;
                    }

                    animationFrameId = requestAnimationFrame(drawOnCanvas); // Continue the loop
                };

                drawOnCanvas(); // Start the drawing loop
            } else {
                throw audioPermission.state;
            }

        } catch (error) {
            console.error('Error accessing microphone:', error);
            // Implement your own error handling mechanism if needed
        }
    };

    const startRecording = () => {
        if (!animationFrameId) {
            drawAudioSpikes();
        }

        msg.type = ''; // Update msg type
        msg.text = 'Recording...'; // Update msg text
        disabledBtn = true;
        updateUI();

        let counter = 0;
        const timer = setInterval(() => {
            try {
                counter += 1;

                const bufferLength = analyserNode.frequencyBinCount;
                const frequencyData = new Uint8Array(bufferLength);
                analyserNode.getByteFrequencyData(frequencyData);

                let sumSquares = 0;
                for (let i = 0; i < bufferLength; i++) {
                    sumSquares += (frequencyData[i] / 255) ** 2;
                }
                const rms = Math.sqrt(sumSquares / bufferLength);
                console.log('rms____', rms);
                const requiredLevel = 0.15; // This would normally come from section.secure_feature_profile.settings.audio_level
                if (rms > requiredLevel) {
                    clearInterval(timer);
                    disabledBtn = false;
                    msg.type = 'successful'; // Update msg type
                    msg.text = 'Audio test passed'; // Update msg text
                    updateUI();
                } else if (counter >= 15) {
                    throw 'error';
                }
            } catch (err) {
                clearInterval(timer);
                disabledBtn = false;
                msg.type = 'unsuccessful'; // Update msg type
                msg.text = 'Audio test failed'; // Update msg text
                updateUI();
                console.error('Audio test failed');
            }

        }, 1000);
    };

    const stopRecording = () => {
        cancelAnimationFrame(animationFrameId); // Stop the animation frame loop
        animationFrameId = null; // Reset animationFrameId
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
        }
    };

    const nextStep = async () => {
        // Implement your navigation logic
        showTab('tab6');
        console.log('Navigate to IDENTITY_VERIFICATION_SCREEN_FOUR');
    };

    const prevStep = () => {
        // Implement your navigation logic
        console.log('Navigate to IDENTITY_VERIFICATION_SCREEN_TWO');
    };

    const updateUI = () => {
        let container = tabContent.querySelector('.ivst-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'ivst-container';
            tabContent.appendChild(container);
        }

        let wrapper = container.querySelector('.ivst-wrapper');
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = 'ivst-wrapper';

            const headerTitle = document.createElement('div');
            headerTitle.className = 'ivst-header-title';
            headerTitle.textContent = 'Audio Check';

            const message = document.createElement('div');
            message.className = 'ivst-msg';
            wrapper.appendChild(headerTitle);
            wrapper.appendChild(message);

            const audioText = document.createElement('div');
            audioText.className = 'ivst-audio-text';
            audioText.textContent = 'No point in running, leave in time';

            canvasRef = document.createElement('canvas');
            canvasRef.width = 800;
            canvasRef.height = 200;

            wrapper.appendChild(audioText);
            wrapper.appendChild(canvasRef);
            container.appendChild(wrapper);
        }

        const messageElement = wrapper.querySelector('.ivst-msg');
        if (messageElement) {
            messageElement.textContent = msg.text;
            if (msg.type === 'unsuccessful') {
                messageElement.style.color = '#E95E5E';
            } else {
                messageElement.style.color = ''; // Reset color if not unsuccessful
            }
        }

        let btnContainer = wrapper.querySelector('.ivst-btn-container');
        if (!btnContainer) {
            btnContainer = document.createElement('div');
            btnContainer.className = 'ivst-btn-container';
            wrapper.appendChild(btnContainer);
        } else {
            btnContainer.innerHTML = ''; // Clear existing buttons
        }

        if (msg.type === '') {
            const prevButton = createButton('Previous Step', 'orange-hollow-btn', prevStep);
            prevButton.disabled = disabledBtn;
            const recordButton = createButton('Record Audio', 'orange-filled-btn', startRecording);
            recordButton.disabled = disabledBtn;
            btnContainer.appendChild(prevButton);
            btnContainer.appendChild(recordButton);
        } else if (msg.type === 'unsuccessful') {
            const prevButton = createButton('Previous Step', 'orange-hollow-btn', prevStep);
            const reRecordButton = createButton('Re-record Audio', 'orange-filled-btn', startRecording);
            btnContainer.appendChild(prevButton);
            btnContainer.appendChild(reRecordButton);
        } else {
            const reRecordButton = createButton('Re-record Audio', 'orange-hollow-btn', startRecording);
            const doneButton = createButton('Done', 'orange-filled-btn', nextStep);
            btnContainer.appendChild(reRecordButton);
            btnContainer.appendChild(doneButton);
        }
    };

    const createButton = (text, className, onClick) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = className;
        button.addEventListener('click', onClick);
        return button;
    };

    // Initialize
    drawAudioSpikes();
    updateUI();

    // Cleanup function (call this when the component should be destroyed)
    const cleanup = () => {
        if (audioContext) {
            audioContext.close();
        }
        stopRecording();
    };

    return {
        cleanup // Return the cleanup function so it can be called when needed
    };
};
