const theatreId = 557;
const card = document.querySelector(".card")
const cardContainer = document.querySelector("#card-container")

fetch('https://evening-plateau-54365.herokuapp.com/theatres/557')
  .then(resp => resp.json())
  // .then(show => console.log(show.showings))
  .then(show => {show.showings.forEach(function (show) {
      cardContainer.innerHTML += `
      <div class="card">
        <div class="content">
          <div class="header">
            ${show.film.title}
          </div>
          <div class="meta">
            ${show.film.runtime} minutes
          </div>
          <div class="description">
            ${show.capacity - show.tickets_sold} remaining tickets
          </div>
          <span class="ui label">
            ${show.showtime}
          </span>
          <div class="extra content">
            <div class="ui blue button" id=${show.id}>Buy Ticket</div>
          </div>
        </div>
      </div>
      `
    }
)
})
cardContainer.addEventListener('click', function(e){
  const buyBtn = e.target.id
  console.log(e.target.id)
  fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
    body: JSON.stringify({
      showing_id: `${e.target.id}`
      })
  })
  .then(resp => resp.json())
  // .then(ticket => {e.target.parentElement.innerHTML = `
	// 	)
  //didnt have time but needed to capture remaining tickets "description" and decrement by 1 on DOM
})
    //decrement remaining tickets by 1
  })
})
