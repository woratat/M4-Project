const search_results = document.getElementById('search-results')
const modalTitle = document.getElementById('modalTitle')
const id = document.getElementById('id')
const title = document.getElementById('title')
const type = document.getElementById('type')
const episodes = document.getElementById('episodes')
const score = document.getElementById('score')
const rated = document.getElementById('rated')
const image= document.getElementById('image')

window.addEventListener('load',(e)=>{
    const searchButton = document.getElementById('searchButton')
    searchButton.addEventListener('click', (e)=>{
        const search = document.getElementById('search').value
        getAllMovie(search)
        console.log(search)
    })
})

function getAllMovie(search){
    fetch(`https://api.jikan.moe/v3/search/anime?q=${search}`, {
        method: 'GET'
    }).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
    }).then((data) => {
        showMovie(data.results);
    console.log('this is getAllMovie')
    })
}
function showMovie(data){
    console.log('this is showMovie')
    for(movie of data){
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
    card.addEventListener('dblclick',(event)=>{
        console.log(movie.title)
        let confirmMsg = confirm(`ต้องการเพิ่ม ${movie.title}ใช่ไหม`)
        if(confirmMsg){

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
    console.log('this is the end')
}
// document.getElementById()
// function getOneCard(id){
//     fetch(`https://api.jikan.moe/v3/anime/${id}`, {
//         method: 'GET'
//     }).then((res) => {
//         if (res.status === 200) {
//             return res.json();
//         }
//     }).then((data) => {
//         showModal(data.results);
//     })
// }
// function showModal(movie){
//     modalTitle.innerHTML = movie.title
//     id.innerHTML = movie.mal_id
//     title.innerHTML = movie.title
//     type.innerHTML = movie.type
//     episodes.innerHTML = movie.episodes
//     score.innerHTML = movie.score
//     rated.innerHTML = movie.rated
//     image.setAttribute('src',movie.image)
//     image.setAttribute('width',"304")
// }