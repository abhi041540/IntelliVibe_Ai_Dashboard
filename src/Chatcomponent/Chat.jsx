import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { marked } from "marked";
import highlight from "highlight.js";
import axios from "axios";
import { surl } from "../Hcomponents/Home";

axios.defaults.withCredentials=true;
function Chat() {
    var textqus = useRef(null);
    const [phase, setPhase] = useState(0);
    const [qustion, setQustion] = useState("");
    const [firstqust, setFirstqust] = useState("");
    const [editable, setEdtiable] = useState(true);
    const [speaktext, setSpeaktext] = useState("");
    function speakNow(event) {
       
        if ($(".speakdiv").hasClass("ion-android-volume-up")) {
            $(".speakdiv").removeClass("ion-android-volume-up").addClass("ion-android-volume-off");
            const responseParts = speaktext.match(/.{1,180}(?=\s|$)/g);
            let index = 0;

            const speakNextPart = () => {
                if (index < responseParts.length) {
                    const responseUtterance = new SpeechSynthesisUtterance(responseParts[index]);
                    responseUtterance.lang = 'hi-IN';
                    responseUtterance.rate=1.1;
                    responseUtterance.onend = () => {
                        index++;
                        speakNextPart();
                    };
                    window.speechSynthesis.speak(responseUtterance);
                }
                else {
                    $(".speakdiv").removeClass("ion-android-volume-off").addClass("ion-android-volume-up");
                }
            };
          
            speakNextPart();
        }
        else {
            window.speechSynthesis.cancel();
            $(".speakdiv").removeClass("ion-android-volume-off").addClass("ion-android-volume-up");
        }
        $("html").animate({ scrollTop: $("html")[0].scrollHeight}, 500);
    }
    function qustionChange(event) {
        if (editable == true) {
            setQustion(event.target.value);
        }

    }
    function submit(event) {
        if (textqus.current.value.length != 0 && editable == true) {
            setPhase(1);
            setQustion("Processing the result...")
            setEdtiable(false);
            setFirstqust(document.getElementById("textarea").value);

        }

    }
    function submit1(event) {

        if (textqus.current.value.length != 0 && editable == true) {
            qustionBlock(document.getElementById("textarea").value);
            setQustion("Processing the result...");
            setEdtiable(false);
            serverRequest(document.getElementById("textarea").value);
        }
        $("html").animate({ scrollTop: $("html")[0].scrollHeight }, 500);
    }
    function qustionBlock(qdata) {
        var v = document.createElement("div");
        v.className = "qustionblock";
        var v1 = document.createElement("div");
        v1.className = "qustioncontent";
        v1.textContent = qdata;
        v.appendChild(v1);
        document.getElementById("qcd").appendChild(v);
    }

    function ansBlock(qdata) {
        var v = document.createElement("div");
        v.className = "ansblock";
        var v1 = document.createElement("div");
        v1.className = "anscontent";

        v1.innerHTML = qdata;
        if (v1.getElementsByTagName("a").length > 0) {
            for (var va of v1.getElementsByTagName("a")) {
                va.setAttribute("target", "_blank");
            }
        }

        v.appendChild(v1);
        document.getElementById("qcd").appendChild(v);
        $("html").animate({ scrollTop: $("html")[0].scrollHeight }, 400)
    }
    function processans(codeSnippet) {
        const html = marked(codeSnippet, {
            highlight: function (code, lang) {
                return highlight.highlightAuto(code).value;
            }
        });
        const styledHtml = `
        <div style="color: white; width: 100%">
            ${html}
        </div>
        `;
        const processedData = styledHtml;
        ansBlock(processedData);

    }
    function serverRequest(qsdata) {
        setSpeaktext(qsdata);
        axios.post(`${surl}/intellivibe/chat`, { chat: qsdata }).then((resp) => {

            processans(resp.data);
            // console.log(resp.data);
            setSpeaktext(resp.data.replaceAll("**", " ")?.replaceAll("*", ""));
            setQustion("");
            setEdtiable(true);
        });
    }
    useEffect(() => {
        if (phase == 1 && phase != "") {
            qustionBlock(firstqust);
            setPhase("");
            serverRequest(firstqust);
        }
    }, [phase])
    useEffect(() => {
        const handleUnload = () => {
            window.speechSynthesis.cancel(); 
        };
        window.addEventListener("beforeunload", handleUnload);
        return () => {
            window.removeEventListener("beforeunload", handleUnload);
            window.speechSynthesis.cancel();
        };
    }, []);
    if (phase === 0) {
        return (
            <div style={{ backgroundColor: " #1f1f1f" }}>
                <div className="chatnav">
                    <h2 className="chatlogo" style={{ padding: "20px 15px", fontSize: "100%" }}><img src="../logo.png" style={{ width: "40px", marginRight: "10px" }} alt="" />IntelliVibe-AI</h2>
                </div>
                <div style={{ backgroundColor: " #1f1f1f", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }} >
                    <div>
                        <h1 style={{ width: "300px", fontSize: "140%", margin: "20px auto" }}>What can I help with?</h1>

                        <div class="container">
                            <div class="row" style={{ backgroundColor: "white", color: "black", width: "40vw", margin: 0, minWidth: "300px", backgroundColor: "#1f1f1f" }}>
                                <div className="col cta" style={{ padding: 0, minWidth: "300px", borderRadius: "20px", backgroundColor: "white" }}>
                                    <textarea type="text" ref={textqus} id="textarea" style={{ width: "100%", borderRadius: "20px", resize: "none", height: "100%", padding: "10px", scrollbarWidth: "none" }} value={qustion} placeholder="Ask Anything" required onChange={qustionChange} />
                                    <div>
                                        <a href="#" onClick={submit} ><i className="ion-arrow-up-c"></i></a>
                                        <a href="/voiceassist"><i className="ion-mic-a"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div style={{ backgroundColor: "#1f1f1f" }}>
                <div className="chatnav">
                    <h2 className="chatlogo" style={{ padding: "20px 15px", fontSize: "100%" }}><img src="../logo.png" style={{ width: "40px", marginRight: "10px" }} alt="" />IntelliVibe-AI</h2>
                </div>
                <a href="#" onClick={speakNow} className="speakdiv ion-android-volume-up"></a>
                <div style={{ zIndex: "300", backgroundColor: " #1f1f1f", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", position: "fixed", bottom: "0%" }} >
                    <div>
                        <div class="container">
                            <div class="row" style={{ backgroundColor: "white", color: "black", width: "40vw", margin: 0, marginBottom: "40px", marginTop: "10px", minWidth: "300px", backgroundColor: "#1f1f1f" }}>
                                <div className="col cta" style={{ padding: 0, minWidth: "300px", borderRadius: "20px", backgroundColor: "white" }}>
                                    <textarea type="text" ref={textqus} id="textarea" style={{ width: "100%", borderRadius: "20px", resize: "none", height: "100%", padding: "10px", scrollbarWidth: "none" }} value={qustion} placeholder="Ask Anything" required onChange={qustionChange} />
                                    <div>
                                        <a href="#" onClick={submit1}><i className="ion-arrow-up-c"></i></a>
                                        <a href="/voiceassist"><i className="ion-mic-a"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", zIndex: "100", alignItems: "center", justifyContent: "center" }}>
                    <div id="qcd" style={{ minWidth: "300px", maxWidth: "60vw", margin: "0 auto", marginBottom: "150px", marginTop: "80px" }}>

                    </div>
                </div>
            </div>
        );
    }

};
export default Chat;