function getTheThing(type, id, cb) {
  $.get(`/info/${type}?id=${id}`, (data) => {
    cb(data);
  })
}

$(document).ready(function () {

  let movieInfo , id, urlParams ,images;

  window.onload = function () {
    urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');
    getTheThing('movie' ,id , insertMovie);
  };

  function insertPoster() {
    let path = 'https://image.tmdb.org/t/p/w1280/' + movieInfo.poster_path;
    $('.movie').css('background-image', `url(https://image.tmdb.org/t/p/w1280/${movieInfo.backdrop_path})`);
    $('.poster').append(`<img src="${path}"  alt="">`)
  }

  function insertData() {
    $('.title').text(`${movieInfo.original_title}`);
    $('.release-date').text(`(${movieInfo.release_date.substr(0,4)})`);
    $('.information p').text(`${movieInfo.overview}`);
  }

  function insertCredits(data) {
    let ctr = 0;
    while(ctr!=5){
      console.log(data.crew[ctr].name);
      $('.featured-crew').append(`<li><p style="font-weight: bold">${data.crew[ctr].name}</p><p style="font-size: .9em">${data.crew[ctr].job}</p></li>`);
      ctr++;
    }

    let gernes = movieInfo.genres.length < 5 ? movieInfo.genres.length-1 : 5;

    while(gernes){
      $('.genres').append(`<button type="button" class="btn btn-outline-success">${movieInfo.genres[gernes].name}</button>`);
      gernes--;
    }

    ctr = 0;

    while(ctr != 8){
      let profession = data.cast[ctr].gender == 2 ? 'Actor' : 'Actress';
      let imgPath = 'https://image.tmdb.org/t/p/w1280/'+data.cast[ctr].profile_path;
      $('.cast-and-crew').append(`<div class="col-sm-3" style="position:relative"><img src="${imgPath}" alt="">
                                    <div class="cast-info"> 
                                      <div style="margin-bottom: 50px;margin-top: 10px">${profession}</div>
                                      <div style="margin-bottom: 50px">${data.cast[ctr].name}</div>
                                      <div>${data.cast[ctr].character}</div>
                                      <div></div>
                                    </div>
                                  </div>`);
      ctr++;
    }
    getTheThing('movie_image' , id, insertImages);
    getTheThing('movie_video' , id, insertVideo);
  }

  function insertPosterAndBackground (data, className) {
    data.forEach((element) => {
      $(className).append(`<div><img src="https://image.tmdb.org/t/p/w1280/${element.file_path}" alt=""></div>`)
    })
  }

  function insertImages(data) {
    images = data;
    insertPosterAndBackground(data.backdrops, '.backdrop-image');
    insertPosterAndBackground(data.posters, '.poster-image');

  }

  function insertMovie(data) {
    movieInfo = data;
    console.log(data);
    insertPoster();
    insertData();
    getTheThing('movie_credits' , id, insertCredits);
  }

  function insertVideo(data) {
    let videos = data.results;
    videos.forEach((element) => {
      $('.video').append(`<iframe src="https://www.youtube.com/embed/${element.key}" frameborder="0"></iframe>`)
    });
    $('.video').hide();
    getTheThing('movie_similar' , id, insertSimilar);
  }

  function hideAndDecorate(decorationClass, displayClass) {
    $(displayClass).siblings().hide();
    $(displayClass).show();
    $(decorationClass).sibling().css('text-decoration', 'none');
    $(decorationClass).css('text-decoration','line-through');
    $(decorationClass).css('text-decoration-color','#00FC87');
  }

  function insertSimilar(data) {
    let similar = data.results;
    similar.forEach(function (element) {
      $('.recommend').append(`<div><img src="https://image.tmdb.org/t/p/w1280/${element.backdrop_path}" alt="">
                              <h3>${element.title} <span>${element.vote_average}<i class="far fa-star"></i></span></h3></div>`)
    });
    hideAndDecorate('.recommendation', '.recommend');
  }

  $('.backdrop').click(function () {
    hideAndDecorate('.backdrop', '.backdrop-image');
  });

  $('.posters').click(function () {
    hideAndDecorate('.posters', '.poster-image');
  });

  $('.youtube-video').click(function () {
    hideAndDecorate('.youtube-video', '.video');
  });

  $('.recommendation').click(function () {
    hideAndDecorate('.recommendation', '.recommend')
  });

});