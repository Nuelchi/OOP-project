class Account {
    #balance
    constructor(accountNumber, balance, accountHolder){
        this.accountNumber = accountNumber
        this.#balance = balance
        this.accountHolder = accountHolder

    }
    

    //method to deposit money
    depositMoney(amount){
        if(amount > 0){
            this.#balance += amount;
            console.log(`Deposited $${amount}. New balance: $${this.#balance}`);
        } else{
            console.log("amount cannot be negative");
        }
    }

   //method to check account balance
   checkBalance(){
    return this.#balance;
    }


    _setBalance(newBalance) {
        this.#balance = newBalance;
    }

}


// Subclasses for different types of bank Account

//SAVING ACCOUNT
class savingsAccount extends Account{
    static minimumBalance = 500;
    static interestRate = 0.05;

    constructor(accountNumber, balance = 0, accountHolder) {
        super(accountNumber, balance, accountHolder);
        if (this.checkBalance() < savingsAccount.minimumBalance) {
            throw new Error(`Initial balance for Savings Account must be at least $${SavingsAccount.MINIMUM_BALANCE}`);
        }
      }

    withdraw(amount) {
        if (amount <= 0) {
            console.log("Withdrawal amount must be positive.");
        } else if (this.checkBalance() - amount < savingsAccount.minimumBalance) {
            console.log(`Cannot withdraw $${amount}. Savings Account requires a minimum balance of $${savingsAccount.minimumBalance}.`);
        } else {
            this._setBalance(this.checkBalance() - amount);
            console.log(`Withdrew $${amount}. New balance: $${this.checkBalance()}`);
        }
    }    
      
      
    //calculate Interest method
    calculateInterest(){
        let myBalance = this.checkBalance() + this.checkBalance() * savingsAccount.interestRate;
        console.log(`The savings Account interest rates adds up to $${myBalance} at ${savingsAccount.interestRate * 100}% per annum`);
      }
}


//CHECKING ACCOUNT
class CheckingAccount extends Account{
    static overDraftLimit = -100;

    constructor(accountNumber, balance = 0, accountHolder) {
        super(accountNumber, balance, accountHolder);
      }
      
      withdraw(amount) {
        if (amount <= 0) {
            console.log("Withdrawal amount must be positive.");
        } else if (this.checkBalance() - amount < CheckingAccount.overDraftLimit) {
            console.log(`Cannot withdraw ${amount}. Checking Account overdraft limit of $${CheckingAccount.overDraftLimit} exceeded.`);
        } else {
            this._setBalance(this.checkBalance() - amount);
            console.log(`Withdrew $${amount}. New balance: $${this.checkBalance()}`);
        }
    }
}



//RUNNING THE BANK SYSTEM PROGRAM
const savings = new savingsAccount("SA123", 1000, "John Doe");
const checking = new CheckingAccount("CA456", 500, "Jane Smith");


// Creating a Savings Account with a minimum balance of $1000
console.log("----SAVINGS ACCOUNT----");
console.log("Saving Initial Account Balance:", savings.checkBalance())
savings.depositMoney(200);
savings.calculateInterest();
savings.withdraw(300);
console.log("Savings Account Balance:", savings.checkBalance());
savings.withdraw(500); // Will exceed minimum balance limit and then throws error
console.log("Savings Account Balance:", savings.checkBalance());


// Creating a Checking Account with an overdraft limit of -100 and a balance of $500
console.log("----CHECKING ACCOUNT----")
console.log("Checking Initial Account Balance:", checking.checkBalance());
checking.depositMoney(100);
checking.withdraw(550); // Allowed within overdraft limit
checking.withdraw(100)
checking.withdraw(200); // Will exceed overdraft limit then throws error
console.log("Checking Account Balance:", checking.checkBalance());