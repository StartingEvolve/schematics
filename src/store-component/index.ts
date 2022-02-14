//@ts-ignore
import { basename, normalize, dirname, Path, strings } from '@angular-devkit/core';
import { apply, chain, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { askPrompt, choosePrompt } from '../utilities/prompt';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function storeComponent(options: any): Rule {
	return async (_tree: Tree, _context: SchematicContext) => {
		
		options.path = '';
        options.name = basename(options.name as Path);
		options.path = normalize('/' + dirname(('src/app/core/store'+'/' + options.name) as Path));
		
		let addMethods = false
		if (options.storeMethods == '') { 
		  	 addMethods = await askPrompt('Do you want to add action methods to your store ?', false);
			if(addMethods) { 
				options.storeMethods = await choosePrompt('Choose a name for your store methods (default : '+ options.name +')', 'default');
			}

	 	}
        // console.log(options);
		const templateSource = apply(
			url('./files'), [
				template({
          ...options,
          ...strings,
		  addMethods,
		  touppercase
        }),
				move(options.path),
			],
		);
        
		return chain([
			mergeWith(templateSource),
		]);
	};
}

export function touppercase(value: string): string {
	return value.toUpperCase();
  }