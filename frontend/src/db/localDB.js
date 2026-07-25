// Mock DB Utility for Offline Mode Fallback
export const localDB = {
  getBoards: () => {
    const boards = JSON.parse(localStorage.getItem('agile_boards') || '[]');
    if (boards.length === 0) {
      const defaultBoards = [{ id: 101, name: 'Project Alpha', lists_count: 3 }];
      localStorage.setItem('agile_boards', JSON.stringify(defaultBoards));
      return defaultBoards;
    }
    return boards;
  },
  saveBoards: (boards) => {
    localStorage.setItem('agile_boards', JSON.stringify(boards));
  },
  getBoardDetails: (id) => {
    let details = JSON.parse(localStorage.getItem(`agile_board_details_${id}`) || 'null');
    
    const defaultCards = {
      toDo: [
        {
          id: 301,
          board_list_id: 201,
          title: 'Setup CI/CD Pipeline & Vercel Auto-deploy',
          description: 'Configure GitHub Actions workflow for automatic linting and preview deployments.',
          due_date: '2026-07-30',
          member_id: 1,
          member: { id: 1, name: 'Kanishka Mishra', email: 'kanishka@example.com', avatar_color: '#F54E00' },
          tags: [{ id: 2, name: 'Feature', color: '#10B981' }, { id: 4, name: 'Urgent', color: '#F59E0B' }],
          subtasks: [
            { id: 1, title: 'Create main.yml workflow', completed: true },
            { id: 2, title: 'Configure Vercel API token secrets', completed: false }
          ],
          position: 1
        },
        {
          id: 302,
          board_list_id: 201,
          title: 'Optimize CSS Glassmorphic theme & blur rendering',
          description: 'Audit backdrop-filter performance on mobile devices and reduce repaint latency.',
          due_date: '2026-07-29',
          member_id: 3,
          member: { id: 3, name: 'Priya Patel', email: 'priya@example.com', avatar_color: '#10B981' },
          tags: [{ id: 3, name: 'Design', color: '#3B82F6' }],
          subtasks: [
            { id: 1, title: 'Add transform3d layers', completed: true },
            { id: 2, title: 'Benchmark FPS performance', completed: false }
          ],
          position: 2
        }
      ],
      inProgress: [
        {
          id: 303,
          board_list_id: 202,
          title: 'Refactor SQLite local storage fallback sync',
          description: 'Implement automatic sync queue when transitioning from offline mode to backend connection.',
          due_date: '2026-07-25',
          member_id: 1,
          member: { id: 1, name: 'Kanishka Mishra', email: 'kanishka@example.com', avatar_color: '#F54E00' },
          tags: [{ id: 2, name: 'Feature', color: '#10B981' }],
          subtasks: [
            { id: 1, title: 'Detect online transition event', completed: true },
            { id: 2, title: 'Flush pending card mutations', completed: false }
          ],
          position: 1
        },
        {
          id: 304,
          board_list_id: 202,
          title: 'Fix due date crimson glow calculation bug',
          description: 'Overdue cards should display soft crimson outline if due date is prior to today.',
          due_date: '2026-07-20',
          member_id: 5,
          member: { id: 5, name: 'Neha Gupta', email: 'neha@example.com', avatar_color: '#EF4444' },
          tags: [{ id: 1, name: 'Bug', color: '#EF4444' }, { id: 4, name: 'Urgent', color: '#F59E0B' }],
          subtasks: [
            { id: 1, title: 'Fix timezone offset date parsing', completed: true }
          ],
          position: 2
        }
      ],
      done: [
        {
          id: 305,
          board_list_id: 203,
          title: 'AI Agent Workspace Simulation Integration',
          description: 'Integrate real-time Slack socket event log simulation featuring Hermes and OpenClaw autonomous build traces.',
          due_date: '2026-07-22',
          member_id: 1,
          member: { id: 1, name: 'Kanishka Mishra', email: 'kanishka@example.com', avatar_color: '#F54E00' },
          tags: [{ id: 2, name: 'Feature', color: '#10B981' }, { id: 3, name: 'Design', color: '#3B82F6' }],
          subtasks: [
            { id: 1, title: 'Build modal UI component', completed: true },
            { id: 2, title: 'Add interactive step progression', completed: true }
          ],
          position: 1
        }
      ]
    };

    const hasCards = details && details.lists && details.lists.some(l => l.cards && l.cards.length > 0);

    if (!details || (id === 101 && !hasCards)) {
      details = {
        id: 101,
        name: 'Project Alpha',
        lists: [
          { id: 201, board_id: 101, name: 'To Do', position: 1, cards: defaultCards.toDo },
          { id: 202, board_id: 101, name: 'In Progress', position: 2, cards: defaultCards.inProgress },
          { id: 203, board_id: 101, name: 'Done', position: 3, cards: defaultCards.done }
        ]
      };
      localStorage.setItem(`agile_board_details_101`, JSON.stringify(details));
    }
    return details;
  },
  saveBoardDetails: (id, details) => {
    localStorage.setItem(`agile_board_details_${id}`, JSON.stringify(details));
  },
  getMembers: () => {
    const members = JSON.parse(localStorage.getItem('agile_members') || '[]');
    if (members.length === 0 || !members.some(m => m.name === 'Kanishka Mishra')) {
      const defaultMembers = [
        { id: 1, name: 'Kanishka Mishra', email: 'kanishka@example.com', avatar_color: '#F54E00' },
        { id: 2, name: 'Amit Sharma', email: 'amit@example.com', avatar_color: '#4F46E5' },
        { id: 3, name: 'Priya Patel', email: 'priya@example.com', avatar_color: '#10B981' },
        { id: 4, name: 'Rohan Sen', email: 'rohan@example.com', avatar_color: '#F59E0B' },
        { id: 5, name: 'Neha Gupta', email: 'neha@example.com', avatar_color: '#EF4444' }
      ];
      localStorage.setItem('agile_members', JSON.stringify(defaultMembers));
      return defaultMembers;
    }
    return members;
  },
  saveMembers: (members) => {
    localStorage.setItem('agile_members', JSON.stringify(members));
  },
  getTags: () => {
    const tags = JSON.parse(localStorage.getItem('agile_tags') || '[]');
    if (tags.length === 0) {
      const defaultTags = [
        { id: 1, name: 'Bug', color: '#EF4444' },
        { id: 2, name: 'Feature', color: '#10B981' },
        { id: 3, name: 'Design', color: '#3B82F6' },
        { id: 4, name: 'Urgent', color: '#F59E0B' }
      ];
      localStorage.setItem('agile_tags', JSON.stringify(defaultTags));
      return defaultTags;
    }
    return tags;
  },
  saveTags: (tags) => {
    localStorage.setItem('agile_tags', JSON.stringify(tags));
  },
  getActivities: () => {
    let act = JSON.parse(localStorage.getItem('agile_activities') || '[]');
    act = act.filter(a => !a.text?.includes('Scaffold') && !a.text?.includes('Slack') && !a.text?.includes('React dashboard') && !a.text?.includes('Setup project repo') && !a.text?.includes('seeded workspace Project Alpha with 4 tasks'));
    if (act.length === 0) {
      const defaultAct = [
        { id: 1, user: 'System Bot', text: 'workspace initialized', time: 'Just now', type: 'system' }
      ];
      localStorage.setItem('agile_activities', JSON.stringify(defaultAct));
      return defaultAct;
    }
    return act;
  },
  saveActivities: (activities) => {
    localStorage.setItem('agile_activities', JSON.stringify(activities));
  }
};
