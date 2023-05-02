import { FC } from "react";
import styled from "styled-components";
import IconSearch from "assets/ico_search.png";

interface Props {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export const SearchIcon: FC<Props> = ({ width, height, style }) => {
  return (
    <Icon
      src={IconSearch}
      alt="icon search"
      width={width}
      height={height}
      style={style}
    />
  );
};

const Icon = styled.img`
  ${(props) => (props.width ? `width:${props.width}px;` : "width: 18px;")}
  ${(props) => (props.height ? `height:${props.height}px;` : "height: 18px;")}
`;
