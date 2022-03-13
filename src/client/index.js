import * as PIXI from 'pixi.js';

import render from './render.js';

const app = new PIXI.Application({
  backgroundColor: 0x00ffff,
  width: window.innerWidth,
  height: window.innerHeight
});

document.body.appendChild(app.view);

Promise.all([
]).then(() =>{
  let matchConfig = {
    map: {
      size: {
        width: 9,
        height: 9,
        regionWidth: 3,
        regionHeight: 3
      }
    }
  }

  let state = {
    player: {
      line: 2,
      col: 5
    }
  }

  app.loader.load((loader, resources) => {
    render({
      app,
      state,
      matchConfig
    })
  });
});