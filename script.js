window.addEventListener('load', (e) => {
    const button = document.getElementById('searchButton')
    button.addEventListener('click', (e)=>{
        getAllMovie()
    })
});
function getAllMovie(){
    fetch(`https://api.jikan.moe/v3/search/anime?q=&order_by=members&sort=desc&page=1`, {
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

const search_results = document.getElementById('search-results')

function showCard(movie){
    let card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('mt-3')
    card.classList.add('mx-3')
    card.setAttribute('style','width: 18rem;')
    let img = document.createElement('img')
    img.setAttribute('src',movie.image_url)
    img.classList.add('card-img-top')
    let card_body = document.createElement('div')
    card_body.classList.add('card-body')
    let title = document.createElement('h5')
    title.classList.add('card-title')
    title.innerHTML = movie.title
    let synop = document.createElement('p')
    synop.classList.add('card-text')
    synop.innerHTML = movie.synopsis
    let more = document.createElement('a')
    more.setAttribute('href','#')
    more.classList.add('btn')
    more.classList.add('btn-primary')
    more.innerHTML = 'Go somewhere'
    card_body.appendChild(title)
    card_body.appendChild(synop)
    card_body.appendChild(more)
    card.appendChild(img)
    card.appendChild(card_body)
    search_results.appendChild(card)
    console.log('this is the end')
}

