function getTheThing(type, id) {
  return new Promise((resolve, reject) => {
    $.get(`/info/${type}?id=${id}`, data => resolve(data));
    })
}

function isLoggedin(){
  return new Promise((resolve, reject) => {
    $.get('/profile', data => resolve(data));
  })
}

$(document).ready(function () {

  let movieInfo, id, urlParams, images, login = false,rating;
  urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get('id');
  $('.enterRating').hide();

  function insertPoster() {
    $('.movie').css('background-image', `url(https://image.tmdb.org/t/p/w500/${movieInfo.backdrop_path})`);
    $('.poster').append(`<img src="https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}"  alt="">`)
  }

  function insertData() {
    $('.title').text(`${movieInfo.original_title}`);
    $('.release-date').text(`(${movieInfo.release_date.substr(0, 4)})`);
    $('.information .overview').text(`${movieInfo.overview}`);
  }

  function insertCredits(data) {
    let ctr = data.crew.length < 5 ? data.crew.length-1 : 5;
    while (ctr>=0) {
      $('.featured-crew').append(`<li><p style="font-weight: bold">${data.crew[ctr].name}</p><p style="font-size: .9em">${data.crew[ctr].job}</p></li>`);
      ctr--;
    }

    let gernes = movieInfo.genres.length < 5   ? movieInfo.genres.length-1  : 5;

    while (gernes) {
      $('.genres').append(`<button type="button" class="btn btn-outline-success">${movieInfo.genres[gernes].name}</button>`);
      gernes--;
    }

    ctr = data.cast.length < 7 ? data.cast.length-1 : 7;

    while (ctr >= 0) {
      let profession = data.cast[ctr].gender == 2 ? 'Actor' : 'Actress';
      let imgPath = 'https://image.tmdb.org/t/p/w500/' + data.cast[ctr].profile_path;
      $('.cast-and-crew').append(`<div class="col-sm-3" style="position:relative"><img src="${imgPath}" alt="">
                                    <div class="cast-info"> 
                                      <div style="margin-bottom: 50px;margin-top: 10px">${profession}</div>
                                      <div style="margin-bottom: 50px">${data.cast[ctr].name}</div>
                                      <div>${data.cast[ctr].character}</div>
                                      <div></div>
                                    </div>
                                  </div>`);
      ctr--;
    }
  }

  function insertPosterAndBackground(data, className) {
    data.forEach((element) => {
      $(className).append(`<div><img src="https://image.tmdb.org/t/p/w500/${element.file_path}" alt=""></div>`)
    })
  }

  function setLogin(loginInfo){
    console.log(loginInfo);
    login = loginInfo;
    if(login){
      let ctr = 1;
      loginInfo.watchList.forEach((element) => {
        $('.watchlist .dropdown-menu').append(`<a class="dropdown-item" href="#">${element}</a>`);
      })
      loginInfo.movie.forEach((element) => {
        if(element.movieId == movieInfo.id && ctr){
          $('.your-rating').append(`<h4>Your Rating: ${element.rating}</h4>`);
          ctr=0;
        }
      })
    }
  }

  function insertImages(data) {
    images = data;
    insertPosterAndBackground(data.backdrops, '.backdrop-image');
    insertPosterAndBackground(data.posters, '.poster-image');
  }

  function insertMovie(data) {
    movieInfo = data;
    insertPoster();
    insertData();
  }

  function insertVideo(data) {
    let videos = data.results;
    videos.forEach((element) => {
      $('.video').append(`<iframe src="https://www.youtube.com/embed/${element.key}" frameborder="0"></iframe>`)
    });
    $('.video').hide();
  }

  function hideAndDecorate(decorationClass, displayClass) {
    $(displayClass).siblings().hide();
    $(displayClass).show();
    $(decorationClass).siblings().css('text-decoration', 'none');
    $(decorationClass).css('text-decoration', 'line-through');
    $(decorationClass).css('text-decoration-color', '#00FC87');
  }

  function insertSimilar(data) {
    let similar = data.results;
    let destination = ``;
    similar.forEach(function (element) {
      $('.recommend').append(`<div><a href=/info/movie/movieInfo.html?id=${element.id}><img src="https://image.tmdb.org/t/p/w500/${element.backdrop_path}" alt=""></a>
                              <h3>${element.title} <span>${element.vote_average}<i class="far fa-star"></i></span></h3></div>`)
    });
    hideAndDecorate('.recommendation', '.recommend');
  }

  $('.rating').hover(function(e) {
    $('.star').css('color','white');
  })

  let color = 0;

  $('.watchlist').click(function(e) {
    if(login){
      let colorType = color%2 == 0 ? 'black' : 'white';
      $('.fa-bookmark').css('color', `${colorType}`);
      console.log(movieInfo);
      $.post('/updateUser/addMovie', {id: login._id, name: movieInfo.original_title});
      color++;
    }
  })

  $('.star').hover(function(e) {
    if(login){
      $(this).prevUntil().css("color", "orange");
      $(this).css("color", "orange");
      $(this).nextUntil().css("color", "white");
      rating = $(this).attr('data-rate');
    }
  }, function(e) {
    if(login){
      $.post('/updateUser', {rating: rating, id: login._id, movieId: movieInfo.id});
    }
  })

  $('.rating').click(function() {
    $('.enterRating').toggle();
  })

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

  Promise.all([
    getTheThing('movie' ,id ),
    getTheThing('movie_image' , id),
    getTheThing('movie_video' , id),
    getTheThing('movie_credits' , id),
    getTheThing('movie_similar' , id),
    isLoggedin()
  ]).then((data) => {
    insertMovie(data[0]);
    insertImages(data[1]);
    insertVideo(data[2]);
    insertCredits(data[3]);
    insertSimilar(data[4]);
    setLogin(data[5]);
  }).catch((err) => console.log(err))

  // getTheThing('movie', id).then(data=>{
  //   insertMovie(data);
  //   return getTheThing('movie_credits' , id)
  // }).then(data => {
  //   insertCredits(data);
  //   return getTheThing('movie_video' , id)
  // }).then(data => {
  //   insertVideo(data);
  //   return getTheThing('movie_image' , id)
  // }).then(data => {
  //   insertImages(data);
  //   return getTheThing('movie_similar' , id)
  // }) .then(data => insertSimilar(data));

});