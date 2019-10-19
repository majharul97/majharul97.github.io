var i = 0;
do {
  i++
  console.log(i)
  $('.social').hide(function() {
  $(this).delay(12000).fadeIn(800);
});

$('.rw-sentence')
  .delay(10000)
  .fadeOut(400);
}
while (i <= 10);
