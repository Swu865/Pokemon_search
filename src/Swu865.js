///navigation display
const showhome = () =>{
    //nav onclick color display
    document.getElementById("homepage").style.display = "block";
    document.getElementById("staffpage").style.display = "none";
    document.getElementById("shoppage").style.display = "none";
    document.getElementById("commentpage").style.display = "none";
    document.getElementById("welcome").style.display = "block";

    //nav onclick color
    document.getElementById("hometab").style.backgroundColor = "#04AA6D";
    document.getElementById("staffstab").style.backgroundColor = "transparent";
    document.getElementById("shoptab").style.backgroundColor = "transparent";
    document.getElementById("commenttab").style.backgroundColor = "transparent";

}

const showstaffs= () =>{
    //nav onclick color display
    document.getElementById("homepage").style.display = "none";
    document.getElementById("staffpage").style.display = "block";
    document.getElementById("shoppage").style.display = "none";
    document.getElementById("commentpage").style.display = "none";

    //nav onclick color
    document.getElementById("hometab").style.backgroundColor = "transparent";
    document.getElementById("staffstab").style.backgroundColor = "#04AA6D";
    document.getElementById("shoptab").style.backgroundColor = "transparent";
    document.getElementById("commenttab").style.backgroundColor = "transparent";
}

const showshop = () =>{
    //nav onclick color display
    document.getElementById("homepage").style.display = "none";
    document.getElementById("staffpage").style.display = "none";
    document.getElementById("shoppage").style.display = "block";
    document.getElementById("commentpage").style.display = "none";

    //nav onclick color
    document.getElementById("hometab").style.backgroundColor = "transparent";
    document.getElementById("staffstab").style.backgroundColor = "transparent";
    document.getElementById("shoptab").style.backgroundColor = "#04AA6D";
    document.getElementById("commenttab").style.backgroundColor = "transparent";
}

const showcomment = () =>{
    //nav onclick color display
    document.getElementById("homepage").style.display = "none";
    document.getElementById("staffpage").style.display = "none";
    document.getElementById("shoppage").style.display = "none";
    document.getElementById("commentpage").style.display = "block";

    //nav onclick color
    document.getElementById("hometab").style.backgroundColor = "transparent";
    document.getElementById("staffstab").style.backgroundColor = "transparent";
    document.getElementById("shoptab").style.backgroundColor = "transparent";
    document.getElementById("commenttab").style.backgroundColor = "#04AA6D";
}

window.onload = showhome;


//Comment part
const WriteComment = () =>{
    
    var name = document.getElementById("comment_username").value;
    var comment = document.getElementById("comment_content").value;
    data = {"Comment":comment,"Name": name }    
    var jsonData = JSON.stringify(data)    
    var xhr = new XMLHttpRequest(); 
    var url = 'http://localhost:5000/api/WriteComment';
    xhr.open("POST", url); 
    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.send(jsonData);
    alert("comment sent successfully")
    
}

const refresh_comment = ()=>{
    document.getElementById('ifram_comment').src = document.getElementById('ifram_comment').src
}

//Items part
//list all item
const getitems = () =>{
    const fetchPromise = fetch('http://localhost:5000/api/GetItems',{
        headers:{
            "Content-Type": "application/json"
        },
    })
    const streamPromise = fetchPromise.then((respense) => respense.json());
    streamPromise.then((data) =>  showitems(data) );    
}

const showitems = (items) =>{
    let htmlString ="<tr class ='title'> <td>Item</td><td>Item ID</td> <td>Item Name</td> <td>Description</td> <td>Price</td> </tr>";    
    const showitem = (item)=>{        
        htmlString += `<tr><td><img src="http://localhost:5000/api/GetItemPhoto/${item.id}" alt="item_image" style="max-width:50px;max-height:50px;" ></td><td>${item.id}</td><td>${item.name}</td><td>${item.description}</td><td>${item.price}</td></tr>` ;
    }
    items.forEach(showitem)    
    const ourTable = document.getElementById("itemtb");
    ourTable.innerHTML = htmlString;
}

//get staff
const get_staff_id = () =>{
    const fetchPromise = fetch('http://localhost:5000/api/GetAllStaff',{
        headers:{
            "Content-Type": "application/json"
        },
    })
    const streamPromise = fetchPromise.then((respense) => respense.json());
    streamPromise.then((data) =>  link_id_with_vcard(data)  );    
}

const link_id_with_vcard = (staffs_ids) =>{
    let staff_id_array =[];
    

    const showitem = (staff_id)=>{        
        staff_id_array.push(`${staff_id.id}`) ;
    }
    staffs_ids.forEach(showitem)
    
    for(var i = 0; i<staff_id_array.length;i++){
        
        const fetchPromise = fetch("http://localhost:5000/api/GetCard/"+staff_id_array[i])
        const streamPromise = fetchPromise.then((response)=>response.text());
        streamPromise.then(function(data){
            
            parse_vcard(data)  ;
        });
    }
     
}

const parse_vcard = (vcards) =>{
    

    let card= vcards.split(":").join("").split("\n");
    let staff_uid = card[4].split("UID").join("");
    let staff_name = card[2].split("N").join("").split(";;").join(" ").split(";").join(" ");    
    let staff_research = card[9].split("CATEGORIES").join("");
    let staff_phone = card[7].split("TEL").join("");
    let staff_email = card[6].split("EMAIL;TYPE=work").join("");      
   let htmlString = `<tr><td><img src=http://localhost:5000/api/GetStaffPhoto/`+staff_uid+ `alt="item_image" style="max-width:50px;max-height:50px;" ></td><td>`+staff_uid+`</td><td>`+staff_name+`</td><td>`+staff_research+`</td><td>`+staff_phone+`</td><td>`+staff_email+`</td></tr>` ;
    
       
    const ourTable = document.getElementById("stafftb");
    ourTable.innerHTML += htmlString;
}





//list search item
const get_search_item = () =>{
    var user_search= document.getElementById('shop_search').value        
    var url = 'http://localhost:5000/api/GetItems/'+ user_search;
    const fetchPromise = fetch(url)
    const streamPromise = fetchPromise.then((respense) => respense.json());
    streamPromise.then((data) =>   show_search_item(data)  );
    document.getElementById("itemtb").style.display = "none";
}

const show_search_item = (items) =>{
    let htmlString ="<tr class ='title'> <td>Item</td><td>Item ID</td> <td>Item Name</td> <td>Description</td> <td>Price</td> </tr>";    
    const showitem = (item)=>{        
        htmlString += `<tr><td><img src="http://localhost:5000/api/GetItemPhoto/${item.id}" alt="item_image" style="max-width:50px;max-height:50px;" ></td><td>${item.id}</td><td>${item.name}</td><td>${item.description}</td><td>${item.price}</td></tr>` ;
    }
    items.forEach(showitem)    
    const ourTable = document.getElementById("itemtb_search");
    ourTable.innerHTML = htmlString;
}

//get version
const get_version =() =>{
    const fetchPromise = fetch("http://localhost:5000/api/GetVersion")
    const streamPromise = fetchPromise.then((respense) => respense.text());
    streamPromise.then((data) =>   show_version(data)   );
}

const show_version = (version) =>{
    let htmlString ="<h1>Welcome to SHIT(Ver: "+ version+ ")</h1>";    
          
    const ourwelcome = document.getElementById("welcome");
    ourwelcome.innerHTML = htmlString;
}
get_version();

