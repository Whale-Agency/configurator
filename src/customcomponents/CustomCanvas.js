import Konva from 'konva';
import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Text } from 'react-konva';

let canvasWidth = 400;
let canvasHeight = 500;
let differenceCanvas = 1;
let historyStep = 0;
let history = [];
export function CustomCanvas({ imageSrc, setCurrentImage, setUndoClickRef, setRedoClickRef, setImagePath }) {
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const [stageX, setStageX] = useState(0);
  const [maxScale, setMaxScale] = useState(20);
  const [stageY, setStageY] = useState(0);
  const [stageScale, setStageScale] = useState(1);
  const scaleBy = 0.9;
  useEffect(() => {
    setUndoClickRef(handleUndo);
    setRedoClickRef(handleRedo);
  }, [])
  useEffect(() => {
    layerRef.current.destroyChildren();
    layerRef.current.clear();
    layerRef.current.batchDraw();
    setCurrentImage(null);
    Konva.Image.fromURL(imageSrc, (img) => {
      // setWidthHeight(img.attrs.image.width, img.attrs.image.height);
      var max = canvasWidth * differenceCanvas;
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
      history = [{width: img.attrs.image.width / ratio,
        height: img.attrs.image.height / ratio,
        x: 0,
        y: 80,}]
      historyStep = 0;
      setCurrentImage(img);
      const tr = new Konva.Transformer({
        nodes: [img],
        keepRatio: false,
        rotateAnchorOffset: 60,
        boundBoxFunc: (oldBox, newBox) => {
          if (newBox.width < 10 || newBox.height < 10) {
            return oldBox;
          }
          return newBox;
        },
      });

      layerRef.current.add(img)
      tr.on('transformend', (e) => {
        historyStep++;
        history = history.slice(0, historyStep + 1);
        history = history.concat(JSON.parse(JSON.stringify(e.currentTarget.parent.children[0].attrs)));
      })
      layerRef.current.add(tr)
      img.on('transform', (e) => {
        // reset scale on transform
        img.setAttrs({
          scaleX: 1,
          scaleY: 1,
          width: img.width() * img.scaleX(),
          height: img.height() * img.scaleY(),
        });
        setCurrentImage(img);
      });
      img.on('dragend', (e) => {
        historyStep++;
        
        history = history.slice(0, historyStep + 1);
        history = history.concat(JSON.parse(JSON.stringify(e.currentTarget.attrs)));
        setCurrentImage(img);
      });
      img.on('mouseup', (e) => {
        historyStep++;
        history = history.slice(0, historyStep + 1);
        history = history.concat(JSON.parse(JSON.stringify(e.currentTarget.attrs)));
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
  }
  useEffect(() => {
    window.addEventListener('keyup', handleUserKeyPress);

    return () => {
      window.removeEventListener('keyup', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);
  function handleUserKeyPress(event) {
    const { key } = event;
    if(key === 'Delete') {
      history = [];
      historyStep = 0;
      setCurrentImage(null);
      setImagePath(null);
    }
  }
  
  const handleRedo = () => {
    if (history.length === 0 || historyStep === history.length - 1) {
      return;
    }
    historyStep += 1;
    const next = history[historyStep];
    layerRef.current.destroyChildren();
    layerRef.current.clear();
    layerRef.current.batchDraw();
    setCurrentImage(null);
    Konva.Image.fromURL(imageSrc, (img) => {
      img.setAttrs({
        width: next.width,
        height: next.height,
        x: next.x,
        y: next.y,
        rotation: next.rotation,
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
      tr.on('transformend', (e) => {
        historyStep++;
        history = history.slice(0, historyStep + 1);
        history = history.concat(JSON.parse(JSON.stringify(e.currentTarget.parent.children[0].attrs)));
      })
      layerRef.current.add(tr);

      img.on('transform', (e) => {
        // reset scale on transform
        img.setAttrs({
          scaleX: 1,
          scaleY: 1,
          width: img.width() * img.scaleX(),
          height: img.height() * img.scaleY(),
        });
        setCurrentImage(img);
      });
      
      img.on('dragend', (e) => {
        historyStep++;
        history = history.slice(0, historyStep + 1);
        history = history.concat(JSON.parse(JSON.stringify(e.currentTarget.attrs)));
        setCurrentImage(img);
      });
      img.on('mouseup', (e) => {
        historyStep++;
        history = history.slice(0, historyStep + 1);
        history = history.concat(JSON.parse(JSON.stringify(e.currentTarget.attrs)));
      });
    });
  };

  const handleUndo = () => {
    if (historyStep === 0) {
      return;
    }
    historyStep -= 1;
    const previous = history[historyStep];
    layerRef.current.destroyChildren();
    layerRef.current.clear();
    layerRef.current.batchDraw();
    setCurrentImage(null);
    Konva.Image.fromURL(imageSrc, (img) => {
      img.setAttrs({
        width: previous.width,
        height: previous.height,
        x: previous.x,
        y: previous.y,
        rotation: previous.rotation,
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
      tr.on('transformend', (e) => {
        historyStep++;
        history = history.slice(0, historyStep + 1);
        history = history.concat(JSON.parse(JSON.stringify(e.currentTarget.parent.children[0].attrs)));
      })
      layerRef.current.add(tr);

      img.on('transform', (e) => {
        // reset scale on transform
        img.setAttrs({
          scaleX: 1,
          scaleY: 1,
          width: img.width() * img.scaleX(),
          height: img.height() * img.scaleY(),
        });
        setCurrentImage(img);
      });
      
      img.on('dragend', (e) => {
        historyStep++;
        history = history.slice(0, historyStep + 1);
        history = history.concat(JSON.parse(JSON.stringify(e.currentTarget.attrs)));
        setCurrentImage(img);
      });
      img.on('mouseup', (e) => {
        historyStep++;
        history = history.slice(0, historyStep + 1);
        history = history.concat(JSON.parse(JSON.stringify(e.currentTarget.attrs)));
      });
    });
  };
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
        // style={{marginLeft: -1 *(canvasHeight - canvasHeight * differenceCanvas) / 2, 
        //   marginTop: -1 *(canvasHeight - canvasHeight * differenceCanvas) / 2}}
        //  onClick={onClick}
        // onDblClick={onDblClick}
      >
         {/* width={canvasWidth * differenceCanvas} height={canvasHeight * differenceCanvas} */}
         <Layer ref={layerRef} />
      </Stage>
    </div>
  );
}
