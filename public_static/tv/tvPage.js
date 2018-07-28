function getMovie(type ,cb) {
  $.get(`/tv/${type}`, (data) => {
    cb(data);
  })
}

$(document).ready(function () {

  window.onload = function () {
    let urlParams = new URLSearchParams(window.location.search);
    let type = urlParams.get('type');
    console.log(type);
    getMovie(type, insertTv);
  };

  function insertTv(data) {
    let tvData = data.results, tv = 1;
    $('#tv').find('.row').each(function () {
      $('img').remove();
      while (tv%17!==0) {
        $('.row').each(function () {
          let path = 'https://image.tmdb.org/t/p/w1280/' + tvData[tv].poster_path;
          $(this).append(`<div class="col-sm-3"><img src="${path}"  alt=""></div>`);
          tv++;
        })
      }
    })
  }
});