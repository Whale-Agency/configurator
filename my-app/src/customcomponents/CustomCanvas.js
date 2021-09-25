import Konva from 'konva';
import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';

let canvasWidth = 400;
let canvasHeight = 500;
export function CustomCanvas({ imageSrc, setCurrentImage }) {
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const [stageX, setStageX] = useState(0);
  const [maxScale, setMaxScale] = useState(20);
  const [stageY, setStageY] = useState(0);
  const [stageScale, setStageScale] = useState(1);
  const scaleBy = 0.9;

  useEffect(() => {
    layerRef.current.clear();
    setCurrentImage(null);
    Konva.Image.fromURL(imageSrc, (img) => {
      // setWidthHeight(img.attrs.image.width, img.attrs.image.height);
      var max = canvasWidth;
      var ratio =
        img.attrs.image.width > img.attrs.image.height
          ? img.attrs.image.width / max
          : img.attrs.image.height / max;

      img.setAttrs({
        width: img.attrs.image.width / ratio,
        height: img.attrs.image.height / ratio,
        x: 0,
        y: 80,
        name: 'image',
        draggable: true,
      });
      setCurrentImage(img);
      layerRef.current.add(img);

      const tr = new Konva.Transformer({
        nodes: [img],
        keepRatio: false,
        boundBoxFunc: (oldBox, newBox) => {
          if (newBox.width < 10 || newBox.height < 10) {
            return oldBox;
          }
          return newBox;
        },
      });

      layerRef.current.add(tr);

      img.on('transform', () => {
        // reset scale on transform
        img.setAttrs({
          scaleX: 1,
          scaleY: 1,
          width: img.width() * img.scaleX(),
          height: img.height() * img.scaleY(),
        });
        setCurrentImage(img);
      });
    });
  }, [imageSrc]);

  function handleWheel(e) {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    let newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    if (oldScale >= maxScale && newScale > oldScale) return;
    if (newScale < 1) {
      newScale = 1;
    }
    let newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    if (newScale <= 1) {
      newPos = {
        x: 0,
        y: 0,
      };
    }
    if (newPos.x > 0) newPos.x = 0;
    if (newPos.y > 0) newPos.y = 0;
    stage.scale({ x: newScale, y: newScale });
    stage.position(newPos);
    stage.batchDraw();
    var dataURL = stage.toDataURL();
    console.log(dataURL);
  }
  return (
    <div id='stagecontainer' className='Canvas-Content'>
      <Stage
        ref={stageRef}
        id='stage'
        width={canvasWidth || window.innerWidth}
        height={canvasHeight || window.innerHeight}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stageX}
        y={stageY}
        onWheel={handleWheel}
        //  onClick={onClick}
        // onDblClick={onDblClick}
      >
        <Layer ref={layerRef}></Layer>
      </Stage>
    </div>
  );
}
