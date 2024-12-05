// customValidationRules.js

export const validateNPI = (npiNumber) => {
    let cardNo = npiNumber;
    let nDigits = cardNo.length;
    if (nDigits !== 10) {
      return false;
    }
    let nSum = 0;
  
    let counter = 1;
    for (let i = 0; i < nDigits - 1; i++) {
      let d = cardNo[i].charCodeAt() - "0".charCodeAt();
      if (!(counter % 2 === 0)) {
        d = d * 2;
      }
      nSum += parseInt(d / 10, 10);
      nSum += d % 10;
      counter++;
    }
    nSum = nSum + 24;
    let ceilSum = Math.ceil(nSum / 10) * 10;
    let result = ceilSum - nSum;
    if (result === parseInt(cardNo[nDigits - 1])) {
      return true;
    } else {
      return false;
    }
  };
  