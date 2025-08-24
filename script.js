document.addEventListener("DOMContentLoaded", () => {
    const masterPlay = document.getElementById('masterPlay');
    const shuffle = document.querySelector('.shuffle');
    const seek = document.querySelector('#seek');
    const bar2 = document.querySelector('#bar2');
    const dot = document.querySelector('.dot');
    const currentStart = document.querySelector('#current-start');
    const currentEnd = document.querySelector('#current-end');
    const vol = document.querySelector('vol');
    const vol_icon = document.querySelector('vol-icon');
    const vol_bar = document.querySelector('vol-bar');
    const vol_dot = document.querySelector('vol-dot');
    const back = document.querySelector('#prev');
    const next = document.querySelector('#next');

    const songs = [
        "Tum-Se-Hi.mp3",
        "Naach-Meri-Jaan.mp3",
        "Kesariya.mp3",
        "O-Maahi.mp3",
        "Tera-Hoon-Laga-Hoon.mp3",
        "Tum-Kya-Mile.mp3"
    ];

    let index = 0; 

    const music = new Audio(`./Pritam-song-photo/Songs/${songs[index]}`);

    const playlistPlayButtons = Array.from(document.getElementsByClassName('playListPlay'));

    if (masterPlay) {
        masterPlay.addEventListener('click', () => {
            if (music.paused || music.currentTime <= 0) {
                music.play();
                masterPlay.classList.remove('fa-play');
                masterPlay.classList.add('fa-pause');
            } else {
                music.pause();
                masterPlay.classList.remove('fa-pause');
                masterPlay.classList.add('fa-play');
            }
        });
    }

    if (playlistPlayButtons.length > 0) {
        playlistPlayButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                index = parseInt(button.dataset.index);
                music.src = `./Pritam-song-photo/Songs/${songs[index]}`;
                music.play();

                playlistPlayButtons.forEach((btn) => {
                    btn.classList.remove('fa-pause');
                    btn.classList.add('fa-play');
                });

                button.classList.add('fa-pause');
                button.classList.remove('fa-play');

                if (masterPlay) {
                    masterPlay.classList.remove('fa-play');
                    masterPlay.classList.add('fa-pause');
                }
            });
        });
    }

    music.addEventListener('timeupdate', () => {
        if (!isNaN(music.duration)) {
            const currentMin = Math.floor(music.currentTime / 60);
            const currentSec = Math.floor(music.currentTime % 60).toString().padStart(2, '0');
            if (currentStart) currentStart.innerText = `${currentMin}:${currentSec}`;

            const durationMin = Math.floor(music.duration / 60);
            const durationSec = Math.floor(music.duration % 60).toString().padStart(2, '0');
            if (currentEnd) currentEnd.innerText = `${durationMin}:${durationSec}`;

            const progressBar = (music.currentTime / music.duration) * 100;
            if (seek) seek.value = progressBar;
            if (bar2) bar2.style.width = `${progressBar}%`;
            if (dot) dot.style.left = `${progressBar}%`;
        }
    });

    if (seek) {
        seek.addEventListener('input', () => {
            music.currentTime = (seek.value * music.duration) / 100;
        });
    }

    if (vol) {
    vol.addEventListener('input', () => {
        const vol_val = vol.value;
        if (vol_val == 0) {
            vol_icon.className = 'fa-solid fa-volume-off';
        } else if (vol_val > 50) {
            vol_icon.className = 'fa-solid fa-volume-high';
        } else {
            vol_icon.className = 'fa-solid fa-volume-low';
        }

        if (vol_bar) vol_bar.style.width = `${vol_val}%`;
        if (vol_dot) vol_dot.style.left = `${vol_val}%`;

        music.volume = vol_val / 100;
    });
}


  if (back) {
    back.addEventListener('click', () => {
        index = index > 0 ? index - 1 : songs.length - 1;
        music.src = `./Pritam-song-photo/Songs/${songs[index]}`;
        music.play();

        if (masterPlay) {
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }

        playlistPlayButtons.forEach((btn) => {
            btn.classList.remove('fa-pause');
            btn.classList.add('fa-play');
        });
        if (playlistPlayButtons[index]) {
            playlistPlayButtons[index].classList.remove('fa-play');
            playlistPlayButtons[index].classList.add('fa-pause');
        }
    });
}


    if (next) {
    next.addEventListener('click', () => {
        index = index < songs.length - 1 ? index + 1 : 0;
        music.src = `./Pritam-song-photo/Songs/${songs[index]}`;
        music.play();

        if (masterPlay) {
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }

        playlistPlayButtons.forEach((btn) => {
            btn.classList.remove('fa-pause');
            btn.classList.add('fa-play');
        });
        const currentBtn = playlistPlayButtons[index];
        if (currentBtn) {
            currentBtn.classList.remove('fa-play');
            currentBtn.classList.add('fa-pause');
        }
    });
}

    if (shuffle) {
        shuffle.addEventListener('click', () => {
            const mode = shuffle.dataset.mode || "next";

            if (mode === "next") {
                shuffle.className = "fa-solid fa-repeat";
                shuffle.dataset.mode = "repeat";
            } else if (mode === "repeat") {
                shuffle.className = "fa-solid fa-shuffle";
                shuffle.dataset.mode = "random";
            } else {
                shuffle.className = "fa-solid fa-music";
                shuffle.dataset.mode = "next";
            }
        });
    }

    music.addEventListener('ended', () => {
        const mode = shuffle?.dataset.mode || "next";

        if (mode === "repeat") {
            music.currentTime = 0;
            music.play();
        } else if (mode === "random") {
            index = Math.floor(Math.random() * songs.length);
            music.src = `./Frame/Pritam-Frame/Pritam-song-photo/Songs/${songs[index]}`;
            music.play();
        } else {
            if (next) next.click();
        }
    });
});


