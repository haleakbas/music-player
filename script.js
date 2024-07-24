window.onload = function() {
	if(!window.location.hash) {
		window.location = window.location + '#loaded';
		window.location.reload();
	}
}

let currentMusic = 0;


const music = document.querySelector('#audio');



const songName = document.querySelector('.seek-bar');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.song-duration');
const musicDuration = document.querySelector('.current-time');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');
const seekBar = document.querySelector('.seek-bar');


playBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    playBtn.classList.remove('pause');
  } else {
    music.pause();
    playBtn.classList.add('pause');
  }
});


//setting up the music

const setMusic = (i) => {
  seekBar.value = 0; //sets range slide to 0
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  disk.backgroundImage = `url('${song.cover}')`;

  currentTime.innerHTML ='00:00';
  setTimeout(()=> {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
  }, 300)
}

setMusic(0);

//formatting time in min and seconds

const formatTime = (time) => {
  let min = Math.floor(time/60);
  if(min<10){
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if(sec < 10){
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
};

setInterval(()=>{
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);

}, 500)

seekBar.addEventListener('input', () => {
  music.currentTime = seekBar.value;
});

//forward and backward buttons

forwardBtn.addEventListener('click', () => {
  if(currentMusic >= song.length -1){
    currentMusic = 0;
  }else{
    currentMusic++;
  }
  setMusic(currentMusic);
  playBtn.click();
})

backwardBtn.addEventListener('click', () => {
  if(currentMusic <=0 ){
    currentMusic = songs.length - 1;
  }else{
    currentMusic--;
  }
  setMusic(currentMusic);
  playBtn.click();
})