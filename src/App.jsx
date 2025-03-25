import { useEffect, useState } from "react";

import ActiveCallDetail from "./components/ActiveCallDetail";
import Form from "./components/base/Form";
import Vapi from "@vapi-ai/web";

// Put your Vapi Public Key below.
const vapi = new Vapi("049cb802-f804-498b-894c-cf38c46bf5de");

const App = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  const [callMessages, setCallMessages] = useState([]);

  // hook into Vapi events
  useEffect(() => {
    vapi.on("call-start", () => {
      setCallMessages([])
      setConnecting(false);
      setConnected(true);
    });

    vapi.on("call-end", () => {
      setConnecting(false);
      setConnected(false);
    });

    vapi.on("speech-start", () => {
      setAssistantIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      setAssistantIsSpeaking(false);
    });

    vapi.on("volume-level", (level) => {
      setVolumeLevel(level);
    });

    vapi.on("message", (message) => {
      if (message.transcriptType == 'final') {
        setCallMessages(prevItems => [...prevItems, { role: message.role, text: message.transcript}]);
        console.log(callMessages)
      }
    })

    vapi.on("error", (error) => {
      console.error(error);

      setConnecting(false);
    });

  }, []);

  // call start handler
  const startCallInline = (trackBloodPressure, trackTabletsTaken) => {
    setConnecting(true);
    vapi.start(assistantOptions(trackBloodPressure, trackTabletsTaken));
  };

  const endCall = () => {
    vapi.stop();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
      }}
    >
      {!connected ? (
        <Form
          onClick={startCallInline}
          isLoading={connecting}
        />
      ) : (
        <ActiveCallDetail callMessages={callMessages} />
      )}
    </div>
  );
};

const assistantOptions = (trackBloodPressure, trackTabletsTaken) => {
  const taskAndGoals = `
    1. Verify client's identity for HIPAA compliance: "For security purposes, could you please provide your [specific verification information]?"
    2. Introduce the task:
      ${trackBloodPressure ? '- Ask if blood pressure has been checked: "Have you checked your blood pressure today?' : ''}
      ${trackTabletsTaken ? '- Inquire about medication adherence: "Have you taken your prescribed medications today?' : ''}
    3. If the client responds, proceed based on their answers:
      ${trackBloodPressure ? '- Confirm checked client blood pressure today.' : ''}
      ${trackTabletsTaken ? '- Confirm taken client prescribed medications today' : ''}      
      - Wish a wonderful day and end the call.
  `;

  return {
    name: "Health checker",
    firstMessage: "Good Morning. How are you today?",
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    voice: {
      provider: "playht",
      voiceId: "jennifer",
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are Robin, a healthcare coordination voice assistant.
          You are responsible for proactively reaching out to patients to assist with medical appointments, answer health questions, provide pre-visit guidance, facilitate prescription refills, and coordinate care, all while maintaining HIPAA compliance.

          [Style]  
          - Embrace a compassionate, patient, and reassuring tone.
          - Use a warm, clear, and natural speaking style with conversational language.
          - Balance healthcare terminology with accessible explanations.
          - Project competence without sounding overly clinical.
          
          [Response Guidelines]  
          - Use clear language and avoid unnecessary jargon.
          - Maintain a calm and reassuring tone.
          - Provide explicit confirmation for important information.
          - Prioritize empathy in responses to health-related concerns.
          
          [Task & Goals]  
          ${taskAndGoals}
          
          [Error Handling / Fallback]  
          - If the client's response is unclear, politely ask for clarification: "Could you please repeat that?"
          - If there is an error or system issue, apologize and provide guidance on alternative steps: "I'm sorry, there seems to be a technical issue. Let me assist you with that in another way.`
        },
      ],
    }
  };
};

export default App;
