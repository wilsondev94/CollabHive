/* eslint-disable @typescript-eslint/no-explicit-any */

interface HeaderProps {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
}

export default function Header({
  name,
  buttonComponent,
  isSmallText,
}: HeaderProps) {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold dark:text-white`}
      >
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
}
