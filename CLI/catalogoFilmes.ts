import { Filme } from './filme';

export class CatalogoFilmes {
    private filmes: Filme[] = [];

    public adicionarFilme(filme: Filme): void {
        if (filme.avaliacao !== undefined && (filme.avaliacao < 0 || filme.avaliacao > 10)) {
            console.log("\nErro: A avaliação deve ser um número entre 0 e 10.");
            return;
        }
        this.filmes.push(filme);
        console.log(`\nFilme "${filme.titulo}" adicionado com sucesso!`);
    }

    public listarFilmes(): Filme[] {
        return this.filmes;
    }

    public buscarPorTitulo(titulo: string): Filme[] {
        return this.filmes.filter(f => f.titulo.toLowerCase().includes(titulo.toLowerCase()));
    }

    public buscarPorGenero(genero: string): Filme[] {
        return this.filmes.filter(f => f.genero.toLowerCase() === genero.toLowerCase());
    }

    public removerFilme(titulo: string): void {
        const index = this.filmes.findIndex(f => f.titulo.toLowerCase() === titulo.toLowerCase());
        if (index !== -1) {
            this.filmes.splice(index, 1);
            console.log(`\nFilme "${titulo}" removido com sucesso.`);
        } else {
            console.log("\nFilme não encontrado para remoção.");
        }
    }

    public listarOrdenadoPorAno(): Filme[] {
        return [...this.filmes].sort((a, b) => b.ano - a.ano);
    }
}