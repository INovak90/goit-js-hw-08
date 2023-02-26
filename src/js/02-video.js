import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
player.on('play', function () {
  console.log('played the video!');
});
player
  .getVideoTitle()
  .then(function (title) {
    console.log('title:', title);
  })
  .catch(function (error) {
    console.log('an error occurred');
  });
const onPlay = function () {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem('videoPlayer-current-time', Math.round(seconds));
  });
};
let currentTime = localStorage.getItem('videoPlayer-current-time');
player.on('timeupdate', throttle(onPlay, 1000));
// player.setCurrentTime(currentTime);
player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
    console.log(seconds);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(
          'the time was less than 0 or greater than the video’s duration'
        );
        break;

      default:
        console.log('some other error occurred');
        break;
    }
  });
