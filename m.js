document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const playPauseButton = document.getElementById("play-pause");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const volumeControl = document.getElementById("volume");
    const trackSlider = document.getElementById("track-slider");
    const currentTimeDisplay = document.getElementById("current-time");
    const totalDurationDisplay = document.getElementById("total-duration");
    const ribbon = document.getElementById("ribbon");
    const trackNameDisplay = document.getElementById("track-name");
    const albumPhoto = document.getElementById("album-photo");
  
  
    let isPlaying = false;
    let currentTrack = 0;
    let audioPosition = 0;
  
  
    // Array of Track URLs
    const trackList = [
      "NEFFEX - Catch Me If I Fall (Lyrics).mp3",
      "NEFFEX - Losing My Mind (Lyrics).mp3",
      "Ve Kamleya .mp3",
      "Oh Sahib OST .mp3",
      "Phir Bhi Tumko Chaahunga .mp3",
    //   // Add more tracks as needed
    ];
  
  
    // Array of Album Photos
    const albumPhotos = [
      "download.jpg",
      "artworks-zGPGBasDNQtOVhF8-QbJqxw-t500x500.jpg",
      "download (1).jpg",
      "download (2).jpg",
      "download (3).jpg",
      // Add more corresponding Album Photos
    ];
  
  
    // Function to toggle between Play and Pause
    function togglePlayPause() {
      if (!isPlaying) {
        if (audioPosition === 0) {
          // Start from the beginning of the track
          audio.src = trackList[currentTrack];
        }
        audio.load();
        audio.currentTime = audioPosition; // Set the audio position
        audio
          .play()
          .then(() => {
            playPauseButton.textContent = "❚❚";
            isPlaying = true;
            updateTrackName(currentTrack);
  
            ribbon.style.display = "block"; // Show the ribbon
            ribbon.classList.add("active");
          })
          .catch((error) => {
            console.error("Audio Playback Error: " + error.message);
          });
      } else {
        audioPosition = audio.currentTime; // Store the current audio position
        audio.pause();
        playPauseButton.textContent = "►";
        ribbon.style.display = "none"; // Hide the ribbon
        isPlaying = false;
      }
    }
  
    playPauseButton.addEventListener("click", togglePlayPause);
  
  
    // Function to play the next track
    nextButton.addEventListener("click", function () {
      if (currentTrack < trackList.length - 1) {
        currentTrack++;
      } else {
        currentTrack = 0;
      }
      playTrack(currentTrack);
    });
  
  
    // Function to play the previous track
    prevButton.addEventListener("click", function () {
      if (currentTrack > 0) {
        currentTrack--;
      } else {
        currentTrack = trackList.length - 1;
      }
      playTrack(currentTrack);
    });
  
  
    // Function to play a specific track
    function playTrack(trackIndex) {
      audio.src = trackList[trackIndex];
      audio.load();
      audio.play();
      playPauseButton.textContent = "❚❚";
      isPlaying = true;
      updateTrackName(trackIndex); // Updating the track name
    }
  
  
    // Function to update the track name
    function updateTrackName(trackIndex) {
      const trackName = trackList[trackIndex];
      const cleanedTrackName = trackName.replace("audio/", "");
      trackNameDisplay.textContent = cleanedTrackName;
      albumPhoto.src = albumPhotos[trackIndex];
    }
  
    volumeControl.addEventListener("input", function () {
      audio.volume = volumeControl.value;
    });
  
  
    // Update the audio time displays
    audio.addEventListener("timeupdate", function () {
      const currentTime = formatTime(audio.currentTime);
      const totalDuration = formatTime(audio.duration);
      currentTimeDisplay.textContent = currentTime;
      totalDurationDisplay.textContent = totalDuration;
  
      // Update the track slider as the audio plays
      const position = (audio.currentTime / audio.duration) * 100;
      trackSlider.value = position;
    });
  
  
    // Seek to a position when the user interacts with the track slider
    trackSlider.addEventListener("input", function () {
      const newPosition = (trackSlider.value / 100) * audio.duration;
      audio.currentTime = newPosition;
    });
  
  
    // Handle track ending and play the next track
    audio.addEventListener("ended", function () {
      if (currentTrack < trackList.length - 1) {
        currentTrack++;
      } else {
        currentTrack = 0;
      }
      playTrack(currentTrack);
    });
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }
  });