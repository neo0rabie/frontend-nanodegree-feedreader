/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url are defined', function(){
            for (var property in allFeeds) {
                expect(typeof allFeeds[property].url).toBe('string');
                expect(allFeeds[property].url).not.toBe('');
            }
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function(){
            for (var property in allFeeds) {
                expect(typeof allFeeds[property].name).toBe('string');
                expect(allFeeds[property].name).not.toBe('');
            }
        });
    });

    /* A new test suite for "The menu" */
    describe('The menu', function(){
        /* Test that ensures the menu element is
        * hidden by default.
        */
        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        /* Test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('display and hide when icon is clicked', function(){
            /* First we are going to click our button to test if the menu show's up.
            * Then We are going to click it again to test if it will hide.
            */
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });
    /* Test suite for  "Initial Entries" */
    describe('Initial Entries', function(){
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        //using done for async loadFeed()
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        // We are going to check for .entry class inside .feed class
        it('have loaded', function(done){
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function(){
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var prevContent,
            newContent;
            // To be assigned to the content of new feed.

        // BeforeEach is loaded once before our test is run and done is used for async loadFeed()
        beforeEach(function(done){
            // Grap the text of inside .entery and assign it to a variable
            prevContent = $('.feed a').children('.entry').text();
            // Load a new feed.
            loadFeed(1, done);
        });

        it('should load different content', function(done){
            // Grap the new text after loadFeed done and assign it to a variable
            newContent = $('.feed a').children('.entry').text();

            // expect both our variables prevContent and newContent to be defined and not empty.
            // Both null and undefined values should fail this spec.
            expect(newContent.length && prevContent.length).toBeGreaterThan(0);

            // expect the content will actually change after loading a new feed.
            expect(newContent).not.toBe(prevContent);
            done();
        });

        // Return back to the initial feed after the test is done with afterAll function.
        afterAll(function(){
            loadFeed(0);
        });
    });
}());
