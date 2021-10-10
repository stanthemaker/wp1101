const imgs = [
    [
        "https://img.sportsv.net/img/article/cover/3/70763/fit-Gzbe2U8fOX-945x495.jpg",
        "https://i.epochtimes.com/assets/uploads/2019/12/LeBron-James-1194598586-700x359.jpg",
        "https://clutchgtime.com/wp-content/uploads/2021/01/maxresdefault-1.jpg",
        "https://img.bleacherreport.net/img/images/photos/003/816/330/hi-res-b15141c51c7910e8efc00c9f9a156497_crop_north.jpg?1561657450&w=3072&h=2048"
    ],
    [
        "https://www.si.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTcyMDgxMTY0MDU0NDM5MDc3/luka-doncic-mavericks-power-rankings.jpg",
        "https://cdntwrunning.biji.co/800_c18d2d0575a63f879eb4c65790a79c0b.jpg",
        "https://clutchgtime.com/wp-content/uploads/2020/02/5dc9e7b97ba6385cfa8d80e86b1f704fc9b07996-e1583574610157.jpg",
        "https://cdn-wp.thesportsrush.com/2021/10/0baf9963-luka-war-cry.jpg"

    ],
    [
        "https://img.sportsv.net/img/article/cover/1/79811/fit-pxAKnSLHVz-945x495.png",
        "https://cdn.taronews.tw/files/2019/11/72181135_10156873862697817_3304950211553525760_o-750x430.jpg",
        "https://i.ytimg.com/vi/GYZ7b5P08YA/maxresdefault.jpg",
        "https://img.bleacherreport.net/img/images/photos/003/807/303/hi-res-f13e2c9eb8170ef0757843f85c0919c8_crop_north.jpg?1557366518&w=3072&h=2048"
    ],
    [
        "https://www.gannett-cdn.com/presto/2019/11/05/USAT/c7396bda-215a-49a1-a06b-17fcf4c1dca8-USP_NBA__Los_Angeles_Lakers_at_Dallas_Mavericks.JPG",
        "https://img.sportsv.net/img/article/cover/5/78015/fit-KFdeNCSctr-945x495.jpeg",
        "https://ca-times.brightspotcdn.com/dims4/default/03cac8b/2147483647/strip/true/crop/4000x2667+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F10%2F0e%2Fba92227546f7b34db1b9ccd7d71b%2Fhttps-delivery.gettyimages.com%2Fdownloads%2F1180608415.jpg",
        "https://idsb.tmgrup.com.tr/ly/uploads/images/2020/10/07/63249.jpg"
    ],
];
const background_img = "https://d3data.sportico.com/NBAVal/RevisedGraphBanner.jpg"
let img_boxes = [
    document.getElementById("img-box0"),
    document.getElementById("img-box1"),
    document.getElementById("img-box2"),
    document.getElementById("img-box3")
];

let main_img = document.getElementById("main-img");

let current = 0,
    prev = 0;

init()

function init(){
    main_img.src = imgs[0][0];
    for (let i = 0;i < img_boxes.length ;i++){
        img_boxes[i].src = imgs[0][i];
    }
    img_boxes[0].classList.add("chosen");
}

function render(index){
    main_img.src = imgs[0][index];
    prev = current;
    current = index;
    /*current add chosen class*/ 
    img_boxes[current].classList.add("chosen");
    /*prev remove chosen class*/ 
    img_boxes[prev].classList.remove("chosen");

}

function change_album(){
    
}