import { defineStore } from "pinia";
import { ref } from 'vue';

const paintings = await retrievePaintings();

async function retrievePaintings() {
    // here will be logic that allows retrieving data from DB, for now we just prepare mock data here   
    const response = await fetch('http://localhost:8000/api/products');
    const data = await response.json();

    return data.data;
}

export const usePaintingsStore = defineStore('paintings', () => {
    function getAllPaintings() {
        return paintings;
    }

    function getPaintingByID(id) 
    {
        let selectedPainting = null;

        paintings.forEach(painting => {
            if (painting.id == id) {
                selectedPainting = painting;
            } 
        });

        return selectedPainting;
    }

    function addPainting(newPaintingObj) {
        paintings.push(newPaintingObj);
    }

    function deletePainting(id) {
        paintings.forEach((painting, index) => {
            if (painting.id == id) {
                pages.value.splice(index);
                return;
            }
        });

    }

    function editPainting(id, newPaintingObj) {
        paintings.forEach((painting) => {
            if (painting.id == id) {
                painting = newPaintingObj;
                return;
            }
        });
    }
    
    return { getAllPaintings, getPaintingByID, addPainting, deletePainting, editPainting }
});