import { expect } from "chai";
import { statement } from "../../src/ch1/statementBase.js";
// import { statement } from "../../src/ch1/statementRFT.js";

describe("statement", () => {
  const playsJson = {
    hamlet: { name: "Hamlet", type: "tragedy" },
    "as-like": { name: "As You Like It", type: "comedy" },
    othello: { name: "Othello", type: "tragedy" },
  };

  const invoicesJson = [
    {
      customer: "BigCo",
      performances: [
        {
          playID: "hamlet",
          audience: 55,
        },
        {
          playID: "as-like",
          audience: 35,
        },
        {
          playID: "othello",
          audience: 40,
        },
      ],
    },
  ];

  it("should print a statement for multiple plays, single customer and multiple seats in plain text", () => {
    let expected =
      "청구 내역 (고객명: BigCo)\n" +
      "  Hamlet: $650.00 (55석)\n" +
      "  As You Like It: $580.00 (35석)\n" +
      "  Othello: $500.00 (40석)\n" +
      "총액: $1,730.00\n" +
      "적립 포인트: 47점\n";

    expect(statement(invoicesJson[0], playsJson)).to.equal(expected);
  });
  /*
    it('should print a statement for multiple plays, single customer and multiple seats in html', () => {
        let result  = `<h1>Statement for BigCo</h1>\n`;
        result += "<table>\n";
        result += `<tr><th>play</th><th>seats</th><th>cost</th></tr>  <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n`;
        result += `  <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n`;
        result += `  <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n`;
        result += "</table>\n";
        result += `<p>Amount owed is <em>$1,730.00</em></p>\n`;
        result += `<p>You earned <em>47</em> credits</p>\n`;

        expect(htmlStatement(invoicesJson[0], playsJson)).to.equal(result);
    });
*/
});
