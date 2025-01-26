import loanRequest from "./LoanRequest.json";
import loanRepayment from "./LoanRepayment.json";
import lenderFunding from "./LenderFunding.json";


export const lenderFundingContract = {
    address: "0x9603f537E72a37Fa4e4195fa1c3c370E0B3C6E74",
    abi: lenderFunding.abi,
  };

export const loanRequestContract = {
  address: "0x8110Ae08974B018A8091C6fbF8de02e0618FDbf5",
  abi: loanRequest.abi,
};

export const loanRepaymentContract = {
  address: "0xbB73CBc62aB3B9d892F6091023CcF72832bFc5E8",
  abi: loanRepayment.abi,
};
