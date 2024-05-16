import React from 'react';
import * as R from 'ramda';

import {useStateWithHistory} from './useStateWithHistory';

type TFieldValue =
  | boolean
  | string
  | number
  | object
  | string[]
  | number[]
  | null
  | undefined
  | {[field: string]: any};

interface IFormProps {
  initialValues?: {
    [field: string]: TFieldValue;
  };
  validations?: {
    [field: string]: [
      (field: TFieldValue, form?: {[field: string]: TFieldValue}) => any,
      string
    ][];
  };
}

export interface IForm {
  values: {
    [field: string]: TFieldValue;
  };
  errors: {
    [field: string]: string;
  };
  touched: {
    [field: string]: boolean;
  };
  hasErrors: boolean;

  getValue: (field: string) => TFieldValue;
  getError: (field: string) => string | undefined;

  setValues: (fields: {[field: string]: TFieldValue}) => void;
  setErrors: (fields: {[field: string]: string}) => void;

  trySave: (callback?: (e: any) => void) => (e: any) => boolean;
  clear: (initialValues: {[field: string]: TFieldValue}) => void;
}

export type IFormChange = (field: string) => (value: TFieldValue) => void;

export default ({
  initialValues = {},
  validations = {},
}: IFormProps): [IForm, IFormChange] => {
  const [{values, errors, touched, triedSave}, setState] = useStateWithHistory({
    values: {},
    errors: {},
    touched: [],
    triedSave: false,
  });

  React.useEffect(() => {
    const data = initialValues || {};

    const newErrors = validateData(data);
    setState({values: data, errors: newErrors});
  }, []);

  const getValue = (
    name: string,
    data: {[field: string]: TFieldValue} = values,
  ): TFieldValue => {
    return data[name] === undefined ? null : data[name];
  };

  const validateData = (data = {}) => {
    return Object.keys(validations).reduce((acc, key) => {
      const error = R.reduceWhile(
        acc => !acc,
        (acc, validation) =>
          validation[0](getValue(key, data), data) ? validation[1] : acc,
        null,
        validations[key],
      );

      return {...acc, ...(error ? {[key]: error} : {})};
    }, []);
  };

  const onChange = React.useCallback(
    (name: string, remove: string[] = []) => (value: TFieldValue) => {
      const data = {[name]: value};

      setValues(data, remove);
    },
    [values],
  );

  const setValues = (
    data: {[field: string]: TFieldValue},
    remove: string[] = [],
  ) => {
    const newValues = {...R.omit(remove, values), ...data};
    const newErrors = {...validateData(newValues)};
    const newTouched = [...touched, ...Object.keys(data)];

    setState({
      values: newValues,
      errors: newErrors,
      touched: [...new Set(newTouched)],
    });
  };

  const setErrors = (errors: {[field: string]: string}) => {
    const newTouched = [...touched, ...Object.keys(errors)];
    setState({
      errors,
      touched: [...new Set(newTouched)],
    });
  };

  const getError = (name: string) => {
    return errors[name] && (touched.indexOf(name) !== -1 || triedSave)
      ? errors[name]
      : null;
  };

  const trySave = (callback?: (e: any) => void) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setState({triedSave: true, errors: {...validateData(values)}});

    if (!R.isEmpty(errors) && !R.isNil(errors)) {
      return false;
    }

    if (callback) callback(e);

    return true;
  };

  const clear = (data = {}) => {
    setState(() => ({
      values: data,
      errors: validateData(data),
      touched: [],
      triedSave: false,
    }));
  };

  const form = {
    hasErrors: !R.isEmpty(errors) && !R.isNil(errors),
    getValue,
    getError,
    setErrors,
    setValues,
    errors,
    values,
    touched,
    trySave,
    clear,
  };

  return [form, onChange];
};
