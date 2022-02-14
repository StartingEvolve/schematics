import { basename, normalize, dirname, Path, strings } from '@angular-devkit/core';
import { apply, chain, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function storeComponent(options: any): Rule {
	return (_tree: Tree, _context: SchematicContext) => {
		
		options.path = '';
        options.name = basename(options.name as Path);
		options.path = normalize('/' + dirname(('src/app/core'+'/' + options.name) as Path));

        console.log(options);
		const templateSource = apply(
			url('./files'), [
				template({
          ...options,
          ...strings,
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