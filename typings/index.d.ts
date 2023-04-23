export interface TransferProps {
  dataSource: RecordType[];
  titles?: string[];
  operations?: TransferDirection;
  status?: string;
  showSearch?: boolean;
  onSearch?: (dir: TransferDirection, value: string) => void;
  width?: string;
  height?: string;
}

export enum TransferDirectionsTypes {
  SOURCE = "SOURCE",
  TARGET = "TARGET",
}

export interface RecordType {
  key: string;
  title: string;
  description: string;
  disabled?: boolean;
}

export enum TransferDirection {
  left = "left",
  right = "right",
}

export enum TransferStatusTypes {
  error = "error",
  warning = "warning",
  success = "success",
}
