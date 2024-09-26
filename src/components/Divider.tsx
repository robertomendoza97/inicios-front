interface Props {
  vertical?: boolean;
}
export const Divider = ({ vertical }: Props) => {
  return (
    <div
      className={` bg-gray-100  rounded ${
        vertical ? "h-full w-[2px] mx-3" : "w-full h-[2px] my-3"
      } `}
    ></div>
  );
};
