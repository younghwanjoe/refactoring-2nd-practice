export function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    let thisAmount = amountFor(perf, playFor(perf));
    // 포인트를 적립한다.
    // 추출한 함수를 이용해 값을 누적
    volumeCredits += volumeCreditsFor(perf);
    // 청구 내역을 출력한다.
    result += `  ${playFor(perf).name}: ${usd(thisAmount)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat(
      "en-US",
      // 마지막에 100으로 나누는 로직도 usd함수 안에 이동한다.
      { style: "currency", currency: "USD", minimumFractionDigits: 2 }
    ).format(aNumber / 100);
  }

  function volumeCreditsFor(perf) {
    let volumeCredits = 0;
    volumeCredits += Math.max(perf.audience - 30, 0);
    if ("comedy" === playFor(perf).type)
      volumeCredits += Math.floor(perf.audience / 5);
    return volumeCredits;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case "tragedy": // 비극
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy": // 희극
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.type}`);
    }
    return result; // 함수 안에서 값이 바뀌는 변수 반환
  }
  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
