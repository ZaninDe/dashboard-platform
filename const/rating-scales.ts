export interface QuestionsProps {
  step: number
  question: string
}

export const ELEQuestions: QuestionsProps[] = [
  {
    step: 1,
    question: `Demora mais tempo que os colegas para ler palavras`,
  },

  {
    step: 2,
    question: `Demora mais tempo que os colegas para ler textos`,
  },

  {
    step: 3,
    question: `Troca letras ao ler sílabas e palavras na leitura oral`,
  },

  {
    step: 4,
    question: `Fica ensaiando a palavra (lendo em voz baixa) antes de ler oralmente`,
  },

  {
    step: 5,
    question: `Gagueja, treme, fica vermelho e/ou rele algumas palavras na hora de ler oralmente`,
  },

  {
    step: 6,
    question: `Inventa”, “chuta”, troca a palavra por outra parecida ou parece tentar adivinhar as palavras na leitura`,
  },

  {
    step: 7,
    question: `Não compreende o que lê, (p,ex,: após ler o texto não entende o que é para fazer e/ou não entende o que aconteceu com os personagens)`,
  },

  {
    step: 8,
    question: `Troca, “come”/omite ou acrescenta letras na escrita`,
  },

  {
    step: 9,
    question: `Escreve textos muito simples, pobres em ideias e detalhes se comparado aos colegas`,
  },

  {
    step: 10,
    question: `Conta, oralmente, uma história melhor do que consegue escrevê-la`,
  },

  {
    step: 11,
    question: `Demora mais tempo que os colegas nos momentos de cópia (como por exemplo do quadro(1
))`,
  },

  {
    step: 12,
    question: `Tem letra difícil de ler e entender`,
  },

  {
    step: 13,
    question: `Evita situações que envolvem leitura e escrita`,
  },

  {
    step: 14,
    question: `Tem dificuldade de identificar e/ou produzir rimas`,
  },

  {
    step: 15,
    question: `Durante uma conversa, comumente, demora para se lembrar o nome das pessoas, objetos, sentimentos ou conteúdos escolares que já conhece (como se a palavra estivesse na “ponta da língua”)`,
  },

  {
    step: 16,
    question: `Tem dificuldade para memorizar listas ou sequências de informações (p,ex,, tabuada, meses do ano, dias da semana)`,
  },
]

export interface ButtonOption {
  label: string
  value: string
}
export const ELEButtonOptions: ButtonOption[] = [
  {
    label: 'Nunca',
    value: '1',
  },
  {
    label: 'Raramente',
    value: '2',
  },
  {
    label: 'Às vezes',
    value: '3',
  },
  {
    label: 'Frequentemente',
    value: '4',
  },
]
