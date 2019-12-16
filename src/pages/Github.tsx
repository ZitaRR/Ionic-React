import {IonPage, IonContent, useIonViewWillEnter, IonCard, IonCardHeader, IonCardTitle, IonCardContent} from '@ionic/react'
import React, { useState } from 'react';

interface Repo{
    name: string,
    url: string,
    description: string,
    language: string,
    languageIcon: string
}

const url: string = "https://api.github.com/users/zitarr/repos";

const Github: React.FC = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    useIonViewWillEnter(async () => {
        const result = await fetch(url);
        await result.json()
            .then(data => {
                let newRepos: Repo[] = [];
                let icon: string;
                data.forEach((repo: any) => {
                    switch(repo.language){
                        case "C#": icon = "devicon-csharp-plain"; break;
                        case "Python": icon = "devicon-python-plain"; break;
                        case "JavaScript": icon = "devicon-javascript-plain"; break;
                        case "TypeScript": icon = "devicon-typescript-plain"; break;
                    }
                    newRepos.push({
                        name: repo.name,
                        url: repo.html_url,
                        description: repo.description,
                        language: repo.language,
                        languageIcon: icon
                    })
                })
                setRepos(newRepos);
            })
    })
    return (
        <IonPage>
            <link rel="stylesheet" href="https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css"></link>
            <IonContent>
                {repos.map((repo, idx) => <Repo key={idx} repo={repo}/>)}
            </IonContent>
        </IonPage>
    );
};

const Repo: React.FC<{repo: Repo}> = ({repo}) => {
    return (
        <IonCard button={true} onClick={() => window.open(repo.url)}>
            <IonCardHeader>
                <IonCardTitle>
                    <i className={repo.languageIcon}> </i>
                    {repo.name}
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {repo.description || "No Description"}
                <h6 style={{fontSize: 10}}>Written in {repo.language}</h6>
            </IonCardContent>
        </IonCard>
    );
}

export default Github;