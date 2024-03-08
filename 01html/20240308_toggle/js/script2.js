// const toggleElm = document.querySelector(".toggle_button");
// toggleElm.addEventListener("click",function(){
//     toggleElm.classList.toggle("active");
// });
let tf = true;
const toggleElm  =document.getElementsByClassName("toggle_button");
// toggleElm[0].addEventListener("click",function(){
//     if(tf){
//         toggleElm[0].classList.add("active");
//         tf = false;
//     }else{
//         toggleElm[0].classList.remove("active");
//         tf = true;
//     }
// });
toggleElm[0].addEventListener("click",function(){
    toggleElm[0].classList.toggle("active");
})
