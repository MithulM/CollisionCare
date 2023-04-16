import React, { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';

function HomePage() {
    const [base64Encoded, setBase64Encoded] = useState("");

    const handleConvertToBase64 = (mediaBlobUrl) => {
        fetch(mediaBlobUrl)
            .then((res) => res.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    setBase64Encoded(base64data);
                };
            });
    };

    const endRecording = (media, stopRecording) => () => {
        stopRecording();
        handleConvertToBase64(media);
    };


    return (
        <div className="mainInterface">
            <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        {
                            (["idle", "stopped"].includes(status)) ?
                                <button onClick={startRecording}>Start</button> :
                                <button onClick={endRecording(mediaBlobUrl, stopRecording)}>Stop</button>
                        }
                        <p>{status}</p>
                        <audio src={mediaBlobUrl} controls></audio>
                        <p>Base64-encoded string: {base64Encoded}</p>
                    </div>

                )
                }
            />
        </div >
    );
}

export default HomePage;