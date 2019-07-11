const theatreId = 553;

//NO DOMCONTENTLOADED SINCE SCRIPT SRC IS ON BOTTOM

//"remaining tickets" should be showing's 'capacity' - 'tickets_sold'

function getEverything() {
  fetch('https://evening-plateau-54365.herokuapp.com/theatres' + '/' + theatreId)
    .then(res => res.json())
    .then(theater => {

      //THIS FUNCTION GETS AN HTML COLLECTION, WHICH WE DON'T WANT, SO WE JUST GET THE FIRST ELEMENT
      const list = document.getElementsByClassName('ui cards showings')[0]

      for (const showing of theater.showings) {
        const card = document.createElement('div')
        card.dataset.id = showing.id
        card.className = 'card'

        const cardContent = document.createElement('div')
        cardContent.className = 'content'
        card.appendChild(cardContent)

        const cardHeader = document.createElement('div')
        cardHeader.className = 'header'
        cardHeader.innerText = showing.film.title
        cardContent.appendChild(cardHeader)

        const cardMeta = document.createElement('div')
        cardMeta.className = 'meta'
        cardMeta.innerText = showing.film.runtime + ' ' + "minutes"
        cardContent.appendChild(cardMeta)

        const cardDescription = document.createElement('div')
        //GIVE THIS A UNIQUE CLASSNAME TO MANIPULATE LATER ON IN THE ADDEVENTLISTENER
        cardDescription.className = 'description'
        cardDescription.id = `description-${showing.id}`
        cardDescription.innerText = (showing.capacity - showing.tickets_sold) + ' ' + "remaining tickets"
        cardContent.appendChild(cardDescription)

        const cardShowtime = document.createElement('span')
        cardShowtime.class = 'ui label'
        cardShowtime.innerText = showing.showtime
        cardContent.appendChild(cardShowtime)

        const extraContent = document.createElement('div')
        extraContent.className = 'extra content'
        addEventListenerToPost(extraContent)
        card.appendChild(extraContent)

        const buyTicketButton = document.createElement('div')
        buyTicketButton.className = 'ui blue button'
        if (cardDescription.innerText === ("0 remaining tickets")) {
          buyTicketButton.innerText = 'Sold Out'
        } else {
          buyTicketButton.innerText = 'Buy Ticket'
        }
        extraContent.appendChild(buyTicketButton)

        list.appendChild(card)
      }
    })
}

getEverything()

function addEventListenerToPost(extraContent) {
  extraContent.addEventListener('click', function(e){
    if (e.target.className === 'ui blue button') {
      fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          showing_id: e.target.parentElement.parentElement.dataset.id
        })
      })
      const showingRemainingTickets = document.querySelector(`#description-${e.target.parentElement.parentElement.dataset.id}`)[0].innerText
      const arrayOfText = showingRemainingTickets.split(' ')
      let firstElement = --arrayOfText[0]

      //MAKE SURE NUMBER DOESN'T GO BELOW 0
      if (firstElement < 0) {
        firstElement = 0
      }

      const pseudoText = document.querySelector(`#description-${e.target.parentElement.parentElement.dataset.id}`)[0].innerText = firstElement + ' ' + 'remaining tickets'
      if (pseudoText === ("0 remaining tickets")) {
        e.target.innerText = 'Sold Out'
      } else {
        document.querySelector(`#description-${e.target.parentElement.parentElement.dataset.id}`)[0].innerText = firstElement + ' ' + 'remaining tickets'
      }
    }
  })
}
