let btn = document.getElementById('btn');

function reqListener() {
	let data = JSON.parse(this.responseText);
	let ul = document.getElementById('yogaUl');
	ul.innerHTML = '';
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
		let template = `<li><div><div>${name}</div><img src="${imgUrl}"/></div></div></li>`;
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

btn.addEventListener('click', function() {
	let yogaType = document.getElementById('yogatypes').value;

	getYogaPoses(yogaType);
});

function getRandomPose(posesArr) {
	var num = Math.floor(Math.random() * posesArr.length);
	return posesArr[num];
}
let yogaType = document.getElementById('yogatypes').value;
document.getElementById('yogatypes').multiple = true;

if (yogaType.selected == true){
  alert(yogaType);

}