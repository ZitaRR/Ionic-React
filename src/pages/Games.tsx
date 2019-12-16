import {IonPage, IonItem, IonContent, IonTitle, IonGrid, IonCol, IonAvatar, IonImg, useIonViewWillEnter} from '@ionic/react'
import React, {useState} from 'react'
import '../theme/responsive-player.css'

interface Game {
    name: string,
    id: number,
    release: string,
    image: string,
    video: string,
    rating: number,
    metacritic: number
}

const url = "https://api.rawg.io/api/games?page_size=20";

const Games: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    useIonViewWillEnter(async () => {
        const result = await fetch(url);
        result.json()
            .then(data => {
                let _games: Game[] = [];
                data.results.forEach((game: any) => {
                    _games.push({
                        name: game.name,
                        id: game.id,
                        release: game.released || "N/A",
                        image: game.background_image,
                        video: game.clip.clips.full,
                        rating: game.rating || "N/A",
                        metacritic: game.metacritic || "N/A"
                    });
                });
                setGames(_games);
            })
    });
    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonCol>
                        {games.map((game, idx) => <GameItem key={idx} game={game}/>)}
                    </IonCol>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

const GameItem: React.FC<{game: Game}> = ({game}) => {
    return (
        <IonItem button={true} href={"/game/" + game.id}>
            <IonAvatar>
                <IonImg src={game.image}/>
            </IonAvatar>
            <IonTitle>{game.name}</IonTitle>
        </IonItem>
    );
}

export default Games;