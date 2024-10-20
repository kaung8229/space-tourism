// GET UI
function selectele(classname){
    return document.querySelector(`.${classname}`);
}
function selecteleall(classname){
    return document.querySelectorAll(`.${classname}`);
}


// Fetch data from local
async function fetchdata(){
    const response = await fetch("./data.json");
    const data = await response.json();

    return data;
}
// fetchdata();


// start navbar to page to show
selecteleall("navpagelink").forEach(link => {
    link.addEventListener("click",function(){
        selecteleall("navpagelink").forEach(link => {
            link.classList.remove("active");
        })
        this.classList.add("active");
        // console.log(this.getAttribute("href").substr(1));
        selectele("navpagelinks").classList.remove("show");
        selectele("navbtn img").src = "./assets/shared/icon-hamburger.svg";

        const navlink = this.getAttribute("href").substr(1);

        selecteleall("pages section").forEach(section => {
            section.classList.remove("show");

            if(section.id === navlink){
                section.classList.add("show");
            }
        })
    })
})

selectele("navbtn").addEventListener("click",function(){
    selectele("navpagelinks").classList.toggle("show");
    if(selectele("navpagelinks").classList.contains("show")){
        selectele("navbtn img").src = "./assets/shared/icon-close.svg";
    }else{
        selectele("navbtn img").src = "./assets/shared/icon-hamburger.svg";
    }
})
// end navbar to page to show


// start planet info for planet list item
selecteleall("planetbtn").forEach(btn => {
    btn.addEventListener("click",function(){
        selecteleall("planetbtn").forEach(btn => {
            btn.classList.remove("active");
        })
        this.classList.add("active");

        const planetlink = this.innerText.toLowerCase();
        selecteleall("planetimg").forEach(img => {
            img.classList.remove("active");

            if(img.getAttribute('alt') === planetlink){
                img.classList.add("active");
            }
        })

        getdestinationinfo(planetlink);
    })
})

async function getdestinationinfo(planetlink){
    const data = await fetchdata();
    // console.log(data);

    selectele("destination .info-container").innerHTML = "";

    data.destinations.forEach(info => {
        if(info.name.toLowerCase() === planetlink){
            const newdiv = document.createElement("div");
            newdiv.className = "info show";
            newdiv.innerHTML = `
            <h1 class="planetname">${info.name}</h1>
            <p class="desc">${info.description}</p>
            <div class="estimate">
                <div>
                    <p>Avg. distance</p>
                    <p>${info.distance}</p>
                </div>
                <div>
                    <p>Est. travel time</p>
                    <p>${info.travel}</p>
                </div>
            </div>
            `;
            selectele("destination .info-container").appendChild(newdiv);
        }
    })
}
// end planet info for planet list item



// start crew info
selecteleall("crew .indicators li").forEach(indicate => {
    indicate.addEventListener("click",function(){
        selecteleall("indicators li").forEach(indicate => {
            indicate.classList.remove("active");
        })
        this.classList.add("active");

        const indicateId = this.id;
        getcrewinfo(indicateId);
    })
})

async function getcrewinfo(id){
    const infos = await fetchdata();

    selectele("crew .content .right").innerHTML = "";
    const newimg = document.createElement("img");
    newimg.src = infos.crew[id].images.png;
    newimg.className = "crewimg active";
    selectele("crew .content .right").appendChild(newimg);

    selectele("crew .info-container").innerHTML = "";
    const newdiv = document.createElement("div");
    newdiv.className = "info show";
    newdiv.innerHTML = `
    <span>${infos.crew[id].role}</span>
    <h1 class="name">${infos.crew[id].name}</h1>
    <p class="desc">${infos.crew[id].bio}</p>
    `;
    selectele("crew .info-container").appendChild(newdiv);
}
// end crew info


// start technology info
selecteleall("technology .indicators li").forEach((indicate,idx) => {
    indicate.addEventListener("click",function(){
        selecteleall("technology .indicators li").forEach(indicate => {
            indicate.classList.remove("active");
        })
        this.classList.add('active');

        gettechnologyinfo(idx);
    })
})

async function gettechnologyinfo(idx){
    const infos = await fetchdata();

    selectele("technology .content .right").innerHTML = "";
    const newimg = document.createElement("img");
    newimg.src = infos.technology[idx].images.portrait;
    newimg.className = "technoimg active";
    selectele("technology .content .right").appendChild(newimg);

    selectele("technology .info-container").innerHTML = "";
    const newdiv = document.createElement("div");
    newdiv.className = "info show";
    newdiv.innerHTML = `
    <span>The terminology...</span>
    <h1 class="name">${infos.technology[idx].name}</h1>
    <p class="desc">${infos.technology[idx].description}</p>
    `;
    selectele("technology .info-container").appendChild(newdiv);
}
// end technology info





