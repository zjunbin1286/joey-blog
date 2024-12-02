const id = "index.mdx";
						const collection = "docs";
						const slug = "index";
						const body = "\nimport { Card, CardGrid } from '@astrojs/starlight/components';\n\n## Next steps\n\n<CardGrid stagger>\n\t<Card title=\"Update content\" icon=\"pencil\">\n\t\tEdit `src/content/docs/index.mdx` to see this page change.\n\t</Card>\n\t<Card title=\"Add new content\" icon=\"add-document\">\n\t\tAdd Markdown or MDX files to `src/content/docs` to create new pages.\n\t</Card>\n\t<Card title=\"Configure your site\" icon=\"setting\">\n\t\tEdit your `sidebar` and other config in `astro.config.mjs`.\n\t</Card>\n\t<Card title=\"Read the docs\" icon=\"open-book\">\n\t\tLearn more in [the Starlight Docs](https://starlight.astro.build/).\n\t</Card>\n</CardGrid>\n";
						const data = {title:"欢迎来到我的博客",description:"Get started building your docs site with Starlight.",editUrl:true,head:[],template:"splash",hero:{tagline:"该博客记录我的日常学习以及工作中遇到的有趣的问题",image:{alt:"",file:
						new Proxy({"src":"/joey-blog/_astro/houston.CZZyCf7p.webp","width":800,"height":800,"format":"webp","fsPath":"D:/Programs/Astro/joey-blog/src/assets/houston.webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/Programs/Astro/joey-blog/src/assets/houston.webp";
							}
							
							return target[name];
						}
					})
					},actions:[{text:"简单指引",link:"/guides/example/",variant:"primary",icon:{type:"icon",name:"right-arrow"}},{text:"我的 Github",link:"https://github.com/zjunbin1286",variant:"minimal",icon:{type:"icon",name:"external"}}]},sidebar:{hidden:false,attrs:{}},pagefind:true,draft:false};
						const _internal = {
							type: 'content',
							filePath: "D:/Programs/Astro/joey-blog/src/content/docs/index.mdx",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
