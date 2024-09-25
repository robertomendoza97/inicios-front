interface Props {
  vertical?: boolean;
}
export const Divider = ({ vertical }: Props) => {
  return (
    <div
      className={` bg-gray-100  rounded ${
        vertical ? "h-full w-1 mx-3" : "w-full h-1 my-3"
      } `}
    ></div>
  );
};
