const API_KEY = "api_key=99b95d6eea6645ae1c67fec1faeed802";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const wrapper = document.getElementById("movies_wrapper");
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const prev = document.querySelector(".prev"),
  current = document.querySelector(".current_page"),
  next = document.querySelector(".next");
  const main = document.querySelector('#main');
  const form = document.querySelector("#form");
  const search = document.querySelector("#search");

let currentPage = 1,
  totalPages = 1,
  nextPage = 1,
  prevPage = 1;

  current.innerText = 1

next.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage = currentPage + nextPage;
    current.innerText = currentPage;
  }
  updateData(currentPage);
});

prev.addEventListener("click", () =>{
if (currentPage < 1) {
  return

}else if (currentPage > 1) {
    currentPage = currentPage - prevPage;

  }
  updateData(currentPage);
  current.innerText = currentPage;
})

const updateData = (pageNumber) => {
  const url = `${API_URL}&page=${pageNumber}`;
  getMovies(url);
};

current.innerText = currentPage;

getMovies(API_URL);

async function getMovies(url) {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
      totalPages = data.total_pages;
    });
}

function showMovies(data) {
  wrapper.innerHTML = "";

  data.map((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieE1 = document.createElement("div");
    movieE1.classList.add("movie");
    movieE1.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">


            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getcolor(vote_average)}">${vote_average}</span>
            </div>

            <div class="over-view">
                <h3>Overview</h3>
                 ${overview}
            </div>
            `;

    wrapper.appendChild(movieE1);
  });
}

function getcolor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener('submit', (e) => {
   e.preventDefault();
   

   const searchTerm = search.value;

   if(searchTerm) {
     getMovies(searchURL+'&query='+searchTerm)
   }else{
     getMovies(API_URL);
   }
})

