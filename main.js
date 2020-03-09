const genres = [{
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

const prepGenres = () => {
    let snippet = '';

    for (let genre in genres) {
        snippet += `
        <option value="${genre}" data-genre-id=${genres[genre].id}>${genres[genre].name}</option>
        `
    }
    document.getElementById('genreSelect').innerHTML = snippet;
};

const getMoviesListener = () => {
    document.getElementById('getMovies').addEventListener('click', (e) => {
        getData()
    })
}

const getData = async () => {
    const api_key = 'e062aff6a00a59b65b3c438db81ec80a';
    genreTxt = document.querySelector('#genre .selected span').textContent.trim();
    genreId = null;
    for (let g in genres) {
        if (genres[g].name === genreTxt) {
            genreId = genres[g].id;
        }
    }
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=vote_average.desc&page=1&vote_count.gte=20&with_genres=${genreId}`);
    const data = await response.json();
    generateSlides(data.results);
};

const generateSlides = (movies) => {
    let snippet = '';
    for (movie in movies) {
        if (!movies[movie].poster_path) {
            continue;
        }
        snippet += `<div class="swiper-slide">
            <div style="text-align:center">
                <img src="http://image.tmdb.org/t/p/w300${movies[movie].poster_path}"/>
                <h3>${movies[movie].title}</h3>
                <p>Śr. głosów: ${movies[movie].vote_average}</p>
                <p>Głosów: ${movies[movie].vote_count}</p>
            </div>
        </div>`
    }

    document.querySelector('.swiper-wrapper').innerHTML = snippet;

    let mySwiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      })
    
}

document.addEventListener('DOMContentLoaded', function () {
    prepGenres();
    getMoviesListener();
    M.AutoInit();
});