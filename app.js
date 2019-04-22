let jokesBtn;
let input;
let jokes;

function findElements() {
  jokesBtn = document.querySelector('.get-jokes');
  input = document.querySelector('input[type="number"]');
  jokes = document.querySelector('.jokes');
}

function subscribe() {
  jokesBtn.addEventListener('click', getJokes);
}

function getJokes(event) {
  event.preventDefault();
  const number = input.value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET',`http://api.icndb.com/jokes/random/${number}`, true);
  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);
      let output = '';
      if(response.type === 'success') {
        response.value.forEach( joke => {
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        output += `<li>Something went wrong</li>`;
      }
      jokes.innerHTML = output;
    }
  }
  xhr.send();
}

function init() {
  findElements();
  subscribe();
}

window.onload = init;