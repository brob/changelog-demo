const { EleventyRenderPlugin } = require("@11ty/eleventy");
const markdownIt = require("markdown-it");


module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(EleventyRenderPlugin)


    // Add above your Eleventy config

    // Add within your config module
    const md = new markdownIt({
    html: true,
    });

    eleventyConfig.addFilter("markdown", (content) => {
    return md.render(content);
    });


}