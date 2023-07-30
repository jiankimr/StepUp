document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
        document.body.classList.remove('fade');
    }, 500);
});

const appBody = document.getElementsByClassName("appBody")[0];
const winBtn = document.getElementsByClassName("windowBtn")[0];
const homeImg = appBody.style.backgroundImage;

let homeState;
if(homeImg === "url(../images/home-bright-open.png)"){
    homeState = "bright";
}
else{
    homeState = "dark";
}

winBtn.addEventListener("click", () => {
    if(homeState === "dark"){
        appBody.style.backgroundImage = "url(../images/home-bright-open.png)"
        homeState = "bright";

        setTimeout(() => {
            location.href = '../../mission/templates/mission.html';
        }, 1000);
    }
});
