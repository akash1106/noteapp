const addbox=document.querySelector(".add"),
popupbox=document.querySelector(".popup-box"),
closeicon=popupbox.querySelector("header i"),
titletag=document.querySelector("input"),
destag=popupbox.querySelector("textarea"),
addbut=popupbox.querySelector("button");
let notes=JSON.parse(localStorage.getItem("notes") || "[]");

const months=["January","February","March","April","May","June","July","August","September","October","November","December"];

addbox.addEventListener("click",()=>{
	popupbox.classList.add("show");
});

closeicon.addEventListener("click",()=>{
	titletag.value="";
	destag.value="";
	popupbox.classList.remove("show");
});

function shownotes(){
	document.querySelectorAll(".note").forEach(note=>note.remove());
	notes.forEach((note,index)=>{
		let litag=`<li class="note">
						<div class="top">
							<p>${note.title}</p>
							<span>
								${note.description}
							</span>
							<div class="bottom">
								<span>${note.date}</span>
								<button onclick="delnote(${index})">del</button>
							</div>
						</div>
					</li>`
		addbox.insertAdjacentHTML("afterend",litag);
	});
}

shownotes();

function delnote(noteid){
	notes.splice(noteid,1);
	localStorage.setItem("notes",JSON.stringify(notes));
	shownotes();
}

addbut.addEventListener("click",e=>{
	e.preventDefault();
	let notetitle=titletag.value,
	notedesc=destag.value;
	if( notetitle || notedesc){
		let dateobj= new Date(),
		month=months[dateobj.getMonth()],
		day=dateobj.getDate(),
		year=dateobj.getFullYear();

		let noteinfo={
			title: notetitle, description:notedesc,
			date: `${month} ${day}, ${year}`
		}
		notes.push(noteinfo);
		localStorage.setItem("notes",JSON.stringify(notes));
		closeicon.click();
		shownotes();
	}
});