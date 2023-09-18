// 1. Deposit some money
// 2. Determine the number of lines to bet
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again
const prompt = require("prompt-sync")();

//  all import and libraries -> global variables -> classses and fucntion -> main lines or other aspect of the code
// any global var practice must using capital letter
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ")
        // convert to number type
        const numberDepositAmount = parseFloat(depositAmount);
        
        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again")
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ")
        // convert to number type
        const numberOfLines = parseFloat(lines);
        
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again")
        } else {
            return numberOfLines;
        }
    }
};

// bet is based on balance, we put it as reference..so we can determine how much balance
const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the total bet: ")
        // convert to number type
        const numberBet = parseFloat(bet);
        
        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again")
        } else {
            return numberBet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i=0; i<count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [[], [], []];
    for (let i = 0; i < COLS; i++) {
        const reelSymbols = [...symbols];
        for (let j = 0; j <ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            // adding and remove used symbol
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const reels = spin();
console.log(reels);
let balance = deposit();
const numberOfLines = getNumberOfLines();
const numberBet = getBet(balance, numberOfLines);