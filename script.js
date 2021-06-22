const search_results = document.getElementById('search-results')
const searchButton = document.getElementById('searchButton')
const modalTitle = document.getElementById('modalTitle')
const id = document.getElementById('id')
const title = document.getElementById('title')
const type = document.getElementById('type')
const episodes = document.getElementById('episodes')
const synopsis = document.getElementById('synopsis')
const score = document.getElementById('score')
const rated = document.getElementById('rated')
const image = document.getElementById('image')
const displayMyMovie = document.getElementById('displayMyMovie')
const deleteButton = document.getElementById('deleteButton')

window.addEventListener('load',(e)=>{
    searchButton.addEventListener('click', (e)=>{
        const search = document.getElementById('search').value
        getAllMovie(search)
        console.log(search)
        search.innerHTML = ''
    })
})

//-------แสดงรายชือทั้งหมด-------

function getAllMovie(search){
    fetch(`https://api.jikan.moe/v3/search/anime?q=${search}`, {
        method: 'GET'
    }).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
    }).then((data) => {
        showMovie(data.results);
    })
}
function showMovie(results){
    for(movie of results){
        showCard(movie)
    }
}
function showCard(movie){
    let card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('bg-dark')
    card.classList.add('text-white')
    card.classList.add('mt-3')
    card.classList.add('mx-3')
    card.setAttribute('style','width: 18rem;')
    card.setAttribute('id',movie.mal_id)
    card.addEventListener('dblclick',(e)=>{
        console.log('กด ' + movie.title)
        let confirmMsg = confirm(`ต้องการเพิ่ม ${movie.title}ใช่ไหม`)
        if(confirmMsg){
            addMovie(movie)
            display()
        }
    })
    let img = document.createElement('img')
    img.setAttribute('src',movie.image_url)
    img.classList.add('card-img-top')
    let card_body = document.createElement('div')
    card_body.classList.add('card-body')
    let title = document.createElement('h5')
    title.classList.add('card-title')
    title.innerText = movie.title
    let synop = document.createElement('p')
    synop.classList.add('card-text')
    synop.innerHTML = movie.synopsis
    card_body.appendChild(title)
    card_body.appendChild(synop)
    card.appendChild(img)
    card.appendChild(card_body)
    search_results.appendChild(card)
}

//-------แสดงรายชือทั้งหมด-------

//-------เพิ่มเข้าลิสต์-------

function addMovie(data) {
    let myMovie = {
        id: "632110352",
        movie: {
            url: data.url,
            image_url: data.image_url,
            title: data.title,
            synopsis: data.synopsis,
            type: data.type,
            episodes: data.episodes,
            score: data.score,
            rated: data.rated
        }
    }
        addMyList(myMovie)
}
function addMyList(myMovie){
    fetch(`https://se104-project-backend.du.r.appspot.com/movies`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myMovie)
    }).then(response =>{
        if(response.status === 200){
            console.log('เข้า')
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data=>{
        alert(`${data.title} is now in your list.`)
    }).catch(error=>{
        return null
    })
}

//-------เพิ่มเข้าลิสต์-------

//-------แสดงรายชื่อหนังในลิสต์-------

function hideAll(){
    search_results.style.display='none'
}
document.getElementById('MyList').addEventListener('click',(e)=>{
    display()
})
function display(){
    hideAll()
    displayMyMovie.style.display='flex'
    displayMyMovie.style.flexFlow='row wrap'
    displayMyMovie.style.justifyContent='center'
    getMyMovie()
}
function displayMyCard(movie){
    let card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('bg-dark')
    card.classList.add('text-white')
    card.classList.add('my-3')
    card.classList.add('mx-3')
    card.setAttribute('style','width: 18rem;')
    card.setAttribute('id',movie.id)
    let img = document.createElement('img')
    img.setAttribute('src',movie.image_url)
    img.classList.add('card-img-top')
    let card_body = document.createElement('div')
    card_body.classList.add('card-body')
    let title = document.createElement('h5')
    title.classList.add('card-title')
    title.innerText = movie.title
    let synop = document.createElement('p')
    synop.classList.add('card-text')
    synop.innerHTML = movie.synopsis
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-outline-success')
    button.setAttribute('type','button')
    button.setAttribute('id','moreInfo')
    button.setAttribute('data-bs-toggle','modal')
    button.setAttribute('data-bs-target','#myModal')
    button.innerText = "More"
    button.addEventListener('click',(e)=>{
        getOneCard(movie.id)
    })
    card_body.appendChild(title)
    card_body.appendChild(synop)
    card_body.appendChild(button)
    card.appendChild(img)
    card.appendChild(card_body)
    displayMyMovie.appendChild(card)
}
function getMyMovie(){
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110352`, {
        method: 'GET'
    }).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
    }).then((data) => {
        showMyMovie(data);
    })
}
function showMyMovie(data){
    for(movie of data){
        displayMyCard(movie)
    }
}
function getOneCard(id){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie/632110352/${id}`, {
        method: 'GET'
    }).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
    }).then((data) => {
        showModal(data);
    })
}
function showModal(movie){
    modalTitle.innerHTML = movie.title
    title.innerHTML = movie.title
    synopsis.innerHTML = movie.synopsis
    type.innerHTML = movie.type
    episodes.innerHTML = movie.episodes
    score.innerHTML = movie.score
    rated.innerHTML = movie.rated
    image.setAttribute('src',movie.image_url)
    deleteButton.addEventListener('click',(e)=>{
        let confirmMsg = confirm(`ต้องการลบ ${movie.title} ใช่หรือไม่`)
            if(confirmMsg){
                deleteList(movie.id)
            }
    })
}

//-------แสดงรายชื่อหนังในลิสต์-------

//-------ลบหนังในลิสต์-------

function deleteList(id){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110352&&movieId=${id}`,{
        method: 'DELETE',
    }).then(response =>{
        if(response.status===200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data=>{
        displayMyMovie.innerHTML = ''
        display()
        // location.reload()
    }).catch(error=>{
        alert('This is not in the database')
    })
}

//-------ลบหนังในลิสต์-------
