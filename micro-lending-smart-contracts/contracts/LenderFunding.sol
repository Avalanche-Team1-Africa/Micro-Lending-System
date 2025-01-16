// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LoanRequest.sol";

contract LenderFunding is LoanRequest {
    function lendFunds(uint256 loanId) public payable {
        Loan storage loan = loans[loanId];

        require(loan.status == LoanStatus.Pending, "Loan request is not open" );
        require(msg.value == loan.amount, "Incorrect funding amount");

        payable(loan.borrower).transfer(msg.value);

        loan.isFunded = true;
        loan.lender = msg.sender;
        loan.status = LoanStatus.approved;
    }
}