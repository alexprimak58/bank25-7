"use strict";

const transactionList = document.querySelector(".transaction-history");
const balanceLog = document.querySelector(".balance-value");
const username = document.querySelector(".username-label");
const cardNumber = document.querySelector(".card-number");
const headerLogin = document.querySelector(".header-login");
const loginForm = document.querySelector(".fullscreen-container");
const closeFormButton = document.querySelector(".x-btn");
const submitForm = document.querySelector(".form-btn");
const emailField = document.querySelector(".form-input-1");
const passwdField = document.querySelector(".form-input-2");
const loginnedUser = document.querySelector(".logined-user-header");
const loginBtnDiv = document.querySelector(".login-btn");
const usernameOfUser = document.querySelector(".username-label");
const wrongPasswdOrEmailText = document.querySelector(".wrong-passwd-or-email");
const emailFieldForRed = document.querySelector(".email-field");
const passwordFieldForRed = document.querySelector(".password-field");
const logOutBtn = document.querySelector(".log-out-img-btn");
const transferBtn = document.querySelector(".arrow-1");
const transferTo = document.querySelector(".card-num-input");
const transferAmount = document.querySelector(".transfer-amount-input");
const loanAmount = document.querySelector(".loan-amount-input");
const loanBtn = document.querySelector(".arrow-2");
const stock1 = document.querySelector(".stock-label-1").textContent;
const stock2 = document.querySelector(".stock-label-2").textContent;
const stock3 = document.querySelector(".stock-label-3").textContent;
const stock4 = document.querySelector(".stock-label-4").textContent;
const stock5 = document.querySelector(".stock-label-5").textContent;
const stocks = [stock1, stock2, stock3, stock4, stock5];
const stockvalue1 = document.querySelector(".stock-value-1");
const stockvalue2 = document.querySelector(".stock-value-2");
const stockvalue3 = document.querySelector(".stock-value-3");
const stockvalue4 = document.querySelector(".stock-value-4");
const stockvalue5 = document.querySelector(".stock-value-5");
const stocksValues = [
  stockvalue1,
  stockvalue2,
  stockvalue3,
  stockvalue4,
  stockvalue5,
];
// Logged out account
const loggedOut = {
  username: "bank25/7.bank",
  cardNumber: "**** **** **** ****",
};
//Accounts
const account1 = {
  username: "alexprimak.bank",
  email: "alexprimak@gmail.com",
  cardNumber: "5375 4141 5452 1147",
  movements: [200, 500, 433, -255, 70, 244, -400, 4000, -655],
  time: [
    "1 day ago",
    "1 day ago",
    "8 hours ago",
    "8 hours ago",
    "3 hours ago",
    "2 hours ago",
    "2 hours ago",
    "1 hour ago",
    "15 mins ago",
  ],
  password: 1111,
};
const account2 = {
  username: "shokomakina.bank",
  email: "shokomakina@gmail.com",
  cardNumber: "5375 4141 8953 9444",
  movements: [4000, -655, -255, 70, 244, 900, 8335, -500, 433, -400],
  time: [
    "12 hours ago",
    "12 hours ago",
    "12 hours ago",
    "10 hours ago",
    "8 hours ago",
    "7 hours ago",
    "6 hours ago",
    "50 mins ago",
    "50 mins ago",
    "45 mins ago",
  ],
  password: 2222,
};
const account3 = {
  username: "getosuguru.bank",
  email: "getosuguru@gmail.com",
  cardNumber: "5375 4141 3432 5666",
  movements: [-400, 4000, -655, -255, 70, 244, 200, -339, 972, 500, 433],
  time: [
    "8 days ago",
    "8 days ago",
    "8 days ago",
    "6 days ago",
    "5 days ago",
    "5 days ago",
    "59 mins ago",
    "58 mins ago",
    "55 mins ago",
    "45 mins ago",
    "12 mins ago",
  ],
  password: 3333,
};
const account4 = {
  username: "skywalker.bank",
  email: "skywalker@gmail.com",
  cardNumber: "5375 4141 4435 5524",
  movements: [875, -922, 12, 665, -500, 1000],
  time: [
    "12 days ago",
    "12 days ago",
    "8 days ago",
    "3 days ago",
    "2 days ago",
    "2 days ago",
  ],
  password: 4444,
};
const account5 = {
  username: "namisan.bank",
  email: "namisan@gmail.com",
  cardNumber: "5375 4141 3943 4398",
  movements: [300, 100, 400, -300, 50, 800, -900, 2000, -311],
  time: [
    "18 days ago",
    "17 days ago",
    "2 days ago",
    "2 days ago",
    "19 hours ago",
    "19 hours ago",
    "19 hours ago",
    "16 hours ago",
    "7 hours ago",
  ],
  password: 5555,
};
const accounts = [account1, account2, account3, account4, account5];

// implementing login
let currentAcc;
submitForm.addEventListener("click", (e) => {
  e.preventDefault();
  currentAcc = accounts.find((acc) => acc.email === emailField.value);

  if (currentAcc?.password === Number(passwdField.value)) {
    updateUI(currentAcc);
    cardNumber.textContent = currentAcc.cardNumber;
    usernameOfUser.textContent = currentAcc.username;
    loginForm.classList.add("opacityForEl");
    loginnedUser.classList.remove("opacityForEl");
    headerLogin.classList.add("opacityForEl");
    loginBtnDiv.classList.add("opacityForEl");
    passwdField.value = emailField.value = "";
  }
  if (currentAcc?.password !== Number(passwdField.value)) {
    wrongPasswdOrEmailText.classList.remove("opacityForEl");
    submitForm.style.marginTop = "3rem";
    emailFieldForRed.style.borderBottom =
      passwordFieldForRed.style.borderBottom = "0.2rem solid #fa0000";
  }
});

// implementing logout
logOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loggedOutFunction();
});

const updateUI = function (acc) {
  displayTransactions(acc.movements, acc.time);
  balanceLogging(acc);
};

// calculating balance
const balanceLogging = (acc) => {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  balanceLog.textContent = `${acc.balance}.00`;
};

// implementing transaction to be shown of each user
const displayTransactions = function (movements, time) {
  transactionList.innerHTML = "";
  movements.forEach(function (mov, index) {
    const timeofTx = time[index];
    const html = `
        <li class="transactions-history-tx-log">
                  <img src="img/${
                    mov > 0 ? "I" : "W"
                  }.svg" class="type-of-operation" />
                  <p class="transaction-history-value">${Math.abs(mov)}</p>
                  <p class="transaction-history-currency">USD</p>
                  <p class="transaction-history-time">${timeofTx}</p>
                </li>
        `;
    transactionList.insertAdjacentHTML("afterbegin", html);
  });
};

// logged out user
const loggedOutFunction = () => {
  const html = `
      <li class="transactions-history-tx-log">
                <img src="img/I.svg" class="type-of-operation" />
                <p class="transaction-history-value">****</p>
                <p class="transaction-history-currency">USD</p>
                <p class="transaction-history-time">15 mins ago</p>
              </li>
      <li class="transactions-history-tx-log">
                <img src="img/W.svg" class="type-of-operation" />
                <p class="transaction-history-value">****</p>
                <p class="transaction-history-currency">USD</p>
                <p class="transaction-history-time">4 hours ago</p>
              </li>
      <li class="transactions-history-tx-log">
                <img src="img/I.svg" class="type-of-operation" />
                <p class="transaction-history-value">****</p>
                <p class="transaction-history-currency">USD</p>
                <p class="transaction-history-time">2 days ago</p>
              </li>
      <li class="transactions-history-tx-log">
                <img src="img/W.svg" class="type-of-operation" />
                <p class="transaction-history-value">****</p>
                <p class="transaction-history-currency">USD</p>
                <p class="transaction-history-time">2 days ago</p>
              </li>
      `;
  displayTransactions([], []);
  transactionList.insertAdjacentHTML("afterbegin", html);
  balanceLog.textContent = "0000.00";
  cardNumber.textContent = loggedOut.cardNumber;
  usernameOfUser.textContent = loggedOut.username;
  loginnedUser.classList.add("opacityForEl");
  headerLogin.classList.remove("opacityForEl");
  loginBtnDiv.classList.remove("opacityForEl");
};
loggedOutFunction();

// opening form
headerLogin.addEventListener("click", () => {
  loginForm.classList.remove("opacityForEl");
});
// closing form
closeFormButton.addEventListener("click", () => {
  loginForm.classList.add("opacityForEl");
});
// implementing loan
loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  loanLogic();
});
// loan logic
let donthaveLoan = true;
const loanLogic = () => {
  const amount = Number(loanAmount.value);
  loanAmount.value = "";
  if (
    donthaveLoan === true &&
    amount > 0 &&
    amount < currentAcc.balance * 0.25
  ) {
    currentAcc.movements.push(amount);
    currentAcc.time.push("Just now");
    donthaveLoan = false;
    displayTransactions(currentAcc.movements, currentAcc.time);
    balanceLogging(currentAcc);
  }
};
// implementing transfers
transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(transferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.cardNumber === transferTo.value
  );
  transferAmount.value = transferTo.value = "";
  if (
    amount > 0 &&
    receiverAcc &&
    currentAcc.balance >= amount &&
    receiverAcc.cardNumber !== currentAcc.cardNumber
  ) {
    currentAcc.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAcc.time.push("Just now");
    receiverAcc.time.push("Just now");
  }
  updateUI(currentAcc);
});

// Copying text to clipboard
const copyContent = async (field) => {
  field.addEventListener("click", async () => {
    try {
      let text = field.innerHTML;
      await navigator.clipboard.writeText(text);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  });
};
copyContent(balanceLog);
copyContent(username);
copyContent(cardNumber);

// getting value from stock market prices
const changeStockValue = (data, i) => {
  stocksValues[i].textContent = `$${Math.round(data.price)}`;
};
const getStockPrice = async (tickers, i) => {
  let TDKEY = "5235048dd400486eb7aa94d9d0b23143";
  const res = await fetch(
    `https://api.twelvedata.com/price?symbol=${tickers}&apikey=${TDKEY}`
  );
  const data = await res.json();
  changeStockValue(data, i);
};
getStockPrice(stocks[0], 0);
getStockPrice(stocks[1], 1);
getStockPrice(stocks[2], 2);
getStockPrice(stocks[3], 3);
getStockPrice(stocks[4], 4);
