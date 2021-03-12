/* Copyright Vik Anand
This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
/*-----CONSTANTS----*/
var LABCOUNT = 5; //the number of labs to extract
var DATEROW = 0;

/*------------------*/

/*----VARS for all the functions to work on --*/
var ttclean; //the input text that will be uncleared
var labrows; //the text split into rows
var labarray = new Array(); //the data array
/*



/*-----------cellCount function---------*/
function cellCount() {
  var wbcRow = null;
  var returnString = "";
  var RBC_OFFSET = 2;
  var PLT_OFFSET = 7;

  for (var i = 0; i < labarray.length; i++) {
    wbcRow = labarray[i].indexOf("Blood Cell Count");
    if (wbcRow != -1) {
      wbcRow = i + 1; //wbcs will be the next row down if found
      break; // an index was found
    }
  }
  if (wbcRow != -1) {
    //an index was found
    var labcounter = 0;
    var i = 0;
    while (i < labarray[wbcRow].length && labcounter < LABCOUNT) {
      //loop through the row that has WBC values and get up to 5
      if (labarray[wbcRow][i] != "") {
        //if it's not an empty string
        //console.log(labarray[wbcRow]);
        var wbcString = labarray[wbcRow][i].split(") "); //WBC split off the leading parenthesis
        var hgbString = labarray[wbcRow + RBC_OFFSET][i].split(") "); //rbc split off leading parenthesis
        var pltString = labarray[wbcRow + PLT_OFFSET][i].split(") "); //plt split
        returnString +=
          labarray[DATEROW][i] +
          "\t" +
          wbcString[wbcString.length - 1] +
          ">-" +
          hgbString[hgbString.length - 1] +
          "-<" +
          pltString[pltString.length - 1] +
          "\n";
        labcounter += 1;
      }
      i++;
    }
  }
  return returnString;
}

/*-----------serum Cr function---------*/
function scr() {
  var scrRow = null;
  var returnString = "";
  var CR_OFFSET = 7;

  for (var i = 0; i < labarray.length; i++) {
    scrRow = labarray[i].indexOf("Blood Chemistry");
    if (scrRow != -1) {
      scrRow = i + CR_OFFSET;
      break; // an index was found
    }
  }
  if (scrRow != -1) {
    //an index was found
    var labcounter = 0;
    var i = 0;
    while (i < labarray[scrRow].length && labcounter < LABCOUNT) {
      //loop through the row that has WBC values and get up to 5
      if (labarray[scrRow][i] != "") {
        //if it's not an empty string
        //console.log(labarray[scrRow]);
        var scrString = labarray[scrRow][i].split(") "); //WBC split off the leading parenthesis
        returnString +=
          labarray[DATEROW][i] + "\t" + scrString[scrString.length - 1] + "\n";
        labcounter += 1;
      }
      i++;
    }
  }
  return returnString;
}

/*---------------Aerobic BCx-----------------------*/
function aerBloodCx() {
  var bcxRow = null;
  var returnString = "";
  for (var i = 0; i < labarray.length; i++) {
    bcxRow = labarray[i].indexOf("Culture Blood Aerobic");
    if (bcxRow != -1) {
      bcxRow = i;
      break; // an index was found
    }
  }
  //console.log("bcxRow: " + bcxRow);
  if (bcxRow != -1) {
    //an index was found
    var labcounter = 0;
    var i = 1;//start after the title
    //console.log(labarray[bcxRow]);
    while (i < labarray[bcxRow].length && labcounter < LABCOUNT) {
      //loop through the row that has WBC values and get up to 5
      if (labarray[bcxRow][i] != "") {
        //console.log(labarray[bcxRow][i]);
        //if it's not an empty string
        var bcxString = labarray[bcxRow][i].split(" "); 
        //console.log("bcxString: "+bcxString);
        returnString +=
          labarray[DATEROW][i] + "\t" + bcxString[bcxString.length - 1] + "\n"; //append the last part (POS or NEG)
        labcounter += 1;
      }
      i++;
    }
  }
  //console.log(returnString);
  return returnString;
}

/*---------------Anaerobic BCx-----------------------*/
function anaerBloodCx() {
  var bcxRow = null;
  var returnString = "";

  for (var i = 0; i < labarray.length; i++) {
    bcxRow = labarray[i].indexOf("Culture Blood Anaerobic");
    if (bcxRow != -1) {
      bcxRow = i;
      break; // an index was found
    }
  }
  //console.log("bcxRow: " + bcxRow);
  if (bcxRow != -1) {
    //an index was found
    var labcounter = 0;
    var i = 1;//start after the title
    //console.log(labarray[bcxRow]);
    while (i < labarray[bcxRow].length && labcounter < LABCOUNT) {
      //loop through the row that has WBC values and get up to 5
      if (labarray[bcxRow][i] != "") {
        //console.log(labarray[bcxRow][i]);
        //if it's not an empty string
        var bcxString = labarray[bcxRow][i].split(" "); 
        //console.log("bcxString: "+bcxString);
        returnString +=
          labarray[DATEROW][i] + "\t" + bcxString[bcxString.length - 1] + "\n"; //append the last part (POS or NEG)
        labcounter += 1;
      }
      i++;
    }
  }
  //console.log(returnString);
  return returnString;
}

/*-------- cleanLabs Function ---------*/
function cleanLabs() {
  ttclean = document.querySelector("#input").value;
  labrows = ttclean.split(/\r?\n/); //build the rows of the array
  var outText = "";

  for (var i = 0; i < labrows.length; i++) {
    //build the 2d array row by row splitting into cols
    labarray.push(labrows[i].split("\t"));
  }
  //add CBC data
  var cbcText;
  if ((cbcText = cellCount()) != "") {
    outText += "CBC:" + "\n" + cbcText + "\n";
  }
  //add Cr data
  var crText;
  if ((crText = scr()) != "") {
    outText += "Cr:" + "\n" + crText+ "\n";
  }

  var aerBCxText;
  if ((aerBCxText = aerBloodCx()) != ""){
    outText += "Aer BCx:" + "\n" + aerBCxText + "\n"; 
  }

  var anaerBCxText;
  if ((anaerBCxText = anaerBloodCx()) != ""){
    outText += "Anaer BCx:" + "\n" + anaerBCxText + "\n"; 
  }
  

  document.querySelector("#output").value = outText;
}

/* event listener for the button click to call cleanLabs()*/
document.querySelector("#Enter").addEventListener("click", cleanLabs);
