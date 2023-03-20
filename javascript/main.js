const DIVCARDS = document.getElementById("div-cards")
const CARD_DETAILS = document.getElementById('card-detail');
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

const FOOTER = document.querySelector("footer")
const CHECKBOX_ARRAY = document.querySelectorAll("input[type=checkbox]");

//-------------------------------------------------------------------------------------

function deleteRepeat(arr) {
    return arr.sort().filter(function (actualCard, posActual, arry) {
        return !posActual || actualCard != arry[posActual - 1];
    })
}

//-------------------------------------------------------------------------------------

function arrayObjectWithouthRepeat(array) {
    let set = new Set(array.map(JSON.stringify))
    return Array.from(set).map(JSON.parse);
}
function adjustPercentage(x) {
    return Number.parseFloat(x).toFixed(2);
}
async function datos() {
    try {
        const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        data = await response.json();
        return data;
    } catch (er) {
        throw new Error(er);
    }
}

//-------------------------------------------------------------------------------------
let checkBox = ''
const addCheckBox = async () => {
    let i = 0;
    let data = await datos();
    let catArray = data.events.map(ev => ev.category);
    let catArrayWithoutRepeat = deleteRepeat(catArray);
    let div = document.createElement('div');
    div.classList.add("flex-checkbox")
    catArrayWithoutRepeat.forEach(ev => (i += 1, checkBox +=
        `
        <input type="checkbox" name="${ev}" id="check${i}" ><label for="check${i}">${ev}</label>
        `)
    )

    div.innerHTML = checkBox;
    FLEX_CONTAINER_CHECKBOX.insertBefore(div, FLEX_CONTAINER_CHECKBOX.children[0])
}

const generateCard = (event) => {
    return `
    <div class="col">
        <div class="card">
            <img src="${event.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>      
                <h6>Price: $ ${event.price}</h6>
                <a target="_blank" href="./details.html" onclick="getDetails(${event._id})" class="btn">Ver más</a>
            </div>
        </div>
    </div>
`;

}

//-------------------------------------------------------------------------------------

let allCards = '';


let ar = [];
let nAr = [];
let arrayCategoryFilter = [];
const getAllCards = async () => {
    let data = await datos();

    for (let p of data.events) {
        let dateEvent = Date.parse(p.date)
        allCards += generateCard(p);
    }

    DIVCARDS.innerHTML = allCards;

    allCards = '';
    let CHECKBOX_ARRAY = document.querySelectorAll("input[type=checkbox]");
    let acum = 0;

    let check = FLEX_CONTAINER_CHECKBOX.children[0].childNodes;

    FLEX_CONTAINER_CHECKBOX.children[0].addEventListener("change", () => {
        let i = 1;
        let searchFilterByCategory = [];
        acum = 0;
        allCards = '';
        ar.concat(arrayCategoryFilter);
        while (i < check.length) {
            if (check[i].checked) {
                arrayCategoryFilter = data.events.filter(ev => (ev.category.toLowerCase() == check[i].name.toLowerCase()));
                arrayCategoryFilter.forEach(ev =>
                    allCards += generateCard(ev))
                let k = 0;
                while (k < arrayCategoryFilter.length) {

                    ar.push(arrayCategoryFilter[k]);
                    k += 1;
                }
                DIVCARDS.innerHTML = allCards;

                nAr = arrayObjectWithouthRepeat(ar);

                BUTTON_SEARCH.addEventListener("click", (e) => {

                    let searchText = INPUT_SEARCH.value.toLowerCase();
                    searchFilterByCategory =
                        nAr.filter(
                            card => (card.name.toLowerCase().includes(searchText) || (card.description.toLowerCase().includes(searchText)))
                        )


                    allCards = '';

                    if (searchFilterByCategory.length > 0) {
                        searchFilterByCategory.forEach(ev => (
                            allCards += generateCard(ev)))

                        DIVCARDS.innerHTML = allCards;

                        event.preventDefault();
                    } else {
                        DIVCARDS.innerHTML = `<h3 style='text-align:center;color:red;'>No matches found for ' ${searchText} '</h3>`
                        event.preventDefault();
                    }
                }

                )

            } if (!check[i].checked) {
                acum += 1;
                ar = [];
            }

            if (acum == CHECKBOX_ARRAY.length) {
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
                data.events.filter(
                    card => (card.name.toLowerCase().includes(searchText) || (card.description.toLowerCase().includes(searchText)))
                )

            allCards = '';

            if (arrayEventsFiltered.length > 0) {
                arrayEventsFiltered.forEach(ev => (
                    allCards += generateCard(ev)))

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
                    allCards += generateCard(ev)))

                DIVCARDS.innerHTML = allCards;
                event.preventDefault();
            } else {
                DIVCARDS.innerHTML = `<h3 style='text-align:center;color:red;'>No matches found for ' ${searchText} '</h3>`;
                event.preventDefault();

            }
            event.stopImmediatePropagation();

        }

    });

}

//-------------------------------------------------------------------------------------
//Buscamos las tarjetas de eventos que ya pasaron.

ar = [];
nAr = [];
const getPastEvents = async () => {
    let arrayCategoryFilter = [];
    let pastEventsCards = '';
    let arrayEventsFiltered = [];
    let data = await datos();

    let currentDateFormat = Date.parse(data.currentDate);


    let pastEventsArray = data.events.filter(ev => (Date.parse(ev.date) < currentDateFormat))
    pastEventsArray.forEach(
        e => (
            pastEventsCards += generateCard(e)
        ));

    DIV_CARDS_PAST_EVENTS.innerHTML = pastEventsCards;
    pastEventsCards = '';

    let CHECKBOX_ARRAY = document.querySelectorAll("input[type=checkbox]");
    let acum = 0;
    let check = FLEX_CONTAINER_CHECKBOX.children[0].childNodes;

    FLEX_CONTAINER_CHECKBOX.children[0].addEventListener("change", () => {
        let i = 1;
        let searchFilterByCategory = [];
        acum = 0;
        pastEventsCards = '';

        ar.concat(arrayCategoryFilter);

        while (i < check.length) {
            if (check[i].checked) {
                arrayCategoryFilter = data.events.filter(ev => (ev.category.toLowerCase() == check[i].name.toLowerCase()));
                arrayCategoryFilter.forEach(ev =>
                    pastEventsCards += generateCard(ev))
                let k = 0;
                while (k < arrayCategoryFilter.length) {

                    ar.push(arrayCategoryFilter[k]);
                    k += 1;
                }
                DIV_CARDS_PAST_EVENTS.innerHTML = pastEventsCards;

                nAr = arrayObjectWithouthRepeat(ar);

                BUTTON_SEARCH_PAST.addEventListener("click", (e) => {
                    let searchText = INPUT_SEARCH_PAST.value.toLowerCase();

                    searchFilterByCategory =
                        nAr.filter(
                            card => (card.name.toLowerCase().includes(searchText) || (card.description.toLowerCase().includes(searchText)))
                        )


                    pastEventsCards = '';

                    if (searchFilterByCategory.length > 0) {
                        searchFilterByCategory.forEach(ev => (
                            pastEventsCards += generateCard(ev)))

                        DIV_CARDS_PAST_EVENTS.innerHTML = pastEventsCards;

                        event.preventDefault();
                    } else {
                        DIV_CARDS_PAST_EVENTS.innerHTML = `<h3 style='text-align:center;color:red;'>No matches found for ' ${searchText} '</h3>`
                        event.preventDefault();

                    }
                }

                )

            } if (!check[i].checked) {
                acum += 1;
                ar = [];
            }

            if (acum == CHECKBOX_ARRAY.length) {
                pastEventsCards = '';
                getPastEvents();
                event.stopImmediatePropagation();
                break;
            }
            event.stopImmediatePropagation();
            i += 3;

        }

    });

    //Agregamos eventos

    BUTTON_SEARCH_PAST.addEventListener("click", (e) => {
        let searchText = INPUT_SEARCH_PAST.value.toLowerCase();
        if (!check[1].checked) {
            let arrayEventsFiltered =
                pastEventsArray.filter(
                    card => (card.name.toLowerCase().includes(searchText) || (card.description.toLowerCase().includes(searchText)))
                )

            pastEventsCards = '';

            if (arrayEventsFiltered.length > 0) {
                arrayEventsFiltered.forEach(ev => (
                    pastEventsCards += generateCard(ev)))

                DIV_CARDS_PAST_EVENTS.innerHTML = pastEventsCards;
                event.preventDefault();
            } else {
                DIV_CARDS_PAST_EVENTS.innerHTML = `<h3 style='text-align:center;color:red;'>No matches found for ' ${searchText} '</h3>`
                event.preventDefault();
            }
        } else {
            let arrayEvent =
                arrayEventsFiltered.filter(
                    card => (card.name.toLowerCase().includes(searchText) || (card.description.toLowerCase().includes(searchText)))
                )
            pastEventsCards = '';

            if (arrayEvent.length > 0) {
                arrayEvent.forEach(ev => (
                    pastEventsCards += generateCard(ev)))

                DIV_CARDS_PAST_EVENTS.innerHTML = pastEventsCards;
                event.preventDefault();
            } else {
                DIV_CARDS_PAST_EVENTS.innerHTML = `<h3 style='text-align:center;color:red;'>No matches found for ' ${searchText} '</h3>`;
                event.preventDefault();

            }
            event.stopImmediatePropagation();
        }
    }
    )

}


//-------------------------------------------------------------------------------------
//***********************UPCOMING EVENTS*************************************

let futureEventsCards = '';
let futureEventsArray = [];
const getFutureEvents = async () => {
    let futureEventsCards = '';
    let ar = [];
    let nAr = [];
    let arrayCategoryFilter = [];
    let arrayEventsFiltered = [];
    let data = await datos();
    let currentDateFormat = Date.parse(data.currentDate);
    futureEventsArray = data.events.filter(ev => (Date.parse(ev.date) > currentDateFormat))
    futureEventsArray.forEach(
        e => (
            futureEventsCards += generateCard(e)
        ));
    DIV_CARDS_FUTURE_EVENTS.innerHTML = futureEventsCards;

    futureEventsCards = '';

    let CHECKBOX_ARRAY = document.querySelectorAll("input[type=checkbox]");
    let acum = 0;
    let check = FLEX_CONTAINER_CHECKBOX.children[0].childNodes;

    //***********************CAPTURANDO EVENTO CHANGE DE CHECKBOX************************************
    FLEX_CONTAINER_CHECKBOX.children[0].addEventListener("change", () => {
        let i = 1;
        let searchFilterByCategory = [];
        acum = 0;
        futureEventsCards = '';

        ar.concat(arrayCategoryFilter);

        while (i < check.length) {
            if (check[i].checked) {

                arrayCategoryFilter = data.events.filter(ev => (ev.category.toLowerCase() == check[i].name.toLowerCase()));
                arrayCategoryFilter.forEach(ev =>
                    futureEventsCards += generateCard(ev))

                let k = 0;
                while (k < arrayCategoryFilter.length) {

                    ar.push(arrayCategoryFilter[k]);
                    k += 1;
                }
                DIV_CARDS_FUTURE_EVENTS.innerHTML = futureEventsCards;

                nAr = arrayObjectWithouthRepeat(ar);

                //***********************BOTÓN SEARCH COMBINADO*******************************


                BUTTON_SEARCH_FUTURE.addEventListener("click", (e) => {
                    let searchText = INPUT_SEARCH_FUTURE.value.toLowerCase();

                    searchFilterByCategory =
                        nAr.filter(
                            card => (card.name.toLowerCase().includes(searchText) || (card.description.toLowerCase().includes(searchText)))
                        )


                    futureEventsCards = '';

                    if (searchFilterByCategory.length > 0) {
                        searchFilterByCategory.forEach(ev => (
                            futureEventsCards += generateCard(ev)))

                        DIV_CARDS_FUTURE_EVENTS.innerHTML = futureEventsCards;

                        event.preventDefault();
                    } else {
                        DIV_CARDS_FUTURE_EVENTS.innerHTML = `<h3 style='text-align:center;color:red;'>No matches found for ' ${searchText} '</h3>`
                        event.preventDefault();

                    }
                }

                )

            } if (!check[i].checked) {
                acum += 1;
                ar = [];
            }

            if (acum == CHECKBOX_ARRAY.length) {
                futureEventsCards = '';
                getFutureEvents();
                event.stopImmediatePropagation();
                break;
            }
            event.stopImmediatePropagation();
            i += 3;

        }

    });

    //***********************BUSQUEDA DE EVENTOS SIN FILTRO POR CATEGORIA*************************************

    BUTTON_SEARCH_FUTURE.addEventListener("click", (e) => {
        let searchText = INPUT_SEARCH_FUTURE.value.toLowerCase();
        if (!check[1].checked) {
            arrayEventsFiltered =
                futureEventsArray.filter(
                    card => (card.name.toLowerCase().includes(searchText) || (card.description.toLowerCase().includes(searchText)))
                )

            futureEventsCards = '';

            if (arrayEventsFiltered.length > 0) {
                arrayEventsFiltered.forEach(ev => (
                    futureEventsCards += generateCard(ev)))

                DIV_CARDS_FUTURE_EVENTS.innerHTML = futureEventsCards;
                event.preventDefault();
            } else {
                DIV_CARDS_FUTURE_EVENTS.innerHTML = `<h3 style='text-align:center;color:red;'>No matches found for ' ${searchText} '</h3>`
                event.preventDefault();
            }
        } else {
            let arrayEvent =
                arrayEventsFiltered.filter(
                    card => (card.name.toLowerCase().includes(searchText) || (card.description.toLowerCase().includes(searchText)))
                )
            futureEventsCards = '';

            if (arrayEvent.length > 0) {
                arrayEvent.forEach(ev => (
                    futureEventsCards += generateCard(ev)))

                DIV_CARDS_FUTURE_EVENTS.innerHTML = futureEventsCards;
                event.preventDefault();
            } else {
                DIV_CARDS_FUTURE_EVENTS.innerHTML = `<h3 style='text-align:center;color:red;'>No matches found for ' ${searchText} '</h3>`;
                event.preventDefault();

            }
            event.stopImmediatePropagation();
        }
    }
    )


}

//

//-------------------------------------------------------------------------------------
const getDetails = (e) => {

    window.location.href = (`./details.html?id=${e}`)

}

//-------------------------------------------------------------------------------------
let eventDetails = '';
const details = async () => {

    let data = await datos();

    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");

    let element = data.events.find(v => v._id == id)
    let currentDateFormat = Date.parse(data.currentDate);

    if (Date.parse(element.date) < currentDateFormat) {
        eventDetails = `
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
        CARD_DETAILS.innerHTML = eventDetails;

    } else {
        eventDetails = `
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
                                        <p class="card-description">Estimate: <b style="color:#111">${element.estimate}</b></p>
                                        <p class="card-description">Place: <b style="color:#111">${element.place}</b></p>
                                        <p class="card-description">$ <i>${element.price}</i></p>
                                    </div>
                                 </div>
                            </div>
                                               `;

        CARD_DETAILS.innerHTML = eventDetails;

    }
}



let porcentajes = [];
let catFilter = [];

const addStats = (selector, arr, total, variable, i) => {
    
    selector.children[i + 1].children[0].innerHTML = `<i style="color:#fff;">${arr[i]}</i>`;
    selector.children[i + 1].children[1].innerHTML = `<b style="color:#aaa;">$ ${total}</b>`;
    selector.children[i + 1].children[2].innerHTML = `<b style="color:#aaa;">${variable}` + "% </b>";
}

const eventsStatistics = async () => {

    let data = await datos();

    data.events.forEach(
        ev => {
            if (ev.assistance != undefined) {
                porcentajes.push("(" + adjustPercentage(ev.assistance * 100 / ev.capacity) + "%)" + `  <b style="color:#fff">${ev.name}</b>`);
            }
        }
    )

    porcentajes.sort((a, b) => {
        if (a == b) {
            return 0;
        } if (a > b) {
            return -1;
        }
        return 1;
    })

    let capacityOrder = data.events.sort((a, b) => {
        if (a.capacity == b.capacity) {
            return 0;
        } if (a.capacity > b.capacity) {
            return -1;
        }
        return 1;
    })

    const table = document.getElementById('tablePercentage').children[1];


    acum = 1;
    k = porcentajes.length;
    while (acum < 6) {
        table.children[acum].children[0].innerHTML = `<i style="color:#aaa;">${porcentajes[acum]}</i>`;
        table.children[acum].children[1].innerHTML = `<i style="color:#aaa;">${porcentajes[k - acum]}</i>`;
        table.children[acum].children[2].innerHTML = `<i style="color:#aaa">(${capacityOrder[acum].capacity})</i> <b style="color:#fff">${capacityOrder[acum].name}</b>`;

        acum++;
    }
}

const futureEventsStatistics = async () => {
    const tableUpcoming = document.getElementById('upcomingTable').children[1]

    let data = await datos();

    let currentDateFormat = Date.parse(data.currentDate);

    let upcomingEvents = data.events.filter(ev => (Date.parse(ev.date) > currentDateFormat));

    let cat = deleteRepeat(upcomingEvents.map(ev => ev.category));

    i = 0;



    total = 0;

    while (i < cat.length) {
        total = 0;
        estimate = 0
        est = 0;
        capacity = 0;

        catFilter = upcomingEvents.filter(ev => (ev.category == cat[i]));
        catFilter.forEach(ev => {

            total += ev.estimate * ev.price;
            est += ev.estimate;
            capacity += ev.capacity;
        })
        estimate = adjustPercentage(est * 100 / capacity);
        addStats(tableUpcoming, cat, total, estimate, i);

        i++;
    }
}

const pastEventsStatistics = async () => {
    const tablePast = document.getElementById('pastTableStatistics').children[1]
    let data = await datos();

    let currentDateFormat = Date.parse(data.currentDate);

    let pastEvents = data.events.filter(ev => (Date.parse(ev.date) < currentDateFormat));

    let cat = deleteRepeat(pastEvents.map(ev => ev.category));

    i = 0;



    while (i < cat.length) {
        total = 0;
        assist = 0;
        capacity = 0;

        catFilter = pastEvents.filter(ev => (ev.category == cat[i]));
        catFilter.forEach(ev => {

            total += ev.assistance * ev.price;
            assist += ev.assistance;
            capacity += ev.capacity;

        })
        estimate = adjustPercentage(assist * 100 / capacity);
        addStats(tablePast, cat, total, estimate, i);
        i++;
    }
}
//               

//-------------------------------------------------------------------------------------
const statistics = () => {

    eventsStatistics();
    pastEventsStatistics();
    futureEventsStatistics();

}

    addCheckBox();


