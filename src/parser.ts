import * as fs from 'fs';
import * as yaml from 'yaml';
import * as readlineSync from 'readline-sync';

export async function parseYAML(filePath: string) {
  // Read the YAML file
  const file = fs.readFileSync(filePath, 'utf8');
  
  // Parse the YAML content
  const parsed = yaml.parse(file);

  // Process each step in the workflow
  const workflowStep = parsed.workflow[0];  // Assuming single step for simplicity

  // Extract prompts and requirements
  const prompts = workflowStep.prompt || [];
  const requiredFields = workflowStep.requires || [];

  // Prompt user for the required fields
  const userInput: Record<string, string> = {};

  requiredFields.forEach((field: string, index: number) => {
    if (prompts[index]) {
      const promptMessage = prompts[index].message;
      userInput[field] = readlineSync.question(`${promptMessage}: `);
    }
  });

  // Build the cURL command after collecting inputs
  const curlCommand = buildCurlCommand(workflowStep, userInput);

  return curlCommand;
}

function buildCurlCommand(workflowStep: any, userInput: Record<string, string>): string {
  const { method, url, requires } = workflowStep;
  
  // Construct headers based on required fields
  let headers = '';
  requires.forEach((field: string) => {
    if (userInput[field]) {
      headers += `-H "${field}: ${userInput[field]}" `;
    }
  });

  // Build the full cURL command
  return `${method} ${url} ${headers}`;
}
