const DIVCARDS = document.getElementById("div-cards")
const D = document.getElementById('card-detail');
const DIV_CARDS_PAST_EVENTS = document.getElementById('div-cards_past-events');
const DIV_CARDS_FUTURE_EVENTS = document.getElementById('div-cards-future_events')
const TABLE_PERCENTAGE = document.getElementById('tablePercentage');

const BUTTON_SEARCH = document.getElementById("search");
const INPUT_SEARCH = document.getElementById("inputSearch")
const FLEX_CONTAINER_CHECKBOX = document.getElementById('flex-container');

const BUTTON_SEARCH_PAST = document.getElementById("search_past");
const INPUT_SEARCH_PAST = document.getElementById("inputSearch_past")

const BUTTON_SEARCH_FUTURE = document.getElementById("search_future");
const INPUT_SEARCH_FUTURE = document.getElementById("inputSearch_future")



let currentDate = "2022-01-01";
let currentDateFormat = Date.parse(currentDate);


let data = [
    {
        _id: 1,
        "image": "https://i.postimg.cc/Fs03hQDt/Collectivities-Party.jpg",
        "name": "Collectivities Party",
        "date": "2021-12-12",
        "description": "Enjoy your favourite dishes, from different countries, in a unique event for the whole family.",
        "category": "Food Fair",
        "place": "Room A",
        "capacity": 45000,
        "assistance": 42756,
        "price": 5,
    },
    {
        _id: 2,
        "image": "https://i.postimg.cc/ZmD3Xf57/Korean-style.jpg",
        "name": "Korean style",
        "date": "2022-08-12",
        "description": "Enjoy the best Korean dishes, with international chefs and awesome events.",
        "category": "Food Fair",
        "place": "Room A",
        "capacity": 45000,
        "assistance": 42756,
        "price": 10,
    },
    {
        _id: 3,
        "image": "https://i.postimg.cc/GmHRkbNV/Jurassic-Park.jpg",
        "name": "Jurassic Park",
        "date": "2021-11-02",
        "description": "Let's go meet the biggest dinosaurs in the paleontology museum.",
        "category": "Museum",
        "place": "Field",
        "capacity": 82000,
        "assistance": 65892,
        "price": 15,
    },
    {
        _id: 4,
        "image": "https://i.postimg.cc/c4C2zXm8/Parisian-Museum.jpg",
        "name": "Parisian Museum",
        "date": "2022-11-02",
        "description": "A unique tour in the city of lights, get to know one of the most iconic places.",
        "category": "Museum",
        "place": "Paris",
        "capacity": 8200,
        "estimate": 8200,
        "price": 3500,
    },
    {
        _id: 5,
        "image": "https://i.postimg.cc/KYD0jMf2/comicon.jpg",
        "name": "Comicon",
        "date": "2021-02-12",
        "description": "For comic lovers, all your favourite characters gathered in one place.",
        "category": "Costume Party",
        "place": "Room C",
        "capacity": 120000,
        "assistance": 110000,
        "price": 54,
    },
    {
        _id: 6,
        "image": "https://i.postimg.cc/RZ9fH4Pr/halloween.jpg",
        "name": "Halloween Night",
        "date": "2022-02-12",
        "description": "Come with your scariest costume and win incredible prizes.",
        "category": "Costume Party",
        "place": "Room C",
        "capacity": 12000,
        "estimate": 9000,
        "price": 12,
    },
    {
        _id: 7,
        "image": "https://i.postimg.cc/PrMJ0ZMc/Metallica-in-concert.jpg",
        "name": "Metallica in concert",
        "date": "2022-01-22",
        "description": "The only concert of the most emblematic band in the world.",
        "category": "Music Concert",
        "place": "Room A"
        , "capacity": 138000,
        "estimate": 138000,
        "price": 150,
    },
    {
        _id: 8,
        "image": "https://i.postimg.cc/KvsSK8cj/Electronic-Fest.jpg",
        "name": "Electronic Fest",
        "date": "2021-01-22",
        "description": "The best national and international DJs gathered in one place.",
        "category": "Music Concert",
        "place": "Room A",
        "capacity": 138000,
        "assistance": 110300,
        "price": 250,
    },
    {
        _id: 9,
        "image": "https://i.postimg.cc/fyLqZY9K/10-K-for-life.jpg",
        "name": "10K for life",
        "date": "2021-03-01",
        "description": "Come and exercise, improve your health and lifestyle.",
        "category": "Race",
        "place": "Soccer field",
        "capacity": 30000,
        "assistance": 25698,
        "price": 3,
    },
    {
        _id: 10,
        "image": "https://i.postimg.cc/zv67r65z/15kny.jpg",
        "name": "15K NY",
        "date": "2022-03-01",
        "description": "We'll be raising funds for hospitals and medical care in this unique event held in The Big Apple.",
        "category": "Race",
        "place": "New York",
        "capacity": 3000000,
        "assistance": 2569800,
        "price": 3,
    },
    {
        _id: 11,
        "image": "https://i.postimg.cc/Sst763n6/book1.jpg",
        "name": "School's book fair",
        "date": "2022-10-15",
        "description": "Bring your unused school book and take the one you need.",
        "category": "Book Exchange",
        "place": "Room D1",
        "capacity": 150000,
        "estimate": 123286,
        "price": 1,
    },
    {
        _id: 12,
        "image": "https://i.postimg.cc/05FhxHVK/book4.jpg",
        "name": "Just for your kitchen",
        "date": "2021-11-09",
        "description": "If you're a gastronomy lover come get the cookbook that best suits your taste and your family's.",
        "category": "Book Exchange",
        "place": "Room D6",
        "capacity": 130000,
        "assistance": 90000,
        "price": 100,
    },
    {
        _id: 13,
        "image": "https://i.postimg.cc/vH52y81C/cinema4.jpg",
        "name": "Batman",
        "date": "2021-03-11",
        "description": "Come see Batman fight crime in Gotham City.",
        "category": "Cinema",
        "place": "Room D1",
        "capacity": 11000,
        "assistance": 9300,
        "price": 225,
    },
    {
        _id: 14,
        "image": "https://i.postimg.cc/T3C92KTN/scale.jpg",
        "name": "Avengers",
        "date": "2022-10-15",
        "description": "Marvel's Avengers Premier in 3d, the start of an epic saga with your favourite superheroes.",
        "category": "Cinema",
        "place": "Room D1",
        "capacity": 9000,
        "estimate": 9000,
        "price": 250,
    }
];

//-------------------------------------------------------------------------------------


function deleteRepeat(arr) {
    return arr.sort().filter(function (actualCard, posActual, arry) {
        return !posActual || actualCard != arry[posActual - 1];
    })
}

//-------------------------------------------------------------------------------------


let checkBox = ''
const addCheckBox = () => {
    let i = 0;
    let catArray = data.map(ev => ev.category);
    let catArrayWithoutRepeat = deleteRepeat(catArray);
    let div = document.createElement('div');

    catArrayWithoutRepeat.forEach(ev => (i += 1, checkBox +=
        `
        <input type="checkbox" name="${ev}" id="check${i}" ><label for="check${i}">${ev}</label>
        `)
    )

    div.innerHTML = checkBox;
    FLEX_CONTAINER_CHECKBOX.insertBefore(div, FLEX_CONTAINER_CHECKBOX.children[0])

}

//-------------------------------------------------------------------------------------

let allCards = '';
const getAllCards = () => {
    for (let p of data) {
        let dateEvent = Date.parse(p.date)
        allCards += `
                <div class="col">
                    <div class="card">
                        <img src="${p.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${p.name}</h5>
                            <p class="card-text">${p.description}</p>      
                            <h6>Price: $ ${p.price}</h6>
                            <a href="./details.html" target="_blank" onclick="getDetails(${data.indexOf(p)})" class="btn">Ver más</a>
                        </div>
                    </div>
                </div>
    `;
    }

    DIVCARDS.innerHTML = allCards;

    let check = FLEX_CONTAINER_CHECKBOX.children[0].childNodes;
    let arrayCategoryFilter;
    FLEX_CONTAINER_CHECKBOX.children[0].addEventListener("click", () => {
        let i = 1;
        allCards = '';

        acum = 0;
        while (i < check.length) {
            if (check[i].checked) {
                arrayCategoryFilter = data.filter(ev => (ev.category.toLowerCase() == check[i].name.toLowerCase()));
                arrayCategoryFilter.forEach(ev =>
                    allCards += `
            <div class="col">
            <div class="card">
            <img src="${ev.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${ev.name}</h5>
            <p class="card-text">${ev.description}o</p>      
            <h6>Price: $ ${ev.price}</h6>
            <a href="./details.html" target="_blank" onclick="getDetails(${data.indexOf(ev)})" class="btn">Ver más</a>
            </div>
            </div>
            </div>
            `)



                DIVCARDS.innerHTML = allCards;

                BUTTON_SEARCH.addEventListener("click", (e) => {
                    let searchText = INPUT_SEARCH.value.toLowerCase();
                    let searchFilterByCategory =
                        arrayCategoryFilter.filter(
                            card => (card.name.toLowerCase().includes(searchText) || (card.description.toLowerCase().includes(searchText)))
                        )

                    allCards = '';

                    if (searchFilterByCategory.length > 0) {
                        searchFilterByCategory.forEach(ev => (
                            allCards += `
                        <div class="col">
                            <div class="card">
                                <img src="${ev.image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${ev.name}</h5>
                                    <p class="card-text">${ev.description}o</p>      
                                    <h6>Price: $ ${ev.price}</h6>
                                    <a href="./details.html" target="_blank" onclick="getDetails(${data.indexOf(ev)})" class="btn">Ver más</a>
                                </div>
                            </div>
                        </div>
                `))

                        DIVCARDS.innerHTML = allCards;
                        event.preventDefault();
                    } else {
                        DIVCARDS.innerHTML = `<h3 style='text-align:center;color:red;'>No matches found for ' ${searchText} ' in ${arrayCategoryFilter[0].category}</h3>`
                        event.preventDefault();
                    }
                }
                )

            } if (!check[i].checked) {
                acum += 1;
                n = undefined;
            }

            if (acum == (Math.floor((check.length) / 3))) {

                allCards = '';
                getAllCards();
                event.stopImmediatePropagation();
                break;
            }
            event.stopImmediatePropagation();
            i += 3;

        }
    });

    BUTTON_SEARCH.addEventListener("click", (e) => {
        let searchText = INPUT_SEARCH.value.toLowerCase();
        if (!check[1].checked) {


            let arrayEventsFiltered =
                data.filter(
                    card => (card.name.toLowerCase().includes(searchText) || (card.description.toLowerCase().includes(searchText)))
                )

            allCards = '';

            if (arrayEventsFiltered.length > 0) {
                arrayEventsFiltered.forEach(ev => (
                    allCards += `
        <div class="col">
            <div class="card">
                <img src="${ev.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${ev.name}</h5>
                    <p class="card-text">${ev.description}o</p>      
                    <h6>Price: $ ${ev.price}</h6>
                    <a href="./details.html" target="_blank" onclick="getDetails(${data.indexOf(ev)})" class="btn">Ver más</a>
                </div>
            </div>
        </div>
`))

                DIVCARDS.innerHTML = allCards;
                event.preventDefault();
            } else {
                DIVCARDS.innerHTML = `<h3 style='text-align:center;color:red;'>No matches found for ' ${searchText} '</h3>`
                event.preventDefault();
            }
        } else {

            let arrayEvent =
                arrayCategoryFilter.filter(
                    card => (card.name.toLowerCase().includes(searchText) || (card.description.toLowerCase().includes(searchText)))
                )
            allCards = '';

            if (arrayEvent.length > 0) {
                arrayEvent.forEach(ev => (
                    allCards += `
        <div class="col">
            <div class="card">
                <img src="${ev.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${ev.name}</h5>
                    <p class="card-text">${ev.description}o</p>      
                    <h6>Price: $ ${ev.price}</h6>
                    <a href="./details.html" target="_blank" onclick="getDetails(${data.indexOf(ev)})" class="btn">Ver más</a>
                </div>
            </div>
        </div>
`))

                DIVCARDS.innerHTML = allCards;
                event.preventDefault();
            } else {
                DIVCARDS.innerHTML = `<h3 style='text-align:center;color:red;'>No matches found for ' ${searchText} '</h3>`;
                event.preventDefault();

            }

        }

    });
}

//-------------------------------------------------------------------------------------
//Buscamos las tarjetas de eventos que ya pasaron.

let pastEventsCards = '';
const getPastEvents = () => {

    let pastEventsArray = data.filter(ev => (Date.parse(ev.date) < currentDateFormat))
    pastEventsArray.forEach(
        e => (
            pastEventsCards +=
            `<div class="col">
    <div class="card">
        <img src="${e.image}" class="card-img-top" alt="img">
        <div class="card-body">
            <h5 class="card-title">${e.name}</h5>
            <p class="card-text">${e.description}o</p>
            <h6>Price: $ ${e.price}</h6>
            <a href="./details.html" target="_blank" onclick="getDetails(${data.indexOf(e)})" class="btn">Ver más</a>
        </div>
    </div>
</div>
`
        ));
    DIV_CARDS_PAST_EVENTS.innerHTML = pastEventsCards;

    //Agregamos eventos

    BUTTON_SEARCH_PAST.addEventListener("click", (e) => {
        let searchText = INPUT_SEARCH_PAST.value.toLowerCase();
        let arrayEventsFiltered =
            pastEventsArray.filter(
                card => (card.name.toLowerCase().includes(searchText) || (card.description.toLowerCase().includes(searchText)))
            )

        pastEventsCards = '';

        if (arrayEventsFiltered.length > 0) {
            arrayEventsFiltered.forEach(ev => (
                pastEventsCards += `
            <div class="col">
                <div class="card">
                    <img src="${ev.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${ev.name}</h5>
                        <p class="card-text">${ev.description}o</p>      
                        <h6>Price: $ ${ev.price}</h6>
                        <a href="./details.html" target="_blank" onclick="getDetails(${data.indexOf(ev)})" class="btn">Ver más</a>
                    </div>
                </div>
            </div>
    `))

            DIV_CARDS_PAST_EVENTS.innerHTML = pastEventsCards;
            event.preventDefault();
        } else {
            DIV_CARDS_PAST_EVENTS.innerHTML = `<h3 style='text-align:center;color:red;'>No matches found for ' ${searchText} '</h3>`
            event.preventDefault();
        }
    }
    )

}


//-------------------------------------------------------------------------------------

let futureEventsCards = '';
const getFutureEvents = () => {

    let futureEventsArray = data.filter(ev => (Date.parse(ev.date) > currentDateFormat))
    futureEventsArray.forEach(
        e => (
            futureEventsCards +=
            `<div class="col">
            <div class="card">
                <img src="${e.image}" class="card-img-top" alt="img">
                <div class="card-body">
                    <h5 class="card-title">${e.name}</h5>
                    <p class="card-text">${e.description}o</p>
                    <h6>Price: $ ${e.price}</h6>
                    <a href="./details.html" target="_blank" onclick="getDetails(${data.indexOf(e)})" class="btn">Ver más</a>
                </div>
            </div>
        </div>
        `
        ));
    DIV_CARDS_FUTURE_EVENTS.innerHTML = futureEventsCards;

    BUTTON_SEARCH_FUTURE.addEventListener("click", (e) => {
        let searchText = INPUT_SEARCH_FUTURE.value.toLowerCase();
        let futureArrayEventsFiltered =
            futureEventsArray.filter(
                card => (card.name.toLowerCase().includes(searchText) || (card.description.toLowerCase().includes(searchText)))
            )

        futureEventsCards = '';

        if (futureArrayEventsFiltered.length > 0) {
            futureArrayEventsFiltered.forEach(ev => (
                futureEventsCards += `
                <div class="col">
                    <div class="card">
                        <img src="${ev.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${ev.name}</h5>
                            <p class="card-text">${ev.description}o</p>      
                            <h6>Price: $ ${ev.price}</h6>
                            <a href="./details.html" target="_blank" onclick="getDetails(${data.indexOf(ev)})" class="btn">Ver más</a>
                        </div>
                    </div>
                </div>
        `))

            DIV_CARDS_FUTURE_EVENTS.innerHTML = futureEventsCards;
            event.preventDefault();
        } else {
            DIV_CARDS_FUTURE_EVENTS.innerHTML = `<h3 style='text-align:center;color:red;'>No matches found for ' ${searchText} '</h3>`
            event.preventDefault();
        }
    }
    )
}

//-------------------------------------------------------------------------------------

function getDetails(e) {
    localStorage.setItem("id", e);
}

//-------------------------------------------------------------------------------------


const details = (e) => {
    let id = localStorage.getItem('id');
    let element = '';

    data.forEach(i => {
        if (data.indexOf(i) == id) {
            element = i;
        }
    })

    if (Date.parse(element.date) < currentDateFormat) {

        D.innerHTML = `
            <div class="row g-0">
                 <div class="col-md-4">
                 <img src="${element.image}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                       <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                          <p class="card-description">${element.description}</p>
                        <p class="card-description">Date: <b style="color:#111">${element.date}</b></p>
                        <p class="card-description">Capacity: <b style="color:#111">${element.capacity}</b></p>
                        <p class="card-description">Assistance: <b style="color:#111">${element.assistance}</b></p>
                           <p class="card-description">Place: <b style="color:#111">${element.place}</b></p>
                        <p class="card-description">$ <i>${element.price}</i></p>
                   </div>
                </div>
            </div>
                                `;

    } else {
        D.innerHTML = `
                <div class="row g-0">
                     <div class="col-md-4">
                     <img src="${element.image}" class="img-fluid rounded-start" alt="...">
                     </div>
                     <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-description">${element.description}</p>
                            <p class="card-description">Date: <b style="color:#111">${element.date}</b></p>
                            <p class="card-description">Capacity: <b style="color:#111">${element.capacity}</b></p>
                            <p class="card-description">Place: <b style="color:#111">${element.place}</b></p>
                            <p class="card-description">$ <i>${element.price}</i></p>
                        </div>
                     </div>
                </div>
                                   `;
    }
}
//-------------------------------------------------------------------------------------

addCheckBox();



