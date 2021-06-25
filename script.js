const search_results = document.getElementById('search-results')
const searchButton = document.getElementById('searchButton')
const pages = document.getElementById('pages')
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
var num = 1
var test

window.addEventListener('load',(e)=>{
    hidePages()
})
searchButton.addEventListener('click', (e)=>{
    showSearchResult()
    const search = document.getElementById('search').value
    getAllMovie(search,num)
    console.log(search)
    test = search
    document.getElementById('search').value = ''
    showPages()
})
document.getElementById('search').addEventListener('keypress',function(event){
    if(event.keyCode === 13){
        event.preventDefault()
        searchButton.click()
        getAllMovie()
    }
})

//-------แสดงรายชือทั้งหมด-------

function getAllMovie(search,num){
    fetch(`https://api.jikan.moe/v3/search/anime?q=${search}&page=${num}`, {
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
    search_results.innerHTML = ''
    displayMyMovie.innerHTML = ''
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
        }
    })
    let img = document.createElement('img')
    img.setAttribute('src',movie.image_url)
    img.classList.add('card-img-top')
    let card_body = document.createElement('div')
    card_body.classList.add('card-body')
    let title = document.createElement('h5')
    title.classList.add('card-title')
    title.setAttribute('style','text-align: center;')
    title.innerText = movie.title
    card_body.appendChild(title)
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
        display()
    }).catch(error=>{
        return null
    })
}

//-------เพิ่มเข้าลิสต์-------

//-------แสดงรายชื่อหนังในลิสต์-------

function hidePages(){
    pages.style.display='none'
}
function showPages(){
    pages.style.display='flex'
}
function hideAll(){
    search_results.style.display='none'
    pages.style.display='none'
}
function showSearchResult(){
    search_results.style.display='flex'
    displayMyMovie.style.flexFlow='row wrap'
    displayMyMovie.style.justifyContent='center'
}
document.getElementById('MyList').addEventListener('click',(e)=>{
    displayMyMovie.innerHTML = ''
    changeColor()
    display()
})
function display(){
    hideAll()
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
    card_body.classList.add('d-flex')
    card_body.classList.add('flex-column')
    let title = document.createElement('h5')
    title.classList.add('card-title')
    title.innerText = movie.title
    let score = document.createElement('p')
    score.innerText = 'Score: '+movie.score
    score.style.color = '#EEC643'
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-outline-success')
    button.classList.add('mt-auto') 
    button.setAttribute('type','button')
    button.setAttribute('id','moreInfo')
    button.setAttribute('data-bs-toggle','modal')
    button.setAttribute('data-bs-target','#myModal')
    button.innerText = "More"
    button.addEventListener('click',(e)=>{
        getOneCard(movie.id)
    })
    card_body.appendChild(title)
    card_body.appendChild(score)
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
        }
    }).then(data=>{
        displayMyMovie.innerHTML = ''
        display()
    })
}

//-------ลบหนังในลิสต์-------

//-------เปลี่ยนหน้า-------

document.getElementById('page1').addEventListener('click',(e)=>{
    num = 1
    console.log(num)
    search_results.innerHTML = ''
    getAllMovie(test,num)
})
document.getElementById('page2').addEventListener('click',(e)=>{
    num = 2
    console.log(num)
    search_results.innerHTML = ''
    getAllMovie(test,num)
})
document.getElementById('page3').addEventListener('click',(e)=>{
    num = 3
    console.log(num)
    search_results.innerHTML = ''
    getAllMovie(test,num)
})
document.getElementById('page4').addEventListener('click',(e)=>{
    num = 4
    console.log(num)
    search_results.innerHTML = ''
    getAllMovie(test,num)
})
document.getElementById('page5').addEventListener('click',(e)=>{
    num = 5
    console.log(num)
    search_results.innerHTML = ''
    getAllMovie(test,num)
})
document.getElementById('prev').addEventListener('click',(e)=>{
    num -= 1
    console.log(num)
    search_results.innerHTML = ''
    getAllMovie(test,num)
})
document.getElementById('next').addEventListener('click',(e)=>{
    num += 1
    console.log(num)
    search_results.innerHTML = ''
    getAllMovie(test,num)
})

//-------เปลี่ยนหน้า-------

function changeColor(){
    let home = document.getElementById('MyHome')
    home.setAttribute('style','color: white;')
}