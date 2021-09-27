import yey from '../Icons/Yey.svg';
import thumbsUp from "../Icons/ThumbsUp.svg";
export default function LeftCongratsPage({ }) {
  return (
    <div align='center'>
      <div>
        <img src={yey}/>
      </div>
      <div>
        <img src={thumbsUp} />
      </div>
      <h2 className='Sub-heading'>Gute Auswahl!</h2>
      <div className='canvas-Select-Image-Text'>
        Jetzt nur noch Das Bild an die gewünschte Stelle Positionieren und
        fortfahren zum Warenkorb.
      </div>
      <br />
      <div
        className='EntdeckemehrBilder'
        onClick={() => console.log("clicked change image")}
      >
        Bild ändern
      </div>
    </div>
  );
}
