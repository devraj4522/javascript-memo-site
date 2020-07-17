displayNotes()
let btn = document.getElementById('addBtn');
btn.addEventListener("click", function(event) {
    // Get Text
    let text = document.getElementById('text');
    let note = text.value;
    // Get Title
    let title = document.getElementById('title');
    let titleVal = title.value;
    localStorage.setItem(titleVal, note);
    
    // Empty Values
    text.value = "";
    title.value = "";
    displayNotes();
});

function displayNotes() {
    let sessionNotes = localStorage;
    let html = "";
    let allNotes = document.getElementById('showNotes');
    if (sessionNotes.length === 0) {
        html = "<h2 class='text-center'> Memo Empty! Nothing to show</h2>";
        allNotes.innerHTML = html;
    }
    else{
        for (const key in sessionNotes) {
            if (sessionNotes.hasOwnProperty(key)) {
                const element = sessionNotes[key];
                html += `
                <div class="card notes m-3 col-md-4 col-12" style="width: 18rem; background-color:#6ff">
                    <div class="card-body">
                        <h5 class="card-title">${key}</h5>
                        <p class="card-text">${element}</p>
                        <button onclick="deleteNote('${key}')"  class="btn btn-warning">Delete Note</button>
                    </div>
                </div>
            `;
            allNotes.innerHTML = html;
            }
        }
}   }

function deleteNote(key) {
    localStorage.removeItem(key);
    displayNotes();
}

let search = document.getElementById('searchNote');
search.addEventListener('input', function(){
    let searchVal = search.value;
    let allNotes = document.getElementsByClassName('notes');
    Array.from(allNotes).forEach(
        function (element) {
            // Get P
            let matchParaVal = element.getElementsByTagName("p")[0];
            let matchParaValTxt = matchParaVal.innerText;
            // Get H5
            let matchHeadVal = element.getElementsByTagName("h5")[0];
            let matchHeadValTxt = matchHeadVal.innerText;

            if (matchParaValTxt.includes(searchVal) || matchHeadValTxt.includes(searchVal)) {
              element.style.display = "block";  
            }
            else{
                element.style.display = "none"
            }
        }
    );
});