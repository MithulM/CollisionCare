import React, { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import './HomePage.css'
import axios from 'axios'

function HomePage() {

    async function sendAudio() {
        try {
            const response = await axios.post('https://hackai-utd.herokuapp.com/process_audio', null, {
                params: {
                    accident_info: {
                        type_severity_of_collision: "",
                        injuries: "",
                        vehicles_involved: "",
                        damage_to_customers_car: "",
                        location_of_damage: "",
                        witnesses: "",
                        police_called: "",
                        car_is_drivable: ""
                    },
                    audio_file: base64Encoded
                }
            });
            console.log(response.data);
            return response.data;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else {
                console.log(`Error: ${err.message}`);
            }
        }
    }
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
        // sendAudio();
    };


    return (
        <div className="mainInterface">
            <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div className="recordingArea">
                        {
                            (["idle", "stopped"].includes(status)) ?
                                <button className="buttonIdle" onClick={startRecording}>Start</button> :
                                <button className="buttonRecording" onClick={endRecording(mediaBlobUrl, stopRecording)}>Stop</button>
                        }
                        <p>{status}</p>
                        <audio src={mediaBlobUrl} controls></audio>
                    </div>

                )
                }
            />
        </div >
    );
}

export default HomePage;