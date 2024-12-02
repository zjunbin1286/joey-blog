import { F as Fragment, _ as __astro_tag_component__, a as createVNode } from './astro/server_C2fGN4Zk.mjs';
import { $ as $$Image } from './_astro_assets_CeMq0HZu.mjs';
import { $ as $$CardGrid, a as $$Card } from './Code_BI-oDINd.mjs';
import 'clsx';

const frontmatter = {
  "title": "欢迎来到我的博客",
  "description": "Get started building your docs site with Starlight.",
  "template": "splash",
  "hero": {
    "tagline": "该博客记录我的日常学习以及工作中遇到的有趣的问题",
    "image": {
      "file": "../../assets/houston.webp"
    },
    "actions": [{
      "text": "简单指引",
      "link": "/guides/example/",
      "icon": "right-arrow"
    }, {
      "text": "我的 Github",
      "link": "https://github.com/zjunbin1286",
      "icon": "external",
      "variant": "minimal"
    }]
  }
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "next-steps",
    "text": "Next steps"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const {Fragment: Fragment$1} = props.components || ({});
  if (!Fragment$1) _missingMdxReference("Fragment");
  return createVNode(Fragment, {
    children: [createVNode(Fragment$1, {
      "set:html": "<h2 id=\"next-steps\">Next steps</h2>\n"
    }), createVNode($$CardGrid, {
      stagger: true,
      children: [createVNode($$Card, {
        title: "Update content",
        icon: "pencil",
        "set:html": "<p>Edit <code dir=\"auto\">src/content/docs/index.mdx</code> to see this page change.</p>"
      }), createVNode($$Card, {
        title: "Add new content",
        icon: "add-document",
        "set:html": "<p>Add Markdown or MDX files to <code dir=\"auto\">src/content/docs</code> to create new pages.</p>"
      }), createVNode($$Card, {
        title: "Configure your site",
        icon: "setting",
        "set:html": "<p>Edit your <code dir=\"auto\">sidebar</code> and other config in <code dir=\"auto\">astro.config.mjs</code>.</p>"
      }), createVNode($$Card, {
        title: "Read the docs",
        icon: "open-book",
        "set:html": "<p>Learn more in <a href=\"https://starlight.astro.build/\">the Starlight Docs</a>.</p>"
      })]
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
function _missingMdxReference(id, component) {
  throw new Error("Expected " + ("component" ) + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}

const url = "src/content/docs/index.mdx";
const file = "D:/Programs/Astro/joey-blog/src/content/docs/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "D:/Programs/Astro/joey-blog/src/content/docs/index.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
