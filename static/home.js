let context = document.querySelectorAll(".context-data");
for(let i=0;i<context.length;i++){
    context[i].innerHTML=context[i].innerText;
}

let titles = document.querySelectorAll(".head3");
for(let i=0;i<titles.length;i++){
    titles[i].innerHTML=titles[i].innerText.toString().toUpperCase();
}

let cpy_btn = document.querySelectorAll(".button-copy");
cpy_btn.forEach((btn,index,arr) =>{
    btn.addEventListener("click",() =>{
        let text = btn.parentNode.previousSibling.innerText;
        navigator.clipboard.writeText(text);
        for(let i=0;i<arr.length;i++){
            if(i != index){
                arr[i].innerHTML="Copy";
                if(arr[i].classList.contains("copied")){
                    arr[i].classList.remove("copied");
                }
            }
            else{
                btn.innerHTML = "Copied";
                btn.classList.add("copied");
            }
        }
    })
});

let dummy = document.querySelector(".dummy");
dummy.setAttribute("id","dummy");
// cpy_btn.addEventListener("click",()=>{
//     let text = cpy_btn.parentNode.previousSibling.innerText;
//     navigator.clipboard.writeText(text);
//     cpy_btn.innerHTML = "Copied";
// })
