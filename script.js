console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Love yourself",filepath:"songs/1.mp3", coverPath:"https://i.ytimg.com/vi/EEJEJ3uFpx8/maxresdefault.jpg"},
    {songName: "Yummy",filepath:"songs/2.mp3", coverPath:"https://i.ytimg.com/vi/ANkMZ8Pp1yw/maxresdefault.jpg"},
    {songName: "Bad Romance",filepath:"songs/3.mp3", coverPath:"https://i1.sndcdn.com/artworks-000125120115-kzmr45-t500x500.jpg"},
    {songName: "Bloody Marry",filepath:"songs/4.mp3", coverPath:"https://i.ytimg.com/vi/YDRd0oqnB24/maxresdefault.jpg"},
    {songName: "Until I Found You",filepath:"songs/5.mp3", coverPath:"https://i.ytimg.com/vi/cvGdWoQPlRM/maxresdefault.jpg"},
    {songName: "Let Me Down Slowly",filepath:"songs/6.mp3", coverPath:"https://www.nuovecanzoni.com/wp-content/uploads/2019/02/Let-Me-Down-Slowly-cover-Alec-Benjamin.jpg"},
    {songName: "Blinding Lights",filepath:"songs/7.mp3", coverPath:"https://i1.sndcdn.com/artworks-rkVbCjU58z8DvOR9-3kgOsA-t500x500.jpg"},
    {songName: "The Weeknd Starboy",filepath:"songs/8.mp3", coverPath:"https://remizozo.com/wp-content/uploads/2021/06/N0554-768x768.jpg"},
    {songName: "Dusk Till Dawn",filepath:"songs/9.mp3", coverPath:"https://ts2.tarafdari.com/contents/user453783/content-sound/15ca797e31e129f1c3f6faab22b00e05.jpg"}
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=8){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})