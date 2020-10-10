import React, { useEffect } from 'react'
const PlayMusic = () => {
    const SC = window.SC;
    useEffect(() => {
        SC.initialize({
            client_id: '0gk6cWFxRJcIGpDjYPiqm0zXGM6O6cLx'
        });

        // stream track id 293

        fetch('https://api.soundcloud.com/e1/me/stream?limit=10&offset=0&linked_partitioning=1&client_id=0gk6cWFxRJcIGpDjYPiqm0zXGM6O6cLx&oauth_token=2-291798-892133038-Ltaz792qk7iUkY'
        , {
            method: 'GET', // or 'PUT'
            headers: {
                // 'Authorization': "OAuth 2-291798-892133038-Ltaz792qk7iUkY"
            },
        })
            .then(response => console.log(response))
            .catch((error) => {
                console.error('Error:', error);
            });
        //   SC.stream('/tracks/293').then(function(player){
        //     player.play().then(function(){
        //       console.log('Playback started!');
        //     }).catch(function(e){
        //       console.error('Playback rejected. Try calling play() from a user interaction.', e);
        //     });
        //   });
    }, [SC])

    return (
        <div>

        </div>
    )
}

export default PlayMusic
