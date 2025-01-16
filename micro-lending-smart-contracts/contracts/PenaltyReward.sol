// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LoanRepayment.sol";

contract PenaltyReward is LoanRepayment {
    uint256 public penaltyRate = 10;
    uint256 public rewardRate = 5;

    function enforcePenalty(uint256 loanId) public {
        Loan storage loan = loans[loanId];

        require(!loan.isRepaid, "Loan is already repaid");
        require(loan.repaymentDeadline < block.timestamp, "Loan is not overdue");

        uint256 penaltyAmount = loan.amount * penaltyRate / 100;

        payable(loan.lender).transfer(penaltyAmount);

        loan.status = LoanStatus.Defaulted;
    }

    function rewardLender(uint256 loanId) public {
        Loan storage loan = loans[loanId];

        require(loan.isRepaid, "Loan has not been repaid");

        uint256 rewardAmount = loan.amount * rewardRate / 100;

        payable(loan.lender).transfer(rewardAmount);
    }
}