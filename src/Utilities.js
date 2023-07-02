                                     //7Jeno
//Points for Fingers

const fingerJoints ={
    thumb:[0,1,2,3,4],
    indexFinger:[0,5,6,7,8],
    middleFinger:[0,9,10,11,12],
    ringFinger:[0,13,14,15,16],
    pinky:[0,17,18,19,20],
}


//Drawing Function


export const drawHand=(predictions,ctx)=>{
  //Check if we have Predictions
   if(predictions.length>0){
       //Loop Through each Predictions
       predictions.forEach((prediction)=>{
        //Grab Landmarks
        const landmarks=prediction.landmarks;
         //loop through fingers

         for(let j=0;j<Object.keys(fingerJoints).length;j++){
         
           let finger=Object.keys(fingerJoints)[j];

          //loop through pair of joints 

             for(let k=0;k<fingerJoints[finger].length-1;k++){
              //Get pairs of joints

              const firstJointIndex=fingerJoints[finger][k];
              const secondJointIndex=fingerJoints[finger][k+1];


              //Draw path

              ctx.beginPath();
              ctx.moveTo(
                landmarks[firstJointIndex][0],
                landmarks[firstJointIndex][1]
              );
              ctx.lineTo(
                landmarks[secondJointIndex][0],
                landmarks[secondJointIndex][1]
              )

              ctx.strokeStyle="aqua";
              ctx.lineWidth=4;
              ctx.stroke();


             }

         }


        //loop throough landmarks and draw em

        for(let i=0;i<landmarks.length;i++){
         
            //get x point 

            const x=landmarks[i][0];

            //get y point 

            const y =landmarks[i][1];

            //start drawing

            ctx.beginPath();
            ctx.arc(x,y,8,0,3 * Math.PI);

            //set Line Color

            ctx.fillStyle="darkblue";
            ctx.fill();

        }

        
       })




   }












}