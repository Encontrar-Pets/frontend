import './style.css';

type SelectProps = {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function Select(props: SelectProps) {
  return (
    <select
      className={`appearance-none border-solid border-[1px] border-[#BFC4D7] text-[#71747B] rounded-md p-4 focus:outline-none ${props.className} custom-select`}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    >
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
