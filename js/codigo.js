 async function getDataSheets(){
        const apiKey = 'AIzaSyAOVnr9dYodLSoVhZBSUKOcx4oWmqmgTTg'; // Replace with your API key
        const spreadsheetId = '1fNCaKBLnJLxF7wWLX8C9vab-K3e7ghxSA4u4ygfi634'; // Replace with your spreadsheet ID
        const sheetName = 'acesso'; // Replace with your sheet name

        try{
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`);
            const data = await response.json();
            console.log(data.values);
            
            if(!response.ok){
                throw new Error('Erro na requisição para o Google Sheets');
            }   
            
            return data.values;
        }catch(error){
            console.error('Erro no Google Drive', error);
            throw error;
        }
    }

    let x = 0
    function addBtn(dados) { 
        if( !dados[0]){return;}; 
        
        const btn_a = document.createElement("a");
        btn_a.innerHTML =
            `
        
        <a id="" href="${dados[0]}" target="_blank" title="${dados[4]}" value="${0}">
        <img class="btn-img" src="${dados[3]}"> 
        </a>
        
        `
        x+=1;
        const parentNode = document.getElementById("btns");
        parentNode.appendChild(btn_a);
        
        //console.log(x);

    }


    async function exec(){    
        var loadingScreen = document.querySelector(".loader");
        

        try{
            //console.log("1");
            const data = await getDataSheets()
            if(data){
                loadingScreen.style.display = 'none';
                data.forEach(addBtn);
            }
        }catch(error){
            console.log(error)
        }    
    }
    

    function createIdFromLink(url) {
    if (!url || typeof url !== 'string') {
        return ''; // Retorna uma string vazia para entradas inválidas
    }
    url = url.replace(/[^\p{L}\p{N}-]/gu, '').toLowerCase();
    url = url.replace(/-/g, '');
    return url;
}
