let url = new URLSearchParams(window.location.search);

let searcht = url.get("search");

if (!searcht) {
  searcht="naruto";
}

console.log(searcht);

let searchtext=document.getElementsByClassName("searchtext")[0];
searchtext.innerHTML+=` "${searcht}"`;

let animeList;

async function searchAnime(query) {
  let response = await fetch(
    `https://api.jikan.moe/v4/anime?q=${query}`
  );

  let json = await response.json();

  animeList = json.data;
  
  let anime, title, url, status, score, n;


for (let i = 0; i < 10; i++) {
  anime = animeList[i];
  title = anime.title_english;
  url = anime.images.jpg.image_url;
  status = anime.status;
  score = anime.score;
  n = anime.mal_id;
  createCard(n, title, url, status, score, "animeList");
}
}

searchAnime(searcht);