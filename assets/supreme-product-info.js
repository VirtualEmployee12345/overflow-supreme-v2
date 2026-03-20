/* Supreme-style product info injection
   Adds title + price/sold-out below each product card.
   Uses aria-label for title, overlay presence for availability.
   Fetches collection JSON for prices. */
(function() {
  var cards = document.querySelectorAll('.supreme-product-card');
  if (!cards.length) return;

  /* Phase 1: inject titles + sold-out from DOM (instant, no fetch) */
  var handles = [];
  cards.forEach(function(card) {
    var li = card.closest('.grid__item');
    if (!li || li.querySelector('.supreme-product-card__info')) return;
    var title = card.getAttribute('aria-label') || '';
    var isSoldOut = !!card.querySelector('.supreme-product-card__sold-out-overlay');
    var href = card.getAttribute('href') || '';
    var handle = href.replace('/products/', '');

    var info = document.createElement('div');
    info.className = 'supreme-product-card__info';
    info.setAttribute('data-handle', handle);

    var titleSpan = document.createElement('span');
    titleSpan.className = 'supreme-product-card__title';
    titleSpan.textContent = title;
    info.appendChild(titleSpan);

    if (isSoldOut) {
      var soldOut = document.createElement('span');
      soldOut.className = 'supreme-product-card__sold-out-label';
      soldOut.textContent = 'sold out';
      info.appendChild(soldOut);
    }

    li.appendChild(info);
    if (!isSoldOut) handles.push(handle);
  });

  /* Phase 2: fetch prices for available products */
  if (!handles.length) return;
  var path = window.location.pathname;
  function fetchPage(pg) {
    fetch(path + '.json?page=' + pg + '&limit=250')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var products = data.products || [];
        products.forEach(function(p) {
          if (!p.available) return;
          var info = document.querySelector('.supreme-product-card__info[data-handle="' + p.handle + '"]');
          if (!info || info.querySelector('.supreme-product-card__price')) return;
          var priceSpan = document.createElement('span');
          priceSpan.className = 'supreme-product-card__price';
          priceSpan.textContent = '$' + (parseFloat(p.variants[0].price)).toFixed(2);
          info.appendChild(priceSpan);
        });
        if (products.length >= 30 && pg < 5) fetchPage(pg + 1);
      })
      .catch(function() {});
  }
  fetchPage(1);
})();
