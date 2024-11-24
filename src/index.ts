import { Command } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import wrapAnsi from "wrap-ansi";

import inspire from "./commands/inspire.js";

const program = new Command();

program
    .name("hero")
    .description(
        chalk.green(
            wrapAnsi("Hero is a boilerplate for developing CLI tools.", 65)
        )
    )
    .version("1.6.0");

program.addCommand(inspire);

const isDefaultCommand = process.argv.length === 2;

if (isDefaultCommand) {
    figlet(
        "Hero Boilerplate",
        {
            font: "cybermedium",
            width: 80,
        },
        (err, data) => {
            if (err) {
                console.log(chalk.red("Something went wrong..."));
                console.dir(err);
                return;
            }
            console.log(chalk.green(data));
            console.log(chalk.red(`\t  DEVELOPED BY SURELLE`));
            program.parse(process.argv);
        }
    );
} else {
    program.parse(process.argv);
}
