import chalk from 'chalk';
import { MockServerData } from '../../shared/types/index.js';
import { Command } from './command.interface.js';
import got from 'got';
import { TSVRentGenerator } from '../../shared/libs/rent-generator/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string): Promise<void> {
    try {
      this.initialData = await got.get(url).json();
    } catch (err) {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filePath: string, rentCount: number): Promise<void> {
    const tsvRentGenerator = new TSVRentGenerator(this.initialData);
    const tsvFileWrite = new TSVFileWriter(filePath);
    for(let i = 0; i < rentCount; i++) {
      await tsvFileWrite.write(tsvRentGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filePath, url] = parameters;
    const rentCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filePath, rentCount);
      console.info('file was successfully created');
    } catch (err) {
      console.error(chalk.red('Can\'t generate data'));

      getErrorMessage(err);
    }
  }
}
