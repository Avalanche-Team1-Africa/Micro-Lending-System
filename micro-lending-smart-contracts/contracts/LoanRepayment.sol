// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LenderFunding.sol";

contract LoanRepayment is LenderFunding {
    function repayLoan(uint256 loanId) public payable {
        Loan storage loan = loans[loanId];

        require(loan.isFunded, "Loan is not funded yet");
        require(msg.sender == loan.borrower, "Only borrower can repay");
        require(msg.value == loan.amount + (loan.amount * loan.interestRate / 100), "Incorrect repayment amount");

        payable(loan.lender).transfer(msg.value);

        loan.isRepaid = true;
        loan.status = LoanStatus.Repaid;
    }
}