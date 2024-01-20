import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");
  const [username, setUsername] = useState("");
  const newRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomID(id);

    toast.success("Created a new room");
    console.log(id);
  };
  const joinRoom = () => {
    if (!roomID || !username) {
      toast.error("Room ID and username required");
      return;
    }
    navigate(`/editor/${roomID}`, {
      state: {
        username,
      },
    });
  };
  const handleInputEnter = (e) => {
    console.log("event", e.code);
    if (e.code === "Enter") {
      joinRoom();
    }
  };
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/code-sync.png"
          alt="code-sync-logo"
        />
        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            onChange={(e) => setRoomID(e.target.value)}
            value={roomID}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a onClick={newRoom} href="/" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built with 💛 &nbsp; by &nbsp;
          <a href="https://github.com/codersgyan">Coder's Gyan</a>
        </h4>
      </footer>
    </div>
  );
};
export default Home;
