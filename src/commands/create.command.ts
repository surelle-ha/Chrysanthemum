import { Command } from "commander";
import ora, { Color } from "ora";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

interface startSpinnerInterface {
    title: string;
    color: Color;
}

interface mockSpinnerInterface extends startSpinnerInterface {
    ttl: number;
    successMessage: string;
}

const startSpinner = (attribute: startSpinnerInterface) => {
    const spinner = ora(attribute.title).start();
    spinner.color = attribute.color;
    return spinner;
};

const mockSpinner = async (attribute: mockSpinnerInterface) => {
    const spinner = ora(attribute.title).start();
    spinner.color = attribute.color;
    await new Promise((resolve) => setTimeout(resolve, attribute.ttl));
    spinner.succeed(chalk.green(attribute.successMessage));
};

const createSchemaYml = () => {
    const schemaData = {
        name: "New Idea",
        description: "Basic schema definition",
        tables: [
            {
                name: "users",
                group: "user_management",
                columns: [
                    { name: "id", type: "integer", primaryKey: true },
                    { name: "username", type: "string", unique: true },
                    { name: "email", type: "string", unique: true },
                ],
            },
            {
                name: "posts",
                group: "user_management",
                columns: [
                    { name: "id", type: "integer", primaryKey: true },
                    {
                        name: "user_id",
                        type: "integer",
                        foreignKey: "users.id",
                    },
                    { name: "title", type: "string" },
                    { name: "content", type: "text" },
                ],
            },
        ],
    };

    const yamlContent = yaml.dump(schemaData);
    const filePath = path.join(process.cwd(), ".schema.yml");

    fs.writeFileSync(filePath, yamlContent, "utf8");
    return filePath;
};

const command = new Command("create")
    .description("Create `.schema.yml` file where schema should be done.")
    .option("-v, --verbose", "Create `.schema.yml` in verbose mode.");

command.action(async (options) => {
    const { verbose } = options;

    const spinner = startSpinner({
        title: "Creating .schema.yml file...",
        color: "blue",
    });

    try {
        const filePath = createSchemaYml();
        spinner.succeed(
            chalk.green(`Schema file created successfully at ${filePath}`)
        );
    } catch (error) {
        spinner.fail(chalk.red("Failed to create the schema file."));
        if (error instanceof Error) {
            console.error(chalk.red(`Unexpected Error: ${error.message}`));
        } else {
            console.error(chalk.red("An unknown error occurred."));
        }
    }
});

export default command;
