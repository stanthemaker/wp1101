const imgs = [
	{
		name: "Lebron James",
		pic: [
			"https://img.sportsv.net/img/article/cover/3/70763/fit-Gzbe2U8fOX-945x495.jpg",
			"https://i.epochtimes.com/assets/uploads/2019/12/LeBron-James-1194598586-700x359.jpg",
			"https://clutchgtime.com/wp-content/uploads/2021/01/maxresdefault-1.jpg",
			"https://img.bleacherreport.net/img/images/photos/003/816/330/hi-res-b15141c51c7910e8efc00c9f9a156497_crop_north.jpg?1561657450&w=3072&h=2048",
		],
	},
	{
		name: "Luka Doncic",
		pic: [
			"https://www.si.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTcyMDgxMTY0MDU0NDM5MDc3/luka-doncic-mavericks-power-rankings.jpg",
			"https://cdntwrunning.biji.co/800_c18d2d0575a63f879eb4c65790a79c0b.jpg",
			"https://clutchgtime.com/wp-content/uploads/2020/02/5dc9e7b97ba6385cfa8d80e86b1f704fc9b07996-e1583574610157.jpg",
			"https://cdn-wp.thesportsrush.com/2021/10/0baf9963-luka-war-cry.jpg",
		],
	},
	{
		name: "Giannis Antetokounmpo",
		pic: [
			"https://img.sportsv.net/img/article/cover/1/79811/fit-pxAKnSLHVz-945x495.png",
			"https://cdn.taronews.tw/files/2019/11/72181135_10156873862697817_3304950211553525760_o-750x430.jpg",
			"https://i.ytimg.com/vi/GYZ7b5P08YA/maxresdefault.jpg",
			"https://img.bleacherreport.net/img/images/photos/003/807/303/hi-res-f13e2c9eb8170ef0757843f85c0919c8_crop_north.jpg?1557366518&w=3072&h=2048",
		],
	},
];
const background_img =
	"https://d3data.sportico.com/NBAVal/RevisedGraphBanner.jpg";
const main_img = document.getElementById("main-img");
const album = document.getElementById("album-box");
const preview_imgs = document.getElementById("sub-images");
const div_number = document.getElementById("handle-num");
let img_boxes = 0;
let album_boxes = 0,
	album_img = 0;
let current_album = 0,
	prev_album = 0;
let current = 0,
	prev = 0;
let num_of_current_pics = 0,
	num_of_total_pics = 0;

const refresh_preimg = (album_ind) => {
	// adding html
	let inner = `<div style="display: flex">`;
	for (let i = 0; i < imgs[album_ind].pic.length; i++) {
		inner += `<div class= "wrapper-col">
		<div onclick="render(${i})">\
		<img class="side-img" alt="Bo" id="img-box${i}"></div>\
		<div text-align: center ><img src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg" \
				style="width:2.5vw" onclick="handleDelPic(${i})"/>\
		</div>
		</div>`;
	}
	inner += `<div class="wrapper-col">
	<input type = "text" id="url_preimg" placeholder="url:">\ 
	<input type="button" id="btn" value="Add new photo" onclick="handleAddPic()"/>`;
	inner += "</div>";
	preview_imgs.innerHTML = inner;
	// mapping
	img_boxes = imgs[album_ind].pic.map((_album, index) => {
		return document.getElementById(`img-box${index}`);
	});
	//init photos at the top
	for (let i = 0; i < imgs[album_ind].pic.length; i++) {
		img_boxes[i].src = imgs[album_ind].pic[i];
	}
};
const refresh_album = (album_ind) => {
	// adding html
	album.innerHTML = "";
	for (let i = 0; i < imgs.length; i++) {
		album.innerHTML += `<div class="box" id="Album-img-box${i}">\
		<img class="album-img-size" id="Album-img${i}" onclick="change_album(${i})" />\
		<div class= "wrapper-col"  style="margin: 2.5vh">
        <span class = "name">${imgs[i].name}</span>\
		<div text-align: center style="margin: 1vh"><img src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg" \
				style="width:2.5vw" onclick="handleDelAlbum(${i})"/>\
		</div>
		</div>`;
	}
	album.innerHTML += `<div class="box" id="Album-img-box${imgs.length}">\
    <img class="album-img-size" id="Album-img${imgs.length}" onclick="change_album(${imgs.length})" />\
	
    <div class="wrapper-col">\
	<input type = "text" id="name" placeholder="name:">\
    <input type = "text" id="url" placeholder="url:">\ 
    <div text-align: center ><img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-add-icon.png" \
				style="width:2.5vw" onclick=" handleAddAlbum()"/>\
		</div>
    </div>\
    </div>`;

	// mapping
	album_boxes = imgs.map((_album, index) => {
		return document.getElementById(`Album-img-box${index}`);
	});
	album_img = imgs.map((_album, index) => {
		return document.getElementById(`Album-img${index}`);
	});

	// init albums at the bottom
	for (let i = 0; i < imgs.length; i++) {
		album_img[i].src = imgs[i].pic[0];
	}
};
const init = (init_ind) => {
	//refresh preview imges
	refresh_preimg(init_ind);
	refresh_album(init_ind);

	main_img.src = imgs[init_ind].pic[0];

	// add effects to albums
	prev = current;
	current = 0;
	img_boxes[prev].classList.remove("chosen");
	img_boxes[current].classList.add("chosen");
	album_boxes[current_album].classList.add("chosen_album");

	// update nums
	nums_cal();
};
const nums_cal = () => {
	num_of_total_pics = 0;
	for (let i = 0; i < imgs.length; i++) {
		num_of_total_pics += imgs[i].pic.length;
	}

	num_of_current_pics = imgs[current_album].pic.length;

	div_number.innerHTML = "";
	div_number.innerHTML = `<span class="nums">\
	Number: ${current + 1} / ${num_of_current_pics},\
	Total: ${num_of_total_pics}
	</span>`;
};
const render = (index) => {
	console.log("index in r= ", index);
	if (current !== index) {
		prev = current;
		current = index;
	}
	main_img.src = imgs[current_album].pic[current];

	/*prev remove chosen class*/
	for (let i = 0; i < imgs[current_album].pic.length; i++)
		img_boxes[i].classList.remove("chosen");
	/*current add chosen class*/
	img_boxes[current].classList.add("chosen");
	// console.log("after render, curr =  ", current);
	nums_cal();
};
const change_album = (index) => {
	if (current_album === index) {
		return;
	}
	if (index === imgs.length) {
		alert("Album not found.");
		return;
	}

	prev_album = current_album;
	current_album = index;

	album_boxes[current_album].classList.add("chosen_album");
	album_boxes[prev_album].classList.remove("chosen_album");
	init(index);
};

const handleAddAlbum = () => {
	url = document.getElementById("url").value;
	player = document.getElementById("name").value;
	if (url === "" || player === "") {
		alert("Please input both name and url!!!");
		return;
	}
	if (imgs.length > 4) {
		alert("Too many albums!!");
		return;
	}
	imgs.push({
		name: player,
		pic: [`${url}`],
	});
	init(0);
};
const handleAddPic = () => {
	url = document.getElementById("url_preimg").value;
	if (url === "") {
		alert("Please an url!!!");
		return;
	}
	imgs[current_album].pic.push(`${url}`);
	refresh_preimg(current_album);
	render(imgs[current_album].pic.length - 1);
};
const handleDelAlbum = (album_ind) => {
	if (album_ind === 0) {
		alert("You cannot delete Lebron's album, cuz he's the GOAT!!");
		return;
	}
	imgs.splice(album_ind, 1);
	init(0);
};
const handleDelPic = (index) => {
	if (imgs[current_album].pic.length === 1) {
		alert("Cannot delete the last image. You may delete the album instead.");
		return;
	}
	// console.log("before del:", current);
	imgs[current_album].pic.splice(index, 1);
	refresh_preimg(current_album);
	// console.log("after refresh:", current);

	// console.log("index == ", index);
	// console.log(
	// 	"index === imgs[current_album].pic.length - 1?",
	// 	index === imgs[current_album].pic.length
	// );
	// if ()
	render(index === 0 ? 0 : index - 1);
	// console.log("current after render:", current);
	// console.log("end of del pic");
	return;
};
// https://www.ocregister.com/wp-content/uploads/2021/04/AP21113070352887-3.jpg
/** execution */
init(0);
