import React, { useEffect, useRef, useState } from 'react';
import { Nav, PortfolioList, PortfolioActions } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store';
import { addData, setAcitveIndex } from './store/actions/portfolio.actions';
import { gsap } from 'gsap';
import { data } from '../data';

export const PortfolioPage = () => {
  // refs
  const portfolioListContainer = useRef<HTMLDivElement>(null);
  const actionsContainer = useRef<HTMLDivElement>(null);

  // selectors
  const portfolioData = useSelector((state: AppState) =>
    Object.keys(state.portfolio.portfolioSettings.data).map(
      (ids) => state.portfolio.portfolioSettings.data[parseInt(ids, 10)]
    )
  );
  const activeIndex = useSelector(
    (state: AppState) => state.portfolio.portfolioSettings.activeIndex
  );

  const [currIndex, setCurrIndex] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  const dispatch = useDispatch();

  const elementList = (): HTMLElement[] | undefined => {
    if (listExists()) {
      return Array.prototype.slice.call(
        portfolioListContainer.current?.children
      );
    }
  };

  const listExists = (): boolean | null => {
    return (
      portfolioListContainer.current &&
      portfolioListContainer.current.children &&
      portfolioListContainer.current.children.length > 0
    );
  };

  const sizes = (): null | undefined | any => {
    return {
      elementWidth:
        portfolioListContainer.current?.children &&
        portfolioListContainer.current.children[0].getBoundingClientRect()
          .width,
      elementHeight: portfolioListContainer.current?.getBoundingClientRect()
        .height,
      actionsHeight:
        actionsContainer.current &&
        actionsContainer.current.getBoundingClientRect().height,
    };
  };

  const getActiveElement = () => {
    let activeElementObj = {} as {
      activeEl: HTMLElement;
      index: number;
    };
    elementList()?.forEach((el, index) => {
      if (el && el.classList && el.classList.contains('active')) {
        activeElementObj = {
          ...activeElementObj,
          activeEl: el,
          index,
        };
      }
    });
    return activeElementObj;
  };

  const initializeElements = (): void => {
    if (elementList()) {
      const translateValue = sizes().elementHeight + sizes().actionsHeight;
      const length = elementList()!.length;
      for (let i = 0; i < length; i++) {
        gsap.to(elementList()![i], {
          duration: 0,
          scale: 0.8,
          translateY: translateValue * i,
          filter: 'opacity(0.2)',
        });
        elementList()![activeIndex].classList.add('active');
        gsap.to(getActiveElement().activeEl, {
          duration: 0,
          scale: 1,
          filter: 'opacity(1)',
        });
      }
    }
  };

  const animateElements = (
    index: number,
    length: number = elementList()!.length - 1
  ): void => {
    if (index === length) {
      gsap.to(elementList()![index], {
        scale: 0.8,
        filter: 'opacity(0.2)',
      });
      gsap.to(elementList()![0], {
        delay: 0.5,
        scale: 1,
        filter: 'opacity(1)',
      });
    } else {
      gsap.to(elementList()![index], {
        scale: 0.8,
        filter: 'opacity(0.2)',
      });
      gsap.to(elementList()![index + 1], {
        delay: 0.5,
        scale: 1,
        filter: 'opacity(1)',
      });
    }
  };

  const handleNext = (): void => {
    const { activeEl, index } = getActiveElement();
    const length = elementList()!.length - 1;
    const translateValue = sizes().elementHeight + sizes().actionsHeight;

    setDisabled(true);
    setCurrIndex((index + 1) % (length + 1));
    animateElements(index);

    elementList()!.forEach((elem, i) => {
      const prop = gsap.getProperty(elem, 'translateY') as number;
      if (prop < 0) {
        gsap.to(elem, {
          duration: 1,
          translateY: prop - translateValue,
        });
      } else {
        gsap.to(elem, {
          duration: 1,
          translateY: prop - translateValue,
          onComplete: () => {
            gsap.to(activeEl, {
              duration: 0,
              translateY: translateValue * i,
            });
          },
        });
      }
    });
    switchActiveElement(index);
  };

  const switchActiveElement = (
    index: number,
    length = elementList()!.length - 1
  ) => {
    setTimeout(() => {
      if (index === length) {
        elementList()![index].classList.remove('active');
        elementList()![0].classList.add('active');
        dispatch(setAcitveIndex(0));
        setDisabled(false);
      } else {
        elementList()![index].classList.remove('active');
        elementList()![index + 1].classList.add('active');
        dispatch(setAcitveIndex(index + 1));
        setDisabled(false);
      }
    }, 1100);
  };

  useEffect(() => {
    dispatch(addData(data));
    initializeElements();
  }, [listExists(), dispatch]);

  return (
    <div className="portfolio">
      <h1 className="logo">Logo.</h1>
      <header className="header">
        <Nav />
      </header>
      <div className="content" ref={portfolioListContainer}>
        {portfolioData.map((data) => (
          <PortfolioList key={data.id} data={data} />
        ))}
      </div>
      <div className="actions" ref={actionsContainer}>
        <PortfolioActions
          next={handleNext}
          disabled={disabled}
          currentIndex={currIndex}
          length={portfolioData.length}
        />
        ;
      </div>
    </div>
  );
};
