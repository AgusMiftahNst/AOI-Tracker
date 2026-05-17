
export type Role = 'admin' | 'user';

export interface User {
  id: string;
  username: string;
  password?: string;
  role: Role;
  name: string;
}

export type StatusType = 'Belum Selesai' | 'Proses' | 'Selesai';

export interface AOIItem {
  id: string;
  code: string;
  title: string;
  actionPlan: string;
  exampleDoc?: string;
  status: StatusType;
  pic: string;
  completionDate: string;
  documentRef: string;
}

export interface Topic {
  id: string;
  name: string;
  aois: AOIItem[];
}

export interface Element {
  id: string;
  name: string;
  topics: Topic[];
}
