import * as inquirer from 'inquirer';
import { isTTY } from './tty';

export async function askPrompt(
  message: string,
  defaultResponse: boolean,
  noTTYResponse?: boolean,
): Promise<boolean> {
  if (!isTTY()) {
    return noTTYResponse ?? defaultResponse;
  }

  const question: inquirer.Question = {
    type: 'confirm',
    name: 'confirmation',
    prefix: '',
    message,
    default: defaultResponse,
  };

  const answers = await inquirer.prompt([question]);

  return answers['confirmation'];
}

export async function choosePrompt(
    message: string,
    defaultResponse: string,
  ): Promise<string> {
    
    const question: inquirer.Question = {
      type: 'input',
      name: 'choice',
      prefix: '',
      message,
      default: defaultResponse,
    };
  
    const answers = await inquirer.prompt([question]);
  
    return answers['choice'];
  }
  
