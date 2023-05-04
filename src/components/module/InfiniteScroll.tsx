import React, { useState, useEffect, useRef, FC } from "react";
import loadingSpinner from "assets/ccommon_loading_spinner.png";
import styled from "styled-components";

interface Props {
  fetchData: () => Promise<void>;
  children: React.ReactNode;
}

// 무한 스크롤 컴포넌트
// 재사용성을 위해서 컴포넌트로 정의함.
// 로딩 UI와 로딩 상태를 관리함.
const InfiniteScroll: FC<Props> = ({ fetchData, children }) => {
  const [isLoading, setIsLoading] = useState(false);
  // 중복 호출 방지
  const [throttle, setThrottle] = useState(false);
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          if (throttle) return;
          if (!throttle) {
            setTimeout(() => {
              setThrottle(true);
              setIsLoading(true);
              fetchData().then(() => {
                setIsLoading(false);
                setThrottle(false);
              });
            }, 500);
          }
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
  }, [loader, setIsLoading, fetchData, isLoading, setThrottle, throttle]);

  return (
    <>
      {children}
      <div ref={loader}>
        <Continaer>
          {isLoading && <img src={loadingSpinner} alt="loading" />}
        </Continaer>
      </div>
    </>
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
