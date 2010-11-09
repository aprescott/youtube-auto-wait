var WAITING = 1;
var NOT_WAITING = 0;

function status() {
  return localStorage["__auto-wait"];
}

function setStatus(st) {
  localStorage["__auto-wait"] = st;
}

function isWaiting() {
  return (status() == WAITING);
}

function setWaiting() {
  setStatus(WAITING);
}

function setNotWaiting() {
  setStatus(NOT_WAITING);
}

function setDefaultStatus() {
	setWaiting();
}

function firstTime() {
	return status() == null;
}

if (firstTime()) {
  setWaiting();
}

function video_played() {
  setWaiting();
}

function video_paused() {
  setNotWaiting();
}

function pause_video(v) {
  if (html5) {
    v.pause();
  } else {
    v.pauseVideo();
  }
}

function enable_autoplay(v) {
  // do nothing, youtube videos should be autoplay by default
  // v.autoplay = "";
}

function disable_autoplay(v) {
  pause_video(v);
}

function correct_autoplay(v) {
  if (isWaiting()) {
    disable_autoplay(v);
  } else {
    enable_autoplay(v);
  }
}

function modify_video(v) {
  correct_autoplay(v);
  v.addEventListener("play", video_played, false);
  v.addEventListener("pause", video_paused, false);
}

html5 = document.getElementsByClassName("video-stream")[0];
flash = document.getElementById("movie_player");

video = flash || html5

if (flash) {
  setTimeout(function() { if (isWaiting()) { video.pauseVideo(); } else { setWaiting(); } }, 1000);
} else {
  modify_video(video);
}

if (flash) {
  window.onbeforeunload = function() { pause_video(video); setNotWaiting(); }
} else {
  window.onbeforeunload = function() { pause_video(video); };
}
