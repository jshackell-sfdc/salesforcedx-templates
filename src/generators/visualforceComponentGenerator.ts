/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import * as path from 'path';
import * as Generator from 'yeoman-generator';
import { OptionsMap } from '../utils/types';

export default class VisualforceComponentGenerator extends Generator {
  constructor(args: string | string[], options: OptionsMap) {
    super(args, options);
    this.sourceRoot(
      path.join(__dirname, '..', 'templates', 'visualforcecomponent')
    );
  }

  public writing() {
    const {
      template,
      outputdir,
      label,
      apiversion,
      componentname
    } = this.options;
    this.fs.copyTpl(
      this.templatePath(`${template}.component`),
      this.destinationPath(path.join(outputdir, `${componentname}.component`)),
      {}
    ),
      this.fs.copyTpl(
        this.templatePath('_component.component-meta.xml'),
        this.destinationPath(
          path.join(outputdir, `${componentname}.component-meta.xml`)
        ),
        { vfLabel: label, apiVersion: apiversion }
      );
  }
}
