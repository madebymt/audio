  //mic basic setting
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p);


  // map throught the data, grab the transcript only
  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    console.log(transcript)

    p.textContent = transcript

    // don't let the speak rewrite the container
    if (e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
    }
  });

// pause and keep taking will continue the sentence
  recognition.addEventListener('end', recognition.start);
  recognition.start();
