// Singleton: a configuração da biblioteca precisa ser uma só para o sistema todo,
// assim todas as partes usam o mesmo valor de multa e o mesmo nome.
export class ConfiguracaoBiblioteca {
  // guarda a única instância da classe
  private static instancia: ConfiguracaoBiblioteca;

  // dados gerais da biblioteca
  public nomeBiblioteca = "Biblioteca Municipal";
  public valorMultaDia = 2;

  // construtor privado, ninguém de fora consegue dar new nessa classe
  private constructor() {}

  // se a instância ainda não existe ela é criada, se já existe devolve a mesma
  static getInstancia(): ConfiguracaoBiblioteca {
    if (!ConfiguracaoBiblioteca.instancia) {
      ConfiguracaoBiblioteca.instancia = new ConfiguracaoBiblioteca();
    }
    return ConfiguracaoBiblioteca.instancia;
  }
}