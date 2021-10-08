import Konva from 'konva';
import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Text } from 'react-konva';

let canvasWidth = 400;
let canvasHeight = 500;
let canvasCompareWidth = 1000;
let canvasCompareHeight = 800;
let differenceCanvas = 1;
let historyStep = 0;
let history = [];
export function CustomCanvas({
  imageSrc,
  setCurrentImage,
  setUndoClickRef,
  setRedoClickRef,
  setImagePath,
}) {
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const layerRefRect = useRef(null);
  // const layerRefInternal = useRef(null);
  const [stageX, setStageX] = useState(0);
  const [maxScale, setMaxScale] = useState(20);
  const [stageY, setStageY] = useState(0);
  const [stageScale, setStageScale] = useState(1);
  const [displayRect, setDisplayRect] = useState();
  const scaleBy = 0.9;
  useEffect(() => {
    setUndoClickRef(handleUndo);
    setRedoClickRef(handleRedo);
  }, []);
  useEffect(() => {
    clearLayers();
    setCurrentImage(null);
    Konva.Image.fromURL(imageSrc, (img) => {
      // setWidthHeight(img.attrs.image.width, img.attrs.image.height);
      var max = canvasWidth * differenceCanvas;
      var ratio =
        img.attrs.image.width > img.attrs.image.height
          ? img.attrs.image.width / max
          : img.attrs.image.height / max;
      const imgWidth = img.attrs.image.width / ratio;
      const imgHeight = img.attrs.image.height / ratio;
      history = [{ width: imgWidth, height: imgHeight, x: 0, y: 80 }];
      historyStep = 0;
      setCurrentImage(img);
      updateSelectionRect(getInitialXYOfTransformRect(), imgWidth, imgHeight);
      img.setAttrs({
        width: imgWidth,
        height: imgHeight,
        x: 0,
        y: 80,
        name: 'image',
        draggable: true,
      });

      layerRef.current.add(img);
      layerRef.current.add(getTransformerOfImg(img, imgWidth, imgHeight));
      bindImgEvents(img);
    });
  }, [imageSrc]);
  function getInitialXYOfTransformRect() {
    var firstCanvasElement = document.getElementById('stagecontainer');
    var firstCanvasPos = firstCanvasElement.getBoundingClientRect();

    var secondCanvasElement = document.getElementById('stagecontainerCompare');
    var secondCanvasPos = secondCanvasElement.getBoundingClientRect();
    var x = firstCanvasPos.left - secondCanvasPos.left;
    var y = firstCanvasPos.top - secondCanvasPos.top + 80;
    return { x, y, z: 0 };
  }
  function updateSelectionRect(point, imgWidth, imgHeight) {
    clearTransformer();
    const rect = new Konva.Rect({
      x: point.x,
      y: point.y,
      rotation: point.z,
      width: imgWidth,
      height: imgHeight,
      stroke: 'blue',
      dash: [10, 10],
      draggable: false,
    });
    layerRefRect.current.add(rect);
  }
  function getTransformerOfImg(img) {
    const tr = new Konva.Transformer({
      nodes: [img],
      keepRatio: false,
      boundBoxFunc: (oldBox, newBox) => {
        if (newBox.width < 10 || newBox.height < 10) {
          return oldBox;
        }
        return newBox;
      },
      borderDash: [4, 3],
    });

    tr.attachTo(img);
    bindTransformerEvents(tr);
    return tr;
  }
  // function transformerDesigner(tr) {
  //   var buttons = {
  //     rotater: {
  //       path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>box-configurator-rotate</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M0.9,0.5c0.1,0,0.3,0.1,0.3,0.3L1.1,2.9c1-1.4,2.6-2.4,4.5-2.4c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3c-1.4,0-2.6-0.5-3.6-1.4c-0.1-0.1-0.1-0.3,0-0.4L2.3,9c0.1-0.1,0.3-0.1,0.4,0c0.7,0.7,1.7,1.1,2.8,1.1c2.3,0,4.2-1.9,4.2-4.2S7.8,1.7,5.5,1.7c-1.7,0-3.2,1-3.8,2.5l2.7-0.1c0.1,0,0.3,0.1,0.3,0.3v0.6c0,0.1-0.1,0.3-0.3,0.3H0.3C0.1,5.2,0,5.1,0,4.9V0.8c0-0.1,0.1-0.3,0.3-0.3H0.9z"/></svg>',
  //       shape: tr.findOne('.rotater'),
  //     },
  //     top_left: {
  //       path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>box-configurator-transform</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M.07,3.66v-3A.58.58,0,0,1,.65.07h3A.29.29,0,0,1,4,.36V.94a.29.29,0,0,1-.29.29H1.23V3.66A.29.29,0,0,1,.94,4H.36A.29.29,0,0,1,.07,3.66Zm7-3.3V.94a.29.29,0,0,0,.29.29H9.77V3.66a.29.29,0,0,0,.29.29h.58a.29.29,0,0,0,.29-.29v-3a.58.58,0,0,0-.58-.58h-3A.29.29,0,0,0,7.05.36Zm3.59,6.69h-.58a.29.29,0,0,0-.29.29V9.77H7.34a.29.29,0,0,0-.29.29v.58a.29.29,0,0,0,.29.29h3a.58.58,0,0,0,.58-.58v-3A.29.29,0,0,0,10.64,7.05ZM4,10.64v-.58a.29.29,0,0,0-.29-.29H1.23V7.34a.29.29,0,0,0-.29-.29H.36a.29.29,0,0,0-.29.29v3a.58.58,0,0,0,.58.58h3A.29.29,0,0,0,4,10.64Z"/></svg>',
  //       shape: tr.findOne('.top-left'),
  //     },
  //     top_right: {
  //       path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>box-configurator-delete</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M10.24,1.08v.66a.39.39,0,0,1-.36.36H1.12a.39.39,0,0,1-.36-.36V1.08A.39.39,0,0,1,1.12.72H3.64L3.82.3A.52.52,0,0,1,4.24,0h2.4a.61.61,0,0,1,.48.3L7.3.72H9.82C10.06.78,10.24.9,10.24,1.08ZM1.42,2.82h8.1V9.91a1.05,1.05,0,0,1-1,1H2.44a1.05,1.05,0,0,1-1-1ZM3.1,9.19a.39.39,0,0,0,.36.36.39.39,0,0,0,.36-.36V4.44a.39.39,0,0,0-.36-.36.39.39,0,0,0-.36.36Zm2,0a.36.36,0,0,0,.72,0V4.44a.36.36,0,1,0-.72,0Zm2,0a.36.36,0,0,0,.72,0V4.44a.36.36,0,0,0-.72,0Z"/></svg>',
  //       shape: tr.findOne('.top-right'),
  //     },
  //   };

  //   for (var button in buttons) {
  //     var shape = buttons[button].shape;
  //     var selector = button.replace('_', '-');
  //     var icon = new Konva.Path({
  //       fill: 'white',
  //       data: buttons[button].path,
  //       name: selector + '-icon',
  //     });
  //     icon.position(shape.position());
  //     icon.x(shape.x() - 5.25);
  //     icon.y(shape.y() - 5.25);
  //     tr.add(icon);

  //     if (selector == 'top-right') {
  //       shape.listening(false);
  //       icon.on('click', () => {
  //         clearCanvas();
  //       });
  //     }
  //   }
  // }
  function clearLayers() {
    layerRef.current.destroyChildren();
    layerRef.current.clear();
    layerRef.current.batchDraw();
    clearTransformer();
  }
  function clearTransformer() {
    layerRefRect.current.destroyChildren();
    layerRefRect.current.clear();
    layerRefRect.current.batchDraw();
  }
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
    if (key === 'Delete') {
      clearCanvas();
    }
  }
  function clearCanvas() {
    history = [];
    historyStep = 0;
    setCurrentImage(null);
    setImagePath(null);
  }
  function bindTransformerEvents(tr) {
    tr.on('transformend', (e) => {
      historyStep++;
      history = history.slice(0, historyStep + 1);
      history = history.concat(
        JSON.parse(JSON.stringify(e.currentTarget.parent.children[0].attrs))
      );
    });
    // transformerDesigner(tr);
  }
  function updateSelectionRectUsingEvent(e, width, height) {
    const initialState = getInitialXYOfTransformRect();
    initialState.x += e.currentTarget.attrs.x;
    initialState.y += e.currentTarget.attrs.y - 80;
    initialState.z = e.currentTarget.attrs.rotation;
    updateSelectionRect(initialState, width, height);
  }
  function bindImgEvents(img) {
    img.on('transform', (e) => {
      // reset scale on transform
    const width = img.width() * img.scaleX();
    const height = img.height() * img.scaleY();
      updateSelectionRectUsingEvent(e, width, height);
      img.setAttrs({
        scaleX: 1,
        scaleY: 1,
        width: width,
        height: height,
      });
      setCurrentImage(img);
    });
    img.on('dragmove', (e) => {
    const width = img.width();
    const height = img.height();
    updateSelectionRectUsingEvent(e, width, height);
    });
    img.on('dragend', (e) => {
      historyStep++;
      history = history.slice(0, historyStep + 1);
      history = history.concat(
        JSON.parse(JSON.stringify(e.currentTarget.attrs))
      );
      setCurrentImage(img);
    });
    img.on('mouseup', (e) => {
      historyStep++;
      history = history.slice(0, historyStep + 1);
      history = history.concat(
        JSON.parse(JSON.stringify(e.currentTarget.attrs))
      );
    });
  }
  const handleRedo = () => {
    if (history.length === 0 || historyStep === history.length - 1) {
      return;
    }
    historyStep += 1;
    const next = history[historyStep];
    clearLayers();
    const initialState = getInitialXYOfTransformRect();
    initialState.x += next.x;
    initialState.y += next.y - 80;
    initialState.z = next.rotation;
    updateSelectionRect(initialState, next.width, next.height);
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
      layerRef.current.add(getTransformerOfImg(img, next.width, next.height));
      bindImgEvents(img);
    });
  };

  const handleUndo = () => {
    if (historyStep === 0) {
      return;
    }
    historyStep -= 1;
    const previous = history[historyStep];
    clearLayers();

    const initialState = getInitialXYOfTransformRect();
    initialState.x += previous.x;
    initialState.y += previous.y - 80;
    initialState.z = previous.rotation;
    updateSelectionRect(initialState, previous.width, previous.height);
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
      layerRef.current.add(
        getTransformerOfImg(img, previous.width, previous.height)
      );
      bindImgEvents(img);
    });
  };
  return (
    <>
      <div id='stagecontainerCompare' className='Canvas-Content-Compare'>
        <Stage
          width={canvasCompareWidth}
          height={canvasCompareHeight}
          // style={{marginLeft: -1 *(canvasHeight - canvasHeight * differenceCanvas) / 2,
          //   marginTop: -1 *(canvasHeight - canvasHeight * differenceCanvas) / 2}}
          //  onClick={onClick}
          // onDblClick={onDblClick}
        >
          <Layer ref={layerRefRect} />
        </Stage>
      </div>
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
    </>
  );
}
