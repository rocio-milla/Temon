import TrackPlayer from 'react-native-track-player';

export default async function TrackPlayerService() {

    TrackPlayer.addEventListener("remote-play", () => {
        console.log("asddas")
    });

    TrackPlayer.addEventListener("remote-pause", () => TrackPlayer.pause());

    TrackPlayer.addEventListener("remote-stop", () => TrackPlayer.destroy());

    TrackPlayer.addEventListener("playback-state", (state) => {
        console.log("playback-state",state)
    });
    
    
    
}