import { Command } from "commander";
import chalk from "chalk";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const command = new Command("inspire").description(
    "Generate inspiring quotes from a public API."
);

command.action(async () => {
    try {
        const response = await axios.get("https://zenquotes.io/api/random");

        if (response.status !== 200) {
            throw new Error(
                `API request failed with status ${response.status}.`
            );
        }

        const quoteData: { q: string; a: string }[] | null = response.data;
        if (!quoteData || quoteData.length === 0) {
            throw new Error("No quotes found in the response.");
        }

        const { q: quote, a: author } = quoteData[0];
        console.log(chalk.green(`Inspiration ID: ${uuidv4()}`));
        console.log(chalk.blueBright(`"${quote}"`));
        console.log(chalk.magentaBright(`- ${author}`));
    } catch (error) {
        if (error instanceof Error) {
            console.error(chalk.red(`Unexpected Error: ${error.message}`));
        } else {
            console.error(chalk.red("An unknown error occurred."));
        }
    }
});

export default command;
