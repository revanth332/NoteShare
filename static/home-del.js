let context = document.querySelectorAll(".context-data");
for(let i=0;i<context.length;i++){
    context[i].innerText=context[i].innerText.toString().replace(/<br>/g,"\r\n");
}

let dummy = document.querySelector(".dummy");
dummy.setAttribute("id","dummy");