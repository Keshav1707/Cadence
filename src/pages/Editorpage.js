import { React, useEffect, useRef } from "react";
import Client from "../components/Client";
import { useState } from "react";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
const Editorpage = () => {
  const socketref = useRef(null);
  useEffect(() => {
    const init = async () => {
      socketref.current = await initSocket();
      //socketref.current.emit("join");
    };
    init();
  }, []);

  const [clients, setClients] = useState([]);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/code-sync.png" alt="logo" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy ROOM ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
};
export default Editorpage;
