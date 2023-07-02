//install dependencies done
//import dependencies done
//setup webcam and canvas done
//Define reference to those done
//load handpose done
//detect function 
//drawing utilities from tensorflow 
//draw functions





import React,{useRef} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose'
import Webcam from 'react-webcam'
import { drawHand } from './Utilities';

import './App.css';

function App() {
 
const webcamRef=useRef(null);
const canvasRef=useRef(null);


const runHandpose =async () =>{
  const net= await handpose.load()
  console.log('HandPose Model Loaded.')
  //Loop and detect hands
  setInterval(()=>{
    detect(net);
  },100) 
}

runHandpose()


const detect= async(net)=>{
  //check data is available 

  if(
    typeof webcamRef.current!=="undefined" &&
  webcamRef.current!==null &&
  webcamRef.current.video.readyState === 4)
  {
    //get video properties 
    const video=webcamRef.current.video;
    const videoWidth=webcamRef.current.video.videoWidth;
    const videoheight=webcamRef.current.video.videoHeight;
    
    //set video height and width
    webcamRef.current.video.width=videoWidth
    webcamRef.current.video.height=videoheight
    
    //set canvas height and width 
    canvasRef.current.width=videoWidth
    canvasRef.current.height=videoheight
    
    
    //make detections

    const hand =await net.estimateHands(video);
    console.log(hand)


    //draw mesh
    
    const ctx=canvasRef.current.getContext("2d");
    drawHand(hand,ctx)
  }
}



  return (
  <>
    <div className='App'>
     <header className='App-header'>
      <Webcam 
        ref={webcamRef}

        style={{
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          textAlign:"center",
          zindex:9,
          width:640,
          height:480
        }}
      />

     <canvas 
        ref={canvasRef}
        style={{
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          textAlign:"center",
          zindex:9,
          width:640,
          height:480
        }}
      />
     </header>
    </div>

  </>
  );
}

export default App;
