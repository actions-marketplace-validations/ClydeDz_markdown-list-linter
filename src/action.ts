import { lintMarkdownList } from 'markdown-list-linter'
import {
    getInput,
    setOutput,
    setFailed,
    info,
    debug,
    warning,
    getBooleanInput,
  } from "@actions/core";

async function runMarkdownListLinterAction(): Promise<void> {
    const markdownFile = getInput("file")
    const failOnError = getBooleanInput("fail-on-error")
    debug('outputBuilder1')

    if(!markdownFile) {
        setFailed("Markdown file not provided")
        return
    }

    const result = lintMarkdownList(markdownFile)

    let outputBuilder = ''  
    outputBuilder += 'SUMMARY:\n' + result.summary + '\n'  
    result.errorObject ? outputBuilder += '\nDETAILS:\n' : undefined

    result.errorObject?.forEach(error => {
        outputBuilder += error.message + '\n'
        
        error.details.forEach((errorSections, index) => {      
        outputBuilder +=  '\tSection #' + (index + 1) + '\n'

        errorSections.forEach(errorItem => {
            outputBuilder +=  '\t\t' + errorItem + '\n'
        })

        outputBuilder += '\n'
        })
    })

    info(outputBuilder)    
    setOutput("name", "markdown-list-linter");
    setOutput("summary", result.summary);
    setOutput("errors", result.errorObject);    
    
    if(!result.errorObject) {
      return
    }

    failOnError ? setFailed(result.summary) : warning(result.summary)
}

export async function main(): Promise<void> {
  try {
    await runMarkdownListLinterAction();
  } catch (error: any) {
    setFailed(error);
  }
}

main()