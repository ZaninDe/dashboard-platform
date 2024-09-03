import { ButtonOption } from './rating-scales'

export interface QuestionsProps {
  step: number
  question: string
}

export const criteriaOptions: ButtonOption[] = [
  {
    label: 'Sim',
    value: '1',
  },
  {
    label: 'Não',
    value: '0',
  },
]

export const TEADiagnosticQuestions: QuestionsProps[] = [
  {
    step: 1,
    question:
      'O aluno apresenta déficits na reciprocidade socioemocional, como abordagem social anormal, falha de conversa normal de vai-e-vem, ou falha em iniciar ou responder a interações sociais?',
  },
  {
    step: 2,
    question:
      'O aluno apresenta déficits em comportamentos comunicativos não verbais usados para interação social, como comunicação verbal e não verbal mal integrada, anormalidades no contato visual e linguagem corporal, ou falta de expressões faciais e comunicação não verbal?',
  },
  {
    step: 3,
    question:
      'O aluno apresenta déficits no desenvolvimento, manutenção e compreensão de relacionamentos, como dificuldades em ajustar o comportamento para se adequar a diversos contextos sociais, dificuldades em compartilhar brincadeiras imaginativas, ou falta de interesse pelos colegas?',
  },
  {
    step: 4,
    question:
      'O aluno apresenta movimentos motores estereotipados ou repetitivos, uso de objetos ou fala, como estereotipias motoras simples, enfileirar objetos, ecolalia, ou frases idiossincráticas?',
  },
  {
    step: 5,
    question:
      'O aluno insiste na mesmice, tem adesão inflexível a rotinas ou padrões ritualizados de comportamento verbal ou não verbal, como extrema angústia com pequenas mudanças, dificuldade com transições, ou necessidade de seguir o mesmo caminho ou comer os mesmos alimentos diariamente?',
  },
  {
    step: 6,
    question:
      'O aluno apresenta interesses altamente restritos e fixos que são anormais em intensidade ou foco, como forte apego ou preocupação com objetos incomuns, interesses excessivamente circunscritos ou perseverantes?',
  },
  {
    step: 7,
    question:
      'O aluno apresenta hiper ou hiporreatividade a estímulos sensoriais ou interesse incomum em aspectos sensoriais do ambiente, como aparente indiferença à dor/temperatura, resposta adversa a sons ou texturas específicas, ou fascínio visual por luzes ou movimento?',
  },
  {
    step: 8,
    question:
      'Os sintomas do aluno estão presentes desde o período inicial do desenvolvimento, mesmo que possam não se manifestar completamente até que as demandas sociais excedam as capacidades limitadas?',
  },
  {
    step: 9,
    question:
      'Os sintomas do aluno causam prejuízo clinicamente significativo no funcionamento social, acadêmico ou em outras áreas importantes do funcionamento atual?',
  },
  {
    step: 10,
    question:
      'Os sintomas do aluno não são melhor explicados por transtorno do desenvolvimento intelectual ou atraso global do desenvolvimento, e a comunicação social está abaixo do esperado para o nível geral de desenvolvimento?',
  },
]

export const TDAHDiagnosticQuestions: QuestionsProps[] = [
  {
    step: 1,
    question: `O aluno frequentemente não dá atenção a detalhes ou comete erros por descuido em trabalhos escolares, no trabalho ou durante outras atividades?`,
  },
  {
    step: 2,
    question: `O aluno frequentemente tem dificuldade em manter a atenção em tarefas ou atividades lúdicas?`,
  },
  {
    step: 3,
    question: `O aluno muitas vezes parece não ouvir quando se fala diretamente com ele?`,
  },
  {
    step: 4,
    question: `O aluno frequentemente não segue as instruções e não termina os trabalhos escolares, tarefas domésticas ou deveres no local de trabalho?`,
  },
  {
    step: 5,
    question: `O aluno frequentemente tem dificuldade em organizar tarefas e atividades?`,
  },
  {
    step: 6,
    question: `O aluno frequentemente evita, não gosta ou reluta em se envolver em tarefas que exijam esforço mental prolongado?`,
  },
  {
    step: 7,
    question: `O aluno frequentemente perde coisas necessárias para tarefas ou atividades?`,
  },
  {
    step: 8,
    question: `O aluno muitas vezes é facilmente distraído por estímulos estranhos?`,
  },
  {
    step: 9,
    question: `O aluno frequentemente é esquecido nas atividades diárias?`,
  },
  {
    step: 10,
    question: `O aluno muitas vezes remexe ou bate nas mãos ou pés ou se contorce no assento?`,
  },
  {
    step: 11,
    question: `O aluno frequentemente abandona a cadeira em situações em que se espera que permaneça sentado?`,
  },
  {
    step: 12,
    question: `O aluno frequentemente corre ou escala em situações em que não é apropriado?`,
  },
  {
    step: 13,
    question: `O aluno muitas vezes é incapaz de brincar ou se envolver em atividades de lazer silenciosamente?`,
  },
  {
    step: 14,
    question: `O aluno está frequentemente “em movimento”, agindo como se estivesse “conduzido por um motor”?`,
  },
  {
    step: 15,
    question: `O aluno muitas vezes fala excessivamente?`,
  },
  {
    step: 16,
    question: `O aluno frequentemente deixa escapar uma resposta antes que uma pergunta tenha sido completada?`,
  },
  {
    step: 17,
    question: `O aluno muitas vezes tem dificuldade em esperar sua vez?`,
  },
  {
    step: 18,
    question: `O aluno frequentemente interrompe ou se intromete nos outros?`,
  },
  {
    step: 19,
    question: `Vários sintomas de desatenção ou hiperatividade-impulsividade estavam presentes antes da idade de 12 anos?`,
  },
  {
    step: 20,
    question: `Vários sintomas de desatenção ou hiperatividade-impulsividade estão presentes em dois ou mais ambientes, como casa, escola ou trabalho?`,
  },
  {
    step: 21,
    question: `Há evidências claras de que os sintomas interferem ou reduzem a qualidade do funcionamento social, acadêmico ou ocupacional?`,
  },
  {
    step: 22,
    question: `Os sintomas se apresentam sem estar relacionado ao curso de esquizofrenia ou outro transtorno psicótico?`,
  },
]
