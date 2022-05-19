'use strict';

////////////////////////////////////////////////////////////////////////////////
////////////////////////// Data ////////////////////////////////////////////////

const account1 = {
  owner: 'Kershey Carino',
  movements: [5000, 200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2,
  pin: 1111,

  movementsDates: [
    '2021-12-16T21:55:17.178Z',
    '2021-01-11T07:42:02.383Z',
    '2021-01-14T09:15:04.904Z',
    '2022-02-01T10:17:24.185Z',
    '2022-03-12T14:11:59.604Z',
    '2022-05-05T13:05:17.194Z',
    '2022-05-07T21:58:17.929Z',
    '2022-05-09T10:51:36.790Z',
    '2022-05-10T04:01:20.894Z',
  ],
  currency: 'PHP',
  locale: 'en-US',
};

const account2 = {
  owner: 'Joseph Carino',
  movements: [55500, 82000, -15400, -1500, 11790, -30210, -1000, 32500, -3000],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-05-15T16:33:06.386Z',
    '2022-05-17T14:43:26.374Z',
    '2022-05-18T18:49:59.371Z',
    '2022-05-19T12:01:20.894Z',
    '2022-05-19T12:03:20.894Z',
  ],
  currency: 'PHP',
  locale: 'en-US',
};

const account3 = {
  owner: 'Marian Villaruel',
  movements: [20011, 10000, 90400, -2500, -8890, 8500, -3000, 50000, 30000],
  interestRate: 1.1,
  pin: 3333,

  movementsDates: [
    '2021-12-16T21:55:17.178Z',
    '2022-01-11T07:42:02.383Z',
    '2022-01-14T09:15:04.904Z',
    '2022-02-10T10:17:24.185Z',
    '2022-02-12T14:11:59.604Z',
    '2022-05-07T13:05:17.194Z',
    '2022-05-08T21:58:17.929Z',
    '2022-05-09T10:51:36.790Z',
    '2022-05-19T12:06:20.894Z',
  ],
  currency: 'PHP',
  locale: 'en-US',
};

const account4 = {
  owner: 'Giannelle Villaruel',
  movements: [83002, 230000, 80400, -2500, -8890, -7210, -10000, 85000, 85000],
  interestRate: 0.9,
  pin: 4444,

  movementsDates: [
    '2021-12-16T21:55:17.178Z',
    '2022-01-11T07:42:02.383Z',
    '2022-01-14T09:15:04.904Z',
    '2022-02-10T10:17:24.185Z',
    '2022-05-06T14:11:59.604Z',
    '2022-05-07T13:05:17.194Z',
    '2022-05-08T21:58:17.929Z',
    '2022-05-09T10:51:36.790Z',
    '2022-05-10T12:51:36.790Z',
  ],
  currency: 'PHP',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

////////////////////////////////////////////////////////////////////////////////
////////////////////////// Elements ////////////////////////////////////////////

// Main Containers
const homeDOM = document.getElementById('home');
const appDOM = document.getElementById('app');
const appContainerDOM = document.getElementById('appContainer');
const heroDOM = document.getElementById('hero');

// Containers
const containerMovements = document.querySelector('.movements');
const operationTransfer = document.querySelector('.operation--transfer');
const operationLoan = document.querySelector('.operation--loan');
const operationClose = document.querySelector('.operation--close');

// Other Elements

// Labels
const labelUsername = document.querySelector('.greetings__username');
const labelDate = document.querySelector('.current-date');
const labelBalance = document.querySelector('.balance__value');
const labelMovDate = document.querySelector('.movements__date');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

// Buttons
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn-sort');
const btnLogout = document.querySelector('.btn-logout');
const btnGuide = document.querySelector('.guide__btn-open');
const btnGuideClose = document.querySelector('.guide__btn-close');

// Inputs
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Errors
const errorLogin = document.querySelector('.error__login');
const errorTransfer = document.querySelector('.error__transfer');
const errorLoan = document.querySelector('.error__loan');
const errorClose = document.querySelector('.error__close');

// Popups
const popupUsername = document.querySelector('.display__username');
const popupMovement = document.querySelector('.popup__movement');
const popupLogout = document.querySelector('.popup__logout');

//Guide
const guideDetails = document.querySelector('.guide');
const containerGuide = document.querySelector('.guide__content');

//Media Query
const portMediaQuery = window.matchMedia('(max-width: 900px)');

////////////////////////////////////////////////////////////////////////////////
////////////////////////// Functions  //////////////////////////////////////////

/***************************** Producers ********************************/

//////// Create Username ////////
const createUsernames = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

/*********************************** Dates ************************************/

//////// Format Movement Dates ////////
const formatMovementDate = function (date) {
  // Minutes
  const calcMinutesPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60));
  const minutesPassed = calcMinutesPassed(new Date(), date);
  if (minutesPassed === 0) return 'Just now';
  if (minutesPassed === 1) return `${minutesPassed} minute ago`;
  if (minutesPassed < 60) return `${minutesPassed} minutes ago`;
  // Hours
  else {
    const calcHoursPassed = (date1, date2) =>
      Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60));
    const hoursPassed = calcHoursPassed(new Date(), date);
    if (hoursPassed === 1) return `${hoursPassed} hour ago`;
    if (hoursPassed < 24) return `${hoursPassed} hours ago`;
    // Days
    else {
      const calcDaysPassed = (date1, date2) =>
        Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
      const daysPassed = calcDaysPassed(new Date(), date);
      if (daysPassed === 1) return ` Yesterday`;
      if (daysPassed <= 7) return `${daysPassed} days ago`;
      // Date
      else {
        return new Intl.DateTimeFormat(currentAccount.locale).format(date);
      }
    }
  }
};

//////// Format Current Date ////////
const formatCurrentDate = () => {
  const locale = navigator.language;
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat(locale, options).format(now);
};

/****************************** Currency Values ********************************/

//////// Format Currency Value ////////
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

/******************************** Timers **************************************/

//////// Timer ////////
const startLogOutTimer = function () {
  const tick = function () {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      transitionOut();
    }

    --time;
  };
  //3 minutes
  let time = 180;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//////// Reset Timer ////////
const resetTimer = () => {
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
};

/***************************** Display Pop-ups ********************************/

//////// Errors ////////
const renderError = (errorMessage, element) => {
  const revealError = () => {
    element.textContent = errorMessage;
    element.classList.add('display-error');
  };

  const removeError = () => {
    element.classList.remove('display-error');
  };

  revealError();
  //reset
  setTimeout(removeError, 3000);
};

//////// Logout Popup ////////
const displayPopup = (popupMessage, element) => {
  const usernameFirstName = currentAccount.owner.split(' ')[0];
  const revealPopup = () => {
    element.textContent = `${popupMessage} ${usernameFirstName}!`;
    element.classList.add('display-popup');
  };

  const removePopup = () => {
    element.classList.remove('display-popup');
  };

  revealPopup();
  //reset
  setTimeout(removePopup, 5000);
};

/***************************** Other Functions ********************************/

//////// Calculate Max Value ////////
//not used
const calcMaxValue = movements => {
  const max = movements.reduce(
    (acc, cur) => (acc > cur ? acc : cur),
    movements[0]
  );
  return max;
};

const scrollIntoPosition = position => {
  let coord;

  if (position === 'movements' && portMediaQuery.matches) coord = 100;

  window.scrollTo({
    top: coord,
    behavior: 'smooth',
  });
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////// MAIN FUNCTIONALITY //////////////////////////////////////////

/***************************** Log *******************************************/
////////  User Logs In  ////////
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  const loginBtnAnimationAdd = () =>
    btnLogin.classList.add('btn-login__active');
  const loginBtnAnimationRemove = () =>
    btnLogin.classList.remove('btn-login__active');

  //matching the current user
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  //validation
  if (currentAccount?.pin === +inputLoginPin.value) {
    //Login Button animation
    loginBtnAnimationAdd();
    setTimeout(loginBtnAnimationRemove, 6000);

    //Current Account
    const usernameFirstName = currentAccount.owner.split(' ')[0];

    //greetings
    labelUsername.textContent = `${usernameFirstName}!`;

    // display UI
    setTimeout(transitionIn, 5500);
  } else renderError('Incorrect PIN!', errorLogin);

  //reset
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
});

////////  User Logs Out  ////////
btnLogout.addEventListener('click', function (e) {
  e.preventDefault();
  transitionOut();
});

/***************************** Update Display **********************************/

//////// Login Transition ////////
const transitionIn = () => {
  homeDOM.style.height = '100%';
  heroDOM.classList.add('hero-transition-out');
  appDOM.classList.add('app-transition-in');
  appContainerDOM.classList.add('appCon-transition-in');
  updateUI();
  resetTimer();
};

const transitionOut = () => {
  homeDOM.style.height = '100vh';
  heroDOM.classList.remove('hero-transition-out');
  appDOM.classList.remove('app-transition-in');
  appContainerDOM.classList.remove('appCon-transition-in');
  clearInterval(timer);
  displayPopup('Thank you for using Cashy', popupLogout);
};

//////// Update UI ////////
const updateUI = () => {
  displayMovements(currentAccount);
  displaySummary(currentAccount);
  displayBalance(currentAccount);
  displayCurrentDate();
};

/***************************** Balance ***************************************/

//////// Display Balance ////////
const displayBalance = account => {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCurrency(
    account.balance,
    account.locale,
    account.currency
  )}`;
};

//////// Display Current Date////////
const displayCurrentDate = () => {
  const currentDate = formatCurrentDate();
  labelDate.textContent = currentDate;
};

/***************************** Movements ***************************************/

////////  Movements/ Transactions ////////
const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';
  const movementsAll = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movementsAll.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    // Create current date and time
    const date = new Date(account.movementsDates[i]);
    const clearDate = (labelMovDate.textContent = ' ');
    const displayDate = sort ? clearDate : formatMovementDate(date);
    const formattedMov = formatCurrency(
      movement,
      account.locale,
      account.currency
    );

    //inserting Movements HTML
    const html = `<div class="movements__row">
        <div class="movements__box">
            <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
            <div class="movements__date">${displayDate}</div>
        </div>
        <h3 class="movements__value heading-3">${formattedMov}</h3>
    </div>`;

    //position of Inserted Movements HTML
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  // Alternate Colors
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2 === 0) row.style.backgroundColor = 'var(--clr-white-opacity-100)';
  });
};

/***************************** Summary ***************************************/

////////  Summary  ////////
const displaySummary = function (account) {
  const sumIn = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur);

  labelSumIn.textContent = `${formatCurrency(
    sumIn,
    account.locale,
    account.currency
  )}`;

  const sumOut = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur);

  labelSumOut.textContent = `${formatCurrency(
    Math.abs(sumOut),
    account.locale,
    account.currency
  )}`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter(int => int >= 1)
    .reduce((acc, cur) => acc + cur);

  labelSumInterest.textContent = `${formatCurrency(
    interest,
    account.locale,
    account.currency
  )}`;
};

/***************************** Process ****************************************/

///////  Transfer Functionality  ////////
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value.toLowerCase()
  );

  //validation
  if (
    amount <= currentAccount.balance &&
    amount > 0 &&
    receiverAccount?.username !== currentAccount.username &&
    receiverAccount
  ) {
    // Blur Input
    inputTransferTo.blur();
    inputTransferAmount.blur();

    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date());
    receiverAccount.movementsDates.push(new Date());

    //updateUI
    updateUI();

    // Scroll into movements in tab-port view
    scrollIntoPosition('movements');

    // Popup Message
    displayPopup('Transferred successfully,', popupMovement);
  } else renderError("Doesn't have sufficient funds!", errorTransfer);

  //reset
  resetTimer();
  inputTransferAmount.value = inputTransferTo.value = '';
});

///////  Close Functionality  ////////
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const closeAccIndex = accounts.findIndex(
    acc => acc.username === currentAccount.username
  );

  //validation
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    // Blur Input
    inputCloseUsername.blur();
    inputClosePin.blur();

    //delete the account
    accounts.splice(closeAccIndex, 1);

    //update Guide
    displayGuide(accounts);

    //updateUI
    transitionOut();
  } else renderError('Incorrect PIN!', errorClose);

  //reset
  resetTimer();
  inputCloseUsername.value = inputClosePin.value = '';
});

///////  Loan Request Functionality  ////////
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // rounded off loan amount
  const loanAmount = Math.floor(inputLoanAmount.value);
  const grantLoan = () => {
    currentAccount.movements.push(loanAmount);
    currentAccount.movementsDates.push(new Date());

    // update UI
    updateUI();

    // Scroll into Movements
    scrollIntoPosition('movements');

    // Popup Message
    displayPopup('Loan was granted successfully,', popupMovement);
  };

  // Validation: User can Loan within 1000% of its maximum Deposit amount
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= 0.1 * loanAmount)
  ) {
    // Blur Input
    inputLoanAmount.blur();

    // 3 Seconds Delay
    setTimeout(grantLoan, 3000);
  } else renderError('Invalid request!', errorLoan);

  //reset
  inputLoanAmount.value = '';
  resetTimer();
});

/***************************** Features ***************************************/

///////  Sort  ////////
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;

  // Scroll into movements in tab-port view
  scrollIntoPosition('movements');
});

/***************************** Popups ***************************************/

///////  Guide ////////
const displayGuide = accounts => {
  containerGuide.innerHTML = '';

  accounts.forEach(account => {
    const accountOwner = account.owner;
    const accountUsername = account.username;
    const accountPIN = account.pin;

    //inserting Movements HTML
    const html = `
  <div class="guide__account">
    <p class="guide__owner">Owner: <span class="guide__data">${accountOwner}</span></p>
    <p class="guide__username">Username: <span class="guide__data">${accountUsername}</span></p>
    <p class="guide__pin">PIN: <span class="guide__data">${accountPIN}</span></p>
  </div>`;

    containerGuide.insertAdjacentHTML('afterbegin', html);
  });
};

///////  Guide Open Button ////////
let opened = true;
btnGuide.addEventListener('click', function (e) {
  e.preventDefault();
  guideDetails.open = opened;
  opened = !opened;
});

///////  Guide Close Button ////////
btnGuideClose.addEventListener('click', function (e) {
  e.preventDefault();
  guideDetails.open = false;
});

/***************************** Initialization *******************************************/

//////// Update Guide ////////
displayGuide(accounts);
