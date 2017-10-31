![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Lab 06: jQuery AJAX & JSON
===

## Submission Instructions
Follow the submission instructions from Lab 01.

## Resources  
[Ternary Operator MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

## Configuration
_Your repository must include:_

```
06-ajax-and-json-and-wrrc
├── .eslintrc.json
├── .gitignore
├── LICENSE
├── README.md
├── data
│   └── hackerIpsum.json
├── index.html
├── new.html
├── scripts
│   ├── article.js
│   └── articleView.js
├── styles
│   ├── base.css
│   ├── fonts
│   │   ├── icomoon.eot
│   │   ├── icomoon.svg
│   │   ├── icomoon.ttf
│   │   └── icomoon.woff
│   ├── icons.css
│   ├── layout.css
│   └── modules.css
└── vendor
    └── styles
        ├── default.css
        ├── normalize.css
        └── railscasts.css
```

## Feature Tasks

*As a user, I want to be able to load my articles from an external source so that I do not need to keep all of the articles on my local machine.*

- Note: We are using a local JSON file as an emulation of a remote data source that provides JSON.
- Fill in what's needed in article.js, so that all the articles are loaded and rendered, and retrieved with AJAX.
- In index.html, call the appropriate method to kick off the retrieval of data and render the page.

*As a developer, I want to understand the order of execution of my code so that I can better understand its functionality and optimize its efficiency and maintainability.*

- Start by looking over what's new in the codebase. There is a /data folder!
- Make sure to look at all of the `// REVIEW` statements. Practice your code-reading skills.
- There are some `// COMMENT` tasks that focus on the sequence of code execution, so be attentive to that as you read through the code.

*As a developer, I want to load data from a JSON file so that I can practice making AJAX requests.*

- We only need to request the JSON file when we don't already have it, so the conditional check should only do the AJAX call when localStorage doesn't have the rawData yet.


### Stretch Goals
*As a user, I want to be able to request a new copy of my JSON file whenever it is changed so my app is always up-to-date.*

- Coded as above, we won't request a new JSON file if we've already downloaded it once. This caching is problematic: if the JSON file is updated (therefore our cache is "invalid"), a new copy won't be requested from the server unless localStorage is cleared. To overcome this, we could use a small and fast AJAX request with a type of `HEAD`, to request just the headers, and not the contents of the file. The HEAD response will contain a key called "eTag". The value of the eTag header is calculated based on the contents of the file. So if a new article is added (or an existing one is edited even slightly), the eTag will be different.
  - If we cache the eTag, then we can compare our cached version of it with a new eTag check, to determine if we need to get the whole file or not.
  - This can introduce some synchronicity issues, so we'll need to carefully control what methods are calling back to what.

Hint: You'll be able to see everything the server returns, if your AJAX success function looks something like this:

```javascript
function(data, message, xhr) {
  console.log(xhr);
}
```

## Documentation
_Your README.md must include:_

```md
# LAB: Ajax and JSON and WRRC

**Author**: Matt I and Joe W
**Version**: 1.0.0 (increment the patch/fix version number up if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for a Code Fellows 301 class. (i.e. What's your problem domain?) -->
We are getting adjusted to using the jquery abstracted version of Ajax requests in order to pull data and store it in local storage. If the page was previously visited, the data will be retrieved from localstorage, delivering optimal page load speed.


## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
Initialize with a product such as live server in order to test in a proper dynamic page request fashion.

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
The scaffolding of this project separates concerns by storing style files in the style folder, scripts in the script folder, and data assets in the data folder. This keeps things organized and maintainable.



## Change Log
<!-- Use this are to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:
No Changes here, we simply started from starter code given to us this morning. We worked on a development branch and changed computers half way through the projects process.


```
