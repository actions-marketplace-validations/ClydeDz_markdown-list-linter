"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const markdown_list_linter_1 = require("markdown-list-linter");
const core_1 = require("@actions/core");
async function run() {
    const markdownFile = (0, core_1.getInput)("file");
    if (!markdownFile) {
        (0, core_1.setFailed)("Markdown file not provided");
        return;
    }
    const result = (0, markdown_list_linter_1.lintMarkdownList)(markdownFile);
    let outputBuilder = '';
    outputBuilder += 'SUMMARY:\n' + result.summary + '\n';
    result.errorObject ? outputBuilder += '\nDETAILS:\n' : undefined;
    result.errorObject?.forEach(error => {
        outputBuilder += error.message + '\n';
        error.details.forEach((errorSections, index) => {
            outputBuilder += '\tSection #' + (index + 1) + '\n';
            errorSections.forEach(errorItem => {
                outputBuilder += '\t\t' + errorItem + '\n';
            });
            outputBuilder += '\n';
        });
    });
    (0, core_1.info)(outputBuilder);
    (0, core_1.debug)('outputBuilder');
    (0, core_1.setOutput)("name", "markdown-list-linter");
    (0, core_1.setOutput)("summary", result.summary);
    (0, core_1.setOutput)("errors", result.errorObject);
}
async function main() {
    try {
        await run();
    }
    catch (error) {
        (0, core_1.setFailed)(error);
    }
}
exports.main = main;
