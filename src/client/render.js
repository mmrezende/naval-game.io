import * as PIXI from 'pixi.js';

const renderTile = ({line, col, tileSize}) => {
  const tile = new PIXI.Graphics();
  tile.beginFill(0x000000);
  tile.drawCircle(tileSize * col, tileSize * line,8);
  tile.endFill();
  
  return tile;
}

const renderPlayer = ({line, col, tileSize}) => {
  const player = new PIXI.Sprite.from('/assets/submarine.png', {});
  player.x = tileSize * col;
  player.y = tileSize * line;
  player.anchor.set(0.5);
  player.width = 32;
  player.height = 32;

  return player;
}

const render = ({app, state, matchConfig}) => {

  //Load left panel
  const leftPanel = new PIXI.Container();
  const header = new PIXI.Graphics();
  header.beginFill(0x444444);
  header.drawRect(0,0,200,200);
  header.endFill();
  leftPanel.addChild(header);
  
  //Load map
  const map = new PIXI.Container();
  map.width = window.innerWidth - 120;
  map.height = window.innerHeight - 120;

  const tileSize = Math.min(
    (window.innerWidth - 120) / matchConfig.map.size.width,
    (window.innerHeight - 120) / matchConfig.map.size.height
  );

  map.pivot.x = -32;
  map.pivot.y = -32;
  for(let col = 0; col < matchConfig.map.size.width; col++) {
    for(let line = 0; line < matchConfig.map.size.height; line++) {
      map.addChild(renderTile({line, col, tileSize}));
    }
  }
  
  //Load player
  map.addChild(renderPlayer({...state.player, tileSize}));

  //Add map to the leftPanel
  leftPanel.addChild(map);

  //Add leftPanel to the stage
  app.stage.addChild(leftPanel);
}

export default render;