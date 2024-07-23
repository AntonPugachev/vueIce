const { execSync } = require('child_process');

function runCommand(command) {
    try {
        const output = execSync(command, { stdio: 'inherit' });
        console.log(output.toString());
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        console.error(error.message);
        process.exit(1);
    }
}

function getCommitCount(branchName) {
    try {
        const output = execSync(`git rev-list --count ${branchName}`).toString().trim();
        return parseInt(output, 10);
    } catch (error) {
        console.error(`Error getting commit count for branch: ${branchName}`);
        console.error(error.message);
        process.exit(1);
    }
}

function squashCommitsInPR(branchName) {
    // Step 1: Create a backup branch
    runCommand(`git checkout -b backup-branch-${branchName}`);

    // Step 2: Switch to the target branch
    runCommand(`git checkout ${branchName}`);

    // Step 3: Get the commit count in the branch
    const commitCount = getCommitCount(branchName);

    // Step 4: Start interactive rebase to squash all commits
    runCommand(`git rebase -i HEAD~${commitCount}`);

    console.log("Please edit the opened file to change 'pick' to 'squash' for the appropriate commits, then save and close the editor.");

    // Step 5: Wait for user to complete rebase
    runCommand('git rebase --continue');

    // Step 6: Push the changes back to the branch forcefully
    runCommand(`git push origin ${branchName} --force`);

    console.log("All commits in the PR have been squashed into a single commit.");
}

const branchName = process.argv[2];

if (!branchName) {
    console.error('Usage: node squashPRCommits.js <branchName>');
    process.exit(1);
}

squashCommitsInPR(branchName);
