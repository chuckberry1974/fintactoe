var accessToken = 'f4333979e88d483da5e6ada088e6721b'
var subscriptionKey = '88d880e3011c4fada836b1584eb82a05'
var baseUrl = 'https://api.api.ai/v1/'
$(document).ready(function () {
  var button = document.getElementById('showjson')
  document.getElementById('response').style.display = 'none'
  button.addEventListener('click', function(){
    document.getElementById('response').style.display = 'inline'
  })
  // key in and enter data
  $('#input').keypress(function (event) {
    if (event.which === 13) {
      event.preventDefault()
      send()
    }
  })
  // click on rec, need https to prevent browser from asking allow microphone
  $('#rec').click(function (event) {
    switchRecognition()
  })
})
var recognition
function startRecognition () {
  recognition = new webkitSpeechRecognition()
  recognition.onstart = function (event) {
    updateRec()
  }
  recognition.onresult = function (event) {
    var text = ''
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      text += event.results[i][0].transcript
    }
    setInput(text)
    stopRecognition()
  }
  recognition.onend = function () {
    stopRecognition()
  }
  recognition.lang = 'en-US'
  recognition.start()
}

function stopRecognition () {
  if (recognition) {
    recognition.stop()
    recognition = null
  }
  updateRec()
}
// this gets called when click on speak button
function switchRecognition () {
  // check if there is exisiting recognition object
  if (recognition) {
    stopRecognition()
  } else {
    startRecognition()
  }
}
function setInput (text) {
  $('#input').val(text)
  send()
}
function updateRec () {
  $('#rec').text(recognition ? 'Stop' : 'Speak')
}
function send () {
  // get speech input
  var text = $('#input').val()
  $.ajax({
    type: 'POST',
    url: baseUrl + 'query/',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: {
      'Authorization': 'Bearer' + accessToken,
      'ocp-apim-subscription-key': subscriptionKey
    },
    data: JSON.stringify({ q: text, lang: 'en' }),
    success: function (data) {
      var res = JSON.stringify(data, undefined, 2)
      setResponse(res)
      console.log(data.result.parameters.npmIn)
      var code = data.result.parameters.npmIn
      var s = document.createElement('script')
      s.type = 'text/javascript'
      s.appendChild(document.createTextNode(code))
      document.body.appendChild(s)
    },
    error: function () {
      setResponse('Internal Server Error')
    }
  })
}
function setResponse (val) {
  $('#response').text(val)
  return val
}
