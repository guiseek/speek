export interface UserContact {
  name:           string;
  nickname:       string;
  additionalName: string;
  displayName:    number | string;
  phoneType:      PhoneType;
  phoneNumber:    number | string;
}

export enum PhoneType {
  Casa = "Casa",
  Celular = "Celular",
  CelularTimCelular = "Celular (Tim - Celular)",
  Claro = "Claro",
  Empty = "",
  Home = "Home",
  Maringá = "Maringá",
  Mobile = "Mobile",
  Other = "Other",
  Outros = "Outros",
  Portugal = "Portugal",
  Residencial = "Residencial",
  SãoJoão = "São João",
  Trabalho = "Trabalho",
  Vivo = "Vivo",
  VivoCelular = "Vivo (Celular)",
  Work = "Work",
}
