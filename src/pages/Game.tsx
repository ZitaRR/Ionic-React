import {IonPage, IonTitle, IonHeader, IonToolbar, IonItem, IonImg, IonThumbnail, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, IonIcon, IonLabel, IonCardContent, IonGrid, IonCol, IonRow, IonList} from '@ionic/react'
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import ReactPlayer from 'react-player';
import "../theme/responsive-player.css"

interface Game {
    name: string,
    id: string,
    description: string,
    release: string, 
    image: string, 
    video: string,
    rating: string,
    ratingCount: number,
    metacritic: number,
    developer: string,
    publisher: string
}

interface GameProps extends RouteComponentProps<{gameId: string}> {}

const url = "https://api.rawg.io/api/games/"

const Game: React.FC<GameProps> = ({match}) => {
    const [game, setgame] = useState<Game>({
        name: "N/A",
        id: "N/A",
        description: "N/A",
        release: "N/A",
        image: "N/A",
        video: "N/A",
        rating: "N/A",
        ratingCount: 0,
        metacritic: 0,
        developer: "N/A",
        publisher: "N/A"
    });
    fetch(url + match.params.gameId)
        .then(response => response.json()
            .then(data => {
                setgame({
                    name: data.name,
                    id: data.id,
                    description: data.description_raw,
                    release: data.released,
                    image: data.background_image,
                    video: data.clip === null ? "N/A" : data.clip.clips.full,
                    rating: data.ratings.length <= 0 ? "N/A" : (data.ratings[0].title as String)[0].toUpperCase() + (data.ratings[0].title as String).slice(1),
                    ratingCount: data.reviews_count,
                    metacritic: data.metacritic,
                    developer: data.developers[0].name,
                    publisher: data.publishers[0].name
                });
            }).catch(console.log))
    return (
        <IonPage>
            <IonContent>
                <IonCard>
                    <IonCardHeader class="ion-text-center">
                        <IonCardSubtitle>{game.release}</IonCardSubtitle>
                        <IonCardTitle>{game.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="7.5">
                                    <IonCard  className="player-wrapper">
                                        <ReactPlayer className="react-player" url={game.video} controls={true} width="100%" height="100%"/>
                                    </IonCard>
                                </IonCol>
                                <IonCol>
                                    <IonCard>
                                        <IonCardContent>
                                            <IonItem>{game.description}</IonItem>
                                            <br/>
                                            <IonList class="ion-padding">
                                                <IonLabel>Ratings: {game.rating} ({game.ratingCount})<br/><br/></IonLabel>
                                                <IonLabel>Release Date: {game.release}<br/><br/></IonLabel>
                                                <IonLabel>Developer: {game.developer}<br/></IonLabel>
                                                <IonLabel>Publisher: {game.publisher}</IonLabel>
                                            </IonList>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default Game;