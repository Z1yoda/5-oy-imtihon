import { initializeDarkMode, loader } from "./functions.js";

// Dark mode 
initializeDarkMode();

const card = document.querySelector("#card");
const button = document.querySelector(".btn");

// Function to create the card's HTML
function createCardHtml(data) {
    return `<div class="card">
        <div class="left"><img src="${data.flags.svg}" alt=""></div>
        <div class="right">
            <h1>${data.name.common}</h1>
            <div class="content">
                <div class="leftContent">
                    <p>Native Name: <span>${data.name.nativeName}</span></p>
                    <p>Population: <span>${data.population.toLocaleString(('en-uz'))}</span></p>
                    <p>Region: <span>${data.region}</span></p>
                    <p>Sub Region: <span>${data.subregion}</span></p>
                    <p>Capital: <span>${data.capital[0]}</span></p>
                </div>
                <div class="rightContent">
                    <p>Top Level Domain: <span>${getTopLevelDomain(data.flags.svg)}</span></p>
                    <p>Currencies: <span>${data.currencies.join(", ")}</span></p>
                    <p>Languages: <span>${data.languages.join(", ")}</span></p>
                </div>
            </div>
            <div class="borderCountry">
                <p>Border Countries:</p>
                <div class="btns">
                    <span>${getBorderCountries(data.borders)}</span>
                </div>
            </div>
        </div>
    </div>`;
}

// Function to extract top-level domain from SVG URL
function getTopLevelDomain(svgUrl) {
    return svgUrl.substring(20, svgUrl.search('.svg'));
}

// Function to get formatted border countries string
function getBorderCountries(borders) {
    return borders.map(border => border.common).join(", ");
}

// Function to fetch data based on ID
function fetchDataById(id) {
    return fetch(`https://frontend-mentor-apis-6efy.onrender.com/countries/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

document.addEventListener('DOMContentLoaded', function () {
    const urlIndex = window.location.href.search('id=');
    if (urlIndex > 0) {
        const elId = window.location.href.substring(urlIndex + 3);

        fetchDataById(elId)
            .then(data => {
                const cardHtml = createCardHtml(data);
                card.innerHTML = cardHtml;
            });
    }
});

// Event listener for the back button
button && button.addEventListener('click', function () {
    const currentUrl = window.location.href;
    const pageIndex = currentUrl.search('/pages');
    const domain = currentUrl.substring(0, pageIndex);
    window.location.assign(`${domain}/index.html`);
});

loader();
