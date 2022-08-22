import getData from '@utils/getData.js';
import gitHub from "@images/github.png";
import twitter from "@images/twitter.png";
import instagram from "@images/instagram.png";

const Template = async () => {
  let min = 1    // Starter character id.
  let max = 826  // Total characters.
  let randomId = Math.floor(Math.random() * (max - min + 1)) + min;
  const data = await getData(randomId);
  const view = `
    <div class="About">
      <div class="card">
          <div class="card_photo center circle">
            <img src="${data.image}" alt="${data.name}">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="enable-background:new -580 439 577.9 194;"
              xml:space="preserve">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>
          <p class="card_value">${data.name}</p>

        <div class="card_userdata">
          <ul>
            <li>Species: ${data.species}</li>
            <li>Status: ${data.status}</li>
            <li>Location: ${data.location.name}</li>
          </ul>
        </div>
        <div class="card_social">
          <a href="https://twitter.com/gndx">
            <img src="${twitter}" />
          </a>
          <a href="https://github.com/gndx">
            <img src="${gitHub}" />
          </a>
          <a href="https://instagram.com/gndx">
            <img src="${instagram}" />
          </a>
        </div>
      </div>
    </div>
  `;
  return view;
};

export default Template;