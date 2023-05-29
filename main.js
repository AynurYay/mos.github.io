

var id;
// Machine elementleri
const deleteModalMachine = new bootstrap.Modal("#deleteMachineModal");
const addModalMachine = new bootstrap.Modal("#addMachineModal");

const btnModalMachine = document.querySelector("#btnModalMachine");
const btnApproveMachine = document.querySelector("#btnApproveMachine");

const btnDivMachine = document.querySelector("#btnDivMachine");
const btnListMachine = document.querySelector("#btnListMachine");
const listMachine = document.querySelector("#listMachine");

const modalHeaderMachine = document.querySelector("#addMachineModal").querySelector(".modal-header");

const machineID = document.querySelector("#machineID");
const machineName = document.querySelector("#machineName");
const machineDescription = document.querySelector("#machineDesc");
const machineGroupID = document.querySelector("#dropdownSelectMachine");

// product elementleri
const deleteModalProduct = new bootstrap.Modal("#deleteProductModal");
const addModalProduct = new bootstrap.Modal("#addProductModal");

const btnModalProduct = document.querySelector("#btnModalProduct");
const btnApproveProduct = document.querySelector("#btnApproveProduct");

const btnDivProduct = document.querySelector("#btnDivProduct");
const btnListProduct = document.querySelector("#btnListProduct");
const listProduct = document.querySelector("#listProduct");

const modalHeaderProduct = document.querySelector("#addProductModal").querySelector(".modal-header");

const productID = document.querySelector("#productID");
const productName = document.querySelector("#productName");
const productDescription = document.querySelector("#productDesc");
const productGroupID = document.querySelector("#dropdownSelectProduct");

// machine detail elementleri
const deleteModalMachineDetail = new bootstrap.Modal("#deleteMachineDetailModal");
const addModalMachineDetail = new bootstrap.Modal("#addMachineDetailModal");

const btnModalMachineDetail = document.querySelector("#btnModalMachineDetail");
const btnApproveMachineDetail = document.querySelector("#btnApproveMachineDetail");

const btnDivMachineDetail = document.querySelector("#btnDivMachineDetail");
const btnListMachineDetail = document.querySelector("#btnListMachineDetail");
const listMachineDetail = document.querySelector("#listMachineDetail");

const modalHeaderMachineDetail = document.querySelector("#addMachineDetailModal").querySelector(".modal-header");

const dropdownMachineID = document.querySelector("#dropdownMachineID");
const dropdownProductID = document.querySelector("#dropdownProductID");
const dropdownProductAmount = document.querySelector("#dropdownProductAmount");


//Bildirim Ekranı Gösterilir
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className} text-center text-uppercase`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container-fluid");
    const main = document.querySelector(".modal");
    container.insertBefore(div, main);
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
}

// Form alanını temizleme
function clearFields(fieldMode) {
    switch (fieldMode) {
        case 1:
            machineID.value = "";
            machineName.value = "";
            machineDescription.value = "";
            machineGroupID.value = null;
            break;
        case 2:
            productID.value = "";
            productName.value = "";
            productDescription.value = "";
            productGroupID.value = null;
            break;
        case 3:
            dropdownMachineID.value = "";
            dropdownProductID.value = "";
            dropdownProductAmount.value = null;
            break;
        default:
            break;
    }

}

// Makine Tablo Verilerini temizleme fonksiyonu
function clearTable(list){
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

// Modal penceresi açılır. Machine
btnModalMachine.addEventListener("click",()=>{
    btnAddCreate(btnDivMachine,modalHeaderMachine);
    getDataMachine(false);
    addModalMachine.show();
    clearFields(1);
});

// Modal penceresi açılır. Product
btnModalProduct.addEventListener("click",()=>{
    btnAddCreate(btnDivProduct,modalHeaderProduct);
    getDataProduct(false);
    addModalProduct.show();
    clearFields(2);
});

// Modal penceresi açılır. Machine Detail
btnModalMachineDetail.addEventListener("click",()=>{
    btnAddCreate(btnDivMachineDetail,modalHeaderMachineDetail);
    getDataMachineDetail(false);
    addModalMachineDetail.show();
    clearFields(3);
});

// modal ekle butonu oluşturulur.
function btnAddCreate(btnDiv,modalHeader) {
    
    while(btnDiv.firstChild){
        btnDiv.removeChild(btnDiv.firstChild);
    }
    const btnElement = document.createElement("button");
    btnElement.textContent = "Ekle";
    btnElement.classList.add("btn","btn-info","add");
    btnDiv.appendChild(btnElement);
    modalHeader.classList.add("bg-info");
    modalHeader.classList.remove("bg-warning");

}

// modal güncelle butonu oluşturulur.
function btnUpdateCreate(btnDiv,modalHeader) {
    
    while(btnDiv.firstChild){
        btnDiv.removeChild(btnDiv.firstChild);
    }
    const btnElement = document.createElement("button");
    btnElement.textContent = "Güncelle";
    btnElement.classList.add("btn","btn-warning","update");
    btnDiv.appendChild(btnElement);
    modalHeader.classList.remove("bg-info");
    modalHeader.classList.add("bg-warning");
}
// select option data sırala  
function selectListCreate(datas,element,text,value){
    
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }

    let option = document.createElement("option");
    option.text = "Seçim Yok";
    option.value = null;
    element.appendChild(option);

    datas.forEach((item,index)=>{
        const option = document.createElement("option");
        option.text = item[text];
        option.value = item[value];
        element.appendChild(option);
    });


}
// Modal Data Ekleme,Güncelleme event machine
btnDivMachine.addEventListener("click", (e) => {

    const target = e.target;
    if (target.classList.contains("add")) {
        postDataMachine();
    }
    else if(target.classList.contains("update")){
        putDataMachine();
    }
});

// Modal Data Ekleme,Güncelleme event product
btnDivProduct.addEventListener("click", (e) => {

    const target = e.target;
    if (target.classList.contains("add")) {
        postDataProduct();
    }
    else if(target.classList.contains("update")){
        putDataProduct();
    }
});
// Modal Data Ekleme,Güncelleme event machine detail
btnDivMachineDetail.addEventListener("click", (e) => {

    const target = e.target;
    if (target.classList.contains("add")) {
        postDataMachineDetail();
    }
    else if(target.classList.contains("update")){
        putDataMachineDetail();
    }
});

// Data güncelleme event machine
listMachine.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("edit")) {

        btnUpdateCreate(btnDivMachine,modalHeaderMachine);
        getDataMachine(false);
        addModalMachine.show();

        const row = target.closest("tr"); // event target elementine ait üst elementi bulur.
        const cells = row.querySelectorAll("td");

        id = cells[0].textContent;
        machineID.value = cells[1].textContent;
        machineName.value = cells[2].textContent;
        machineDescription.value = cells[3].textContent;
        machineGroupID.value = cells[4].textContent;
    }
});

// Data güncelleme event product
listProduct.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("edit")) {

        btnUpdateCreate(btnDivProduct,modalHeaderProduct);
        getDataProduct(false);
        addModalProduct.show();

        const row = target.closest("tr"); // event target elementine ait üst elementi bulur.
        const cells = row.querySelectorAll("td");

        id = cells[0].textContent;
        productID.value = cells[1].textContent;
        productName.value = cells[2].textContent;
        productDescription.value = cells[3].textContent;
        productGroupID.value = cells[4].textContent;
    }
});

// Data güncelleme event product
listMachineDetail.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("edit")) {

        btnUpdateCreate(btnDivMachineDetail,modalHeaderMachineDetail);
        getDataMachineDetail(false);
        addModalMachineDetail.show();

        const row = target.closest("tr"); // event target elementine ait üst elementi bulur.
        const cells = row.querySelectorAll("td");

        id = cells[0].textContent;
        dropdownMachineID.value = cells[1].textContent;
        dropdownProductID.value = cells[2].textContent;
        dropdownProductAmount.value = cells[3].textContent;
    }
});

// Data Sil Event machine
listMachine.addEventListener("click", (e) => {

    const target = e.target;
    if (target.classList.contains("delete")) {
        deleteModalMachine.show();
        const row = target.closest("tr"); // event target elementine ait üst elementi bulur.
        const idCell = row.querySelector("td:first-child");
        id = idCell.textContent;
    }
});
// Silme işlemi onay event
btnApproveMachine.addEventListener("click",(e)=>{
    deleteDataMachine();
});

// Data Sil Event product
listProduct.addEventListener("click", (e) => {

    const target = e.target;
    if (target.classList.contains("delete")) {
        deleteModalProduct.show();
        const row = target.closest("tr"); // event target elementine ait üst elementi bulur.
        const idCell = row.querySelector("td:first-child");
        id = idCell.textContent;
    }
});
// Silme işlemi onay event
btnApproveProduct.addEventListener("click",(e)=>{
    deleteDataProduct();
});

// Data Sil Event machine detail
listMachineDetail.addEventListener("click", (e) => {

    const target = e.target;
    if (target.classList.contains("delete")) {
        deleteModalMachineDetail.show();
        const row = target.closest("tr"); // event target elementine ait üst elementi bulur.
        const idCell = row.querySelector("td:first-child");
        id = idCell.textContent;
    }
});
// Silme işlemi onay event
btnApproveMachineDetail.addEventListener("click",(e)=>{
    deleteDataMachineDetail();
});

// Data Listeleme Makine
let listVisibleMachine = false;
btnListMachine.addEventListener("click", function() {

    listVisibleMachine = !listVisibleMachine;
    if (listVisibleMachine) {
        btnListMachine.classList.add("bi","bi-arrow-up");
        btnListMachine.classList.remove("bi","bi-arrow-down");
        btnListMachine.textContent = "liste kapat";
        getDataMachine(true);
    }
    else {
        btnListMachine.classList.remove("bi","bi-arrow-up");
        btnListMachine.classList.add("bi","bi-arrow-down");
        btnListMachine.textContent = "listele";
        clearTable(listMachine);
    }
        
});

// Data Listeleme Ürün
let listVisibleProduct = false;
btnListProduct.addEventListener("click",function(){

    listVisibleProduct = !listVisibleProduct;
    if (listVisibleProduct){
        btnListProduct.classList.add("bi","bi-arrow-up");
        btnListProduct.classList.remove("bi","bi-arrow-down");
        btnListProduct.textContent = "liste kapat";
        getDataProduct(true);
    }
    else{
        btnListProduct.classList.remove("bi","bi-arrow-up");
        btnListProduct.classList.add("bi","bi-arrow-down");
        btnListProduct.textContent = "listele";
        clearTable(listProduct);
    }
});

// Data Listeleme makine detay
let listVisibleMachineDetail = false;
btnListMachineDetail.addEventListener("click",function(){
 
    listVisibleMachineDetail = !listVisibleMachineDetail;
    if (listVisibleMachineDetail){
        btnListMachineDetail.classList.add("bi","bi-arrow-up");
        btnListMachineDetail.classList.remove("bi","bi-arrow-down");
        btnListMachineDetail.textContent = "liste kapat";
        getDataMachineDetail(true);
    }        
    else{
        btnListMachineDetail.classList.remove("bi","bi-arrow-up");
        btnListMachineDetail.classList.add("bi","bi-arrow-down");
        btnListMachineDetail.textContent = "listele";
        clearTable(listMachineDetail);
    }
        
});

// dinamik tablo listesi oluşturulur.
function listCreate(id,specId,name,description,groupId,list){

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${id}</td>
            <td>${specId}</td>
            <td>${name}</td>
            <td>${description}</td>
            <td>${groupId}</td>
            <td>
                <a href="#" class="bi bi-pencil-square fs-5 text-warning edit"></a>
            </td>
            <td>
                <a href="#" class="bi bi-trash fs-5 text-danger delete"></a>
            </td>
            `;
    list.appendChild(row);
}
// dinamik tablo listesi oluşturulur.
function listCreateMachineDetail(id,machineID,productID,productAmount,list){

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${id}</td>
            <td>${machineID}</td>
            <td>${productID}</td>
            <td>${productAmount}</td>
            <td>
                <a href="#" class="bi bi-pencil-square fs-5 text-warning edit"></a>
            </td>
            <td>
                <a href="#" class="bi bi-trash fs-5 text-danger delete"></a>
            </td>
            `;
    list.appendChild(row);
}

// post data axios fonksiyonu
function postAxios(endpoint,data,clearFieldNo) {
    axios.post("http://localhost:3000/"+endpoint,data)
    .then(response => {
        showAlert(`Veriler server'a eklendi. mesaj kodu:${response.status}`, "success");
        clearFields(clearFieldNo); 
    })
    .catch(err => {
        showAlert(`Veriler server'a yüklenemedi. Hata kodu:${err.status}`, "danger");
        
    });
}

// Post data function machine
function postDataMachine() {
 
    if (machineID.value == "" || machineName.value == "") {
        showAlert("Lütfen alanı doldurunuz.", "danger");
        return;
    }

    let data = {
        machineID: machineID.value,
        machineName: machineName.value,
        machineDescription: machineDescription.value,
        machineGroupID: machineGroupID.value
    }

    postAxios("machines",data,1);
    getDataMachine(true);
}

// Post data function product
function postDataProduct() {
 
    if (productID.value == "" || productName.value == "") {
        showAlert("Lütfen alanı doldurunuz.", "danger");
        return;
    }

    let data = {
        productID:productID.value,
        productName:productName.value,
        productDescription:productDescription.value,
        productGroupID:productGroupID.value
    }

    postAxios("products",data,2);
    getDataProduct(true);
}

// Post data function machine Detail
function postDataMachineDetail() {
 
    if (dropdownMachineID.value == "" || dropdownProductID.value == "") {
        showAlert("Lütfen alanı doldurunuz.", "danger");
        return;
    }

    let data = {
        machineID: dropdownMachineID.value,
        productID: dropdownProductID.value,
        productAmount: dropdownProductAmount.value,
    }

    postAxios("machineDetails",data,3);
    getDataMachineDetail(true);
}

// put data axios fonksiyonu
function putAxios(endpoint,data,clearFieldNo) {
    axios.put(`http://localhost:3000/${endpoint}/${id}`,data)
    .then(response => {
        showAlert(`Veriler Güncellendi. mesaj kodu:${response.status}`, "success");
        clearFields(clearFieldNo);
    })
    .catch(err => {
        showAlert(`Veriler Güncellenemedi!!!. Hata kodu:${err.status}`, "danger");
    });
}

// Put data function machine
function putDataMachine(){

    if (machineID.value == "" || machineName.value == "") {
        showAlert("Lütfen alanı doldurunuz.", "danger");
        return;
    }

    let data = {
        machineID: machineID.value,
        machineName: machineName.value,
        machineDescription: machineDescription.value,
        machineGroupID: machineGroupID.value
    }
    
    putAxios("machines",data,1);

    addModalMachine.hide();
    getDataMachine(true);
}

// Put data function product
function putDataProduct(){

    if (productID.value == "" || productName.value == "") {
        showAlert("Lütfen alanı doldurunuz.", "danger");
        return;
    }

    let data = {
        productID:productID.value,
        productName:productName.value,
        productDescription:productDescription.value,
        productGroupID:productGroupID.value
    }

    putAxios("products",data,2);

    addModalProduct.hide();
    getDataProduct(true);
    
}
// Put data function machine detail
function putDataMachineDetail(){

    if (dropdownMachineID.value == "" || dropdownProductID.value == "") {
        showAlert("Lütfen alanı doldurunuz.", "danger");
        return;
    }

    let data = {
        machineID: dropdownMachineID.value,
        productID: dropdownProductID.value,
        productAmount: dropdownProductAmount.value,
    }

    putAxios("machineDetails",data,3);

    addModalMachineDetail.hide();
    getDataMachineDetail(true);
}

// Get data function machine
function getDataMachine(listActive){
    
    axios.get("http://localhost:3000/machines")
    .then(response => {
        
        if (listActive) {
            clearTable(listMachine);
            
            response.data.forEach(data => {
                const id = data.id;
                const machineID = data.machineID;
                const machineName = data.machineName;
                const machineDescription = data.machineDescription;
                const machineGroupID = data.machineGroupID;
                listCreate(id, machineID, machineName, machineDescription, machineGroupID, listMachine);
            });
        }
        else
        {
            selectListCreate(response.data,machineGroupID,"machineName","id");
            selectListCreate(response.data,dropdownMachineID,"machineID","machineID");
        }
        
    })
    .catch(err => {
        console.error(err); 
    })
}

// Get data function product
function getDataProduct(listActive){

    axios.get("http://localhost:3000/products")
    .then(response => {
        if (listActive) {
            clearTable(listProduct);

        response.data.forEach(data => {
            const id = data.id;
            const productID = data.productID;
            const productName = data.productName;
            const productDescription = data.productDescription;
            const productGroupID = data.productGroupID;
            listCreate(id, productID, productName, productDescription, productGroupID, listProduct);
            });
        }
        else
        {
            selectListCreate(response.data,productGroupID,"productName","id");
            selectListCreate(response.data,dropdownProductID,"productID","productID");
        }
    })
    .catch(err => {
        console.error(err); 
    })
}

// Get data function machine detail
function getDataMachineDetail(listActive){

    axios.get("http://localhost:3000/machineDetails")
    .then(response => {
        if (listActive) {
            clearTable(listMachineDetail);

        response.data.forEach(data => {
            const id = data.id;
            const machineID = data.machineID;
            const productID = data.productID;
            const productAmount = data.productAmount;
            
            listCreateMachineDetail(id, machineID, productID, productAmount,listMachineDetail);
            });
        }
        else
        {
           getDataMachine(false);
           getDataProduct(false);
        }
    })
    .catch(err => {
        console.error(err); 
    })
}

// Delete data function machine
function deleteDataMachine(){
    axios.delete("http://localhost:3000/machines/"+ id)
    .then(response => {
        showAlert(`Data Silindi. Mesaj kodu:${response.status}`, "success");
        deleteModalMachine.hide();
        getDataMachine(true);
    })  
    .catch(err => {
        showAlert(`Data Silinirken Hata oluştu!!! Mesaj kodu:${response.status}`, "danger");
    });
}

// Delete data function product
function deleteDataProduct(){
    axios.delete("http://localhost:3000/products/"+ id)
    .then(response => {
        showAlert(`Data Silindi. Mesaj kodu:${response.status}`, "success");
        deleteModalProduct.hide();
        getDataProduct(true);
    })  
    .catch(err => {
        showAlert(`Data Silinirken Hata oluştu!!! Mesaj kodu:${response.status}`, "danger");
    });
}
// Delete data function machine detail
function deleteDataMachineDetail(){
    axios.delete("http://localhost:3000/machineDetails/"+ id)
    .then(response => {
        showAlert(`Data Silindi. Mesaj kodu:${response.status}`, "success");
        deleteModalMachineDetail.hide();
        getDataMachineDetail(true);
    })  
    .catch(err => {
        showAlert(`Data Silinirken Hata oluştu!!! Mesaj kodu:${response.status}`, "danger");
    });
}





