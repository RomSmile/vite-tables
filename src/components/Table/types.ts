export interface ITableItem {
  [key: string]: string;
}

export interface ITableOutputData {
  headers: string[];
  items: ITableItem[]
}

export interface ITableProps {
  outputData: ITableOutputData;
  navigate: (id: string) => void;
}
