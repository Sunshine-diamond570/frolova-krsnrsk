/* Пересчёт координат карты (image map) при изменении размера картинки,
   чтобы области оставались на своих местах на телефоне. */
(function () {
  var img = document.querySelector('img[usemap]');
  if (!img) return;
  var map = document.querySelector('map[name="' + img.useMap.replace('#', '') + '"]');
  var areas = map.querySelectorAll('area');
  var base = [];
  for (var i = 0; i < areas.length; i++) base.push(areas[i].coords.split(',').map(Number));
  var W = Number(img.getAttribute('width'));
  function resize() {
    var k = img.clientWidth / W;
    for (var i = 0; i < areas.length; i++) {
      areas[i].coords = base[i].map(function (c) { return Math.round(c * k); }).join(',');
    }
  }
  window.addEventListener('resize', resize);
  if (img.complete) resize(); else img.addEventListener('load', resize);
})();
