export const formatOnlyNumbers = (data: string) => data?.replace(/[^0-9]/g, "");

export type TValidate = [(value: any, form: any) => any, string];

const removeSpace = (value: string): string => value?.replace(/\s/, "") || "";

const isEmpty = (message?: string): TValidate => [
  (value: any) =>
    typeof value === "string" ? !removeSpace(value).length : !value,
  message || "Campo deve ser preenchido",
];

const isEmptySelect = (message?: string): TValidate => [
  (value: { value: string }) => !value?.value,
  message || "Campo deve ser selecionado",
];

const isEmptyPhoto = (message?: string): TValidate => [
  (value: { base64: string }) => !value?.base64,
  message || "Campo deve ser preenchido",
];

const isEmail = (message?: string): TValidate => [
  (value) =>
    !value.match(/^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)?.length,
  message || "Email inválido",
];

const isCellphone = (message?: string): TValidate => [
  (value) => !(formatOnlyNumbers(value).length === 11),
  message || "Celular inválido",
];

const isTelephone = (message?: string): TValidate => [
  (value) => !(removeSpace(value).length === 13),
  message || "Telefone inválido",
];

const isValidToken = (message?: string, size?: number): TValidate => [
  (value) => !(removeSpace(value).length === 4 || size),
  message || "Token deve ser preenchido",
];

const isChecked = (message?: string): TValidate => [
  (value) => !value,
  message || "Não selecionado",
];

const onlyNumbers = (message?: string): TValidate => [
  (value) => formatOnlyNumbers(value),
  message || "Somente números",
];

const onlyNumeric = (message?: string): TValidate => [
  (value) => !/^[+-]?\d+(\.\d+)?$/.test(value),
  message || "Somente números",
];

const hasQuantCharacters = (quant: number, message?: string): TValidate => [
  (value) => value.length < quant,
  message || "Poucos caracteres",
];

export const validate = {
  isEmpty,
  isEmptySelect,
  isEmptyPhoto,
  isEmail,
  isCellphone,
  isTelephone,
  isValidToken,
  isChecked,
  onlyNumbers,
  onlyNumeric,
  hasQuantCharacters,
};
