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
  describe('RSS Feeds', function() {
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    it('have URLs that are defined and not empty', function() {
      let url;

      for (let i = 0; i < allFeeds.length; i++) {
        url = allFeeds[i].url;
        expect(url).toBeDefined();
        expect(url).not.toBeNull();
        expect(url).not.toBe('');
      }
    });

    it('have names that are defined and not empty', function() {
      let url;

      for (let i = 0; i < allFeeds.length; i++) {
        name = allFeeds[i].name;
        expect(name).toBeDefined();
        expect(name).not.toBeNull();
        expect(name).not.toBe('');
      }
    });
  });

  describe('The menu', function() {
    it('is hidden by default', function() {
      let hidden = $('body').hasClass('menu-hidden');
      expect(hidden).toBe(true);
    });

    it('becomes visible when menu icon is clicked and invisible when clicked again', function() {
      let hidden;

      // trigger click
      $('.menu-icon-link').click();
      hidden = $('body').hasClass('menu-hidden');

      // is menu visible?
      expect(hidden).toBe(false);

      // trigger click
      $('.menu-icon-link').click();
      hidden = $('body').hasClass('menu-hidden');

      // is menu hidden?
      expect(hidden).toBe(true);
    });
  });

  describe('Initial Entries', function() {

    // Call loadFeed and wait for request to finish
    beforeEach(function(done) {
      const el = $('.feed-list a')[0];
      const id = $(el).data('id');

      loadFeed(id, function() {
        done();
      });
    });

    it('has initial entries', function(done) {
      const numberOfEntries = $('.feed .entry').length;
      expect(numberOfEntries).not.toBe(0);
      done();
    });
  });

  describe('New Feed Selection', function() {
    // Init variables to store old and new HTML for feed
    let HTMLoriginal,
        HTMLnew;

    // Call loadFeed and wait for request to finish
    beforeEach(function(done) {
      HTMLoriginal = $('.feed').html();

      const el = $('.feed-list a')[2];
      const id = $(el).data('id');

      loadFeed(id, function() {
        HTMLnew = $('.feed').html();
        done();
      });
    });

    it('changes when feed is selected', function(done) {
      expect(HTMLnew).not.toBe(HTMLoriginal);
      done();
    });
  });
}());
