const btnCarregarMais = document.getElementById("carregarmais");
const inserirPosts = document.querySelector("#inserirNovosPost");
let contagem = 1;

// const dadosAutor = function(numAutor){
//     var url1 = 'https://6388fbf0a4bb27a7f796c4f7.mockapi.io/user/' + numAutor;
//     var ajax3 = new XMLHttpRequest();
//     ajax3.onreadystatechange = function () {
//         if(this.readyState == 4 && this.status == 200){
//             let dadosAutor2 = JSON.parse(this.responseText);
//             console.log(dadosAutor2);
//             return dadosAutor2;
//         }
//     };
//     ajax3.open('GET', url1, true);
//     ajax3.send();
// };

const getGitHubInfo = function (numAutor) {

    const url = 'https://6388fbf0a4bb27a7f796c4f7.mockapi.io/user/'+numAutor+'/posts';
    const ajax = new XMLHttpRequest();

    const urlUser = 'https://6388fbf0a4bb27a7f796c4f7.mockapi.io/user/'+numAutor;
    const ajaxUser = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            let postageminserida = JSON.parse(this.responseText);
            ajaxUser.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let dataUser = JSON.parse(this.responseText);
                console.log(dataUser);
                console.log(postageminserida);
               CriarEstrutura(postageminserida, dataUser);
              };
            };
        };
    };
    ajax.open('GET', url, true);
    ajax.send();
    ajaxUser.open('GET', urlUser, true);
    ajaxUser.send();
};


btnCarregarMais.onclick = function(e) {
    e.preventDefault()
    //const retornoGit = getGitHubInfo(buscarGit);
    //alert("botão ok");
    getGitHubInfo(contagem);
    console.log("contagem:  " + contagem);
    contagem++;
}
const CriarEstrutura = async function(postageminserida, dataUser){

    console.log(dataUser);
    console.log(postageminserida);
    let tamanho = parseInt(postageminserida.length, 10);
    console.log("tamanh do array de posts: " + tamanho);
    let cont = 0;
    //alert(tamanho);
    const estruturaDiv = document.createElement("div");

    for(cont; cont < tamanho; cont++) {
        console.log(cont);
        let dataDia = new Date(postageminserida[cont].createdAt);
        let MesInserir = dataDia.getMonth()+1;
        let DiaInserir = dataDia.getDate();
        let AnoInserir = dataDia.getFullYear();
        console.log("dia publicação "+ dataDia);

        inserirPosts.insertAdjacentHTML("beforebegin", `
        <article class="box post post-excerpt">
        <header>
          <h2><a href="#">${postageminserida[cont].titlePost}</a></h2>
          <p>${postageminserida[cont].captionPost}</p>
        </header>
        <div class="info">
          <span class="date"><span class="day">${DiaInserir}</span> <span class="month">/${MesInserir}</span><span class="year">/
          ${AnoInserir}</span></span>
          <ul class="stats">
            <li><a href="#" class="icon fa-comment">${postageminserida[cont].countComments}</a></li>
            <li><a href="#" class="icon fa-heart">${postageminserida[cont].countLikes}</a></li>
            <li><a href="#" class="icon brands fa-twitter">${postageminserida[cont].countTwitter}</a></li>
            <li><a href="#" class="icon brands fa-facebook-f">${postageminserida[cont].countFacebook}</a></li>
          </ul>
        </div>
        <a href="#" class="image featured"><img src="${postageminserida[cont].imagePost}" alt="" /></a>
        <p>
        ${postageminserida[cont].textPost}
        </p>
        <p class="author-avatar">
          <strong>Create by</strong>
          @${dataUser.userName}
          <img src="${dataUser.avatar}" />
        </p>
        </article>
    `);
    }       
}