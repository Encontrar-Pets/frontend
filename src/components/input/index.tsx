type InputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
};

export default function Input(props: InputProps) {
  return (
    <div className="flex flex-col w-full">
      <input
        className={`h-[48px] border-solid border-[1px] border-secondary-gray text-primary-gray rounded-md py-2 px-4 focus:outline-none ${props.error ? "border-primary-red" : ""
          } ${props.className} `}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
      {!!props.error && (
        <span className="ml-4 mt-1 text-primary-red text-xs">
          {props.error}
        </span>
      )}
    </div>
  );
}
