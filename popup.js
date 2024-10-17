document.getElementById('analyzeBtn').addEventListener('click', function() {
  chrome.tabs.executeScript(null, { code: `
      function getMetaContent(name) {
          const tag = document.querySelector('meta[name="' + name + '"]');
          return tag ? tag.content : 'Not found';
      }

      var results = {
          title: document.title || 'No title found',
          description: getMetaContent('description'),
          keywords: getMetaContent('keywords'),
          h1: document.querySelector('h1') ? document.querySelector('h1').innerText : 'No H1 tag found',
          imagesWithoutAlt: Array.from(document.images).filter(img => !img.alt).length
          // Add other checks as needed
      };
      results;
  `}, function(results) {
      let result = results[0];
      document.getElementById('titleResult').textContent = result.title;
      document.getElementById('descriptionResult').textContent = result.description;
      document.getElementById('keywordsResult').textContent = result.keywords;
      document.getElementById('h1Result').textContent = result.h1;
      document.getElementById('imageAltResult').textContent = result.imagesWithoutAlt + ' images missing alt text';
      // Update new sections similarly
  });
});
