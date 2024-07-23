'use strict';
console.clear();
const childProcess = require('child_process');

// console.log(childProcess.execSync('git status').toString())
const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim().split('/').slice(-1);

module.exports = {
  askForBreakingChangeFirst: true,
  subjectSeparator: ' ',
  skipQuestions: ['body', 'scope', 'body'],
  messages: {
    type: ' \n____________You want to create commit to ' + branch.toString().toLocaleUpperCase() + '____________\n',
    subject: 'Description:\n',
    confirmCommit: 'Are you sure?',
    breaking: 'Describe your BREAKING CHANGES if any (optional):\n',
  },
  types: [
    {
      name: 'feat:         New feature',
      value: 'feat: [' + branch + '] ',
    },
    {
      name: 'fix:          Bug fixing',
      value: 'fix: [' + branch + '] ',
    },
    {
      name: 'merge:        Merge branches',
      value: 'merge: [' + branch + '] ',
    },
    {
      name: 'refactor:     Refactoring (no functional changes, no api changes)',
      value: 'refactor: [' + branch + ']',
    },
    {
      name: 'codeStyle:    Code style update (formatting, local variables)',
      value: 'codeStyle: [' + branch + ']',
    },
    {
      name: 'unitTests:    Add unit tests',
      value: 'unitTests: [' + branch + ']',
    },
    {
      name: 'e2e-New:      Update UI test automation',
      value: 'e2e-New: [' + branch + ']',
    },
    {
      name: 'e2e-Bug:      tag/untag',
      value: 'e2e-Bug: [' + branch + ']',
    },
    {
      name: 'CI:           Build or CI related changes',
      value: 'CI: [' + branch + ']',
    },
    {
      name: 'doc:          Documentation or README update',
      value: 'doc: [' + branch + ']',
    },
    {
      name: 'other:        Something uncovered',
      value: 'Other: [' + branch + ']',
    },
  ],
};
