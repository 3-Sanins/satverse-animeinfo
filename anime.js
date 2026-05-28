let url = new URLSearchParams(window.location.search);

let id = url.get("id");

if (!id) {
  id = 20
}

console.log(id);

let anime;

async function getAnime(id) {

  let response = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/full`
  );

  let json = await response.json();

  anime = json.data;


  console.log(anime);

  let url, title, status, score, titles, trailer, description, episodes, duration, background, genre;
  title = anime.title_english;
  url = anime.images.jpg.image_url;
  status = anime.status;
  score = anime.score;
  titles = anime.titles;
  trailer = anime.trailer.embed_url;
  description = anime.synopsis;
  episodes = anime.episodes;
  duration = anime.duration;
  background = anime.background;
  year = anime.year;
  genre = anime.genres.map(item => item.name);

  console.log(genre);
  let img = document.getElementsByClassName("img")[0];
  img.src = `${url}`;
  let tit = document.getElementsByClassName("title")[0];
  tit.innerHTML = `${title}`;
  let data = document.getElementsByClassName("status")[0];
  data.innerHTML = `${status}`;
  data = document.getElementsByClassName("year")[0];
  data.innerHTML = `${year}`;
  data = document.getElementsByClassName("epi")[0];
  data.innerHTML = `${episodes} (Episodes)`;
  data = document.getElementsByClassName("duration")[0];
  // if (!("MIN" in duration)) duration=duration+" MIN PER EPISODE"
  data.innerHTML = `${duration}`;
  data = document.getElementsByClassName("score")[0];
  data.innerHTML = `${score} / 10`;
  data = document.getElementsByClassName("description")[0];
  data.innerHTML = `${description}`;
  data = document.getElementsByClassName("tags")[0];
  for (let i = 0; i < genre.length; i++) {
    data.innerHTML += `<p class="tag">${genre[i]}</p>`
  }
  data = document.getElementsByClassName("iframe")[0];
  data.src=`${trailer}`;
  console.log(trailer);
  if (!trailer){
    document.getElementsByClassName("video")[0].remove()
  }
  
  
  response=await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
  json= await response.json();
  let recommended=json.data;
  console.log(recommended);
  if (!recommended || recommended.length==0) {
    document.getElementsByClassName("cardholder")[0].remove()
  }
  
  for (let i = 0; i < Math.min(recommended.length,8); i++) {
  let animes = recommended[i];
  title = animes.entry.title;
  url = animes.entry.images.jpg.image_url;
  n=animes.entry.mal_id;
  createCard(n, title, url, status, score, "recommended");
  }


}

getAnime(id);


function createCard(n, title, url, status, score, category) {
  let box = document.getElementsByClassName(`${category}`)[0];
  box.innerHTML += `<div class="card card${n}" onclick="direct(${n})">
    <img src="${url}" alt="Img">
    <h3>${title}</h3>
  </div>`;
}

function direct(n) {
  window.location.href = `/anime.html?id=${n}`;
}