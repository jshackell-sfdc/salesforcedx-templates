/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { Messages } from '@salesforce/core';
import * as path from 'path';
import * as Generator from 'yeoman-generator';
import { OptionsMap } from '../utils/types';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('salesforcedx-templates', 'messages');

export default class LightningEventGenerator extends Generator {
  constructor(args: string | string[], options: OptionsMap) {
    super(args, options);
    this.sourceRoot(path.join(__dirname, '..', 'templates', 'lightningevent'));
  }
  public writing() {
    const {
      template,
      outputdir,
      eventname,
      apiversion,
      internal
    } = this.options;
    // tslint:disable-next-line:no-unused-expression
    if (!internal) {
      this.fs.copyTpl(
        this.templatePath('_auradefinitionbundle.evt-meta.xml'),
        this.destinationPath(
          path.join(outputdir, eventname, `${eventname}.evt-meta.xml`)
        ),
        {
          eventname,
          apiVersion: apiversion,
          description: messages.getMessage('LightningEventBundle')
        }
      );
    }
    this.fs.copyTpl(
      this.templatePath(`${template}.evt`),
      this.destinationPath(path.join(outputdir, eventname, `${eventname}.evt`)),
      {}
    );
  }
}
