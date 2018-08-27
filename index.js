let timer;
let ssPlaying;

function reqListener() {
	let data = JSON.parse(this.responseText);
	let ul = document.getElementById('yogaUl');
	let tracker = [];
	let length = data.items.length < 5 ? data.items.length - 1 : 4;
	for (let i = 0; i <= length; i++) {
		let randomPose = getRandomPose(data.items);
		tracker[i] = randomPose;
		for (k = 0; k <= i - 1; k++) {
			if (tracker[k].id == tracker[i].id) {
				i--;
			}
		}
	}


	tracker.forEach(pose => {
		let name = `${pose.sanskrit_name} - ${pose.english_name}`;
		let imgUrl = pose.img_url;
		let template = `<li class="ssImg"><div><div class="nameFont">${name}</div><img id="image" src="${imgUrl}" alt="${name}"/></div></div></li>`;

		ul.insertAdjacentHTML('beforeend', template)
	});
	$('.lds-roller').hide();
}

//function getYogaPoses makes call to api
function getYogaPoses(yogaType) {
	var oReq = new XMLHttpRequest();
	oReq.addEventListener('load', reqListener);
	oReq.open(
		'GET',
		`https://lightning-yoga-api.herokuapp.com/yoga_poses?yoga_category_name=${yogaType}`
	);

	oReq.send();
}

//function getRandomPose gets random number returns random array of poses
function getRandomPose(posesArr) {
	var num = Math.floor(Math.random() * posesArr.length);
	return posesArr[num];
}

//to create slideshow
let slideShowPoses = [];
let img_Index = 0;

function showSlides() {
	$('#startBtnContainer').hide();
	let imgLI = document.getElementsByClassName("ssImg");

	for (i = 0; i < imgLI.length; i++) {
		imgLI[i].style.display = "none";
	}
	img_Index++;
	if (img_Index > imgLI.length) {
		img_Index = 1
	}
	imgLI[img_Index - 1].style.display = "block";
	ssPlaying = setTimeout(showSlides, timer * 1000);
}

//when id namaste button is clicked renderChooseCategories is called
function handleStartClicked() {
	$('#namaste').click(() => {
		renderChooseCategories();
	});
}


function renderChooseCategories() {
	let template = `<h2>What are you in the mood for?</h2>
    <form>
        <p>Select at least 1 yoga type you would like to practice</p>
        <fieldset>
            <div id="yoga-info">
                <label for="yogatypes">Yoga Types</label>
                <select required id="yogatypes" multiple size="12">
                    <option value="Core Yoga Poses">Core Yoga Poses</option>
                    <option value="Seated Yoga Poses">Seated Yoga Poses</option>
                    <option value="Strengthening Poses">Strengthening Poses</option>
                    <option value="Chest Opening Poses">Chest Opening Poses</option>
                    <option value="Yoga Backbend Poses">Yoga Backbend Poses</option>
                    <option value="Forward Bend Yoga Poses">Forward Bend Yoga Poses</option>
                    <option value="Hip Opening Yoga Poses">Hip Opening Yoga Poses</option>
                    <option value="Standing Yoga Poses">Standing Yoga Poses</option>
                    <option value="Restorative Yoga Poses">Restorative Yoga Poses</option>
                    <option value="Arm Balance Yoga Poses">Arm Balance Yoga Poses</option>
                    <option value="Balancing Yoga Poses">Balancing Yoga Poses</option>
                    <option value="Inversion Yoga Poses">Inversion Yoga Poses</option>
                </select>
            </div>
            <div>
                <p> Please select how long you'd like each pose to display...</p>
                <label for="poseTimer">Sequence Timer</label>
                <select required id="poseTimer">
                        <option value="30">30 seconds</option>
                        <option value="40">40 seconds</option>
                        <option value="50">50 seconds</option>
                        <option value="60">60 seconds</option>
                        <option value="70">70 seconds</option>
                        <option value="80">80 seconds</option>
                        <option value="90">90 seconds</option>
                        <option value="custom">Customize</option>
                </select>
            </div>    
            <div> 
                <label for="customizeTimer" id="customizeTimerLabel">Enter time in seconds</label>
                <input type="number" min="1" id="customizeTimer" hidden/>            
            </div>
        </fieldset>
        <p>Click the OM button to create a new sequence </p>
        <button id="btnOM">OM</button>
    </form>`;

	loadTemplate(template);
	$('#customizeTimerLabel').hide();

	//roller while loading
	$("form").submit(function (e) {
		e.preventDefault();
		$('.lds-roller').show();
		let yogaType = $('#yogatypes').val();
		if ($('#poseTimer').val() === 'custom') {
			timer = Number($('#customizeTimer').val());
		} else {
			timer = Number($('#poseTimer').val());
		}
		renderImgSS();
		yogaType.forEach(function (type) {

			getYogaPoses(type);
		});
	});

	//show customize timer if user selects customize value
	$('#poseTimer').change(function (e) {
		let value = e.currentTarget.value;
		if (value === 'custom') {
			$('#customizeTimer').attr('hidden', false);
			$('#customizeTimerLabel').show();
		} else {
			$('#customizeTimer').attr('hidden', true);
			$('#customizeTimerLabel').hide();
			$('#customizeTimer').val('');
		}

	})

} //end of renderChooseCategories

//user decides to either use the suggested sequence or create a new one by clicking btnRestart
function renderImgSS() {
	const secondsText = Number(timer) === 1 ? 'second' : 'seconds';

	let template = `<p>Each pose will display for ${timer} ${secondsText}. If you want to keep going, the sequence will restart automatically until you hit the home link.</p>
<ul id="yogaUl">
</ul>
<div id="startBtnContainer"><p>Hit the OM button to start</p><button id="btnSequence">OM</button></div>
<div id="noLike"><p>Not feeling it? Click button below to try a new sequence.</p><button id="btnRestart">Try again</button></div>`

	$('.container').html(template);
	//add event listener to button start sequence
	let btnSequence = document.getElementById("btnSequence");
	btnSequence.addEventListener("click", showSlides);

	let btnRestart = document.getElementById("btnRestart");
	btnRestart.addEventListener("click", renderChooseCategories);

}

function loadTemplate(template) {
    if (ssPlaying) {
		clearInterval(ssPlaying);
	}	
	$('.container').html(template);
}

//takes user to about screen
$('#js-about').click(event => {
	event.preventDefault();
	let template = `<p>Thank you for using my app. My intention was to build an app that allows you to come up with your own yoga sequences based on the type of yoga you want to practice any given day. Enjoy!!</p> 
     <h3>NAMASTE!!</h3>`
	 loadTemplate(template);
});

//Takes the user back to the homepage when the "Back to Homepage" button is selected
$('.js-relaunch').click(event => {
	event.preventDefault();
	let template = `
		<h2>Create your own Yoga sequence!!</h2>
		</form>
	 <p>Do you ever want to do yoga but don't know what poses to include in your practice?  Well this app helps you create a random yoga sequence</p>
   <button type="button" id="namaste">Start</button>`;

	loadTemplate(template);
});

function runYogaSequence() {
	handleStartClicked();
	$(runYogaSequence);
}


$(runYogaSequence);


//alt+shift+F - to format code on mac
//add, commit, push 
//run axe
