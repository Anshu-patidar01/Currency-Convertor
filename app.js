const baseURL = "https://latest.currency-api.pages.dev/v1/currencies";

// console.log(hi);
let listOfContries = {};
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const first_contryName = document.querySelector(".first-contryName");
const second_contryName = document.querySelector(".second-contryName");

// setting options from API
(async () => {
  let link = `${baseURL}/usd.json`;
  let respons = await fetch(link);
  let rjson = await respons.json();
  // console.log("second", rjson);
  for (let select of dropdowns) {
    for (currCode of Object.keys(rjson["usd"])) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "usd") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "inr") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }

    select.addEventListener("change", (e) => {
      setName();
    });
  }
})();

//sending amount to conver
btn.addEventListener("click", (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  amtval = amtval * 1;
  if (isNaN(amtval)) {
    alert("");
    amtval = 1;
    amount.value = 1;
  }
  if (amtval === "" || amtval < 0) {
    amtval = 1;
    amount.value = "1";
  }
  caluculateAmount(amtval);
  setName();
});

//converting... amount
const caluculateAmount = (amount) => {
  (async () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    let link = `${baseURL}/${from}.json`;
    const respons = await fetch(link);
    const rjson = await respons.json();
    const cnVal = `${amount}${from} = ${amount * rjson[from][to]}${to} `;
    msg.innerHTML = `
      <h3>${cnVal}</h3>
      <p>1${from} = ${rjson[from][to]}${to} </p>
    `;
  })();
};

//set contry Name
const setName = () => {
  (async () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const link =
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
    const respons = await fetch(link);
    const rjson = await respons.json();
    first_contryName.innerText = rjson[`${from}`];
    second_contryName.innerText = rjson[`${to}`];
  })();
};
