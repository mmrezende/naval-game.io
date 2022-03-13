import * as PIXI from 'pixi.js';

const render = () => {

  //Load left panel
  const leftPanel = new PIXI.Container();
  const header = new PIXI.Graphics();
  header.beginFill(0x444444);
  header.drawRect(0,0,200,200);
  header.endFill();
  return header;
  leftPanel.addChild(header);
  
  //Load map
  
  //Load player

  //Add map to the leftPanel

  //Add leftPanel to the stage
  //app.stage.addChild(leftPanel);
}

export default render;