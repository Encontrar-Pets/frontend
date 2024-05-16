type InputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function Input(props: InputProps) {
  return (
    <input
      className={`border-solid border-[1px] border-[#BFC4D7] text-[#71747B] rounded-md py-2 px-4 focus:outline-none ${props.className} mx-6 my-2`}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}
