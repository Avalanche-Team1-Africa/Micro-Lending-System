// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanRequest {
    enum LoanStatus { Pending, Approved, Repaid, Defaulted }

    struct Loan {
        uint256 amount;
        uint256 interestRate;
        uint256 repaymentDeadline;
        address borrower;
        address lender;
        bool isFunded;
        bool isRepaid;
        LoanStatus status;
    }

    mapping(uint256 => Loan) public loans;
    uint256 public loanCount;

    // Declare the event
    event LoanCreated(uint256 loanId, address borrower, uint256 amount, uint256 interestRate, uint256 repaymentDeadline);

    // Function to create a new loan request
    function createLoanRequest(uint256 amount, uint256 interestRate, uint256 repaymentDeadline) public {
        loanCount++;

        loans[loanCount] = Loan({
            amount: amount,
            interestRate: interestRate,
            repaymentDeadline: repaymentDeadline,
            borrower: msg.sender,
            lender: address(0),
            isFunded: false,
            isRepaid: false,
            status: LoanStatus.Pending
        });

        // Emit the LoanCreated event with loan details
        emit LoanCreated(loanCount, msg.sender, amount, interestRate, repaymentDeadline);
    }

    // Function to get the loan status
    function getLoanStatus(uint256 loanId) public view returns (string memory) {
       require(loanId > 0 && loanId <= loanCount, "Loan does not exist"); 
        Loan memory loan = loans[loanId];

        if (loan.isRepaid) return "Repaid";
        if (loan.repaymentDeadline < block.timestamp && !loan.isRepaid) return "Defaulted";
        if (loan.isFunded) return "Approved";
        return "Pending";
    }
}

