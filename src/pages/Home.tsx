import { IonPage, IonButton, IonTitle} from '@ionic/react';
import React, { useState } from 'react';
import '../theme/responsive-player.css'

const Home: React.FC = () => {
  const [name, setName] = useState<String>()
  let options = {
    acceptAllDevices: true
  }
  return (
    <IonPage>
      <IonButton onClick={() => navigator.bluetooth.requestDevice(options)
      .then(device => {
        console.log("Name: ");
        setName(device.name);
      })}>Bluetooth</IonButton>
      <IonTitle>Name: {name}</IonTitle>
    </IonPage>
  );
};

export default Home;
