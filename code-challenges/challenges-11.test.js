'use strict';

/* ------------------------------------------------------------------------------------------------
CHALLENGE 1 - Review

Write a function that iterates over an array of people objects
and creates a new list of each person's full name using the array method 'map'.
Each object will have the shape {firstName:string, lastName:string}
E.g. [ { firstName:"Jane", lastName:"Doe" }, { firstName:"James", lastName:"Bond"}]
should convert to ["Jane Doe", "James Bond"]
Note the space in between first and last names.
You can assume that neither firstName nor lastName will be blank
------------------------------------------------------------------------------------------------ */
const toLastNames = people => {
  // Solution code here...
  const nameArr = people.map(person => `${person.firstName} ${person.lastName}`);
  return (nameArr);
};

/* ------------------------------------------------------------------------------------------------
CHALLENGE 2

Write a function named validatePin that uses a regular expression pattern to validate a PIN.

If the PIN is four numerical digits long, return true. Otherwise, return false.
------------------------------------------------------------------------------------------------ */

const validatePin = (pin) => {
  // Solution code here...
  const stringifiedPin = pin.toString();
  const pinValidator = /\^d{4}$/gm;
  const pinChecker = stringifiedPin.match(pinValidator);
  if (pinChecker) {
    return true;
  } else {
    return false;
  }
};

// the trick here is to convert the input, which is a number, to a string type

/* ------------------------------------------------------------------------------------------------
CHALLENGE 3

Write a function named validateEmail that takes in an email address and validates it based
on several rules:
  - one word, or two words separated by a period, before the @ symbol
  - can contain numbers
  - can have any of the following top-level domains: .net, .com, or .org
  - no other special characters
  - no subdomains, ports, etc: must be of the form name@place.com, not name@sub.place.com:3000

Return either true or false.

Note: if you ever need to validate an email using a regex in practice, the Internet has the actual regex you should use. It's many many lines long.
------------------------------------------------------------------------------------------------ */

const validateEmail = (email) => {
  // Solution code here...
  const regex = /^\w+?(.\w+)(@)\w+((.com)|(.net)|(.org))\b/gm;
  const emailChecker = email.match(regex);
  if (emailChecker) {
      return true;
    } else {
      return false;
    }
  };

// closest I can get building from scratch: (\w+.{1}\w+)\b@(\w+\.{1}\w+)
// Received help from TA (Adrian H.): /^\w+?(.\w+)(@)\w+((.com)|(.net)|(.org))\b/gm

/* ------------------------------------------------------------------------------------------------
CHALLENGE 4

Write a function named validatePhoneNumber that accepts a phone number and determines if it is valid.

Acceptable formats include:
 - (555) 555-5555
 - (555)555 5555
 - 555 555-5555
 - 555-5555555
 - 555-555 5555
 - 555-555-5555
 - 555 555 5555
 - 555555-5555
 - 5555555555

Your function should include a single regular expression pattern that matches any of these formats.

Return either true or false.
------------------------------------------------------------------------------------------------ */

const validatePhoneNumber = (phoneNumber) => {
  // Solution code here...
  const regex = /^(\(([0-9]{3})\)|([0-9]{3}))[-|\s]?([0-9]{3})[-|\s]?([0-9]{4})$/gm;
  const phoneNumberChecker = phoneNumber.match(regex);
  if (phoneNumberChecker) {
    return true;
  } else {
    return false;
  }
};

// version 4: /^(\(([0-9]{3})\)|([0-9]{3}))[-|\s]?([0-9]{3})[-|\s]?([0-9]{4})$/gm
//verson 3: /^\(?([0-9]{3})\)?[-|\s]?([0-9]{3})[-|\s]?([0-9]{4})$/gm (referenced from: https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s02.html)
//version 2: ^(((\d\d\d))|\d\d\d)(\s|-)?(\d\d\d)(\s|-)?(\d\d\d\d) -- best option, catches everything except the (xxx) xxx-xxxx format
//version 1: ((?:\(\d+\)+\s\d+\-\d+) or \d+(?:-|\s|\))

// key takeaways for using regex:
// use parenthesis to group arguments that you want to focus/capture
// breakdown the target/search into sections that can be placed into parenthesis
// use ^ (beginning) and $ (ending) to to guardrail the target search (e.g. useful when using /d{4} to limit the number to that specific amount - in this example '4' digits) -- ensure that ^ and $ are used with the /gm ending tag (not just /g)
// when testing using regex tools, use / /gm (global and multiline) to use ^ and $ (at the start and ending, respectively), if there is multiple test scenarios being tested -- to put it more simply, put each test scenario on each individual line and then use /gm (not /g) for the post script setting.
// ? = different than (?:), it looks at the previous argument and asks a 0 or 1 (boolean) (e.g. whether the argument is true or not -- \(\d{3}\)? accepts BOTH (555) and (555 because it's asking to take situations where there exists the closing parenthesis and ones without it.)


/* ------------------------------------------------------------------------------------------------
CHALLENGE 5 - Stretch Goal

Write a function named findTagNames that iterates over an array of HTML strings and uses a regular expression pattern to return the closing tags.

For example, findTagNames(['<h1>Hello, world!</h1>', '<p>Welcome to my site</p>']) returns ['/h1', '/p'].
findTagNames(['<div><h1>Hello, world!</h1></div>', '<p>Welcome to my site</p>']) returns ['/h1', '/div', '/p'].
------------------------------------------------------------------------------------------------ */

const findTagNames = elements => {
  // Solution code here...
};

/* ------------------------------------------------------------------------------------------------
TESTS

All the code below will verify that your functions are working to solve the challenges.

DO NOT CHANGE any of the below code.

Run your tests from the console: jest solutions-11.test.js
------------------------------------------------------------------------------------------------ */

describe('Testing challenge 1', () => {
  test('It should convert object to full name string', () => {

    const people = [{ firstName: "Jane", lastName: "Doe" }, { firstName: "James", lastName: "Bond" }];

    expect(toLastNames(people)).toStrictEqual(["Jane Doe", "James Bond"]);

  });
});

describe('Testing challenge 2', () => {
  test('It should validate a PIN of exactly four digits', () => {
    expect(validatePin(1234)).toBeTruthy();
    expect(validatePin(123)).toBeFalsy();
    expect(validatePin(12345)).toBeFalsy();
    expect(validatePin('abcd')).toBeFalsy();
    expect(validatePin('7890')).toBeTruthy();
    expect(validatePin('0789')).toBeTruthy();
    expect(validatePin(789)).toBeFalsy();
    expect(validatePin('0000')).toBeTruthy();
  });
});

describe('Testing challenge 3', () => {
  test('It should match a basic email', () => {
    expect(validateEmail('joe@codefellows.com')).toBeTruthy();
  });

  test('It should match if the email contains a period', () => {
    expect(validateEmail('joe.schmoe@codefellows.net')).toBeTruthy();
  });

  test('It should match if the email contains other top-level domains', () => {
    expect(validateEmail('joe@codefellows.org')).toBeTruthy();
  });

  test('It should match if the email contains a period and other top-level domains', () => {
    expect(validateEmail('joe.schmoe@codefellows.net')).toBeTruthy();
  });

  test('It should fail things that aren\'t email addresses', () => {
    expect(validateEmail('justastring')).toBeFalsy();
    expect(validateEmail('missing@adomain')).toBeFalsy();
    expect(validateEmail('@noname.com')).toBeFalsy();
    expect(validateEmail('.@noname.com')).toBeFalsy();
    expect(validateEmail('nolastname.@sadness.net')).toBeFalsy();
    expect(validateEmail('canadaisnotreal@canada.ca')).toBeFalsy();
    expect(validateEmail('missing.atsymbol.net')).toBeFalsy();
    expect(validateEmail('looksgood@sofar.comohnowaitthisisbad')).toBeFalsy();
    expect(validateEmail('no.middle.names@foryou.com')).toBeFalsy();
  });
});

describe('Testing challenge 4', () => {
  test('It should match the acceptable phone number formats', () => {
    expect(validatePhoneNumber('(555) 555-5555')).toBeTruthy();
    expect(validatePhoneNumber('555 555-5555')).toBeTruthy();
    expect(validatePhoneNumber('555-555-5555')).toBeTruthy();
    expect(validatePhoneNumber('555 5555555')).toBeTruthy();
    expect(validatePhoneNumber('5555555555')).toBeTruthy();
    expect(validatePhoneNumber('234 567 8910')).toBeTruthy();
  });
  test('It should not match unacceptable phone number formats', () => {
    expect(validatePhoneNumber('abcdefghij')).toBeFalsy();
    expect(validatePhoneNumber('222 222 2222 ext. 2222')).toBeFalsy();
    expect(validatePhoneNumber('(222 222-2222')).toBeFalsy();
    expect(validatePhoneNumber('222 222-2222-')).toBeFalsy();
    expect(validatePhoneNumber('(222 222- 2222')).toBeFalsy();
    expect(validatePhoneNumber('(222 222 -2222')).toBeFalsy();
    expect(validatePhoneNumber('523 555--5555')).toBeFalsy();
    expect(validatePhoneNumber('55555555555')).toBeFalsy();
    expect(validatePhoneNumber('55555555555')).toBeFalsy();
    expect(validatePhoneNumber('55555555555')).toBeFalsy();
    expect(validatePhoneNumber('55_55_5555')).toBeFalsy();
  });
});

xdescribe('Testing challenge 5', () => {
  test('It should return the closing tags', () => {
    expect(findTagNames(['<h1>Hello, world!</h1>', '<p>Welcome to my site</p>'])).toStrictEqual(['/h1', '/p']);
  });
  test('It should work if there are multiple closing tags in a single string', () => {
    expect(findTagNames(['<div><h1>Hello, world!</h1></div>', '<p>Welcome to my site</p>'])).toStrictEqual(['/h1', '/div', '/p']);
  });
});
