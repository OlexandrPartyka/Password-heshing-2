const readline = require('readline');
const bcrypt = require('bcrypt');

// Function to hash a password
async function hashPassword(password) {
    try {
        // Generate a salt with a complexity of 10
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the generated salt
        const hash = await bcrypt.hash(password, salt);

        return hash;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to get user input for password
function getPasswordFromUser() {
    return new Promise((resolve, reject) => {
        rl.question('Enter your password: ', (password) => {
            rl.close();
            resolve(password);
        });
    });
}

// Main function
async function main() {
    try {
        // Get password from user input
        const password = await getPasswordFromUser();

        // Hash the password
        const hashedPassword = await hashPassword(password);
        console.log('Hashed password:', hashedPassword);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run main function
main();