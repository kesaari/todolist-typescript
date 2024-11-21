export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    birthDate: Date;
  }

  export const FILTERS = {
    ALL: "all",
    COMPLETED: "completed",
    INCOMPLETE: "incomplete"
  } as const;
  
  export type Filter = typeof FILTERS[keyof typeof FILTERS];
  