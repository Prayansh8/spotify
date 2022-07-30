console.log("Wellcome to spotify");

let songindex = 0;
let audioelement = new Audio('songs/10.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('mypro');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    }
    else {
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
    }
});

audioelement.addEventListener("timeupdate", () => {
    console.log('timeupdate');
    var preogress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    myprogressbar.value = preogress;
})

myprogressbar.addEventListener('change', () => {
    audioelement.currentTime = myprogressbar.value * audioelement.duration / 100;
})

let songlist = document.getElementById('songlist');
function processSong(coverPath, songName, filePath, id) {

    var song = document.createElement('div');
    song.className = 'playsong';

    var img = document.createElement('img');
    img.className = 'songimg';
    img.src = coverPath;
    song.appendChild(img);

    var songname = document.createElement('h3');
    songname.className = 'songname';
    songname.innerHTML = songName;
    song.appendChild(songname);

    var filePath = document.createElement('h3');
    filePath.className = 'songfile';
    filePath.src = filePath;
    song.appendChild(filePath);

    var songicon = document.createElement('i');
    songicon.className = 'fa-solid fa-circle-play playSongList';
    songicon.id = id;
    songicon.addEventListener('click', (e) => {
        songindex = parseInt(e.target.id);
        audioelement.src = `songs/${songindex}.mp3`;
        audioelement.currentTime = 0;

        if (audioelement.paused || audioelement.currentTime <= 0) {
            audioelement.play();
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
        }
        else {
            audioelement.pause();
            masterplay.classList.remove('fa-circle-pause');
            masterplay.classList.add('fa-circle-play');
        }

    });
    song.appendChild(songicon);
    songlist.appendChild(song);
}

fetch('./songs.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            processSong(data[i].coverPath, data[i].songName, data[i].filePath, data[i].id);
        }
    })
    .catch(function (err) {
        console.log(err)
    });

    next.addEventListener('click', () => {
        songindex ++
        audioelement.src = `songs/${songindex}.mp3`;
        audioelement.currentTime = 0;
        audioelement.play()
    });

    
    prev.addEventListener('click', () => {
        songindex --
       
        audioelement.src = `songs/${songindex}.mp3`;
        audioelement.currentTime = 0;
        audioelement.play()
    });


    // function songCategires(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '64114ea943mshea47639eb867b3ep1442aajsn1934e2aac44a',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    fetch('https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
//    } 
//    songCategires()
