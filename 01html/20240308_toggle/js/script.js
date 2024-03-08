// const toggleElm = document.getElementsByClassName("toggle_button");
const toggleElm = document.querySelector(".toggle_button")

// let changeToggle = true;
// toggleElm[0].addEventListener("click",function () {
//     if(changeToggle ==true){
//         toggleElm[0].classList.add("active");
//         changeToggle = false;
//     }else{

//            toggleElm[0].classList.remove("active");
//            changeToggle=true;
//     }
// })
// toggleElm[0].addEventListener("click",function(){
//     toggleElm[0].classList.toggle("active")
// })
toggleElm.addEventListener("click",function(){
    toggleElm.classList.toggle("active")
})
