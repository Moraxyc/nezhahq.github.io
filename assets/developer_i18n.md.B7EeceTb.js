import{_ as e,c as t,o,a4 as a}from"./chunks/framework.BmdFiWrL.js";const f=JSON.parse('{"title":"i18n","description":"","frontmatter":{},"headers":[],"relativePath":"developer/i18n.md","filePath":"developer/i18n.md","lastUpdated":1733379391000}'),i={name:"developer/i18n.md"},c=a('<h1 id="i18n" tabindex="-1">i18n <a class="header-anchor" href="#i18n" aria-label="Permalink to &quot;i18n&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>哪吒使用 <a href="https://en.wikipedia.org/wiki/Gettext" target="_blank" rel="noreferrer">gettext</a> 进行 i18n，请确保你对 <code>gettext</code> 有一定了解。</p><p>请使用美国英语编写原始文本。</p><p>如需添加新的文本，请遵循以下步骤：</p><ol start="0"><li>确保使用支持的翻译函数，比如 <code>Localizer.T</code>。</li><li>运行 <code>./script/i18n.sh generate template</code> 生成新模板。</li><li>由于 <code>en_US</code> 文本不再需要翻译，运行 <code>./script/i18n.sh generate en</code> 生成 <code>en_US</code> 文本。</li><li>运行 <code>./script/i18n.sh update</code> 更新所有区域的文本。</li><li>编辑各个区域的 <code>nezha.po</code> 文件，之后运行 <code>./script/i18n.sh compile</code> 编译 <code>mo</code> 文件。</li></ol><p>也可以使用诸如 <code>Poedit</code> 等翻译软件来操作，它们更加方便且几乎不需要命令行操作。</p>',7),d=[c];function r(n,l,s,p,_,h){return o(),t("div",null,d)}const u=e(i,[["render",r]]);export{f as __pageData,u as default};