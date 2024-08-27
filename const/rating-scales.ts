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

export interface ATAQuestionsProps {
  step: number
  question: string
  options: {
    index: number
    item: string
  }[]
}

export const ATAQuestions: ATAQuestionsProps[] = [
  {
    step: 1,
    question: 'INTERAÇÃO SOCIAL',
    options: [
      { index: 1, item: 'Não sorri' },
      { index: 2, item: 'Ausência de aproximações espontâneas' },
      { index: 3, item: 'Não busca companhia' },
      { index: 4, item: 'Busca constantemente seu cantinho (esconderijo)' },
      { index: 5, item: 'Evita pessoas' },
      {
        index: 6,
        item: 'É incapaz de manter um intercâmbio social (conversa com trocas, pergunta e resposta)',
      },
      { index: 7, item: 'Isolamento intenso' },
    ],
  },
  {
    step: 2,
    question: 'AMBIENTE',
    options: [
      { index: 1, item: 'Não responde às solicitações' },
      { index: 2, item: 'Mudança repentina de humor' },
      { index: 3, item: 'Mantém-se indiferente, sem expressão' },
      { index: 4, item: 'Risos compulsivos' },
      { index: 5, item: 'Birra e raiva frequente' },
      {
        index: 6,
        item: 'Excitação motora ou verbal (ir de um lugar a outro, falar sem parar)',
      },
    ],
  },
  {
    step: 3,
    question: 'PESSOAS AO SEU REDOR',
    options: [
      {
        index: 1,
        item: 'Utiliza-se do adulto como um objeto (por exemplo, levando a mão do adulto até o interruptor, para acender a luz)',
      },
      {
        index: 2,
        item: 'O adulto lhe serve como apoio para conseguir o que deseja (por exemplo, faz a perna do adulto de ponte para o carrinho passar)',
      },
      {
        index: 3,
        item: 'O adulto é essencialmente um meio para suprir uma necessidade (por exemplo, a aproximação tem o objetivo principal de pedir coisas)',
      },
      {
        index: 4,
        item: 'Se o adulto não responde às suas demandas, atua interferindo na conduta desse adulto (por exemplo, desliga a TV que o adulto esteja assistindo, ameaça quebrar algo, joga coisas no adulto, toma coisas da mão do adulto como pirraça)',
      },
    ],
  },
  {
    step: 4,
    question: 'RESISTÊNCIA A MUDANÇAS',
    options: [
      {
        index: 1,
        item: 'Insistente em manter a rotina (por exemplo, prefere fazer sempre o mesmo passeio ou comer sempre a mesma coisa)',
      },
      {
        index: 2,
        item: 'Grande relutância em aceitar fatos que alteram sua rotina, tais como mudanças de atividade, horário ou mobília',
      },
      {
        index: 3,
        item: 'Apresenta resistência a mudanças, persistindo na mesma resposta ou atividade (por exemplo, brincar sempre do mesmo jeito)',
      },
    ],
  },
  {
    step: 5,
    question: 'BUSCA DE UMA ORDEM RÍGIDA',
    options: [
      {
        index: 1,
        item: 'Ordenação dos objetos de acordo com critérios próprios e pré-estabelecidos',
      },
      {
        index: 2,
        item: 'Prende-se a uma ordenação espacial (cada coisa tem um lugar próprio rígido para ficar)',
      },
      {
        index: 3,
        item: 'Prende-se a uma sequência temporal (por exemplo, só pode por a meia depois da blusa)',
      },
      {
        index: 4,
        item: 'Prende-se a uma correspondência pessoa-lugar (por exemplo, a mesma pessoa precisa sentar sempre no mesmo lugar)',
      },
    ],
  },
  {
    step: 6,
    question: 'CONTATO VISUAL',
    options: [
      {
        index: 1,
        item: 'Desvia o olhar, não olhando nos olhos ou olhando sempre rapidamente',
      },
      { index: 2, item: 'Olha para outra direção quando é chamado' },
      {
        index: 3,
        item: 'Expressão do olhar vazio e sem vida (sem expressão de emoções, indiferente)',
      },
      {
        index: 4,
        item: 'Quando segue os estímulos com os olhos, somente o faz de maneira intermitente (não contínua, ou seja, com pausas)',
      },
      {
        index: 5,
        item: 'Fixa os objetos com um olhar periférico, não central (olhar de lado, com a cabeça um pouco virada e não de frente)',
      },
      { index: 6, item: 'Dá a sensação de que não olha' },
    ],
  },
  {
    step: 7,
    question: 'MÍMICA INEXPRESSIVA',
    options: [
      {
        index: 1,
        item: 'Se fala, não utiliza a expressão facial, gestual ou vocal com a frequência esperada',
      },
      {
        index: 2,
        item: 'Não mostra uma reação antecipatória (como um ‘suspense’ pelo que vai acontecer)',
      },
      {
        index: 3,
        item: 'Não expressa através da mímica ou olhar aquilo que quer ou o que sente',
      },
      { index: 4, item: 'Imobilidade facial' },
    ],
  },
  {
    step: 8,
    question: 'DISTÚRBIOS DE SONO',
    options: [
      {
        index: 1,
        item: 'Não quer ir dormir (relutância frequente, choro, birra, resistência intensa e prolongada)',
      },
      { index: 2, item: 'Levanta-se muito cedo' },
      { index: 3, item: 'Sono irregular (em intervalos)' },
      { index: 4, item: 'Troca o dia pela noite' },
      { index: 5, item: 'Dorme poucas horas' },
    ],
  },
  {
    step: 9,
    question: 'ALTERAÇÃO NA ALIMENTAÇÃO',
    options: [
      {
        index: 1,
        item: 'Seletividade alimentar rígida (ex.: come o mesmo tipo de alimento sempre)',
      },
      {
        index: 2,
        item: 'Come outras coisas além de alimentos (papel, insetos)',
      },
      { index: 3, item: 'Quando pequeno, não mastigava' },
      {
        index: 4,
        item: 'Apresenta uma atividade ruminante (fica um tempo longo com a comida na boca, de um lado para o outro, antes de engolir)',
      },
      { index: 5, item: 'Vômitos' },
      { index: 6, item: 'Come grosseiramente, esparrama a comida ou a atira' },
      {
        index: 7,
        item: 'Rituais (por exemplo, esfarelar alimentos antes da ingestão)',
      },
      {
        index: 8,
        item: 'Ausência de paladar (falta de sensibilidade gustativa)',
      },
    ],
  },
  {
    step: 10,
    question: 'CONTROLE DOS ESFÍNCTERES',
    options: [
      { index: 1, item: 'Medo de sentar-se no vaso sanitário' },
      {
        index: 2,
        item: 'Utiliza os esfíncteres para manipular o adulto (por exemplo, ameaça fazer xixi no local errado de propósito)',
      },
      {
        index: 3,
        item: 'Utiliza os esfíncteres como estimulação corporal, para obtenção de prazer',
      },
      {
        index: 4,
        item: 'Tem controle diurno, porém o noturno é tardio ou ausente',
      },
    ],
  },
  {
    step: 11,
    question: 'EXPLORAÇÃO DOS OBJETOS (APALPAR, CHUPAR)',
    options: [
      { index: 1, item: 'Morde e engole objetos não alimentares' },
      { index: 2, item: 'Chupa e coloca as coisas na boca' },
      { index: 3, item: 'Cheira tudo' },
      {
        index: 4,
        item: 'Apalpa tudo, examina as superfícies com os dedos de forma minuciosa',
      },
    ],
  },
  {
    step: 12,
    question: 'USO INAPROPRIADO DOS OBJETOS',
    options: [
      { index: 1, item: 'Ignora os objetos ou mostra um interesse momentâneo' },
      { index: 2, item: 'Pega, golpeia ou simplesmente os atira no chão' },
      {
        index: 3,
        item: 'Conduta atípica com os objetos (segura indiferentemente nas mãos ou gira)',
      },
      { index: 4, item: 'Carrega insistentemente consigo determinado objeto' },
      {
        index: 5,
        item: 'Se interessa somente por uma parte do objeto ou do brinquedo',
      },
      { index: 6, item: 'Coleciona objetos estranhos' },
      {
        index: 7,
        item: 'Utiliza os objetos de forma particular (pouco usual) e inadequada',
      },
    ],
  },
  {
    step: 13,
    question: 'ATENÇÃO',
    options: [
      {
        index: 1,
        item: 'Quando realiza uma atividade, fixa a atenção por curto espaço de tempo ou é incapaz de fixá-la',
      },
      { index: 2, item: 'Age como se fosse surdo' },
      {
        index: 3,
        item: 'Tempo de latência de resposta aumentado, entende as instruções com dificuldade',
      },
      { index: 4, item: 'Resposta retardada' },
      { index: 5, item: 'Muitas vezes dá a sensação de ausência' },
    ],
  },
  {
    step: 14,
    question: 'AUSÊNCIA DE INTERESSE PELA APRENDIZAGEM',
    options: [
      { index: 1, item: 'Não quer aprender' },
      {
        index: 2,
        item: 'Cansa-se muito depressa, ainda que de atividade que goste',
      },
      { index: 3, item: 'Esquece rapidamente' },
      { index: 4, item: 'Insiste em ser ajudado, ainda que saiba fazer' },
      { index: 5, item: 'Insiste constantemente em mudar de atividade' },
    ],
  },
  {
    step: 15,
    question: 'FALTA DE INICIATIVA',
    options: [
      { index: 1, item: 'É incapaz de ter iniciativa própria' },
      { index: 2, item: 'Busca a comodidade' },
      { index: 3, item: 'Passividade, falta de interesse' },
      { index: 4, item: 'Lentidão' },
      { index: 5, item: 'Prefere que outro faça o trabalho para ele' },
    ],
  },
  {
    step: 16,
    question: 'ALTERAÇÃO DE LINGUAGEM E COMUNICAÇÃO',
    options: [
      { index: 1, item: 'Mutismo' },
      { index: 2, item: 'Estereotipias vocais (fazer sempre os mesmos sons)' },
      { index: 3, item: 'Entonação incorreta' },
      {
        index: 4,
        item: 'Ecolalia imediata e/ou retardada (repetir palavras ou falas que acabou de ouvir, imediatamente ou algum tempo depois)',
      },
      {
        index: 5,
        item: 'Repetição de palavras ou frases que podem (ou não) ter valor comunicativo',
      },
      {
        index: 6,
        item: 'Emite sons estereotipados quando está agitado e em outras ocasiões, sem nenhuma razão aparente',
      },
      { index: 7, item: 'Não se comunica por gestos' },
      { index: 8, item: 'As interações com o adulto nunca são um diálogo' },
    ],
  },
  {
    step: 17,
    question: 'NÃO MANIFESTA HABILIDADES E CONHECIMENTOS',
    options: [
      {
        index: 1,
        item: 'Ainda que saiba fazer uma coisa, não a realiza porque não quer, mesmo que solicitado',
      },
      {
        index: 2,
        item: 'Não demonstra o que sabe, até ter uma necessidade primária ou um interesse específico',
      },
      {
        index: 3,
        item: 'Aprende coisas, porém somente as demonstra em determinados lugares e com determinadas pessoas',
      },
      {
        index: 4,
        item: 'Às vezes, surpreende por suas habilidades inesperadas',
      },
    ],
  },
  {
    step: 18,
    question: 'REAÇÕES INAPROPRIADAS ANTE A FRUSTRAÇÃO',
    options: [
      {
        index: 1,
        item: 'Reações de desagrado intenso caso seja esquecida alguma coisa',
      },
      {
        index: 2,
        item: 'Reações de desagrado intenso caso seja interrompida alguma atividade que goste',
      },
      {
        index: 3,
        item: 'Desgostoso quando os desejos e as expectativas não se cumprem',
      },
      { index: 4, item: 'Reações de birra' },
    ],
  },
  {
    step: 19,
    question: 'RESPONSABILIDADES',
    options: [
      {
        index: 1,
        item: 'Não assume nenhuma responsabilidade, por menor que seja',
      },
      {
        index: 2,
        item: 'Para chegar a fazer alguma coisa, há que se repetir muitas vezes ou elevar o tom de voz',
      },
    ],
  },
  {
    step: 20,
    question: 'HIPERATIVIDADE/ HIPOATIVIDADE',
    options: [
      { index: 1, item: 'A criança está constantemente em movimento' },
      { index: 2, item: 'Mesmo estimulada, não se move' },
      {
        index: 3,
        item: 'Barulhento, a maioria das coisas que faz geram ruído/barulho',
      },
      { index: 4, item: 'Vai de um lugar a outro, sem parar' },
      { index: 5, item: 'Fica pulando (saltando) no mesmo lugar' },
      { index: 6, item: 'Não se move nunca do lugar onde está sentado' },
    ],
  },
  {
    step: 21,
    question: 'MOVIMENTOS ESTEREOTIPADOS E REPETITIVOS',
    options: [
      { index: 1, item: 'Balança-se' },
      { index: 2, item: 'Olha e brinca com as mãos e os dedos' },
      { index: 3, item: 'Tapa os olhos e as orelhas' },
      { index: 4, item: 'Dá pontapés' },
      { index: 5, item: 'Faz caretas e movimentos estranhos com a face' },
      { index: 6, item: 'Fica rodopiando ou rodando objetos' },
      {
        index: 7,
        item: 'Caminha na ponta dos pés ou saltando, arrasta os pés, anda fazendo movimentos estranhos',
      },
      {
        index: 8,
        item: 'Torce o corpo, mantém uma postura desequilibrada, posições estranhas, pernas dobradas, cabeça recolhida aos pés, extensões violentas do corpo',
      },
    ],
  },
  {
    step: 22,
    question: 'IGNORA O PERIGO',
    options: [
      { index: 1, item: 'Não se dá conta do perigo' },
      { index: 2, item: 'Sobe em todos os lugares' },
      { index: 3, item: 'Parece insensível à dor' },
    ],
  },
  {
    step: 23,
    question: 'APARECIMENTO DOS SINTOMAS ANTES DOS 36 MESES (DSM-IV)',
    options: [
      { index: 1, item: 'Não' },
      { index: 2, item: 'Sim' },
    ],
  },
]

export const writingHypothesesOptions: ButtonOption[] = [
  {
    label: 'Pré silábico',
    value: 'pre_silabico',
  },
  {
    label: 'Silábico sem valor sonoro',
    value: 'silabico_sem_valor_sonoro',
  },
  {
    label: 'Silábico com valor sonoro',
    value: 'silabico_com_valor_sonoro',
  },
  {
    label: 'Silábico alfabético',
    value: 'silabico_alfabetico',
  },
  {
    label: 'Alfabético',
    value: 'alfabetico',
  },
]

export const GenderOptions: ButtonOption[] = [
  {
    label: 'Masculino',
    value: 'masculino',
  },
  {
    label: 'Feminino',
    value: 'feminino',
  },
]
