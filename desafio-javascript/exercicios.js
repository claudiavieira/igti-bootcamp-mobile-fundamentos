const root = document.querySelector('#root') //Pegando a div root da tela

const getData = async()=>{
    const response = await fetch("https://igti-film.herokuapp.com/api/accounts")
    return await response.json();
  };
  
  const changeData = async()=>{
    let data = await getData();
    return await data;
  }

  changeData().then(dados => {
    getTotalDepositoTodasAgencias(dados);  //Exercicio 1
    getTotalContasComMais100Reais(dados); //Exercicio 2
    getNroContaMais100ReaisAgencia33(dados); //Exercicio 3
    getAgenciaMaiorSaldo(dados); //Exercicio 4
    getAgenciaMenorSaldo(dados); //Exercicio 5
    getSumSaldosClienteMaiorSaldoPorAgencia(dados); //Exercicio 6
    getClienteMaiorSaldoAgencia10(dados); //Exercicio 7
    getClienteMenorSaldoAgencia47(dados); //Exercicio 8
    GetTake3ClienteByBalance(dados); //Exercicio 9
    getQtdClienteAgencia47(dados); //Exercicio 10
    getQtdClientesComMariaNomeAgencia47(dados); //Exercicio 11
    getNextId(dados); //Exercicio 12

  })

  //Exercicio 1) A Soma total dos depósitos de todas as agências é:
  const getTotalDepositoTodasAgencias=(dados)=>{
    dados = dados.map((item)=>item.balance);
    const total = dados.reduce((valorAnterior,valorAtual)=>valorAnterior+valorAtual);
    console.info(`Exercicio 1) A soma total dos depositos de todas as agencias é: ${total}`);
  }

  //Exercicio 2) O número total de contas com mais de 100 reais de saldo é:
  const getTotalContasComMais100Reais=(dados)=>{
    let totalContasMais100Reais = dados.filter(item => item.balance >100).length; //só as marias da agencia 10
    console.info(`Exercicio 2) O número total de contas com mais de 100 reais de saldo é: ${totalContasMais100Reais}`);
  }

  //Exercicio 3) O número de contas com mais de 100 reais de saldo na agência 33 é:
  const getNroContaMais100ReaisAgencia33=(dados)=>{
    dados = dados.filter((contas)=>contas.balance >100);
    let nroContaMais100ReaisAgencia33 = dados.filter((contas)=>contas.agencia == 33).length;
    console.info(`Exercicio 3) O número de contas com mais de 100 reais de saldo na agência 33 é: ${nroContaMais100ReaisAgencia33}`);
  }

  //Exercicio 4) A agência com maior saldo é a:
  const getAgenciaMaiorSaldo=(dados)=>{
    let accs = new Map;

    for (let acc of dados) {
      accs.set(acc.agencia, (accs.get(acc.agencia) || 0) + acc.balance);
      //console.info(accs);
    }
    let acc = Array.from(accs.entries()) //entries() retorna um array cujos elementos são também arrays correspondentes aos pares de propriedades [key, value] 
    .sort((a, b) => b[1] - a[1])[0];
    
    console.info(`Exercicio 4) A agência com maior saldo é a: ${acc[0]}, $${acc[1]}`);
  }

  //Exercício 5) A agência com o menor saldo é a: 
  const getAgenciaMenorSaldo=(dados)=>{
      let accs = new Map;

      for(let acc of dados){
          accs.set(acc.agencia, (accs.get(acc.agencia) || 0) + acc.balance);
      }
      let acc = Array.from(accs.entries())
                     .sort((a,b) => a[1] - b[1])[0];

     console.info(`Exercício 5) A agência com o menor saldo é a: : ${acc[0]}, $${acc[1]}`);
  }

  //Exercicio 6) Considere o cliente com o maior saldo em cada agência (caso haja mais de um cliente com o maior saldo, escolha apenas um). 
  //O valor total desses saldos é:
  const getSumSaldosClienteMaiorSaldoPorAgencia = (dados) => {
    const agencias = new Map;

    for (const item of dados) {
      if (agencias.has(item.agencia)) {
        if ((agencias.get(item.agencia)?.balance || 0) < item.balance) {
            agencias.set(item.agencia, item);
        }
      } else {
        agencias.set(item.agencia, item);
      }
    }
  
    const soma = Array.from(agencias.values())
      .reduce((prev, item) => ({...prev, balance: prev.balance + item.balance}), { balance: 0 });

      console.info(`Exercicio 6)  O valor total desses saldos é: ${soma.balance}`);
  }

  //Exercicio 7) O nome do(a) cliente com o maior saldo na agência 10 é:
  const getClienteMaiorSaldoAgencia10 = (dados) =>{
      let contasAgencia10 = dados.filter((item)=> item.agencia === 10);
      contasAgencia10 = contasAgencia10.sort((valor1,valor2)=> valor2.balance - valor1.balance);
      contasAgencia10 = contasAgencia10.map((item)=> item.name);
      console.info(`Exercicio 7) O nome do(a) cliente com o maior saldo na agência 10 é ${contasAgencia10[0]}`);
  }

  //Exercicio 8) O nome do(a) cliente com o menor saldo na agência 47 é:
  const getClienteMenorSaldoAgencia47 = (dados)=>{
      let clienteMenorSaldoAgencia47 = dados.filter((item) => item.agencia === 47);
      clienteMenorSaldoAgencia47 = clienteMenorSaldoAgencia47.sort((valor1, valor2) => valor1.balance - valor2.balance);
      console.info(`Exercicio 8) O nome do(a) cliente com o menor saldo na agência 47 é: ${clienteMenorSaldoAgencia47[0]["name"]}`);
  }

  //Exercicio 9) Você deve mostrar os nomes dos três clientes com menor saldo da agência 47, separados por vírgula e em ordem crescente
  // (do menor para o maior). Qual seria a sua saída do programa?
  const GetTake3ClienteByBalance = (dados) => {
    let take3ClienteByBalance = dados.filter((item) => item.agencia === 47);
    take3ClienteByBalance = take3ClienteByBalance.sort((valor1, valor2) => valor1.balance - valor2.balance);
    console.info(`Exercicio 9) Você deve mostrar os nomes dos três clientes com menor saldo da agência 47: ${take3ClienteByBalance[0]["name"]}, ${take3ClienteByBalance[1]["name"]}, ${take3ClienteByBalance[2]["name"]}` );
  }

  //Exercicio 10) Quantos clientes estão na agência 47?
  const getQtdClienteAgencia47 = (dados) => {
      let qtdClienteAgencia47 = dados.filter((item) => item.agencia === 47).length;
      console.info(`Exercicio 10) Quantos clientes estão na agência 47? ${qtdClienteAgencia47}`);
  }

  //Exercicio 11) Quantos clientes que tem Maria no nome estão na agencia 47? 
  const getQtdClientesComMariaNomeAgencia47 = (dados) => {
      let qtdClientesComMariaNomeAgencia47 = dados.filter((item) => item.name.includes("Maria"))
        .filter((item)=> item.agencia === 47);
      console.info(`Exercicio 11) Quantos clientes que tem Maria no nome estão na agencia 47? ${qtdClientesComMariaNomeAgencia47.length}`);
  }

  //Exercicio 12) Considerando que o id deve ser único e é sequencial, qual o próximo id possível para conta?
  const getNextId = (dados) => {
      //console.info(dados);
      //let nextId = dados.map((item) => item.id);
      let nextId  = dados.sort((valor1, valor2) => valor2.id - valor1.id);
      console.info(`Exercicio 12) Considerando que o id deve ser único e é sequencial, qual o próximo id possível para conta? ${nextId[0]["id"] + 1}`);
  }