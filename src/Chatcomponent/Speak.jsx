import React, { useState, useEffect, useRef } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import $ from "jquery";
import axios from 'axios';
import { surl } from '../Hcomponents/Home';
axios.defaults.withCredentials=true;
const Speak = () => {
    const [isAnimating, setAnimating] = useState(false);
    const [transcript, setTranscript] = useState('');
    const willplay = useRef(true);
    const { listen, stop, listening } = useSpeechRecognition({
        onResult: result => setTranscript(result),
    });
    const [check, setCheck] = useState(0);

    const startAnimation = async () => {
        if (check === 0) {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                setCheck(1);
            } catch (error) {
                console.error("Microphone access denied or not supported:", error);
                alert("Microphone access is required to use this feature.");
                return;
            }
        }
        if (!isAnimating && !listening) {
            setAnimating(true);
            listen();
        }
    };

    useEffect(() => {
        if ('speechSynthesis' in window) {
            const responseUtterance = new SpeechSynthesisUtterance(
                "Hello, I am IntelliVibe. How can I help you today?"
            );
            responseUtterance.rate = 1;
            responseUtterance.lang = 'hi-IN';
            window.speechSynthesis.speak(responseUtterance);
        } else {
            console.warn("Speech Synthesis API not supported in this browser.");
        }
    }, []);

    const stopAnimation = () => {
        if (isAnimating && listening) {
            setAnimating(false);
            stop();
        }
        window.speechSynthesis.cancel();
    };

    const speakfun = (text) => {
        willplay.current = true;
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(
                "Your request is processing. Thanks for being patient!"
            );
            utterance.lang = 'hi-IN';
            utterance.onend = () => {
                $("#iconmic").removeClass("ion-ios-mic").addClass("ion-ios-mic-off");
                $("#cir").addClass("speaking");

                axios.post(`${surl}/intellivibe/chat`, { chat: text }).then((resp) => {
                    const responseText = resp.data.replaceAll("**", " ").replaceAll("*", "");
                    const responseParts = responseText.match(/.{1,180}(?=\s|$)/g);
                    let index = 0;
                    const speakNextPart = () => {
                        if (index < responseParts.length) {
                            const responseUtterance = new SpeechSynthesisUtterance(responseParts[index]);
                            responseUtterance.rate = 1.1;
                            responseUtterance.lang = 'hi-IN';
                            responseUtterance.onend = () => {
                                index++;
                                speakNextPart();
                            };
                            window.speechSynthesis.speak(responseUtterance);
                        } else {
                            onendspeak();
                        }
                    };

                    if (willplay.current === true) {
                        setAnimating(true);
                        speakNextPart();
                    }
                }).catch((error) => {
                    console.error("Error processing the chat request:", error);
                });
            };

            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("Speech Synthesis API not supported in this browser.");
        }
    };

    const onendspeak = () => {
        setAnimating(false);
        $("#iconmic").removeClass("ion-ios-mic-off").addClass("ion-ios-mic");
        $("#cir").removeClass("speaking");
    };

    const listenclick = (event) => {
        const v = event.target;
        if ($(v).hasClass("ion-ios-mic")) {
            willplay.current = false;
            window.speechSynthesis.cancel();
            $(v).removeClass("ion-ios-mic").addClass("ion-ionic");
            $("#cir").addClass("speaking");
            startAnimation();
        } else if ($(v).hasClass("ion-ios-mic-off")) {
            setAnimating(false);
            willplay.current = false;
            window.speechSynthesis.cancel();
            $(v).removeClass("ion-ios-mic-off").addClass("ion-ios-mic");
            $("#cir").removeClass("speaking");
        } else {
            stopAnimation();
            $(v).removeClass("ion-ionic").addClass("ion-ios-mic");
            $("#cir").removeClass("speaking");
            if (transcript.length > 0) {
                speakfun(transcript);
            }
            setTranscript("");
        }
    };

    useEffect(() => {
        const handleUnload = () => {
            window.speechSynthesis.cancel();
        };
        window.addEventListener("beforeunload", handleUnload);
        return () => {
            window.removeEventListener("beforeunload", handleUnload);
            setAnimating(false);
            window.speechSynthesis.cancel();
            $("#iconmic").removeClass("ion-ios-mic-off").addClass("ion-ios-mic");
            $("#cir").removeClass("speaking");
        };
    }, []);

    return (
        <div
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            className={`${isAnimating ? 'masterpiece-background' : 'animation'}`}
        >
            <h2 style={{ position: "fixed", top: "2%", left: "2%", fontSize: "95%" }}>
                <img src="../logo.png" style={{ width: "30px", marginRight: "8px" }} alt="logo" />
                IntelliVibe AI
            </h2>
            <div className="speech-container">
                <div id="cir" className="circle">
                    <a href="#" onClick={listenclick} style={{ textDecoration: "none", color: "whitesmoke" }}>
                        <i className="ion-ios-mic" id="iconmic" style={{ fontSize: "200%" }}></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Speak;
