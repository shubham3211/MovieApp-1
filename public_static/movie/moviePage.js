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
      $('img').remove();
      while (movie%17!==0) {
        $('.row').each(function () {
          let path = 'https://image.tmdb.org/t/p/w1280/' + movieData[movie].poster_path;
          $(this).append(`<div class="col-sm-3"><img src="${path}"  alt=""></div>`);
          movie++;
        })
      }
    })
  }
});