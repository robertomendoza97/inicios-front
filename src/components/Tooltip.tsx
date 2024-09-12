import { ReactElement } from "react";

interface Props {
  content: ReactElement;
  text: string;
}

export const Tooltip = ({ content, text }: Props) => {
  return (
    <div>
      <span className="group relative">
        <div className="absolute bottom-[calc(100%+0.5rem)] left-[50%] -translate-x-[50%] hidden group-hover:block w-auto">
          <div className="bottom-full text-sm right-0 rounded bg-paletteColor3 px-4 py-1 text-white whitespace-nowrap">
            {text}
            <svg
              className="absolute left-0 top-full h-2 w-full text-black"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
              xmlSpace="preserve"
            >
              <polygon
                className="fill-current"
                points="0,0 127.5,127.5 255,0"
              />
            </svg>
          </div>
        </div>
        <span>{content}</span>
      </span>
    </div>
  );
};
