const mongoose = require('mongoose'); 

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

// Connection to the database "recipe-app"
let conexao = null
const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Function para Conectar e Limpar BD
const conectarLimpar = async () => {
  await mongoose.connect(MONGODB_URI)
  .then( x => {
    conexao = x.connection
    console.log(`Ponto de Conexão: "${conexao.name}"`)
    return Recipe.deleteMany()
  })
  .then( x => {
    console.log(`Ponto de Saída: "${conexao.name}"`)
  });
}

//gravarDadosUnicoRegistro
const gravarDadosUnicoRegistro = async () => {
  const mDados = { 
      title: "Bolo de chocolate", 
      level: "Easy Peasy", 
      ingredients: ["Farinha","Chocolate em pó","Acúcar"], 
      cuisine: "Paranaense", 
      dishType: "breakfast", 
      //image: "", 
      duration: 54, 
      creator: "Aventureiro de fds" ,
      //created: Date,
  }
  const executa = async () => {
      const afetado = await Recipe.create(mDados);
      if ( afetado ) {
        console.log("01-Registro novo e ÚNICO incluído com sucesso...")
        return afetado
      } else {
        console.log("01-*** ERRO em incluir registro novo e ÚNICO")
        return "ERRO-01"
      }
  }
  return await executa()
}

//gravarDadosDeTodaMatriz
const gravarDadosMatriz = async () => {
  const afetado = await Recipe.insertMany(data);
  if ( afetado ) {
    console.log("02-Gravação de dados da Matriz com sucesso...")
    return afetado
  } else {
    console.log("02-*** ERRO - em gravar Dados MATRIZ")
    return "ERRO-02"
  }
}

//alterarDadosDeUmRegistro
const alterarRegistro = async () => {
  const query  = { title: 'Rigatoni alla Genovese' };
  const aplica = { duration: 100 };
  const afetado = await Recipe.findOneAndUpdate(query, aplica, { new: true, runValidators: true} )
  if ( afetado ) {
    console.log("03-Registro alterado com sucesso...")
    return afetado
  } else {
    console.log("03-*** ERRO - em registro alterado")
    return "ERRO-03"
  }
}

//deletarDadosDeUmRegistro
const deletarRegistro = async () => {
  const query = { title: 'Carrot Cake' };
  const afetado = await Recipe.findOneAndRemove(query)
  if ( afetado ) {
    console.log("04-Registro deletado com sucesso...")
    return afetado
  } else {
    console.log("04-*** ERRO - em registro deletado")
    return "ERRO-04"
  }
}

//fechar o arquivo -> somente após todos os processos
const fecharArquivo = async () => {
  conexao.close()
  console.log("05-Arquivo fechado")
}

//gerenciarDisparosDasChamadas
const gerenciarChamadas = async () => {
  console.log("\nPONTO DE ENTRADA ======================================")
  await conectarLimpar()
  await gravarDadosUnicoRegistro()
  await gravarDadosMatriz()
  await alterarRegistro()
  await deletarRegistro()
  await fecharArquivo(conexao)
  console.log("PONTO DE SAIDA ========================================\n")
}
gerenciarChamadas()

