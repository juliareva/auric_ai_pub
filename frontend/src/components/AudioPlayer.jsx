const AudioPlayer = ({audioURL}) => {
    return (
      <div className="audio-container">
        <audio controls key={audioURL} >
          <source src={audioURL} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  };
  
  export default AudioPlayer;
