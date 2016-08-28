function countCharatersAndWordsInTheTextLayer(context) {

  var doc = context.document;

  // Array for UTF-16
  var arrUtf16 = []

  // Convenient func
  function checkForChar(charUtf16) {
      var isItChar = false
      if ((65 <= charUtf16) && (charUtf16 <= 90)) {
        isItChar = true
      } else if ((97 <= charUtf16) && (charUtf16 <= 122)) {
        isItChar = true
      } else if ((192 <= charUtf16) && (charUtf16 <= 382)) {
        isItChar = true
      } else if ((1024 <= charUtf16) && (charUtf16 <= 1327)) {
        isItChar = true
      }
      return isItChar
  }

  // Default amount of words
  var amountWords = 0;

  // Default amount of characters
  var amountOfCharactersInLayer = 0;

  // Alert
  var app = NSApplication.sharedApplication()

  // Get selected elements from your artboard
  var selection = context.selection;

  // Check amount of selected layers
  if (selection.length == 0) {
    doc.showMessage("You didnt select any layers")
  } if (selection.length > 1){
    doc.showMessage("You selected more than one layer")
  } else {

    // Define first layer
    var layer = selection[0]

    // Check type of the layer
    if (!(layer.className() == "MSTextLayer")) {
      doc.showMessage("Wrong type of layer")
    } else {

      // Get data from the layer
      var dataOfLayer = layer.stringValue()

      // Contert text layer data to String
      var stringWeNeed = String(dataOfLayer)

      // Super hack
      stringWeNeed += "."

      // Define amount of characters of the layer's data
      amountOfCharactersInLayer = stringWeNeed.length

      // Fill out arrUtf16
      for (var i = 0; i < amountOfCharactersInLayer; i++) {
        var utf16 = stringWeNeed.charCodeAt(i)
        arrUtf16.push(Number(utf16))
      }

      // Count amount of words in stringWeNeed
      for (var j = 1; j < amountOfCharactersInLayer; j++) {
        if ( (!(checkForChar(arrUtf16[j]))) && (checkForChar(arrUtf16[j-1]))  ) {
        amountWords++
        }
      }
    }
  }

  // Show a result. Remember about the Super Hack
  var result = "Characters: " + (amountOfCharactersInLayer - 1) + "\n" + "Words: " + amountWords
  app.displayDialog_withTitle(result, "Counter")

}
