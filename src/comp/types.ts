export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    birthDate: Date;
  }

  export const FILTERS = {
    ALL: "ALL",
    COMPLETED: "COMPLETED",
    INCOMPLETED: "INCOMPLETED"
  } as const;
  
  export type Filter = typeof FILTERS[keyof typeof FILTERS];
  