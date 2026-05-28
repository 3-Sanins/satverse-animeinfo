
let topAnime,fantasy,comedy,recommended,action,adventure

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getAnime(url) {
  const response = await fetch(url);

  const json = await response.json();

  return json.data;
}

async function getHomePageAnime() {

  // First 3 requests
  const [
        topAnime,
        fantasy,
        comedy
    ] = await Promise.all([
        getAnime("https://api.jikan.moe/v4/top/anime?limit=10"),

        getAnime("https://api.jikan.moe/v4/anime?genres=10&limit=10&order_by=score"),

        getAnime("https://api.jikan.moe/v4/anime?genres=4&limit=10&order_by=score")
    ]);

  // Wait 1 second
  await delay(3000);

  // Next 3 requests
  const [
        action,
        adventure,
        recommended
    ] = await Promise.all([
        getAnime("https://api.jikan.moe/v4/anime?genres=1&limit=10&order_by=score"),

        getAnime("https://api.jikan.moe/v4/anime?genres=2&limit=10&order_by=score"),

        getAnime("https://api.jikan.moe/v4/recommendations/anime?limit=10")
    ]);
  
console.log(topAnime,fantasy,comedy,action,adventure,recommended);
//   return {
//     topAnime,
//     fantasy,
//     comedy,
//     action,
//     adventure,
//     recommended
//   };
// }
// async function main() {
//   let [topAnimeList,fantasy,comedy,action,adventure,recommended] = await getHomePageAnime();
  let anime, title, url, status, score,n;

  
  for (let i = 0; i < 10; i++) {
  anime = topAnime[i];
  title = anime.title_english;
  url = anime.images.jpg.image_url;
  status = anime.status;
  score = anime.score;
  n=anime.mal_id;
  createCard(n, title, url, status, score, "topAnime");
}
  for (let i = 0; i < 8; i++) {
  anime = fantasy[i];
  title = anime.title_english;
  url = anime.images.jpg.image_url;
  status = anime.status;
  score = anime.score;
  n=anime.mal_id;
  createCard(n, title, url, status, score, "fantasy");
}
for (let i = 0; i < 8; i++) {
  anime = comedy[i];
  title = anime.title_english;
  url = anime.images.jpg.image_url;
  status = anime.status;
  score = anime.score;
  n=anime.mal_id;
  createCard(n, title, url, status, score, "comedy");
}
for (let i = 0; i < 8; i++) {
  anime = action[i];
  title = anime.title_english;
  url = anime.images.jpg.image_url;
  status = anime.status;
  score = anime.score;
  n=anime.mal_id;
  createCard(n, title, url, status, score, "action");
}
for (let i = 0; i < 8; i++) {
  anime = adventure[i];
  title = anime.title_english;
  url = anime.images.jpg.image_url;
  status = anime.status;
  score = anime.score;
  n=anime.mal_id;
  createCard(n, title, url, status, score, "adventure");
}
  // localStorage.setItem(
  //   "topAnime",
  //   JSON.stringify(topAnimeList)
  // );
}

// main();
// getHomePageAnime();

const topAnimeList = JSON.parse(
  localStorage.getItem("topAnime")
);

console.log(topAnimeList);


//title,title_english  or titles(array)->objects->title,sypnosis,title_synonyms(array),trailer->embed_url(yt), background,episodes,duration,genres(array)->object->name(adventure etc), images->jpg/webp(object)->image_url,status,score(out of 10),scored_by(898989 e.g.),


//Card : title_english,image,status,score

function createCard(n, title, url, status, score, category) {
  let box = document.getElementsByClassName(`${category}`)[0];
  box.innerHTML += `<div class="card card${n}" onclick="direct(${n})">
    <img src="${url}" alt="Img">
    <h3>${title}</h3>
  </div>`;
}

function direct(n){
  window.location.href=`anime.html?id=${n}`;
}


// window.location.href=`/anime.html?id=21`;

// for (let i = 0; i < 25; i++) {
//   anime = topAnimeList[i];
//   title = anime.title_english;
//   url = anime.images.jpg.image_url;
//   status = anime.status;
//   score = anime.score;
//   createCard(2, title, url, status, score,"topAnime");
// }

let search = document.getElementsByTagName("input")[0];
let typed;

search.addEventListener("keydown", function (event) {
  if (event.key==="Enter"){
    typed=search.value.trim();
    if (typed){
      console.log(typed);
      window.location.href= `/info.html?search=${typed}`;
    }
  }
})
