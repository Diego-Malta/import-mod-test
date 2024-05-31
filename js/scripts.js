import cars from "./cars.js";
import {people, fields} from "./people.js";

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

function choose() {
  const person = document.getElementById('people-choice').value;
  const car = document.getElementById('cars-choice').value == false? "no car": `a ${document.getElementById('cars-choice').value}`;

  const chosenText = hasACar(person)?`${person} already has a car`: `${person} has chosen ${car}`;
  document.getElementById('chosen').textContent = chosenText;
}

function hasACar(chosenPerson){
  const person = people.find(person => person.name === chosenPerson);
  return person ? person.ownsACar : false;
}

//all fields to camelCase
const camelCasedFields = fields.map(field => camelize(field));

const liCars = document.querySelectorAll("li.car");
const tHeadings = document.querySelectorAll("th");

const pNamesDP = document.querySelectorAll("datalist#people-names");
const cNamesDP = document.querySelectorAll("datalist#cars-names");

for (let i = 0; i < cars.length; i++)
  liCars[i].innerHTML = cars[i];

for (let i = 0; i < fields.length; i++)
  tHeadings[i].innerHTML = fields[i];

const tbody = document.querySelector("table tbody");
people.forEach(person => {
  const row = document.createElement("tr");
  for (let field of camelCasedFields) {
    const cell = document.createElement("td");

    if (typeof person[field] === "boolean") 
      cell.innerHTML = person[field] ? "Yes" : "No";
    else
      cell.innerHTML = person[field];

    row.appendChild(cell);
  }
  tbody.appendChild(row);
});

people.forEach(person => {
  const option = document.createElement("option");
  option.value = person.name;
  pNamesDP[0].appendChild(option);
});

cars.forEach(car => {
  const option = document.createElement("option");
  option.value = car;
  cNamesDP[0].appendChild(option);
});

document.querySelector("input[type=button]").addEventListener("click", choose);

//window.choose = choose;