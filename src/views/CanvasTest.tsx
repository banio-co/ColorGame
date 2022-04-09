import React, { useEffect, useState, useRef, useMemo } from 'react';

import { Platform, View, Button } from 'react-native';
import Canvas, { CanvasRenderingContext2D as NativeContext2D } from 'react-native-canvas';

const CanvasTest: React.FC = () => {
  const [ color, setColor ] = useState('red');
  const [ ctx, setCtx ] = useState<CanvasRenderingContext2D | NativeContext2D | null | undefined>();

  const canvasRef = useRef<Canvas | HTMLCanvasElement>(null);

  useEffect(() => {
    setCtx(canvasRef.current?.getContext('2d'));
  }, [ canvasRef ]);

  const canvas = useMemo<React.ReactNode>(() => (
    Platform.OS == 'web' ?
      <canvas ref={canvasRef as React.RefObject<HTMLCanvasElement>}/> :
      <Canvas ref={canvasRef as React.RefObject<Canvas>}/>
  ), [ canvasRef ]);

  const handlePress = (nextColor: 'red' | 'blue' | 'green'): void => {
    setColor(nextColor);
  };

  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 100, 100);
  }

  return (
    <View>
      <Button title="Red" onPress={() => handlePress('red')}></Button>
      <Button title="Blue" onPress={() => handlePress('blue')}></Button>
      <Button title="Green" onPress={() => handlePress('green')}></Button>
      {canvas}
    </View>
  );
};

export default CanvasTest;
