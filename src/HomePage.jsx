import React, { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import './HomePage.css'
import axios from 'axios'

function HomePage() {
    const [requirements, setRequirements] = useState([
        [0, "Type/Severity of Collision", false, "", "type_severity_of_collision"],
        [1, "Injuries", false, "", "injuries"],
        [2, "Vehicles Involved", false, "", "vehicles_involved"],
        [3, "Damage to Customers Car", false, "", "damage_to_customers_car"],
        [4, "Location of Damage", false, "", "location_of_damage"],
        [5, "Witnesses", false, "", "witnesses"],
        [6, "Police Called", false, "", "police_called"],
        [7, "Car is Drivable", false, "", "car_is_drivable"]
    ]);

    function updateRequirements(data) {
        console.log("Data: ")
        console.log(data);
        console.log(data["accident_info"]);
        console.log(data["accident_info"][requirements[0][4]]);
        let newReq = requirements.slice();
        let badArr = ["", "Not Applicable", "\"\""];
        for (let i = 0; i < 8; i++) {
            if (badArr.includes(data["accident_info"][requirements[i][4]])) {
                requirements[i][2] = false;
            } else {
                requirements[i][2] = !["", "Not Applicable", "\"\""].includes(data["accident_info"][requirements[i][4]]);
            }
            requirements[i][3] = data["accident_info"][requirements[i][4]];
        }
        console.log("Requirements: ");
        setRequirements(newReq);
        console.log(requirements);
    }

    async function sendAudio(base64Audio) {
        try {
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
            console.log("Sending post");
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

    function resetRequirements() {
        setRequirements([
            [0, "Type/Severity of Collision", false, "", "type_severity_of_collision"],
            [1, "Injuries", false, "", "injuries"],
            [2, "Vehicles Involved", false, "", "vehicles_involved"],
            [3, "Damage to Customers Car", false, "", "damage_to_customers_car"],
            [4, "Location of Damage", false, "", "location_of_damage"],
            [5, "Witnesses", false, "", "witnesses"],
            [6, "Police Called", false, "", "police_called"],
            [7, "Car is Drivable", false, "", "car_is_drivable"]
        ]);
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

    const endRecording = (media, stopRecording) => {
        stopRecording();
        if (media && media !== "") {
            handleConvertToBase64(media);
        }
    };

    return (
        <div className="mainInterface">
            <div className="requirements">
                {requirements.map((item) => (
                    <div
                        key={item[0]}
                        className={"post " + (item[2] ? "postGood" : "postBad")}
                    >
                        {item[1] + ": " + item[3]}
                    </div>
                ))}
            </div>

            <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div className="recordingArea">
                        <div>
                            <span>
                                {["idle", "stopped"].includes(status) ? (
                                    <button
                                        className="buttonIdle"
                                        onClick={startRecording}
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
                            </span>
                            <span className="buttonIdle buttonReset">
                                <button onClick={resetRequirements}>
                                    Reset info
                                </button>
                            </span>
                        </div>
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