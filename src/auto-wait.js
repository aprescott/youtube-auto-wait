function query_string_to_map(string) {
  array = string.substring(1, string.length).split(/[&;]/);
  query_map = {};
  for(var i in array) {
    w = array[i].split("=");
    query_map[w[0]] = w[1];
  }
  return query_map;
}

function current_video_identifier() {
  return query_string_to_map(window.location.search)["v"];
}

function currently_playing() {
  return localStorage["__auto-wait-identifier"];
}

function set_playing(identifier) {
  localStorage["__auto-wait-identifier"] = identifier;
}

function isWaiting() {
  return (!!currently_playing());
}

function setWaiting() {
  if (!isWaiting()) {
    set_playing(current_video_identifier());
  }
}

function setNotWaiting() {
  set_playing(null);
}

function video_played() {
  if (!isWaiting()) {
    setWaiting();
  }
}

function video_paused() {
  if (currently_playing() == current_video_identifier()) {
    setNotWaiting();
  }
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
  if (isWaiting() && currently_playing() != current_video_identifier()) {
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

// If the currently_playing identifier is the empty string, no videos
// will be paused.
if (currently_playing() != null && currently_playing.length == 0) {
	set_playing(null);
}

if (flash) {
  setTimeout(function() { if (isWaiting() && currently_playing() != current_video_identifier()) { video.pauseVideo(); } else { setWaiting(); } }, 1000);
} else {
  modify_video(video);
}

if (flash) {
  window.onbeforeunload = function() { video_paused(); pause_video(video); }
} else {
  window.onbeforeunload = function() { pause_video(video); };
}
