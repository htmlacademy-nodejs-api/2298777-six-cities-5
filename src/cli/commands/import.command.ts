import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import chalk from 'chalk';
import { getErrorMessage, createRent } from '../../shared/helpers/index.js';

export class ImportCommand implements Command {

  private onImportedLine(line: string) {
    const rent = createRent(line);
    console.info(rent);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows was imported`);
  }


  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;

    if (!filename) {
      console.error(chalk.red('no files provided'));
    }

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (err) {
      console.error(`Can't import data from file: ${filename}`);
      getErrorMessage(err);
    }
  }
}
