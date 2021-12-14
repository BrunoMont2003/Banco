class Cuenta{
    constructor(nombre, saldo, password, id){
        this.nombre = nombre;
        this.saldo = saldo;
        this.password = password;
        this.id = id;
    }
    verificarContraseña(cadena){
        if (cadena === this.password) {
            return true;
        }
        else{
            return false;
        }
    }

    consultarSaldo(){
        return this.saldo;
    }

    ingresarMonto(cantidad){
        cantidad = parseInt(cantidad);
        console.log(cantidad + this.saldo);
        if (cantidad + parseInt(this.saldo) <= 990) {
            this.saldo = cantidad + parseInt(this.saldo);
            return true;
        }else{
            return false;
        }
    }

    retirarMonto(cantidad){
        cantidad = parseInt(cantidad);
        if (cantidad < this.saldo) {
            if (this.saldo - cantidad >= 10) {
                this.saldo = this.saldo - cantidad;
                return true;
            }
            else{
                return false;
            }
        }else{
            return false;
        }
    }
}
//OBJETOS
let cuentas = [];
let cuentaA = new Cuenta('Bruno Montañez Diaz',300, '123456','cuenta-1');
cuentas.push(cuentaA);
let cuentaB = new Cuenta('Cristiano Ronaldo',700, 'ernes_34A','cuenta-2');
cuentas.push(cuentaB);
let cuentaC = new Cuenta('Lionel Messi',500, 'boca_52!','cuenta-3');
cuentas.push(cuentaC);
let cuentaD = new Cuenta('Mason Mount',750, 'holandez_66!','cuenta-4');
cuentas.push(cuentaD);
//DOM
//INSERTAR TODOS LOS OBJETOS EN LA PAGINA
let body = document.getElementsByTagName('body')[0];
let cardContainer = document.getElementById('card-container');
cardContainer.innerHTML='';
window.onload= ()=>{
    cuentas.forEach(cuenta => {
        cardContainer.innerHTML+=`
        <div class="card-account card col-12 col-md-8 col-lg-5 mx-lg-3 p-3 my-4" id="${cuenta.id}">
        <h6 class="card-header text-muted">Name</h6>
        <h5 class="card-header" id="name">${cuenta.nombre}</h5>
        <h6 class="card-header text-muted">Balance</h6>
        <h5 class="card-header" id="balance">${cuenta.saldo}</h5>
        </div>`
    });

     //CLICK EN UNA CUENTA
    let cards = document.querySelectorAll(".card-account");
    cards = [...cards];
    cards.forEach((card)=> {
        card.addEventListener("click", ()=>{
            let nombre =card.childNodes[3].textContent;
            let saldo = card.childNodes[7].textContent; 
            let id =card.getAttribute("id");
            
            cardContainer.innerHTML=`<div class="card-account card col-12 col-md-8 col-lg-5 mx-lg-3 p-3 my-4" id="${id}">
            <h6 class="card-header text-muted">Name</h6>
            <h5 class="card-header" id="name">${nombre}</h5>
            <h6 class="card-header text-muted">Balance</h6>
            <h5 class="card-header" id="balance">${saldo}</h5>
            </div>`;
            let number = id.split('-')[1] - 1;
            console.log(number);
            console.log(cuentas[number] );
            let cuenta = cuentas[number];
            let passwordContainer = document.getElementById('password-container');
            passwordContainer.classList.add('show');
            //CONTRASEÑA
            let btnLogin = document.getElementById('btnLogin');
            let invalidPassword = document.getElementById('invalid-password');
            let password = document.getElementById('password');
            btnLogin.addEventListener('click',(event)=>{
                event.preventDefault();
                console.log(password.value);
                    if(cuenta.verificarContraseña(password.value)){
                        console.log("siu");
                        invalidPassword.classList.remove('show');
                        let nombreA = nombre.split(' ');
                        let nombrePila = nombreA[0];
                        let mainContainer = document.getElementById('main-container');
                        let innerAccount = `
                        <header class="row d-flex align-items-center p-3">
                            <div class="col-auto p-3 bg-info me-2">
                            <i class="fas fa-piggy-bank"></i>
                            </div>
                            <div class="col-auto">
                            <span class="text-muted">Hello ${nombrePila},</span>
                            <h6>Welcome Back!</h6>
                            </div>
                        </header>
                        <div class="row my-3 p-3">
                            <div
                            class="
                                py-3
                                col-12 col-md-8 col-lg-5
                                bg-info
                                rounded-1
                                text-dark
                                d-flex
                                flex-column
                                align-items-center
                            "
                            >
                            <span class="text-muted mb-2">Total Balance:</span>
                            <h5 id="in-balance">${cuenta.consultarSaldo()}</h5>
                            </div>
                        </div>
                        <div class="row p-3">
                            <div class="col-12 col-md-8 col-lg-5 mb-4">
                            <div class="row d-flex justify-content-between">
                                <div class="card col-5 py-3 ps-3 pe-5" id="withdraw-option">
                                <div class="card-header">
                                    <i
                                    class="
                                        fas
                                        fa-money-check-alt
                                        p-2
                                        rounded-1
                                        bg-light
                                        text-danger
                                    "
                                    ></i>
                                </div>
                                <div class="card-header">Withdraw Money</div>
                                </div>
                                <div class="card col-5 py-3 ps-3 pe-5" id="deposit-option">
                                <div class="card-header">
                                    <i
                                    class="
                                        fas
                                        fa-money-check-alt
                                        p-2
                                        rounded-1
                                        bg-light
                                        text-success
                                    "
                                    ></i>
                                </div>
                                <div class="card-header">Deposit Money</div>
                                </div>
                            </div>
                            </div>
                        </div>
                        `;
                        mainContainer.innerHTML = innerAccount; 
                        
                        let withdraw = document.getElementById('withdraw-option');
                        withdraw.addEventListener('click',()=>{
                            mainContainer.innerHTML = innerAccount +
                            `
                            <div class="row p-3">
                                <div class="col-auto">
                                <h5>Withdraw Money</h5>
                                </div>
                            </div>
                            <form class="row p-3" id="withdraw-money-container">
                                <div class="card col-12 col-md-8 col-lg-5 mx-lg-3 p-3 mb-4">
                                <label for="withdraw" class="form-label"
                                    >Enter the amount to withdraw:</label
                                >
                                <div class="d-flex align-items-center position-relative">
                                    <i class="dollar fas fa-dollar-sign position- text-dark"></i>
                                    <input type="number" class="form-control w-100" id="withdraw" />
                                </div>
                                <span class="text-danger my-2 d-none" id="invalid-withdraw"
                                    >Insufficient Funds</span
                                >
                                <span class="text-succes my-2 d-none" id="success-withdraw"
                                    >Money was successfully withdrawn</span
                                >
                                <button
                                    type="submit"
                                    id="btnWithdraw"
                                    class="btn btn-outline-light my-3"
                                >
                                    Confirm
                                </button>
                                </div>
                            </form>
                            `
                            let txtAmountWithdraw = document.getElementById('withdraw');
                            let invalidWithdraw = document.getElementById('invalid-withdraw');
                            let successWithdraw = document.getElementById('success-withdraw');
                            let inBalance = document.getElementById('in-balance');
                            let btnWithdraw = document.getElementById('btnWithdraw');
                            btnWithdraw.addEventListener('click',(event) =>{
                                event.preventDefault();
                                if(cuenta.retirarMonto(txtAmountWithdraw.value)){
                                    invalidWithdraw.classList.remove('show');
                                    successWithdraw.classList.add('show');
                                    inBalance.innerText=cuenta.consultarSaldo();
                                    txtAmountWithdraw.value="";
                                }else{
                                    invalidWithdraw.classList.add('show');
                                    successWithdraw.classList.remove('show');
                                }
                            })
                        });
                        let deposit = document.getElementById('deposit-option');
                        deposit.addEventListener('click',()=>{
                            mainContainer.innerHTML = innerAccount +
                            `
                            <div class="row p-3">
                                <div class="col-auto">
                                <h5>Deposit Money</h5>
                                </div>
                            </div>
                            <form class="row p-3" id="deposit-money-container">
                                <div class="card col-12 col-md-8 col-lg-5 mx-lg-3 p-3 mb-4">
                                <label for="Deposit" class="form-label"
                                    >Enter the amount to deposit:</label
                                >
                                <div class="d-flex align-items-center position-relative">
                                    <i class="dollar fas fa-dollar-sign position- text-dark"></i>
                                    <input type="number" class="form-control w-100" id="deposit" />
                                </div>
                                <span class="text-danger my-2 d-none" id="invalid-deposit"
                                    >Exceed savings limits</span
                                >
                                <span class="text-success my-2 d-none" id="success-deposit"
                                    >Amount successfully deposited</span
                                >
                                <button
                                    type="submit"
                                    id="btnDeposit"
                                    class="btn btn-outline-light my-3"
                                >
                                    Confirm
                                </button>
                                </div>
                            </form>
                            `
                            let txtAmountDeposit = document.getElementById('deposit');
                            let invalidDeposit = document.getElementById('invalid-deposit');
                            let successDeposit = document.getElementById('success-deposit');
                            let inBalance = document.getElementById('in-balance');
                            let btnDeposit = document.getElementById('btnDeposit');
                            btnDeposit.addEventListener('click',(event) =>{
                                event.preventDefault();
                                if(cuenta.ingresarMonto(txtAmountDeposit.value)){
                                    invalidDeposit.classList.remove('show');
                                    successDeposit.classList.add('show');
                                    inBalance.innerText=cuenta.consultarSaldo();
                                    txtAmountDeposit.value="";
                                }else{
                                    invalidDeposit.classList.add('show');
                                    successDeposit.classList.remove('show');
                                }
                            })
                        });

                    }else{
                        invalidPassword.classList.add('show');
                    }
            })
        })
    })
    // let cuentaElegida = document.getElementById(`cuenta-${}`);

};



