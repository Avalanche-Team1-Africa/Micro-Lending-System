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

    mapping(uint256 => Loan) = public loans;
    uint256 public loanCount;

    function createLoanRequest(uint256 amount, uint256 interestRate, uint256 repaymentDeadline) public {
        loanCount++;

        loans[loanCount] = Loan({
            amount: _amount;
            interestRate: _interestRate;
            repaymentDeadline: _repaymentDeadline;
            borrower: msg.sender;
            lender: address(0);
            isFunded: false;
            isRepaid: false,
            status: LoanStatus.Pending;
        })
    }

    function getLoanStatus(uint256 loanId) public view returns (string memory) {
        Loan memory loan = loans[loanId];

        if (loan.isRepaid) return "Repaid";
        if (loan.repaymentDeadline < block.timestamp && !loan.isRepaid) return "Defaulted";
        if (loan.isFunded) return "Approved"
        return "Pending";
    }
}