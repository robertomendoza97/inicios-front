interface Props {
  message: string;
}

export const CustomError = ({ message }: Props) => (
  <p className="text-red-500 text-sm">* {message}</p>
);
