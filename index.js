

function reqListener() {
	let data = JSON.parse(this.responseText);
	let ul = document.getElementById('yogaUl');
	let tracker = [];
	// for (let i = 0; i < data.items.length; i++){
	let length = data.items.length < 5 ? data.items.length - 1 : 4;
	for (let i = 0; i <= length; i++) {
		let randomPose = getRandomPose(data.items);
		tracker[i] = randomPose;
		for (k = 0; k <= i - 1; k++) {
			if (tracker[k].id == tracker[i].id) {
				i--;
			}
		}
		// while (!tracker.find(p => p.id == randomPose.id)){
		// randomPose = getRandomPose(data.items);
		//   if (!tracker.find(p => p.id == randomPose.id)){
		//   tracker.push(randomPose);
		//   }

		// }

		// var chosen = [];

		// for (var i = 0; i<=4; i++) {
		// var randy = Math.floor(Math.random() * len);
		// chosen[i] = myArray[randy];
		// for (k=0; k<=i-1; k++) {
		// if (chosen[k] == chosen[i]) {
		// i--;  // duplicate found so decrement i
		// }
		// }
		// }
		// if (data.items.length >= 5){
		// do {

		// }
		// while (!tracker.find(p => p.id == randomPose.id))
		// }else{
		// randomPose = data.items[i];

		// }

		// let li = document.createElement('li');
		// let name = `${randomPose.sanskrit_name} - ${randomPose.english_name}`;
		// let imgUrl = randomPose.img_url;
		// let template = `<li><div>${name}</div><img src="${imgUrl}"/></li>`;
		// ul.insertAdjacentHTML('beforeend', template);
	}

	// we were running this code whether the pose was duplicated or not.
	// we just need to seperate it out from the loop
	tracker.forEach(pose => {
		let name = `${pose.sanskrit_name} - ${pose.english_name}`;
		let imgUrl = pose.img_url;
		let template = `<li class="ssImg"><div><div class="nameFont">${name}</div><img id="image" src="${imgUrl}" alt="${name}" /></div></div></li>`;

		ul.insertAdjacentHTML('beforeend', template)
	});
}


function getYogaPoses(yogaType) {
	var oReq = new XMLHttpRequest();
	oReq.addEventListener('load', reqListener);
	oReq.open(
		'GET',
		`https://lightning-yoga-api.herokuapp.com/yoga_poses?yoga_category_name=${yogaType}`
	);

	oReq.send();
}




function getRandomPose(posesArr) {
	var num = Math.floor(Math.random() * posesArr.length);
	return posesArr[num];
}



//to create slideshow
let slideShowPoses = [];
let img_Index = 0;

function showSlides() {
	let imgLI = document.getElementsByClassName("ssImg");
	for (i = 0; i < imgLI.length; i++) {
		imgLI[i].style.display = "none";
	}
	img_Index++;

	if (img_Index > imgLI.length) {
		renderLast()
	} else {
		imgLI[img_Index - 1].style.display = "block";
		setTimeout(showSlides, 30000)
		
	}
}//end of function showSlides


function handleStartClicked() {
	$('#namaste').click(() => {
		renderChooseCategories();
	});
}

function renderChooseCategories() {

	let template = `<h2>What are you in the mood for?</h2>
      <p>Select the yoga types you would like to practice and hit the OM bottom below</p>
   <div id="yoga-info">
    <select id="yogatypes" multiple size=12>
  <option label="Core Yoga Poses">Core Yoga Poses</option>
    <option label="Seated Yoga Poses">Seated Yoga Poses</option>
    <option label="Strengthening">Strengthening</option>
     <option label="Chest Opening">Chest Opening</option>
    <option label="Yoga Backbends">Yoga Backbends</option>
    <option label="Forward Bend Yoga Poses">Forward Bend Yoga Poses</option>
     <option label="Hip Opening Yoga Poses">Hip Opening Yoga Poses</option>
    <option label="Standing Yoga Poses">Standing Yoga Poses</option>
     <option label="Restorative Yoga Poses">Restorative Yoga Poses</option>
    <option label="Arm Balance Yoga Poses">Arm Balance Yoga Poses</option>
     <option label="Balancing Yoga Poses">Balancing Yoga Poses</option>
    <option label="Inversion Yoga Poses">Inversion Yoga Poses</option>
</select>
<button id="btnOM" class="hideText">OM</button>

 </div>

`
	$('.container').html(template);
	let btnOM = document.getElementById('btnOM');
	btnOM.addEventListener('click', function () {
		let yogaType = $('#yogatypes').val();
		console.log(yogaType);
		renderImgSS();
		yogaType.forEach(function(type){
	
			getYogaPoses(type);
		});
	});



}//end of renderChooseCategories

function renderImgSS() {
	let template = `<p>Each pose will display for 30 seconds, if you want to keep going the sequence will restart automatically until you hit the OM button again</p>
<ul id="yogaUl">
</ul>
<div><p>Hit the OM buttom to start</p><button id="btnSequence" class="hideText">Start</button></div>
<div id="noLike"><p>Not feeling it? Go back to try again</p><button id="btnRestart" class="hideText">Try again</button></div>`
	$('.container').html(template);
	//add event listener to button start sequence
	let btnSequence = document.getElementById("btnSequence");
	btnSequence.addEventListener("click", showSlides);

	let btnRestart = document.getElementById("btnRestart");
	btnRestart.addEventListener("click", renderChooseCategories);

}

function renderLast() {
	let template = `<p>Congrats! You finished your yoga sequence!</p>

	<button id="newSS" class="hideText">Return to Choose</button>`
	$('.container').html(template);
	//add event listener to button start sequence
	let newSS = document.getElementById("newSS");
	newSS.addEventListener("click", renderChooseCategories);

}
function runYogaSequence() {
	handleStartClicked();

}

$(runYogaSequence);