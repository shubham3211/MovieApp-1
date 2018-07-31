function getMovie(type ,cb) {
  $.get(`/movie/${type}`, (data) => {
    cb(data);
  })
}

$(document).ready(function () {

  window.onload = function () {
    let urlParams = new URLSearchParams(window.location.search);
    let type = urlParams.get('type');
    getMovie(type, insertMovie);
  };

  function insertMovie(data) {
    let movieData = data.results, movie = 1;
    $('#movies').find('.row').each(function () {
        $('.col-sm-3').each(function () {
          let path = 'https://image.tmdb.org/t/p/w500/' + movieData[movie].poster_path;
          let destination = '/info/movie/movieInfo.html?id='+movieData[movie].id;
          $(this).find('a').attr('href',`${destination}`);
          $(this).find('img').attr('src',`${path}`);
          movie++;
        })
    })
  }
});