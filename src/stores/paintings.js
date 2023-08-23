import { defineStore } from "pinia";
import { ApiService } from "../api/ApiService";
import { ref } from 'vue';

const paintings = await ApiService.retrievePaintingsAsync();

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