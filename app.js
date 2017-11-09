  //mic basic setting
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';

// render text to show up
    let p = document.createElement('p');
    const words = document.querySelector('.words');
    words.appendChild(p);

    //map through the result to get transcript only

    recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

// make special symbol for say specific word
        const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
        p.textContent = poopScript;

// checking is ending the converasion, and don't rewrite the previous one.

        if (e.results[0].isFinal) {
          p = document.createElement('p');
          words.appendChild(p);
        }
    });

    recognition.addEventListener('end', recognition.start);

    recognition.start();



//export to PDF

  let doc = new jsPDF();
  let specialElementHandlers = {
      '#editor': function (element, renderer) {
          return true;
      }
  };

  $('.button').click(function () {
    doc.fromHTML($('.words').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('sample.pdf');
});
