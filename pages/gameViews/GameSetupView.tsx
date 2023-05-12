import React, { useEffect, useState } from 'react'


interface GameSetupViewProps {
  closeView: () => void
}

const GameSetupView: React.FC<GameSetupViewProps> = ({ closeView }) => {

/* 
  const apiCall = async (method: string, url: string) => {
    const res = await fetch(url, {
      method: method,
      headers: {"content-type": "application/json"},
    });
    if(res.status !== 200){
      const text = await res.text();
      try{
        throw new Error(JSON.parse(text));
      }catch(err){
        throw new Error(text);
      }
    }

    try{
      const sampleItem = await res.json();
      console.log("This image data was fetched using the REST API!");
      console.log(sampleItem.data);
    }catch(err){
      console.error(err);
      return;
    }
  }



  const restHandler = async () => {
    console.log("testAPI")
    await apiCall("GET", "/api/getImagesTitles");
  } */

  return(
    <div>
      <div>GameSetupView</div>
      <button className="button button-primary" type="button" onClick={closeView}>
      Close GameSetupView
    </button>

{/*     <button className="button button-primary" type="button" onClick={restHandler}>
      Test API
    </button>
 */}
    </div>
    )

}
export default GameSetupView