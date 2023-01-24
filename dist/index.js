// Project Asif - TODO -App
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
console.clear();
figlet("** TODO LIST **", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(chalk.blue.bgGreen(data));
});
let todoList = [];
async function repeatFlow() {
    let answer = await inquirer.prompt([
        {
            name: "repeat",
            message: "Do you Want to continue",
            type: "list",
            choices: ["Yes", "No"],
        },
    ]);
    return answer.repeat ? true : false;
}
async function todolist() {
    let startAgain = true;
    do {
        let answer = await inquirer.prompt([
            {
                name: "options",
                type: "list",
                choices: ["Add Items", "Display", "Remove Items"],
                message: "What you want to do",
            },
        ]);
        if (answer.options === "Add Items") {
            let item = await inquirer.prompt([
                {
                    message: "Enter new item",
                    name: "newItem",
                    type: "input",
                },
            ]);
            todoList.push(item.newItem);
            console.log(todoList);
            startAgain = await repeatFlow();
        }
        else if (answer.options === "Display") {
            if (todoList.length === 0) {
                console.log(chalk.bgGreen.red.bold("\n\t You do not have any item in your list \n"));
            }
            todoList.forEach((element) => console.log(element));
            startAgain = await repeatFlow();
        }
        else if (answer.options === "Remove Items") {
            if (todoList.length === 0) {
                console.log(chalk.bgGreen.red.bold("\n\t You have already an empty list \n"));
            }
            let removeitem = await inquirer.prompt([
                {
                    name: "remove",
                    type: "input",
                    message: "Which item you want to remove from the list",
                },
            ]);
            let index = todoList.indexOf(removeitem.remove);
            console.log(index);
            startAgain = await repeatFlow();
        }
    } while (startAgain === !false);
}
setTimeout(() => {
    todolist();
}, 2000);
