$(function() {
  var sampleJobs = [
    "Majharul",
    "Majharul Islam",
    "The Man",
    "The Kitchen Chef"
    "Testing"
  ];

  /* <type text simulation> */
  var currentSampleJob = sampleJobs[0];
  var autoTypingActive = true;
  var transitionDelayTime = 0;
  var sampleJobLength = 0;
  var typingNow = false;
  var sampleJobTimer = 0;
  var timer = null;

  /* <blinking cursor> */
  setInterval(function() {
    if (autoTypingActive) {
      if ($('.search').val().substr(-1) == '|') {
        $('.search').val($('.search').val().substr(0, $('.search').val().length - 1) + ' ');
      } else if ($('.search').val().substr(-1) == ' ') {
        $('.search').val($('.search').val().substr(0, $('.search').val().length - 1) + '|');
      } else {
        $('.search').val($('.search').val() + '|');
      }
    }
  }, 500);
  /* </blinking cursor> */

  /* <let user disable simulator> */
  var prevValue;
  $('.search').bind('focus', function() {
    if (autoTypingActive) {
      $(this).val('');
      clearTimeout(timer);
      autoTypingActive = false;
    }
  });
  $('.search').bind('click keyup', function() {
    if (autoTypingActive) {
      $(this).val('');
      clearTimeout(timer);
      autoTypingActive = false;
    }
    if (prevValue != $(this).val()) {
      //$(this).val(ucfirst($(this).val()));
      prevValue = $(this).val();
    }
  });
  $('.search').bind('blur', function(e) {
    if ($(this).val() == '') {
      sampleJobLength = 0;
      typingNow = false;
      autoTypingActive = true;
      nextSampleJob(true);
    }
  });
  /* </let user disable simulator> */

  /* <typeText> */
  typeText = function() {
      displaySampleJob = currentSampleJob.substr(0, sampleJobLength++);
      if (empty(displaySampleJob)) {
        $('.search').val(' ');
      } else {
        $('.search').val(displaySampleJob);
        //$('.search').focus();
      }
      if (sampleJobLength < currentSampleJob.length + 1) {
        // next letter
        typingNow = true;
        randomMultiplier = 80;
        random = Math.floor(Math.random() * (randomMultiplier * 2));
        timer = setTimeout(typeText, random);
      } else {
        // start backspacing
        sampleJobLength = 0;
        currentSampleJob = '';
        typingNow = false;
        timer = setTimeout(backspaceText, 1250 + 250 * Math.random());
      }
    }
    /* </typeText> */

  /* <backspaceText> */
  backspaceText = function() {
      displaySampleJob = $('.search').val().slice(0, -1);

      /* avoid empty div */
      if (empty(displaySampleJob)) {
        $('.search').val(' ');
      } else {
        $('.search').val(displaySampleJob);
      }

      if (!empty(displaySampleJob)) {
        // backspace again
        randomMultiplier = 80;
        random = Math.floor(Math.random() * (randomMultiplier * 1.5));
        timer = setTimeout(backspaceText, random);
        //$('.search').focus();
      } else {
        // next sampleJob
        nextSampleJob();
      }
    }
    /* </backspaceText> */

  /* <nextSampleJob> */
  nextSampleJob = function(instantly) {
      sampleJobTimer++;
      // if last sampleJob, reset to first
      if (sampleJobTimer > (sampleJobs.length - 1)) {
        sampleJobTimer = 0;
      }
      currentSampleJob = sampleJobs[sampleJobTimer];
      if (instantly) {
        typeText();
      } else {
        timer = setTimeout(typeText, 500);
      }
    }
    /* </nextSampleJob> */

  typeText();

  /* </type text simulation> */
});

function empty(mixed_var) {
  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, '', '0'];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixed_var === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixed_var === 'object') {
    for (key in mixed_var) {
      // TODO: should we check for own properties only?
      //if (mixed_var.hasOwnProperty(key)) {
      return false;
      //}
    }
    return true;
  }

  return false;
}
