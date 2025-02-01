// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LoanRequest.sol";

contract LenderFunding is LoanRequest {
    
    event LoanFunded(uint256 loanId, address lender, uint256 amount);

    function lendFunds(uint256 loanId) public payable {
        Loan storage loan = loans[loanId];

        require(loan.status == LoanStatus.Pending, "Loan request is not open");

        payable(loan.borrower).transfer(msg.value);

        loan.isFunded = true;
        loan.lender = msg.sender;
        loan.status = LoanStatus.Approved;

        
        emit LoanFunded(loanId, msg.sender, msg.value);
    }
}
