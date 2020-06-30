import '../scss/main.scss';
// import {resolve} from 'core-js/fn/promise';

// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

/* place your code below */
const headerTitle = document.querySelector('.header__title');
const reposItems = document.querySelector('.grid__container');
let username = prompt('enter github username');
const link = fetch(
  `https://api.github.com/users/${username}/repos?sort=created`
);

if (link) {
  link
    .then((resp) => resp.json())
    .then((resp) => {
      headerTitle.innerHTML = `${username}'s GitHub repos`;
      resp.forEach((e) => {
        const HTML = `<article class="grid-item">
  <h3 class="grid-item__heading">${e.name}</h3>
  <table class="grid-item__table">
    <thead>
      <tr>
        <th class="grid-item__table-head">link</th>
        <th class="grid-item__table-head">size</th>
        <th class="grid-item__table-head">created</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="grid-item__table-body">
          <a class="grid-item__link" target="_blank" href="${
            e.html_url
          }">link to repo</a>
        </td>
        <td class="grid-item__table-body">
          ${e.size}
        </td>
        <td class="grid-item__table-body">
          ${e.created_at.slice(0, 10)}
        </td>
      </tr>
    </tbody>
  </table>
  </article>`;
        reposItems.insertAdjacentHTML('beforeend', HTML);
      });
    })
    .catch((error) => console.log(error));
}
