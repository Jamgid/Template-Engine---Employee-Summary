const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = []

function createTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "What type of team member are you?",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "No more employees"
            ]
        }
    ]).then(userChoice => {
        switch(userChoice.memberChoice) {
            case "Manager":
                addManager();
                break;

            case "Engineer":
                addEngineer();
                break;

            case "Intern":
                addIntern();
                break;

            case "No more employees":
                writeOutput();
                break;

            default:
                writeOutput();
        }
    })
}

function addManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is the manager's Name?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the manager's Id?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is the manager's Email?"
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is the manager's Office Number?"
        }
    ]).then(userChoice => {
        console.log(userChoice);

        const manager = new Manager(userChoice.managerName, userChoice.managerId,userChoice.managerEmail,userChoice.managerOfficeNumber)

        employees.push(manager);

        createTeam();
    })
}
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the engineer's Name?"
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is the engineer's Id?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's Email?"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's Github username?"
        }
    ]).then(userChoice => {
        console.log(userChoice);

        const engineer = new Engineer(userChoice.engineerName, userChoice.engineerId,userChoice.engineerEmail,userChoice.engineerGithub)

        employees.push(engineer);

        createTeam();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the intern's Name?"
        },
        {
            type: "input",
            name: "internId",
            message: "What is the intern's Id?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's Email?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "Where did the intern go to school?"
        }
    ]).then(userChoice => {
        console.log(userChoice);

        const intern = new Intern(userChoice.internName, userChoice.internId,userChoice.internEmail,userChoice.internSchool)

        employees.push(intern);

        createTeam();
    })
}

function writeOutput() {

    fs.writeFile(outputPath,render(employees), err => {
        if(err) throw err;
    });
    
    
    
}

createTeam();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
