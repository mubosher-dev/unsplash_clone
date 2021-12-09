    const input = document.getElementById('inp'),
          grid = document.querySelector('.grid');

    window.addEventListener('load', dayNightMode);

    input.addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
            loadImage();
        }
    });


    function loadImage(){
        removeImg();

        const url = `https://api.unsplash.com/search/photos/?query=` + input.value + `&per_page=9&client_id=ELS8VeqEa4xMxTEROFL3i20VqjqMSAscy4k9EupwEP8`;

        fetch(url)

        .then(response => {
            if(response.ok){
                return console.log(response), response.json(); 
                
            }
            else{
                alert(response.status)
            }
        })

        .then(data => {
            const imageNode = [];
            const image = [];

            for(let i = 0; i < data.results.length; i++){
                imageNode[i] = document.createElement('div');
                image[i] = document.createElement('img');
                image[i].src = data.results[i].urls.raw 
                imageNode[i].className ='img';
                imageNode[i].appendChild(image[i]);
                imageNode[i].addEventListener('dblclick', function(){
                    window.open(data.results[i].links.download, '_blank')
                })

                grid.appendChild(imageNode[i]);
            }
        })
    }

    function removeImg(){
        grid.innerHTML = '';
    }

    function dayNightMode(){
        const date = new Date();
        const hour = date.getHours();

        if(hour >= 7 && hour <= 19){
            document.body.style.backgroundColor = '#ffffff';

            document.body.style.color = '#000016';
        }
        else{
            document.body.style.backgroundColor = '#000016';

            document.body.style.color = '#fff';
        }
    }