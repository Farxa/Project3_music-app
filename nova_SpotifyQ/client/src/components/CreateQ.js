import React, { useState, useEffect } from "react";
import axios from "axios";
import TrackSearch from "./TrackSearch";
import Queue from "./Queue";
import InviteAndCopy from "./InviteAndCopy";
import PlayBar from "./PlayBar";
import {Link} from "react-router-dom"

export default function CreateQ(props) {
  const [input, setInput] = useState("");
  const [tracks, setTracks] = useState([]);
  const [queue, setQueue] = useState([]);
  
 
  const API_URL = "http://localhost:8000";

  const selectedDevice = props.selectedDevice;
  const token = props.token;
  const spotifyApi = props.spotifyApi
  const setToken = props.setToken



  // ❗❗code for inviteCode still not working, I need to use routes for this❗❗

  const [message, setMessage] = useState('');

	// useEffect(()=> {
	// 	if (props.match.params.inviteCode) {
	// 		axios.get(`/api/auth/${props.match.params.inviteCode}`).then((res) => {
	// 			console.log("THIS IS RES.DATS",res.data);
	// 			 props.setSelecedDevice(res.data.selectedDevice)
	// 			 setToken(res.data.token)
	// 		}).catch(message => {
	// 			setMessage(message)
	// 		})
	// 	} 	
	// }, []) 

  
  // console.log("THIS IS THE INVITECODE: ", props.match.params.inviteCode);

// ❗❗

  const handleTrackSearch = () => {
    spotifyApi.searchTracks(input).then(
      data => {
        setTracks(data.body.tracks.items);
      },
      function (err) {
        console.log(err);
      }
    );
  };

  const addTrackToQueue = track => {
    const existingTrackInQueue = queue.find(
      queueTrack => queueTrack.id === track.id
    );
    if (existingTrackInQueue) {
      return;
    } else {
      setQueue([...queue, track]);
      spotifyApi.addToQueue(track.uri).then(data => {
        console.log(data);
      });
    }
  };



  //
  const [inviteCode, setInviteCode] = useState("");

  const handleCreateQ = e => {
    const requestBody = { selectedDevice, token, inviteCode };
    axios
      .post(`/api/queue`, requestBody)
      .then(res => {
        console.log("This is the res: ", res);
        setInviteCode(res.data.inviteCode);
      })
      .catch();
  };

  const createdQ_URL = `http://localhost:8000/${inviteCode}`;

  return (
    <div className="container">

      <TrackSearch
        input={input}
        setInput={setInput}
        handleTrackSearch={handleTrackSearch}
        tracks={tracks}
        addTrackToQueue={addTrackToQueue}
      />

      <Queue queue={queue} />
      
      <InviteAndCopy 
        handleCreateQ={handleCreateQ} 
        inviteCode={inviteCode} 
        createdQ_URL={createdQ_URL}
        setToken={setToken}
        message={message}
      />

      <PlayBar spotifyAPI={spotifyApi} selectedDevice={selectedDevice} />

    </div>
  );
}
