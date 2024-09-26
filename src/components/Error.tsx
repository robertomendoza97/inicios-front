interface Props {
  message: string;
}

export const CustomError = ({ message }: Props) => (
  <span className="text-red-500 text-sm">* {message}</span>
);
