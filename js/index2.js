const d = document;
let senalEqual=0;

d.addEventListener("DOMContentLoaded", e => {
    d.addEventListener("click", e => {
        const { target } = e;
        const view = d.getElementById("view");
       
        if(target.matches(".btn")) {
            //Borrar display
            if(target.id === "C" || target.id === "CE") {
                view.textContent="0";
                return;
            }
            if(target.id === "delete") {
                if(view.textContent.length === 1 || view.textContent==="Error" || view.textContent==="Error Div 0") {
                    view.textContent = "0"
                }else {
                    view.textContent = view.textContent.slice(0,-1); //Comienza desde el final del nro y borra la primer posición.
                }
                return;
            }
            if(target.id === "equal") {
                try {
                    senalEqual=1;
                    if(eval(view.textContent) == "Infinity") {
                        view.textContent="Error Div 0"
                    }else {
                        view.textContent = eval(view.textContent);
                    }
                }catch {
                    view.textContent = "Error";
                    senalEqual=0;
                }
                return;
            }
            if(view.innerHTML === "0" || view.textContent==="Error" || view.textContent==="Error Div 0" || senalEqual === 1){
                //Para que no deje un cero a la izquierda
                view.textContent = target.textContent;
                senalEqual=0;
            }else {
                view.textContent += target.textContent;
            }            
        }
    })
});
