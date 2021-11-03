/* A Javascript program to evaluate a given
	expression where tokens
	are separated by space.
	*/

const calculate = (expression) => {
	function hasPrecedence(op1, op2) {
		if (op2 == "(" || op2 == ")") {
			return false;
		}
		if ((op1 == "*" || op1 == "/") && (op2 == "+" || op2 == "-")) {
			return false;
		} else {
			return true;
		}
	}
	function applyOp(op, b, a) {
		switch (op) {
			case "+":
				if (a === undefined) return b;

				return a + b;
			case "-":
				// console.log("a,b = ", a, b);
				if (a === undefined) return -b;

				return a - b;
			case "*":
				return a * b;
			case "/":
				if (b == 0) {
					return Infinity;
					throw "Cannot divide by zero";
				}
				return parseFloat(a / b, 10);
		}
		return 0;
	}
	let tokens = expression.split("");

	// Stack for numbers: 'values'
	let values = [];

	// Stack for Operators: 'ops'
	let ops = [];

	for (let i = 0; i < tokens.length; i++) {
		// Current token is a whitespace, skip it
		if (tokens[i] == " ") {
			continue;
		}

		// Current token is a number,
		// push it to stack for numbers
		if (tokens[i] >= "0" && tokens[i] <= "9") {
			let sbuf = "";

			// There may be more than
			// one digits in number

			while (
				i < tokens.length &&
				((tokens[i] >= "0" && tokens[i] <= "9") || tokens[i] == ".")
			) {
				sbuf = sbuf + tokens[i++];
			}
			values.push(parseFloat(sbuf, 10));

			// Right now the i points to
			// the character next to the digit,
			// since the for loop also increases
			// the i, we would skip one
			// token position; we need to
			// decrease the value of i by 1 to
			// correct the offset.
			i--;
		}

		// Current token is an opening
		// brace, push it to 'ops'
		else if (tokens[i] == "(") {
			ops.push(tokens[i]);
		}

		// Closing brace encountered,
		// solve entire brace
		else if (tokens[i] == ")") {
			while (ops[ops.length - 1] != "(") {
				let result = applyOp(ops.pop(), values.pop(), values.pop());
				if (result === Infinity) return Infinity;

				values.push(result);
			}
			ops.pop();
		}

		// Current token is an operator.
		else if (
			tokens[i] == "+" ||
			tokens[i] == "-" ||
			tokens[i] == "*" ||
			tokens[i] == "/"
		) {
			// While top of 'ops' has same
			// or greater precedence to current
			// token, which is an operator.
			// Apply operator on top of 'ops'
			// to top two elements in values stack
			while (ops.length > 0 && hasPrecedence(tokens[i], ops[ops.length - 1])) {
				values.push(applyOp(ops.pop(), values.pop(), values.pop()));
			}

			// Push current token to 'ops'.
			ops.push(tokens[i]);
		}
	}

	// Entire expression has been
	// parsed at this point, apply remaining
	// ops to remaining values
	while (ops.length > 0) {
		values.push(applyOp(ops.pop(), values.pop(), values.pop()));
	}

	// Top of 'values' contains
	// result, return it
	return values.pop();
};

// Returns true if 'op2' has
// higher or same precedence as 'op1',
// otherwise returns false.

// A utility method to apply an
// operator 'op' on operands 'a'
// and 'b'. Return the result.

export default calculate;
// document.write(evaluate("10 + 2 * 6") + "</br>");
// document.write(evaluate("100 * 2 + 12") + "</br>");
// document.write(evaluate("100 * ( 2 + 12 )") + "</br>");
// document.write(evaluate("100 * ( 2 + 12 ) / 14") + "</br>");

// This code is contributed by decode2207.
