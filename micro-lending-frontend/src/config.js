import loanRequest from "./LoanRequest.json";
import loanRepayment from "./LoanRepayment.json";
import lenderFunding from "./LenderFunding.json";


export const lenderFundingContract = {
    address: "0x15A0Eb9CaF66A4BD976e75ce1ce896Fdbb2858B3",
    abi: lenderFunding.abi,
  };

export const loanRequestContract = {
  address: "0x1c8E3dE55cBe2b10f56a4cd79CA660d77Cd79606",
  abi: loanRequest.abi,
};

export const loanRepaymentContract = {
  address: "0xBa1240AE40ba7C98aAfb24358a8C61A40A2c636B",
  abi: loanRepayment.abi,
};
