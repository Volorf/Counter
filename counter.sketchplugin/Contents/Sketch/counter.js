function countCharatersAndWordsInTheTextLayer(context) {

  var doc = context.document;

  // Default amount of words
  var amountWords = 0;

  // Default amount of characters
  var amountOfCharactersInLayer = 0

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

      // Define amount of characters of the layer's data
      amountOfCharactersInLayer = stringWeNeed.length

      // Loop for define amount of words in the text layer data
      for (var i = 1; i < amountOfCharactersInLayer; i++) {
        if ((stringWeNeed[i] == " ") || (stringWeNeed[i] == "\n")) {
          if (!(stringWeNeed[i-1] == " ") && !(stringWeNeed[i-1] =="\n")) {
          amountWords += 1
          }
        }
      }
      if (!(stringWeNeed[amountOfCharactersInLayer-1] == " ") && !(stringWeNeed[amountOfCharactersInLayer-1] == "\n")) {
        amountWords += 1
      }

    }
  }

  // Show a result
  var result = "Characters: " + amountOfCharactersInLayer + "\n" + "Words: " + amountWords
  app.displayDialog_withTitle(result, "Counter")

}
