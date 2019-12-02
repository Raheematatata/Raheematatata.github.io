const movieTitle = document.querySelector('#movie-title');
const addButton = document.querySelector('#add-movie');
const moviesAdded = document.querySelector('#movies-added');
const errorMsg = document.querySelector('#error-msg')

var movies = [];

const addMovieEnt = (e) => {
    // When "ENTER" is pressed
    if (e.keyCode === 13) {
        addMovie(e);
    }
}

const addMovie = (e) => {
    movies.push(movieTitle.value)
    movieTitle.value = ''
    listMovies()
    saveMovies()
}

const listMovies = () => {
    moviesAdded.innerHTML = ''
    movies.forEach((movie, i) => {
        var container = document.createElement('div')
        var text = document.createElement('div')
        var editButton = document.createElement('button')
        var closeButton = document.createElement('button')

        text.innerHTML = `<span>${movie}</span>`
        editButton.innerHTML = 'Edit'
        editButton.addEventListener('click', () => editMovie(i))
        closeButton.innerHTML = 'Close'
        closeButton.addEventListener('click', () => clearMovie(i))
        container.appendChild(text)
        container.appendChild(editButton)
        container.appendChild(closeButton)
        moviesAdded.appendChild(container)
    })
}

const editMovie = (index) => {
    var newTitle = prompt('Enter the new name below')
    if (newTitle.length > 0) {
        movies[index] = newTitle
        listMovies()
        saveMovies()
    }
}

const clearMovie = (index) => {
    movies.splice(index, 1)
    listMovies()
    saveMovies()
}

const saveMovies = () => {
    localStorage.setItem('TODO', JSON.stringify(movies))
}

window.onload = () => {
    try {
        movies = JSON.parse(localStorage.getItem('TODO')) || []
        listMovies()
    } catch (e) {
        movies = []
    }
}
addButton.addEventListener('click', addMovie)
movieTitle.addEventListener('keyup', addMovieEnt)