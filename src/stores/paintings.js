import { defineStore } from "pinia";
import { ref } from 'vue';

const mockJsonData = 
JSON.stringify([
    {
        "id": 1,
        "title": "Aaa",
        "description": "Description 1",
        "picturesPath": "",
        "price": 19.99, 
        "public": true
    },
    {
        "id": 2,
        "title": "Bbb",
        "description": "Description 2",
        "picturesPath": "",
        "price": 29.99, 
        "public": true
    },
    {
        "id": 3,
        "title": "Ccc",
        "description": "Description 3",
        "picturesPath": "",
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
        paintings.forEach(painting => {
            if (painting.id === id) {
                return painting;
            } 
        });

        return null;
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