import React, { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import './HomePage.css'
import axios from 'axios'

function HomePage() {
    const [base64Encoded, setBase64Encoded] = useState("");

    const clearCacheData = () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
    }

    async function sendAudio(base64Audio) {
        try {
            console.log("Sending audio to server: " + base64Audio);

            const response = await axios.post('https://hackai-utd.herokuapp.com/process_audio', {
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
                audio_file: base64Audio
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

    const handleConvertToBase64 = (mediaBlobUrl) => {
        fetch(mediaBlobUrl)
            .then((res) => res.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const base64data = reader.result.substring(22);
                    setBase64Encoded("None");
                    setBase64Encoded(base64data);
                    sendAudio(base64data);
                };
            });
    };

    const beginRecording = (startRecording) => () => {
        clearCacheData();
        startRecording();
    }

    const endRecording = (media, stopRecording) => () => {
        stopRecording();
        handleConvertToBase64(media);
    };

    const requirements = [
        [0, "type_severity_of_collision", false],
        [1, "injuries", false],
        [2, "vehicles_involved", false],
        [3, "damage_to_customers_car", false],
        [4, "location_of_damage", false],
        [5, "witnesses", false],
        [6, "police_called", false],
        [7, "car_is_drivable", false]
    ]

    return (
        <div className="mainInterface">
            <div className="requirements">
                {requirements.map((item) => (
                    <div key={item[0]} className="post">
                        {item[1] + item[2]}
                    </div>))}
            </div>
            <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div className="recordingArea">
                        {
                            (["idle", "stopped"].includes(status)) ?
                                <button className="buttonIdle" onClick={beginRecording(startRecording)}>Start</button> :
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