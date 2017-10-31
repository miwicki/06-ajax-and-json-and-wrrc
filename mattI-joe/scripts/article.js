'use strict';

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

// REVIEW: Instead of a global `articles = []` array, let's attach this list of all articles directly to the constructor function. Note: it is NOT on the prototype. In JavaScript, functions are themselves objects, which means we can add properties/values to them at any time. In this case, the array relates to ALL of the Article objects, so it does not belong on the prototype, as that would only be relevant to a single instantiated Article.
Article.all = [];

// COMMENT: Why isn't this method written as an arrow function?
// Because there is a contextual "this" refferring to the article that is being converted to html in every case.
Article.prototype.toHtml = function() {
  let template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  // COMMENT: What is going on in the line below? What do the question mark and colon represent? How have we seen this same logic represented previously?
  // Not sure? Check the docs!
  // We are evaluaing whether publishedOn is true or false, as it can only take in those values.  If it is true, then we will input a string with a template literal that shows the published date.  If publishedOn evaluates as false, then we input a string indicating that it is a draft version of the article.
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

// REVIEW: There are some other functions that also relate to all articles across the board, rather than just single instances. Object-oriented programming would call these "class-level" functions, that are relevant to the entire "class" of objects that are Articles.

// REVIEW: This function will take the rawData, how ever it is provided, and use it to instantiate all the articles. This code is moved from elsewhere, and encapsulated in a simply-named function for clarity.

// COMMENT: Where is this function called? What does 'rawData' represent now? How is this different from previous labs?
// The function is being called on line 50, within the fetchAll function.  rawData represents a parameter (placeholder) for the loadAll function that we are assuming to be a sortable array.
Article.loadAll = rawData => {


let parsed = JSON.parse(rawData);

  parsed.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

  parsed.forEach(articleObject => Article.all.push(new Article(articleObject)))
}

// REVIEW: This function will retrieve the data from either a local or remote source, and process it, then hand off control to the View.
Article.fetchAll = () => {
  // REVIEW: What is this 'if' statement checking for? Where was the rawData set to local storage?
  if (localStorage.rawData) {
    // REVIEW: When rawData is already in localStorage we can load it with the .loadAll function above and then render the index page (using the proper method on the articleView object).

    //TODO: This function takes in an argument. What do we pass in to loadAll()?
    Article.loadAll(localStorage.getItem('rawData'));

    //TODO: What method do we call to render the index page?
    articleView.initIndexPage();
    // COMMENT: How is this different from the way we rendered the index page previously? What the benefits of calling the method here?
    // We are saving loading time by retrieving data from local storage now for every instance instead of having to retrive the data from the original source in every instance.

  } else {
    // TODO: When we don't already have the rawData:
    // - we need to retrieve the JSON file from the server with AJAX (which jQuery method is best for this?)
      // - we need to cache it in localStorage so we can skip the server call next time
    // - we then need to load all the data into Article.all with the .loadAll function above
    // - then we can render the index page
    $.getJSON("./data/hackerIpsum.JSON", function(data) {

        localStorage.setItem('rawData', JSON.stringify(data));
        Article.loadAll(localStorage.getItem('rawData'));
        articleView.initIndexPage();

    });












    // COMMENT: Discuss the sequence of execution in this 'else' conditional. Why are these functions executed in this order?
    // PUT YOUR RESPONSE HERE

    // The sequence of execution in the index page is so because it is the alternative to when the data was never previously loaded.
    // The raw data item is retreieved, then added to local storage, then fetched from localStorage and rendered to the page with the .initIndexpage function.




  }
}
