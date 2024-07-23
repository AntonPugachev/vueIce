const readline = require('readline');
const childProcess = require('child_process');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.clear();

const [_, part2] = childProcess.execSync('git status').toString().split('Changes not staged for commit:');
if (!part2) {
  console.log("You don't have any changes");
  process.exit(0);
}
console.log('\x1b[36m%s\x1b[0m', 'Hi, this files have been changed:');
console.log('');
console.log('----------------');

part2.split('\n').forEach((i) => {
  const filesNames = i.split('modified:')[1]?.trim();

  filesNames && console.log('\x1b[32m', filesNames);
});
console.log('\x1b[0m', '----------------');
console.log('');
rl.question('Do you want to ADD it (git add .)? Y/n', function (name) {
  console.log('name', name);
  !name && (name = 'y');
  if (name.toLowerCase() !== 'n') {
    childProcess.execSync('git add .');
    rl.close();
  }
});

rl.on('close', function () {
  console.log(childProcess.execSync('git status').toString());
  console.log('\nSuccess!');
  process.exit(0);
});
