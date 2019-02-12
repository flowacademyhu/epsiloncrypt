// delimiter meghatarozza az egyenkent titkositott karakterek kozotti
// elvalasztast
const delimiter = 'z';

// shuffleDelimiter meghatarozza a titkositott shuffle es az adat kozotti
// elvalasztast
const shuffleDelimiter = 'y';

// meghatarozza, hogy hanyszor fusson le a shuffle
const iterations = 10;

// megszorozzuk a shuffle indexek erteket ennyivel, hogy latvanyosabb legyen
// 16-os szamrendszerbe valtani
const shufflePrefixMultiplier = 200;

/**
 * Encrypt related
 *
 */

// shuffle a kapott hossz alapjen visszaad egy osszekevert szamsorozatot
function shuffle(len, iter) {
  let indexAt = new Array();
  for (i = 0; i < len; i++) {
    indexAt.push(i);
  }
  for (i = 0; i < iter; i++) {
    randIndex1 = generateRandomNumber(0, len);
    randIndex2 = generateRandomNumber(0, len);
    temp = indexAt[randIndex1];
    indexAt[randIndex1] = indexAt[randIndex2];
    indexAt[randIndex2] = temp;
  }
  return indexAt;
}

// osszekeveri a titkositott karakterek tombjet a fentebb definialt function
// outputjanak segitsegevel
function shuffleResultSet(resultSet, indexAt) {
  var result = new Array();
  for (i = 0; i < indexAt.length; i++) {
    result[i] = resultSet[indexAt[i]];
  }
  return result;
}

// titkositja a fentebb levo shuffle function outputjat
function encryptShufflePrefix(shuffleHelper) {
  let shufflePrefix = new Array();
  for (i = 0; i < shuffleHelper.length; i++) {
    numericShufflePrefix = shuffleHelper[i] * shufflePrefixMultiplier;
    shufflePrefix.push(numericShufflePrefix.toString(16));
  }
  return shufflePrefix.join(delimiter);
}

// egy bizonyos karakter titkositasa
function encrpytByChar(num, key, index) {
  return num * Math.pow(key, index);
}

// tobbnyire elvegzi a teljes titkositast
function encrypt(str, key) {
  let resultSet = new Array();
  let shuffled = shuffle(str.length, iterations);

  for (i = 0; i < str.length; i++) {
    numericEncrypted = encrpytByChar(str.charCodeAt(i), key, i + 2);
    strEncrypted = numericEncrypted.toString(22);
    resultSet.push(strEncrypted);
  }
  resultSet = shuffleResultSet(resultSet, shuffled);

  encryptedShufflePrefix = encryptShufflePrefix(shuffled);

  return encryptedShufflePrefix + shuffleDelimiter + resultSet.join(delimiter);
}

/**
 * Decrpyt related
 *
 */

// a fenti karakterenkenti encrypt inverz muvelete
function decryptByChar(chunk, key, index) {
  return chunk / Math.pow(key, index);
}

// a titkositott string prefixenek a visszafejtese, hogy abbol aztan
// visszaallitsuk a helyes sorrendet
function dencryptShufflePrefix(shufflePrefix) {
  shuffled = shufflePrefix.split(delimiter);
  let result = new Array();
  for (i = 0; i < shuffled.length; i++) {
    result.push(parseInt(shuffled[i], 16) / shufflePrefixMultiplier);
  }
  return result;
}

// a helyes sorrend visszaallitasa
function unshuffle(arr, indexAt) {
  var result = new Array();
  for (i = 0; i < indexAt.length; i++) {
    result[indexAt[i]] = arr[i];
  }
  return result;
}

// a visszanyeresi folyamat magja
function decrpyt(str, key) {
  let parts = str.split(shuffleDelimiter);

  let shuffleHelper = dencryptShufflePrefix(parts[0]);
  let chunks = parts[1].split(delimiter);
  unshuffeled = unshuffle(chunks, shuffleHelper);

  let result = '';
  for (i = 0; i < unshuffeled.length; i++) {
    result += String.fromCharCode(
        decryptByChar(parseInt(unshuffeled[i], 22), key, i + 2));
  }
  return result;
}

// random szam generalas min-til max-ig
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

key = 12;
str = 'fasdlkfqwler';
encrypted = encrypt(str, key);
console.log(encrypted);

decrypted = decrpyt(encrypted, key);
if (str != decrypted) {
  console.log('Result isn\'t the expected');
  console.log('Result: ' + decrypted);
  console.log('Expected: ' + str);
}
