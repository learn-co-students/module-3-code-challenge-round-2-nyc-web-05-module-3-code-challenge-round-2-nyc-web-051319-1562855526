const theatreId = 560;
const showDiv = document.querySelector("#showing-div")

function fetchTheater() {
    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
    .then(res => res.json())
    .then(TheaterObj => displayShowings(TheaterObj.showings))
    //.then(console.log)
}

function displayShowings(showings) {
    showings.forEach(show => {
        showDiv.innerHTML += 
    `
    <div class="card">
  <div class="content">
    <div class="header">
      ${show.film.title}
    </div>
    <div class="meta">
      ${show.film.runtime}
    </div>
    <div id=${show.id} class="description">
      ${show.capacity - show.tickets_sold}
    </div>
    <span class="ui label">
        ${show.showtime}
    </span>
  </div>
  <div class="extra content">
    <div data-id=${show.id} class="ui blue button">Buy Ticket</div>
  </div>
</div>
    `
        
    });
}

showDiv.addEventListener('click', function(e) {

    if (e.target.className === "ui blue button") {
        //console.log(e.target.dataset.id)
        postTickets(e.target.dataset.id)
    }
})




function postTickets(showId) {    
       fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
          method: 'POST',
          headers:  {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
          body: JSON.stringify({showing_id: `${showId}`}), 
      })
      .then(response => response.json())
      .then(console.log)
      const count = document.getElementById(`${showId}`)
      //count.innerHTML now that i have the div i want to update the DOm
      
      // op
  }
  


fetchTheater()























