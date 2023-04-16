import React, { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import './HomePage.css'
import axios from 'axios'

function HomePage() {
    const [requirements, setRequirements] = useState([
        [0, "type_severity_of_collision", false, ""],
        [1, "injuries", false, ""],
        [2, "vehicles_involved", false, ""],
        [3, "damage_to_customers_car", false, ""],
        [4, "location_of_damage", false, ""],
        [5, "witnesses", false, ""],
        [6, "police_called", false, ""],
        [7, "car_is_drivable", false, ""]
    ]);

    const clearCacheData = () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
    }

    function updateRequirements(data) {
        console.log(data);
        let newReq = requirements.slice();
        for (let i = 0; i < 8; i++) {
            if (data[requirements[i][1]] !== "" && data[requirements[i][1]] !== "Not Applicable") {
                requirements[i][2] = true;
                requirements[i][3] = data["accident_info"][requirements[i][1]];
            } else {
                requirements[i][2] = false;
            }
        }
        setRequirements(newReq);
        console.log("Requirements: ");
        console.log(requirements);
    }
    async function sendAudio(base64Audio) {
        try {
            console.log("Sending audio to server: " + base64Audio);
            console.log("data going to send");
            console.log(requirements);
            const params = {
                accident_info: {
                    type_severity_of_collision: requirements[0][3],
                    injuries: requirements[1][3],
                    vehicles_involved: requirements[2][3],
                    damage_to_customers_car: requirements[3][3],
                    location_of_damage: requirements[4][3],
                    witnesses: requirements[5][3],
                    police_called: requirements[6][3],
                    car_is_drivable: requirements[7][3]
                },
                audio_file: base64Audio
            }
            console.log(params);
            const response = await axios.post('https://hackai-utd.herokuapp.com/process_audio', params);
            console.log(response.data);
            updateRequirements(response.data);
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

                    sendAudio(base64data);
                };
            });
    };

    const beginRecording = (startRecording) => () => {
        startRecording();
    };

    const endRecording = (mediaBlobUrl, stopRecording) => {
        setRecording(false);
        setMediaBlobUrl(mediaBlobUrl);
        stopRecording();
    };

    return (
        <div className="mainInterface">
            <div className="requirements">
                {requirements.map((item) => (
                    <div
                        key={item[0]}
                        className={"post " + (item[2] ? "postGood" : "postBad")}
                    >
                        {item[1]}
                    </div>
                ))}
            </div>

            <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div className="recordingArea">
                        {["idle", "stopped"].includes(status) ? (
                            <button
                                className="buttonIdle"
                                onClick={() => beginRecording(startRecording)}
                            >
                                Start
                            </button>
                        ) : (
                            <button
                                className="buttonRecording"
                                onClick={() => endRecording(mediaBlobUrl, stopRecording)}
                            >
                                Stop
                            </button>
                        )}
                        <p>{status}</p>
                        <audio src={mediaBlobUrl} controls></audio>
                    </div>
                )
                }
            />
        </div>
    );
}

export default HomePage;