const theatreId = 5555;
const cardContainer = document.querySelector('.ui.cards.showings')

function getShowings() {
    fetch('https://evening-plateau-54365.herokuapp.com/theatres/555')
    .then(resp => resp.json())
    .then(theatre => {
        theatre.showings.forEach(showing => {
            // console.log(showing)
            addShowCard(showing)
            
        })
    })
}
getShowings()

function addShowCard(showing) {
    // console.log(showingCard)
  
    cardContainer.innerHTML += `
    <div class="card">
        <div class="content">
            <div class="header">
            ${showing.film.title}
            </div>
            <div class="meta">
            ${showing.film.runtime} minutes
            </div>
            <div class="description">
            ${showing.capacity - showing.tickets_sold} remaining tickets
            </div>
            <span class="ui label">
            ${showing.showtime}
            </span>
        </div>
        <div class="extra content">
            <div class="ui blue button" data-showing= ${showing.id}>Buy Ticket</div>
        </div>
    </div>
    `
    // if (cardContainer.children[0].children[0].children[2].innerText === '0 remaining tickets') {
    //     cardContainer.children[0].children[1].innerText = 'Sold Out'
    //     CardContainer.children[0].children[1].children[0].remove()
    // }
    //    let button = document.querySelector('.ui.blue.button')
    //    const ticketCount = document.querySelector('.description')
    //    let extraContent = document.querySelector('.extra.content')
    //    if (ticketCount === '0 remaining tickets') {
    //        extraContent.innerText = 'Sold Out'
    //        button.remove()

    //    }
   
}

cardContainer.addEventListener('click', (e) => {
    if (e.target.className === 'ui blue button') {
       const newTicketValue = e.target.parentElement.previousElementSibling.children[2].innerText.split(' ')
       let ticketInt = parseInt(newTicketValue[0])
       ticketInt-- 
       e.target.parentElement.previousElementSibling.children[2].innerText = `${ticketInt} remaining tickets`
       if (e.target.parentElement.previousElementSibling.children[2].innerText ===`0 remaining tickets`) {
           e.target.parentElement.innerText = 'Sold Out'
           e.target.remove()
       }
      
    }
        // console.log(e.target.dataset.showing)
        // e.target..previousSibling.previousSibling
        fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify({
                showing_id: parseInt(e.target.dataset.showing)
            })
        })
        .then(resp => resp.json())
        .then(json => console.log(json))
        //wanted to see the response I was getting back from the API

    
})

