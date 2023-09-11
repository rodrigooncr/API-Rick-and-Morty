
const templateCard = document.getElementById('template-card')

const input = document.querySelector('input')
let dataNew = []; 

/* esperar a que se cargue todo el documento */

document.addEventListener('DOMContentLoaded',()=>{
    fetchData()

})





const fetchData = async ()=>{

    try {
        loadingData(true)
        
        const res = await fetch('https://rickandmortyapi.com/api/character');
        const data = await res.json()
        dataNew = data 
        showCard(dataNew)
        
 
     
        

    } catch (error) {
        
        console.log(error)
   
    } finally {
        /* se ejecuta si o si  */

        loadingData(false)
    }


};

document.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(input.value);
    const result = dataNew.results.filter(item =>
        item.name.includes(input.value) )

    console.log(result);
    showCard(result)

}) 


const showCard = data =>{
    const cards = document.getElementById('card-dinamicas')
    const fragment = document.createDocumentFragment();

    if(data.results){
        data.results.forEach(element => {
        
            /* contiene todo el template */
            const clone =templateCard.content.cloneNode('true')
            
            /* seleccionamos los elementos 
            del template */
            clone.querySelector('h5').textContent = element.name 
            clone.querySelector('p').textContent = element.species 
            clone.querySelector('img').setAttribute('src',element.image)
            
            /* ser almacenan los nombres en cada iteracion
            con todo el template */
            fragment.appendChild(clone)
    
         });

    }else{
        cards.innerHTML="";

        data.forEach(element => {
        
            /* contiene todo el template */
            const clone =templateCard.content.cloneNode('true')
            
            /* seleccionamos los elementos 
            del template */
            clone.querySelector('h5').textContent = element.name 
            clone.querySelector('p').textContent = element.species 
            clone.querySelector('img').setAttribute('src',element.image)
            
            /* ser almacenan los nombres en cada iteracion
            con todo el template */
            fragment.appendChild(clone)
    
         });

    }
    
    

     cards.appendChild(fragment)



}


/* spinner en el async function */
const loadingData = estado =>{
    const loading = document.getElementById('loading')
    if(estado){

        loading.classList.remove('d-none')

    }else{

        loading.classList.add('d-none')
    }
    
}





