#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import commander_1 from "commander";
import { parseYAML } from "./parser";

const program = new commander_1.Command();
program
    .name("curlgen")
    .description("Generate guaranteed working cURL commands for APIs.")
    .version("1.0.0");

program
    .command("generate")
    .description("Generate a cURL command for an API endpoint.")
    .option("-f, --file <file>", "Path to the API YAML file")
    .action(async (options) => {
        const file = options.file || "./apis/openapi.yaml";  // Default YAML file
        const command = await parseYAML(file); // Parse the YAML and generate cURL
        console.log("Generated cURL command:");
        console.log(command);  // Print the generated command to the console
    });

program.parse(process.argv);
