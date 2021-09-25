import { ReactComponent as Yey } from '../Icons/Yey.svg';
import { ReactComponent as ThumbsUp } from '../Icons/ThumbsUp.svg';
export default function LeftCongratsPage({ setProductSpeichernClick }) {
  return (
    <div align='center'>
      <div>
        <Yey />
      </div>
      <div>
        <ThumbsUp />
      </div>
      <h2 className='Sub-heading'>Gute Auswahl!</h2>
      <div className='canvas-Select-Image-Text'>
        Jetzt nur noch Das Bild an die gewünschte Stelle Positionieren und
        fortfahren zum Warenkorb.
      </div>
      <br />
      <div
        className='EntdeckemehrBilder'
        onClick={() => setProductSpeichernClick(false)}
      >
        Entdecke mehr Bilder
      </div>
    </div>
  );
}
