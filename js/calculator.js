const d = document;

d.addEventListener("DOMContentLoaded", e => {
    const display1 = d.querySelector("#view1");
    const display2 = d.querySelector("#view2");
    let clickEqual = false;
    let operator = '';
    let newNumber = '';
    let resFinal = false;

    // ------------------------------------------------------------ F U N C I O N E S ------------------------------------------------------------

    //Función que se llama cuando se oprime + - x / y va mostrando el subtotal en el display1
    const fnSubTotal = (oper) => {
        let operAnt = display1.innerHTML[display1.innerHTML.length - 1];
        switch (operAnt) {
            case "+":
                display2.innerHTML = (Number(display1.innerHTML.slice(0, -1)) + Number(display2.innerHTML));
                display1.innerHTML = (display2.innerHTML) + oper;
                break;

            case "-":
                display2.innerHTML = (Number(display1.innerHTML.slice(0, -1)) - Number(display2.innerHTML));
                display1.innerHTML = (display2.innerHTML) + oper;
                break;

            case "/":
                if (display2.innerHTML === "0") {
                    display1.innerHTML = "0";
                    display2.innerHTML = "Error Div 0";
                    return;
                };
                display2.innerHTML = (Number(display1.innerHTML.slice(0, -1)) / Number(display2.innerHTML));
                display1.innerHTML = (display2.innerHTML) + oper;
                break;

            case "x":
            case "X":
            case "*":
                display2.innerHTML = (Number(display1.innerHTML.slice(0, -1)) * Number(display2.innerHTML));
                display1.innerHTML = (display2.innerHTML) + oper;
                break;
        }
        resFinal=false;
    };

    //Función que se llama para calcular el total cuando se oprime = o enter
    const fnTotal = (oper) => {
        let disp2 = display2.innerHTML;
        switch (oper) {
            case "+":
                display2.innerHTML = (Number(display1.innerHTML.slice(0, -1)) + Number(display2.innerHTML));
                display1.innerHTML = display1.innerHTML + disp2 + "=";
                operator = '';
                break;

            case "-":
                display2.innerHTML = (Number(display1.innerHTML.slice(0, -1)) - Number(display2.innerHTML));
                display1.innerHTML = display1.innerHTML + disp2 + "=";
                operator = '';
                break;

            case "/":
                if (display2.innerHTML === "0") {
                    display1.innerHTML = "0";
                    display2.innerHTML = "Error Div 0";
                } else {
                    display2.innerHTML = (Number(display1.innerHTML.slice(0, -1)) / Number(display2.innerHTML));
                    display1.innerHTML = display1.innerHTML + disp2 + "=";
                }
                operator = '';
                break;

            case "x":
            case "X":
            case "*":
                display2.innerHTML = (Number(display1.innerHTML.slice(0, -1)) * Number(display2.innerHTML));
                display1.innerHTML = display1.innerHTML + disp2 + "=";
                operator = '';
                break;
        }
        resFinal = true;
    };

    // Función que se llama cuando se oprime un número o el punto
    const fnNumberTyped = (number) => {
        //Si oprimo el punto y ya hay un punto, retorna.
        if (number === "." && display2.innerHTML.includes(".")) return;
        if (display2.innerHTML === "0" || (operator != '' && newNumber === '') || clickEqual) {
            display2.innerHTML = number;
            if (clickEqual) { //ingresa acá cuando se hizo click en el signo igual y de esa manera limpia el display1 y al oprimir un número borra el nro existente en display2
                if(resFinal && operator != '') {
                    //Si se obtuvo un resultado final porque se presionó = o enter y a su vez luego de eso se oprime + - x / se sigue calculando a partir del resultado final obtenido
                    resFinal=false;
                }else {
                    //Caso contrario, por ej si se oprime cualquier número, comienza una nueva operación.
                    display1.innerHTML = '0';
                }                    
                clickEqual = false;
            }
        } else { //anexa un nuevo número al número existente
            display2.innerHTML = display2.innerHTML + number;
        }
        newNumber += number;
    };
    
    // Función que se llama cuando se oprime + - x o /
    const fnOperator = (operator) => {
        newNumber='';
        if (display1.innerHTML === "0" || resFinal) {
            display1.innerHTML = display2.innerHTML + operator;
        } else {
            fnSubTotal(operator);
        }
    };

    // Función que se llama cuando se oprime backspace
    const fnBackspace = () => {
        //cuando llega al cero no permite seguir borrando
        if (display2.innerHTML === "0") return;

        //si se oprime ← luego de haber calculado el resultado final, se resetea el display1 y display2 y se retorna;
        if (display1.innerHTML[display1.innerHTML.length - 1] === "=" || display2.innerHTML === "Error Div 0") {
            display1.innerHTML = "0";
            display2.innerHTML = "0";
            return;
        }
        (display2.innerHTML.length > 1)
            ? display2.innerHTML = display2.innerHTML.slice(0, -1)
            : display2.innerHTML = "0";
    };

    // Función que se llama cuando se oprime = (igual)
    const fnEqual = () => {
        let oper = display1.innerHTML[display1.innerHTML.length - 1];
        fnTotal(oper);
        newNumber='';
        clickEqual = true;
    };

    // Función que se llama cuando se oprime una tecla con el objetivo de agregar una clase de css para que se sombree la tecla presionada
    const fnAddClassButton = (value, className) => {
        const elements = document.querySelectorAll("button");
        if(value === "Enter") value = "=";
        if(value === "*" || value === "X") value = "x";
        if(value === "Backspace") value = "←";
        if(value === "c") value = "C";
        elements.forEach(element => {
            if (element.innerHTML.trim() === value) {
                element.classList.add(className);
                setTimeout(() => {
                    element.classList.remove(className);
                }, 400);
            }
        });
    };
    // ------------------------------------------------------------ f i n    f u n c i o n e s ------------------------------------------------------------
    // ------------------------------------------------------------ A D D    E V E N T L I S T E N E R ------------------------------------------------------------

    d.addEventListener("click", e => {
        const { target: btn } = e;
        //Botón C = clear
        if (btn.matches("#clear")) {
            display1.innerHTML = "0";
            display2.innerHTML = "0";
        }

        //Botón ← 
        if (btn.matches("#delete")) {
            fnBackspace();
        }

        //Botones Números
        if (btn.matches("#number")) {
            fnNumberTyped(btn.innerHTML);
        }

        //Botones Operadores + - x /
        if (btn.matches("#operator")) {
            operator = btn.innerHTML;
            fnOperator(operator);
        }

        //Botón =//
        if (btn.matches("#equal")) {
            fnEqual();
        }
    })

    d.addEventListener("keydown", e => {
        const keyType = (e.key);
        fnAddClassButton(keyType,"typed");

        //Ingreso de números y punto
        if ((keyType >= "0" && keyType <= "9") || keyType === ".") {
            fnNumberTyped(keyType);
        };

        //Ingreso de = (signo igual)
        if (keyType === "Enter" || keyType === "=") {
            e.preventDefault();
            fnEqual();
        };

        //Ingreso de operadores + - x /
        if (keyType === "+" || keyType === "-" || keyType === "*" || keyType === "X" || keyType === "x" || keyType === "/") {
            operator = keyType;
            (operator === "*" || operator === "X") && (operator = "x");
            fnOperator(operator);
        };

        //Ingreso de la tecla de retroceso
        if (keyType === "Backspace") {
            fnBackspace();
        };

        //Ingreso de la tecla C o c
        if(keyType === "C" || keyType === "c") {
            display1.innerHTML = "0";
            display2.innerHTML = "0";
        };
    });
    // ------------------------------------------------------------ f i n    a d d    e v e n t l i s t e n e r ------------------------------------------------------------
});
