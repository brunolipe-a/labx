export type DashboardCardProps = {
  number: string
  title: string
  description: string
  colorScheme: 'brand' | 'red' | 'purple' | 'green'
  linkText: string
  buttonText: string
}

export type DashboardImportProps = {
  title: string
  description: string
  linkText: string
  buttonText: string
  buttonBg: string
}

type Dashboard = {
  cards: DashboardCardProps[]
  imports: DashboardImportProps[]
}

const dashboard: Dashboard = {
  cards: [
    {
      number: '1',
      colorScheme: 'brand',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris ligula, vehicula eu ipsum eu, pulvinar luctus augue. Maecenas vitae tempor augue, eu faucibus urna. Aenean mattis ultricies tristique.',
      title: 'Criar Tarefas',
      linkText: 'Ignorar',
      buttonText: 'Criar Tarefa'
    },
    {
      number: '2',
      colorScheme: 'purple',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris ligula, vehicula eu ipsum eu, pulvinar luctus augue. Maecenas vitae tempor augue, eu faucibus urna. Aenean mattis ultricies tristique.',
      title: 'Planejar Sprints',
      linkText: 'Ignorar',
      buttonText: 'Criar Sprint'
    },
    {
      number: '3',
      colorScheme: 'green',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris ligula, vehicula eu ipsum eu, pulvinar luctus augue. Maecenas vitae tempor augue, eu faucibus urna. Aenean mattis ultricies tristique.',
      title: 'Escreva Especificações',
      linkText: 'Ignorar',
      buttonText: 'Criar Especificação'
    }
  ],
  imports: [
    {
      buttonText: 'Conectar com Github',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris ligula, vehicula eu ipsum eu, pulvinar luctus augue. Maecenas vitae tempor augue, eu faucibus urna. Aenean mattis ultricies tristique.',
      linkText: 'Ignorar por enquanto',
      title: 'Importar issues do Github',
      buttonBg: 'green'
    },
    {
      buttonText: 'Conectar com Trello',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris ligula, vehicula eu ipsum eu, pulvinar luctus augue. Maecenas vitae tempor augue, eu faucibus urna. Aenean mattis ultricies tristique.',
      linkText: 'Ignorar por enquanto',
      title: 'Importar quadros do Trello',
      buttonBg: 'blue'
    }
  ]
}

export { dashboard }
