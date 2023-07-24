import React from "react";

interface InputProps {
  id: string;
  type?: React.HTMLInputTypeAttribute;
  label: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    id,
    type,
    label,
    value,
    onChange
  } = props;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        placeholder=" "
        onChange={onChange}
        className="
        block
        rounded-md
        text-md
        text-white
        bg-neutral-700
        w-full
        px-6
        pt-6
        pb-1
        appearance-none
        focus:outline-none
        focus:ring-0
        peer
      "
      />
      <label
        htmlFor="email"
        className="
          absolute
          text-md
          text-zinc-100
          duration-150
          transform
          -translate-y-3
          scale-75
          top-4
          left-6
          z-10
          origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3
        "
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
