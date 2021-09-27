import yey from '../Icons/Yey.svg';
import thumbsUp from "../Icons/ThumbsUp.svg";

import { styled } from 'frontity'

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
      <HelperText>
        Jetzt nur noch Das Bild an die gewünschte Stelle Positionieren und
        fortfahren zum Warenkorb.
      </HelperText>
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

const HelperText = styled.div`
  font-size: 20px;
  font-weight: bold;
  opacity: 40%;
  color: #3a373a;
  width: 70%;
  margin: 0 auto;
`;
