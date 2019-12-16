import {IonPage, IonAvatar, IonContent, IonItem, IonLabel, IonList, useIonViewWillEnter} from '@ionic/react'
import React, { useState } from 'react'

interface Author {
    name: string,
    email: string,
    position: string,
    photo: string;
}

const Authors: React.FC = () => {
    const [people, setPeople] = useState<Author[]>([]);
    useIonViewWillEnter(async () => {
        const result = await fetch('https://uifaces.co/api?limit=25', {
            headers: {'x-API-KEY': '95d0bda5a256efe7837b247175cb09'}
        });
        const data = await result.json();
        setPeople(data);
    })
    return (
        <IonPage>
            <IonContent>
                <IonList>
                    {people.map((person, idx) => <AuthorItem key={idx} author={person}/>)}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

const AuthorItem: React.FC<{author: Author}> = ({author}) => {
    return (
        <IonItem>
            <IonAvatar slot="start">
                <img src={author.photo} alt=""/>
            </IonAvatar>
            <IonLabel>
                <h2>{author.name}</h2>
                <p>{author.position}</p>
            </IonLabel>
        </IonItem>
    );
}

export default Authors;