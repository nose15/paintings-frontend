import { defineStore } from "pinia";
import { ref } from 'vue';

const mockJsonData = 
JSON.stringify([
    {
        "id": "1",
        "title": "Aaa",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit pellentesque habitant morbi tristique senectus et netus. Pretium fusce id velit ut tortor pretium viverra. Gravida cum sociis natoque penatibus et magnis dis parturient. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Scelerisque felis imperdiet proin fermentum leo. Eu sem integer vitae justo eget. Aliquet lectus proin nibh nisl. Donec et odio pellentesque diam volutpat commodo sed. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc. Cras pulvinar mattis nunc sed. Vel turpis nunc eget lorem. Hendrerit dolor magna eget est. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Fringilla ut morbi tincidunt augue. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Egestas quis ipsum suspendisse ultrices gravida. Faucibus turpis in eu mi.",
        "fileName": "obraz1.jpg",
        "price": 19.99, 
        "public": true
    },
    {
        "id": "2",
        "title": "Bbb",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit pellentesque habitant morbi tristique senectus et netus. Pretium fusce id velit ut tortor pretium viverra. Gravida cum sociis natoque penatibus et magnis dis parturient. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Scelerisque felis imperdiet proin fermentum leo. Eu sem integer vitae justo eget. Aliquet lectus proin nibh nisl. Donec et odio pellentesque diam volutpat commodo sed. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc. Cras pulvinar mattis nunc sed. Vel turpis nunc eget lorem. Hendrerit dolor magna eget est. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Fringilla ut morbi tincidunt augue. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Egestas quis ipsum suspendisse ultrices gravida. Faucibus turpis in eu mi.",
        "fileName": "obraz2.jpg",
        "price": 29.99, 
        "public": true
    },
    {
        "id": "3",
        "title": "Ccc",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit pellentesque habitant morbi tristique senectus et netus. Pretium fusce id velit ut tortor pretium viverra. Gravida cum sociis natoque penatibus et magnis dis parturient. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Scelerisque felis imperdiet proin fermentum leo. Eu sem integer vitae justo eget. Aliquet lectus proin nibh nisl. Donec et odio pellentesque diam volutpat commodo sed. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc. Cras pulvinar mattis nunc sed. Vel turpis nunc eget lorem. Hendrerit dolor magna eget est. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Fringilla ut morbi tincidunt augue. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Egestas quis ipsum suspendisse ultrices gravida. Faucibus turpis in eu mi.",
        "fileName": "obraz3.jpg",
        "price": 9.99, 
        "public": true
    }
]);

const paintings = ref(paintingsFromDB());

function paintingsFromDB() {
    // in the future, the function will actually call the api, for now we use mock data for development
    let paintingsObj = retrieveData(); 
    return paintingsObj;
}

function retrieveData() {
    // here will be logic that allows retrieving data from DB, for now we just prepare mock data here
    return JSON.parse(mockJsonData);
}

export const usePaintingsStore = defineStore('paintings', () => {
    function getAllPaintings() {
        return paintings.value;
    }

    function getPaintingByID(id) 
    {
        let selectedPainting = null;

        paintings.value.forEach(painting => {
            if (painting.id == id) {
                console.log(painting.id, id)
                selectedPainting = painting;
            } 
        });

        return selectedPainting;
    }

    function addPainting(newPaintingObj) {
        paintings.push(newPaintingObj);
    }

    function deletePainting(id) {
        paintings.value.forEach((painting, index) => {
            if (painting.id == id) {
                pages.value.splice(index);
                return;
            }
        });

    }

    function editPainting(id, newPaintingObj) {
        paintings.value.forEach((painting) => {
            if (painting.id == id) {
                painting = newPaintingObj;
                return;
            }
        });
    }
    
    return { getAllPaintings, getPaintingByID, addPainting, deletePainting, editPainting }
});