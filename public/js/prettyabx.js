/* Copyright Vik Anand 2021
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

document.getElementById("Enter").addEventListener("click",()=>{
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/prettyabx", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  console.log(document.getElementById("input").value);
  xhr.send(JSON.stringify({
      abx: document.getElementById("input").value,
      wt: document.getElementById("weight").value,
  }));
  setTimeout(() => {
  window.location = "/prettyabx_response"
  },2000);
  /*.get('/prettyabx_response', function(html) {
    console.log("i'm getting!")
    document.getElementById('html').html(html);
  });*/
})

