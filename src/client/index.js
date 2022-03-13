// // Learn more about this file at:
// // https://victorzhou.com/blog/build-an-io-game-part-1/#3-client-entrypoints
// import { connect, play } from './networking';
// import { startRendering, stopRendering } from './render';
// import { startCapturingInput, stopCapturingInput } from './input';
// import { downloadAssets } from './assets';
// import { initState } from './state';
// import { setLeaderboardHidden } from './leaderboard';

// // I'm using a tiny subset of Bootstrap here for convenience - there's some wasted CSS,
// // but not much. In general, you should be careful using Bootstrap because it makes it
// // easy to unnecessarily bloat your site.
// import './css/bootstrap-reboot.css';
// import './css/main.css';

// const playMenu = document.getElementById('play-menu');
// const playButton = document.getElementById('play-button');
// const usernameInput = document.getElementById('username-input');

// Promise.all([
//   connect(onGameOver),
//   downloadAssets(),
// ]).then(() => {
//   playMenu.classList.remove('hidden');
//   usernameInput.focus();
//   playButton.onclick = () => {
//     // Play!
//     play(usernameInput.value);
//     playMenu.classList.add('hidden');
//     initState();
//     startCapturingInput();
//     startRendering();
//     setLeaderboardHidden(false);
//   };
// }).catch(console.error);

// function onGameOver() {
//   stopCapturingInput();
//   stopRendering();
//   playMenu.classList.remove('hidden');
//   setLeaderboardHidden(true);
// }
// ---------------------------------------------

import * as PIXI from 'pixi.js';

const app = new PIXI.Application();

document.body.appendChild(app.view);

const renderTile = (line,col) => {
  let tile = new PIXI.Graphics();
  tile.beginFill(0xdddddd);
  tile.drawCircle(64 * col + 32, 64* line + 32,8);
  tile.endFill();
  
  return tile;
}

app.loader.load((loader, resources) => {
  const map = Array(9).fill(Array(9));
  for(let col = 0; col < map.length; col++) {
    for(let line = 0; line < map[col].length; line++) {
      app.stage.addChild(renderTile(line,col));
    }
  }
});