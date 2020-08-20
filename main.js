document.getElementById('search_btn').addEventListener('click', function () {
    const searchVal = document.getElementById('search').value;
    const url = `https://api.lyrics.ovh/suggest/${searchVal}`
    fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            displayData(jsonData);
            lyricsShow(jsonData);
        });
});

function displayData(json) {
    const dataArray = json.data;
    for (let i = 0; i < dataArray.length; i++) {
        const element = dataArray[i];
        console.log(element);
        if (i > 9) {
            break;
        };
        const songTitle = element.title;
        const ArtistName = element.artist.name;
        const cover = element.album.cover;
        document.getElementById('song_container').innerHTML += `<div class="single-result row align-items-center my-3 p-3">
        
        <div class="col-md-3 text-md-right text-center">
        <img class="img-fluid" src="${cover}"/>
        </div>
        <div class="col-md-6">
        <h3 class="lyrics-name">${songTitle}</h3>
        <p class="author lead">Album by <span>${ArtistName}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
        <button onclick="lyricsShow()" id="lyrics_btn${i}" class="btn btn-success">Get Lyrics</button>
        </div>`;
    };
};

function lyricsShow(json) {
    const dataArray = json.data;
    for (let i = 0; i < dataArray.length; i++) {
        const element = dataArray[i];
        if (i > 9) {
            break;
        };
        const songTitle = element.title;
        const ArtistName = element.artist.name;
        const currentBtn = document.getElementById(`lyrics_btn${i}`);
        currentBtn.addEventListener('click', function () {
            const lyricsUrl = `https://api.lyrics.ovh/v1/'${ArtistName}'/'${songTitle}'`
            fetch(lyricsUrl)
                .then(response => response.json())
                .then(data => {
                    const lyricsOutput = data.lyrics;
                    if (lyricsOutput == undefined) {
                        document.getElementById('single_lyrics').innerHTML = `<h2 class="text-success mb-4">${songTitle}</h2><h3 class="lyric text-white">Sorry, The Song Lyrics Is Not Found.</h3>`;
                    } else {
                        document.getElementById('single_lyrics').innerHTML = `<h2 class="text-success mb-4">${songTitle}</h2><pre class="lyric text-white">${lyricsOutput}</pre>`;
                    }
                })
        });
    };
};