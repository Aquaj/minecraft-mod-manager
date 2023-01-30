import { logger, program } from './mmm.js';
import { hasUpdate } from './lib/mmmVersionCheck.js';
import { version } from './version.js';
import chalk from 'chalk';

hasUpdate(version, logger).then((update) => {
  if (update.hasUpdate) {
    logger.log(chalk.bgYellowBright(chalk.black(`There is a new version of MMM available: ${update.latestVersion} from ${update.releasedOn}`)));
    logger.log(chalk.bgYellowBright(chalk.black(`You can download it from ${update.latestVersionUrl}`)));
  }
  program.parse(process.argv);
});

// TODO test the console logs everywhere
