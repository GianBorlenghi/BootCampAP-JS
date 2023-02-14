const DIVCARDS = document.getElementById("div-cards")
const D = document.getElementById("card-detail");

let id;
let arrayImages = [{
    id: 1,
    img : "./assets/Cinema.jpg",
    name:"Cinema",
    price:"200",
    description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus itaque aliquam exercitationem vel dolorum eveniet nam praesentium accusantium, perspiciatis laborum voluptas voluptatibus officiis rerum quae asperiores, ut consequatur esse porro?",
    category:"",
    date:"23/11/2023",
    place:"Cinema center",
    capacity:"2.500",
    assistance:""
},{
    id:2,
    img:"./assets/Costume_Party.jpg",
    name:"Costume Party",
    price:"50",
    description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus itaque aliquam exercitationem vel dolorum eveniet nam praesentium accusantium, perspiciatis laborum voluptas voluptatibus officiis rerum quae asperiores, ut consequatur esse porro?",
    category:"",
    date:"",
    place:"",
    capacity:"",
    assistance:""
},{
    id:3,
    img:"./assets/Food_Fair.jpg",
    name:"Food Fair",
    price:"70",
    description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus itaque aliquam exercitationem vel dolorum eveniet nam praesentium accusantium, perspiciatis laborum voluptas voluptatibus officiis rerum quae asperiores, ut consequatur esse porro?",
    category:"",
    date:"",
    place:"",
    capacity:"",
    assistance:""
}
,{
    id:4,
    img:"./assets/Marathon.jpg",
    name:"Marathon",
    price:"14",
    description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus itaque aliquam exercitationem vel dolorum eveniet nam praesentium accusantium, perspiciatis laborum voluptas voluptatibus officiis rerum quae asperiores, ut consequatur esse porro?",
    category:"",
    date:"",
    place:"",
    capacity:"",
    assistance:""
},{
    id:5,
    img:"./assets/Museum_Tour.jpg",
    name:"Museum Tour",
    price:"100",
    description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus itaque aliquam exercitationem vel dolorum eveniet nam praesentium accusantium, perspiciatis laborum voluptas voluptatibus officiis rerum quae asperiores, ut consequatur esse porro?",
    category:"",
    date:"",
    place:"",
    capacity:"",
    assistance:""
},{
    id:6,
    img:"./assets/Music_Concert.jpg",
    name:"Music Concert",
    price:"342",
    description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus itaque aliquam exercitationem vel dolorum eveniet nam praesentium accusantium, perspiciatis laborum voluptas voluptatibus officiis rerum quae asperiores, ut consequatur esse porro?",
    category:"",
    date:"",
    place:"",
    capacity:"",
    assistance:""
}]


for(let p of arrayImages){

    DIVCARDS.innerHTML +=  `        <div class="col">
    <div class="card">
      <a href="./details.html" ><img src="${p.img}" class="card-img-top" alt="..."></a>
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">${p.description}o</p>
          <h6>Price: $ ${p.price}</h6>
          <a href="./details.html" onclick="getDetails(${p.id})" class="btn">Ver más</a>
        </div>
    </div>
  </div>
`;
}


/*no funca che.*/
const getDetails = (e)=>{
    alert(arrayImages[e].img)
    console.log(D)
  
    D.innerHTML += `
    <div class="row g-0">
                <div class="col-md-4">
                    <img src="${arrayImages[e].img}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${arrayImages[e].name}</h5>
                        <p class="card-description">${arrayImages[e].description}</p>
                        <p class="card-description">${arrayImages[e].price}</p>
                        <p class="card-description"><small class="description-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
    `;
}


