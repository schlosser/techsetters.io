document.addEventListener('DOMContentLoaded', function() {
  var videoButtons = document.getElementsByClassName('play-video');
  var modal = document.getElementById('modal');
  var modalOverlay = document.getElementById('modal-overlay');
  var closeModalButton = document.getElementById('close-modal');
  var player = null;

  var playerOrigin = '*';

  function closeModal() {
    // Pause video
    if (player.getPlayerState === YT.PlayerState.PLAYING) {
      player.stopVideo();
    }
    player = null;

    // Fade out modal
    modal.className = modal.className.replace(' visible', '');

    // Close modal
    setTimeout(function() {
      modal.className = modal.className.replace(' active', '');

      // Reset the video
      var video = document.querySelector('.video-wrapper iframe');
      var parent = video.parentElement;
      parent.removeChild(video);

      var playerPlaceholder = document.createElement('div');
      playerPlaceholder.id = 'player';
      parent.appendChild(playerPlaceholder);
    }, 200);
  }

  function openModal(videoId) {
    console.log('openModal');
    // Show modal
    modal.className += ' active';
    modal.className += ' visible';

    console.log(videoId);

    // Play video
    player = new YT.Player('player', {
      height: "100%",
      width: "100%",
      videoId: videoId,
      events: {
        'onReady': onPlayerReady
      }
    });
  }

  function onPlayerReady(event) {
    var video = document.querySelector('.video-wrapper iframe');
    event.target.playVideo();
  }

  function onClickPlayVideo(e) {
    e.preventDefault();
    openModal(this.dataset.videoId);
  }

  // Add Event Listeners
  for (var i = 0; i < videoButtons.length; i++) {
    videoButtons[i].addEventListener('click', onClickPlayVideo);
  }

  closeModalButton.addEventListener('click', closeModal);
  console.log(modalOverlay);
  modalOverlay.addEventListener('click', closeModal);
  document.documentElement.addEventListener('keyup', function(e) {
    if (!player) {
      return;  // Only do anything if the player is active
    }

    if (e.keyCode == 27) { // escape key
      closeModal();
    }
    if (e.keyCode == 32) { // space bar
      var playerState = player.getPlayerState();
      if (playerState == YT.PlayerState.PLAYING ||
            playerState == YT.PlayerState.BUFFERING) {
        player.pauseVideo();
      } else if (playerState == YT.PlayerState.PAUSED) {
        player.playVideo();
      }
    }
  });
});
