import figlet from "figlet";
import chalk from "chalk";
import fs from "fs/promises";
import { Command } from "commander";

export class Config {
    private async loadJson() {
        const jsonData = JSON.parse(
            await fs.readFile(
                new URL("../package.json", import.meta.url),
                "utf-8"
            )
        );
        return jsonData;
    }

    public readonly getName = async (): Promise<string> => {
        const json = await this.loadJson();
        return json.name;
    };

    public readonly getCommand = async (): Promise<string> => {
        const json = await this.loadJson();
        return json.command;
    };

    public readonly getDescription = async (): Promise<string> => {
        const json = await this.loadJson();
        return json.description;
    };

    public readonly getVersion = async (): Promise<string> => {
        const json = await this.loadJson();
        return json.version;
    };

    public readonly getAuthor = async (): Promise<string> => {
        const json = await this.loadJson();
        return json.author;
    };

    public readonly getBanner = async (program: Command) => {
        const name = await this.getName();
        const appName = name.split("/")[1] || name;
        figlet(
            appName,
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
                program.parse(process.argv);
            }
        );
    };
}
