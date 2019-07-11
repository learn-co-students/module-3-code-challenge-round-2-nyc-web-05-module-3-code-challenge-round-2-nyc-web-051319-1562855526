//Global variables
const theatreId = 554;
const showingsList = document.querySelector('#showings')

//Load the dom
document.addEventListener('DOMContentLoaded', function(e){
  console.log('Dom successfully loaded')
  //LOAD ALL SHOWINGS
  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
  .then(res => res.json())
  .then(list => list.showings.forEach(function(showing){
    showingsList.innerHTML += `
    <div class="card">
      <div class="content">
        <div class="header">
            ${showing.film.title}
        </div>
        <div class="meta">
          ${showing.film.runtime}
        </div>
        <div data-id="${showing.id}" id="tickets-available" class="description">
          ${(showing.capacity - showing.tickets_sold)}
        </div>
        <span class="ui label">
          ${showing.showtime}
        </span>
        </div>
      <div class="extra content">
        <div data-id="${showing.id}" id="buy-ticket" class="ui blue button">Buy Ticket</div>
      </div>
    </div>
    `
  })
)//fetch end



  //Event listeners
  document.addEventListener('click', function(e){
    if(e.target.id === "buy-ticket"){
      console.log(e)
      const showId = e.target.dataset.id
      const classCard = e.target.parentElement.parentElement
      const ticketsAvailable = classCard.querySelector('#tickets-available')

      fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          showing_id: `${showId}`
        })
      })
        let newValue = ticketsAvailable.innerHTML - 1
          ticketsAvailable.innerHTML = newValue
        if(ticketsAvailable.innerHTML < 1){
          ticketsAvailable.innerHTML = "sold out"
        }
      }
  })//end of buy ticket event

  //Fetch all showtimes relevant to MY theatreId interpolating that Id into the fetch request,
    //and with that request render those shows to the page

})//DOM content loaded
