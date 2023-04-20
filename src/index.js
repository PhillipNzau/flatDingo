// Your code here
"use strict"; 

const url ='http://localhost:3000/films';

let movies;
const navList = document.getElementById('films');
const moviePoster = document.getElementById('poster');
const movieTitle = document.getElementById('title');
const movieRunTime = document.getElementById('runtime');
const movieInfo = document.getElementById('film-info');
const movieShowtime = document.getElementById('showtime');
const movieTicketNum = document.getElementById('ticket-num');

let selectedMovie;
const buyBtn = document.getElementById('buy-ticket');

//// Fetch all films
const getAllFilms = () => fetch(url).then(res=> res.json()).then(films => {
    movies = films;
    showMovieList(movies)
    showMovieDetails(movies[0])
    console.log(movies);
});

//// Delete movie
const handleDeleteMovie = (id) => {
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
        }
    }).then(res => res.json()).then(data = console.log(data))
}
////// 1. Bonus and 2. Bonus

//// Show movie side nav
const showMovieList = (movies) => {
    navList.innerHTML  =''

    for(let movie of movies) {
        const deleteBtn = document.createElement('button');
        const delBtnClass = deleteBtn.classList;
        delBtnClass.add('navList');
        deleteBtn.id = movie.id;
        deleteBtn.textContent = 'X';


        const movieItemLi = document.createElement('li');
        const list = movieItemLi.classList;
        list.add('film','item')
        movieItemLi.innerText = movie.title;
        
        navList.appendChild(movieItemLi);
        movieItemLi.appendChild(deleteBtn);


         // Turn text to sold out if ticket less than 1
        if(movie.tickets_sold === 0) {
        list.add('sold-out') 
        }
    
    }
    
}

/// Show movie poster, title, ticket number
const showMovieDetails = (movie) => {
    selectedMovie = movie;

    moviePoster.src = movie.poster;
    movieTitle.innerText = movie.title;
    movieRunTime.innerText = movie.runtime;
    movieInfo.innerText = movie.description;
    movieShowtime.innerText = movie.showtime;
    movieTicketNum.innerText = movie.tickets_sold;
    buyBtn.innerText = 'Buy Ticket'
    // Turn text to sold out if ticket less than 1
    if(selectedMovie.tickets_sold === 0) {
        buyBtn.textContent = 'Sold Out';
    }
}


////// 1. Extra Bonus
/// Decrease number of ticket
const buyTicket = () => {
    let ticketNum = selectedMovie.tickets_sold;
    
    if(selectedMovie && ticketNum > 0)  {
        ticketNum--;
        
        const data = {
            tickets_sold: ticketNum
        }
        fetch(`${url}/${selectedMovie.id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        }).then(res => res.json()).then(data = console.log(data))
    }
    
}
buyBtn.addEventListener('click', buyTicket)
//

//// Show selected movie
// Handle Nav clicked
const handleNavClicked = (event) => {
    if(event.target && event.target.matches('li')){
        let content = event.target.textContent.slice(0,-1);
        selectedMovie = movies.find(film => film.title === content);
        showMovieDetails(selectedMovie)
        
    }
}

//// 2. Extra Bonus
//  Handle The deletion of a movie
const handleDeleteClicked = (event) => {
    if(event.target && event.target.matches('button')){
        const id = event.target.id;
       handleDeleteMovie(id)
        
    }
}
/// Switch the view to selected movie
navList.addEventListener('click', handleNavClicked)

/// Delete selected movie
navList.addEventListener('click', handleDeleteClicked )



getAllFilms();