import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { Filme } from './filme';
import { CatalogoFilmes } from './catalogoFilmes';

const rl = readline.createInterface({ input, output });
const catalogo = new CatalogoFilmes();

async function iniciarSistema() {
    let rodando = true;

    while (rodando) {
        console.log("\n==================================");
        console.log("       CATÁLOGO DE FILMES");
        console.log("==================================");
        console.log("1. Adicionar um novo filme");
        console.log("2. Listar todos os filmes");
        console.log("3. Buscar filmes por título");
        console.log("4. Buscar filmes por gênero");
        console.log("5. Remover um filme pelo título");
        console.log("6. Listar filmes ordenados por ano");
        console.log("0. Encerrar a aplicação");
        console.log("==================================");

        const opcao = await rl.question("Escolha uma opção: ");

        switch (opcao) {
            case '1':
                const titulo = await rl.question("Título: ");
                const anoStr = await rl.question("Ano de lançamento: ");
                const genero = await rl.question("Gênero: ");
                const duracaoStr = await rl.question("Duração (minutos): ");
                const avaliacaoStr = await rl.question("Avaliação (0 a 10 - deixe em branco para pular): ");

                const novoFilme: Filme = {
                    titulo,
                    ano: parseInt(anoStr),
                    genero,
                    duracao: parseInt(duracaoStr)
                };

                if (avaliacaoStr.trim() !== "") {
                    novoFilme.avaliacao = parseFloat(avaliacaoStr);
                }

                catalogo.adicionarFilme(novoFilme);
                break;

            case '2':
                console.log("\n--- Lista de Filmes ---");
                console.table(catalogo.listarFilmes());
                break;

            case '3':
                const buscaTitulo = await rl.question("Digite o título para buscar: ");
                console.table(catalogo.buscarPorTitulo(buscaTitulo));
                break;

            case '4':
                const buscaGenero = await rl.question("Digite o gênero para buscar: ");
                console.table(catalogo.buscarPorGenero(buscaGenero));
                break;

            case '5':
                const tituloRemover = await rl.question("Digite o título do filme a ser removido: ");
                catalogo.removerFilme(tituloRemover);
                break;

            case '6':
                console.log("\n--- Filmes Ordenados por Ano ---");
                console.table(catalogo.listarOrdenadoPorAno());
                break;

            case '0':
                console.log("Encerrando a aplicação...");
                rodando = false;
                rl.close();
                break;

            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}

iniciarSistema();