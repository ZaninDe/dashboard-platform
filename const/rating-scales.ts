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

export const SNAPQuestions: QuestionsProps[] = [
  {
    step: 1,
    question: `Não consegue prestar muita atenção a detalhes ou
    comete erros por descuido nos trabalhos
    da escola ou tarefas`,
  },

  {
    step: 2,
    question: `Tem dificuldade de manter a atenção em
    tarefas ou atividades de lazer`,
  },

  {
    step: 3,
    question: `Parece não estar ouvindo quando se fala
    diretamente com ele`,
  },

  {
    step: 4,
    question: `Não segue instruções até o fim e não termina
    deveres de escola, tarefas ou obrigações`,
  },

  {
    step: 5,
    question: `Tem dificuldade para organizar tarefas e atividades`,
  },

  {
    step: 6,
    question: `Evita, não gosta ou se envolve contra a vontade em
    tarefas que exigem esforço mental prolongado`,
  },

  {
    step: 7,
    question: `Perde coisas necessárias para atividades (p. ex:
      brinquedos, deveres da escola, lápis ou livros)`,
  },

  {
    step: 8,
    question: `Distrai-se com estímulos externos`,
  },

  {
    step: 9,
    question: `É esquecido em atividades do dia-a-dia`,
  },

  {
    step: 10,
    question: `Mexe com as mãos ou pés ou se remexe na cadeira`,
  },

  {
    step: 11,
    question: `Sai do lugar na sala de aula ou em outras situações
    em que se espera que fique sentado`,
  },

  {
    step: 12,
    question: `Corre de um lado para outro ou sobe demais nas
    coisas em situações em que isto é inapropriado`,
  },

  {
    step: 13,
    question: `Tem dificuldade em brincar ou envolver-se em
    atividades de lazer de forma calma`,
  },

  {
    step: 14,
    question: `Não pára ou freqüentemente está a “mil por hora”`,
  },

  {
    step: 15,
    question: `Fala em excesso`,
  },

  {
    step: 16,
    question: `Responde as perguntas de forma precipitada antes
    delas terem sido terminadas`,
  },
  {
    step: 17,
    question: `Tem dificuldade de esperar sua vez`,
  },
  {
    step: 18,
    question: `Interrompe os outros ou se intromete (por exemplo:
      intromete-se nas conversas, jogos, etc.)`,
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

export const SNAPButtonOptions: ButtonOption[] = [
  {
    label: 'Nem um pouco',
    value: '1',
  },
  {
    label: 'Só um pouco',
    value: '2',
  },
  {
    label: 'Bastante',
    value: '3',
  },
  {
    label: 'Demais',
    value: '4',
  },
]
