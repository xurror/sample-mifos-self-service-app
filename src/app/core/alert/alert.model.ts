/**
 * Alert model.
 */
export interface Alert {
  type: AlertType;
  title: string;
  message: string;
}

export enum AlertType {
  DEFAULT = "",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  DANGER = "danger",
}
