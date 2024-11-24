import chalk from "chalk";
import wrapAnsi from "wrap-ansi";

/**
 * Configuration Class
 */
import { Config } from "./config.class.js";
const config = new Config();

/**
 * Command Class
 */
import { Command } from "commander";
const program = new Command();

/* [INSPIRE] */ import inspire from "./commands/inspire.command.js";
/* [CREATE] */ import create from "./commands/create.command.js";

/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *
 *   Chysanthemum Script Kickstarter
 *
 *  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
program
    .name(await config.getCommand())
    .description(chalk.green(wrapAnsi(await config.getDescription(), 65)))
    .version(await config.getVersion());

program.addCommand(inspire);
program.addCommand(create);

if (process.argv.length === 2) {
    config.getBanner(program);
} else {
    program.parse(process.argv);
}
