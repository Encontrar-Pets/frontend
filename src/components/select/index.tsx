import './style.css';

type Option<T> = { value: T; label: string };

type SelectProps<T> = {
  options: Option<T>[];
  value: Option<T> | null;
  onChange: (value: Option<T> | null) => void;
  className?: string;
};

export default function Select<T>({ options, value, onChange, className }: SelectProps<T>) {
  return (
    <select
      className={`appearance-none border-solid border-[1px] border-[#BFC4D7] text-[#71747B] rounded-md p-4 focus:outline-none ${className} custom-select`}
      value={value ? String(value.value) : ''}
      onChange={(e) => {
        const selectedValue = e.target.value;
        const selectedOption = options.find(option => String(option.value) === selectedValue) || null;
        onChange(selectedOption);
      }}
    >
      <option value="">Selecione uma opção</option>
      {options.map((option) => (
        <option key={String(option.value)} value={String(option.value)}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
