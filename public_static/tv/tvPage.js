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
        $('.col-sm-3').each(function () {
          let path = 'https://image.tmdb.org/t/p/w500/' + tvData[tv].poster_path;
          let destination = '/info/tv/tvInfo.html?id='+tvData[tv].id;
          $(this).find('a').attr('href',`${destination}`);
          $(this).find('img').attr('src',`${path}`);
          tv++;
        })
    })
  }
});