var sdkInitiated = false
function onProgress(progress) {
  console.log(progress)
  console.log('progress')
  console.log(progress.status)
}

function onSuccess(response) {
  sessionStorage.setItem('belobaba@documentUuid', response.documentUuid)

  if (response.status === 'DOCUMENTS_UPLOADED') {
    clearSession()
  }
}

function onError(error) {
  console.log(error)
  console.log('error')
}

var config = {
  onProgress: onProgress, //callback method for reading the progress status
  onSuccess: onSuccess, //callback method to read the success response
  onError: onError, //callback method to read the error response
  qrCodeNeeded: true,
  dataMandatory: true,
}

function start() {
  if (sdkInitiated) {
    clearSession()
  }

  devicer.run({
    publicKey: `${window.SDK_ID}`,
    userConsent: true,
    context: 'signup'
  }, function(response) {
    console.log("DeviceRisk Response ======: "+JSON.stringify(response));

    if (response.sessionId !== "") {
      sessionStorage.setItem('belobaba@deviceId', response.sessionId)
    }
  })

  SocureInitializer.init(window.SDK_ID).then(lib => {
    lib.init(window.SDK_ID, '#websdk', config).then(function () {
      lib.start(1).then(
        function (response) {
          console.log(response)
          sdkInitiated = true
        },
        function (error) {
          console.log(error)
          // error
        }
      )
    })
  })
}

function clearSession() {
  Socure.cleanup()
  Socure.reset()
  sessionStorage.removeItem('documentVerificationToken')
  sessionStorage.removeItem('publicApiKey')
  localStorage.removeItem('devicer_id')

  console.log('Socure DocV Session cleaned!')
}