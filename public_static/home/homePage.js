function getTVMovie(type,cb) {
  $.get('/'+type, (data) => {
    cb(data);
  })
}

$(document).ready(function () {

  function insertMovies(data) {
    let movieData = data.results, movie = 0;
    $('#movies').find('.homeDispL,.homeDispS').each(function () {
        let path = 'https://image.tmdb.org/t/p/w1280/' + movieData[movie].backdrop_path;
        let name = movieData[movie].original_title;
        let overview = movieData[movie].overview;
        overview = overview.substring(0, 150)+'...';
        $(this).append(`<img src="${path}"  alt="">`);
        $(this).append(`<h3 style="position: absolute; top: 0">${name}</h3>`);
        $(this).append(`<p class="info" style="">${overview}</p>`);
        movie++;
    })
  }

  function insertTv(data) {

    let tvData = data.results, tv = 0;
    $('#tv').find('.homeDispL,.homeDispS').each(function () {
      $(this).find('[class*=\'col-\']').each(function () {
        let path = 'https://image.tmdb.org/t/p/w1280/' + tvData[tv].backdrop_path;
        let name = tvData[tv].original_name;
        let overview = tvData[tv].overview;
        overview = overview.substring(0, 150)+'...';
        $(this).append(`<img src="${path}" alt="">`);
        $(this).append(`<h3 style="position: absolute; top: 0;">${name}</h3>`);
        if($(this).is('.col-sm-4')){
          $(this).append(`<p class="info" style=" ">${overview}</p>`);
        }
        tv++;
      });
    })
  }

  getTVMovie('movies',insertMovies);
  getTVMovie('tv',insertTv);

});