import React, { useState, useEffect, useRef, FC } from "react";
import loadingSpinner from "assets/ccommon_loading_spinner.png";
import styled from "styled-components";

interface Props {
  fetchData: () => Promise<void>;
  children: React.ReactNode;
}

const InfiniteScroll: FC<Props> = ({ fetchData, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoading(true);
          fetchData().then(() => {
            setIsLoading(false);
          });
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loader, setIsLoading, fetchData]);

  return (
    <div>
      {children}
      <div ref={loader}>
        <Continaer>
          {isLoading && <img src={loadingSpinner} alt="loading" />}
        </Continaer>
      </div>
    </div>
  );
};

const Continaer = styled.div`
  position: relative;
  width: 100%;
  max-width: 375px;
  height: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

export default InfiniteScroll;
