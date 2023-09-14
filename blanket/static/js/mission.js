//
// Dom loaded
//
document.addEventListener('DOMContentLoaded', () => {

    // Page Animation
    window.setTimeout(() => {
        document.body.classList.remove('fade');
    }, );
});

//
//Help
//
const HelpBtn = document.getElementsByClassName("Btn-help")[0];
const Help = document.getElementsByClassName("Help")[0];
const HelpClose = document.getElementsByClassName("HelpClose")[0];

// open
HelpBtn.addEventListener("click", () => {
    Help.style.display = "block";
});


// close
HelpClose.addEventListener("click", () => {
    Help.style.display = "none";
});


//
// Window home page about modal animation
//
const modal = document.querySelector('.mission-popup');
const modalClose = document.querySelector('.ClosePopup');
const windowBtn = document.querySelector('.Btn-window');
const footer = document.querySelector('.footer');

windowBtn.addEventListener('click', () => {
    footer.style.opacity = 0;
        
    setTimeout(() => {
        modal.style.top = '20px';
    }, 200);

    windowBtn.disabled = true;
    windowBtn.style.pointerEvents = "none";
});

modalClose.addEventListener('click', () => {
    modal.style.top = "844px";
    footer.style.opacity = 1;
    windowBtn.disabled = false;
    windowBtn.style.pointerEvents = "auto";
});

//
// Mission Popup page
//
const mainBtn = document.querySelector('.main-mission');
const mainTitle = document.querySelector('.main-title');
const misFixed = document.querySelector('.mission-fixed');
const misExplain = document.querySelector('.mission-explanation');
const mainShuf = document.querySelector('.main-shuffle');
let misExplain_content = misExplain.innerHTML;

const subNum = 3;
const subBtn = document.querySelectorAll('.sub-mission');
const subMis = document.querySelectorAll('.sub-content');
const subShuf = document.querySelectorAll('.sub-shuffle');
const record = document.querySelector('.Btn-record');

//Main Mission complete
//change main mission style, activate sub mission button
const MainMisComplete = () => {
    misFixed.innerHTML = "";
    misExplain.innerHTML = "미션 완료!";

    // change sub mission style
    for(let i=0; i < subNum; i++){
        subBtn[i].disabled = false;
        subBtn[i].style.backgroundImage = "none";
        subBtn[i].style.opacity = 0.9;
        subMis[i].style.opacity = 1;
        subShuf[i].style.display = "block";
    };

    // record open
    record.disabled = false;
    record.style.opacity = 0.9;
    record.style.backgroundColor = "#FFF7D9";

    // main shuffle disabled
    mainShuf.disabled = true;
    mainShuf.style.display = "none";
    mainShuf.style.backgroundImage = "none";

}

//Main Mission Incomplete
//change main mission style, deactivate serve mission button
const MainMisInComplete = () => {
    misFixed.innerHTML = "오늘 하루의 첫 미션";
    misExplain.innerHTML = misExplain_content;    

    // change submission style
    for(let i=0; i < subNum; i++){
        subBtn[i].disabled = true;
        subBtn[i].style.opacity = 0.5;
        subMis[i].style.opacity = 0;
        subShuf[i].style.display = "none";
        setTimeout(()=>{
            subBtn[i].style.backgroundImage = "url(/static/locked-image.png)";
        }, 600);
    };

    //record open
    record.disabled = true;
    record.style.opacity = 0.5;
    record.style.backgroundColor = "#C6C993";

    //main shuffle abled
    mainShuf.disabled = false;
    mainShuf.style.display = "block";
    mainShuf.style.backgroundImage = "url(/static/big-shuffle.png)";
}

// Redirected Mission page
// Set inital Mission page style
document.addEventListener("DOMContentLoaded", function() {

    // Main Mission style
    let mainMissionCompleted = mainBtn.getAttribute('data-completed') === 'true';
    if (mainMissionCompleted) {
        // completed style
        MainMisComplete();
        mainBtn.style.backgroundColor = "#FFF7D9";
    }
    else{
        // incompleted style
        MainMisInComplete();
        mainBtn.style.backgroundColor = "#C6C993";
    }

    // Sub Mission style
    for(let i=0; i < subNum; i++){
        let subMissionsCompleted = subBtn[i].getAttribute('data-completed');

        if(subMissionsCompleted === "true"){
            // completed style
            subBtn[i].style.backgroundColor = "#FFF7D9";
            subShuf[i].style.display = "none";
        }
        else{
            // incompleted style
            subBtn[i].style.backgroundColor = "#C6C993";
        }
    }
});

//
// when buttons clicked, Change FE and complete data
//

// mission button clicked
let missionButtons = document.querySelectorAll('.main-mission, .sub-mission');
let shuffleButtons = document.querySelectorAll('.main-shuffle, .sub-shuffle');
const subMission = document.querySelector('.sub-content');

missionButtons.forEach(button => {
    button.addEventListener('click', function() {

        // Get id and type data of the button
        let missionId = button.getAttribute('data-mission-id');
        let missionType = button.getAttribute('data-mission-type');
        
        // Fetch data
        fetch(`/mission/complete_mission_js/${missionId}`, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        .then(response => response.json())
        .then(data => {
            // Mission completed, Change FE
            if (data.completed) {
                if(data.type == "main"){
                    MainMisComplete();
                }

                button.style.backgroundColor = "#FFF7D9";
                for(let i=0; i < 4; i++){
                    if(missionButtons[i] == button)
                    subShuf[i-1].style.display = "none";
                };
            }
            // Mission incompleted, Change FE
            else {
                if(data.type == "main"){
                    MainMisInComplete();
                }

                button.style.backgroundColor = "#C6C993";
                for(let i=0; i < 4; i++){
                    if(missionButtons[i] == button)
                    subShuf[i-1].style.display = "block";
                };
            }
        });
    });
});

shuffleButtons.forEach(button => {
    button.addEventListener('click', function() {
        let missionId = button.getAttribute('data-mission-id');
        let missionType = button.getAttribute('data-mission-type');
        // Fetch data
        fetch(`/mission/change_mission_js/${missionId}`, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        .then(response => response.json())
        .then(data => {
                if(data.type == "main"){
                    mainTitle.innerHTML = data.name;
                    misExplain.innerHTML = data.description;
                }
                else if(data.type == "sub"){
                    for(let i=0; i < 4; i++){
                        if(shuffleButtons[i] == button){
                            subMis[i-1].innerHTML = data.name;
                            break;
                        }
                    }
                }
        });
    });
});

// cookiet function for fetch
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}