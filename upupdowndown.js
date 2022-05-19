function converter(str, set) {
  try {
    str = JSON.stringify(str); //used it because \ was giving trouble
    const args = str.split(""); //turns the string into array of chars
    let chunks = [];
    let chunk = [];
    let cStarted = false; // states start of superscript intended part
    for (let i = 1; i < args.length - 1; i++) {
      if (args[i] == "/" && args[i - 1] == "/") {
        if (!cStarted) {
          //start of superscript intended area
          if (chunks.length == 0 || chunk.length) {
            chunks.push(chunk);
          }
          chunk = [args[i]];
          cStarted = true;
        } else {
          // this is for the last char of superscript intended area
          chunk.push(args[i]);
          cStarted = false;
          chunks.push(chunk);
          chunk = [];
        }
      } else if (args[i] == "/" && args[i + 1] == "/") {
        // couldn't find a better way to skip the duplicate
      } else {
        // all character other than slashes
        chunk.push(args[i]);
      }
      if (i == args.length - 2) {
        // this is used because otherwise last chunk would be skipped
        chunks.push(chunk);
      }
    }

    let temp = [];
    for (let i = 0; i < chunks.length; i++) {
      if (
        chunks[i][0] == chunks[i][chunks[i].length - 1] &&
        chunks[i][0] == "/"
      ) {
        chunks[i].shift(); //gets rid off slash
        chunks[i].pop(); // this too
        //calls toSuper func and adds the superscripted chars to temp array
        for (let j = 0; j < chunks[i].length; j++) {
          temp.push(toChr(chunks[i][j], set));
        }
      } else {
        //adds normal characters to the array
        for (let j = 0; j < chunks[i].length; j++) {
          temp.push(chunks[i][j]);
        }
      }
    }
    let returnString = ``;
    //turns the array back string
    for (let i = 0; i < temp.length; i++) {
      returnString += temp[i];
    }

    return returnString;
  } catch (err) {
    console.warn(err);
  }
}

//this function makes a json object of normal and their superscript counterpart
function createSuperC() {
  let n =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890+-=()!".split(
      ""
    );
  let s =
    "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᵠᴿˢᵀᵁⱽᵂˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ¹²³⁴⁵⁶⁷⁸⁹⁰⁺⁻⁼⁽⁾ᵎ".split(
      ""
    );
  let superSet = {};
  for (let i = 0; i < n.length; i++) {
    superSet[n[i]] = s[i];
  }
  return superSet;
}

function createSubC() {
  let n = "aehijklmnoprstux1234567890-+()=".split("");
  let s = "ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤₓ₁₂₃₄₅₆₇₈₉₀₋₊₍₎₌".split("");
  let superSet = {};
  for (let i = 0; i < n.length; i++) {
    superSet[n[i]] = s[i];
  }
  return superSet;
}

//this part needs a bit of rework but
//it basically finds and returns superscripted character from the json object returned by createSuperC func
const setU = createSuperC();
const setD = createSubC();
function toChr(chr, set) {
  if (set[chr]) {
    return set[chr];
  }
  return chr;
}
